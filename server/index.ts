/* Local server: JSON API + uploaded assets + the built React app. No external services. */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { config } from "./config";
import { isStaff } from "./auth";
import { HttpError, Route, match, sendError, sendJson } from "./http";
import { JsonStore } from "./store";
import { siteRoutes } from "./routes/site";
import { cmRoutes } from "./routes/campusmeal";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
  ".mp4": "video/mp4", ".webm": "video/webm", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon", ".map": "application/json",
};

/** Serve a file from inside `root` only (blocks ../ tricks). Supports byte ranges so videos can seek. */
function serveFile(req: http.IncomingMessage, res: http.ServerResponse, root: string, rel: string): boolean {
  const file = path.resolve(root, "." + path.posix.normalize("/" + rel));
  if (!file.startsWith(root + path.sep)) return false;
  let st: fs.Stats;
  try { st = fs.statSync(file); } catch { return false; }
  if (!st.isFile()) return false;
  const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
  const headers: http.OutgoingHttpHeaders = { "Content-Type": type, "X-Content-Type-Options": "nosniff", "Accept-Ranges": "bytes", "Cache-Control": "no-cache" };
  const range = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range || ""));
  if (range && (range[1] || range[2])) {
    const start = range[1] ? +range[1] : Math.max(0, st.size - +range[2]);
    const end = range[1] && range[2] ? Math.min(+range[2], st.size - 1) : st.size - 1;
    if (start > end || start >= st.size) { res.writeHead(416, { "Content-Range": `bytes */${st.size}` }); res.end(); return true; }
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Content-Length": end - start + 1 });
    fs.createReadStream(file, { start, end }).pipe(res);
    return true;
  }
  res.writeHead(200, { ...headers, "Content-Length": st.size });
  if (req.method === "HEAD") res.end(); else fs.createReadStream(file).pipe(res);
  return true;
}

export function createServer(store: JsonStore) {
  const routes: Route[] = [
    { method: "GET", pattern: /^\/api\/session$/, handler: (req, res) => sendJson(res, 200, { staff: isStaff(req), editingEnabled: !!config.staffPin }) },
    ...siteRoutes(store),
    ...cmRoutes(store),
  ];

  return http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", "http://local");
    const p = url.pathname;
    try {
      if (p.startsWith("/api/")) {
        const m = match(routes, req.method || "GET", p);
        if (m === "method") throw new HttpError(405, "Method not allowed.");
        if (!m) throw new HttpError(404, "Not found.");
        await m.handler(req, res, m.params);
        return;
      }
      if (req.method !== "GET" && req.method !== "HEAD") throw new HttpError(405, "Method not allowed.");
      if (p.startsWith("/assets/") && serveFile(req, res, config.assetsDir, p.slice("/assets/".length))) return;
      if (p !== "/" && serveFile(req, res, config.distDir, p)) return;
      // Two single-page apps: /campusmeal… is the CampusMeal app, everything else the website.
      const page = p === "/campusmeal" || p.startsWith("/campusmeal/") ? "campusmeal.html" : "index.html";
      if (!serveFile(req, res, config.distDir, page)) {
        res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("The app has not been built yet. Run `npm run build` (or use `npm run dev`).");
      }
    } catch (err) {
      if (!res.headersSent) sendError(res, err); else res.destroy();
    }
  });
}
