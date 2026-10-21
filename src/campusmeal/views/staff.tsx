/* Kitchen screens: Dashboard, Pickups, Last call & donate, Waste log, Menu planner, Insights, Weekly report, Settings. */
import { useState, type FormEvent } from "react";
import { useCm } from "../store";
import { useNav } from "../nav";
import { Empty, Hd, I, Kpi, Tags } from "../ui";
import { downloadText } from "../../api/client";
import type { Dish } from "../../../shared/schemas/campusmeal";
import {
  AMOUNTS, COLORS, DEFAULTS, PORT, STARTER, addDays, canteenName, clamp, dayStats, dishesOf, eid, feedbackFor, fmtDay, fmtT, forecast,
  minsAgo, monday, nowHM, ordersFor, round1, settingsOf, sum, todayStr, weekCsv, weekRows, type Forecast,
} from "../../../shared/campusmeal/logic";

const iso = () => new Date().toISOString();
const num = (v: FormDataEntryValue | null) => { const n = parseFloat(String(v ?? "")); return Number.isFinite(n) ? n : 0; };

function DateBar() {
  const { S, set } = useNav();
  return (
    <div className="chips" style={{ alignItems: "center" }}>
      <button className="chip" aria-label="Previous day" onClick={() => set({ date: addDays(S.date, -1) })}>‹</button>
      <input type="date" value={S.date} style={{ width: "auto" }} onChange={(e) => e.target.value && set({ date: e.target.value })} aria-label="Day" />
      <button className="chip" aria-label="Next day" onClick={() => set({ date: addDays(S.date, 1) })}>›</button>
      {S.date !== todayStr() && <button className="chip" onClick={() => set({ date: todayStr() })}>Today</button>}
    </div>
  );
}

/* ---------- dashboard ---------- */
function OverrideBox({ id, f, onDone }: { id: string; f: Forecast; onDone: () => void }) {
  const { D, patch, toast } = useCm(), { S } = useNav();
  const [val, setVal] = useState(String(f.fc)), [why, setWhy] = useState(f.ov?.reason || "");
  const save = async () => {
    if (!why.trim()) { toast("Give a reason for the override."); return; }
    if (await patch("log", S.date, { overrides: { [id]: { value: num(val), reason: why.trim(), t: iso() } } }, "Override saved")) onDone();
  };
  return (
    <div className="card">
      <b>Override forecast: {D.dishes[id].name}</b>
      <span className="small muted">The app suggests {f.pre + f.walk}. Use an override only for known events (exams, holidays, campus events) and give a reason.</span>
      <div className="form">
        <label className="f">New forecast<input type="number" min="0" value={val} onChange={(e) => setVal(e.target.value)} autoFocus /></label>
        <label className="f">Reason<input type="text" maxLength={200} placeholder="e.g. exam week, half the students off campus" value={why} onChange={(e) => setWhy(e.target.value)} /></label>
      </div>
      <div className="chips">
        <button className="btn g sm" onClick={save}>Save override</button>
        {f.ov && <button className="btn o sm" onClick={async () => { if (await patch("log", S.date, { overrides: { [id]: { value: 0, reason: "", t: iso() } } }, "Back to the app’s forecast")) onDone(); }}>Use the app’s forecast</button>}
      </div>
    </div>
  );
}

