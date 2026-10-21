/* Page 1 (The problem): calculator, "where" donut, bar charts, food journey, law timeline. */
import type { CSSProperties, KeyboardEvent } from "react";
import { createStore } from "../../state/createStore";
import { useOverlay } from "../ui/Overlays";
import { CHAIN, CHARTS, DONUT, LAW } from "../../data/content";

type Attrs = { className?: string; style?: CSSProperties; "aria-label"?: string; role?: string; viewBox?: string };

/* ---------- one canteen, one year ---------- */
const calc = createStore({ meals: 1000, g: 118, days: 200, red: 25 });
type CalcKey = keyof ReturnType<typeof calc.get>;
export function CalcInput({ name, ...a }: { name: CalcKey; type?: string; min?: string; max?: string; defaultValue?: string }) {
  const v = calc.use()[name];
  return <input id={"c-" + name} type="number" min={a.min} max={a.max} value={Number.isNaN(v) ? "" : v}
    onChange={(e) => calc.set((c) => ({ ...c, [name]: e.target.value === "" ? NaN : +e.target.value }))} />;
}
export function CalcOut({ name, className }: { name: "day" | "year" | "save"; className?: string }) {
  const c = calc.use(), n = (x: number) => x || 0;
  const kg = (n(c.meals) * n(c.g)) / 1000, t = (kg * n(c.days)) / 1000, s = (t * Math.min(100, Math.max(0, n(c.red)))) / 100;
  const f = (x: number) => x.toLocaleString("en-US", { maximumFractionDigits: 1 });
  return <div className={className}>{name === "day" ? f(kg) + " kg" : name === "year" ? f(t) + " t" : f(s) + " t"}</div>;
}

/* ---------- where food waste happens ---------- */
const donutSel = createStore(1);
export function DonutChart(a: Attrs) {
  const sel = donutSel.use();
  const { tipShow, tipHide } = useOverlay();
  const R = 70, C = 2 * Math.PI * R, tot = DONUT.reduce((s, d) => s + d.v, 0);
  let off = 0;
  const key = (i: number) => (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); donutSel.set(i); } };
  return (
    <svg viewBox={a.viewBox} role={a.role} aria-label={a["aria-label"]} id="donut" onMouseLeave={tipHide}>
      {DONUT.map((d, i) => {
        const len = (d.v / tot) * C, o = off;
        off += len;
        return <circle key={d.k} className={"donut-seg" + (sel === i ? " sel" : "")} cx="100" cy="100" r={R} fill="none" stroke={d.c} strokeWidth="28"
          strokeDasharray={`${len - 2} ${C - len + 2}`} strokeDashoffset={-o} transform="rotate(-90 100 100)" tabIndex={0} role="button" aria-label={`${d.k} ${d.p}%`}
          onClick={() => donutSel.set(i)} onKeyDown={key(i)} onMouseMove={(e) => tipShow(<><b>{d.k}</b><br />{d.v} Mt · {d.p}%</>, e)} />;
      })}
      <text x="100" y="96" textAnchor="middle" style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 22, fill: "var(--ink)" }}>1.05 bn t</text>
      <text x="100" y="116" textAnchor="middle" style={{ fontFamily: "var(--f-mono)", fontSize: 9, fill: "var(--muted)" }}>WASTED IN 2022</text>
    </svg>
  );
}
export function DonutLegend({ className }: Attrs) {
  const sel = donutSel.use();
  return (
    <div className={className} id="donut-legend">
      {DONUT.map((d, i) => (
        <button key={d.k} className={sel === i ? "sel" : ""} onClick={() => donutSel.set(i)}>
          <span className="sw" style={{ background: d.c }} /><span><b>{d.k}</b> · <span className="mono">{d.v} Mt · {d.p}%</span></span>
        </button>
      ))}
    </div>
  );
}
export function DonutDetail({ className }: Attrs) {
  const d = DONUT[donutSel.use()];
  return <div className={className} id="donut-detail"><b>{d.k}: {d.v} million tonnes ({d.p}%)</b><p className="small" style={{ marginTop: 4 }}>{d.t}</p></div>;
}

/* ---------- bar charts with hover detail ---------- */
const barSel = createStore<Record<string, number | null>>({});
export function BarChart({ chart, className }: { chart: string } & Attrs) {
  const c = CHARTS[chart], sel = barSel.use()[chart];
  const { tipShow, tipHide } = useOverlay();
  const mx = chart === "lunch" ? 120 : c.max;
  return (
    <div className={className} onMouseLeave={tipHide}>
      {c.rows.map((r, i) => (
        <button key={r.k} className={"bar " + (r.cls || "") + (sel === i ? " sel" : "")} onClick={() => barSel.set((s) => ({ ...s, [chart]: i }))}
          onMouseMove={(e) => tipShow(<><b>{r.k}: {r.lab}</b><br />{r.t}</>, e)}>
          <span className="lab">{r.k}{r.sub && <><br /><span className="small muted" style={{ fontWeight: 400 }}>{r.sub}</span></>}</span>
          <span className="track"><span className="fill" style={{ width: Math.min(100, (r.v / mx) * 100) + "%", display: "block" }} /></span>
          <span className="val">{r.lab}</span>
        </button>
      ))}
    </div>
  );
}
export function BarDetail({ chart, className }: { chart: string } & Attrs) {
  const i = barSel.use()[chart], r = i == null ? null : CHARTS[chart].rows[i];
  return (
    <div className={className}>
      {r ? <><b>{r.k}: {r.lab}</b><p className="small" style={{ marginTop: 4 }}>{r.t}</p></> : <span className="muted">Hover or tap a bar to see the finding.</span>}
    </div>
  );
}

/* ---------- the food journey ---------- */
const chainSel = createStore(2);
export function FoodJourney({ className }: Attrs) {
  const sel = chainSel.use();
  return (
    <div className={className} id="chain">
      {CHAIN.map((c, i) => (
        <button key={c.k} className={"station" + (sel === i ? " sel" : "")} aria-label={c.k} onClick={() => chainSel.set(i)}>
          <span className="dot">{c.i}</span><span className="nm">{c.k}</span>
        </button>
      ))}
    </div>
  );
}
export function FoodJourneyDetail({ className, style }: Attrs) {
  const c = CHAIN[chainSel.use()];
  return (
    <div className={className} style={style} id="chain-detail">
      <div className="who">{c.who}</div><b style={{ fontSize: "1.15rem" }}>{c.k}: {c.pv}</b>
      <ul className="clean" style={{ marginTop: 8 }}>{c.d.map((x) => <li key={x} className="small">{x}</li>)}</ul>
    </div>
  );
}

/* ---------- law timeline ---------- */
const lawSel = createStore(7);
export function LawTimeline({ className }: Attrs) {
  const sel = lawSel.use();
  return (
    <div className={className} id="lawtl">
      {LAW.map((l, i) => <button key={l.y + l.k} className={sel === i ? "sel" : ""} onClick={() => lawSel.set(i)}><b>{l.y}</b><span>{l.k}</span></button>)}
    </div>
  );
}
export function LawDetail({ className, style }: Attrs) {
  const l = LAW[lawSel.use()];
  return <div className={className} style={style} id="law-detail"><div className="who">{l.y} · {l.e}</div><b style={{ fontSize: "1.1rem" }}>{l.k}</b><p className="small" style={{ marginTop: 4 }}>{l.m}</p></div>;
}
