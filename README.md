# lewis.md

One GitHub Flavored Markdown file per person. `profiles/ben.md` renders at `ben.lewis.md`. To add a page, commit `profiles/<subdomain>.md` with a lowercase DNS label (letters, digits and hyphens). Changes go live after the next deployment. Unpublished names and the apex return 404; there is no family directory. Markdown is public when deployed even though the GitHub repository is private.

## Local

    npm install
    npm test
    npm run dev

Open http://localhost:3000 for Ben’s page. To verify real host routing:

    curl -H 'Host: ben.lewis.md' http://localhost:3000/
    curl -I -H 'Host: missing.lewis.md' http://localhost:3000/

## GitHub Pages demo

The preview deliberately exports only `profiles/ben.md`. GitHub Pages does not run the Node request handler and cannot serve the wildcard app. Enable Settings → Pages → Source: GitHub Actions on this repository if the GitHub plan supports Pages for private repositories. The workflow discovers the repository's Pages base path and publishes `out/`. Verify the Pages site's access settings separately: a private repository does not automatically make its website private.

Build the same static demo locally at the root of a static server:

    GITHUB_PAGES=1 PAGES_BASE_PATH= npm run build

## Deploy the wildcard app on a Next.js host

For production, leave `GITHUB_PAGES` unset. Import the private GitHub repository into a Next.js-capable project (Vercel is one option). The assigned deployment and project URLs default to Ben’s profile for review; configure `PREVIEW_HOSTS` with comma-separated exact hostnames for any separate preview alias when required. The app uses the request's `Host` (not arbitrary forwarded headers), and the runtime files are included in the build trace.

After the preview has been reviewed, add `*.lewis.md` under the project’s Domains. Follow the provider’s live DNS and certificate instructions: [Vercel wildcard domain guide](https://vercel.com/docs/domains/working-with-domains/add-a-domain). Vercel's wildcard certificate setup uses its nameservers; when switching DNS providers, copy any existing DNS records (especially mail records) before a change. An ordinary preview is independent of the wildcard setup. The apex is not needed.

Raw HTML in content is disabled. The Markdown renderer provides clickable links, headings, lists, tables, task lists, strikethrough, and code blocks with no per-profile JavaScript.
