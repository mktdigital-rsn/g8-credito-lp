import { mkdir, writeFile } from "node:fs/promises";

const timeZone = "America/Sao_Paulo";
const now = new Date();
const dateParts = Object.fromEntries(
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(now)
    .filter(({ type }) => type !== "literal")
    .map(({ type, value }) => [type, value])
);
const offset = new Intl.DateTimeFormat("en", {
  timeZone,
  timeZoneName: "longOffset",
})
  .formatToParts(now)
  .find(({ type }) => type === "timeZoneName")?.value;
const utcOffset = offset === "GMT" ? "Z" : offset?.replace(/^GMT/, "") ?? "-03:00";
const buildTimestamp = `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}${utcOffset}`;

await mkdir("public", { recursive: true });
await writeFile(
  "public/build-info.json",
  `${JSON.stringify({ app: "g8-credito-lp", buildTimestamp, timeZone }, null, 2)}\n`
);
