/* Calls to the in-browser data store (./local). Adds the anonymous browser id and, once unlocked, the team PIN. */
import { ZodError } from "zod";
import { HttpError, errorMessage, run } from "./local";

const store = (s: () => Storage) => ({
  get(k: string) { try { return s().getItem(k); } catch { return null; } },
  set(k: string, v: string | null) { try { if (v == null) s().removeItem(k); else s().setItem(k, v); } catch { /* private mode: keep in memory only */ } },
});
const local = store(() => localStorage), session = store(() => sessionStorage);

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

let pin: string | null = session.get("wbd-pin");
export const getPin = () => pin;
export function setPin(p: string | null) { pin = p; session.set("wbd-pin", p); }

export class ApiError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

// shortcut: the PIN is checked in the browser against a SHA-256 hash built into the page, so it only hides
// the editing screens; that is fine because edits stay in the editor's own browser. Use real accounts if data ever becomes shared.
declare const __PIN_HASH__: string;
const sha256 = async (s: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))), (b) => b.toString(16).padStart(2, "0")).join("");
const isStaff = async () => !!__PIN_HASH__ && !!pin && (await sha256(pin)) === __PIN_HASH__;

export async function api<T>(method: string, path: string, body?: unknown, raw?: { type: string; data: Blob }): Promise<T> {
  if (raw) body = { src: await new Promise<string>((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result)); r.onerror = () => no(r.error); r.readAsDataURL(raw.data); }) };
  try { return (await run({ method, path, body, staff: await isStaff(), editingEnabled: !!__PIN_HASH__, uid: clientId() })) as T; }
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
