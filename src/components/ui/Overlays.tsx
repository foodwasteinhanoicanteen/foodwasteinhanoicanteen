/* Site-wide overlays: toast messages, the hover tooltip, and the "Read details" card dialog. */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface OverlayCtx {
  toast: (msg: string) => void;
  tipShow: (content: ReactNode, e: { clientX: number; clientY: number }) => void;
  tipHide: () => void;
  openCard: (card: { title: string; tag: string; body: ReactNode }) => void;
}
const Ctx = createContext<OverlayCtx | null>(null);

export function useOverlay() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useOverlay outside OverlayProvider");
  return c;
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<{ text: string; on: boolean }>({ text: "", on: false });
  const timer = useRef<number>(undefined);
  const toast = useCallback((text: string) => {
    setMsg({ text, on: true });
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg((m) => ({ ...m, on: false })), 2600);
  }, []);

  const [tip, setTip] = useState<{ content: ReactNode; x: number; y: number; on: boolean }>({ content: null, x: 0, y: 0, on: false });
  const tipShow = useCallback((content: ReactNode, e: { clientX: number; clientY: number }) =>
    setTip({ content, on: true, x: Math.min(e.clientX + 14, innerWidth - 300), y: Math.min(e.clientY + 14, innerHeight - 120) }), []);
  const tipHide = useCallback(() => setTip((t) => (t.on ? { ...t, on: false } : t)), []);

  const dlg = useRef<HTMLDialogElement>(null);
  const [card, setCard] = useState<{ title: string; tag: string; body: ReactNode } | null>(null);
  const openCard = useCallback((c: { title: string; tag: string; body: ReactNode }) => setCard(c), []);
  useEffect(() => { if (card && dlg.current && !dlg.current.open) dlg.current.showModal(); }, [card]);

  return (
    <Ctx.Provider value={{ toast, tipShow, tipHide, openCard }}>
      {children}
      <dialog id="dlg" ref={dlg} aria-labelledby="dlg-title" onClose={() => setCard(null)} onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}>
        <div className="dlg-head">
          <div><div className="eyebrow" id="dlg-tag">{card?.tag}</div><h3 id="dlg-title">{card?.title}</h3></div>
          <button className="x" aria-label="Close" onClick={() => dlg.current?.close()}>×</button>
        </div>
        <div className="dlg-body">{card?.body}</div>
      </dialog>
      <div className={"tip" + (tip.on ? " show" : "")} role="tooltip" style={{ left: tip.x, top: tip.y }}>{tip.content}</div>
      <div className={"toast" + (msg.on ? " show" : "")} role="status">{msg.text}</div>
    </Ctx.Provider>
  );
}
