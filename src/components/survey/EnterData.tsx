/* Survey › Enter data: paste from Google Sheets / CSV, add one response, list, download, delete.
   Saving needs team edit mode; the server validates every row again. */
import { useState } from "react";
import { useSite } from "../../state/site";
import { useOverlay } from "../ui/Overlays";
import { downloadText } from "../../api/client";
import { ui, useSurvey } from "./state";
import { EXAMPLE, OPTIONS, SURVEY_COLUMNS, type SurveyRow, normRow, parseText, toCsv } from "../../../shared/survey";
import { EXAMPLE_ROWS } from "../../../shared/data/exampleSurvey";
import { SurveyResponse } from "../../../shared/models/SurveyResponse";

const defaults = () => SURVEY_COLUMNS.map((c) => (c[2] === "lik" ? "3" : OPTIONS[c[2]][0]));

export function EnterData() {
  const site = useSite(), { saved } = useSurvey(), { toast } = useOverlay();
  const [paste, setPaste] = useState("");
  const [report, setReport] = useState<{ rows: SurveyRow[]; errs: string[] } | null>(null);
  const [one, setOne] = useState<string[]>(defaults);
  const [confirm, setConfirm] = useState(false);

  const save = async (rows: SurveyRow[], msg: string, mode: "ours" | "example" = "ours") => {
    if (await site.saveSurvey(rows, msg)) ui.set((s) => ({ ...s, mode }));
  };

  return (
    <div className="stack-lg">
      <div className="panel stack">
        <h3>1. Paste from Google Sheets</h3>
        <ol className="clean small">
          <li>In Google Forms, open <b>Responses → View in Sheets</b>.</li>
          <li>Select every row, <b>including the header row</b>, from the Timestamp column to the last question, and copy.</li>
          <li>Paste below, then press <b>Check data</b>. A CSV file with the same 23 questions in the same order also works.</li>
        </ol>
        <label htmlFor="pastebox" className="small muted">Paste here</label>
        <textarea id="pastebox" className="paste" placeholder={"Timestamp\tWhat is your gender?\tWhat is your age?\t…"} value={paste} onChange={(e) => setPaste(e.target.value)} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn" type="button" onClick={() => setReport(parseText(paste))}>Check data</button>
          <button className="btn ghost" type="button" onClick={() => { setPaste([SURVEY_COLUMNS.map((c) => c[0]).join("\t"), ...EXAMPLE_ROWS.map((r) => r.join("\t"))].join("\n")); toast("Example rows pasted. Press Check data to try the import."); }}>Fill with the 50 example rows</button>        </div>
        {report && (
          <div className="chart-detail">
            <b>{report.rows.length} valid response{report.rows.length === 1 ? "" : "s"} found.</b>
            {report.errs.length > 0 && <>
              <p className="small" style={{ marginTop: 6, color: "var(--waste)" }}>{report.errs.length} row{report.errs.length === 1 ? "" : "s"} skipped:</p>
              <ul className="clean small">{report.errs.slice(0, 8).map((x) => <li key={x}>{x}</li>)}{report.errs.length > 8 && <li>…and {report.errs.length - 8} more</li>}</ul>
            </>}
            {report.rows.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                <button className="btn" type="button" onClick={() => { save(report.rows, `Saved ${report.rows.length} responses`); setReport(null); setPaste(""); }}>Replace saved data with these {report.rows.length}</button>
                <button className="btn ghost" type="button" onClick={() => { save(saved.concat(report.rows), `Added ${report.rows.length} responses`); setReport(null); setPaste(""); }}>Add to the {saved.length} saved</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="panel stack">
        <h3>2. Or add one response at a time</h3>
        <div className="formgrid" id="oneform">
          {SURVEY_COLUMNS.map((c, i) => {
            const opts = c[2] === "lik" ? ["1", "2", "3", "4", "5"] : OPTIONS[c[2]];
            return <label key={c[0]} htmlFor={"of" + i}>{c[1]}<select id={"of" + i} value={one[i]} onChange={(e) => setOne((o) => o.map((v, j) => (j === i ? e.target.value : v)))}>{opts.map((o) => <option key={o}>{o}</option>)}</select></label>;
          })}
        </div>
        <div><button className="btn" type="button" onClick={() => { const r = normRow(one); if (!r.row) { toast(r.err); return; } save(saved.concat([r.row]), "Response added"); }}>Add this response</button></div>
      </div>

      <div className="panel stack">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <h3>3. Saved responses <span className="pill hi" id="savedcount">{saved.length}</span></h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn ghost" type="button" onClick={() => downloadText(saved.length ? "survey_responses.csv" : "example_survey_50_responses.csv", toCsv(saved.length ? saved : EXAMPLE), "text/csv")}>Download as CSV</button>
            <button className="btn danger" type="button" onClick={() => setConfirm(true)}>Delete all</button>
          </div>
        </div>
        {confirm && (
          <div className="callout"><p><b>Delete all saved responses?</b> This cannot be undone.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn danger" type="button" onClick={() => { setConfirm(false); save([], "All responses deleted", "example"); }}>Yes, delete all</button>
              <button className="btn ghost" type="button" onClick={() => setConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
        <div className="tbl" style={{ maxHeight: 420, overflow: "auto" }}>
          <table id="savedtable">
            {!saved.length ? <tbody><tr><td className="muted">No responses saved yet. The analysis is using the example data.</td></tr></tbody> : <>
              <thead><tr><th>#</th><th>Gender</th><th>Age</th><th>Occupation</th><th className="n">A (5 items)</th><th className="n">B (5 items)</th><th className="n">C (5 items)</th><th>Priority</th><th>One</th><th /></tr></thead>
              <tbody>{saved.map((row, i) => {
                const r = SurveyResponse.fromRow(row), five = (x: typeof r.ratings.A) => [x.effective, x.feasible, x.ethical, x.support, x.extra].join(" ");
                return (
                  <tr key={i}><td className="mono">{i + 1}</td><td>{r.gender}</td><td>{r.age}</td><td>{r.occupation}</td>
                    <td className="n">{five(r.ratings.A)}</td><td className="n">{five(r.ratings.B)}</td><td className="n">{five(r.ratings.C)}</td><td>{r.priority}</td><td>{r.oneSolution}</td>
                    <td><button className="x" style={{ width: 28, height: 28, fontSize: "1rem" }} aria-label={`Delete response ${i + 1}`} onClick={() => save(saved.filter((_, j) => j !== i), "Response deleted")}>×</button></td></tr>
                );
              })}</tbody>
            </>}
          </table>
        </div>
      </div>
    </div>
  );
}
