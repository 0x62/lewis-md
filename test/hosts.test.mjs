import assert from "node:assert/strict";
import test from "node:test";
import { profileForHost } from "../lib/hosts.mjs";

test("maps one valid production label", () => {
  assert.equal(profileForHost("BEN.LEWIS.MD:443"), "ben");
  assert.equal(profileForHost("alex-j.lewis.md."), "alex-j");
});
test("does not turn production misses or unrelated hosts into previews", () => {
  for (const host of ["lewis.md", "ben.lewis.md.example.org", "nested.ben.lewis.md", "other.vercel.app"]) {
    assert.equal(profileForHost(host, ["preview.vercel.app"]), null);
  }
  assert.equal(profileForHost("unknown.lewis.md", ["unknown.lewis.md"]), "unknown");
});
test("rejects paths, malformed labels and multiple hosts", () => {
  for (const host of ["../ben.lewis.md", "ben%2f.lewis.md", "-ben.lewis.md", "a..lewis.md", "ben.lewis.md, evil.test"]) {
    assert.equal(profileForHost(host), null);
  }
});
test("supports local development and only configured preview hosts", () => {
  assert.equal(profileForHost("localhost:3000"), "ben");
  assert.equal(profileForHost("alex.localhost:3000"), "alex");
  assert.equal(profileForHost("preview.vercel.app", [" preview.vercel.app "]), "ben");
});
