import { readFile } from "node:fs/promises";
import path from "node:path";
import { profileForHost } from "./hosts.mjs";

export async function readProfile(host) {
  const previewHosts = [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    ...(process.env.PREVIEW_HOSTS ?? "").split(","),
  ].filter(Boolean);
  const slug = profileForHost(host, previewHosts);
  if (!slug) return null;

  return readProfileSlug(slug);
}

export async function readProfileSlug(slug) {
  try {
    const markdown = await readFile(path.join(process.cwd(), "profiles", slug + ".md"), "utf8");
    return {
      slug,
      markdown,
      title: markdown.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1] ?? (slug + ".lewis.md"),
    };
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
