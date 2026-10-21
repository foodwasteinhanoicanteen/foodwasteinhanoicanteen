import { test } from "node:test";
import assert from "node:assert/strict";
import { anova1, chisqGOF, qtukey } from "./stats";
import { EXAMPLE, analyse, normRow, parseText, SURVEY_COLUMNS } from "./survey";
import { conclusion, svValues } from "./surveyReport";
import { SurveyResponse } from "./models/SurveyResponse";

const close = (a: number, b: number, rel = 1e-3) => assert.ok(Math.abs(a - b) <= Math.abs(b) * rel, `${a} ≉ ${b}`);

test("one-way ANOVA and Tukey match scipy on the 50 example responses", () => {
  const R = analyse(EXAMPLE, "eff");
  close(R.an.F, 11.4227);
  close(R.an.p, 2.4483e-5);
  assert.deepEqual(R.m.map((x) => +x.toFixed(2)), [3.5, 4.26, 3.42]);
  close(R.pair["A-B"].p, 3.9946e-4);
  close(R.pair["A-C"].p, 0.91058);
  close(R.pair["B-C"].p, 8.1092e-5);
  close(qtukey(0.95, 3, 147), 3.3484);
});

test("textbook ANOVA and chi-square", () => {
  const a = anova1([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  close(a.F, 27); // MSB 27 / MSW 1
  close(chisqGOF([10, 10, 10]).p, 1);
});

test("survey import: header skipped, bad rows reported, timestamp column accepted", () => {
  const header = SURVEY_COLUMNS.map((c) => c[0]).join("\t");
  const good = ["2026-10-01 10:00", ...EXAMPLE[0]].join("\t");
  const bad = EXAMPLE[1].map((v, i) => (i === 6 ? 9 : v)).join("\t");
  const r = parseText([header, good, bad].join("\n"));
  assert.equal(r.rows.length, 1);
  assert.equal(r.errs.length, 1);
  assert.match(r.errs[0], /expected 1–5/);
  assert.ok(normRow(["x"]).err);
});

test("SurveyResponse round-trips a row", () => {
  const s = SurveyResponse.fromRow(EXAMPLE[2]);
  assert.equal(s.ratings.B.effective, 3);
  assert.deepEqual(s.toRow(), EXAMPLE[2]);
});

test("conclusion says B beats A and C on the example data", () => {
  const c = conclusion(EXAMPLE, true);
  assert.match(c.en, /rated more effective than Solution A/);
  assert.match(c.vi, /VÍ DỤ/);
  assert.equal(svValues(EXAMPLE, true).tk, "B > A, C");
});
