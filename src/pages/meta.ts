/* The ten pages, their design-thinking stage and their sub-tabs (order = the order shown on the site). */
export interface PageMeta {
  id: string; n: string; label: string; stage?: string; ic?: string; rub: string; desc: string;
  tabs: readonly (readonly [id: string, label: string])[];
}

export const PAGES: PageMeta[] = [
  { id: "home", n: "00", label: "Home", rub: "", desc: "", tabs: [] },
  { id: "problem", n: "01", label: "The problem", stage: "Empathise", ic: "search", rub: "Rubric 1", desc: "Scale, where waste happens, Hanoi kitchens, root causes, consequences, laws, who is affected.",
    tabs: [["scale", "Scale"], ["where", "Where it happens"], ["kitchens", "Hanoi kitchens"], ["causes", "Root causes"], ["impact", "Consequences"], ["law", "Laws & policy"], ["who", "Who is affected"]] },
  { id: "ethics", n: "02", label: "Why it’s ethical", stage: "Define", ic: "flag", rub: "Rubric 5", desc: "Five reasons, excuses vs reality, eight ethical lenses, six dilemmas, SDGs, verdict.",
    tabs: [["claim", "Our claim"], ["excuses", "Excuses vs reality"], ["responsibility", "Who is responsible?"], ["lenses", "8 ethical lenses"], ["dilemmas", "What would you do?"], ["voices", "Voices"], ["sdgs", "SDGs"], ["verdict", "The verdict"]] },
  { id: "solution", n: "03", label: "Our solutions", stage: "Ideate", ic: "bulb", rub: "Rubric 2", desc: "Solutions A, B and C presented, all six ideas, and our weighted analysis.",
    tabs: [["process", "How we got here"], ["a", "Solution A"], ["b", "Solution B"], ["c", "Solution C"], ["ideas", "All six ideas"], ["scoring", "Our analysis"]] },
  { id: "survey", n: "04", label: "Survey & data", stage: "Test", ic: "flask", rub: "Rubrics 1, 2, 4", desc: "Our survey, data entry, ratings, ANOVA, Tukey post-hoc, robustness, conclusion.",
    tabs: [["design", "The survey"], ["enter", "Enter data"], ["who", "Respondents"], ["ratings", "Ratings"], ["anova", "ANOVA"], ["tukey", "Tukey post-hoc"], ["robust", "Robustness"], ["choice", "Forced choice"], ["conclusion", "Conclusion"]] },
  { id: "decision", n: "05", label: "Our decision", stage: "Decide", ic: "check", rub: "Rubrics 2, 5", desc: "B is best, and A and C complete it: the evidence, combined system, theory of change, fit, creativity, safeguards.",
    tabs: [["verdict", "Our decision"], ["system", "How they fit together"], ["toc", "Theory of change"], ["fit", "Fits the people"], ["creative", "What’s new about it"], ["safeguards", "Ethical safeguards"]] },
  { id: "app", n: "06", label: "CampusMeal app", stage: "Prototype", ic: "plate", rub: "Rubrics 2, 3", desc: "Our working pilot app: preview, 14 functions, kitchen forecast, operating protocol, build plan.",
    tabs: [["overview", "What it is"], ["demo", "Quick preview"], ["features", "All functions"], ["kitchen", "Kitchen forecast"], ["protocol", "App protocol"], ["rollout", "Build & test plan"]] },
  { id: "plan", n: "07", label: "Action plans", stage: "Act", ic: "play", rub: "Rubric 3", desc: "One roadmap and a full plan for each solution, KPIs, team, risks, evidence of action.",
    tabs: [["roadmap", "Roadmap"], ["solb", "Plan · Solution B"], ["sola", "Plan · Solution A"], ["solc", "Plan · Solution C"], ["kpis", "How we measure"], ["team", "Our team"], ["risks", "Risks"], ["actions", "Evidence of action"]] },
  { id: "results", n: "08", label: "Results & learning", stage: "Learn", ic: "book", rub: "Rubric 4", desc: "Our numbers, before vs after, difference made, feedback, lessons, next steps.",
    tabs: [["numbers", "Our numbers"], ["beforeafter", "Before vs after"], ["difference", "Difference made"], ["feedback", "What people told us"], ["learned", "What we learned"], ["next", "Limits & next steps"]] },
  { id: "sources", n: "09", label: "Sources", rub: "Evidence", desc: "How we researched and every source in APA 7.",
    tabs: [["methods", "How we researched"], ["refs", "References"], ["laws", "Vietnamese law"]] },
];

export const STEPS = PAGES.filter((p) => p.stage);
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
