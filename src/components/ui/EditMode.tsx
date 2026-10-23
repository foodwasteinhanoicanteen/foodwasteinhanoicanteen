/* Team content: yellow <Field> boxes (filled from content.json), <MediaSlot> photo/video slots, and the edit bar.
   Uploads save in this browser; "Export" downloads content.json, which publishes them once committed to public/. */
import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useSite } from "../../state/site";

interface EditCtx { pickFile: (slot: string) => void }
const Ctx = createContext<EditCtx | null>(null);

/** A value the team fills in. Shows the placeholder (yellow) until a value is saved. */
export function Field({ id, children, className }: { id: string; children?: ReactNode; className?: string }) {
  const { fields } = useSite();
  const v = fields[id];
  return <span className={"fill" + (v ? " done" : "") + (className ? " " + className : "")}>{v || children}</span>;
}

/** Photo or video slot. Shows public/minions.jpg until the team uploads a file. */
export function MediaSlot({ id, className, style, children }: { id: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const { media } = useSite();
  const edit = useContext(Ctx);
  const m = media[id];
  const [broken, setBroken] = useState<string | null>(null);
  const src = m ? m.src : "minions.jpg";
  const has = !!src && broken !== src;
  return (
    <div className={(className || "media") + (has ? " has" : "")} style={style}>
      {has && (m?.kind === "video"
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

/** Edit bar (bottom right, only once this browser has uploads) and the hidden file picker. */
export function EditModeProvider({ children }: { children: ReactNode }) {
  const site = useSite();
  const file = useRef<HTMLInputElement>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const ctx: EditCtx = {
    pickFile(s) { setSlot(s); if (file.current) { file.current.value = ""; file.current.click(); } },
  };

  return (
    <Ctx.Provider value={ctx}>
      {children}
      <input type="file" ref={file} accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm" hidden
        onChange={(e) => { const f = e.target.files?.[0]; if (f && slot) site.uploadMedia(slot, f); }} />
      {site.localEdits && (
        <div className="editbar show">
          <button type="button" onClick={site.exportContent} title="Put the downloaded file in public/ and push to publish your uploads">Export content.json</button>
          <button type="button" style={{ background: "transparent", border: "1px solid currentColor" }} onClick={site.discardEdits}>Discard local edits</button>
        </div>
      )}
    </Ctx.Provider>
  );
}
