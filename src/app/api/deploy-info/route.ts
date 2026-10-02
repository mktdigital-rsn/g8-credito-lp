const releaseTimestamp = "2026-10-02T10:33:28-03:00";

export function GET() {
  return Response.json({
    app: "g8-credito-lp",
    releaseTimestamp,
    timeZone: "America/Sao_Paulo",
  });
}
