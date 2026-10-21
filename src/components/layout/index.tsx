/* Page frame: top bar, design-thinking stepper, page sections with sub-tabs, pager, footer. */
import { createContext, useContext, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "../../state/router";
import { PAGES, STEPS, pageById } from "../../pages/meta";

export const Icon = ({ name, className = "ic" }: { name: string; className?: string }) => (
  <svg className={className}><use href={"#i-" + name} /></svg>
);

export function TopBar() {
  const { page } = useRouter();
  const nav = useRef<HTMLElement>(null);
  useEffect(() => { nav.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "nearest" }); }, [page]);
  const idx = PAGES.findIndex((p) => p.id === page);
  return (
    <header className="topbar">
      <div className="wrap">
        <a className="brand" href="#home" data-go="home"><span className="brand-mark">g</span><b>Food Waste in Hanoi canteen</b></a>
        <nav className="mainnav" id="mainnav" aria-label="Project pages" ref={nav}>
          {PAGES.map((p) => (
            <a key={p.id} href={"#" + p.id} data-go={p.id} aria-current={p.id === page ? "page" : undefined}>
              {p.id !== "home" && p.id !== "sources" && <span className="n">{p.n}</span>}{p.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="journey"><i id="journey" style={{ width: (idx / (PAGES.length - 1)) * 100 + "%" }} /></div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span>Wasted by Design · MANA3021 Business Ethics · Team Mini Social Impact Project</span>
        <span id="footnote">Yellow boxes mark content the team adds.</span>
      </div>
    </footer>
  );
}

const PageCtx = createContext<string>("home");
const TabCtx = createContext<boolean>(true);
/** True while the surrounding tab (or page, if it has no tabs) is on screen. */
export const useTabActive = () => useContext(TabCtx);

export function PageSection({ id, children }: { id: string; children: ReactNode }) {
  const { page } = useRouter();
  return (
    <PageCtx.Provider value={id}>
      <TabCtx.Provider value={page === id}>
        <section className={"page" + (page === id ? " on" : "")} id={"p-" + id} data-page={id}>{children}</section>
      </TabCtx.Provider>
    </PageCtx.Provider>
  );
}

export function Tab({ id, label, className, style, children }: { id: string; label: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const pid = useContext(PageCtx);
  const { page, tab } = useRouter();
  const on = page === pid && tab === id;
  return (
    <TabCtx.Provider value={on}>
      <section className={"tab" + (className ? " " + className : "") + (on ? " on" : "")} data-tab={id} data-label={label} style={style}>{children}</section>
    </TabCtx.Provider>
  );
}

export function SubTabs() {
  const pid = useContext(PageCtx);
  const { tab, show, page } = useRouter();
  const p = pageById(pid)!;
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sb = bar.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (sb && bar.current) bar.current.scrollLeft = Math.max(0, sb.offsetLeft - bar.current.clientWidth / 2 + sb.offsetWidth / 2);
  }, [tab, page]);
  return (
    <div className="subtabs">
      <div className="wrap" role="tablist" ref={bar}>
        {p.tabs.map(([id, label], i) => (
          <button key={id} role="tab" aria-selected={page === pid && tab === id} onClick={() => show(pid, id)}>
            <span className="k">{p.n}.{i + 1}</span>{label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Pager() {
  const pid = useContext(PageCtx);
  const { tab } = useRouter();
  const p = pageById(pid)!, pi = PAGES.indexOf(p), i = p.tabs.findIndex((t) => t[0] === tab);
  const prevPage = PAGES[pi - 1], nextPage = PAGES[pi + 1];
  return (
    <div className="pager" data-pager={pid}>
      {i > 0 ? <button data-go={`${pid}-${p.tabs[i - 1][0]}`}><small>Previous</small>← {p.tabs[i - 1][1]}</button>
        : prevPage ? <button data-go={prevPage.id}><small>Previous page</small>← {prevPage.label}</button> : null}
      {i < p.tabs.length - 1 ? <button data-go={`${pid}-${p.tabs[i + 1][0]}`} style={{ marginLeft: "auto", textAlign: "right" }}><small>Next</small>{p.tabs[i + 1][1]} →</button>
        : nextPage ? <button data-go={nextPage.id} style={{ marginLeft: "auto", textAlign: "right", background: "var(--ink)", color: "var(--panel)", borderColor: "var(--ink)" }}><small style={{ color: "inherit", opacity: 0.7 }}>Next page</small>{nextPage.label} →</button> : null}
    </div>
  );
}

/** The eight design-thinking steps, with the current one highlighted. */
export function StageStepper({ current }: { current: number }) {
  return (
    <div className="stage" aria-label={`Design thinking step ${current} of ${STEPS.length}`}>
      {STEPS.map((p, i) => (
        <button key={p.id} type="button" data-go={p.id} aria-current={i + 1 === current ? "step" : undefined} className={i + 1 < current ? "done" : ""}>
          <Icon name={p.ic!} />{i + 1} {p.stage}
        </button>
      ))}
    </div>
  );
}

/** Home page cards: one per design-thinking step. */
export function HomeCards() {
  return (
    <div className="dt" id="homecards">
      {STEPS.map((p, i) => (
        <button key={p.id} data-go={p.id}>
          <span className="n">STEP {i + 1}</span><Icon name={p.ic!} /><b>{p.stage}</b>
          <span className="small"><b style={{ fontSize: "inherit", fontFamily: "inherit" }}>{p.label}.</b> {p.desc}</span>
          <span className="rb">{p.rub}</span>
        </button>
      ))}
    </div>
  );
}
