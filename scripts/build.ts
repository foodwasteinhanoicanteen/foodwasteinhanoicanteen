/* Bundles the two React apps with esbuild into dist/ (website = site.*, CampusMeal = campusmeal.*).
   dist/ is a plain static site: open it from any web host, e.g. GitHub Pages. */
import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

/** Runs Tailwind (Untitled UI styles) on the *.tw.css entry files; watches the folders Tailwind scans. */
const tailwind: esbuild.Plugin = {
  name: "tailwind",
  setup(b) {
    b.onLoad({ filter: /\.tw\.css$/ }, async ({ path: file }) => {
      const res = await postcss([tailwindcss({ base: root })]).process(await fs.promises.readFile(file, "utf8"), { from: file });
      const deps = res.messages.filter((m) => m.type === "dependency" || m.type === "dir-dependency");
      return {
        contents: res.css, loader: "css", resolveDir: path.dirname(file),
        watchFiles: deps.filter((m) => m.type === "dependency").map((m) => m.file),
        watchDirs: deps.filter((m) => m.type === "dir-dependency").map((m) => m.dir),
      };
    });
  },
};

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
  plugins: [tailwind],
};

export function copyPublic() {
  fs.cpSync(path.join(root, "public"), dist, { recursive: true });
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.join(root, "scripts", "build.ts")) {
  fs.rmSync(dist, { recursive: true, force: true });
  copyPublic();
  await esbuild.build({ ...options, minify: true, define: { "process.env.NODE_ENV": '"production"' } });
}
