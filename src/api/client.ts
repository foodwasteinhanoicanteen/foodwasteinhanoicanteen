/* Calls to the local server. Adds the anonymous browser id and, once unlocked, the team PIN. */

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

export async function api<T>(method: string, path: string, body?: unknown, raw?: { type: string; data: Blob }): Promise<T> {
  const headers: Record<string, string> = { "x-client-id": clientId() };
  if (pin) headers["x-staff-pin"] = pin;
  let payload: BodyInit | undefined;
  if (raw) { headers["content-type"] = raw.type; payload = raw.data; }
  else if (body !== undefined) { headers["content-type"] = "application/json"; payload = JSON.stringify(body); }
  let res: Response;
  try { res = await fetch(path, { method, headers, body: payload }); }
  catch { throw new ApiError(0, "Cannot reach the local server. Is `npm run dev` still running?"); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error || `Request failed (${res.status}).`);
  return data as T;
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
