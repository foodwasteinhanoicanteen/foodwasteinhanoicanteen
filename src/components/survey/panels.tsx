/* Survey page panels: data source bar, criterion pills, respondents, ratings, ANOVA, Tukey,
   robustness checks, forced choice, conclusion, and the effectiveness chart on the decision page. */
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useOverlay } from "../ui/Overlays";
import { Html } from "../ui/Html";
import { ui, useSurvey } from "./state";
import { mean, pairedT, sd, tcrit } from "../../../shared/stats";
import {
  CRITERIA, OPTIONS, SOL, SOL_COLOR, SOL_NAME, type CritKey, agreePct, chisqGOF, colOf, contrastB, f2, noLead, numCol, pAPA, pShort, scores,
} from "../../../shared/survey";

type Attrs = { className?: string; style?: CSSProperties; children?: ReactNode };
const critName = (k: CritKey) => CRITERIA.find((c) => c.k === k)!.n;
const Sig = ({ yes, y = "Yes", n = "No" }: { yes: boolean; y?: string; n?: string }) => <span className={"sig " + (yes ? "y" : "n")}>{yes ? y : n}</span>;

/** Tooltip on hover (charts on this page). */
function useTip() {
  const { tipShow, tipHide } = useOverlay();
  return (content: ReactNode) => ({ onMouseMove: (e: MouseEvent) => tipShow(content, e), onMouseLeave: tipHide });
}

export function SourceBar({ className }: Attrs) {
  const { isExample, saved } = useSurvey();
  return (
    <div className={className + (isExample ? " example" : "")} id="srcbar">
      <span className="lbl">{isExample ? "Showing EXAMPLE data: 50 made-up responses for practice. Replace with our real survey data before presenting." : `Showing our survey data: n = ${saved.length} responses.`}</span>
      <span className="switch" role="group" aria-label="Data source" style={{ marginLeft: "auto" }}>
        <button type="button" aria-pressed={isExample} onClick={() => ui.set((s) => ({ ...s, mode: "example" }))}>Example (50)</button>
        <button type="button" aria-pressed={!isExample} disabled={!saved.length} onClick={() => ui.set((s) => ({ ...s, mode: "ours" }))}>Our data{saved.length ? ` (${saved.length})` : " (none yet)"}</button>
      </span>
    </div>
  );
}

export function CritPills({ group, className }: Attrs & { group: string }) {
  const s = ui.use(), lk = group === "lk";
  const list = lk ? CRITERIA.filter((c) => c.idx) : CRITERIA, cur = lk ? s.lkCrit : s.crit;
  return (
    <div className={className}>
      {list.map((c) => <button key={c.k} type="button" aria-pressed={c.k === cur} onClick={() => ui.set((x) => (lk ? { ...x, lkCrit: c.k } : { ...x, crit: c.k }))}>{c.n}</button>)}
    </div>
  );
}

/* ---------- respondents ---------- */
function CountBars({ vals, order }: { vals: string[]; order?: string[] }) {
  const n = vals.length, cnt: Record<string, number> = {};
  vals.forEach((v) => (cnt[v] = (cnt[v] || 0) + 1));
  const keys = order ? order.filter((k) => cnt[k]).concat(Object.keys(cnt).filter((k) => !order.includes(k))) : Object.keys(cnt);
  const mx = Math.max(...keys.map((k) => cnt[k]));
  return (
    <div className="bars">
      {keys.map((k) => (
        <div key={k} className="bar mute" style={{ cursor: "default", gridTemplateColumns: "minmax(80px,140px) 1fr auto" }}>
          <span className="lab small">{k}</span><span className="track" style={{ height: 18 }}><span className="fill" style={{ display: "block", width: (cnt[k] / mx) * 100 + "%" }} /></span>
          <span className="val small">{cnt[k]} · {Math.round((cnt[k] / n) * 100)}%</span>
        </div>
      ))}
    </div>
  );
}
export function WhoIntro({ className }: Attrs) {
  return <p className={className} id="who-intro">{useSurvey().rows.length} respondents. Age, occupation and eating habits describe who our results represent.</p>;
}
const HEARD: Record<string, string> = { "I had never heard of it": "Never heard of it", "I had heard of it but did not understand it clearly": "Heard, not clear", "I understood it very well": "Understands well" };
export function Profile({ className }: Attrs) {
  const d = useSurvey().rows, s = (i: number) => colOf(d, i).map(String), w = numCol(d, 4);
  const blocks: [string, string[], string[]][] = [
    ["Gender", s(0), OPTIONS.gender], ["Age", s(1), OPTIONS.age], ["Occupation", s(2), OPTIONS.occ], ["Eats out per week", s(3), OPTIONS.freq],
    ["Understands “food waste”", s(5).map((x) => HEARD[x] || x), Object.values(HEARD)],
  ];
  return (
    <div className={className} id="profile">
      {blocks.map(([t, v, o]) => <div className="panel stack" key={t}><h4>{t}</h4><CountBars vals={v} order={o} /></div>)}
      <div className="panel stack"><h4>Left edible food in the past 7 days</h4>
        <div className="stat" style={{ border: "none", padding: 0 }}><div className="v">{f2(mean(w))}</div><div className="l">mean on 1 (never) to 5 (very often)</div></div>
        <CountBars vals={w.map(String)} order={["1", "2", "3", "4", "5"]} />
      </div>
    </div>
  );
}

