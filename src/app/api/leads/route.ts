import { z } from "zod";
import { leadSchema, onlyDigits } from "@/lib/lead";

const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_DOCUMENT_TYPES = new Set(["image/jpeg", "image/png", "application/pdf"]);
const UPSTREAM_TIMEOUTS = {
  presign: 10_000,
  upload: 30_000,
  application: 15_000,
} as const;

type PresignedUpload = { slot: string; key: string; url: string };

function jsonError(message: string, status: number) {
  return Response.json({ success: false, message }, { status });
}

function extensionFor(file: File) {
  switch (file.type) {
    case "image/png": return "png";
    case "application/pdf": return "pdf";
    default: return "jpeg";
  }
}

async function fetchUpstream(
  stage: keyof typeof UPSTREAM_TIMEOUTS,
  url: string,
  init: RequestInit
) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUTS[stage]),
    });
    console.info(`[credit-application] ${stage} completed in ${Date.now() - startedAt}ms (${response.status})`);
    return response;
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error(
      `[credit-application] ${stage} ${timedOut ? "timed out" : "failed"} after ${Date.now() - startedAt}ms`
    );
    throw error;
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_DOCUMENT_BYTES + 128 * 1024) {
    return jsonError("O arquivo deve ter no máximo 10 MB.", 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Requisição inválida.", 400);
  }

  const parsed = leadSchema.safeParse({
    amount: Number(formData.get("amount")),
    nome: formData.get("nome"),
    cpf: formData.get("cpf"),
    telefone: formData.get("telefone"),
    email: formData.get("email"),
    perfil: formData.get("perfil"),
    banco: formData.get("banco"),
    canal: formData.get("canal"),
    documentKind: formData.get("documentKind"),
    aceite: formData.get("aceite") === "true",
  });
  if (!parsed.success) {
    return Response.json(
      { success: false, message: "Confira os dados do formulário.", errors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }

  const file = formData.get("document");
  if (!(file instanceof File) || file.size === 0) {
    return jsonError("Anexe uma imagem ou PDF do seu documento.", 422);
  }
  if (!ALLOWED_DOCUMENT_TYPES.has(file.type)) {
    return jsonError("Envie o documento como JPG, PNG ou PDF.", 422);
  }
  if (file.size > MAX_DOCUMENT_BYTES) {
    return jsonError("O arquivo deve ter no máximo 10 MB.", 422);
  }

  const backendBaseUrl = process.env.CREDIT_APPLICATION_API_BASE_URL?.replace(/\/+$/, "");
  const accessKey = process.env.CREDIT_APPLICATION_PUBLIC_ACCESS_KEY;
  if (!backendBaseUrl) {
    return jsonError("O envio está temporariamente indisponível.", 503);
  }

  try {
    // Uses the backend's existing public PF presigned-upload route.
    const presignedResponse = await fetchUpstream(
      "presign",
      `${backendBaseUrl}/api/auth/v2/cadastrarUsuarioPf/presigned-urls`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploads: [{ slot: "credit-application-document", filename: `document.${extensionFor(file)}` }],
        }),
        cache: "no-store",
      }
    );
    if (!presignedResponse.ok) {
      console.error("[credit-application] presigned upload request failed:", presignedResponse.status);
      return jsonError("Não foi possível preparar o envio do documento.", 502);
    }

    const presigned = (await presignedResponse.json()) as { uploads?: PresignedUpload[] };
    const upload = presigned.uploads?.[0];
    if (!upload?.key || !upload.url) {
      console.error("[credit-application] backend returned an invalid upload response");
      return jsonError("Não foi possível preparar o envio do documento.", 502);
    }

    const uploadResponse = await fetchUpstream("upload", upload.url, { method: "PUT", body: file });
    if (!uploadResponse.ok) {
      console.error("[credit-application] document upload failed:", uploadResponse.status);
      return jsonError("Não foi possível enviar o documento. Tente novamente.", 502);
    }

    const applicationResponse = await fetchUpstream("application", `${backendBaseUrl}/api/carta-credito/publica`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessKey ? { "X-Credit-Application-Key": accessKey } : {}),
      },
      body: JSON.stringify({
        amount: parsed.data.amount,
        name: parsed.data.nome,
        taxNumber: onlyDigits(parsed.data.cpf),
        email: parsed.data.email,
        phoneNumber: onlyDigits(parsed.data.telefone),
        userKind: "PF",
        documents: [{ kind: parsed.data.documentKind, reference: upload.key }],
      }),
      cache: "no-store",
    });

    if (!applicationResponse.ok) {
      console.error("[credit-application] backend rejected application:", applicationResponse.status);
      return jsonError("Não foi possível registrar sua solicitação. Confira os dados e tente novamente.", 502);
    }

    return Response.json({ success: true, message: "Solicitação recebida." }, { status: 201 });
  } catch (error) {
    console.error("[credit-application] request failed:", error instanceof Error ? error.message : "unknown error");
    return jsonError("Não foi possível enviar sua solicitação. Tente novamente.", 502);
  }
}
