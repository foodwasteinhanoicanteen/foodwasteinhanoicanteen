/* The old Node server, moved into the browser so the site runs on GitHub Pages:
   same routes and rules, data kept in this browser's IndexedDB.
   Team content (text, media, survey) published for everyone comes from content.json next to the page;
   a team member's edits stay local until they export content.json and commit it to public/. */
import { ZodError } from "zod";
import { demoSeed } from "../../shared/campusmeal/demo";
import { COLLECTIONS, emptyCm, isCollection, type CmData } from "../../shared/schemas/campusmeal";
import { FieldValue, MediaUpload, SurveyPayload, slotId, type SiteContent } from "../../shared/schemas/site";

export interface Db {
  rev: number;
  /** null = no local edits, show the published content.json */
  site: SiteContent | null;
  cm: CmData;
}
export interface Req { method: string; path: string; body?: unknown; uid: string | null }

export class HttpError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export const emptySite = (): SiteContent => ({ fields: {}, media: {}, survey: null });

/** Run one request against `d`. Mutates `d` on writes and reports whether it did. Pure, so it is testable in Node. */
export function handle(d: Db, published: SiteContent | null, r: Req): { out: unknown; changed: boolean } {
  const site = () => ({ rev: d.rev, local: !!d.site, ...(d.site || published || emptySite()) });
  const cmView = () => ({ rev: d.rev, uid: r.uid, cm: d.cm });
  // first local edit starts from what everyone currently sees
  const editSite = () => (d.site ??= structuredClone(published || emptySite()));
  const obj = (b: unknown) => { if (!b || typeof b !== "object" || Array.isArray(b)) throw new HttpError(400, "Send an object."); return b as Record<string, unknown>; };

  const { method: m, path: p } = r;
  let g: RegExpExecArray | null;
  if (m === "GET" && p === "/api/site") return { out: site(), changed: false };
  if (m === "GET" && p === "/api/cm") return { out: cmView(), changed: false };

  if (m === "DELETE" && p === "/api/site") { d.site = null; return { out: site(), changed: true }; }
  if ((g = /^\/api\/site\/fields\/([^/]+)$/.exec(p)) && (m === "PUT" || m === "DELETE")) {
    const key = slotId.parse(decodeURIComponent(g[1])), s = editSite();
    if (m === "PUT") s.fields[key] = FieldValue.parse(r.body).v; else delete s.fields[key];
    return { out: site(), changed: true };
  }
  if ((g = /^\/api\/site\/media\/([^/]+)$/.exec(p)) && (m === "PUT" || m === "DELETE")) {
    const key = slotId.parse(decodeURIComponent(g[1])), s = editSite();
    if (m === "PUT") s.media[key] = MediaUpload.parse(r.body); else delete s.media[key];
    return { out: site(), changed: true };
  }
  if (m === "PUT" && p === "/api/site/survey") {
    const s = editSite(), { rows } = SurveyPayload.parse(r.body);
    s.survey = rows.length ? { rows, updatedAt: new Date().toISOString() } : null;
    return { out: site(), changed: true };
  }

  if ((g = /^\/api\/cm\/([a-z]+)\/([^/]+)$/.exec(p)) && ["PUT", "PATCH", "DELETE"].includes(m)) {
    const col = g[1], key = slotId.parse(decodeURIComponent(g[2]));
    if (!isCollection(col)) throw new HttpError(404, "Unknown collection.");
    const docs = d.cm[col] as Record<string, unknown>;
    if (m === "DELETE") delete docs[key];
    else {
      const body = obj(r.body);
      const next = m === "PATCH" ? deepMerge(structuredClone((docs[key] as Record<string, unknown>) || {}), body) : body;
      docs[key] = COLLECTIONS[col].schema.parse(next); // validate the whole document after merging
    }
    return { out: cmView(), changed: true };
  }
  throw new HttpError(404, "Not found.");
}

/** Merge a partial update into a document (objects merge, everything else replaces). */
export function deepMerge<T extends Record<string, unknown>>(target: T, patch: Record<string, unknown>): T {
  for (const k of Object.keys(patch)) {
    if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
    const v = patch[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const cur = target[k];
      const base = cur && typeof cur === "object" && !Array.isArray(cur) ? (cur as Record<string, unknown>) : {};
      (target as Record<string, unknown>)[k] = deepMerge(base, v as Record<string, unknown>);
    } else (target as Record<string, unknown>)[k] = v;
  }
  return target;
}

export const errorMessage = (e: unknown) =>
  e instanceof ZodError ? e.issues.slice(0, 3).map((i) => `${i.path.join(".") || "value"}: ${i.message}`).join("; ") : (e as Error).message;

// ---- browser storage -------------------------------------------------------------------------

let published: Promise<SiteContent | null> | null = null;
const loadPublished = () => (published ??= fetch("content.json", { cache: "no-cache" })
  .then((res) => (res.ok ? (res.json() as Promise<SiteContent>) : null))
  .then((c) => (c ? { ...emptySite(), ...c } : null))
  .catch(() => null));

let open: Promise<IDBDatabase> | null = null;
const idb = () => (open ??= new Promise((resolve, reject) => {
  const o = indexedDB.open("wasted-by-design", 1);
  o.onupgradeneeded = () => o.result.createObjectStore("kv");
  o.onsuccess = () => resolve(o.result);
  o.onerror = () => reject(o.error);
}));

/** Read, change and save the database in one IndexedDB transaction, so two open tabs never overwrite each other. */
export async function run(r: Req): Promise<unknown> {
  const pub = await loadPublished(), db = await idb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("kv", "readwrite"), kv = tx.objectStore("kv");
    let out: unknown, err: unknown;
    const get = kv.get("db");
    get.onsuccess = () => {
      // a new browser starts with the sample CampusMeal weeks so the demo is not empty
      const d: Db = get.result || { rev: 0, site: null, cm: demoSeed() };
      d.cm = { ...emptyCm(), ...d.cm };
      try {
        const res = handle(d, pub, r);
        out = res.out;
        if (res.changed || !get.result) { d.rev += +res.changed; (out as { rev: number }).rev = d.rev; kv.put(d, "db"); }
      } catch (e) { err = e; tx.abort(); }
    };
    tx.oncomplete = () => resolve(out);
    tx.onabort = tx.onerror = () => reject(err ?? tx.error);
  });
}
