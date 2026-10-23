/* Student screens: Today, Pre-order, Rate menu, Last call, Finish-check, My impact. */
import { Button as AriaButton, ToggleButton } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { useCm } from "../store";
import { activeLastCalls, activeMine, canOrderOn, orderDates, pendingFeedback, useNav } from "../nav";
import { Empty, Hd, I, Kpi, StatusBadge, Tags, Thumb } from "../ui";
import type { Order } from "../../../shared/models/Order";
import {
  AMOUNTS, PORT, REASONS, addDays, canteenName, dayStats, dishesOf, fmtDay, fmtT, hash, monday, noShows, settingsOf, todayStr,
} from "../../../shared/campusmeal/logic";

const iso = () => new Date().toISOString();
const DISH = "dish rounded-xl bg-primary ring-1 ring-secondary ring-inset hover:bg-primary_hover selected:ring-2 selected:ring-brand cursor-pointer outline-brand focus-visible:outline-2";
/** First key of a single-selection change. */
const first = (k: Iterable<unknown>) => [...k][0];

function Ticket({ date, o }: { date: string; o: Order }) {
  const { D, uid, patch } = useCm(), d = D.dishes[o.dish], st = settingsOf(D);
  return (
    <div className="ticket">
      <span className="small" style={{ fontWeight: 700 }}>YOUR ORDER · {fmtDay(date)}</span>
      <span className="code">{o.code}</span>
      <span><b>{d?.name || ""}</b> · {PORT[o.portion]} ({st.portions[o.portion]} g rice) · {canteenName(D, o.canteen)}</span>
      <span className="small">Show this code at the counter between {st.serviceStart} and 12:30. Free refill of rice and vegetables. <StatusBadge status={o.status} /></span>
      {o.status === "placed" && canOrderOn(D, date) && (
        <div><Button size="sm" color="secondary" onPress={() => patch("orders", uid, { byDate: { [date]: { [o.oid]: { status: "cancelled", statusAt: iso() } } } }, "Order cancelled")}>Cancel order</Button></div>
      )}
    </div>
  );
}

export function Today() {
  const { D, uid } = useCm(), { set, go } = useNav();
  const st = settingsOf(D), t = todayStr(), ids = dishesOf(D, t), mine = activeMine(D, uid, t), lcs = activeLastCalls(D), pf = pendingFeedback(D, uid);
  return (
    <>
      <Hd title={`Today · ${fmtDay(t)}`} right={<Button size="md" iconLeading={<I n="cart" />} onPress={() => go("order")}>Pre-order</Button>}>
        {ids.length ? <>Pre-order before <b>{st.cutoff}</b> so the kitchen cooks the right amount. Walk-ins are always welcome.</> : "No menu has been published for today yet."}
      </Hd>
      {lcs.map((x) => (
        <div className="lc" key={x.canteen}>
          <span className="small" style={{ fontWeight: 700, color: "var(--amber)" }}>LAST CALL · {canteenName(D, x.canteen)}</span>
          <span className="big">{D.dishes[x.dish]?.name || "Surplus meal"} · {x.discount}% off</span>
          <span>{x.qty} portions left · collect before {x.until}. Kept hot, cooked within {st.maxHoldMin / 60} hours.</span>
        </div>
      ))}
      {mine && <Ticket date={t} o={mine} />}
      {pf.length > 0 && <div className="note a">You have {pf.length} meal{pf.length > 1 ? "s" : ""} to give quick feedback on. <Button size="sm" color="secondary" onPress={() => go("finish")}>Finish-check</Button></div>}
      {!ids.length ? <Empty icon="cal"><b>No meals published for today.</b><span>Check the order screen for upcoming days.</span></Empty>
        : st.canteens.map((c) => {
          const list = ids.filter((id) => D.dishes[id].canteen === c.k);
          if (!list.length) return null;
          return (
            <section className="grid" style={{ gap: 8 }} key={c.k}>
              <h3>{c.n}</h3>
              <div className="grid g2">{list.map((id) => { const d = D.dishes[id]; return (
                <AriaButton key={id} className={DISH} onPress={() => { set({ orderDate: t, sel: { dish: id, portion: "R" }, canteen: d.canteen }); go("order"); }}>
                  <Thumb d={d} /><div><b>{d.name}</b><div><Tags d={d} /></div><span className="small muted">{canOrderOn(D, t) ? "Tap to pre-order" : "Pre-order closed · walk-in only"}</span></div>
                </AriaButton>); })}</div>
            </section>
          );
        })}
    </>
  );
}

