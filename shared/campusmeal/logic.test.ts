import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyCm } from "../schemas/campusmeal";
import { addDays, dayStats, forecast, monday, quickForecast } from "./logic";
import { demoSeed } from "./demo";

const DATE = "2026-10-21"; // a Wednesday

test("forecast = pre-orders + walk-in history × interest factor, first batch rounded up", () => {
  const D = emptyCm();
  D.dishes.d1 = { name: "Pho", canteen: "LK", tags: [], color: "#123456", base: 30 };
  D.days[DATE] = { dishes: ["d1"] };
  // 4 previous Wednesdays with 40 walk-ins each
  for (let k = 1; k <= 4; k++) D.log[addDays(DATE, -7 * k)] = { dishes: { d1: { walkins: { a: 40 } } } };
  // 5 pre-orders, one cancelled
  D.orders.u1 = { byDate: { [DATE]: Object.fromEntries([0, 1, 2, 3, 4].map((i) => ["o" + i, { dish: "d1", canteen: "LK", portion: "R" as const, code: "LK-" + i, status: i === 4 ? ("cancelled" as const) : ("placed" as const), t: "x" }])) } };
  // interest 3.9 from 3 ratings → factor 1.3
  for (const u of ["a", "b", "c"]) D.ratings[u] = { byWeek: { [monday(DATE)]: { d1: u === "a" ? 5 : 4 } } };
  const f = forecast(D, DATE, "d1");
  assert.equal(f.pre, 4);
  assert.equal(f.walkAvg, 40);
  assert.equal(f.factor, 1.3); // 4.33 / 3 clamped to 1.3
  assert.equal(f.walk, 52);
  assert.equal(f.fc, 56);
  assert.equal(f.first, 50); // 80% of 56 = 44.8 → 5 batches of 10
});

test("interest factor is ignored below the minimum number of ratings, override wins", () => {
  const D = emptyCm();
  D.dishes.d1 = { name: "Pho", canteen: "LK", tags: [], color: "#123456", base: 25 };
  D.ratings.a = { byWeek: { [monday(DATE)]: { d1: 1 } } };
  assert.equal(forecast(D, DATE, "d1").factor, 1);
  assert.equal(forecast(D, DATE, "d1").fc, 25);
  D.log[DATE] = { overrides: { d1: { value: 70, reason: "exam week", t: "x" } } };
  assert.equal(forecast(D, DATE, "d1").fc, 70);
});

test("website calculator keeps the factor between 0.7 and 1.3", () => {
  assert.deepEqual(quickForecast(40, 60, 3.6, 10), { f: 1.2, w: 72, fcst: 112, first: 90 });
  assert.equal(quickForecast(0, 100, 0.3, 10).f, 0.7);
});

test("demo data produces a waste-per-meal figure for past days", () => {
  const D = demoSeed(DATE);
  const s = dayStats(D, addDays(DATE, -1));
  assert.ok(s && s.gpm && s.gpm > 80 && s.gpm < 130);
});
