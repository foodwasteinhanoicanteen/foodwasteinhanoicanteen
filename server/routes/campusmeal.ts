/* CampusMeal API. Same document layout as the original app:
   settings/main, dishes/{id}, days/{date}, log/{date}  → read by everyone, written by kitchen staff
   orders/{uid}, ratings/{uid}, feedback/{uid}          → each student reads and writes only their own; staff see all */
import type { IncomingMessage } from "node:http";
import { clientId, isStaff } from "../auth";
import { HttpError, Route, readJson, sendJson } from "../http";
import { JsonStore, deepMerge } from "../store";
import { COLLECTIONS, Collection, CmData, isCollection } from "../../shared/schemas/campusmeal";
import { slotId } from "../../shared/schemas/site";

const PRIVATE: Collection[] = ["orders", "ratings", "feedback"];

export function cmRoutes(store: JsonStore): Route[] {
  const view = (req: IncomingMessage) => {
    const d = store.get(), staff = isStaff(req), uid = clientId(req);
    const cm: CmData = { ...d.cm };
    if (!staff) for (const c of PRIVATE) (cm as unknown as Record<string, unknown>)[c] = uid && d.cm[c][uid] ? { [uid]: d.cm[c][uid] } : {};
    return { rev: d.rev, staff, uid, cm };
  };

  const target = (req: IncomingMessage, col: string, id: string) => {
    if (!isCollection(col)) throw new HttpError(404, "Unknown collection.");
    const key = slotId.parse(id), staff = isStaff(req);
    if (COLLECTIONS[col].staffOnly && !staff) throw new HttpError(403, "Only kitchen staff can change this.");
    if (!COLLECTIONS[col].staffOnly && !staff && clientId(req) !== key) throw new HttpError(403, "You can only change your own orders, ratings and feedback.");
    return { col, key };
  };

  const write = async (req: IncomingMessage, col: string, id: string, merge: boolean) => {
    const t = target(req, col, id), body = await readJson(req);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new HttpError(400, "Send an object.");
    const cur = store.get().cm[t.col][t.key] as Record<string, unknown> | undefined;
    const next = merge ? deepMerge(structuredClone(cur || {}), body as Record<string, unknown>) : body;
    const parsed = COLLECTIONS[t.col].schema.parse(next); // validate the whole document after merging
    await store.update((d) => { (d.cm[t.col] as Record<string, unknown>)[t.key] = parsed; });
  };

  return [
    { method: "GET", pattern: /^\/api\/cm$/, handler: (req, res) => sendJson(res, 200, view(req)) },
    { method: "PUT", pattern: /^\/api\/cm\/([a-z]+)\/([^/]+)$/, handler: async (req, res, [c, id]) => { await write(req, c, id, false); sendJson(res, 200, view(req)); } },
    { method: "PATCH", pattern: /^\/api\/cm\/([a-z]+)\/([^/]+)$/, handler: async (req, res, [c, id]) => { await write(req, c, id, true); sendJson(res, 200, view(req)); } },
    { method: "DELETE", pattern: /^\/api\/cm\/([a-z]+)\/([^/]+)$/, handler: async (req, res, [c, id]) => {
      const t = target(req, c, id);
      await store.update((d) => { delete (d.cm[t.col] as Record<string, unknown>)[t.key]; });
      sendJson(res, 200, view(req));
    } },
  ];
}