export function Dashboard() {
  const { D, patch } = useCm(), { S, go } = useNav();
  const [ovr, setOvr] = useState<string | null>(null);
  const st = settingsOf(D), date = S.date, ids = dishesOf(D, date), now = nowHM(), isToday = date === todayStr();
  const head = <Hd title="Kitchen dashboard" right={<DateBar />}>Forecast = pre-orders + expected walk-ins (last 4 same weekdays × interest factor). First batch = {st.firstPct}% of forecast in batches of {st.batch}. Cook more only when the app says stock is low.</Hd>;
  if (!ids.length) return <>{head}<Empty icon="cal"><b>No menu for {fmtDay(date)}.</b><button className="btn" onClick={() => go("menu")}>Open the menu planner</button></Empty></>;
  const F = ids.map((id) => [id, forecast(D, date, id)] as const), tot = (k: "pre" | "fc" | "cooked" | "served") => F.reduce((a, [, f]) => a + f[k], 0);
  const alerts = isToday && now >= st.serviceStart && now < st.serviceEnd ? F.filter(([, f]) => f.cooked > 0 && f.avail < st.batch && f.served + f.placed < f.fc) : [];
  return (
    <>
      {head}
      <div className="grid g4">
        <Kpi v={tot("pre")} l={<>pre-orders{isToday && now < st.cutoff ? ` (open until ${st.cutoff})` : ""}</>} />
        <Kpi tone="good" v={tot("fc")} l="portions forecast" /><Kpi v={tot("cooked")} l="cooked so far" />
        <Kpi v={tot("served")} l="served (pre-orders collected + walk-ins + last call)" />
      </div>
      {alerts.length > 0 && <div className="note w"><b>Low stock:</b> {alerts.map(([id]) => D.dishes[id].name).join(", ")}. Cook another batch of {st.batch} if the queue is still there.</div>}
      <div className="tbl"><table style={{ minWidth: 1000 }}>
        <thead><tr><th style={{ minWidth: 190 }}>Dish</th><th className="n">Pre-orders<br />S / R / L</th><th className="n">Walk-ins<br />expected</th><th className="n">Interest</th><th className="n">Forecast</th><th className="n">First batch</th><th className="n">Cooked</th><th className="n">Served</th><th className="n">Available</th><th>Record</th></tr></thead>
        <tbody>{F.map(([id, f]) => { const d = D.dishes[id], low = alerts.some((a) => a[0] === id); return (
          <tr key={id} className={low ? "alert-row" : undefined}>
            <td><b>{d.name}</b><div className="small muted">{canteenName(D, d.canteen)}{f.lastBatch ? ` · last batch ${fmtT(f.lastBatch)}` : ""}</div></td>
            <td className="n">{f.pre}<div className="small muted">{f.byP.S} / {f.byP.R} / {f.byP.L}</div></td>
            <td className="n">{f.walk}<div className="small muted">{f.hist.length ? `avg ${round1(f.walkAvg)} (${f.hist.length} wk)` : "no history"}</div></td>
            <td className="n">{f.it.n && f.it.avg != null ? round1(f.it.avg) : "–"}<div className="small muted">n={f.it.n} · ×{f.factor.toFixed(2)}</div></td>
            <td className="n" style={{ fontWeight: 700, color: "var(--leaf)" }}>{f.fc}{f.ov && <div className="small muted">override</div>}</td>
            <td className="n">{f.first}</td><td className="n">{f.cooked}</td><td className="n">{f.served}</td>
            <td className="n" style={{ fontWeight: 700, color: f.avail < 0 ? "var(--waste)" : "inherit" }}>{f.cooked ? f.avail : "–"}</td>
            <td><div className="chips" style={{ flexWrap: "nowrap" }}>
              <button className="btn sm g" title={`Record a batch of ${st.batch}`} onClick={() => patch("log", date, { dishes: { [id]: { batches: { [eid()]: st.batch }, lastBatchAt: iso() } } }, `Batch of ${st.batch} recorded`)}>+{st.batch} cooked</button>
              <button className="btn sm o" onClick={() => patch("log", date, { dishes: { [id]: { walkins: { [eid()]: 1 } } } })}>+1 walk-in</button>
              <button className="btn sm o" onClick={() => patch("log", date, { dishes: { [id]: { walkins: { [eid()]: 5 } } } })}>+5</button>
              <button className="btn sm o" title="Override forecast" onClick={() => setOvr(id)}>Edit</button>
            </div></td>
          </tr>); })}</tbody>
      </table></div>
      <div id="ovrbox">{ovr && F.find((x) => x[0] === ovr) && <OverrideBox key={ovr + date} id={ovr} f={F.find((x) => x[0] === ovr)![1]} onDone={() => setOvr(null)} />}</div>
      <p className="small muted">Interest factor = average rating ÷ 3, kept between 0.7 and 1.3, used only with at least {st.minRatings} ratings. Without history, the dish’s baseline walk-in number from the menu planner is used.</p>
    </>
  );
}

/* ---------- pickups ---------- */
export function Pickups() {
  const { D, patch, toast } = useCm(), { S, set } = useNav(), st = settingsOf(D), date = S.date;
  const all = ordersFor(D, date), q = S.pickQ.trim().toUpperCase();
  const os = all.filter((o) => o.status !== "cancelled" && (S.pickCanteen === "all" || o.canteen === S.pickCanteen) && (!q || (o.code || "").includes(q)))
    .sort((a, b) => (a.status === "placed" ? 0 : 1) - (b.status === "placed" ? 0 : 1) || (a.code || "").localeCompare(b.code || ""));
  const placed = all.filter((o) => o.status === "placed");
  const release = async () => {
    const by: Record<string, Record<string, object>> = {};
    placed.forEach((o) => { (by[o.uid] ||= {})[o.oid] = { status: "noshow", statusAt: iso() }; });
    for (const [u, m] of Object.entries(by)) if (!(await patch("orders", u, { byDate: { [date]: m } }))) return;
    toast(`${placed.length} orders released`);
  };
  return (
    <>
      <Hd title="Pickups" right={<DateBar />}>Match the student’s code. The kitchen sees order codes only, never names.</Hd>
      <div className="chips" style={{ alignItems: "center" }}>
        <button className="chip" aria-pressed={S.pickCanteen === "all"} onClick={() => set({ pickCanteen: "all" })}>All</button>
        {st.canteens.map((c) => <button key={c.k} className="chip" aria-pressed={S.pickCanteen === c.k} onClick={() => set({ pickCanteen: c.k })}>{c.n}</button>)}
        <input type="text" placeholder="Search code, e.g. LK-4F2A" value={S.pickQ} onChange={(e) => set({ pickQ: e.target.value })} style={{ maxWidth: 240 }} aria-label="Search order code" />
      </div>
      {!os.length ? <Empty icon="qr"><b>No pre-orders{q ? " match this code" : " for this day"}.</b></Empty> : (
        <div className="tbl"><table>
          <thead><tr><th>Code</th><th>Dish</th><th>Portion</th><th>Status</th><th /></tr></thead>
          <tbody>{os.map((o) => {
            const setSt = (v: string) => patch("orders", o.uid, { byDate: { [date]: { [o.oid]: { status: v, statusAt: iso() } } } });
            return (
              <tr key={o.uid + o.oid}>
                <td className="mono" style={{ fontWeight: 700 }}>{o.code}</td><td>{D.dishes[o.dish]?.name || ""}</td><td>{PORT[o.portion]} · {st.portions[o.portion]} g</td>
                <td><span className={"st " + o.status}>{o.status}</span></td>
                <td><div className="chips" style={{ flexWrap: "nowrap" }}>{o.status === "placed"
                  ? <><button className="btn sm g" onClick={() => setSt("collected")}>Collected</button><button className="btn sm o" onClick={() => setSt("noshow")}>No-show</button></>
                  : <button className="btn sm o" onClick={() => setSt("placed")}>Undo</button>}</div></td>
              </tr>
            );
          })}</tbody>
        </table></div>
      )}
      {placed.length > 0 && <div className="note">At 12:30, release uncollected orders for walk-in sale. <button className="btn sm o" onClick={release}>Mark {placed.length} uncollected as no-show</button></div>}
    </>
  );
}

