/* Load data from the in-browser store and refresh it every few seconds, so other open tabs
   in this browser see each other's changes. */
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api/client";

export function usePolled<T extends { rev: number }>(path: string, everyMs: number, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rev = useRef(-1);
  const accept = useCallback((d: T) => { rev.current = d.rev; setData(d); }, []);

  const reload = useCallback(async (force = false) => {
    try {
      const d = await api<T>("GET", path);
      setError(null);
      if (force || d.rev !== rev.current) accept(d);
    } catch (e) { setError((e as Error).message); }
  }, [path, accept]);

  useEffect(() => {
    reload(true);
    const t = setInterval(() => { if (!document.hidden) reload(); }, everyMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, everyMs, ...deps]);

  return { data, error, reload, accept };
}
