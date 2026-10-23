/* Site-wide overlays: toast messages, the hover tooltip, and the "Read details" card dialog (Untitled UI modal). */
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";

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

  const [card, setCard] = useState<{ title: string; tag: string; body: ReactNode } | null>(null);
  const openCard = useCallback((c: { title: string; tag: string; body: ReactNode }) => setCard(c), []);

  return (
    <Ctx.Provider value={{ toast, tipShow, tipHide, openCard }}>
      {children}
      <ModalOverlay isDismissable isOpen={!!card} onOpenChange={(o) => { if (!o) setCard(null); }}>
        <Modal className="max-w-[720px]">
          <Dialog id="dlg" aria-labelledby="dlg-title">
            <div className="dlg-head">
              <div><div className="eyebrow" id="dlg-tag">{card?.tag}</div><h3 id="dlg-title">{card?.title}</h3></div>
              <Button color="tertiary" size="sm" aria-label="Close" iconLeading={XClose} onPress={() => setCard(null)} />
            </div>
            <div className="dlg-body">{card?.body}</div>
          </Dialog>
        </Modal>
      </ModalOverlay>
      <div className={"tip bg-primary-solid text-white shadow-lg" + (tip.on ? " show" : "")} role="tooltip" style={{ left: tip.x, top: tip.y }}>{tip.content}</div>
      <div className={"toast bg-primary-solid text-white shadow-lg" + (msg.on ? " show" : "")} role="status">{msg.text}</div>
    </Ctx.Provider>
  );
}