/* ---------- last call and donations ---------- */
const CHECKS = ["Cooked today and never served", "Untouched by customers (no plate leftovers)", "Held safely (hot above 60 °C or chilled)", "Packed in food-safe containers", "Labelled with dish name and time cooked", "Refrigerated, preferably below 5 °C, until pickup"];

function LastCallCard({ id, f }: { id: string; f: Forecast }) {
  const { D, patch, toast } = useCm(), { S } = useNav(), st = settingsOf(D), L = D.log[S.date] || {};
  const d = D.dishes[id], c = d.canteen, sent = L.lastCalls?.[c], inc = Object.keys(L.incidents || {}).length > 0;
  const [hot, setHot] = useState(false), [disc, setDisc] = useState("40"), [qty, setQty] = useState(String(Math.max(1, f.avail)));
  const fresh = minsAgo(f.lastBatch) <= st.maxHoldMin, ok = f.avail >= st.minLastCall && fresh && !sent && !inc;
  if (sent && sent.dish === id) {
    return (
      <div className="card" style={{ borderColor: "var(--amber)" }}>
        <b>{d.name}</b><span className="small">Last call sent {fmtT(sent.sentAt)} · {sent.discount}% off · {sent.qty} portions · until {sent.until}</span>
        <div className="kpi warn" style={{ border: "none", padding: 0 }}><span className="v">{sum(sent.sold)}</span><span className="l">sold at last call</span></div>
        <div className="chips">
          <button className="btn sm a" onClick={() => patch("log", S.date, { lastCalls: { [c]: { sold: { [eid()]: 1 } } } })}>+1 sold</button>
          <button className="btn sm o" onClick={() => patch("log", S.date, { lastCalls: { [c]: { sold: { [eid()]: 5 } } } })}>+5</button>
          <button className="btn sm o" onClick={() => patch("log", S.date, { lastCalls: { [c]: { until: nowHM() } } }, "Last call ended")}>End now</button>
        </div>
      </div>
    );
  }
  const send = () => {
    if (!hot) { toast("Confirm the food was kept hot above 60 °C."); return; }
    patch("log", S.date, { lastCalls: { [c]: { dish: id, qty: Math.max(1, Math.round(num(qty))), discount: +disc, until: st.serviceEnd, sentAt: iso(), sold: {} } } }, "Last call sent to students");
  };
  const ok2 = (good: boolean) => ({ color: good ? "var(--leaf)" : "var(--waste)" });
  return (
    <div className="card">
      <b>{d.name}</b><span className="small muted">{canteenName(D, c)} · {f.avail} available · last batch {f.lastBatch ? fmtT(f.lastBatch) : "–"}</span>
      <ul className="small" style={{ margin: 0, paddingLeft: "1.1em" }}>
        <li style={ok2(f.avail >= st.minLastCall)}>At least {st.minLastCall} portions left</li>
        <li style={ok2(fresh)}>Cooked within {st.maxHoldMin} minutes</li>
        <li style={ok2(!sent)}>No other last call from {canteenName(D, c)} today</li>
        <li>{nowHM() >= st.lastCallAt ? "" : "Before " + st.lastCallAt + ": usually too early"}</li>
      </ul>
      <label className="check"><input type="checkbox" checked={hot} onChange={(e) => setHot(e.target.checked)} /> Kept hot above 60 °C since cooking</label>
      <div className="form">
        <label className="f">Discount<select value={disc} onChange={(e) => setDisc(e.target.value)}><option>30</option><option>40</option><option>50</option></select></label>
        <label className="f">Portions offered<input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} /></label>
      </div>
      <button className="btn a" disabled={!ok} onClick={send}>Send last call</button>
    </div>
  );
}

function DonationForm({ ids, paused }: { ids: string[]; paused: boolean }) {
  const { D, patch, toast } = useCm(), { S } = useNav(), st = settingsOf(D);
  const [checks, setChecks] = useState<boolean[]>(CHECKS.map(() => false));
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (checks.some((c) => !c)) { toast("All six safety checks are required. If in doubt, do not donate."); return; }
    const por = Math.round(num(fd.get("por")));
    if (por < 1) { toast("Enter the number of portions."); return; }
    if (await patch("log", S.date, { donations: { [eid()]: { dish: String(fd.get("dish")), portions: por, kg: num(fd.get("kg")), partner: String(fd.get("partner")), checks: true, t: iso() } } }, "Donation recorded")) setChecks(CHECKS.map(() => false));
  };
  return (
    <form className="card" onSubmit={submit}>
      <div className="form">
        <label className="f">Dish<select name="dish">{ids.map((id) => <option key={id} value={id}>{D.dishes[id].name}</option>)}</select></label>
        <label className="f">Portions<input name="por" type="number" min="1" defaultValue="5" /></label>
        <label className="f">Weight (kg)<input name="kg" type="number" min="0" step="0.1" defaultValue="2" /></label>
        <label className="f">Partner<select name="partner">{st.partners.map((p) => <option key={p}>{p}</option>)}</select></label>
      </div>
      <div className="grid g2" style={{ gap: 6 }}>{CHECKS.map((t, i) => <label className="check" key={t}><input type="checkbox" checked={checks[i]} onChange={(e) => setChecks((c) => c.map((v, j) => (j === i ? e.target.checked : v)))} /> {t}</label>)}</div>
      <p className="small muted">All six checks are required. If in doubt, do not donate.</p>
      <div><button className="btn g" type="submit" disabled={paused || !ids.length}><I n="truck" /> Record donation</button></div>
    </form>
  );
}

