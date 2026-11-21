import profiles from "../.generated/profiles.json" with { type: "json" };
import { profileForHost } from "./hosts.mjs";

export function readProfile(host) {
  const previewHosts = [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    ...(process.env.PREVIEW_HOSTS ?? "").split(","),
  ].filter(Boolean);
  const slug = profileForHost(host, previewHosts);
  return slug ? readProfileSlug(slug) : null;
}

export function readProfileSlug(slug) {
  if (!Object.hasOwn(profiles, slug)) return null;
  const markdown = profiles[slug];
  return {
    slug,
    markdown,
    title: markdown.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1] ?? (slug + ".lewis.md"),
  };
}
