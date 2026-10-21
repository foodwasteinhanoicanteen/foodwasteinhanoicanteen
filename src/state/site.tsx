/* Website data: team-edited text, uploaded media, saved survey rows (published content.json plus this
   browser's unpublished edits), and whether edit mode is on. Anyone can edit. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, downloadText } from "../api/client";
import type { SiteState } from "../../shared/schemas/site";
import type { SurveyRow } from "../../shared/survey";
import { normRow } from "../../shared/survey";
import { usePolled } from "./usePolled";
import { useOverlay } from "../components/ui/Overlays";

interface SiteCtx {
  fields: Record<string, string>;
  media: SiteState["media"];
  savedRows: SurveyRow[];
  editing: boolean;
  setEditing: (on: boolean) => void;
  saveField: (id: string, v: string) => Promise<void>;
  uploadMedia: (id: string, file: File) => Promise<void>;
  saveSurvey: (rows: SurveyRow[], okMsg: string) => Promise<boolean>;
  /** This browser has edits that are not in the published content.json yet. */
  localEdits: boolean;
  exportContent: () => void;
  discardEdits: () => Promise<void>;
}
const Ctx = createContext<SiteCtx | null>(null);

export function useSite() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite outside SiteProvider");
  return c;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const { toast } = useOverlay();
  const { data, accept } = usePolled<SiteState>("/api/site", 5000);
  const [editing, setEditing] = useState(false);
  useEffect(() => { document.body.classList.toggle("editing", editing); }, [editing]);

  const fail = useCallback((e: unknown, what: string) => toast(`${what}: ${(e as Error).message}`), [toast]);

  const value = useMemo<SiteCtx>(() => ({
    fields: data?.fields || {},
    media: data?.media || {},
    savedRows: (data?.survey?.rows || []).map((r) => normRow(r).row).filter((r): r is SurveyRow => !!r),
    editing, setEditing,
    localEdits: !!data?.local,
    async saveField(id, v) {
      try {
        accept(v ? await api<SiteState>("PUT", `/api/site/fields/${encodeURIComponent(id)}`, { v }) : await api<SiteState>("DELETE", `/api/site/fields/${encodeURIComponent(id)}`));
        toast(v ? "Saved" : "Cleared");
      } catch (e) { fail(e, "Could not save"); }
    },
    async uploadMedia(id, file) {
      if (file.size > 20 * 1024 * 1024) { toast("File is over 20 MB. Compress it and try again."); return; }
      toast("Uploading…");
      try { accept(await api<SiteState>("PUT", `/api/site/media/${encodeURIComponent(id)}`, undefined, { type: file.type, data: file })); toast("Uploaded"); }
      catch (e) { fail(e, "Upload failed"); }
    },
    async saveSurvey(rows, okMsg) {
      try { accept(await api<SiteState>("PUT", "/api/site/survey", { rows })); toast(okMsg); return true; }
      catch (e) { fail(e, "Could not save"); return false; }
    },
    exportContent() {
      const { fields = {}, media = {}, survey = null } = data || {};
      downloadText("content.json", JSON.stringify({ fields, media, survey }), "application/json");
      toast("Downloaded content.json. Put it in public/ and push to publish.");
    },
    async discardEdits() {
      try { accept(await api<SiteState>("DELETE", "/api/site")); toast("Showing the published content again"); }
      catch (e) { fail(e, "Could not discard"); }
    },
  }), [data, editing, accept, toast, fail]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
