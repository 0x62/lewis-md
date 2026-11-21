# lewis.md

A small home on the web for the Lewis family and anyone else named Lewis. Each page is a Markdown file that gets its own subdomain. For example, [`profiles/ben.md`](profiles/ben.md) is the page for `ben.lewis.md`.

The custom domain isn’t connected yet. You can see what a page looks like in [Ben’s GitHub Pages demo](https://0x62.github.io/lewis-md/).

## Get your own page

If your surname is Lewis, you’re welcome to request a free page. New subdomains are first names only and subject to availability.

1. [Check the profiles folder](profiles) to see whether your first name is available.
2. Fork this repo and add `profiles/yourname.md`, using your first name in lowercase. Write your page in [GitHub Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). Start with a heading and add whatever you’d like to share.
3. [Open a pull request](https://github.com/0x62/lewis-md/pulls). To update your own page later, open a pull request editing the same file.

Not on GitHub? [Email me](mailto:ben@bl.je) your Markdown file and the first name you’d like to use. Only include things you’re comfortable sharing publicly: the Markdown, pull requests and published pages are all public.

There’s no control panel. An `@lewis.md` email address may be possible at cost; email me to ask. This is a personal project, so there are no guarantees about availability, support or how long it will be around. The domain isn’t for sale.

## Running the app

Requires Node.js 20.9 or newer.

```sh
npm ci
npm test
npm run dev
```

Open http://localhost:3000 for Ben’s page. To test host-based routing:

```sh
curl -H 'Host: lewis.md' http://localhost:3000/
curl -H 'Host: ben.lewis.md' http://localhost:3000/
curl -I -H 'Host: missing.lewis.md' http://localhost:3000/
```

The Next.js app serves `profiles/_home.md` for the apex and `profiles/<name>.md` for a matching subdomain. Unknown names return 404. Raw HTML in Markdown is disabled.

## Deployment

The GitHub Actions workflow exports only Ben’s profile to GitHub Pages. It’s a static demo, not the wildcard app. To build the demo locally for a static server at the root:

```sh
GITHUB_PAGES=1 PAGES_BASE_PATH= npm run build
```

For the wildcard app, deploy to a Next.js host with `GITHUB_PAGES` unset and configure both `lewis.md` and `*.lewis.md`. Follow your host’s DNS and TLS instructions. Set `PREVIEW_HOSTS` to comma-separated exact hostnames if custom staging addresses should serve Ben’s profile.
