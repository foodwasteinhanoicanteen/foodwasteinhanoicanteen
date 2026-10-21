/* Page 6 (CampusMeal app): phone preview, function list, kitchen forecast calculator, protocol download. */
import { useState, type CSSProperties, type ReactNode } from "react";
import { createStore } from "../../state/createStore";
import { downloadText } from "../../api/client";
import { Card, FilterButtons } from "../ui/Cards";
import { CANTEENS, DASH_ROWS, DEMO, FEATS, PORT, PREVIEW_WEEK } from "../../data/content";
import { quickForecast } from "../../../shared/campusmeal/logic";

type Attrs = { className?: string; style?: CSSProperties; children?: ReactNode; hidden?: boolean; type?: "button" };
const PhIcon = ({ n }: { n: string }) => <svg viewBox="0 0 24 24"><use href={"#i-" + n} /></svg>;

/* ---------- phone preview of the student side ---------- */
type Screen = "today" | "order" | "placed" | "menu" | "last" | "check" | "impact";
const screen = createStore<Screen>("today");
const TABS: [Screen, string, string][] = [["today", "Today", "plate"], ["menu", "Week", "cal"], ["last", "Last call", "tag"], ["check", "Finish", "check"], ["impact", "Impact", "leaf"]];

export function DemoText({ part }: { part: "h" | "p" | "s" }) {
  const s = screen.use(), D = DEMO[s === "placed" ? "order" : s] || DEMO.today;
  if (part === "h") return <h3 id="demo-h">{D.h}</h3>;
  if (part === "p") return <p className="small" id="demo-p">{D.p}</p>;
  return <span id="demo-s">{D.s}</span>;
}

