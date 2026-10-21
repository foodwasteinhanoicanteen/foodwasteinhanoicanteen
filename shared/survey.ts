/* Survey definition, CSV/TSV import, and the analysis used on the Survey page.
   Shared by the browser (charts) and the server (validates rows before saving). */
import { anova1, chisqGOF, friedman, mean, rmAnova, sd, tTwo, tukey } from "./stats";
import { EXAMPLE_ROWS } from "./data/exampleSurvey";

export type ColType = "gender" | "age" | "occ" | "freq" | "heard" | "lik" | "prio" | "one";
export type Letter = "A" | "B" | "C";
export type Priority = Letter | "None";
/** One validated response: 23 cells in SURVEY_COLUMNS order (Likert cells are 1–5 numbers). */
export type SurveyRow = (string | number)[];

export const OPTIONS: Record<Exclude<ColType, "lik">, string[]> = {
  gender: ["Male", "Female", "Other"],
  age: ["Under 18", "18–24", "25–34", "35–44", "45 or above"],
  occ: ["Student", "Office employee", "Business owner / Freelancer", "Homemaker", "Other"],
  freq: ["0 times", "1–2 times", "3–4 times", "5–7 times", "More than 7 times"],
  heard: ["I had never heard of it", "I had heard of it but did not understand it clearly", "I understood it very well"],
  prio: ["A", "B", "C", "None"],
  one: ["A", "B", "C"],
};

/** [csv key, question, type] */
export const SURVEY_COLUMNS: [string, string, ColType][] = [
  ["gender", "What is your gender?", "gender"], ["age", "What is your age?", "age"], ["occupation", "What is your current occupation?", "occ"],
  ["eat_out_per_week", "Times per week eating out", "freq"], ["waste_freq", "Left edible food, past 7 days (1–5)", "lik"], ["heard_food_waste", "Heard of “food waste”?", "heard"],
  ["A_effective", "A · effective", "lik"], ["A_feasible", "A · feasible", "lik"], ["A_ethical", "A · ethical", "lik"], ["A_support", "A · support", "lik"], ["A_would_buy_discount", "A · would buy discounted meal", "lik"],
  ["B_effective", "B · effective", "lik"], ["B_feasible", "B · feasible", "lik"], ["B_ethical", "B · ethical", "lik"], ["B_support", "B · support", "lik"], ["B_choose_portion", "B · would choose matching portion", "lik"],
  ["C_effective", "C · effective", "lik"], ["C_feasible", "C · feasible", "lik"], ["C_ethical", "C · ethical (conditional wording)", "lik"], ["C_support", "C · support", "lik"], ["C_comfortable", "C · comfortable with redistribution", "lik"],
  ["priority", "Which solution should be prioritised?", "prio"], ["one_solution", "Only one solution: which?", "one"],
];

export type CritKey = "eff" | "feas" | "eth" | "sup" | "all";
export const CRITERIA: { k: CritKey; n: string; vi: string; idx: number[] | null }[] = [
  { k: "eff", n: "Effectiveness", vi: "hiệu quả", idx: [6, 11, 16] },
  { k: "feas", n: "Feasibility", vi: "khả thi", idx: [7, 12, 17] },
  { k: "eth", n: "Ethical", vi: "phù hợp đạo đức", idx: [8, 13, 18] },
  { k: "sup", n: "Support", vi: "ủng hộ", idx: [9, 14, 19] },
  { k: "all", n: "Overall (mean of 4)", vi: "tổng thể", idx: null },
];
export const SOL: Letter[] = ["A", "B", "C"];
export const SOL_NAME: Record<Letter, string> = { A: "Last-Hour Food Rescue", B: "Demand Forecasting & Portion Control", C: "Safe Redistribution" };
export const SOL_VI: Record<Letter, string> = { A: "giải pháp A (Giải cứu thực phẩm giờ cuối)", B: "giải pháp B (Dự báo nhu cầu và kiểm soát khẩu phần)", C: "giải pháp C (Phân phối lại thực phẩm dư an toàn)" };
export const SOL_COLOR: Record<string, string> = { A: "var(--cA)", B: "var(--cB)", C: "var(--cC)" };

export function letter(v: unknown): Priority | null {
  const s = String(v ?? "");
  if (/no significant/i.test(s) || /^none$/i.test(s.trim())) return "None";
  const m = s.match(/solution\s*([abc])/i) || s.trim().match(/^([abc])\b/i);
  return m ? (m[1].toUpperCase() as Letter) : null;
}

