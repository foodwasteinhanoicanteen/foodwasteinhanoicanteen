/* Kitchen screens: Dashboard, Pickups, Last call & donate, Waste log, Menu planner, Insights, Weekly report, Settings. */
import { useState, type FormEvent } from "react";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Table, TableCard } from "@/components/application/table/table";
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
/** Numeric column head: right-aligned like the td.n cells. */
const NH = "n [&>div]:justify-end";
const STATUS = { placed: "blue", collected: "success", noshow: "error", cancelled: "gray" } as const;
const one = (k: Set<unknown> | "all") => (k === "all" ? null : [...k][0]);
const Week = ({ wk }: { wk: string }) => <Badge type="modern" color="gray" size="lg">Week of {fmtDay(wk)}</Badge>;

function DateBar() {
  const { S, set } = useNav();
  return (
    <div className="chips" style={{ alignItems: "center" }}>
      <Button color="secondary" size="sm" aria-label="Previous day" onPress={() => set({ date: addDays(S.date, -1) })}>‹</Button>
      <Input type="date" size="sm" value={S.date} onChange={(v) => v && set({ date: v })} aria-label="Day" className="w-auto" />
      <Button color="secondary" size="sm" aria-label="Next day" onPress={() => set({ date: addDays(S.date, 1) })}>›</Button>
      {S.date !== todayStr() && <Button color="secondary" size="sm" onPress={() => set({ date: todayStr() })}>Today</Button>}
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
        <Input label="New forecast" type="number" value={val} onChange={setVal} autoFocus />
        <Input label="Reason" maxLength={200} placeholder="e.g. exam week, half the students off campus" value={why} onChange={setWhy} />
      </div>
      <div className="chips">
        <Button size="sm" onPress={save}>Save override</Button>
        {f.ov && <Button color="secondary" size="sm" onPress={async () => { if (await patch("log", S.date, { overrides: { [id]: { value: 0, reason: "", t: iso() } } }, "Back to the app’s forecast")) onDone(); }}>Use the app’s forecast</Button>}
      </div>
    </div>
  );
}

