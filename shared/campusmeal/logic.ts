/* CampusMeal rules from the operating protocol: forecast, batches, daily stats, insights.
   Pure functions over a CmData snapshot so they can be tested and shared by server and browser. */
import type { CmData, DayLog, Settings } from "../schemas/campusmeal";
import { Order } from "../models/Order";

/* ---------- dates (Hanoi time) ---------- */
export const TZ = "Asia/Ho_Chi_Minh";
export const todayStr = () => new Date().toLocaleDateString("en-CA", { timeZone: TZ });
export const nowHM = () => new Date().toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false });
export const addDays = (ds: string, n: number) => { const d = new Date(ds + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export const wd = (ds: string) => new Date(ds + "T00:00:00Z").getUTCDay();
export const monday = (ds: string) => addDays(ds, -((wd(ds) + 6) % 7));
export const fmtDay = (ds: string) => new Date(ds + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
export const fmtT = (iso?: string | null) => (iso ? new Date(iso).toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }) : "");
export const minsAgo = (iso?: string | null) => (iso ? (Date.now() - new Date(iso).getTime()) / 60000 : Infinity);
export const eid = () => "e" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const hash = (s: string) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36).toUpperCase(); };
export const sum = (o?: Record<string, number> | null) => Object.values(o || {}).reduce((a, b) => a + (+b || 0), 0);
export const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
export const round1 = (x: number) => Math.round(x * 10) / 10;

/* ---------- defaults ---------- */
export type FullSettings = Required<Settings>;
export const DEFAULTS: FullSettings = {
  cutoff: "10:00", serviceStart: "11:00", serviceEnd: "13:45", lastCallAt: "13:15", batch: 10, firstPct: 80, minLastCall: 10, maxHoldMin: 120,
  portions: { S: 100, R: 150, L: 200 }, baseline: 0, enforceCutoff: true, minRatings: 3, minFeedback: 5,
  partners: ["Hanoi Food Rescue", "VietHarvest", "Food Bank Vietnam"],
  canteens: [{ k: "LK", n: "Little Kitchen" }, { k: "FD", n: "Foodology" }, { k: "OH", n: "Our Home" }],
};
export const COLORS = ["#D99A2B", "#D06A3F", "#5E9E58", "#3F8FA6", "#7C6BC4", "#2F7D6B", "#B8566E", "#6E8B3D"];
/** [id, canteen, name, tags, colour index, baseline walk-ins] from the CampusMeal overview. */
export const STARTER: [string, string, string, string[], number, number][] = [
  ["d-lk-teriyaki", "LK", "Teriyaki chicken", ["Rice"], 0, 40], ["d-lk-sweetsour", "LK", "Sweet & sour chicken with fried rice", ["Rice"], 1, 35],
  ["d-fd-salad", "FD", "Chicken salad", ["Light"], 2, 25], ["d-fd-noodle", "FD", "Fish noodle soup", ["Noodles"], 3, 30],
  ["d-oh-vfood", "OH", "V-food: dish of the day", ["Vegetarian"], 4, 20], ["d-oh-vhalal", "OH", "V-Halal: dish of the day", ["Halal"], 5, 20],
];
export const PORT = { S: "Small", R: "Regular", L: "Large" } as const;
export const AMOUNTS = ["All", "Most", "Half", "A little"] as const;
export const REASONS = ["Portion too large", "Didn’t like the taste", "Too cold", "Too salty", "Not hungry"];

export const settingsOf = (D: CmData): FullSettings => {
  const s = D.settings.main || {};
  return { ...DEFAULTS, ...s, portions: { ...DEFAULTS.portions, ...(s.portions || {}) } };
};

/* ---------- derived data ---------- */
export const dishesOf = (D: CmData, date: string) => (D.days[date]?.dishes || []).filter((id) => D.dishes[id]);
export const canteenName = (D: CmData, k: string) => (settingsOf(D).canteens.find((c) => c.k === k) || { n: k }).n;
export const ordersFor = (D: CmData, date: string) => Object.entries(D.orders).flatMap(([uid, doc]) => Order.listFrom(uid, doc, date));

export function walkinHistory(D: CmData, date: string, dishId: string): number[] {
  const w = wd(date), vals: number[] = [];
  for (let k = 1; k <= 12 && vals.length < 4; k++) {
    const d = addDays(date, -7 * k), L = D.log[d];
    if (L?.dishes?.[dishId] && wd(d) === w) vals.push(sum(L.dishes[dishId].walkins));
  }
  return vals;
}

export function interest(D: CmData, date: string, dishId: string) {
  const wk = monday(date), v: number[] = [];
  for (const doc of Object.values(D.ratings)) { const r = doc?.byWeek?.[wk]?.[dishId]; if (r) v.push(r); }
  return { n: v.length, avg: v.length ? v.reduce((a, b) => a + b, 0) / v.length : null };
}

