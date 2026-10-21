/* Calls to the in-browser data store (./local). Adds the anonymous browser id. */
import { ZodError } from "zod";
import { HttpError, errorMessage, run } from "./local";

const store = (s: () => Storage) => ({
  get(k: string) { try { return s().getItem(k); } catch { return null; } },
  set(k: string, v: string | null) { try { if (v == null) s().removeItem(k); else s().setItem(k, v); } catch { /* private mode: keep in memory only */ } },
});
const local = store(() => localStorage);

let memId: string | null = null;
/** Random id for this browser, so a student sees their own orders without an account. */
export function clientId(): string {
  let id = local.get("wbd-client-id") || memId;
  if (!id) {
    id = (crypto.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36)).replace(/[^A-Za-z0-9-]/g, "");
    memId = id;
    local.set("wbd-client-id", id);
  }
  return id;
}

export class ApiError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export async function api<T>(method: string, path: string, body?: unknown, raw?: { type: string; data: Blob }): Promise<T> {
  if (raw) body = { src: await new Promise<string>((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result)); r.onerror = () => no(r.error); r.readAsDataURL(raw.data); }) };
  try { return (await run({ method, path, body, uid: clientId() })) as T; }
  catch (e) { throw new ApiError(e instanceof HttpError ? e.status : e instanceof ZodError ? 400 : 500, errorMessage(e)); }
}

/** Save a text or CSV file to the computer (no server involved). */
export function downloadText(filename: string, text: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type: type + ";charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