export function Dashboard() {
  const { D, patch } = useCm(), { S, go } = useNav();
  const [ovr, setOvr] = useState<string | null>(null);
  const st = settingsOf(D), date = S.date, ids = dishesOf(D, date), now = nowHM(), isToday = date === todayStr();
  const head = <Hd title="Kitchen dashboard" right={<DateBar />}>Forecast = pre-orders + expected walk-ins (last 4 same weekdays × interest factor). First batch = {st.firstPct}% of forecast in batches of {st.batch}. Cook more only when the app says stock is low.</Hd>;
  if (!ids.length) return <>{head}<Empty icon="cal"><b>No menu for {fmtDay(date)}.</b><Button size="md" onPress={() => go("menu")}>Open the menu planner</Button></Empty></>;
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
      <TableCard.Root size="sm"><Table aria-label="Today’s dishes" className="min-w-[1000px]">
        <Table.Header>
          <Table.Head id="dish" isRowHeader label="Dish" className="min-w-48" /><Table.Head id="pre" label="Pre-orders S / R / L" className={NH} />
          <Table.Head id="walk" label="Walk-ins expected" className={NH} /><Table.Head id="int" label="Interest" className={NH} />
          <Table.Head id="fc" label="Forecast" className={NH} /><Table.Head id="first" label="First batch" className={NH} />
          <Table.Head id="cooked" label="Cooked" className={NH} /><Table.Head id="served" label="Served" className={NH} />
          <Table.Head id="avail" label="Available" className={NH} /><Table.Head id="rec" label="Record" />
        </Table.Header>
        <Table.Body>{F.map(([id, f]) => { const d = D.dishes[id], low = alerts.some((a) => a[0] === id); return (
          <Table.Row key={id} id={id} className={low ? "alert-row" : undefined}>
            <Table.Cell><b>{d.name}</b><div className="small muted">{canteenName(D, d.canteen)}{f.lastBatch ? ` · last batch ${fmtT(f.lastBatch)}` : ""}</div></Table.Cell>
            <Table.Cell className="n">{f.pre}<div className="small muted">{f.byP.S} / {f.byP.R} / {f.byP.L}</div></Table.Cell>
            <Table.Cell className="n">{f.walk}<div className="small muted">{f.hist.length ? `avg ${round1(f.walkAvg)} (${f.hist.length} wk)` : "no history"}</div></Table.Cell>
            <Table.Cell className="n">{f.it.n && f.it.avg != null ? round1(f.it.avg) : "–"}<div className="small muted">n={f.it.n} · ×{f.factor.toFixed(2)}</div></Table.Cell>
            <Table.Cell className="n" style={{ fontWeight: 700, color: "var(--leaf)" }}>{f.fc}{f.ov && <div className="small muted">override</div>}</Table.Cell>
            <Table.Cell className="n">{f.first}</Table.Cell><Table.Cell className="n">{f.cooked}</Table.Cell><Table.Cell className="n">{f.served}</Table.Cell>
            <Table.Cell className="n" style={{ fontWeight: 700, color: f.avail < 0 ? "var(--waste)" : "inherit" }}>{f.cooked ? f.avail : "–"}</Table.Cell>
            <Table.Cell><div className="chips" style={{ flexWrap: "nowrap" }}>
              <Button size="sm" onPress={() => patch("log", date, { dishes: { [id]: { batches: { [eid()]: st.batch }, lastBatchAt: iso() } } }, `Batch of ${st.batch} recorded`)}>+{st.batch} cooked</Button>
              <Button color="secondary" size="sm" onPress={() => patch("log", date, { dishes: { [id]: { walkins: { [eid()]: 1 } } } })}>+1 walk-in</Button>
              <Button color="secondary" size="sm" onPress={() => patch("log", date, { dishes: { [id]: { walkins: { [eid()]: 5 } } } })}>+5</Button>
              <Button color="secondary" size="sm" aria-label={`Edit forecast for ${d.name}`} onPress={() => setOvr(id)}>Edit</Button>
            </div></Table.Cell>
          </Table.Row>); })}</Table.Body>
      </Table></TableCard.Root>
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
        <ButtonGroup size="sm" className="flex-wrap" aria-label="Canteen" disallowEmptySelection selectedKeys={[S.pickCanteen]} onSelectionChange={(k) => { const c = one(k); if (c != null) set({ pickCanteen: String(c) }); }}>
          <ButtonGroupItem id="all">All</ButtonGroupItem>
          {st.canteens.map((c) => <ButtonGroupItem key={c.k} id={c.k}>{c.n}</ButtonGroupItem>)}
        </ButtonGroup>
        <Input size="sm" placeholder="Search code, e.g. LK-4F2A" value={S.pickQ} onChange={(v) => set({ pickQ: v })} className="max-w-60" aria-label="Search order code" />
      </div>
      {!os.length ? <Empty icon="qr"><b>No pre-orders{q ? " match this code" : " for this day"}.</b></Empty> : (
        <TableCard.Root size="sm"><Table aria-label="Pre-orders">
          <Table.Header><Table.Head id="code" isRowHeader label="Code" /><Table.Head id="dish" label="Dish" /><Table.Head id="portion" label="Portion" /><Table.Head id="status" label="Status" /><Table.Head id="act" /></Table.Header>
          <Table.Body>{os.map((o) => {
            const setSt = (v: string) => patch("orders", o.uid, { byDate: { [date]: { [o.oid]: { status: v, statusAt: iso() } } } });
            return (
              <Table.Row key={o.uid + o.oid} id={o.uid + o.oid}>
                <Table.Cell className="mono" style={{ fontWeight: 700 }}>{o.code}</Table.Cell><Table.Cell>{D.dishes[o.dish]?.name || ""}</Table.Cell><Table.Cell>{PORT[o.portion]} · {st.portions[o.portion]} g</Table.Cell>
                <Table.Cell><Badge size="sm" color={STATUS[o.status]}>{o.status}</Badge></Table.Cell>
                <Table.Cell><div className="chips" style={{ flexWrap: "nowrap" }}>{o.status === "placed"
                  ? <><Button size="sm" onPress={() => setSt("collected")}>Collected</Button><Button color="secondary" size="sm" onPress={() => setSt("noshow")}>No-show</Button></>
                  : <Button color="secondary" size="sm" onPress={() => setSt("placed")}>Undo</Button>}</div></Table.Cell>
              </Table.Row>
            );
          })}</Table.Body>
        </Table></TableCard.Root>
      )}
      {placed.length > 0 && <div className="note">At 12:30, release uncollected orders for walk-in sale. <Button color="secondary" size="sm" onPress={release}>Mark {placed.length} uncollected as no-show</Button></div>}
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
          <Button color="secondary" size="sm" onPress={() => patch("log", S.date, { lastCalls: { [c]: { sold: { [eid()]: 1 } } } })}>+1 sold</Button>
          <Button color="secondary" size="sm" onPress={() => patch("log", S.date, { lastCalls: { [c]: { sold: { [eid()]: 5 } } } })}>+5</Button>
          <Button color="secondary" size="sm" onPress={() => patch("log", S.date, { lastCalls: { [c]: { until: nowHM() } } }, "Last call ended")}>End now</Button>
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
      <Checkbox isSelected={hot} onChange={setHot} label="Kept hot above 60 °C since cooking" />
      <div className="form">
        <NativeSelect label="Discount" value={disc} onChange={(e) => setDisc(e.target.value)} options={["30", "40", "50"].map((v) => ({ label: v, value: v }))} />
        <Input label="Portions offered" type="number" value={qty} onChange={setQty} />
      </div>
      <Button color="secondary" size="md" isDisabled={!ok} onPress={send}>Send last call</Button>
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
        <NativeSelect label="Dish" name="dish" options={ids.map((id) => ({ label: D.dishes[id].name, value: id }))} />
        <Input label="Portions" name="por" type="number" defaultValue="5" />
        <Input label="Weight (kg)" name="kg" type="number" defaultValue="2" />
        <NativeSelect label="Partner" name="partner" options={st.partners.map((p) => ({ label: p, value: p }))} />
      </div>
      <div className="grid g2" style={{ gap: 6 }}>{CHECKS.map((t, i) => <Checkbox key={t} label={t} isSelected={checks[i]} onChange={(v) => setChecks((c) => c.map((x, j) => (j === i ? v : x)))} />)}</div>
      <p className="small muted">All six checks are required. If in doubt, do not donate.</p>
      <div><Button type="submit" size="md" isDisabled={paused || !ids.length} iconLeading={<I n="truck" />}>Record donation</Button></div>
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
          <Input label="What happened?" maxLength={300} placeholder="e.g. chiller above 8 °C at 13:30" value={incText} onChange={setIncText} />
          <div><Button color="secondary-destructive" size="sm" onPress={() => { if (!incText.trim()) { toast("Describe what happened."); return; } patch("log", date, { incidents: { [eid()]: { text: incText.trim(), t: iso() } } }, "Incident recorded. Last calls and donations paused."); }}>Record and pause last calls and donations</Button></div>
        </details>
      )}
      {weekCalls > 3 && <div className="note w"><b>{weekCalls} last calls this week.</b> More than 3 suggests the forecast is too high. Review it in Insights before cooking more.</div>}
      <h2>Last call (Solution A)</h2>
      {!cands.length ? <Empty icon="tag"><span>Record batches on the dashboard first.</span></Empty>
        : <div className="grid g2">{cands.map(([id, f]) => <LastCallCard key={id + date} id={id} f={f} />)}</div>}
      <h2>Donate safe surplus (Solution C)</h2>
      <DonationForm key={date} ids={ids} paused={inc.length > 0} />
      {dons.length > 0 && (
        <TableCard.Root size="sm"><Table aria-label="Donations">
          <Table.Header><Table.Head id="t" isRowHeader label="Time" /><Table.Head id="dish" label="Dish" /><Table.Head id="por" label="Portions" className={NH} /><Table.Head id="kg" label="kg" className={NH} /><Table.Head id="partner" label="Partner" /></Table.Header>
          <Table.Body>{dons.map(([k, d]) => <Table.Row key={k} id={k}><Table.Cell className="mono">{fmtT(d.t)}</Table.Cell><Table.Cell>{D.dishes[d.dish]?.name || ""}</Table.Cell><Table.Cell className="n">{d.portions}</Table.Cell><Table.Cell className="n">{d.kg}</Table.Cell><Table.Cell>{d.partner}</Table.Cell></Table.Row>)}</Table.Body>
        </Table></TableCard.Root>
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
          <Input label="Preparation waste (g)" name="prep" type="number" defaultValue={String(w?.prep ?? "")} placeholder="peels, trimmings" />
          <Input label="Overproduction (g)" name="over" type="number" defaultValue={String(w?.over ?? "")} placeholder="cooked, never served" />
          <Input label="Plate waste (g)" name="plate" type="number" defaultValue={String(w?.plate ?? "")} placeholder="left on plates" />
          <Input label="Meals served" name="meals" type="number" defaultValue={String(w?.meals ?? "")} placeholder={`${served} counted by the app`} />
        </div>
        <div><Button type="submit" size="md" iconLeading={<I n="scale" />}>Save today’s waste</Button></div>
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
        <Input label="Name" name="name" maxLength={80} defaultValue={d.name || ""} placeholder="e.g. Beef pho" />
        <NativeSelect label="Canteen" name="canteen" defaultValue={d.canteen} options={st.canteens.map((c) => ({ label: c.n, value: c.k }))} />
        <Input label="Labels (comma-separated)" name="tags" defaultValue={(d.tags || []).join(", ")} placeholder="Halal, Vegetarian, Contains nuts" />
        <Input label="Baseline walk-ins per day" name="base" type="number" defaultValue={String(d.base ?? 30)} />
      </div>
      <div className="chips"><Button type="submit" size="md">{editId ? "Save changes" : "Add dish"}</Button>{editId && <Button color="secondary" size="md" onPress={onDone}>Cancel</Button>}</div>
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
      <Hd title="Menu planner" right={<div className="chips"><Button color="secondary" size="sm" onPress={() => set({ planWeek: addDays(wk, -7) })}>‹ Previous</Button><Week wk={wk} /><Button color="secondary" size="sm" onPress={() => set({ planWeek: addDays(wk, 7) })}>Next ›</Button></div>}>
        Publish the week’s menu by Thursday 17:00 so students can rate it and pre-order.
      </Hd>
      {!lib.length && <Empty icon="bulb"><b>No dishes yet.</b><span>Start with the six dishes from our CampusMeal overview, then edit them.</span><Button size="md" onPress={starter}>Create starter menu</Button></Empty>}
      <div style={{ overflowX: "auto" }}><div className="weekgrid">
        <div />{st.canteens.map((c) => <div key={c.k} className="h">{c.n}</div>)}
        {days.map((d) => [
          <div key={d} className="h" style={{ alignSelf: "center" }}>{fmtDay(d)}</div>,
          ...st.canteens.map((c) => {
            const ids = dishesOf(D, d).filter((id) => D.dishes[id].canteen === c.k), opts = lib.filter(([id, x]) => x.canteen === c.k && !ids.includes(id));
            return (
              <div className="cell" key={d + c.k}>
                {ids.map((id) => <span className="mchip" key={id}>{D.dishes[id].name}<Button color="tertiary" size="xs" aria-label="Remove" onPress={() => put("days", d, { dishes: dishesOf(D, d).filter((x) => x !== id) })}>×</Button></span>)}
                {opts.length > 0 && <NativeSelect size="sm" aria-label="Add dish" value="" onChange={(e) => e.target.value && put("days", d, { dishes: dishesOf(D, d).concat(e.target.value) }, "Added to the menu")}
                  options={[{ label: "+ Add dish", value: "" }, ...opts.map(([id, x]) => ({ label: x.name, value: id }))]} />}
              </div>
            );
          }),
        ])}
      </div></div>
      <div className="chips"><Button color="secondary" size="sm" onPress={copyLast}>Copy last week’s menu into this week</Button></div>
      <h2>Dish library</h2>
      <TableCard.Root size="sm"><Table aria-label="Dish library">
        <Table.Header><Table.Head id="dish" isRowHeader label="Dish" /><Table.Head id="canteen" label="Canteen" /><Table.Head id="labels" label="Labels" /><Table.Head id="base" label="Baseline walk-ins" className={NH} /><Table.Head id="act" /></Table.Header>
        <Table.Body>{lib.map(([id, x]) => (
          <Table.Row key={id} id={id}><Table.Cell><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: x.color }} /> <b>{x.name}</b></Table.Cell><Table.Cell>{canteenName(D, x.canteen)}</Table.Cell><Table.Cell><Tags d={x} /></Table.Cell><Table.Cell className="n">{x.base || 0}</Table.Cell>
            <Table.Cell><Button color="secondary" size="sm" onPress={() => { set({ editDish: id }); setTimeout(() => document.getElementById("dishform")?.scrollIntoView({ behavior: "smooth" }), 0); }}>Edit</Button></Table.Cell></Table.Row>
        ))}</Table.Body>
      </Table></TableCard.Root>
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
      <Hd title="Menu insights" right={
        <ButtonGroup size="sm" aria-label="Period" disallowEmptySelection selectedKeys={[String(S.insightDays)]} onSelectionChange={(k) => { const n = one(k); if (n != null) set({ insightDays: +String(n) }); }}>
          {[14, 28, 56].map((n) => <ButtonGroupItem key={n} id={String(n)}>{n} days</ButtonGroupItem>)}
        </ButtonGroup>}>
        Dishes are flagged when 30% or more of finish-checks say “Half” or “A little”, when interest is below 2.5, or when the forecast is off by more than 20%. Totals under {st.minFeedback} answers are hidden to protect privacy.
      </Hd>
      {!rows.length ? <Empty icon="bulb"><b>No dishes yet.</b></Empty> : <>
        <TableCard.Root size="sm"><Table aria-label="Menu insights">
          <Table.Header><Table.Head id="dish" isRowHeader label="Dish" /><Table.Head id="days" label="Days served" className={NH} /><Table.Head id="err" label="Forecast vs served" className={NH} /><Table.Head id="int" label="Interest" className={NH} /><Table.Head id="fin" label="Finish-check" /><Table.Head id="flags" label="Flags" /></Table.Header>
          <Table.Body>{rows.map((r) => { const n = r.fb.length, dist = AMOUNTS.map((a) => r.fb.filter((f) => f.amount === a).length); return (
            <Table.Row key={r.id} id={r.id}>
              <Table.Cell><b>{r.d.name}</b><div className="small muted">{canteenName(D, r.d.canteen)}</div></Table.Cell>
              <Table.Cell className="n">{r.days}</Table.Cell><Table.Cell className="n">{r.err != null ? (r.err > 0 ? "+" : "") + Math.round(r.err * 100) + "%" : "–"}</Table.Cell>
              <Table.Cell className="n">{r.rn >= st.minRatings && r.avgR != null ? <>{round1(r.avgR)} <span className="small muted">n={r.rn}</span></> : <span className="small muted">n={r.rn}</span>}</Table.Cell>
              <Table.Cell style={{ minWidth: 180 }}>{n >= st.minFeedback ? <>
                <div className="stack" style={{ height: 14 }}>{dist.map((v, i) => v ? <i key={i} style={{ width: (v / n) * 100 + "%", background: COL[i] }} title={`${AMOUNTS[i]}: ${v}`} /> : null)}</div>
                <span className="small muted">n={n} · {Math.round((r.bad / n) * 100)}% half or less</span></> : <span className="small muted">n={n} (hidden below {st.minFeedback})</span>}</Table.Cell>
              <Table.Cell><div className="chips">{r.flags.length ? r.flags.map((f) => <Badge key={f} type="color" size="sm" color="error">{f}</Badge>) : <Badge type="color" size="sm" color="success">OK</Badge>}</div></Table.Cell>
            </Table.Row>); })}</Table.Body>
        </Table></TableCard.Root>
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
        <Button color="secondary" size="sm" aria-label="Previous week" onPress={() => set({ reportWeek: addDays(wk, -7) })}>‹</Button><Week wk={wk} />
        <Button color="secondary" size="sm" aria-label="Next week" onPress={() => set({ reportWeek: addDays(wk, 7) })}>›</Button>
        <Button color="secondary" size="sm" onPress={() => downloadText(`campusmeal_week_${wk}.csv`, weekCsv(D, wk), "text/csv")}>Download CSV</Button></div>}>
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
        <TableCard.Root size="sm"><Table aria-label="Days this week">
          <Table.Header><Table.Head id="day" isRowHeader label="Day" /><Table.Head id="meals" label="Meals" className={NH} /><Table.Head id="fc" label="Forecast" className={NH} /><Table.Head id="cooked" label="Cooked" className={NH} /><Table.Head id="kg" label="Waste (kg)" className={NH} /><Table.Head id="gpm" label="g / meal" className={NH} /><Table.Head id="lc" label="Last calls" className={NH} /><Table.Head id="don" label="Donated" className={NH} /></Table.Header>
          <Table.Body>{rows.map(({ d, s }) => <Table.Row key={d} id={d}><Table.Cell>{fmtDay(d)}</Table.Cell><Table.Cell className="n">{s.meals}</Table.Cell><Table.Cell className="n">{s.fcSum}</Table.Cell><Table.Cell className="n">{s.cooked}</Table.Cell><Table.Cell className="n">{round1(s.grams / 1000)}</Table.Cell><Table.Cell className="n">{s.gpm ? Math.round(s.gpm) : "–"}</Table.Cell><Table.Cell className="n">{s.lastCalls}</Table.Cell><Table.Cell className="n">{s.donated}</Table.Cell></Table.Row>)}</Table.Body>
        </Table></TableCard.Root>
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
        <Input label="Pre-order cut-off" type="time" name="cutoff" defaultValue={st.cutoff} />
        <Input label="Service starts" type="time" name="start" defaultValue={st.serviceStart} />
        <Input label="Last call from" type="time" name="lc" defaultValue={st.lastCallAt} />
        <Input label="Service ends" type="time" name="end" defaultValue={st.serviceEnd} /></div>
        <Checkbox name="enf" defaultSelected={st.enforceCutoff} label="Enforce the cut-off (switch off only for testing)" /></div>
      <div className="card"><h3>Forecast and batches</h3><div className="form">
        <Input label="Batch size (portions)" type="number" name="batch" defaultValue={String(st.batch)} />
        <Input label="First batch (% of forecast)" type="number" name="first" defaultValue={String(st.firstPct)} />
        <Input label="Ratings needed to use interest" type="number" name="minr" defaultValue={String(st.minRatings)} /></div></div>
      <div className="card"><h3>Portions (g of rice)</h3><div className="form">
        <Input label="Small" type="number" name="ps" defaultValue={String(st.portions.S)} />
        <Input label="Regular (default)" type="number" name="pr" defaultValue={String(st.portions.R)} />
        <Input label="Large" type="number" name="pl" defaultValue={String(st.portions.L)} /></div></div>
      <div className="card"><h3>Last call and donations</h3><div className="form">
        <Input label="Minimum portions for a last call" type="number" name="minlc" defaultValue={String(st.minLastCall)} />
        <Input label="Maximum minutes since cooking" type="number" name="hold" defaultValue={String(st.maxHoldMin)} />
        <Input label="Partners (comma-separated)" name="part" defaultValue={st.partners.join(", ")} /></div></div>
      <div className="card"><h3>Measurement</h3><div className="form">
        <Input label="Baseline waste per meal (g), from the audit" type="number" name="base" defaultValue={st.baseline ? String(st.baseline) : ""} placeholder="e.g. 118" />
        <Input label="Minimum answers before showing feedback" type="number" name="minf" defaultValue={String(st.minFeedback)} /></div></div>
      <div><Button type="submit" size="md">Save settings</Button></div>
    </form>
  );
}
