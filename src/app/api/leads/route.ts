import { z } from "zod";
import { leadSchema, onlyDigits } from "@/lib/lead";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Requisição inválida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { success: false, message: "Dados inválidos.", errors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }

  const lead = {
    ...parsed.data,
    cpf: onlyDigits(parsed.data.cpf),
    telefone: onlyDigits(parsed.data.telefone),
    createdAt: new Date().toISOString(),
  };

  // Encaminha o lead para o backend quando LEADS_API_URL estiver configurada.
  const target = process.env.LEADS_API_URL;
  if (target) {
    try {
      const res = await fetch(target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
    } catch (err) {
      console.error("[leads] falha ao encaminhar lead:", err);
      return Response.json(
        { success: false, message: "Não foi possível enviar sua solicitação. Tente novamente." },
        { status: 502 }
      );
    }
  } else {
    console.info("[leads] novo lead (LEADS_API_URL não configurada):", { ...lead, cpf: "***" });
  }

  return Response.json({ success: true, message: "Solicitação recebida." });
}