export function Surplus() {
  const { D, patch, toast } = useCm(), { S } = useNav(), date = S.date, L = D.log[date] || {}, ids = dishesOf(D, date);
  const [incText, setIncText] = useState("");
  const wk = monday(date);
  let weekCalls = 0;
  for (let i = 0; i < 7; i++) weekCalls += Object.keys(D.log[addDays(wk, i)]?.lastCalls || {}).length;
  const inc = Object.values(L.incidents || {}), dons = Object.entries(L.donations || {});
  const cands = ids.map((id) => [id, forecast(D, date, id)] as const).filter(([, f]) => f.cooked > 0);
  return (
    <>
      <Hd title="Last call & donations" right={<DateBar />}>Prevention first. A last call is only for genuine surplus (Solution A). Safe food still left after service goes to a partner (Solution C).</Hd>
      {inc.length ? <div className="note w"><b>Food-safety incident recorded at {fmtT(inc[0].t)}:</b> {inc[0].text}. Last calls and donations are paused for this day. Inform the canteen manager and partner, and review within 48 hours.</div> : (
        <details className="card"><summary style={{ cursor: "pointer", fontWeight: 700 }}>Report a food-safety concern</summary>
          <label className="f">What happened?<input type="text" maxLength={300} placeholder="e.g. chiller above 8 °C at 13:30" value={incText} onChange={(e) => setIncText(e.target.value)} /></label>
          <div><button className="btn w sm" onClick={() => { if (!incText.trim()) { toast("Describe what happened."); return; } patch("log", date, { incidents: { [eid()]: { text: incText.trim(), t: iso() } } }, "Incident recorded. Last calls and donations paused."); }}>Record and pause last calls and donations</button></div>
        </details>
      )}
      {weekCalls > 3 && <div className="note w"><b>{weekCalls} last calls this week.</b> More than 3 suggests the forecast is too high. Review it in Insights before cooking more.</div>}
      <h2>Last call (Solution A)</h2>
      {!cands.length ? <Empty icon="tag"><span>Record batches on the dashboard first.</span></Empty>
        : <div className="grid g2">{cands.map(([id, f]) => <LastCallCard key={id + date} id={id} f={f} />)}</div>}
      <h2>Donate safe surplus (Solution C)</h2>
      <DonationForm key={date} ids={ids} paused={inc.length > 0} />
      {dons.length > 0 && (
        <div className="tbl"><table>
          <thead><tr><th>Time</th><th>Dish</th><th className="n">Portions</th><th className="n">kg</th><th>Partner</th></tr></thead>
          <tbody>{dons.map(([k, d]) => <tr key={k}><td className="mono">{fmtT(d.t)}</td><td>{D.dishes[d.dish]?.name || ""}</td><td className="n">{d.portions}</td><td className="n">{d.kg}</td><td>{d.partner}</td></tr>)}</tbody>
        </table></div>
      )}
    </>
  );
}

/* ---------- waste log ---------- */
export function WasteLog() {
  const { D, patch, toast } = useCm(), { S } = useNav(), st = settingsOf(D), date = S.date, w = D.log[date]?.waste, served = dayStats(D, date)?.served ?? 0;
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const x: Record<string, number | string> = { prep: num(fd.get("prep")), over: num(fd.get("over")), plate: num(fd.get("plate")), savedAt: iso() };
    const m = num(fd.get("meals"));
    if (m > 0) x.meals = m;
    if (+x.prep + +x.over + +x.plate <= 0) { toast("Enter at least one weight."); return; }
    patch("log", date, { waste: x }, "Waste saved");
  };
  const d = dayStats(D, date);
  const red = d?.gpm && st.baseline ? ((st.baseline - d.gpm) / st.baseline) * 100 : null;
  return (
    <>
      <Hd title="Waste log" right={<DateBar />}>Weigh after service, every day, at the same time. Waste is logged per day and per type, never per staff member.</Hd>
      <form className="card" key={date + (w?.savedAt || "")} onSubmit={save}>
        <div className="form">
          <label className="f">Preparation waste (g)<input name="prep" type="number" min="0" defaultValue={w?.prep ?? ""} placeholder="peels, trimmings" /></label>
          <label className="f">Overproduction (g)<input name="over" type="number" min="0" defaultValue={w?.over ?? ""} placeholder="cooked, never served" /></label>
          <label className="f">Plate waste (g)<input name="plate" type="number" min="0" defaultValue={w?.plate ?? ""} placeholder="left on plates" /></label>
          <label className="f">Meals served<input name="meals" type="number" min="0" defaultValue={w?.meals ?? ""} placeholder={`${served} counted by the app`} /></label>
        </div>
        <div><button className="btn g" type="submit"><I n="scale" /> Save today’s waste</button></div>
      </form>
      {d?.gpm && (
        <>
          <div className="grid g4">
            <Kpi v={Math.round((d.grams / 1000) * 10) / 10 + " kg"} l="total food waste" />
            <Kpi tone={red != null && red > 0 ? "good" : "bad"} v={Math.round(d.gpm) + " g"} l={`per meal (${d.meals} meals)`} />
            <Kpi tone={red != null && red >= 15 ? "good" : red != null && red > 0 ? "warn" : "bad"} v={red != null ? (red > 0 ? "−" : "+") + Math.abs(Math.round(red)) + "%" : "–"} l={`vs baseline ${st.baseline ? st.baseline + " g" : "(set in Settings)"} · target −15%`} />
            <Kpi v={d.err != null ? Math.round(d.err * 100) + "%" : "–"} l="forecast error (target within 20%)" />
          </div>
          <div className="card"><b>Where the waste comes from</b>
            <div className="stack">{([["prep", "var(--muted)"], ["over", "var(--waste)"], ["plate", "var(--amber)"]] as const).map(([k, c]) => { const v = +(d.w[k] || 0); return v ? <i key={k} style={{ width: (v / d.grams) * 100 + "%", background: c }} title={`${k}: ${v} g`} /> : null; })}</div>
            <div className="legend"><span><b style={{ background: "var(--muted)" }} />Preparation {d.w.prep || 0} g</span><span><b style={{ background: "var(--waste)" }} />Overproduction {d.w.over || 0} g</span><span><b style={{ background: "var(--amber)" }} />Plate {d.w.plate || 0} g</span></div>
          </div>
        </>
      )}
    </>
  );
}

