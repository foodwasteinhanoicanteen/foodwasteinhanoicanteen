/* Page 6 (CampusMeal app): function list, kitchen forecast calculator, protocol download. */
import { type CSSProperties, type ReactNode } from "react";
import { Download01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { StatTable } from "../survey/panels";
import { createStore } from "../../state/createStore";
import { downloadText } from "../../api/client";
import { Card, FilterButtons } from "../ui/Cards";
import { DASH_ROWS, FEATS } from "../../data/content";
import { quickForecast } from "../../../shared/campusmeal/logic";

type Attrs = { className?: string; style?: CSSProperties; children?: ReactNode; hidden?: boolean; type?: "button" };

/* ---------- all functions ---------- */
const SOL_BG: Record<string, string> = { A: "bg-[var(--cA)] text-white ring-transparent", B: "bg-[var(--cB)] text-white ring-transparent", C: "bg-[var(--cC)] text-white ring-transparent" };
export const FeatureFilters = ({ className, style }: Attrs) => <FilterButtons group="feat" cats={["For students", "For the kitchen", "Reporting"]} className={className} style={style} />;
export function FeatureGrid({ className }: Attrs) {
  return (
    <div className={className} id="featgrid">
      {FEATS.map((f, i) => (
        <Card key={f[0]} title={`${i + 1}. ${f[0]}`} tag={f[1]} group="feat" cat={f[1]}>
          <div className="tagline flex flex-wrap items-center gap-1.5">{f[1]} · <Badge size="sm" color={f[2] === "Core" ? "brand" : "warning"}>{f[2]}</Badge>
            <Badge size="sm" className={SOL_BG[f[3]]}>{f[3] === "Fit" || f[3] === "Learn" ? f[3] : "Solution " + f[3]}</Badge></div>
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
export function ForecastInput({ name }: { name: FcKey; type?: string; min?: string; max?: string; step?: string; defaultValue?: string }) {
  const v = fcIn.use()[name];
  return <Input id={"k-" + name} type="number" value={Number.isNaN(v) ? "" : String(v)} onChange={(x) => fcIn.set((c) => ({ ...c, [name]: x === "" ? NaN : +x }))} />;
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
    <StatTable id="dashtable" label="Kitchen forecast by dish"
      cols={[["Canteen"], ["Dish"], ["Pre-orders", true], ["Avg walk-ins", true], ["Interest", true], ["Forecast", true], ["First batch", true], ["Old habit", true]]}
      rows={DASH_ROWS.map((r) => { const x = quickForecast(r[2], r[3], r[4], 10); return {
        id: r[1], cells: [r[0], <b>{r[1]}</b>, r[2], r[3], r[4].toFixed(1), <b className="text-brand-secondary">{x.fcst}</b>, x.first, <span className="muted">{r[5]}</span>],
      }; })} />
  );
}

/* ---------- protocol as a Markdown file ---------- */
export function ProtocolDownload(_: Attrs) {
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
  return <Button size="md" id="proto-dl" iconLeading={Download01} onPress={save}>Download protocol (.md)</Button>;
}
