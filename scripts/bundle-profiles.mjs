import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const source = new URL("../profiles/", import.meta.url);
const target = new URL("../.generated/", import.meta.url);
const entries = await readdir(source, { withFileTypes: true });
const filenames = entries
  .filter((entry) => entry.isFile() && /^(?:_home|[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\.md$/.test(entry.name))
  .map((entry) => entry.name)
  .sort();

const profiles = Object.fromEntries(await Promise.all(filenames.map(async (filename) => [
  filename.slice(0, -3),
  await readFile(new URL(filename, source), "utf8"),
])));

await mkdir(target, { recursive: true });
await writeFile(new URL("profiles.json", target), JSON.stringify(profiles) + "\n");