export function PreOrder() {
  const { D, uid, patch } = useCm(), { S, set } = useNav();
  const st = settingsOf(D), dates = orderDates(D);
  const date = S.orderDate && dates.includes(S.orderDate) ? S.orderDate : dates.find((d) => canOrderOn(D, d)) || dates[0] || todayStr();
  const head = <Hd title="Pre-order">Choose a day, a dish and your portion. Pre-orders close at {st.cutoff} on the day.</Hd>;
  if (!dates.length) return <>{head}<Empty icon="cal"><b>No menus published yet.</b></Empty></>;
  const chips = (
    <ButtonGroup size="sm" className="flex-wrap" aria-label="Day" disallowEmptySelection selectedKeys={[date]} onSelectionChange={(k) => { const d = first(k); if (d) set({ orderDate: String(d), sel: { ...S.sel, dish: null } }); }}>
      {dates.map((d) => <ButtonGroupItem key={d} id={d}>{fmtDay(d)}{d === todayStr() ? " · today" : ""}</ButtonGroupItem>)}
    </ButtonGroup>
  );
  const mine = activeMine(D, uid, date);
  if (mine) return <>{head}{chips}<Ticket date={date} o={mine} /><p className="small muted">One pre-order per day. Cancel it to choose something else.</p></>;
  if (!canOrderOn(D, date)) return <>{head}{chips}<div className="note">Pre-ordering for this day is closed. You can still buy at the counter.</div></>;
  if (noShows(D, uid) >= 3) return <>{head}{chips}<div className="note w">Pre-ordering is paused for 7 days after 3 uncollected orders in 2 weeks. You can still eat at the canteen as a walk-in.</div></>;

  const ids = dishesOf(D, date), cans = st.canteens.filter((c) => ids.some((id) => D.dishes[id].canteen === c.k));
  const canteen = cans.find((c) => c.k === S.canteen) ? S.canteen : cans[0]?.k;
  const list = ids.filter((id) => D.dishes[id].canteen === canteen);
  const dish = S.sel.dish && list.includes(S.sel.dish) ? D.dishes[S.sel.dish] : null;

  const place = async () => {
    const d = S.sel.dish;
    if (!d || !canOrderOn(D, date) || activeMine(D, uid, date)) return;
    const ds = D.dishes[d], oid = "o" + Date.now().toString(36);
    const code = ds.canteen + "-" + hash(uid + date + oid).slice(-4).padStart(4, "0");
    await patch("orders", uid, { byDate: { [date]: { [oid]: { dish: d, canteen: ds.canteen, portion: S.sel.portion, code, status: "placed", t: iso() } } } }, "Pre-order placed: " + code);
    set({ sel: { ...S.sel, dish: null } });
  };

  return (
    <>
      {head}{chips}
      <ButtonGroup size="sm" className="flex-wrap" aria-label="Canteen" disallowEmptySelection selectedKeys={canteen ? [canteen] : []} onSelectionChange={(k) => { const c = first(k); if (c) set({ canteen: String(c), sel: { ...S.sel, dish: null } }); }}>
        {cans.map((c) => <ButtonGroupItem key={c.k} id={c.k}>{c.n}</ButtonGroupItem>)}
      </ButtonGroup>
      <div className="grid g2">{list.map((id) => { const d = D.dishes[id]; return (
        <ToggleButton key={id} className={DISH} isSelected={S.sel.dish === id} onChange={() => set({ sel: { ...S.sel, dish: id } })}><Thumb d={d} /><div><b>{d.name}</b><div><Tags d={d} /></div></div></ToggleButton>); })}</div>
      {dish && (
        <div className="card">
          <h3>Choose your portion</h3>
          <ButtonGroup size="md" className="w-full" aria-label="Portion" disallowEmptySelection selectedKeys={[S.sel.portion]} onSelectionChange={(k) => { const p = first(k) as "S" | "R" | "L" | undefined; if (p) set({ sel: { ...S.sel, portion: p } }); }}>
            {(["S", "R", "L"] as const).map((p) => <ButtonGroupItem key={p} id={p} className="flex-1 flex-col gap-0"><b>{PORT[p]}</b><span className="small muted">{st.portions[p]} g rice</span></ButtonGroupItem>)}
          </ButtonGroup>
          <div className="note g">Free refill of rice and vegetables at the counter, so a smaller portion is never “less food”. Take what you can finish, come back if you are still hungry.</div>
          <Button size="md" iconLeading={<I n="check" />} onPress={place}>Pre-order {PORT[S.sel.portion]} {dish.name}</Button>
        </div>
      )}
    </>
  );
}