export function PhonePreview({ className }: Attrs) {
  const scr = screen.use();
  const [can, setCan] = useState(0), [dish, setDish] = useState(0), [port, setPort] = useState("R");
  const [rate, setRate] = useState<Record<string, number>>({}), [finish, setFinish] = useState<string | null>(null), [reasons, setReasons] = useState<string[]>([]);
  const c = CANTEENS[can], d = c.dishes[dish], portName = PORT.find((p) => p[0] === port)![1];
  const title = scr === "order" ? "Order" : TABS.find((t) => t[0] === scr)?.[1] || "";

  let body: ReactNode = null;
  if (scr === "today") body = <>
    <div className="ph-chips">{CANTEENS.map((x, i) => <button key={x.k} type="button" className={"ph-chip" + (i === can ? " on" : "")} onClick={() => setCan(i)}>{x.n}</button>)}</div>
    <div className="ph-note">Pre-order closes at <b>10:00</b>. Walk-ins are always welcome.</div>
    {c.dishes.map((x, i) => (
      <button key={x[0]} type="button" className="ph-dish" onClick={() => { setDish(i); screen.set("order"); }}>
        <span className="ph-thumb" style={{ background: x[1] }}><PhIcon n="plate" /></span>
        <div><b>{x[0]}</b><span>{x[2].map((t) => <span key={t} className="ph-tag">{t}</span>)}{c.n}</span></div>
        <span style={{ color: "var(--leaf)", fontWeight: 700 }}>›</span>
      </button>
    ))}
  </>;
  if (scr === "order") body = <>
    <button type="button" className="ph-chip" onClick={() => screen.set("today")}>‹ Back</button>
    <div className="ph-thumb" style={{ width: "100%", height: 110, background: d[1] }}><PhIcon n="plate" /></div>
    <b style={{ fontSize: "1.05rem" }}>{d[0]}</b><span className="ph-note">{c.n} · pickup 11:00–12:30</span>
    <b>Choose your portion</b>
    <div className="ph-portion">{PORT.map((p) => <button key={p[0]} type="button" className={p[0] === port ? "on" : ""} onClick={() => setPort(p[0])}><b>{p[1]}</b><br /><span style={{ fontSize: ".68rem", color: "var(--muted)" }}>{p[2]}</span></button>)}</div>
    <div className="ph-note">Free refill of rice and vegetables at the counter, so a smaller portion is never “less”.</div>
    <button type="button" className="ph-btn" onClick={() => screen.set("placed")}>Pre-order {portName} portion</button>
  </>;
  if (scr === "placed") body = <>
    <div className="ph-alert" style={{ background: "var(--leaf-soft)", borderColor: "var(--leaf)" }}><b>Pre-order placed</b><span>{d[0]} · {portName}</span><span className="small">The kitchen now counts your meal in today’s forecast. Reminder at 11:30.</span></div>
    <button type="button" className="ph-btn alt" onClick={() => screen.set("today")}>Back to today</button>
  </>;
  if (scr === "menu") body = <>
    <div className="ph-note">How interested are you? 1 = not really, 5 = very. Ratings help the kitchen plan, and are anonymous.</div>
    {PREVIEW_WEEK.map(([dy, ds], i) => (
      <div key={dy} style={{ display: "grid", gap: 6, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}><b>{dy}</b>
        {ds.map((w, j) => { const k = i + "-" + j; return (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}><span>{w}</span>
            <span className="ph-stars">{[1, 2, 3, 4, 5].map((v) => <button key={v} type="button" className={rate[k] >= v ? "on" : ""} aria-label={`${w} ${v} of 5`} onClick={() => setRate((r) => ({ ...r, [k]: v }))}>{v}</button>)}</span>
          </div>); })}
      </div>
    ))}
  </>;
  if (scr === "last") body = <>
    <div className="ph-alert"><b>Last call · Little Kitchen</b><span><b>12</b> portions of teriyaki chicken, <b>40% off</b></span><span className="small">Cooked at 11:30, kept hot. Collect before 13:45.</span><button type="button" className="ph-btn">Reserve one</button></div>
    <div className="ph-note">Last calls only happen when there is real surplus, so they cannot be predicted. The kitchen never cooks extra for them.</div>
    <div className="ph-note">Anything still left after 13:45 that is safe and untouched is packed for our partner food bank (Solution C).</div>
  </>;
  if (scr === "check") body = <>
    <b>How much of your teriyaki chicken did you finish?</b>
    <div className="ph-portion" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>{["All", "Most", "Half", "A little"].map((o) => <button key={o} type="button" className={finish === o ? "on" : ""} onClick={() => setFinish(o)}>{o}</button>)}</div>
    {finish && finish !== "All" && <><b>Why not? (optional)</b>
      <div className="ph-chips" style={{ flexWrap: "wrap" }}>{["Portion too large", "Didn’t like the taste", "Too cold", "Too salty", "Not hungry"].map((w) => <button key={w} type="button" className={"ph-chip" + (reasons.includes(w) ? " on" : "")} onClick={() => setReasons((r) => (r.includes(w) ? r.filter((x) => x !== w) : [...r, w]))}>{w}</button>)}</div></>}
    {finish && <div className="ph-note" style={{ background: "var(--leaf-soft)" }}>Thanks. Answers are pooled; the kitchen never sees who said what.</div>}
  </>;
  if (scr === "impact") body = <>
    <div className="ph-note">Only you can see this page.</div>
    <div className="ph-row big"><span>Meals finished this week</span><b>4 / 5</b></div>
    <div className="ph-row"><span>Portion you chose most</span><b>Regular</b></div>
    <b>Campus this week</b>
    <div className="ph-row"><span>Waste per meal</span><b style={{ color: "var(--leaf)" }}>−18%</b></div>
    <div className="ph-bar"><i style={{ width: "62%" }} /></div>
    <div className="ph-row"><span>Meals shared with partners</span><b>36</b></div>
    <div className="ph-note">Example numbers for the prototype.</div>
  </>;

  return (
    <div className={className} id="phone">
      <div className="ph-top"><b>CampusMeal</b><span id="ph-title">{title}</span></div>
      <div className="ph-body" id="ph-body" key={scr}>{body}</div>
      <nav className="ph-nav" id="ph-nav">
        {TABS.map((t) => <button key={t[0]} type="button" className={scr === t[0] || (scr === "order" && t[0] === "today") ? "on" : ""} onClick={() => screen.set(t[0])}><PhIcon n={t[2]} />{t[1]}</button>)}
      </nav>
    </div>
  );
}