/** Forecast = pre-orders + walk-in average (last 4 same weekdays, else the dish baseline) × interest factor. */
export function forecast(D: CmData, date: string, dishId: string) {
  const st = settingsOf(D), os = ordersFor(D, date).filter((o) => o.dish === dishId && o.status !== "cancelled");
  const pre = os.length, byP = { S: 0, R: 0, L: 0 };
  os.forEach((o) => (byP[o.portion] += 1));
  const hist = walkinHistory(D, date, dishId), d = D.dishes[dishId];
  const walkAvg = hist.length ? hist.reduce((a, b) => a + b, 0) / hist.length : +(d?.base ?? 30) || 30;
  const it = interest(D, date, dishId);
  const factor = it.n >= st.minRatings && it.avg != null ? clamp(it.avg / 3, 0.7, 1.3) : 1;
  const walk = Math.round(walkAvg * factor);
  let fc = pre + walk;
  const L: DayLog = D.log[date] || {}, ov = L.overrides?.[dishId];
  if (ov && +ov.value > 0) fc = +ov.value;
  const first = Math.ceil((fc * st.firstPct) / 100 / st.batch) * st.batch;
  const DL = L.dishes?.[dishId] || {};
  const cooked = sum(DL.batches), walkins = sum(DL.walkins);
  const collected = os.filter((o) => o.status === "collected").length, placed = os.filter((o) => o.status === "placed").length;
  const lcSold = Object.values(L.lastCalls || {}).filter((x) => x.dish === dishId).reduce((a, x) => a + sum(x.sold), 0);
  const served = collected + walkins + lcSold, avail = cooked - served - placed;
  return { pre, byP, hist, walkAvg, it, factor, walk, fc, first, ov: ov && +ov.value > 0 ? ov : undefined, cooked, walkins, collected, placed, lcSold, served, avail, lastBatch: DL.lastBatchAt || null };
}
export type Forecast = ReturnType<typeof forecast>;

export function dayStats(D: CmData, date: string) {
  const L = D.log[date];
  if (!L) return null;
  let served = 0, fcSum = 0, cooked = 0, pre = 0;
  dishesOf(D, date).forEach((id) => { const f = forecast(D, date, id); served += f.served; fcSum += f.fc; cooked += f.cooked; pre += f.collected; });
  const w = L.waste || ({} as NonNullable<DayLog["waste"]>);
  const grams = (+w.prep || 0) + (+w.over || 0) + (+w.plate || 0), meals = +(w.meals ?? 0) || served;
  return {
    served, meals, fcSum, cooked, pre, grams, gpm: meals && grams ? grams / meals : null, w,
    lastCalls: Object.keys(L.lastCalls || {}).length,
    donated: Object.values(L.donations || {}).reduce((a, d) => a + (+d.portions || 0), 0),
    donatedKg: Object.values(L.donations || {}).reduce((a, d) => a + (+d.kg || 0), 0),
    incidents: Object.keys(L.incidents || {}).length,
    err: served ? Math.abs(fcSum - served) / served : null,
  };
}
export type DayStats = NonNullable<ReturnType<typeof dayStats>>;

export function feedbackFor(D: CmData, dishId: string, since?: string) {
  return Object.values(D.feedback).flatMap((doc) => Object.values(doc?.byOrder || {})).filter((f) => f.dish === dishId && (!since || f.date >= since));
}

/** No-shows by one student in the last 14 days (3 or more pauses pre-ordering). */
export function noShows(D: CmData, uid: string) {
  const since = addDays(todayStr(), -14);
  let n = 0;
  for (const [d, day] of Object.entries(D.orders[uid]?.byDate || {})) if (d >= since) for (const o of Object.values(day)) if (o.status === "noshow") n++;
  return n;
}

/** First batch = firstPct% of the forecast, rounded up to whole batches. */
export const firstBatch = (fc: number, firstPct: number, batch: number) => Math.ceil((fc * firstPct) / 100 / batch) * batch;

/** Website calculator: same rule with fixed defaults (80% first batch). */
export function quickForecast(pre: number, walk: number, rating: number, batch: number) {
  const f = Math.min(1.3, Math.max(0.7, rating / 3)), w = Math.round(walk * f), fcst = pre + w;
  return { f, w, fcst, first: firstBatch(fcst, 80, batch) };
}

/** Rows for the weekly report: days with saved waste, or past days with any log. */
export function weekRows(D: CmData, wk: string) {
  const t = todayStr();
  return [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(wk, i)).map((d) => ({ d, s: dayStats(D, d) }))
    .filter((x): x is { d: string; s: DayStats } => !!x.s && (!!x.s.w.savedAt || x.d < t));
}

export function weekCsv(D: CmData, wk: string) {
  return "﻿date,meals,forecast,cooked,waste_g,g_per_meal,prep_g,overproduction_g,plate_g,last_calls,donated_portions,donated_kg,incidents\n" +
    weekRows(D, wk).map(({ d, s }) => [d, s.meals, s.fcSum, s.cooked, s.grams, s.gpm ? Math.round(s.gpm) : "", s.w.prep || 0, s.w.over || 0, s.w.plate || 0, s.lastCalls, s.donated, s.donatedKg, s.incidents].join(",")).join("\n");
}
