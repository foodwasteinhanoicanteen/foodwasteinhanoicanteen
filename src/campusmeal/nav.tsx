/* Screen state for CampusMeal (which screen, chosen day, selections) and student-side helpers. */
import { createContext, useContext } from "react";
import type { CmData } from "../../shared/schemas/campusmeal";
import { Order } from "../../shared/models/Order";
import { addDays, dishesOf, monday, nowHM, settingsOf, todayStr } from "../../shared/campusmeal/logic";

export type Role = "student" | "staff";
export interface NavState {
  role: Role; view: string; date: string; orderDate: string | null; canteen: string | null;
  sel: { dish: string | null; portion: "S" | "R" | "L" }; rateWeek: string | null;
  pickQ: string; pickCanteen: string; reportWeek: string; planWeek: string; insightDays: number; editDish: string | null;
  fb: Record<string, { amount?: string; reasons?: string[] }>;
}
export const initialNav = (): NavState => ({
  role: "student", view: "today", date: todayStr(), orderDate: null, canteen: "LK", sel: { dish: null, portion: "R" }, rateWeek: null,
  pickQ: "", pickCanteen: "all", reportWeek: monday(todayStr()), planWeek: monday(todayStr()), insightDays: 28, editDish: null, fb: {},
});

interface NavCtx { S: NavState; set: (p: Partial<NavState> | ((s: NavState) => Partial<NavState>)) => void; go: (view: string) => void }
export const NavContext = createContext<NavCtx | null>(null);
export function useNav() {
  const c = useContext(NavContext);
  if (!c) throw new Error("useNav outside NavContext");
  return c;
}

/* ---------- student-side derived data ---------- */
export const myOrdersFor = (D: CmData, uid: string, date: string) => Order.listFrom(uid, D.orders[uid], date);
export const activeMine = (D: CmData, uid: string, date: string) => myOrdersFor(D, uid, date).find((o) => o.active);

export function canOrderOn(D: CmData, date: string) {
  const st = settingsOf(D), t = todayStr();
  if (date < t) return false;
  if (date === t && st.enforceCutoff && nowHM() >= st.cutoff) return false;
  return dishesOf(D, date).length > 0;
}
export function orderDates(D: CmData) {
  const out: string[] = [];
  for (let i = 0; i < 10 && out.length < 6; i++) { const d = addDays(todayStr(), i); if (dishesOf(D, d).length) out.push(d); }
  return out;
}
export function activeLastCalls(D: CmData) {
  const L = D.log[todayStr()] || {}, now = nowHM();
  return Object.entries(L.lastCalls || {}).filter(([, x]) => x && x.until > now).map(([canteen, x]) => ({ canteen, ...x }));
}
export function pendingFeedback(D: CmData, uid: string) {
  const out: Order[] = [], t = todayStr(), fb = D.feedback[uid]?.byOrder || {};
  for (const [d, day] of Object.entries(D.orders[uid]?.byDate || {})) {
    if (d < addDays(t, -7) || d > t) continue;
    for (const [oid, o] of Object.entries(day)) {
      if (fb[oid]) continue;
      if (o.status === "collected" || (o.status === "placed" && d < t)) out.push(new Order(uid, oid, d, o));
    }
  }
  return out;
}
