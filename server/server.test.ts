import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Server } from "node:http";

let base = "", server: Server, tmp = "";
const STUDENT = "student-1234", OTHER = "student-9999", PIN = "4321";

before(async () => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "wbd-"));
  process.env.STAFF_PIN = PIN;
  process.env.DB_FILE = path.join(tmp, "db.json");
  process.env.ASSETS_DIR = path.join(tmp, "assets");
  const { createServer } = await import("./index");
  const { JsonStore } = await import("./store");
  server = createServer(new JsonStore(process.env.DB_FILE));
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const a = server.address();
  base = `http://127.0.0.1:${typeof a === "object" && a ? a.port : 0}`;
});
after(() => { server.close(); fs.rmSync(tmp, { recursive: true, force: true }); });

const call = (method: string, p: string, body?: unknown, h: Record<string, string> = {}) =>
  fetch(base + p, { method, headers: { "content-type": "application/json", ...h }, body: body === undefined ? undefined : JSON.stringify(body) });
const order = { byDate: { "2026-10-21": { o1: { dish: "d1", canteen: "LK", portion: "R", code: "LK-0001", status: "placed", t: "2026-10-21T02:00:00Z" } } } };

test("students can write only their own order; staff-only collections need the PIN", async () => {
  assert.equal((await call("PATCH", `/api/cm/orders/${STUDENT}`, order, { "x-client-id": STUDENT })).status, 200);
  assert.equal((await call("PATCH", `/api/cm/orders/${OTHER}`, order, { "x-client-id": STUDENT })).status, 403);
  const dish = { name: "Pho", canteen: "LK", tags: [], color: "#123456", base: 30 };
  assert.equal((await call("PUT", "/api/cm/dishes/d1", dish, { "x-client-id": STUDENT })).status, 403);
  assert.equal((await call("PUT", "/api/cm/dishes/d1", dish, { "x-staff-pin": PIN })).status, 200);
});

test("students see only their own orders; staff see everyone's", async () => {
  await call("PATCH", `/api/cm/orders/${OTHER}`, order, { "x-client-id": OTHER });
  const s = await (await call("GET", "/api/cm", undefined, { "x-client-id": STUDENT })).json();
  assert.deepEqual(Object.keys(s.cm.orders), [STUDENT]);
  const k = await (await call("GET", "/api/cm", undefined, { "x-staff-pin": PIN })).json();
  assert.equal(Object.keys(k.cm.orders).length, 2);
});

test("invalid documents are rejected after merging", async () => {
  const bad = { byDate: { "2026-10-21": { o1: { status: "eaten" } } } };
  assert.equal((await call("PATCH", `/api/cm/orders/${STUDENT}`, bad, { "x-client-id": STUDENT })).status, 400);
  assert.equal((await call("PUT", "/api/site/survey", { rows: [["x"]] }, { "x-staff-pin": PIN })).status, 400);
});

test("site fields need the PIN; uploads land in the uploads folder", async () => {
  assert.equal((await call("PUT", "/api/site/fields/team_name_1", { v: "Lan" })).status, 403);
  const r = await call("PUT", "/api/site/fields/team_name_1", { v: "Lan" }, { "x-staff-pin": PIN });
  assert.equal((await r.json()).fields.team_name_1, "Lan");
  const up = await fetch(base + "/api/site/media/team_1", { method: "PUT", headers: { "content-type": "image/png", "x-staff-pin": PIN }, body: new Uint8Array([137, 80, 78, 71]) });
  const file = (await up.json()).media.team_1.file as string;
  assert.equal((await fetch(base + "/assets/uploads/" + file)).status, 200);
  const bad = await fetch(base + "/api/site/media/team_1", { method: "PUT", headers: { "content-type": "text/html", "x-staff-pin": PIN }, body: "<script>" });
  assert.equal(bad.status, 415);
});

test("path traversal outside assets is blocked", async () => {
  const r = await fetch(base + "/assets/%2e%2e/package.json");
  const text = await r.text();
  assert.ok(!text.includes('"name": "wasted-by-design"'));
});
