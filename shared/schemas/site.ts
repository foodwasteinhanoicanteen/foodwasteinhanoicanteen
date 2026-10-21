/* Validation for everything the website saves: team-edited text, uploaded media, survey rows. */
import { z } from "zod";
import { normRow } from "../survey";

export const slotId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/, "ids use letters, numbers, - and _ only");

export const FieldValue = z.object({ v: z.string().trim().min(1).max(2000) });
export type FieldValue = z.infer<typeof FieldValue>;

export const MEDIA_TYPES: Record<string, { ext: string; kind: "photo" | "video" }> = {
  "image/png": { ext: "png", kind: "photo" }, "image/jpeg": { ext: "jpg", kind: "photo" },
  "image/webp": { ext: "webp", kind: "photo" }, "image/gif": { ext: "gif", kind: "photo" },
  "video/mp4": { ext: "mp4", kind: "video" }, "video/webm": { ext: "webm", kind: "video" },
};
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export const MediaRef = z.object({
  src: z.string(), // data: URL of the uploaded file, or a file path next to the page
  kind: z.enum(["photo", "video"]),
});
export type MediaRef = z.infer<typeof MediaRef>;

/** An upload: only the photo and video types above, as a data: URL, kind taken from the type. */
export const MediaUpload = z.object({ src: z.string().max(Math.ceil(MAX_UPLOAD_BYTES * 4 / 3) + 100) })
  .transform(({ src }, ctx) => {
    const t = MEDIA_TYPES[/^data:([a-z0-9/+.-]+);base64,/.exec(src)?.[1] || ""];
    if (!t) { ctx.addIssue({ code: "custom", message: "Use a JPG, PNG, WebP, GIF, MP4 or WebM file." }); return z.NEVER; }
    return { src, kind: t.kind } satisfies MediaRef;
  });

/** Rows are re-validated with the same rules as the import screen. */
export const SurveyPayload = z.object({
  rows: z.array(z.array(z.union([z.string(), z.number()]))).max(5000)
    .transform((rows, ctx) => rows.map((r, i) => {
      const res = normRow(r);
      if (!res.row) { ctx.addIssue({ code: "custom", message: `Row ${i + 1}: ${res.err}` }); return []; }
      return res.row;
    })),
});


/** What content.json holds and what the team edits. */
export interface SiteContent {
  fields: Record<string, string>;
  media: Record<string, MediaRef>;
  survey: { rows: (string | number)[][]; updatedAt: string } | null;
}
/** `local` = this browser has edits that are not in content.json yet. */
export type SiteState = SiteContent & { rev: number; local: boolean };
