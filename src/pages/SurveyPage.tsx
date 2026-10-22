// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import {
  AnovaHyp,
  AnovaSummary,
  AnovaTable,
  AnovaTitle,
  AnovaVerdict,
  ChoiceBars,
  ChoiceTest,
  CiPlot,
  Conclusion,
  ContrastBox,
  CopyButton,
  CritPills,
  DescTable,
  EnterData,
  ExtraStats,
  FriedmanBox,
  LikertChart,
  LikertLegend,
  LikertNote,
  MeanAxis,
  MeanChart,
  PairTable,
  Profile,
  RmNote,
  RmTable,
  SV,
  TukeyQ,
  TukeyTable,
  TukeyTitle,
  TukeyVerdict,
  WhoIntro,
} from "../components";

export default function SurveyPage() {
  return (
    <PageSection id="survey">
      <div className="wrap phead">
        <StageStepper current={4} />
        <div className="eyebrow">
          <span>Step 4 · Test ideas with people</span>
          <span className="rubric">Rubrics 1, 2 &amp; 4 · Evidence from people</span>
        </div>
        <h1>Survey &amp; analysis</h1>
        <p className="lede">
          We asked people to rate all three solutions on effectiveness, feasibility, ethics and support. One-way ANOVA tells us whether the
          solutions are rated differently; Tukey’s post-hoc test tells us which ones.
        </p>
        <div className="takeaways">
          <div>
            <svg className="ic">
              <use href="#i-users"></use>
            </svg>
            <b>
              <SV k="n">50</SV>
            </b>
            <span>survey responses analysed</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-chart"></use>
            </svg>
            <b>
              <SV k="bmean">4.26</SV>
            </b>
            <span>Solution B’s mean effectiveness rating (of 5)</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-flask"></use>
            </svg>
            <b>
              <SV k="anp">p &lt; .001</SV>
            </b>
            <span>ANOVA: solutions are rated differently</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-check"></use>
            </svg>
            <b>
              <SV k="tk">B &gt; A, C</SV>
            </b>
            <span>Tukey: which solution was rated higher</span>
          </div>
        </div>
        <p className="small" style={{ marginTop: "10px", fontWeight: "600", color: "var(--gold)" }}>
          <SV k="srcnote"></SV>
        </p>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="design" label="The survey">
          <div className="tab-title">
            <h2>What we asked, and why</h2>
          </div>
          <p className="tab-intro">
            “Survey on Food Waste Reduction Solutions in Hanoi”, Google Forms, three sections. Every respondent rated every solution on the
            same four statements (1 = strongly disagree, 5 = strongly agree), so the solutions can be compared directly.
          </p>
          <div className="grid g3">
            <div className="panel stack">
              <span className="eyebrow">Section 1 · 6 questions</span>
              <h3>Background and behaviour</h3>
              <p className="small">
                Gender, age, occupation, how often they eat out, how often they left edible food in the past 7 days (1–5), and whether they
                understand the term “food waste”.
              </p>
              <p className="who">Describes who answered</p>
            </div>
            <div className="panel stack">
              <span className="eyebrow">Section 2 · 15 ratings</span>
              <h3>Evaluation of A, B and C</h3>
              <p className="small">
                For each solution: <b>effective</b>, <b>feasible</b>, <b>ethical</b>, <b>support</b>, plus one solution-specific item (A:
                would buy a discounted meal; B: would choose a matching portion; C: comfortable with redistribution).
              </p>
              <p className="who">Tested with ANOVA and Tukey</p>
            </div>
            <div className="panel stack">
              <span className="eyebrow">Section 3 · 2 choices</span>
              <h3>Comparison</h3>
              <p className="small">Which solution should be prioritised, and which one they would choose if resources allowed only one.</p>
              <p className="who">Tested with chi-square</p>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>From hypothesis to test</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Question we want to answer</th>
                  <th>Data used</th>
                  <th>Test</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Are the three solutions rated differently on effectiveness?</b>
                    <br />
                    <span className="small muted">H₀: μA = μB = μC · H₁: at least one mean differs</span>
                  </td>
                  <td>A_effective, B_effective, C_effective (n ratings each)</td>
                  <td>One-way ANOVA</td>
                </tr>
                <tr>
                  <td>
                    <b>Which pairs differ?</b>
                    <br />
                    <span className="small muted">A vs B, A vs C, B vs C</span>
                  </td>
                  <td>Same three columns</td>
                  <td>Tukey HSD post-hoc</td>
                </tr>
                <tr>
                  <td>
                    <b>Is the root-cause solution rated higher than the leftover solutions?</b>
                    <br />
                    <span className="small muted">B vs the average of A and C</span>
                  </td>
                  <td>B_effective − (A_effective + C_effective) ÷ 2 for each person</td>
                  <td>Planned contrast (one-sample t-test)</td>
                </tr>
                <tr>
                  <td>Same questions for feasibility, ethics, support and the overall score</td>
                  <td>The other 9 rating columns; overall = mean of the 4 statements</td>
                  <td>ANOVA + Tukey for each</td>
                </tr>
                <tr>
                  <td>Do the results hold if we account for each person rating all three?</td>
                  <td>All rating columns, matched by respondent</td>
                  <td>Repeated-measures ANOVA, Friedman test</td>
                </tr>
                <tr>
                  <td>Do people prefer one solution when forced to choose?</td>
                  <td>Section 3 answers</td>
                  <td>Chi-square goodness of fit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout g" style={{ marginTop: "16px" }}>
            <b>Why B is the “root-cause” solution.</b> Solutions A and C deal with food that has already been over-produced: A sells it, C
            gives it away. Solution B stops the over-production and oversized portions that create the waste in the first place. So if B is
            rated significantly more effective than both A and C, the data supports the claim that{" "}
            <b>people rate tackling the root cause higher than handling the leftovers</b>.
          </div>
          <div className="panel stack" style={{ marginTop: "16px" }}>
            <h3>Research ethics</h3>
            <ul className="clean small">
              <li>
                <b>Informed consent:</b> the form opens with the purpose of the survey and states that taking part is voluntary and that
                respondents can stop at any time.
              </li>
              <li>
                <b>Anonymity:</b> no names, student IDs or email addresses are collected; results are reported only as totals.
              </li>
              <li>
                <b>Respondents under 18:</b> the form allows an “Under 18” answer. Their responses are excluded from the analysis unless
                parental consent was obtained.
              </li>
              <li>
                <b>Interviews and photos:</b> verbal consent is recorded before interviewing staff; no faces appear in photos without
                permission.
              </li>
              <li>
                <b>Data storage:</b> raw responses stay in the team’s Google Drive and are deleted after the course.
              </li>
            </ul>
          </div>
          <details className="acc" style={{ marginTop: "16px" }}>
            <summary>Survey limitations to mention in the report</summary>
            <div className="in">
              <p>
                <b>Same people rate all three solutions.</b> One-way ANOVA treats the three sets of ratings as independent groups. They are
                not, so we also run a repeated-measures ANOVA and a Friedman test (see “Robustness”).
              </p>
              <p>
                <b>Likert ratings are ordinal.</b> Treating 1–5 as numbers is common practice for ANOVA, but the Friedman test, which uses
                ranks only, is reported as a check.
              </p>
              <p>
                <b>Solution C’s ethics statement is worded differently</b> (“If food meets appropriate safety requirements…”). The condition
                makes agreement easier, so C’s ethics score may be inflated.
              </p>
              <p>
                <b>Order effects.</b> Every respondent saw A, then B, then C. Later solutions may be judged against earlier ones.
              </p>
              <p>
                <b>Sample.</b> A convenience sample, mostly students; results describe our respondents, not all of Hanoi.
              </p>
              <p>
                <b>Typo:</b> C’s feasibility question reads “Hano” instead of “Hanoi”.
              </p>
            </div>
          </details>
        </Tab>
        <Tab id="enter" label="Enter data">
          <div className="tab-title">
            <h2>Enter our survey data</h2>
          </div>
          <p className="tab-intro">
            The survey uses our 50 responses. Add or delete single responses below; everything on this page recalculates automatically.
          </p>
          <EnterData />
        </Tab>
        <Tab id="who" label="Respondents">
          <div className="tab-title">
            <h2>Who answered</h2>
          </div>
          <WhoIntro className="tab-intro" />
          <Profile className="grid g3" />
        </Tab>
        <Tab id="ratings" label="Ratings">
          <div className="tab-title">
            <h2>How each solution was rated</h2>
          </div>
          <p className="tab-intro">
            Mean rating (1–5) with its 95% confidence interval (the black whisker). Where whiskers overlap a lot, the difference may not be
            real; ANOVA and Tukey test this properly.
          </p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Mean ratings</h3>
              <MeanChart className="mchart" />
              <MeanAxis className="maxis" />
            </div>
            <div className="panel stack">
              <h3>Answer distribution</h3>
              <CritPills group="lk" className="critpills" />
              <LikertChart className="lk" />
              <LikertLegend className="lklegend" />
              <LikertNote className="small muted" />
            </div>
          </div>
          <h3 style={{ margin: "24px 0 12px" }}>Descriptive statistics</h3>
          <div className="tbl">
            <DescTable />
          </div>
          <h3 style={{ margin: "24px 0 12px" }}>Solution-specific statements</h3>
          <ExtraStats className="stats" />
        </Tab>
        <Tab id="anova" label="ANOVA">
          <div className="tab-title">
            <h2>One-way ANOVA</h2>
          </div>
          <p className="tab-intro">Is at least one solution rated differently from the others? Pick what to test.</p>
          <CritPills group="an" className="critpills" />
          <div className="grid g2">
            <div className="panel stack">
              <AnovaTitle />
              <AnovaHyp className="small muted" />
              <div className="tbl">
                <AnovaTable />
              </div>
              <AnovaVerdict className="chart-detail" />
            </div>
            <div className="panel stack">
              <h3>All criteria at a glance</h3>
              <div className="tbl">
                <AnovaSummary />
              </div>
              <p className="small muted">
                η² (eta squared) is the share of rating variation explained by which solution was rated: about .01 is small, .06 medium, .14
                large.
              </p>
            </div>
          </div>
        </Tab>
        <Tab id="tukey" label="Tukey post-hoc">
          <div className="tab-title">
            <h2>Tukey HSD post-hoc test</h2>
          </div>
          <p className="tab-intro">
            Which pairs of solutions differ? A pair differs significantly when its 95% confidence interval does not cross zero (p adj &lt;
            .05).
          </p>
          <CritPills group="tk" className="critpills" />
          <div className="grid g2">
            <div className="panel stack">
              <TukeyTitle />
              <div className="tbl">
                <TukeyTable />
              </div>
              <TukeyQ className="small muted" />
            </div>
            <div className="panel stack">
              <h3>Mean differences with 95% CI</h3>
              <CiPlot className="ciplot" />
              <TukeyVerdict className="chart-detail" />
            </div>
          </div>
        </Tab>
        <Tab id="robust" label="Robustness">
          <div className="tab-title">
            <h2>Robustness checks</h2>
          </div>
          <p className="tab-intro">
            Every respondent rated all three solutions, so the ratings are paired. These tests account for that and for the 1–5 scale being
            ordinal. If they agree with ANOVA and Tukey, the conclusion is solid.
          </p>
          <CritPills group="rb" className="critpills" />
          <div className="grid g2">
            <div className="panel stack">
              <h3>Repeated-measures ANOVA</h3>
              <div className="tbl">
                <RmTable />
              </div>
              <RmNote className="small muted" />
            </div>
            <div className="panel stack">
              <h3>Paired comparisons (Bonferroni)</h3>
              <div className="tbl">
                <PairTable />
              </div>
            </div>
            <div className="panel stack">
              <h3>Friedman test (ranks only)</h3>
              <FriedmanBox />
            </div>
            <div className="panel stack">
              <h3>Planned contrast: root cause vs leftovers</h3>
              <ContrastBox />
            </div>
          </div>
        </Tab>
        <Tab id="choice" label="Forced choice">
          <div className="tab-title">
            <h2>When people had to choose</h2>
          </div>
          <p className="tab-intro">Section 3 answers. The chi-square test checks whether choices are spread more unevenly than chance.</p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Which solution should be prioritised?</h3>
              <ChoiceBars which="prio" className="bars" />
              <ChoiceTest which="prio" className="chart-detail" />
            </div>
            <div className="panel stack">
              <h3>If only one solution could be funded</h3>
              <ChoiceBars which="one" className="bars" />
              <ChoiceTest which="one" className="chart-detail" />
            </div>
          </div>
        </Tab>
        <Tab id="conclusion" label="Conclusion">
          <div className="tab-title">
            <h2>Conclusion</h2>
          </div>
          <p className="tab-intro">
            Written automatically from the current data, so it updates when you enter your real responses. Copy it into the report.
          </p>
          <div className="panel stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span className="eyebrow">Conclusion</span>
              <CopyButton target="concl-en" className="btn ghost" type="button">
                Copy
              </CopyButton>
            </div>
            <Conclusion lang="en" className="conclusion" />
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
