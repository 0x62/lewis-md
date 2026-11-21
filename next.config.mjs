const pages = process.env.GITHUB_PAGES === "1";

export default {
  poweredByHeader: false,
  ...(pages
    ? { output: "export", basePath: process.env.PAGES_BASE_PATH ?? "/lewis-md" }
    : {}),
};
