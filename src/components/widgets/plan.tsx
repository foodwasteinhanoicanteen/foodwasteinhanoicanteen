/* Pages 3, 7 and 9: weighted scoring model, roadmap (Gantt), plan steps, team, action log, references. */
import type { CSSProperties, ReactNode } from "react";
import { SearchLg } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Input } from "@/components/base/input/input";
import { Slider } from "@/components/base/slider/slider";
import { Badge } from "@/components/base/badges/badges";
import { createStore } from "../../state/createStore";
import { Field, MediaSlot } from "../ui/EditMode";
import { Html } from "../ui/Html";
import { A_STEPS, C_STEPS, CRIT, DEFW, LOG, REFS, ROLES, SOL, STAGES, type PlanStep } from "../../data/content";

type Attrs = { className?: string; style?: CSSProperties; children?: ReactNode };

/* ---------- weighted scoring (drag the weights) ---------- */
const weights = createStore<number[]>([...DEFW]);
const scored = (w: number[]) => {
  const total = w.reduce((a, b) => a + b, 0) || 1, n = w.map((x) => x / total);
  const sc = SOL.map((s) => s.s.reduce((a, v, i) => a + v * n[i], 0));
  return { n, sc, best: sc.indexOf(Math.max(...sc)) };
};
export function WeightSliders({ className }: Attrs) {
  const w = weights.use(), { n } = scored(w);
  return (
    <div className={className} id="sliders">
      {CRIT.map((c, i) => (
        <div className="sl" key={c}>
          <label id={"wl" + i}>{c}</label>
          <Slider aria-labelledby={"wl" + i} minValue={0} maxValue={60} step={5} value={w[i]} formatOptions={{ style: "decimal" }}
            onChange={(v) => weights.set((x) => x.map((old, j) => (j === i ? (v as number) : old)))} />
          <output id={"wo" + i}>{Math.round(n[i] * 100)}%</output>
        </div>
      ))}
    </div>
  );
}
export function WeightReset({ children }: Attrs) {
  return <Button color="secondary" size="sm" className="justify-self-start" onPress={() => weights.set([...DEFW])}>{children ?? "Reset to our weights (35 / 25 / 25 / 15)"}</Button>;
}
export function ScoreBars({ className }: Attrs) {
  const { sc, best } = scored(weights.use());
  return (
    <div className={className} id="scorebars">
      {SOL.map((s, i) => (
        <div key={s.k} className={"bar" + (i === best ? " alt" : "")} style={{ cursor: "default" }}>
          <span className="lab">{s.k}</span><span className="track"><span className="fill" style={{ display: "block", width: (sc[i] / 5) * 100 + "%" }} /></span>
          <span className="val">{sc[i].toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
export function ScoreCalc({ className }: Attrs) {
  const { n, sc, best } = scored(weights.use());
  return (
    <div className={className} id="scorecalc">
      <b>{SOL[best].k} ranks first</b>
      <p className="small mono" style={{ marginTop: 6 }}>B = {SOL[1].s.map((v, i) => `${v} × ${n[i].toFixed(2)}`).join(" + ")} = {sc[1].toFixed(2)}</p>
    </div>
  );
}

/* ---------- roadmap ---------- */
type RoadStep = PlanStep & { sol: "A" | "B" | "C"; key: string; n: number };
const ROAD: RoadStep[] = [
  ...STAGES.map((s, i) => ({ ...s, sol: "B" as const, key: "stage_status_" + (i + 1), n: i + 1 })),
  ...A_STEPS.map((s, i) => ({ ...s, sol: "A" as const, key: "a_status_" + (i + 1), n: i + 1 })),
  ...C_STEPS.map((s, i) => ({ ...s, sol: "C" as const, key: "c_status_" + (i + 1), n: i + 1 })),
];
const SCOL = { A: "var(--cA)", B: "var(--cB)", C: "var(--cC)" };
const wk = (s: PlanStep) => (s.a === s.b ? "Week " + s.a : "Weeks " + s.a + "–" + s.b);
const wkShort = (s: PlanStep) => (s.a === s.b ? "W" + s.a : "W" + s.a + "–" + s.b);
const ganttSel = createStore(0);

export function Gantt({ className }: Attrs) {
  const sel = ganttSel.use();
  const cells: ReactNode[] = [<div key="h" />, ...Array.from({ length: 12 }, (_, i) => <div key={"w" + i} className="wk">W{i + 1}</div>)];
  ROAD.forEach((s, i) => {
    cells.push(<div key={"l" + i} className="gl"><span className="mono" style={{ color: SCOL[s.sol], fontWeight: 700 }}>{s.sol}{s.n}</span> {s.k}</div>);
    for (let w = 1; w <= 12; w++) {
      if (w === s.a) cells.push(<AriaButton key={i + "-" + w} className={"gb cursor-pointer outline-focus-ring focus-visible:outline-2" + (sel === i ? " sel" : "")} style={{ gridColumn: `span ${s.b - s.a + 1}`, background: SCOL[s.sol] }} aria-label={`${s.sol}${s.n} ${s.k}, ${wk(s)}`} onPress={() => ganttSel.set(i)}>{wkShort(s)}</AriaButton>);
      else if (w < s.a || w > s.b) cells.push(<div key={i + "-" + w} />);
    }
  });
  return <div className={className} id="gantt">{cells}</div>;
}
export function GanttDetail({ className, style }: Attrs) {
  const s = ROAD[ganttSel.use()];
  return (
    <div className={className} style={style} id="gantt-detail">
      <div className="who" style={{ color: SCOL[s.sol] }}>Solution {s.sol} · step {s.n} · {wk(s)}</div>
      <b style={{ fontSize: "1.15rem" }}>{s.k}</b>
      <div className="grid g2" style={{ marginTop: 10, gap: 10 }}>
        <p className="small"><b>Objective:</b> {s.obj}</p><p className="small"><b>Key actions:</b> {s.act}</p>
        <p className="small"><b>Owner:</b> {s.own}</p><p className="small"><b>Resources:</b> {s.res}</p>
        <p className="small"><b>Target:</b> {s.kpi}</p><p className="small"><b>Status:</b> <Field id={s.key}>Done / In progress / Planned</Field></p>
      </div>
    </div>
  );
}
export function PlanSteps({ sol, className, style }: Attrs & { sol: "A" | "B" | "C" }) {
  return (
    <ol className={className} style={style} id={"steps-" + sol.toLowerCase()}>
      {ROAD.filter((s) => s.sol === sol).map((s) => (
        <li key={s.key}>
          <span className="wk" style={{ color: SCOL[sol] }}>{wkShort(s)}</span>
          <div>
            <h4>{s.n}. {s.k}</h4><p className="small">{s.act}</p>
            <p className="small muted"><b>Who:</b> {s.own} · <b>Needs:</b> {s.res}</p>
            <p className="out">Target: {s.kpi} · Status: <Field id={s.key}>Done / In progress / Planned</Field></p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- team and evidence of action ---------- */
export function TeamCards({ className }: Attrs) {
  return (
    <div className={className} id="team">
      {ROLES.map(([role, duty], i) => (
        <div className="panel stack" key={role}>
          <MediaSlot id={"team_" + (i + 1)} className="media tall" style={{ aspectRatio: "1/1" }}><div className="ph"><span className="ic">Photo</span><b>Team member {i + 1}</b></div></MediaSlot>
          <h3><Field id={"team_name_" + (i + 1)}>Name</Field></h3>
          <Badge size="sm" color="brand" className="justify-self-start">{role}</Badge>
          <p className="small">{duty}</p>
          <p className="small"><b>Contribution:</b> <Field id={"team_contrib_" + (i + 1)}>what they did, with evidence</Field></p>
        </div>
      ))}
    </div>
  );
}
export function ActionLog() {
  return (
    <tbody id="actionlog">
      {LOG.map((l, i) => (
        <tr key={l}>
          <td><Field id={"log_date_" + (i + 1)}>dd/mm</Field></td><td><Field id={"log_act_" + (i + 1)}>{l}</Field></td>
          <td><Field id={"log_who_" + (i + 1)}>names</Field></td><td><Field id={"log_ev_" + (i + 1)}>photo / notes / link</Field></td>
        </tr>
      ))}
    </tbody>
  );
}

/* ---------- references ---------- */
const refs = createStore({ q: "", cat: "All" });
const TYPES = ["All", "Academic", "Reports", "Business", "News"];
export function RefSearch({ style }: Attrs) {
  const r = refs.use();
  return <div style={style}><Input id="refsearch" type="search" icon={SearchLg} placeholder="Search sources…" aria-label="Search sources" value={r.q} onChange={(q) => refs.set((x) => ({ ...x, q }))} /></div>;
}
export function RefFilters({ className, style }: Attrs) {
  const r = refs.use();
  return (
    <div className={className} style={style}>
      <ButtonGroup size="sm" className="flex-wrap" disallowEmptySelection selectedKeys={[r.cat]} onSelectionChange={(k) => { const cat = [...k][0]; if (cat != null) refs.set((x) => ({ ...x, cat: String(cat) })); }}>
        {TYPES.map((t) => <ButtonGroupItem key={t} id={t}>{t}{t === "All" ? "" : ` · ${REFS.filter((x) => x[0] === t).length}`}</ButtonGroupItem>)}
      </ButtonGroup>
    </div>
  );
}
const linkify = (s: string) => s.replace(/(https?:\/\/[^\s<]+)/g, (u) => `<a href="${u}" target="_blank" rel="noopener" style="word-break:break-all">${u}</a>`);
export function RefList({ className, style }: Attrs) {
  const r = refs.use(), q = r.q.trim().toLowerCase();
  const list = REFS.filter((x) => (r.cat === "All" || x[0] === r.cat) && (!q || x[1].toLowerCase().includes(q)));
  return (
    <ol className={className} style={style} id="reflist">
      {list.length ? list.map((x) => <li key={x[1]} className="small" style={{ paddingLeft: 4 }}><Badge size="sm" className="mr-1.5 inline-flex">{x[0]}</Badge><Html html={linkify(x[1])} /></li>)
        : <li className="muted">No sources match.</li>}
    </ol>
  );
}
export const REF_COUNT = REFS.length;