/* ---------- menu planner ---------- */
function DishForm({ editId, onDone }: { editId: string | null; onDone: () => void }) {
  const { D, put, toast } = useCm(), st = settingsOf(D), d: Partial<Dish> = (editId && D.dishes[editId]) || {};
  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget, fd = new FormData(form), n = String(fd.get("name") || "").trim();
    if (!n) { toast("Give the dish a name."); return; }
    const id = editId || "d-" + n.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24) + "-" + Date.now().toString(36).slice(-4);
    const ok = await put("dishes", id, {
      name: n, canteen: String(fd.get("canteen")), tags: String(fd.get("tags") || "").split(",").map((x) => x.trim()).filter(Boolean),
      base: num(fd.get("base")), color: D.dishes[id]?.color || COLORS[Object.keys(D.dishes).length % COLORS.length],
    }, editId ? "Dish updated" : "Dish added");
    if (ok) { onDone(); form.reset(); }
  };
  return (
    <form key={editId || "new"} onSubmit={save} style={{ display: "contents" }}>
      <div className="form">
        <label className="f">Name<input name="name" type="text" maxLength={80} defaultValue={d.name || ""} placeholder="e.g. Beef pho" /></label>
        <label className="f">Canteen<select name="canteen" defaultValue={d.canteen}>{st.canteens.map((c) => <option key={c.k} value={c.k}>{c.n}</option>)}</select></label>
        <label className="f">Labels (comma-separated)<input name="tags" type="text" defaultValue={(d.tags || []).join(", ")} placeholder="Halal, Vegetarian, Contains nuts" /></label>
        <label className="f">Baseline walk-ins per day<input name="base" type="number" min="0" defaultValue={d.base ?? 30} /></label>
      </div>
      <div className="chips"><button className="btn g" type="submit">{editId ? "Save changes" : "Add dish"}</button>{editId && <button className="btn o" type="button" onClick={onDone}>Cancel</button>}</div>
      <p className="small muted">Labels such as Halal or allergens must be checked by the canteen before publishing.</p>
    </form>
  );
}

