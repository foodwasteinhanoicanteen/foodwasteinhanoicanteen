/* Tiny helpers on top of node:http, so the project needs no web framework. */
import type { IncomingMessage, ServerResponse } from "node:http";
import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export function sendJson(res: ServerResponse, status: number, body: unknown) {
  const s = JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(s);
}

export function readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const len = Number(req.headers["content-length"] || 0);
    if (len > limit) { reject(new HttpError(413, `Too large (limit ${Math.round(limit / 1048576)} MB).`)); req.resume(); return; }
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > limit) { reject(new HttpError(413, `Too large (limit ${Math.round(limit / 1048576)} MB).`)); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export async function readJson(req: IncomingMessage, limit = 2 * 1048576): Promise<unknown> {
  if (!String(req.headers["content-type"] || "").includes("application/json")) throw new HttpError(415, "Send JSON.");
  const buf = await readBody(req, limit);
  try { return JSON.parse(buf.toString("utf8")); } catch { throw new HttpError(400, "Invalid JSON."); }
}

export function sendError(res: ServerResponse, err: unknown) {
  if (err instanceof HttpError) return sendJson(res, err.status, { error: err.message });
  if (err instanceof ZodError) return sendJson(res, 400, { error: err.issues.slice(0, 3).map((i) => `${i.path.join(".") || "value"}: ${i.message}`).join("; ") });
  console.error(err);
  sendJson(res, 500, { error: "Server error. Check the terminal for details." });
}

export type Handler = (req: IncomingMessage, res: ServerResponse, params: string[]) => Promise<void> | void;
export interface Route { method: string; pattern: RegExp; handler: Handler }

/** Find the route for a request; params are the regex groups, URL-decoded. */
export function match(routes: Route[], method: string, pathname: string): { handler: Handler; params: string[] } | "method" | null {
  let pathMatched = false;
  for (const r of routes) {
    const m = r.pattern.exec(pathname);
    if (!m) continue;
    pathMatched = true;
    if (r.method === method) return { handler: r.handler, params: m.slice(1).map(decodeURIComponent) };
  }
  return pathMatched ? "method" : null;
}
