const label = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export function normalizeHost(authority) {
  const match = /^([a-z0-9.-]+)\.?(:\d{1,5})?$/i.exec(authority ?? "");
  if (!match) return null;
  const host = match[1].toLowerCase().replace(/\.$/, "");
  return host.length <= 253 && host.split(".").every((part) => label.test(part))
    ? host : null;
}

export function profileForHost(authority, previewHosts = []) {
  const host = normalizeHost(authority);
  if (!host) return null;
  if (host === "lewis.md") return null;

  for (const parent of ["lewis.md", "localhost"]) {
    if (host.endsWith("." + parent)) {
      const subdomain = host.slice(0, -(parent.length + 1));
      return label.test(subdomain) ? subdomain : null;
    }
  }

  if (host === "localhost" || host === "127.0.0.1" ||
      previewHosts.some((entry) => normalizeHost(entry.trim()) === host)) {
    return "ben";
  }

  return null;
}
