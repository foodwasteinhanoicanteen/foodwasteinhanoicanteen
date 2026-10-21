/* Page 6 (CampusMeal app): function list, kitchen forecast calculator, protocol download. */
import { type CSSProperties, type ReactNode } from "react";
import { createStore } from "../../state/createStore";
import { downloadText } from "../../api/client";
import { Card, FilterButtons } from "../ui/Cards";
import { DASH_ROWS, FEATS } from "../../data/content";
import { quickForecast } from "../../../shared/campusmeal/logic";

type Attrs = { className?: string; style?: CSSProperties; children?: ReactNode; hidden?: boolean; type?: "button" };

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