export function MenuPlanner() {
  const { D, put, toast } = useCm(), { S, set } = useNav(), st = settingsOf(D), wk = S.planWeek;
  const days = [0, 1, 2, 3, 4].map((i) => addDays(wk, i)), lib = Object.entries(D.dishes);
  const starter = async () => {
    for (const [id, c, n, tg, ci, base] of STARTER) if (!(await put("dishes", id, { name: n, canteen: c, tags: tg, color: COLORS[ci], base }))) return;
    const ids = STARTER.map((x) => x[0]);
    for (const w of [monday(todayStr()), addDays(monday(todayStr()), 7)]) for (let i = 0; i < 5; i++) await put("days", addDays(w, i), { dishes: ids });
    if (!D.settings.main?.cutoff) await put("settings", "main", { ...DEFAULTS });
    toast("Starter menu created for this week and next");
  };
  const copyLast = async () => {
    for (let i = 0; i < 5; i++) { const d = addDays(wk, i), src = dishesOf(D, addDays(d, -7)); if (src.length) await put("days", d, { dishes: src }); }
    toast("Copied last week’s menu");
  };
  return (
    <>
      <Hd title="Menu planner" right={<div className="chips"><button className="chip" onClick={() => set({ planWeek: addDays(wk, -7) })}>‹ Previous</button><span className="chip" style={{ cursor: "default" }}>Week of {fmtDay(wk)}</span><button className="chip" onClick={() => set({ planWeek: addDays(wk, 7) })}>Next ›</button></div>}>
        Publish the week’s menu by Thursday 17:00 so students can rate it and pre-order.
      </Hd>
      {!lib.length && <Empty icon="bulb"><b>No dishes yet.</b><span>Start with the six dishes from our CampusMeal overview, then edit them.</span><button className="btn g" onClick={starter}>Create starter menu</button></Empty>}
      <div style={{ overflowX: "auto" }}><div className="weekgrid">
        <div />{st.canteens.map((c) => <div key={c.k} className="h">{c.n}</div>)}
        {days.map((d) => [
          <div key={d} className="h" style={{ alignSelf: "center" }}>{fmtDay(d)}</div>,
          ...st.canteens.map((c) => {
            const ids = dishesOf(D, d).filter((id) => D.dishes[id].canteen === c.k), opts = lib.filter(([id, x]) => x.canteen === c.k && !ids.includes(id));
            return (
              <div className="cell" key={d + c.k}>
                {ids.map((id) => <span className="mchip" key={id}>{D.dishes[id].name}<button aria-label="Remove" onClick={() => put("days", d, { dishes: dishesOf(D, d).filter((x) => x !== id) })}>×</button></span>)}
                {opts.length > 0 && <select aria-label="Add dish" value="" onChange={(e) => e.target.value && put("days", d, { dishes: dishesOf(D, d).concat(e.target.value) }, "Added to the menu")}>
                  <option value="">+ Add dish</option>{opts.map(([id, x]) => <option key={id} value={id}>{x.name}</option>)}</select>}
              </div>
            );
          }),
        ])}
      </div></div>
      <div className="chips"><button className="btn o sm" onClick={copyLast}>Copy last week’s menu into this week</button></div>
      <h2>Dish library</h2>
      <div className="tbl"><table>
        <thead><tr><th>Dish</th><th>Canteen</th><th>Labels</th><th className="n">Baseline walk-ins</th><th /></tr></thead>
        <tbody>{lib.map(([id, x]) => (
          <tr key={id}><td><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: x.color }} /> <b>{x.name}</b></td><td>{canteenName(D, x.canteen)}</td><td><Tags d={x} /></td><td className="n">{x.base || 0}</td>
            <td><button className="btn sm o" onClick={() => { set({ editDish: id }); setTimeout(() => document.getElementById("dishform")?.scrollIntoView({ behavior: "smooth" }), 0); }}>Edit</button></td></tr>
        ))}</tbody>
      </table></div>
      <div className="card" id="dishform"><h3>{S.editDish ? "Edit dish" : "Add a dish"}</h3><DishForm editId={S.editDish} onDone={() => set({ editDish: null })} /></div>
    </>
  );
}

/* ---------- insights ---------- */
export function Insights() {
  const { D } = useCm(), { S, set } = useNav(), st = settingsOf(D), since = addDays(todayStr(), -S.insightDays);
  const rows = Object.entries(D.dishes).map(([id, d]) => {
    let fcs = 0, srv = 0, days = 0;
    for (const date of Object.keys(D.log)) {
      if (date < since || date > todayStr() || !dishesOf(D, date).includes(id)) continue;
      const f = forecast(D, date, id);
      if (!f.served && !f.cooked) continue;
      fcs += f.fc; srv += f.served; days++;
    }
    const fb = feedbackFor(D, id, since), bad = fb.filter((f) => f.amount === "Half" || f.amount === "A little").length;
    const rs: Record<string, number> = {};
    fb.forEach((f) => f.reasons.forEach((r) => (rs[r] = (rs[r] || 0) + 1)));
    const rt: number[] = [];
    for (const doc of Object.values(D.ratings)) for (const [wk, m] of Object.entries(doc?.byWeek || {})) if (wk >= monday(since) && m[id]) rt.push(m[id]);
    const avgR = rt.length ? rt.reduce((a, b) => a + b, 0) / rt.length : null, err = srv ? (fcs - srv) / srv : null;
    const flags: string[] = [];
    if (fb.length >= st.minFeedback && bad / fb.length >= 0.3) flags.push("Often not finished");
    if (rt.length >= st.minRatings && avgR != null && avgR < 2.5) flags.push("Low interest");
    if (days >= 3 && err != null && Math.abs(err) > 0.2) flags.push(err > 0 ? "Forecast too high" : "Forecast too low");
    return { id, d, days, err, fb, bad, rs, avgR, rn: rt.length, flags };
  }).sort((a, b) => b.flags.length - a.flags.length);
  const top: Record<string, number> = {};
  rows.forEach((r) => Object.entries(r.rs).forEach(([k, v]) => (top[k] = (top[k] || 0) + v)));
  const tr = Object.entries(top).sort((a, b) => b[1] - a[1]);
  const COL = ["var(--leaf)", "#8CC3A2", "var(--amber)", "var(--waste)"];
  return (
    <>
      <Hd title="Menu insights" right={<div className="chips">{[14, 28, 56].map((n) => <button key={n} className="chip" aria-pressed={S.insightDays === n} onClick={() => set({ insightDays: n })}>{n} days</button>)}</div>}>
        Dishes are flagged when 30% or more of finish-checks say “Half” or “A little”, when interest is below 2.5, or when the forecast is off by more than 20%. Totals under {st.minFeedback} answers are hidden to protect privacy.
      </Hd>
      {!rows.length ? <Empty icon="bulb"><b>No dishes yet.</b></Empty> : <>
        <div className="tbl"><table>
          <thead><tr><th>Dish</th><th className="n">Days served</th><th className="n">Forecast vs served</th><th className="n">Interest</th><th>Finish-check</th><th>Flags</th></tr></thead>
          <tbody>{rows.map((r) => { const n = r.fb.length, dist = AMOUNTS.map((a) => r.fb.filter((f) => f.amount === a).length); return (
            <tr key={r.id}>
              <td><b>{r.d.name}</b><div className="small muted">{canteenName(D, r.d.canteen)}</div></td>
              <td className="n">{r.days}</td><td className="n">{r.err != null ? (r.err > 0 ? "+" : "") + Math.round(r.err * 100) + "%" : "–"}</td>
              <td className="n">{r.rn >= st.minRatings && r.avgR != null ? <>{round1(r.avgR)} <span className="small muted">n={r.rn}</span></> : <span className="small muted">n={r.rn}</span>}</td>
              <td style={{ minWidth: 180 }}>{n >= st.minFeedback ? <>
                <div className="stack" style={{ height: 14 }}>{dist.map((v, i) => v ? <i key={i} style={{ width: (v / n) * 100 + "%", background: COL[i] }} title={`${AMOUNTS[i]}: ${v}`} /> : null)}</div>
                <span className="small muted">n={n} · {Math.round((r.bad / n) * 100)}% half or less</span></> : <span className="small muted">n={n} (hidden below {st.minFeedback})</span>}</td>
              <td>{r.flags.length ? r.flags.map((f) => <span key={f} className="tag" style={{ background: "var(--waste-soft)", color: "var(--waste)" }}>{f}</span>) : <span className="tag h">OK</span>}</td>
            </tr>); })}</tbody>
        </table></div>
        <div className="legend">{AMOUNTS.map((a, i) => <span key={a}><b style={{ background: COL[i] }} />{a}</span>)}</div>
        {tr.length > 0 && <div className="card"><b>Most common reasons for leftovers</b><div className="bars">{tr.map(([k, v]) => <div className="bar" key={k}><span>{k}</span><span className="t"><i style={{ width: (v / tr[0][1]) * 100 + "%", background: "var(--amber)" }} /></span><span className="v">{v}</span></div>)}</div></div>}
      </>}
    </>
  );
}

