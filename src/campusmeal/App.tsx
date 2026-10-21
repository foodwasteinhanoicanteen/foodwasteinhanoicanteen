/* CampusMeal app shell: top bar, screen rail, current screen. Students use it without logging in;
   anyone can switch to the kitchen screens. */
import { Component, useEffect, useState, type ReactNode } from "react";
import { CmProvider, useCm } from "./store";
import { NavContext, activeLastCalls, initialNav, pendingFeedback, type NavState } from "./nav";
import { I } from "./ui";
import { FinishCheck, Impact, LastCall, PreOrder, RateMenu, Today } from "./views/student";
import { Dashboard, Insights, MenuPlanner, Pickups, Report, Settings, Surplus, WasteLog } from "./views/staff";
import { ordersFor, todayStr } from "../../shared/campusmeal/logic";

const NAV = {
  student: [["today", "Today", "plate"], ["order", "Pre-order", "cart"], ["rate", "Rate menu", "star"], ["last", "Last call", "tag"], ["finish", "Finish-check", "check"], ["impact", "My impact", "leaf"]],
  staff: [["dash", "Dashboard", "chart"], ["pick", "Pickups", "qr"], ["surplus", "Last call & donate", "tag"], ["waste", "Waste log", "scale"], ["menu", "Menu planner", "cal"], ["insights", "Insights", "bulb"], ["report", "Weekly report", "list"], ["settings", "Settings", "gear"]],
} as const;
const VIEWS: Record<string, () => ReactNode> = {
  today: Today, order: PreOrder, rate: RateMenu, last: LastCall, finish: FinishCheck, impact: Impact,
  dash: Dashboard, pick: Pickups, surplus: Surplus, waste: WasteLog, menu: MenuPlanner, insights: Insights, report: Report, settings: Settings,
};

class ScreenBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    return this.state.err
      ? <div className="empty"><b>Something went wrong on this screen.</b><span className="small">{this.state.err.message}</span></div>
      : this.props.children;
  }
}

function Shell() {
  const { D, uid, loaded, error } = useCm();
  const [S, setS] = useState<NavState>(initialNav);
  const [, tick] = useState(0);
  useEffect(() => { const t = setInterval(() => tick((x) => x + 1), 60000); return () => clearInterval(t); }, []); // clocks and cut-offs

  const set = (p: Partial<NavState> | ((s: NavState) => Partial<NavState>)) => setS((s) => ({ ...s, ...(typeof p === "function" ? p(s) : p) }));
  const go = (view: string) => { set({ view }); window.scrollTo(0, 0); document.getElementById("main")?.focus({ preventScroll: true }); };
  const counts: Record<string, number> = { last: activeLastCalls(D).length, finish: pendingFeedback(D, uid).length, pick: ordersFor(D, todayStr()).filter((o) => o.status === "placed").length };
  const View = VIEWS[S.view] && NAV[S.role].some((n) => n[0] === S.view) ? VIEWS[S.view] : S.role === "staff" ? Dashboard : Today;

  return (
    <NavContext.Provider value={{ S, set, go }}>
      <header className="top"><div className="top-in">
        <div className="logo"><i><svg className="i"><use href="#i-plate" /></svg></i>CampusMeal</div>
        <span className={"badge " + (error ? "demo" : "live")}>{error ? "Storage unavailable" : "Demo"}</span>
        <span className="spacer" />
        <div className="seg" role="group" aria-label="View as">
          <button type="button" aria-pressed={S.role === "student"} onClick={() => { set({ role: "student", view: "today" }); window.scrollTo(0, 0); }}>Student</button>
          <button type="button" aria-pressed={S.role === "staff"} onClick={() => { set({ role: "staff", view: "dash" }); window.scrollTo(0, 0); }}>Kitchen</button>
        </div>
      </div></header>
      <div className="shell">
        <nav className="rail" aria-label="Screens">
          <span className="sep">{S.role === "staff" ? "Kitchen" : "Student"}</span>
          {NAV[S.role].map(([k, l, i]) => (
            <button key={k} type="button" aria-current={S.view === k ? "page" : undefined} onClick={() => go(k)}>
              <I n={i} />{l}{counts[k] ? <span className="cnt">{counts[k]}</span> : null}
            </button>
          ))}
        </nav>
        <main id="main" tabIndex={-1}>
          <div className="view">
            {!loaded ? <div className="empty">{error ? <><b>Could not load the saved data.</b><span>{error}</span></> : "Loading CampusMeal…"}</div>
              : <ScreenBoundary key={S.view + S.role}><View /></ScreenBoundary>}
          </div>
        </main>
      </div>
    </NavContext.Provider>
  );
}

export function CampusMealApp() {
  return <CmProvider><Shell /></CmProvider>;
}
