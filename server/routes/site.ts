/* Website API: team-edited text fields, photo/video slots (files in assets/uploads), survey rows. */
import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { config } from "../config";
import { requireStaff } from "../auth";
import { HttpError, Route, readBody, readJson, sendJson } from "../http";
import type { JsonStore } from "../store";
import { FieldValue, MAX_UPLOAD_BYTES, MEDIA_TYPES, SiteState, SurveyPayload, slotId } from "../../shared/schemas/site";

export function siteRoutes(store: JsonStore): Route[] {
  const state = (): SiteState => { const d = store.get(); return { rev: d.rev, ...d.site }; };
  const removeUpload = (file?: string) => {
    if (!file) return;
    fs.promises.unlink(path.join(config.uploadsDir, path.basename(file))).catch(() => undefined);
  };

  return [
    { method: "GET", pattern: /^\/api\/site$/, handler: (_req, res) => sendJson(res, 200, state()) },

    { method: "PUT", pattern: /^\/api\/site\/fields\/([^/]+)$/, handler: async (req, res, [id]) => {
      requireStaff(req);
      const key = slotId.parse(id), { v } = FieldValue.parse(await readJson(req));
      await store.update((d) => { d.site.fields[key] = v; });
      sendJson(res, 200, state());
    } },
    { method: "DELETE", pattern: /^\/api\/site\/fields\/([^/]+)$/, handler: async (req, res, [id]) => {
      requireStaff(req);
      const key = slotId.parse(id);
      await store.update((d) => { delete d.site.fields[key]; });
      sendJson(res, 200, state());
    } },

    // Body is the raw file; Content-Type says what it is.
    { method: "PUT", pattern: /^\/api\/site\/media\/([^/]+)$/, handler: async (req, res, [id]) => {
      requireStaff(req);
      const key = slotId.parse(id);
      const type = MEDIA_TYPES[String(req.headers["content-type"] || "").split(";")[0].trim()];
      if (!type) throw new HttpError(415, "Use a JPG, PNG, WebP, GIF, MP4 or WebM file.");
      const buf = await readBody(req, MAX_UPLOAD_BYTES);
      if (!buf.length) throw new HttpError(400, "The file is empty.");
      const file = `${key}-${randomBytes(4).toString("hex")}.${type.ext}`;
      await fs.promises.mkdir(config.uploadsDir, { recursive: true });
      await fs.promises.writeFile(path.join(config.uploadsDir, file), buf);
      const old = store.get().site.media[key]?.file;
      await store.update((d) => { d.site.media[key] = { file, kind: type.kind }; });
      removeUpload(old);
      sendJson(res, 200, state());
    } },
    { method: "DELETE", pattern: /^\/api\/site\/media\/([^/]+)$/, handler: async (req, res, [id]) => {
      requireStaff(req);
      const key = slotId.parse(id), old = store.get().site.media[key]?.file;
      await store.update((d) => { delete d.site.media[key]; });
      removeUpload(old);
      sendJson(res, 200, state());
    } },

    { method: "PUT", pattern: /^\/api\/site\/survey$/, handler: async (req, res) => {
      requireStaff(req);
      const { rows } = SurveyPayload.parse(await readJson(req, 10 * 1048576));
      await store.update((d) => { d.site.survey = rows.length ? { rows, updatedAt: new Date().toISOString() } : null; });
      sendJson(res, 200, state());
    } },
  ];
}
