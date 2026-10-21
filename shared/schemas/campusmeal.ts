/* Validation for CampusMeal documents. The server checks every write against these
   after merging, so a bad request can never leave a broken document in data/db.json. */
import { z } from "zod";

const id = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const hm = z.string().regex(/^\d{2}:\d{2}$/);
const iso = z.string().max(40);
const text = (max: number) => z.string().max(max);
const n = z.number().finite();
const count = z.number().int().min(0).max(100000);
const rec = <T extends z.ZodTypeAny>(v: T) => z.record(id, v);

export const Settings = z.object({
  cutoff: hm, serviceStart: hm, serviceEnd: hm, lastCallAt: hm,
  batch: count.min(1), firstPct: n.min(10).max(100), minLastCall: count.min(1), maxHoldMin: n.min(30).max(600),
  portions: z.object({ S: n.min(0), R: n.min(0), L: n.min(0) }),
  baseline: n.min(0), enforceCutoff: z.boolean(), minRatings: count.min(1), minFeedback: count.min(3),
  partners: z.array(text(80)).max(20),
  canteens: z.array(z.object({ k: id, n: text(60) })).min(1).max(12),
}).partial();
export type Settings = z.infer<typeof Settings>;

export const Dish = z.object({
  name: text(80).min(1), canteen: id, tags: z.array(text(30)).max(10).default([]),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/), base: n.min(0).max(5000),
});
export type Dish = z.infer<typeof Dish>;

export const Day = z.object({ dishes: z.array(id).max(50) });
export type Day = z.infer<typeof Day>;

const DishLog = z.object({ batches: rec(count).optional(), walkins: rec(count).optional(), lastBatchAt: iso.optional(), left: n.optional() });
export const DayLog = z.object({
  dishes: rec(DishLog).optional(),
  overrides: rec(z.object({ value: n.min(0), reason: text(200), t: iso })).optional(),
  lastCalls: rec(z.object({ dish: id, qty: count, discount: n.min(0).max(100), until: hm, sentAt: iso, sold: rec(count) })).optional(),
  donations: rec(z.object({ dish: id, portions: count.min(1), kg: n.min(0), partner: text(80), checks: z.literal(true), t: iso })).optional(),
  incidents: rec(z.object({ text: text(300).min(1), t: iso })).optional(),
  waste: z.object({ prep: n.min(0), over: n.min(0), plate: n.min(0), meals: n.min(0).optional(), savedAt: iso }).optional(),
});
export type DayLog = z.infer<typeof DayLog>;

export const Portion = z.enum(["S", "R", "L"]);
export const OrderStatus = z.enum(["placed", "collected", "noshow", "cancelled"]);
export const OrderDoc = z.object({
  byDate: z.record(date, rec(z.object({
    dish: id, canteen: id, portion: Portion, code: text(20), status: OrderStatus, t: iso, statusAt: iso.optional(),
  }))).default({}),
});
export type OrderDoc = z.infer<typeof OrderDoc>;

export const RatingDoc = z.object({ byWeek: z.record(date, rec(z.number().int().min(1).max(5))).default({}) });
export type RatingDoc = z.infer<typeof RatingDoc>;

export const Amount = z.enum(["All", "Most", "Half", "A little"]);
export const FeedbackDoc = z.object({
  byOrder: rec(z.object({ date, dish: id, amount: Amount, reasons: z.array(text(40)).max(5), t: iso })).default({}),
});
export type FeedbackDoc = z.infer<typeof FeedbackDoc>;

/** Collection name → schema, and who may write it. */
export const COLLECTIONS = {
  settings: { schema: Settings, staffOnly: true },
  dishes: { schema: Dish, staffOnly: true },
  days: { schema: Day, staffOnly: true },
  log: { schema: DayLog, staffOnly: true },
  orders: { schema: OrderDoc, staffOnly: false },
  ratings: { schema: RatingDoc, staffOnly: false },
  feedback: { schema: FeedbackDoc, staffOnly: false },
} as const;
export type Collection = keyof typeof COLLECTIONS;
export const isCollection = (c: string): c is Collection => Object.prototype.hasOwnProperty.call(COLLECTIONS, c);

export interface CmData {
  settings: Record<string, Settings>;
  dishes: Record<string, Dish>;
  days: Record<string, Day>;
  log: Record<string, DayLog>;
  orders: Record<string, OrderDoc>;
  ratings: Record<string, RatingDoc>;
  feedback: Record<string, FeedbackDoc>;
}
export const emptyCm = (): CmData => ({ settings: {}, dishes: {}, days: {}, log: {}, orders: {}, ratings: {}, feedback: {} });
