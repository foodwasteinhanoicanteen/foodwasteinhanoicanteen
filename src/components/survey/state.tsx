/* Survey page state: which data set is shown (example vs ours), which criterion, cached analyses. */
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { createStore } from "../../state/createStore";
import { useSite } from "../../state/site";
import { EXAMPLE, analyse, type Analysis, type CritKey, type SurveyRow } from "../../../shared/survey";
import { conclusion, svValues } from "../../../shared/surveyReport";

export const ui = createStore<{ mode: "example" | "ours"; crit: CritKey; lkCrit: CritKey }>({ mode: "example", crit: "eff", lkCrit: "eff" });

const cache = new WeakMap<SurveyRow[], Map<string, unknown>>();
function memo<T>(rows: SurveyRow[], key: string, fn: () => T): T {
  let m = cache.get(rows);
  if (!m) cache.set(rows, (m = new Map()));
  if (!m.has(key)) m.set(key, fn());
  return m.get(key) as T;
}

interface SurveyCtx {
  rows: SurveyRow[]; saved: SurveyRow[]; isExample: boolean;
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
  const { mode } = ui.use();
  const had = useRef(0);
  useEffect(() => {
    // switch to our data the first time it appears, back to the example when it is deleted
    if (!had.current && savedRows.length) ui.set((s) => ({ ...s, mode: "ours" }));
    if (!savedRows.length) ui.set((s) => ({ ...s, mode: "example" }));
    had.current = savedRows.length;
  }, [savedRows]);

  const value = useMemo<SurveyCtx>(() => {
    const isExample = mode !== "ours" || !savedRows.length;
    const rows = isExample ? EXAMPLE : savedRows;
    return {
      rows, saved: savedRows, isExample,
      analysis: (c) => memo(rows, "a:" + c, () => analyse(rows, c)),
      sv: memo(rows, "sv:" + isExample, () => svValues(rows, isExample)),
      concl: () => memo(rows, "c:" + isExample, () => conclusion(rows, isExample)),
    };
  }, [mode, savedRows]);
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
