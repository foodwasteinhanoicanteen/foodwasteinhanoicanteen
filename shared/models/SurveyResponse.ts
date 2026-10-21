import { Letter, Priority, SurveyRow, normRow } from "../survey";

export interface SolutionRatings { effective: number; feasible: number; ethical: number; support: number; extra: number }

/** One survey response with named fields. Stored on disk as a 23-cell row (see SURVEY_COLUMNS). */
export class SurveyResponse {
  constructor(
    readonly gender: string,
    readonly age: string,
    readonly occupation: string,
    readonly eatOutPerWeek: string,
    readonly wasteFreq: number,
    readonly heardFoodWaste: string,
    readonly ratings: Record<Letter, SolutionRatings>,
    readonly priority: Priority,
    readonly oneSolution: Letter,
  ) {}

  static fromRow(cells: unknown[]): SurveyResponse {
    const res = normRow(cells);
    if (!res.row) throw new Error(res.err);
    const r = res.row;
    const sol = (s: number): SolutionRatings => ({ effective: +r[s], feasible: +r[s + 1], ethical: +r[s + 2], support: +r[s + 3], extra: +r[s + 4] });
    return new SurveyResponse(String(r[0]), String(r[1]), String(r[2]), String(r[3]), +r[4], String(r[5]),
      { A: sol(6), B: sol(11), C: sol(16) }, r[21] as Priority, r[22] as Letter);
  }

  toRow(): SurveyRow {
    const s = (x: SolutionRatings) => [x.effective, x.feasible, x.ethical, x.support, x.extra];
    return [this.gender, this.age, this.occupation, this.eatOutPerWeek, this.wasteFreq, this.heardFoodWaste,
      ...s(this.ratings.A), ...s(this.ratings.B), ...s(this.ratings.C), this.priority, this.oneSolution];
  }
}
