/* Sample data for trying CampusMeal: 6 weeks of service with a pilot starting 2 weeks ago.
   Loaded into a new browser so the CampusMeal demo is not empty; deterministic (seeded random numbers). */
import type { CmData, DayLog, FeedbackDoc, OrderDoc, RatingDoc } from "../schemas/campusmeal";
import { COLORS, DEFAULTS, REASONS, STARTER, addDays, clamp, hash, monday, round1, todayStr, wd } from "./logic";

export function demoSeed(today = todayStr()): CmData {
  let a = 20261021;
  const rnd = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const ri = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));
  const D: CmData = { settings: { main: { ...DEFAULTS, baseline: 118 } }, dishes: {}, days: {}, log: {}, orders: {}, ratings: {}, feedback: {} };
  STARTER.forEach(([id, c, n, tg, ci, base]) => (D.dishes[id] = { name: n, canteen: c, tags: tg, color: COLORS[ci], base }));
  const ids = STARTER.map((x) => x[0]), t = today, m0 = monday(t);
  for (let w = -5; w <= 1; w++) for (let i = 0; i < 5; i++) D.days[addDays(m0, 7 * w + i)] = { dishes: ids };
  const users = Array.from({ length: 60 }, (_, i) => "demo-" + i);
  const orders: Record<string, OrderDoc> = {}, ratings: Record<string, RatingDoc> = {}, feedback: Record<string, FeedbackDoc> = {};
  users.forEach((u) => { orders[u] = { byDate: {} }; ratings[u] = { byWeek: {} }; feedback[u] = { byOrder: {} }; });
  const pilotStart = addDays(m0, -14);
  for (let k = 35; k >= 0; k--) {
    const d = addDays(t, -k);
    if (wd(d) === 0 || wd(d) === 6) continue;
    const isToday = d === t, pilot = d >= pilotStart;
    const L: DayLog & { dishes: NonNullable<DayLog["dishes"]> } = { dishes: {} };
    let served = 0;
    ids.forEach((id, j) => {
      const base = STARTER[j][5];
      const pre = pilot ? ri(Math.round(base * 0.25), Math.round(base * 0.45)) : 0;
      const walk = ri(Math.round(base * 0.75), Math.round(base * 1.15));
      for (let q = 0; q < pre; q++) {
        const u = users[(k * 7 + j * 11 + q) % users.length], oid = "o" + d.replace(/-/g, "") + j + q;
        const st = isToday ? (q % 3 === 0 ? "collected" : "placed") : rnd() < 0.92 ? "collected" : "noshow";
        (orders[u].byDate[d] ||= {})[oid] = { dish: id, canteen: STARTER[j][1], portion: (["S", "R", "R", "L"] as const)[ri(0, 3)], code: STARTER[j][1] + "-" + hash(u + d + oid).slice(-4), status: st, t: d + "T02:00:00Z" };
        if (!isToday && st === "collected" && rnd() < 0.55) {
          const am = pilot ? (["All", "All", "Most", "Most", "Half", "A little"] as const)[ri(0, 5)] : (["All", "Most", "Half", "Half", "A little"] as const)[ri(0, 4)];
          feedback[u].byOrder[oid] = { date: d, dish: id, amount: am, reasons: am === "All" ? [] : [REASONS[(j === 2 || j === 4) && rnd() < 0.6 ? 1 : ri(0, 4)]], t: d + "T07:00:00Z" };
        }
      }
      const cooked = pilot ? Math.ceil(((pre + walk) * 1.05) / 10) * 10 : Math.ceil((base * 1.6) / 10) * 10;
      const batches: Record<string, number> = {};
      let left = cooked, b = 0;
      while (left > 0) { batches["b" + b] = Math.min(10, left); left -= 10; b++; }
      if (isToday) {
        const done = Math.min(b, Math.ceil(b * 0.6)), bb: Record<string, number> = {};
        for (let x = 0; x < done; x++) bb["b" + x] = 10;
        L.dishes[id] = { batches: bb, walkins: { w0: Math.round(walk * 0.4) }, lastBatchAt: new Date(Date.now() - 40 * 60000).toISOString() };
      } else { L.dishes[id] = { batches, walkins: { w0: walk }, lastBatchAt: d + "T05:00:00Z" }; served += walk + pre; }
    });
    if (!isToday) {
      const meals = served, gpm = pilot ? ri(88, 104) : ri(112, 126), tot = gpm * meals;
      L.waste = { prep: Math.round(tot * 0.38), over: Math.round(tot * (pilot ? 0.24 : 0.36)), plate: Math.round(tot * (pilot ? 0.38 : 0.26)), meals, savedAt: d + "T07:00:00Z" };
      if (rnd() < (pilot ? 0.3 : 0.6)) L.lastCalls = { LK: { dish: ids[0], qty: ri(10, 16), discount: 40, until: "13:45", sentAt: d + "T06:15:00Z", sold: { s0: ri(6, 12) } } };
      if (rnd() < 0.5) L.donations = { x0: { dish: ids[ri(0, 5)], portions: ri(4, 9), kg: round1(ri(15, 35) / 10), partner: DEFAULTS.partners[ri(0, 2)], checks: true, t: d + "T07:00:00Z" } };
    }
    D.log[d] = L;
  }
  for (const w of [m0, addDays(m0, 7)]) users.slice(0, 40).forEach((u) => {
    const r: Record<string, number> = {};
    ids.forEach((id, j) => { if (rnd() < 0.8) r[id] = clamp(Math.round([3.8, 3.2, 2.4, 3.5, 3.0, 3.3][j] + (rnd() - 0.5) * 2.4), 1, 5); });
    ratings[u].byWeek[w] = r;
  });
  Object.assign(D, { orders, ratings, feedback });
  return D;
}

/** Starter menu: the six overview dishes on this week and next week. */
export function starterSeed(today = todayStr()): CmData {
  const D: CmData = { settings: { main: { ...DEFAULTS } }, dishes: {}, days: {}, log: {}, orders: {}, ratings: {}, feedback: {} };
  STARTER.forEach(([id, c, n, tg, ci, base]) => (D.dishes[id] = { name: n, canteen: c, tags: tg, color: COLORS[ci], base }));
  const ids = STARTER.map((x) => x[0]);
  for (const w of [monday(today), addDays(monday(today), 7)]) for (let i = 0; i < 5; i++) D.days[addDays(w, i)] = { dishes: ids };
  return D;
}
