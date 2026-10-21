/* Team-editable content: yellow <Field> boxes, <MediaSlot> photo/video slots, and the edit bar.
   Edits save in this browser; "Export" downloads content.json, which publishes them once committed to public/. */
import { createContext, useContext, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useSite } from "../../state/site";

interface EditCtx { editField: (id: string, placeholder: string) => void; pickFile: (slot: string) => void }
const Ctx = createContext<EditCtx | null>(null);

/** A value the team fills in. Shows the placeholder (yellow) until a value is saved. */
export function Field({ id, children, className }: { id: string; children?: ReactNode; className?: string }) {
  const { fields } = useSite();
  const edit = useContext(Ctx);
  const v = fields[id];
  const ph = typeof children === "string" ? children : String(children ?? "");
  return (
    <>
      <span className={"fill" + (v ? " done" : "") + (className ? " " + className : "")}>{v || children}</span>
      {edit && <button type="button" className="edit-btn" aria-label={"Edit " + ph} onClick={() => edit.editField(id, ph)}>edit</button>}
    </>
  );
}

/** Photo or video slot. Placeholder children show until the team uploads a file. */
export function MediaSlot({ id, className, style, children }: { id: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const { media } = useSite();
  const edit = useContext(Ctx);
  const m = media[id];
  const [broken, setBroken] = useState<string | null>(null);
  const src = m ? m.src : null;
  const has = !!src && broken !== src;
  return (
    <div className={(className || "media") + (has ? " has" : "")} style={style}>
      {has && (m!.kind === "video"
        ? <video src={src!} controls playsInline preload="metadata" onError={() => setBroken(src)} />
        : <img src={src!} alt={altOf(children) || "Project photo"} loading="lazy" onError={() => setBroken(src)} />)}
      {children}
      {edit && <button type="button" className="up" onClick={() => edit.pickFile(id)}>Upload photo or video</button>}
    </div>
  );
}
function altOf(n: ReactNode): string {
  // use the placeholder's bold title as the alt text, like the original
  let out = "";
  const walk = (x: ReactNode) => {
    if (out || x == null || typeof x !== "object") return;
    if (Array.isArray(x)) return x.forEach(walk);
    const el = x as { type?: unknown; props?: { children?: ReactNode } };
    if (el.type === "b" && typeof el.props?.children === "string") out = el.props.children;
    else walk(el.props?.children);
  };
  walk(n);
  return out;
}

/** Edit bar (bottom right), the edit dialog and the hidden file picker. */
export function EditModeProvider({ children }: { children: ReactNode }) {
  const site = useSite();
  const dlg = useRef<HTMLDialogElement>(null), file = useRef<HTMLInputElement>(null);
  const [cur, setCur] = useState<{ id: string; ph: string; v: string } | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const ctx: EditCtx | null = site.editing ? {
    editField(id, ph) { setCur({ id, ph, v: site.fields[id] || "" }); (document.getElementById("dlg") as HTMLDialogElement | null)?.close(); dlg.current?.showModal(); },
    pickFile(s) { setSlot(s); if (file.current) { file.current.value = ""; file.current.click(); } },
  } : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    dlg.current?.close();
    if (cur && cur.v.trim() !== (site.fields[cur.id] || "")) site.saveField(cur.id, cur.v.trim());
  };

  return (
    <Ctx.Provider value={ctx}>
      {children}
      <dialog ref={dlg} aria-labelledby="f-title">
        <form className="dlg-body" style={{ paddingTop: 22 }} onSubmit={submit}>
          <h3 id="f-title">Edit</h3>
          <label htmlFor="f-input" className="small muted">Placeholder: {cur?.ph}</label>
          <textarea id="f-input" rows={3} maxLength={2000} value={cur?.v || ""} onChange={(e) => setCur((c) => c && { ...c, v: e.target.value })}
            style={{ font: "inherit", padding: 10, border: "1px solid var(--line)", borderRadius: 8, background: "var(--paper)", color: "var(--ink)", width: "100%" }} autoFocus />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button type="button" className="navcard" style={{ padding: "8px 12px" }} onClick={() => { dlg.current?.close(); if (cur) site.saveField(cur.id, ""); }}>Clear</button>
            <button type="button" className="navcard" style={{ padding: "8px 12px" }} onClick={() => dlg.current?.close()}>Cancel</button>
            <button type="submit" className="navcard" style={{ padding: "8px 12px", background: "var(--ink)", color: "var(--panel)" }}>Save</button>
          </div>
        </form>
      </dialog>
      <input type="file" ref={file} accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm" hidden
        onChange={(e) => { const f = e.target.files?.[0]; if (f && slot) site.uploadMedia(slot, f); }} />
      <div className="editbar show">
        <span>{site.editing ? "Editing: click “edit” or “Upload”" : "Edit mode"}</span>
        <button type="button" onClick={() => site.setEditing(!site.editing)}>{site.editing ? "Turn off" : "Turn on"}</button>
        {site.editing && <button type="button" onClick={site.exportContent} title="Put the downloaded file in public/ and push to publish your edits">Export content.json</button>}
        {site.editing && site.localEdits && <button type="button" style={{ background: "transparent", border: "1px solid currentColor" }} onClick={site.discardEdits}>Discard local edits</button>}
      </div>
    </Ctx.Provider>
  );
}
