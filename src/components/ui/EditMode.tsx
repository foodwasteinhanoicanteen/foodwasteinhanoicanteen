/* Team content: yellow <Field> boxes (filled from content.json), <MediaSlot> photo/video slots, and the edit bar.
   Uploads save in this browser; "Export" downloads content.json, which publishes them once committed to public/. */
import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Upload01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useSite } from "../../state/site";

interface EditCtx { pickFile: (slot: string) => void }
const Ctx = createContext<EditCtx | null>(null);

/** A value the team fills in. Shows the placeholder (yellow) until a value is saved. */
export function Field({ id, children, className }: { id: string; children?: ReactNode; className?: string }) {
  const { fields } = useSite();
  const v = fields[id];
  return <span className={"fill" + (v ? " done" : "") + (className ? " " + className : "")}>{v || children}</span>;
}

/** A found photograph (public/img/, credited in the footer) shown until the team uploads their own. */
export interface Fallback { src: string; alt: string; caption: string }

/** Photo or video slot. Shows `fallback` (or its placeholder text) until the team uploads a file. */
export function MediaSlot({ id, className, style, children, fallback }: { id: string; className?: string; style?: CSSProperties; children?: ReactNode; fallback?: Fallback }) {
  const { media } = useSite();
  const edit = useContext(Ctx);
  const m = media[id];
  const [broken, setBroken] = useState<string | null>(null);
  const src = m?.src ?? (fallback && "img/" + fallback.src);
  const has = !!src && broken !== src;
  return (<>
    <div className={(className || "media") + (has ? " has" : "") + (!m && fallback ? " hero-photo" : "")} style={style}>
      {has && (m?.kind === "video"
        ? <video src={src!} controls playsInline preload="metadata" onError={() => setBroken(src)} />
        : <img src={src!} alt={(!m && fallback?.alt) || altOf(children) || "Project photo"} loading="lazy" onError={() => setBroken(src!)} />)}
      {children}
      {edit && <Button color="secondary" size="sm" className="up absolute right-2.5 bottom-2.5" iconLeading={Upload01} onPress={() => edit.pickFile(id)}>Upload photo or video</Button>}
    </div>
    {!m && fallback && <p className="media-cap">{fallback.caption}</p>}
  </>);
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
          <Button size="sm" onPress={site.exportContent} aria-label="Export content.json: put the downloaded file in public/ and push to publish your uploads">Export content.json</Button>
          <Button size="sm" color="secondary" onPress={site.discardEdits}>Discard local edits</Button>
        </div>
      )}
    </Ctx.Provider>
  );
}