/* ---------- weekly report ---------- */
export function Report() {
  const { D } = useCm(), { S, set } = useNav(), st = settingsOf(D), wk = S.reportWeek, rows = weekRows(D, wk);
  const T = rows.reduce((a, { s }) => ({ meals: a.meals + s.meals, grams: a.grams + s.grams, pre: a.pre + s.pre, lc: a.lc + s.lastCalls, don: a.don + s.donated, kg: a.kg + s.donatedKg, fc: a.fc + s.fcSum, srv: a.srv + s.served, inc: a.inc + s.incidents }),
    { meals: 0, grams: 0, pre: 0, lc: 0, don: 0, kg: 0, fc: 0, srv: 0, inc: 0 });
  const gpm = T.meals && T.grams ? T.grams / T.meals : null, red = gpm && st.baseline ? ((st.baseline - gpm) / st.baseline) * 100 : null;
  let fbN = 0, fbAll = 0;
  for (const doc of Object.values(D.feedback)) for (const f of Object.values(doc?.byOrder || {})) if (f.date >= wk && f.date <= addDays(wk, 6)) { fbN++; if (f.amount === "All" || f.amount === "Most") fbAll++; }
  const err = T.srv ? Math.abs(T.fc - T.srv) / T.srv : null;
  const mx = Math.max(st.baseline || 0, ...rows.map((r) => r.s.gpm || 0)) * 1.1 || 1;
  return (
    <>
      <Hd title="Weekly report" right={<div className="chips">
        <button className="chip" onClick={() => set({ reportWeek: addDays(wk, -7) })}>‹</button><span className="chip" style={{ cursor: "default" }}>Week of {fmtDay(wk)}</span>
        <button className="chip" onClick={() => set({ reportWeek: addDays(wk, 7) })}>›</button>
        <button className="btn sm o" onClick={() => downloadText(`campusmeal_week_${wk}.csv`, weekCsv(D, wk), "text/csv")}>Download CSV</button></div>}>
        The protocol’s KPIs for the canteen manager, every Friday.
      </Hd>
      <div className="grid g4">
        <Kpi tone={red != null && red >= 15 ? "good" : red != null && red > 0 ? "warn" : ""} v={gpm ? Math.round(gpm) + " g" : "–"} l={<>waste per meal{red != null ? ` · ${red > 0 ? "−" : "+"}${Math.abs(Math.round(red))}% vs baseline (target −15%)` : ""}</>} />
        <Kpi v={T.meals} l="meals served" /><Kpi v={T.srv ? Math.round((T.pre / T.srv) * 100) + "%" : "–"} l="of meals pre-ordered" />
        <Kpi tone={err != null && err <= 0.2 ? "good" : "warn"} v={err != null ? Math.round(err * 100) + "%" : "–"} l="forecast error (target ≤ 20%)" />
        <Kpi tone={T.lc > 3 ? "warn" : ""} v={T.lc} l="last calls (target ≤ 3 per canteen)" />
        <Kpi tone="good" v={T.don} l={`meals donated · ${round1(T.kg)} kg`} />
        <Kpi v={fbN >= st.minFeedback ? Math.round((fbAll / fbN) * 100) + "%" : "–"} l={`finish-checks “All” or “Most” (n=${fbN})`} />
        <Kpi tone={T.inc ? "bad" : "good"} v={T.inc} l="food-safety incidents recorded (target 0)" />
      </div>
      {!rows.length ? <Empty icon="chart"><b>No service logged this week.</b></Empty> : <>
        <div className="card"><b>Waste per meal by day</b>
          <div className="bars">{rows.map(({ d, s }) => (
            <div className="bar" key={d}><span>{fmtDay(d)}</span>
              <span className="t"><i style={{ width: ((s.gpm || 0) / mx) * 100 + "%", background: st.baseline && s.gpm && s.gpm > st.baseline ? "var(--waste)" : "var(--leaf)" }} />{st.baseline > 0 && <span className="bl" style={{ left: (st.baseline / mx) * 100 + "%" }} />}</span>
              <span className="v">{s.gpm ? Math.round(s.gpm) + " g" : "–"}</span></div>
          ))}</div>
          {st.baseline > 0 && <div className="legend"><span><b style={{ background: "var(--waste)", width: 2 }} />Baseline {st.baseline} g</span></div>}
        </div>
        <div className="tbl"><table>
          <thead><tr><th>Day</th><th className="n">Meals</th><th className="n">Forecast</th><th className="n">Cooked</th><th className="n">Waste (kg)</th><th className="n">g / meal</th><th className="n">Last calls</th><th className="n">Donated</th></tr></thead>
          <tbody>{rows.map(({ d, s }) => <tr key={d}><td>{fmtDay(d)}</td><td className="n">{s.meals}</td><td className="n">{s.fcSum}</td><td className="n">{s.cooked}</td><td className="n">{round1(s.grams / 1000)}</td><td className="n">{s.gpm ? Math.round(s.gpm) : "–"}</td><td className="n">{s.lastCalls}</td><td className="n">{s.donated}</td></tr>)}</tbody>
        </table></div>
      </>}
    </>
  );
}

