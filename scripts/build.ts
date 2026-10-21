/* Bundles the two React apps with esbuild into dist/ (website = site.*, CampusMeal = campusmeal.*).
   dist/ is a plain static site: open it from any web host, e.g. GitHub Pages. */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

try { process.loadEnvFile(path.join(root, ".env")); } catch { /* no .env: editing off unless STAFF_PIN is set */ }
const pin = (process.env.STAFF_PIN || "").trim();

export const options: esbuild.BuildOptions = {
  entryPoints: { site: path.join(root, "src/site.tsx"), campusmeal: path.join(root, "src/campusmeal.tsx") },
  outdir: dist,
  bundle: true,
  format: "esm",
  target: "es2020",
  jsx: "automatic",
  sourcemap: true,
  loader: { ".woff2": "file", ".woff": "file" },
  assetNames: "fonts/[name]-[hash]",
  publicPath: "",
  logLevel: "info",
  // only the hash of the team PIN goes into the page; empty = edit mode and kitchen login are off
  define: { __PIN_HASH__: JSON.stringify(pin ? createHash("sha256").update(pin).digest("hex") : "") },
};

export function copyPublic() {
  fs.mkdirSync(dist, { recursive: true });
  for (const f of fs.readdirSync(path.join(root, "public"))) fs.copyFileSync(path.join(root, "public", f), path.join(dist, f));
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.join(root, "scripts", "build.ts")) {
  fs.rmSync(dist, { recursive: true, force: true });
  copyPublic();
  await esbuild.build({ ...options, minify: true, define: { ...options.define, "process.env.NODE_ENV": '"production"' } });
}
