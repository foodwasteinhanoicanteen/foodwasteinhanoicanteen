/* Survey › Enter data: the survey uses the 50 example rows; add one response, list, download, delete.
   Every saved row is still validated by the data rules (shared/schemas/site.ts). */
import { useState } from "react";
import { useSite } from "../../state/site";
import { useOverlay } from "../ui/Overlays";
import { downloadText } from "../../api/client";
import { useSurvey } from "./state";
import { OPTIONS, SURVEY_COLUMNS, type SurveyRow, normRow, toCsv } from "../../../shared/survey";
import { SurveyResponse } from "../../../shared/models/SurveyResponse";

const defaults = () => SURVEY_COLUMNS.map((c) => (c[2] === "lik" ? "3" : OPTIONS[c[2]][0]));

export function EnterData() {
  const site = useSite(), { saved } = useSurvey(), { toast } = useOverlay();
  const [one, setOne] = useState<string[]>(defaults);
  const [confirm, setConfirm] = useState(false);

  const save = (rows: SurveyRow[], msg: string) => site.saveSurvey(rows, msg);

  return (
    <div className="stack-lg">
      <div className="panel stack">
        <h3>1. Add one response</h3>
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
          <h3>2. Saved responses <span className="pill hi" id="savedcount">{saved.length}</span></h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn ghost" type="button" onClick={() => downloadText("survey_responses.csv", toCsv(saved), "text/csv")}>Download as CSV</button>
            <button className="btn danger" type="button" onClick={() => setConfirm(true)}>Delete all</button>
          </div>
        </div>
        {confirm && (
          <div className="callout"><p><b>Delete all saved responses?</b> The survey goes back to the 50 example responses.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn danger" type="button" onClick={() => { setConfirm(false); save([], "Reset to the 50 example responses"); }}>Yes, delete all</button>
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
