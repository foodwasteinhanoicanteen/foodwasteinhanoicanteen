/* CampusMeal data from the local server, plus write helpers and the toast. */
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { ApiError, api, clientId } from "../api/client";
import { usePolled } from "../state/usePolled";
import { emptyCm, type CmData, type Collection } from "../../shared/schemas/campusmeal";

interface CmState { rev: number; staff: boolean; uid: string | null; cm: CmData }
interface CmCtx {
  D: CmData; staff: boolean; uid: string; loaded: boolean; error: string | null;
  /** Merge a partial update into a document (like the original update()). */
  patch: (col: Collection, id: string, p: object, okMsg?: string) => Promise<boolean>;
  /** Replace a whole document (like the original set()). */
  put: (col: Collection, id: string, doc: object, okMsg?: string) => Promise<boolean>;
  toast: (m: string) => void;
  reload: () => Promise<void>;
}
const Ctx = createContext<CmCtx | null>(null);
export function useCm() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCm outside CmProvider");
  return c;
}

export function CmProvider({ authKey, children }: { authKey: string; children: ReactNode }) {
  const { data, error, accept, reload } = usePolled<CmState>("/api/cm", 4000, [authKey]);
  const [msg, setMsg] = useState({ text: "", on: false });
  const t = useRef<number>(undefined);
  const toast = useCallback((text: string) => {
    setMsg({ text, on: true });
    clearTimeout(t.current);
    t.current = window.setTimeout(() => setMsg((m) => ({ ...m, on: false })), 2600);
  }, []);

  const write = useCallback(async (method: "PATCH" | "PUT", col: Collection, id: string, body: object, okMsg?: string) => {
    try {
      accept(await api<CmState>(method, `/api/cm/${col}/${encodeURIComponent(id)}`, body));
      if (okMsg) toast(okMsg);
      return true;
    } catch (e) {
      console.warn(e);
      toast(e instanceof ApiError && e.status === 403 ? "You don’t have permission to change this." : e instanceof ApiError && e.status === 400 ? "Could not save: " + e.message : "Could not save. Check that the local server is running and try again.");
      return false;
    }
  }, [accept, toast]);

  const value = useMemo<CmCtx>(() => ({
    D: data?.cm || emptyCm(), staff: !!data?.staff, uid: data?.uid || clientId(), loaded: !!data, error,
    patch: (c, id, p, ok) => write("PATCH", c, id, p, ok),
    put: (c, id, d, ok) => write("PUT", c, id, d, ok),
    toast, reload: () => reload(true),
  }), [data, error, write, toast, reload]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={"toast" + (msg.on ? " show" : "")} role="status">{msg.text}</div>
    </Ctx.Provider>
  );
}
