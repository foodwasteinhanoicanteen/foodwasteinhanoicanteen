/* Survey page state: the survey data (saved rows, or the 50 example rows until others are saved), which criterion, cached analyses. */
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createStore } from "../../state/createStore";
import { useSite } from "../../state/site";
import { EXAMPLE, analyse, type Analysis, type CritKey, type SurveyRow } from "../../../shared/survey";
import { conclusion, svValues } from "../../../shared/surveyReport";

export const ui = createStore<{ crit: CritKey; lkCrit: CritKey }>({ crit: "eff", lkCrit: "eff" });

const cache = new WeakMap<SurveyRow[], Map<string, unknown>>();
function memo<T>(rows: SurveyRow[], key: string, fn: () => T): T {
  let m = cache.get(rows);
  if (!m) cache.set(rows, (m = new Map()));
  if (!m.has(key)) m.set(key, fn());
  return m.get(key) as T;
}

interface SurveyCtx {
  rows: SurveyRow[]; saved: SurveyRow[];
  analysis: (c: CritKey) => Analysis;
  sv: Record<string, string>;
  concl: () => { vi: string; en: string };
}
const Ctx = createContext<SurveyCtx | null>(null);
export function useSurvey() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSurvey outside SurveyProvider");
  return c;
}

export function SurveyProvider({ children }: { children: ReactNode }) {
  const { savedRows } = useSite();

  const value = useMemo<SurveyCtx>(() => {
    // the 50 example rows count as our survey data until the team saves other rows
    const rows = savedRows.length ? savedRows : EXAMPLE;
    return {
      rows, saved: rows,
      analysis: (c) => memo(rows, "a:" + c, () => analyse(rows, c)),
      sv: memo(rows, "sv", () => svValues(rows, false)),
      concl: () => memo(rows, "c", () => conclusion(rows, false)),
    };
  }, [savedRows]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** A survey-derived value used in text anywhere on the site (e.g. “B mean 4.26”). */
export function SV({ k, children }: { k: string; children?: ReactNode }) {
  const v = useSurvey().sv[k];
  return <>{v ?? children}</>;
}
/** Pill showing which solution scores highest (overall or feasibility). */
export function SVPill({ k, className }: { k: "otop" | "ftop"; className?: string }) {
  const L = useSurvey().sv[k];
  return <span className={className} style={{ background: `var(--c${L})`, color: "#fff" }}>{L}</span>;
}
