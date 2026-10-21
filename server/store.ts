/* Local JSON file database (data/db.json). Everything the site and CampusMeal save lives here.
   shortcut: one process holds the whole file in memory and rewrites it on every change;
   fine for one canteen pilot, upgrade to SQLite if several servers or years of data are needed. */
import fs from "node:fs";
import path from "node:path";
import type { CmData } from "../shared/schemas/campusmeal";
import { emptyCm } from "../shared/schemas/campusmeal";
import type { MediaRef } from "../shared/schemas/site";

export interface Db {
  rev: number;
  site: { fields: Record<string, string>; media: Record<string, MediaRef>; survey: { rows: (string | number)[][]; updatedAt: string } | null };
  cm: CmData;
}

export const emptyDb = (): Db => ({ rev: 0, site: { fields: {}, media: {}, survey: null }, cm: emptyCm() });

export class JsonStore {
  private data: Db;
  private queue: Promise<void> = Promise.resolve();

  constructor(private file: string) {
    this.data = JsonStore.read(file);
  }

  static read(file: string): Db {
    if (!fs.existsSync(file)) return emptyDb();
    const raw = fs.readFileSync(file, "utf8");
    try {
      const d = JSON.parse(raw) as Partial<Db>;
      const e = emptyDb();
      return { rev: d.rev || 0, site: { ...e.site, ...d.site }, cm: { ...e.cm, ...d.cm } };
    } catch (err) {
      // Never overwrite a file we could not read: the team may still need it.
      throw new Error(`${file} is not valid JSON (${(err as Error).message}). Fix or move it, then restart.`);
    }
  }

  get(): Db { return this.data; }

  /** Apply a change, bump the revision and save. Changes are written one at a time. */
  update<T>(fn: (d: Db) => T): Promise<T> {
    const run = async () => {
      const draft = structuredClone(this.data);
      const out = fn(draft);
      draft.rev = this.data.rev + 1;
      await JsonStore.write(this.file, draft);
      this.data = draft; // only after the file is safely on disk
      return out;
    };
    const p = this.queue.then(run);
    this.queue = p.then(() => undefined, () => undefined);
    return p;
  }

  static async write(file: string, d: Db) {
    await fs.promises.mkdir(path.dirname(file), { recursive: true });
    const tmp = file + ".tmp";
    await fs.promises.writeFile(tmp, JSON.stringify(d, null, 1));
    await fs.promises.rename(tmp, file); // atomic replace: a crash never leaves half a file
  }
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
