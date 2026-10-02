import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buildInfo = await readFile(join(process.cwd(), "public", "build-info.json"), "utf8");
    return new Response(buildInfo, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch {
    return Response.json(
      { app: "g8-credito-lp", error: "Build information is unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
