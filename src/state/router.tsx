/* Hash routing, same links as the original site: #problem, #problem-causes, #survey-anova … */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PAGES, pageById } from "../pages/meta";

export interface Route { page: string; tab: string | null }
interface RouterCtx extends Route { go: (token: string) => void; show: (page: string, tab?: string | null) => void }

const Ctx = createContext<RouterCtx | null>(null);
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** "survey-anova" → page survey, tab anova. Unknown pages fall back to home; unknown tabs to the first tab. */
export function parseToken(token: string): Route {
  const [pid, ...rest] = String(token).split("-");
  const p = pageById(pid) || PAGES[0];
  const tid = rest.join("-") || null;
  const tab = p.tabs.find((t) => t[0] === tid)?.[0] ?? p.tabs[0]?.[0] ?? null;
  return { page: p.id, tab };
}
const tokenOf = (r: Route) => { const p = pageById(r.page)!; return r.tab && p.tabs.findIndex((t) => t[0] === r.tab) > 0 ? `${r.page}-${r.tab}` : r.page; };

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseToken(location.hash.slice(1) || "home"));

  const cur = useRef(route);
  cur.current = route;
  const show = useCallback((page: string, tab: string | null = null) => {
    const next = parseToken(tab ? `${page}-${tab}` : page);
    const href = pageById(next.page)?.tabs.find((t) => t[0] === next.tab)?.[2];
    if (href) { location.assign(href); return; }
    const changedPage = cur.current.page !== next.page;
    setRoute(next);
    requestAnimationFrame(() => {
      if (changedPage) window.scrollTo({ top: 0, behavior: "instant" });
      else {
        const st = document.querySelector(`#p-${next.page} .subtabs`);
        if (st) { const y = st.getBoundingClientRect().top + window.scrollY - 60; if (window.scrollY > y) window.scrollTo({ top: y, behavior: reduceMotion() ? "instant" : "smooth" }); }
      }
    });
  }, []);
  const go = useCallback((token: string) => { const r = parseToken(token); show(r.page, token.includes("-") ? r.tab : null); }, [show]);

  useEffect(() => {
    const t = tokenOf(route);
    if (location.hash.slice(1) !== t) { try { history.replaceState(null, "", "#" + t); } catch { /* ignore */ } }
  }, [route]);

  useEffect(() => {
    const onHash = () => { const h = location.hash.slice(1); if (h) go(h); };
    // Any element with data-go="page" or data-go="page-tab" works as a link, as in the original markup.
    const onClick = (e: MouseEvent) => {
      const g = (e.target as Element | null)?.closest?.("[data-go]") as HTMLElement | null;
      if (g) { e.preventDefault(); go(g.dataset.go!); }
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("hashchange", onHash); document.removeEventListener("click", onClick); };
  }, [go]);

  const value = useMemo(() => ({ ...route, go, show }), [route, go, show]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRouter() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRouter outside RouterProvider");
  return c;
}
