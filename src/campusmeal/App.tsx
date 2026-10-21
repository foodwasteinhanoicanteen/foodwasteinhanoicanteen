/* CampusMeal app shell: top bar, screen rail, current screen. Students use it without logging in;
   kitchen staff unlock the kitchen screens with the team PIN. */
import { Component, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { api, getPin, setPin } from "../api/client";
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

function Shell({ onAuth }: { onAuth: () => void }) {
  const { D, staff, uid, loaded, error, toast } = useCm();
  const [S, setS] = useState<NavState>(initialNav);
  const [, tick] = useState(0);
  const [pinOpen, setPinOpen] = useState(false);
  useEffect(() => { const t = setInterval(() => tick((x) => x + 1), 60000); return () => clearInterval(t); }, []); // clocks and cut-offs
  useEffect(() => { if (loaded && staff && S.role === "student" && S.view === "today" && getPin()) setS((s) => ({ ...s, role: "staff", view: "dash" })); }, [loaded, staff]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (loaded && !staff && S.role === "staff") setS((s) => ({ ...s, role: "student", view: "today" })); }, [loaded, staff, S.role]);

  const set = (p: Partial<NavState> | ((s: NavState) => Partial<NavState>)) => setS((s) => ({ ...s, ...(typeof p === "function" ? p(s) : p) }));
  const go = (view: string) => { set({ view }); window.scrollTo(0, 0); document.getElementById("main")?.focus({ preventScroll: true }); };
  const role = staff ? S.role : "student";
  const counts: Record<string, number> = { last: activeLastCalls(D).length, finish: pendingFeedback(D, uid).length, pick: ordersFor(D, todayStr()).filter((o) => o.status === "placed").length };
  const View = VIEWS[S.view] && NAV[role].some((n) => n[0] === S.view) ? VIEWS[S.view] : role === "staff" ? Dashboard : Today;

  const unlock = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPin(String(new FormData(e.currentTarget).get("pin") || "").trim());
    try {
      const s = await api<{ staff: boolean }>("GET", "/api/session");
      if (!s.staff) { setPin(null); toast("Wrong PIN."); return; }
      setPinOpen(false); setS((x) => ({ ...x, role: "staff", view: "dash" })); onAuth();
    } catch (err) { setPin(null); toast((err as Error).message); }
  };

  return (
    <NavContext.Provider value={{ S, set, go }}>
      <header className="top"><div className="top-in">
        <div className="logo"><i><svg className="i"><use href="#i-plate" /></svg></i>CampusMeal</div>
        <span className={"badge " + (error ? "demo" : "live")}>{error ? "Storage unavailable" : staff ? "Demo · kitchen staff" : "Demo"}</span>
        <span className="spacer" />
        {staff ? (
          <div className="seg" role="group" aria-label="View as">
            <button type="button" aria-pressed={role === "student"} onClick={() => { set({ role: "student", view: "today" }); window.scrollTo(0, 0); }}>Student</button>
            <button type="button" aria-pressed={role === "staff"} onClick={() => { set({ role: "staff", view: "dash" }); window.scrollTo(0, 0); }}>Kitchen</button>
            <button type="button" aria-pressed={false} onClick={() => { setPin(null); onAuth(); }}>Lock</button>
          </div>
        ) : pinOpen ? (
          <form className="seg" onSubmit={unlock} aria-label="Kitchen login">
            <input name="pin" type="password" autoComplete="off" placeholder="Kitchen PIN" aria-label="Kitchen PIN" required autoFocus style={{ width: 120 }} />
            <button type="submit" aria-pressed={false}>Unlock</button>
            <button type="button" aria-pressed={false} onClick={() => setPinOpen(false)}>Cancel</button>
          </form>
        ) : <button type="button" className="btn sm o" onClick={() => setPinOpen(true)}>Kitchen login</button>}
      </div></header>
      <div className="shell">
        <nav className="rail" aria-label="Screens">
          <span className="sep">{role === "staff" ? "Kitchen" : "Student"}</span>
          {NAV[role].map(([k, l, i]) => (
            <button key={k} type="button" aria-current={S.view === k ? "page" : undefined} onClick={() => go(k)}>
              <I n={i} />{l}{counts[k] ? <span className="cnt">{counts[k]}</span> : null}
            </button>
          ))}
        </nav>
        <main id="main" tabIndex={-1}>
          <div className="view">
            {!loaded ? <div className="empty">{error ? <><b>Could not load the saved data.</b><span>{error}</span></> : "Loading CampusMeal…"}</div>
              : <ScreenBoundary key={S.view + role}><View /></ScreenBoundary>}
          </div>
        </main>
      </div>
    </NavContext.Provider>
  );
}

export function CampusMealApp() {
  const [authKey, setAuthKey] = useState(() => (getPin() ? "pin" : "anon") + Date.now());
  return <CmProvider authKey={authKey}><Shell onAuth={() => setAuthKey("k" + Date.now())} /></CmProvider>;
}