/* ---------- ratings ---------- */
const pos = (v: number) => ((v - 1) / 4) * 100;
export function MeanChart({ className }: Attrs) {
  const d = useSurvey().rows, tc = tcrit(d.length - 1), tip = useTip();
  return (
    <div className={className} id="meanchart">
      {CRITERIA.map((c) => (
        <div className="mgroup" key={c.k}><h4>{c.n}</h4>
          {scores(d, c.k).map((x, i) => {
            const m = mean(x), s = sd(x), h = (tc * s) / Math.sqrt(x.length), L = SOL[i];
            return (
              <div className="mrow" key={L} {...tip(<><b>{L} · {SOL_NAME[L]}</b><br />{c.n}: mean {f2(m)}, SD {f2(s)}<br />95% CI {f2(m - h)} to {f2(m + h)} · n = {x.length}</>)}>
                <span className="tag" style={{ background: SOL_COLOR[L] }}>{L}</span>
                <span className="mtrack">
                  {[2, 3, 4].map((t) => <span key={t} className="tick" style={{ left: pos(t) + "%" }} />)}
                  <span className="mbar" style={{ width: pos(m) + "%", background: SOL_COLOR[L] }} />
                  <span className="ci" style={{ left: pos(Math.max(1, m - h)) + "%", width: pos(Math.min(5, m + h)) - pos(Math.max(1, m - h)) + "%" }} />
                </span>
                <span className="val mono small" style={{ fontWeight: 700 }}>{f2(m)}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
export const MeanAxis = ({ className }: Attrs) => (
  <div className={className} id="meanaxis"><span /><div>{[1, 2, 3, 4, 5].map((t) => <span key={t} style={{ left: pos(t) + "%" }}>{t}</span>)}</div><span /></div>
);

const LKC = ["var(--lk1)", "var(--lk2)", "var(--lk3)", "var(--lk4)", "var(--lk5)"], LKN = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
export function LikertChart({ className }: Attrs) {
  const d = useSurvey().rows, { lkCrit } = ui.use(), tip = useTip();
  return (
    <div className={className} id="lkchart">
      {scores(d, lkCrit).map((x, i) => {
        const n = x.length, cnt = [1, 2, 3, 4, 5].map((v) => x.filter((y) => y === v).length), L = SOL[i];
        return (
          <div className="lkrow" key={L}>
            <span className="mrow" style={{ display: "block" }}><span className="tag" style={{ background: SOL_COLOR[L], display: "block" }}>{L}</span></span>
            <div className="lkbar">
              {cnt.map((k, j) => k ? <i key={j} style={{ width: (k / n) * 100 + "%", background: LKC[j], color: j === 2 ? "var(--ink)" : "#fff" }} {...tip(<><b>{L} · {LKN[j]} ({j + 1})</b><br />{k} of {n} ({Math.round((k / n) * 100)}%)</>)}>{k / n >= 0.08 ? Math.round((k / n) * 100) + "%" : ""}</i> : null)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export const LikertLegend = ({ className }: Attrs) => (
  <div className={className} id="lklegend">{LKN.map((t, j) => <span key={t}><b style={{ background: LKC[j] }} />{j + 1} {t}</span>)}</div>
);
export function LikertNote({ className }: Attrs) {
  const d = useSurvey().rows, { lkCrit } = ui.use();
  const agree = scores(d, lkCrit).map((x) => Math.round((x.filter((y) => y >= 4).length / x.length) * 100));
  return <p className={className} id="lknote">{critName(lkCrit)}: {SOL.map((s, i) => `${s} ${agree[i]}% agree or strongly agree`).join(" · ")}.</p>;
}
export function DescTable() {
  const d = useSurvey().rows;
  return (
    <table id="desctable">
      <thead><tr><th>Criterion</th>{SOL.map((s) => <th key={s} className="n">{s} mean (SD)</th>)}<th>Highest</th></tr></thead>
      <tbody>{CRITERIA.map((c) => {
        const g = scores(d, c.k), m = g.map(mean), s = g.map(sd), b = m.indexOf(Math.max(...m));
        return <tr key={c.k}><td><b>{c.n}</b></td>{m.map((x, i) => <td key={i} className="n" style={i === b ? { fontWeight: 700 } : undefined}>{f2(x)} ({f2(s[i])})</td>)}<td>{SOL[b]}</td></tr>;
      })}</tbody>
    </table>
  );
}
export function ExtraStats({ className }: Attrs) {
  const d = useSurvey().rows;
  const ex: [number, string, string][] = [[10, "A", "would buy a discounted meal near closing time"], [15, "B", "would choose a portion size that matches their needs"], [20, "C", "feel comfortable with safe surplus going to people in need"]];
  return (
    <div className={className} id="extrastats">
      {ex.map(([i, s, t]) => <div className="stat" key={s}><div className="v">{agreePct(d, i)}%</div><div className="l">agree they {t}</div><div className="s">Solution {s} · mean {f2(mean(numCol(d, i)))} of 5</div></div>)}
    </div>
  );
}

/* ---------- ANOVA ---------- */
const useCrit = () => { const { crit } = ui.use(); const S = useSurvey(); return { crit, C: CRITERIA.find((x) => x.k === crit)!, R: S.analysis(crit), S }; };
export function AnovaTitle() { return <h3 id="an-title">{useCrit().C.n}: A vs B vs C</h3>; }
export function AnovaHyp({ className }: Attrs) {
  return <p className={className} id="an-hyp">H₀: μ<sub>A</sub> = μ<sub>B</sub> = μ<sub>C</sub> · H₁: at least one mean differs · α = .05 · n = {useCrit().R.n} per solution</p>;
}
export function AnovaTable() {
  const a = useCrit().R.an;
  return (
    <table id="antable">
      <thead><tr><th>Source</th><th className="n">SS</th><th className="n">df</th><th className="n">MS</th><th className="n">F</th><th className="n">p</th><th className="n">η²</th></tr></thead>
      <tbody>
        <tr><td>Between solutions</td><td className="n">{f2(a.ssb)}</td><td className="n">{a.dfb}</td><td className="n">{f2(a.msb)}</td><td className="n" style={{ fontWeight: 700 }}>{f2(a.F)}</td><td className="n" style={{ fontWeight: 700 }}>{pShort(a.p)}</td><td className="n">{noLead(a.eta2, 3)}</td></tr>
        <tr><td>Within (error)</td><td className="n">{f2(a.ssw)}</td><td className="n">{a.dfw}</td><td className="n">{f2(a.msw)}</td><td /><td /><td /></tr>
        <tr><td>Total</td><td className="n">{f2(a.sst)}</td><td className="n">{a.dfb + a.dfw}</td><td /><td /><td /><td /></tr>
      </tbody>
    </table>
  );
}
export function AnovaVerdict({ className }: Attrs) {
  const { C, R } = useCrit(), a = R.an, sig = a.p < 0.05, b = R.m.indexOf(Math.max(...R.m));
  return (
    <div className={className} id="an-verdict">
      <b>{sig ? "Reject H₀" : "Fail to reject H₀"}: F({a.dfb}, {a.dfw}) = {f2(a.F)}, {pAPA(a.p)}, η² = {noLead(a.eta2)}.</b>
      <p className="small" style={{ marginTop: 6 }}>{sig
        ? <>The three solutions are not rated equally on {C.n.toLowerCase()}. Solution {SOL[b]} has the highest mean ({f2(R.m[b])}). Go to <b>Tukey post-hoc</b> to see which pairs differ.</>
        : <>There is no evidence that the solutions are rated differently on {C.n.toLowerCase()}, so post-hoc comparisons should not be used to claim a difference.</>}</p>
    </div>
  );
}
export function AnovaSummary() {
  const { crit, S } = useCrit();
  return (
    <table id="ansummary">
      <thead><tr><th>Criterion</th><th className="n">F</th><th className="n">p</th><th className="n">η²</th><th>Result</th></tr></thead>
      <tbody>{CRITERIA.map((c) => { const x = S.analysis(c.k).an; return (
        <tr key={c.k} className={c.k === crit ? "win" : undefined}><td>{c.n}</td><td className="n">{f2(x.F)}</td><td className="n">{pShort(x.p)}</td><td className="n">{noLead(x.eta2)}</td><td><Sig yes={x.p < 0.05} y="Differ" n="No difference" /></td></tr>); })}</tbody>
    </table>
  );
}

/* ---------- Tukey ---------- */
export function TukeyTitle() { return <h3 id="tk-title">{useCrit().C.n}: pairwise comparisons</h3>; }
export function TukeyTable() {
  const { R } = useCrit();
  return (
    <table id="tktable">
      <thead><tr><th>Pair</th><th className="n">Mean diff.</th><th className="n">SE</th><th className="n">q</th><th className="n">p adj</th><th className="n">95% CI</th><th>Sig.</th></tr></thead>
      <tbody>{R.tk.pairs.map((p) => (
        <tr key={p.pair}><td><b>{p.pair}</b></td><td className="n">{p.diff > 0 ? "+" : ""}{f2(p.diff)}</td><td className="n">{p.se.toFixed(3)}</td><td className="n">{f2(p.q)}</td><td className="n" style={{ fontWeight: 700 }}>{pShort(p.p)}</td><td className="n">[{f2(p.lo)}, {f2(p.hi)}]</td><td><Sig yes={p.p < 0.05} /></td></tr>
      ))}</tbody>
    </table>
  );
}
export function TukeyQ({ className }: Attrs) {
  const { R } = useCrit();
  return <p className={className} id="tk-q">Critical q (k = 3, df = {R.an.dfw}, α = .05) = {R.tk.qcrit.toFixed(3)}. Mean difference = first solution minus second.</p>;
}
export function CiPlot({ className }: Attrs) {
  const { R } = useCrit(), tip = useTip();
  const L = Math.max(1, ...R.tk.pairs.map((p) => Math.max(Math.abs(p.lo), Math.abs(p.hi)))) * 1.1, px = (v: number) => ((v + L) / (2 * L)) * 100;
  return (
    <div className={className} id="ciplot">
      {R.tk.pairs.map((p) => {
        const col = p.p < 0.05 ? "var(--ink)" : "var(--muted)";
        return (
          <div className="cirow" key={p.pair} {...tip(<><b>{p.pair}</b><br />difference {f2(p.diff)}, 95% CI {f2(p.lo)} to {f2(p.hi)}<br />p adj {pShort(p.p)}</>)}>
            <span className="mono small" style={{ fontWeight: 700 }}>{p.pair}</span>
            <span className="citrack"><span className="zero" style={{ left: px(0) + "%" }} /><span className="seg" style={{ left: px(p.lo) + "%", width: px(p.hi) - px(p.lo) + "%", background: col }} /><span className="pt" style={{ left: px(p.diff) + "%", background: col }} /></span>
            <span className="small"><Sig yes={p.p < 0.05} y="differ" n="no diff." /></span>
          </div>
        );
      })}
      <div className="cirow"><span /><div className="maxis" style={{ display: "block" }}><div style={{ height: 16 }}>{[-L, 0, L].map((v) => <span key={v} style={{ left: px(v) + "%" }}>{v === 0 ? "0" : (v > 0 ? "+" : "") + v.toFixed(1)}</span>)}</div></div><span /></div>
    </div>
  );
}
export function TukeyVerdict({ className }: Attrs) {
  const { R } = useCrit();
  const sigs = R.tk.pairs.filter((p) => p.p < 0.05).map((p) => { const hi = p.diff > 0 ? p.pair[0] : p.pair.slice(-1), lo = p.diff > 0 ? p.pair.slice(-1) : p.pair[0]; return `${hi} > ${lo} (${pAPA(p.p)})`; });
  const ns = R.tk.pairs.filter((p) => p.p >= 0.05).map((p) => `${p.pair} (${pAPA(p.p)})`);
  return (
    <div className={className} id="tk-verdict">
      {R.an.p >= 0.05 ? <><b>ANOVA was not significant</b><p className="small" style={{ marginTop: 6 }}>Report Tukey only as exploratory here.</p></>
        : <><b>{sigs.length ? "Significant: " + sigs.join("; ") : "No pair differs significantly"}</b>{ns.length > 0 && <p className="small" style={{ marginTop: 6 }}>Not significant: {ns.join("; ")}.</p>}</>}
    </div>
  );
}

/* ---------- robustness ---------- */
export function RmTable() {
  const { R } = useCrit(), rm = R.rm;
  return (
    <table id="rmtable">
      <thead><tr><th>Source</th><th className="n">SS</th><th className="n">df</th><th className="n">F</th><th className="n">p</th><th className="n">p (GG)</th><th className="n">partial η²</th></tr></thead>
      <tbody>
        <tr><td>Solution</td><td className="n">{f2(rm.ssc)}</td><td className="n">{rm.dfc}</td><td className="n" style={{ fontWeight: 700 }}>{f2(rm.F)}</td><td className="n" style={{ fontWeight: 700 }}>{pShort(rm.p)}</td><td className="n">{pShort(rm.pGG)}</td><td className="n">{noLead(rm.peta2)}</td></tr>
        <tr><td>Error</td><td className="n">{f2(rm.sse)}</td><td className="n">{rm.dfe}</td><td /><td /><td /><td /></tr>
        <tr><td>Respondents</td><td className="n">{f2(rm.sss)}</td><td className="n">{R.n - 1}</td><td /><td /><td /><td /></tr>
      </tbody>
    </table>
  );
}
export function RmNote({ className }: Attrs) {
  const { C, R } = useCrit();
  return <p className={className} id="rm-note">{C.n}. Removes differences between people (some rate everything high), so it is usually more sensitive than one-way ANOVA. Greenhouse–Geisser ε = {R.rm.eps.toFixed(3)} corrects for unequal variances of the differences.</p>;
}
export function PairTable() {
  const { R } = useCrit();
  const P = ([[0, 1], [0, 2], [1, 2]] as const).map(([i, j]) => { const t = pairedT(R.g[i], R.g[j]); return { pair: SOL[i] + " – " + SOL[j], ...t, pb: Math.min(1, t.p * 3) }; });
  return (
    <table id="pairtable">
      <thead><tr><th>Pair</th><th className="n">Mean diff.</th><th className="n">t({R.n - 1})</th><th className="n">p (Bonferroni)</th><th className="n">d<sub>z</sub></th><th>Sig.</th></tr></thead>
      <tbody>{P.map((p) => <tr key={p.pair}><td><b>{p.pair}</b></td><td className="n">{p.md > 0 ? "+" : ""}{f2(p.md)}</td><td className="n">{f2(p.t)}</td><td className="n" style={{ fontWeight: 700 }}>{pShort(p.pb)}</td><td className="n">{f2(p.dz)}</td><td><Sig yes={p.pb < 0.05} /></td></tr>)}</tbody>
    </table>
  );
}
export function FriedmanBox() {
  const { R } = useCrit(), fr = R.fr;
  return (
    <div id="frbox">
      <p><b>χ²({fr.df}) = {f2(fr.chi)}, {pAPA(fr.p)}</b></p>
      <p className="small">Mean ranks: {SOL.map((s, i) => `${s} ${f2(fr.meanRanks[i])}`).join(" · ")}. Uses only the order of each person’s ratings, so it does not assume the 1–5 scale is evenly spaced.</p>
      <p className="small"><b>{(fr.p < 0.05) === (R.an.p < 0.05) ? "Agrees" : "Disagrees"}</b> with the one-way ANOVA.</p>
    </div>
  );
}
export function ContrastBox() {
  const { C, R } = useCrit(), c = contrastB(R.g);
  return (
    <div id="contrastbox">
      <p className="small">For each person: <span className="mono">B − (A + C) ÷ 2</span>. If this is above zero on average, people rate the root-cause solution above the two leftover solutions.</p>
      <div className="stat" style={{ border: "none", padding: 0 }}><div className="v" style={{ color: c.md > 0 ? "var(--leaf)" : "var(--waste)" }}>{c.md > 0 ? "+" : ""}{f2(c.md)}</div><div className="l">average advantage of B over A and C ({C.n.toLowerCase()})</div></div>
      <p><b>t({c.df}) = {f2(c.t)}, {pAPA(c.p)}, d<sub>z</sub> = {f2(c.dz)}</b></p>
      <p className="small">{c.p < 0.05 && c.md > 0 ? "Significant: the root-cause solution is rated higher than the leftover solutions." : "Not significant: the data does not show B rated above the average of A and C."}</p>
    </div>
  );
}

/* ---------- forced choice ---------- */
const CHOICE = {
  prio: { col: 21, keys: ["A", "B", "C", "None"], names: ["A · Last-Hour Food Rescue", "B · Forecasting & Portion", "C · Redistribution", "No significant difference"] },
  one: { col: 22, keys: ["A", "B", "C"], names: ["Solution A", "Solution B", "Solution C"] },
};
const useChoice = (which: "prio" | "one") => {
  const d = useSurvey().rows, c = CHOICE[which], vals = colOf(d, c.col);
  return { ...c, n: vals.length, cnt: c.keys.map((k) => vals.filter((v) => v === k).length) };
};
export function ChoiceBars({ which, className }: Attrs & { which: "prio" | "one" }) {
  const c = useChoice(which), mx = Math.max(1, ...c.cnt);
  return (
    <div className={className} id={which === "prio" ? "prio" : "onechoice"}>
      {c.keys.map((k, i) => (
        <div className="bar" key={k} style={{ cursor: "default" }}><span className="lab">{c.names[i]}</span>
          <span className="track"><span className="fill" style={{ display: "block", width: (c.cnt[i] / mx) * 100 + "%", background: SOL_COLOR[k] || "var(--muted)" }} /></span>
          <span className="val">{c.cnt[i]} · {Math.round((c.cnt[i] / c.n) * 100)}%</span></div>
      ))}
    </div>
  );
}
export function ChoiceTest({ which, className }: Attrs & { which: "prio" | "one" }) {
  const c = useChoice(which), obs = c.cnt.slice(0, 3), t = chisqGOF(obs), b = obs.indexOf(Math.max(...obs));
  return (
    <div className={className} id={which + "-test"}>
      <b>χ²({t.df}) = {f2(t.chi)}, {pAPA(t.p)}</b>
      <p className="small" style={{ marginTop: 6 }}>{t.p < 0.05 ? `Choices are not evenly spread; Solution ${SOL[b]} was chosen most often.` : "Choices are not significantly different from an even split, so preferences are divided. Report this honestly."}</p>
      {which === "prio" && <p className="small muted">Test excludes the {c.cnt[3]} “no significant difference” answers.</p>}
    </div>
  );
}

/* ---------- conclusion and decision-page chart ---------- */
export function Conclusion({ lang, className }: Attrs & { lang: "vi" | "en" }) {
  return <Html as="div" id={"concl-" + lang} className={className} html={useSurvey().concl()[lang]} />;
}
export function VerdictChart({ className }: Attrs) {
  const R = useSurvey().analysis("eff");
  return (
    <div className={className} id="verdict-chart">
      {SOL.map((L, i) => <div className="bar" key={L} style={{ cursor: "default" }}><span className="lab">{L} · {SOL_NAME[L]}</span><span className="track"><span className="fill" style={{ display: "block", width: (R.m[i] / 5) * 100 + "%", background: SOL_COLOR[L] }} /></span><span className="val">{f2(R.m[i])}</span></div>)}
    </div>
  );
}
export function VerdictNote({ className }: Attrs) {
  const S = useSurvey(), R = S.analysis("eff");
  return <p className={className} id="verdict-note">Mean “this solution could effectively reduce food waste” rating, 1–5, n = {S.rows.length}{S.isExample ? " (example data until our survey data is entered)" : ""}. {R.an.p < 0.05 ? "The difference is significant (" + S.sv.anstat + ")." : "The difference is not significant."}</p>;
}