export function RateMenu() {
  const { D, uid, patch } = useCm(), { S, set } = useNav();
  const wks = [monday(todayStr()), addDays(monday(todayStr()), 7)];
  const nextHasMenu = [0, 1, 2, 3, 4].some((i) => dishesOf(D, addDays(wks[1], i)).length);
  const wk = S.rateWeek || (nextHasMenu ? wks[1] : wks[0]);
  const mine = D.ratings[uid]?.byWeek?.[wk] || {};
  const seen = new Set<string>(), rows: string[] = [];
  for (let i = 0; i < 7; i++) for (const id of dishesOf(D, addDays(wk, i))) if (!seen.has(id)) { seen.add(id); rows.push(id); }
  return (
    <>
      <Hd title="Rate the menu">How interested are you in each dish, from 1 (not really) to 5 (very)? Ratings are anonymous. They adjust the kitchen’s forecast and flag unpopular dishes before they are cooked.</Hd>
      <ButtonGroup size="sm" className="flex-wrap" aria-label="Week" disallowEmptySelection selectedKeys={[wk]} onSelectionChange={(k) => { const w = first(k); if (w) set({ rateWeek: String(w) }); }}>
        {wks.map((w, i) => <ButtonGroupItem key={w} id={w}>{i ? "Next week" : "This week"} · from {fmtDay(w)}</ButtonGroupItem>)}
      </ButtonGroup>
      {rows.length ? (
        <div className="grid g2">{rows.map((id) => { const x = D.dishes[id]; return (
          <div className="card" key={id} style={{ gridTemplateColumns: "auto 1fr", alignItems: "center" }}>
            <Thumb d={x} size={48} />
            <div style={{ display: "grid", gap: 6 }}>
              <div><b>{x.name}</b> <span className="small muted">· {canteenName(D, x.canteen)}</span></div>
              <ButtonGroup size="sm" aria-label={`Interest in ${x.name}`} disallowEmptySelection selectedKeys={mine[id] ? [mine[id]] : []} onSelectionChange={(k) => { const v = first(k); if (v) patch("ratings", uid, { byWeek: { [wk]: { [id]: Number(v) } } }); }}>
                {[1, 2, 3, 4, 5].map((v) => <ButtonGroupItem key={v} id={v} aria-label={`${x.name}: ${v} of 5`}>{v}</ButtonGroupItem>)}
              </ButtonGroup>
            </div>
          </div>); })}</div>
      ) : <Empty icon="cal"><b>No menu published for this week yet.</b></Empty>}
    </>
  );
}

export function LastCall() {
  const { D } = useCm(), lcs = activeLastCalls(D);
  return (
    <>
      <Hd title="Last call">When safe food is left near closing time, the canteen offers it at a discount instead of throwing it away. Last calls only happen when there is genuine surplus, so they cannot be planned in advance.</Hd>
      {!lcs.length ? <Empty icon="tag"><b>No last call right now.</b><span>Good news: it usually means the kitchen cooked the right amount.</span></Empty>
        : lcs.map((x) => { const d = D.dishes[x.dish]; return (
          <div className="lc" key={x.canteen}>
            <span className="small" style={{ fontWeight: 700, color: "var(--amber)" }}>{canteenName(D, x.canteen)} · sent {fmtT(x.sentAt)}</span>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}><Thumb d={d} size={56} /><div><span className="big">{x.discount}% off</span><div><b>{d?.name || ""}</b></div></div></div>
            <span>{x.qty} portions · collect at the counter before <b>{x.until}</b>.</span>
          </div>); })}
    </>
  );
}