/** Validate one response. Accepts 23 cells, or 24 with a leading timestamp (Google Forms export). */
export type NormResult = { row: SurveyRow; err: null } | { row: null; err: string };
export function normRow(cells: unknown[]): NormResult {
  const r = cells.map((x) => String(x == null ? "" : x).trim());
  const a = r.length >= 24 ? r.slice(r.length - 23) : r;
  if (a.length !== 23) return { row: null, err: `has ${r.length} columns, expected 23 (or 24 with Timestamp)` };
  const out: SurveyRow = [];
  for (let i = 0; i < 23; i++) {
    const t = SURVEY_COLUMNS[i][2], v = a[i];
    if (t === "lik") {
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 5) return { row: null, err: `“${SURVEY_COLUMNS[i][1]}” is “${v}”, expected 1–5` };
      out.push(n);
    } else if (t === "prio") {
      const l = letter(v);
      if (!l) return { row: null, err: `priority answer “${v}” not recognised` };
      out.push(l);
    } else if (t === "one") {
      const l = letter(v);
      if (!l || l === "None") return { row: null, err: `one-solution answer “${v}” not recognised` };
      out.push(l);
    } else out.push((v || "(blank)").slice(0, 120));
  }
  return { row: out, err: null };
}

/** Parse pasted text from Google Sheets (tab-separated) or a CSV file. A header row is skipped. */
export function parseText(txt: string): { rows: SurveyRow[]; errs: string[] } {
  const lines = txt.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  if (!lines.length) return { rows: [], errs: ["Nothing pasted."] };
  const delim = lines[0].includes("\t") ? "\t" : ",";
  const split = (l: string): string[] => {
    if (delim === "\t") return l.split("\t");
    const o: string[] = [];
    let cur = "", q = false;
    for (let i = 0; i < l.length; i++) {
      const ch = l[i];
      if (q) {
        if (ch === '"' && l[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { o.push(cur); cur = ""; } else cur += ch;
    }
    o.push(cur);
    return o;
  };
  const rows: SurveyRow[] = [], errs: string[] = [];
  lines.forEach((l, i) => {
    const cells = split(l);
    const res = normRow(cells);
    if (!res.row) {
      const a = cells.length >= 24 ? cells.slice(cells.length - 23) : cells;
      if (i === 0 && !/^[1-5]$/.test(String(a[6] || "").trim())) return; // header row
      errs.push(`Row ${i + 1}: ${res.err}`);
    } else rows.push(res.row);
  });
  return { rows, errs };
}

export const EXAMPLE: SurveyRow[] = EXAMPLE_ROWS.map((r) => normRow(r).row!);

export function toCsv(rows: SurveyRow[]): string {
  const q = (v: unknown) => { const s = String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return "﻿" + [SURVEY_COLUMNS.map((c) => c[0]).join(","), ...rows.map((r) => r.map(q).join(","))].join("\n");
}

export const colOf = (rows: SurveyRow[], i: number) => rows.map((r) => r[i]);
export const numCol = (rows: SurveyRow[], i: number) => rows.map((r) => Number(r[i]));

/** Ratings of A, B and C on one criterion (or the mean of all four). */
export function scores(rows: SurveyRow[], c: CritKey): number[][] {
  const C = CRITERIA.find((x) => x.k === c)!;
  if (C.idx) return C.idx.map((i) => numCol(rows, i));
  return [6, 11, 16].map((s) => rows.map((r) => (Number(r[s]) + Number(r[s + 1]) + Number(r[s + 2]) + Number(r[s + 3])) / 4));
}

export function analyse(rows: SurveyRow[], c: CritKey) {
  const g = scores(rows, c);
  const an = anova1(g), tk = tukey(g, SOL), rm = rmAnova(g), fr = friedman(g);
  const pair: Record<string, (typeof tk.pairs)[number]> = {};
  tk.pairs.forEach((p) => (pair[p.pair.replace(/\s/g, "").replace("–", "-")] = p));
  return { g, an, tk, rm, fr, pair, m: g.map(mean), s: g.map(sd), n: g[0].length };
}
export type Analysis = ReturnType<typeof analyse>;

/** Planned contrast: each person's B − (A + C) / 2. */
export function contrastB(g: number[][]) {
  const d = g[1].map((v, i) => v - (g[0][i] + g[2][i]) / 2), md = mean(d), s = sd(d), t = md / (s / Math.sqrt(d.length));
  return { md, s, t, df: d.length - 1, p: tTwo(t, d.length - 1), dz: md / s };
}

export const agreePct = (rows: SurveyRow[], i: number) => Math.round((numCol(rows, i).filter((y) => y >= 4).length / rows.length) * 100);
export { chisqGOF };

/* ---------- number formats (APA style in English, comma decimals in Vietnamese) ---------- */
export const f2 = (x: number) => x.toFixed(2);
export const vi2 = (x: number) => x.toFixed(2).replace(".", ",");
export const vi3 = (x: number) => x.toFixed(3).replace(".", ",");
export const pAPA = (p: number) => (p < 0.001 ? "p < .001" : "p = " + p.toFixed(3).replace(/^0/, ""));
export const pVI = (p: number) => (p < 0.001 ? "p < 0,001" : "p = " + vi3(p));
export const pShort = (p: number) => (p < 0.001 ? "< .001" : p.toFixed(3).replace(/^0/, ""));
export const noLead = (x: number, d = 2) => x.toFixed(d).replace(/^0/, "");