/* ---------- all functions ---------- */
const SOL_BG: Record<string, string> = { A: "var(--cA)", B: "var(--cB)", C: "var(--cC)" };
export const FeatureFilters = ({ className, style }: Attrs) => <FilterButtons group="feat" cats={["For students", "For the kitchen", "Reporting"]} className={className} style={style} />;
export function FeatureGrid({ className }: Attrs) {
  return (
    <div className={className} id="featgrid">
      {FEATS.map((f, i) => (
        <Card key={f[0]} title={`${i + 1}. ${f[0]}`} tag={f[1]} group="feat" cat={f[1]}>
          <div className="tagline">{f[1]} · <span className={"pill " + (f[2] === "Core" ? "hi" : "md")}>{f[2]}</span>{" "}
            <span className="pill" style={SOL_BG[f[3]] ? { background: SOL_BG[f[3]], color: "#fff" } : undefined}>{f[3] === "Fit" || f[3] === "Learn" ? f[3] : "Solution " + f[3]}</span></div>
          <div className="front"><h4>{i + 1}. {f[0]}</h4><p className="small" style={{ marginTop: 6 }}>{f[4]}</p><p className="small" style={{ marginTop: 6, color: "var(--leaf)" }}><b>Why it helps:</b> {f[5]}</p></div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- kitchen forecast calculator ---------- */
const fcIn = createStore({ pre: 40, walk: 60, int: 3.6, batch: 10, old: 130 });
type FcKey = keyof ReturnType<typeof fcIn.get>;
const useFc = () => {
  const v = fcIn.use(), n = (x: number, d: number) => (Number.isFinite(x) && x ? x : d);
  const pre = n(v.pre, 0), walk = n(v.walk, 0), rt = n(v.int, 3), b = Math.max(1, n(v.batch, 10)), old = n(v.old, 0);
  return { pre, walk, rt, b, old, x: quickForecast(pre, walk, rt, b) };
};
export function ForecastInput({ name, min, max, step }: { name: FcKey; type?: string; min?: string; max?: string; step?: string; defaultValue?: string }) {
  const v = fcIn.use()[name];
  return <input id={"k-" + name} type="number" min={min} max={max} step={step} value={Number.isNaN(v) ? "" : v} onChange={(e) => fcIn.set((c) => ({ ...c, [name]: e.target.value === "" ? NaN : +e.target.value }))} />;
}
export function ForecastFormula({ className }: Attrs) {
  const { pre, walk, rt, b, x } = useFc();
  return (
    <div className={className} id="k-formula">
      interest factor = {rt} ÷ 3 = {x.f.toFixed(2)} (kept within 0.7–1.3)<br />expected walk-ins = {walk} × {x.f.toFixed(2)} = {x.w}<br />
      forecast = {pre} + {x.w} = <b>{x.fcst}</b><br />first batch = 80% × {x.fcst}, rounded up to {b}s = <b>{x.first}</b>
    </div>
  );
}
export function ForecastOut({ className }: Attrs) {
  const { old, x } = useFc(), diff = old - x.fcst;
  return (
    <div className={className} id="k-out">
      <div className="stat g"><div className="v">{x.fcst}</div><div className="l">portions forecast</div></div>
      <div className="stat g"><div className="v">{x.first}</div><div className="l">first batch at 11:00</div></div>
      <div className="stat"><div className="v">{diff > 0 ? diff : 0}</div><div className="l">fewer portions than the old habit ({old})</div></div>
    </div>
  );
}
export function ForecastNote({ className }: Attrs) {
  const { old, b, x } = useFc(), diff = old - x.fcst;
  return <div className={className} id="k-note">{diff > 0 ? `If demand matches the forecast, about ${diff} portions that used to be cooked “just in case” are never made. Top-up batches of ${b} cover any extra demand.` : "The forecast is at or above the old habit, so the kitchen cooks the same as before but in batches."}</div>;
}
export function ForecastTable() {
  return (
    <table id="dashtable">
      <thead><tr><th>Canteen</th><th>Dish</th><th className="n">Pre-orders</th><th className="n">Avg walk-ins</th><th className="n">Interest</th><th className="n">Forecast</th><th className="n">First batch</th><th className="n">Old habit</th></tr></thead>
      <tbody>{DASH_ROWS.map((r) => { const x = quickForecast(r[2], r[3], r[4], 10); return (
        <tr key={r[1]}><td>{r[0]}</td><td><b>{r[1]}</b></td><td className="n">{r[2]}</td><td className="n">{r[3]}</td><td className="n">{r[4].toFixed(1)}</td>
          <td className="n" style={{ fontWeight: 700, color: "var(--leaf)" }}>{x.fcst}</td><td className="n">{x.first}</td><td className="n muted">{r[5]}</td></tr>); })}</tbody>
    </table>
  );
}

/* ---------- protocol as a Markdown file ---------- */
export function ProtocolDownload({ className }: Attrs) {
  const save = () => {
    const doc = document.getElementById("protocol-doc");
    if (!doc) return;
    let md = "";
    doc.querySelectorAll<HTMLElement>("h3,h4,p,li,tr").forEach((el) => {
      if (el.closest("tr") && el.tagName !== "TR") return;
      if (el.tagName === "H3") md += "# " + el.innerText + "\n\n";
      else if (el.tagName === "H4") md += "\n## " + el.innerText + "\n\n";
      else if (el.tagName === "LI") md += "- " + el.innerText + "\n";
      else if (el.tagName === "TR") {
        const cells = [...el.children] as HTMLElement[];
        md += "| " + cells.map((c) => c.innerText).join(" | ") + " |\n" + (el.parentElement?.tagName === "THEAD" ? "|" + cells.map(() => "---|").join("") + "\n" : "");
      } else md += el.innerText + "\n\n";
    });
    downloadText("CampusMeal_Operating_Protocol_v1.md", md, "text/markdown");
  };
  return <button className={className} type="button" id="proto-dl" onClick={save}>Download protocol (.md)</button>;
}
