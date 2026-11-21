import { cache } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { readProfile, readProfileSlug } from "../lib/profile.mjs";

export const runtime = "nodejs";

const currentProfile = cache(async () => {
  if (process.env.GITHUB_PAGES === "1") return readProfileSlug("ben");
  return readProfile((await headers()).get("host"));
});

function heading(Tag, marks) {
  return function MarkdownHeading({ children }) {
    return <Tag><span className="marker" aria-hidden="true">{marks} </span>{children}</Tag>;
  };
}

function assetUrl(url) {
  if (!url?.startsWith("/ben/") || process.env.GITHUB_PAGES !== "1") return url;
  return (process.env.PAGES_BASE_PATH ?? "/lewis-md") + url;
}

const components = {
  img({ src, alt, title }) {
    const portrait = src === "/ben/portrait.jpg";
    return <img src={assetUrl(src)} alt={alt ?? ""} title={title}
      className={portrait ? "profile-portrait" : undefined}
      width={portrait ? 132 : undefined} height={portrait ? 132 : undefined} />;
  },
  a({ href, title, children }) {
    const filename = /^\/ben\/([A-Za-z0-9_-]+\.pdf)$/.exec(href ?? "")?.[1];
    return <a href={assetUrl(href)} title={title} download={filename}>{children}</a>;
  },
  h1: heading("h1", "#"),
  h2: heading("h2", "##"),
  h3: heading("h3", "###"),
  h4: heading("h4", "####"),
  h5: heading("h5", "#####"),
  h6: heading("h6", "######"),
};

export async function generateMetadata() {
  const profile = await currentProfile();
  return profile ? { title: profile.title } : { title: "Page not found" };
}

export default async function Page() {
  const profile = await currentProfile();
  if (!profile) notFound();

  return (
    <main className="page">
      <div className="filename" aria-hidden="true">{profile.slug === "_home" ? "lewis.md" : profile.slug + ".md"}</div>
      <article className="markdown">
        <Markdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
          {profile.markdown}
        </Markdown>
      </article>
    </main>
  );
}