export function FinishCheck() {
  const { D, uid, patch } = useCm(), { S, set } = useNav(), pf = pendingFeedback(D, uid);
  const draft = (k: string, p: { amount?: string; reasons?: string[] }) => set((s) => ({ fb: { ...s.fb, [k]: { ...s.fb[k], ...p } } }));
  return (
    <>
      <Hd title="Finish-check">One tap: how much did you finish? Answers are pooled, and the kitchen only sees totals of at least {settingsOf(D).minFeedback} people, never who said what.</Hd>
      {!pf.length ? <Empty icon="check"><b>Nothing to answer.</b><span>After you collect a pre-order, it appears here.</span></Empty>
        : pf.map((o) => {
          const d = D.dishes[o.dish], k = o.oid, a = S.fb[k] || {};
          const send = async () => {
            if (!a.amount) return;
            const ok = await patch("feedback", uid, { byOrder: { [k]: { date: o.date, dish: o.dish, amount: a.amount, reasons: a.amount === "All" ? [] : a.reasons || [], t: iso() } } }, "Thanks for your feedback");
            if (ok) set((s) => { const fb = { ...s.fb }; delete fb[k]; return { fb }; });
          };
          return (
            <div className="card" key={k}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><Thumb d={d} size={48} /><div><b>{d?.name || ""}</b><div className="small muted">{fmtDay(o.date)} · {PORT[o.portion]}</div></div></div>
              <ButtonGroup size="sm" className="flex-wrap" aria-label="How much did you finish?" disallowEmptySelection selectedKeys={a.amount ? [a.amount] : []} onSelectionChange={(s) => { const x = first(s); if (x) draft(k, { amount: String(x) }); }}>
                {AMOUNTS.map((x) => <ButtonGroupItem key={x} id={x}>{x}</ButtonGroupItem>)}
              </ButtonGroup>
              {a.amount && a.amount !== "All" && <>
                <span className="small muted">Why not? (optional)</span>
                <ButtonGroup size="sm" className="flex-wrap" aria-label="Why not?" selectionMode="multiple" selectedKeys={a.reasons || []} onSelectionChange={(s) => draft(k, { reasons: REASONS.filter((x) => s.has(x)) })}>
                  {REASONS.map((x) => <ButtonGroupItem key={x} id={x}>{x}</ButtonGroupItem>)}
                </ButtonGroup>
              </>}
              <div><Button size="sm" isDisabled={!a.amount} onPress={send}>Send</Button></div>
            </div>
          );
        })}
    </>
  );
}

export function Impact() {
  const { D, uid } = useCm(), st = settingsOf(D);
  const mo = D.orders[uid]?.byDate || {}, fb = D.feedback[uid]?.byOrder || {};
  let n = 0, col = 0;
  const por = { S: 0, R: 0, L: 0 };
  for (const day of Object.values(mo)) for (const o of Object.values(day)) { if (o.status === "cancelled") continue; n++; if (o.status === "collected") col++; por[o.portion]++; }
  const fin = Object.values(fb), all = fin.filter((f) => f.amount === "All" || f.amount === "Most").length;
  const wk = monday(todayStr());
  let g = 0, m = 0, donated = 0;
  for (let i = 0; i < 7; i++) { const s = dayStats(D, addDays(wk, i)); if (s?.gpm) { g += s.grams; m += s.meals; } if (s) donated += s.donated; }
  const gpm = m ? g / m : null, red = gpm && st.baseline ? ((st.baseline - gpm) / st.baseline) * 100 : null;
  const top = (Object.entries(por) as ["S" | "R" | "L", number][]).sort((a, b) => b[1] - a[1])[0];
  return (
    <>
      <Hd title="My impact">Only you can see this page. There are no leaderboards.</Hd>
      <div className="grid g4">
        <Kpi v={n} l="pre-orders placed" /><Kpi tone="good" v={col} l="collected" />
        <Kpi v={n ? PORT[top[0]] : "–"} l="portion you choose most" />
        <Kpi tone="good" v={fin.length ? Math.round((all / fin.length) * 100) + "%" : "–"} l="meals finished (all or most)" />
      </div>
      <h2>Campus this week</h2>
      <div className="grid g3">
        <Kpi tone={red != null && red > 0 ? "good" : ""} v={gpm ? Math.round(gpm) + " g" : "–"} l="food wasted per meal" />
        <Kpi tone={red != null && red > 0 ? "good" : "bad"} v={red != null ? (red > 0 ? "−" : "+") + Math.abs(Math.round(red)) + "%" : "–"} l={<>compared with the baseline{st.baseline ? ` (${st.baseline} g)` : " (not set yet)"}</>} />
        <Kpi v={donated} l="meals shared with partner charities" />
      </div>
      <p className="small muted">Every pre-order, portion choice and finish-check helps the kitchen cook closer to what people eat.</p>
    </>
  );
}
