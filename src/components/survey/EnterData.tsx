/* Survey › Enter data: the survey uses the 50 example rows; add one response, list, download, delete.
   Every saved row is still validated by the data rules (shared/schemas/site.ts). */
import { useState } from "react";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { NativeSelect } from "@/components/base/select/select-native";
import { useSite } from "../../state/site";
import { useOverlay } from "../ui/Overlays";
import { downloadText } from "../../api/client";
import { useSurvey } from "./state";
import { StatTable } from "./panels";
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
            return <NativeSelect key={c[0]} size="sm" label={c[1]} value={one[i]} options={opts.map((o) => ({ label: o, value: o }))} onChange={(e) => setOne((o) => o.map((v, j) => (j === i ? e.target.value : v)))} />;
          })}
        </div>
        <div><Button size="md" onPress={() => { const r = normRow(one); if (!r.row) { toast(r.err); return; } save(saved.concat([r.row]), "Response added"); }}>Add this response</Button></div>
      </div>

      <div className="panel stack">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <h3>2. Saved responses <Badge size="sm" color="brand" className="inline-flex align-middle"><span id="savedcount">{saved.length}</span></Badge></h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Button size="md" color="secondary" onPress={() => downloadText("survey_responses.csv", toCsv(saved), "text/csv")}>Download as CSV</Button>
            <Button size="md" color="primary-destructive" isDisabled={!saved.length} onPress={() => setConfirm(true)}>Delete all</Button>
          </div>
        </div>
        {confirm && (
          <div className="callout"><p><b>Delete all saved responses?</b> The survey goes back to the 50 example responses.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <Button size="md" color="primary-destructive" onPress={() => { setConfirm(false); save([], "Reset to the 50 example responses"); }}>Yes, delete all</Button>
              <Button size="md" color="secondary" onPress={() => setConfirm(false)}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="tbl" style={{ maxHeight: 420, overflow: "auto" }}>
          {!saved.length ? <p className="muted" id="savedtable">No responses saved yet. The analysis is using the example data.</p> : (
            <StatTable id="savedtable" label="Saved responses" cols={[["#"], ["Gender"], ["Age"], ["Occupation"], ["A (5 items)", true], ["B (5 items)", true], ["C (5 items)", true], ["Priority"], ["One"], [<span className="sr-only">Delete</span>]]}
              rows={saved.map((row, i) => {
                const r = SurveyResponse.fromRow(row), five = (x: typeof r.ratings.A) => [x.effective, x.feasible, x.ethical, x.support, x.extra].join(" ");
                return { id: String(i), cells: [<span className="mono">{i + 1}</span>, r.gender, r.age, r.occupation, five(r.ratings.A), five(r.ratings.B), five(r.ratings.C), r.priority, r.oneSolution,
                  <Button color="tertiary-destructive" size="xs" aria-label={`Delete response ${i + 1}`} onPress={() => save(saved.filter((_, j) => j !== i), "Response deleted")}>×</Button>] };
              })} />
          )}
        </div>
      </div>
    </div>
  );
}
