/* Page frame: top bar, design-thinking stepper, page sections with sub-tabs, pager, footer. */
import { createContext, useContext, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/base/buttons/button";
import { Tab as TabItem, TabList, Tabs } from "@/components/application/tabs/tabs";
import { useRouter } from "../../state/router";
import { PAGES, STEPS, pageById } from "../../pages/meta";

export const Icon = ({ name, className = "ic" }: { name: string; className?: string }) => (
  <svg className={className}><use href={"#i-" + name} /></svg>
);

/** Untitled UI button that opens a page or tab ("problem", "survey-anova"). Use instead of data-go on buttons:
    react-aria buttons stop the click before the router's document listener sees it. */
export function GoButton({ to, ...p }: Omit<ButtonProps, "onPress"> & { to: string }) {
  const { go } = useRouter();
  return <Button {...p} onPress={() => go(to)} />;
}

export function TopBar() {
  const { page } = useRouter();
  const nav = useRef<HTMLElement>(null);
  useEffect(() => { nav.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "nearest" }); }, [page]);
  const idx = PAGES.findIndex((p) => p.id === page);
  return (
    <header className="topbar">
      <div className="wrap">
        <a className="brand" href="#home" data-go="home"><span className="brand-mark">g</span><b>Wasted by Design</b></a>
        <nav className="mainnav" id="mainnav" aria-label="Project pages" ref={nav}>
          {PAGES.filter((p) => p.id !== "home").map((p) => (
            <GoButton key={p.id} to={p.id} size="sm" color={p.id === page ? "primary" : "tertiary"} aria-current={p.id === page ? "page" : undefined} className="flex-none">
              {p.label}
            </GoButton>
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
      <div className="wrap">
        <p className="footname">Wasted by Design</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span>MANA3021 Business Ethics · Team Mini Social Impact Project</span>
          <span id="footnote">Yellow boxes mark content the team adds.</span>
        </div>
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
        {/* only the open page is rendered, so the document has one h1 and one set of ids at a time */}
        <section className={"page" + (page === id ? " on" : "")} id={"p-" + id} data-page={id}>{page === id && children}</section>
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
      <div className="wrap" ref={bar}>
        <Tabs selectedKey={(page === pid && tab) || p.tabs[0][0]} onSelectionChange={(k) => show(pid, String(k))}>
          <TabList type="button-brand" size="sm" aria-label={p.label}>
            {p.tabs.map(([id, label], i) => <TabItem key={id} id={id}><span className="k">{p.n}.{i + 1}</span>{label}</TabItem>)}
          </TabList>
        </Tabs>
      </div>
    </div>
  );
}

/* Two-line pager buttons: Button wraps its children in one span, so stack that span's lines. */
const pagerBtn = { size: "lg" as const, className: "h-auto whitespace-normal text-left *:data-text:grid" };

export function Pager() {
  const pid = useContext(PageCtx);
  const { tab } = useRouter();
  const p = pageById(pid)!, pi = PAGES.indexOf(p), i = p.tabs.findIndex((t) => t[0] === tab);
  const prevPage = PAGES[pi - 1], nextPage = PAGES[pi + 1];
  return (
    <div className="pager" data-pager={pid}>
      {i > 0 ? <GoButton {...pagerBtn} color="secondary" to={`${pid}-${p.tabs[i - 1][0]}`}><small>Previous</small>← {p.tabs[i - 1][1]}</GoButton>
        : prevPage ? <GoButton {...pagerBtn} color="secondary" to={prevPage.id}><small>Previous page</small>← {prevPage.label}</GoButton> : null}
      {i < p.tabs.length - 1 ? <GoButton {...pagerBtn} color="secondary" className={pagerBtn.className + " ml-auto items-end text-right"} to={`${pid}-${p.tabs[i + 1][0]}`}><small>Next</small>{p.tabs[i + 1][1]} →</GoButton>
        : nextPage ? <GoButton {...pagerBtn} color="primary" className={pagerBtn.className + " ml-auto items-end text-right"} to={nextPage.id}><small style={{ color: "inherit", opacity: 0.8 }}>Next page</small>{nextPage.label} →</GoButton> : null}
    </div>
  );
}

/** The eight design-thinking steps, with the current one highlighted. */
export function StageStepper({ current }: { current: number }) {
  return (
    <div className="stage" aria-label={`Design thinking step ${current} of ${STEPS.length}`}>
      {STEPS.map((p, i) => (
        <GoButton key={p.id} to={p.id} size="xs" color={i + 1 === current ? "primary" : "secondary"} aria-current={i + 1 === current ? "step" : undefined}
          iconLeading={<Icon name={p.ic!} className="ic size-4" />} className={i + 1 < current ? "done text-brand-secondary" : ""}>
          {p.stage}
        </GoButton>
      ))}
    </div>
  );
}

/** Home page cards: one per design-thinking step. */
export function HomeCards() {
  return (
    <ol className="dt" id="homecards">
      {STEPS.map((p) => (
        <li key={p.id}>
          <GoButton to={p.id} color="tertiary" size="lg" className="h-auto w-full items-start justify-start whitespace-normal text-left *:data-text:grid *:data-text:gap-1">
            <b>{p.stage}</b>
            <span className="small"><b style={{ fontSize: "inherit", fontFamily: "inherit", letterSpacing: 0 }}>{p.label}.</b> {p.desc}</span>
            <span className="rb">{p.rub}</span>
          </GoButton>
        </li>
      ))}
    </ol>
  );
}