/* ---------- settings ---------- */
export function Settings() {
  const { D, put } = useCm(), st = settingsOf(D);
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget), s = (k: string) => String(fd.get(k) || ""), n = (k: string) => num(fd.get(k));
    put("settings", "main", {
      ...st, cutoff: s("cutoff") || st.cutoff, serviceStart: s("start") || st.serviceStart, lastCallAt: s("lc") || st.lastCallAt, serviceEnd: s("end") || st.serviceEnd,
      enforceCutoff: fd.get("enf") === "on", batch: Math.max(1, Math.round(n("batch")) || st.batch), firstPct: clamp(n("first") || st.firstPct, 10, 100),
      minRatings: Math.max(1, Math.round(n("minr")) || st.minRatings), portions: { S: n("ps") || st.portions.S, R: n("pr") || st.portions.R, L: n("pl") || st.portions.L },
      minLastCall: Math.max(1, Math.round(n("minlc")) || st.minLastCall), maxHoldMin: Math.max(30, n("hold") || st.maxHoldMin),
      partners: s("part").split(",").map((x) => x.trim()).filter(Boolean), baseline: n("base"), minFeedback: Math.max(3, Math.round(n("minf")) || st.minFeedback),
    }, "Settings saved");
  };
  return (
    <form onSubmit={save} key={JSON.stringify(st)} style={{ display: "contents" }}>
      <Hd title="Settings">Rules from the CampusMeal operating protocol. Changes apply to everyone immediately.</Hd>
      <div className="card"><h3>Times</h3><div className="form">
        <label className="f">Pre-order cut-off<input type="time" name="cutoff" defaultValue={st.cutoff} /></label>
        <label className="f">Service starts<input type="time" name="start" defaultValue={st.serviceStart} /></label>
        <label className="f">Last call from<input type="time" name="lc" defaultValue={st.lastCallAt} /></label>
        <label className="f">Service ends<input type="time" name="end" defaultValue={st.serviceEnd} /></label></div>
        <label className="check"><input type="checkbox" name="enf" defaultChecked={st.enforceCutoff} /> Enforce the cut-off (switch off only for testing)</label></div>
      <div className="card"><h3>Forecast and batches</h3><div className="form">
        <label className="f">Batch size (portions)<input type="number" name="batch" min="1" defaultValue={st.batch} /></label>
        <label className="f">First batch (% of forecast)<input type="number" name="first" min="10" max="100" defaultValue={st.firstPct} /></label>
        <label className="f">Ratings needed to use interest<input type="number" name="minr" min="1" defaultValue={st.minRatings} /></label></div></div>
      <div className="card"><h3>Portions (g of rice)</h3><div className="form">
        <label className="f">Small<input type="number" name="ps" defaultValue={st.portions.S} /></label>
        <label className="f">Regular (default)<input type="number" name="pr" defaultValue={st.portions.R} /></label>
        <label className="f">Large<input type="number" name="pl" defaultValue={st.portions.L} /></label></div></div>
      <div className="card"><h3>Last call and donations</h3><div className="form">
        <label className="f">Minimum portions for a last call<input type="number" name="minlc" min="1" defaultValue={st.minLastCall} /></label>
        <label className="f">Maximum minutes since cooking<input type="number" name="hold" min="30" defaultValue={st.maxHoldMin} /></label>
        <label className="f">Partners (comma-separated)<input type="text" name="part" defaultValue={st.partners.join(", ")} /></label></div></div>
      <div className="card"><h3>Measurement</h3><div className="form">
        <label className="f">Baseline waste per meal (g), from the audit<input type="number" name="base" min="0" defaultValue={st.baseline || ""} placeholder="e.g. 118" /></label>
        <label className="f">Minimum answers before showing feedback<input type="number" name="minf" min="3" defaultValue={st.minFeedback} /></label></div></div>
      <div><button className="btn g" type="submit">Save settings</button></div>
    </form>
  );
}
