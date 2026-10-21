import { test } from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";
import { HttpError, emptySite, handle, type Db, type Req } from "./local";
import { emptyCm } from "../../shared/schemas/campusmeal";

const STUDENT = "student-1234", OTHER = "student-9999";
const db = (): Db => ({ rev: 0, site: null, cm: emptyCm() });
const req = (method: string, path: string, body?: unknown, who: Partial<Req> = {}): Req =>
  ({ method, path, body, staff: false, editingEnabled: true, uid: STUDENT, ...who });
const status = (f: () => unknown) => { try { f(); return 200; } catch (e) { return e instanceof HttpError ? e.status : e instanceof ZodError ? 400 : 500; } };
const order = { byDate: { "2026-10-21": { o1: { dish: "d1", canteen: "LK", portion: "R", code: "LK-0001", status: "placed", t: "2026-10-21T02:00:00Z" } } } };

test("students can write only their own order; staff-only collections need the PIN", () => {
  const d = db();
  assert.equal(status(() => handle(d, null, req("PATCH", `/api/cm/orders/${STUDENT}`, order))), 200);
  assert.equal(status(() => handle(d, null, req("PATCH", `/api/cm/orders/${OTHER}`, order))), 403);
  const dish = { name: "Pho", canteen: "LK", tags: [], color: "#123456", base: 30 };
  assert.equal(status(() => handle(d, null, req("PUT", "/api/cm/dishes/d1", dish))), 403);
  assert.equal(status(() => handle(d, null, req("PUT", "/api/cm/dishes/d1", dish, { staff: true }))), 200);
});

test("students see only their own orders; staff see everyone's", () => {
  const d = db();
  handle(d, null, req("PATCH", `/api/cm/orders/${STUDENT}`, order));
  handle(d, null, req("PATCH", `/api/cm/orders/${OTHER}`, order, { uid: OTHER }));
  const s = handle(d, null, req("GET", "/api/cm")).out as { cm: Db["cm"] };
  assert.deepEqual(Object.keys(s.cm.orders), [STUDENT]);
  const k = handle(d, null, req("GET", "/api/cm", undefined, { staff: true })).out as { cm: Db["cm"] };
  assert.equal(Object.keys(k.cm.orders).length, 2);
});

test("invalid documents are rejected after merging", () => {
  const d = db();
  const bad = { byDate: { "2026-10-21": { o1: { status: "eaten" } } } };
  assert.equal(status(() => handle(d, null, req("PATCH", `/api/cm/orders/${STUDENT}`, bad))), 400);
  assert.equal(status(() => handle(d, null, req("PUT", "/api/site/survey", { rows: [["x"]] }, { staff: true }))), 400);
});

test("site edits need the PIN, start from the published content and can be discarded", () => {
  const d = db(), pub = { ...emptySite(), fields: { intro: "Published" } };
  assert.equal(status(() => handle(d, pub, req("PUT", "/api/site/fields/team_name_1", { v: "Lan" }))), 403);
  const s = handle(d, pub, req("PUT", "/api/site/fields/team_name_1", { v: "Lan" }, { staff: true })).out as { fields: Record<string, string>; local: boolean };
  assert.deepEqual(s.fields, { intro: "Published", team_name_1: "Lan" });
  assert.equal(s.local, true);
  handle(d, pub, req("DELETE", "/api/site", undefined, { staff: true }));
  assert.deepEqual((handle(d, pub, req("GET", "/api/site")).out as { fields: object }).fields, { intro: "Published" });
});

test("uploads accept only photo and video data URLs", () => {
  const d = db(), up = (src: string) => status(() => handle(d, null, req("PUT", "/api/site/media/team_1", { src }, { staff: true })));
  assert.equal(up("data:image/png;base64,iVBORw0KGgo="), 200);
  assert.equal(d.site?.media.team_1.kind, "photo");
  assert.equal(up("data:text/html;base64,PHNjcmlwdD4="), 400);
  assert.equal(up("javascript:alert(1)"), 400);
});
