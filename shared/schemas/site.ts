/* Validation for everything the website saves: team-edited text, uploaded media, survey rows. */
import { z } from "zod";
import { normRow } from "../survey";

export const slotId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/, "ids use letters, numbers, - and _ only");

export const FieldValue = z.object({ v: z.string().trim().min(1).max(2000) });
export type FieldValue = z.infer<typeof FieldValue>;

export const MediaRef = z.object({
  file: z.string().regex(/^[A-Za-z0-9_.-]{1,120}$/), // file name inside assets/uploads
  kind: z.enum(["photo", "video"]),
});
export type MediaRef = z.infer<typeof MediaRef>;

/** Rows are re-validated with the same rules as the import screen. */
export const SurveyPayload = z.object({
  rows: z.array(z.array(z.union([z.string(), z.number()]))).max(5000)
    .transform((rows, ctx) => rows.map((r, i) => {
      const res = normRow(r);
      if (!res.row) { ctx.addIssue({ code: "custom", message: `Row ${i + 1}: ${res.err}` }); return []; }
      return res.row;
    })),
});

export const MEDIA_TYPES: Record<string, { ext: string; kind: "photo" | "video" }> = {
  "image/png": { ext: "png", kind: "photo" }, "image/jpeg": { ext: "jpg", kind: "photo" },
  "image/webp": { ext: "webp", kind: "photo" }, "image/gif": { ext: "gif", kind: "photo" },
  "video/mp4": { ext: "mp4", kind: "video" }, "video/webm": { ext: "webm", kind: "video" },
};
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export interface SiteState {
  rev: number;
  fields: Record<string, string>;
  media: Record<string, MediaRef>;
  survey: { rows: (string | number)[][]; updatedAt: string } | null;
}
