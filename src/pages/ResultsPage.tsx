// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import { BAShow, BAToggle, Field, GoButton, MediaSlot, SV } from "../components";

export default function ResultsPage() {
  return (
    <PageSection id="results">
      <div className="wrap phead">
        <StageStepper current={8} />
        <h1>Results &amp; learning</h1>
        <p className="lede">
          What happened, what difference it made, and what we learned. Every number here comes from our own audit, sales records and survey.
        </p>
        <p className="stage-note">Design thinking: Learn. Rubric 4: Results &amp; learning.</p>
        <div className="takeaways">
          <div>
            <b>
              <Field id="tk_red">__%</Field>
            </b>
            <span>less food wasted per meal</span>
          </div>
          <div>
            <b>
              <Field id="tk_kg">__ kg</Field>
            </b>
            <span>food kept out of the bin</span>
          </div>
          <div>
            <b>
              <span>
                <SV k="n">50</SV>
              </span>
            </b>
            <span>people surveyed</span>
          </div>
          <div>
            <b>9</b>
            <span>lessons we learned</span>
          </div>
        </div>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="numbers" label="Our numbers">
          <div className="tab-title">
            <h2>What happened</h2>
          </div>
          <p className="tab-intro">
            Baseline from the weeks 1–2 audit; pilot from <Field id="r_weeks">weeks __</Field>.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="v">
                <Field id="r_base">__ g</Field>
              </div>
              <div className="l">baseline food waste per meal</div>
              <div className="s">Weeks 1–2 audit</div>
            </div>
            <div className="stat">
              <div className="v">
                <Field id="r_pilot">__ g</Field>
              </div>
              <div className="l">food waste per meal during the pilot</div>
              <div className="s">Pilot weeks</div>
            </div>
            <div className="stat g">
              <div className="v">
                <Field id="r_red">__%</Field>
              </div>
              <div className="l">reduction in waste per meal</div>
              <div className="s">(baseline − pilot) ÷ baseline</div>
            </div>
            <div className="stat g">
              <div className="v">
                <Field id="r_kg">__ kg</Field>
              </div>
              <div className="l">food saved per week</div>
              <div className="s">waste saved × meals</div>
            </div>
            <div className="stat g">
              <div className="v">
                <Field id="r_vnd">VND __</Field>
              </div>
              <div className="l">ingredient cost saved per month (estimate)</div>
              <div className="s">kg saved × cost per kg</div>
            </div>
            <div className="stat">
              <div className="v">
                <Field id="r_n">n = __</Field>
              </div>
              <div className="l">students surveyed</div>
              <div className="s">
                <Field id="r_ndates">survey dates</Field>
              </div>
            </div>
          </div>
          <div className="callout" style={{ marginTop: "16px" }}>
            If the pilot is not finished yet, report what has happened so far (baseline, survey, first pilot week) and label it as partial.
            Do not publish estimates as results.
          </div>
        </Tab>
        <Tab id="beforeafter" label="Before vs after">
          <div className="tab-title">
            <h2>Before vs after</h2>
          </div>
          <p className="tab-intro">Switch between the baseline and the pilot.</p>
          <div className="switch" role="group" aria-label="Show">
            <BAToggle v="0">Before (baseline)</BAToggle>
            <BAToggle v="1">After (pilot)</BAToggle>
          </div>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <BAShow v="0" as="th">
                    Before
                  </BAShow>
                  <BAShow v="1" as="th">
                    After
                  </BAShow>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Food waste per meal</td>
                  <BAShow v="0" as="td">
                    <Field id="ba_wpm0">__ g</Field>
                  </BAShow>
                  <BAShow v="1" as="td">
                    <Field id="ba_wpm1">__ g</Field>
                  </BAShow>
                  <td>
                    <Field id="ba_wpm2">__%</Field>
                  </td>
                </tr>
                <tr>
                  <td>Preparation waste</td>
                  <BAShow v="0" as="td">
                    <Field id="ba_prep0">__ kg/day</Field>
                  </BAShow>
                  <BAShow v="1" as="td">
                    <Field id="ba_prep1">__ kg/day</Field>
                  </BAShow>
                  <td>
                    <Field id="ba_prep2">__%</Field>
                  </td>
                </tr>
                <tr>
                  <td>Overproduction (prepared but unsold)</td>
                  <BAShow v="0" as="td">
                    <Field id="ba_over0">__ portions/day</Field>
                  </BAShow>
                  <BAShow v="1" as="td">
                    <Field id="ba_over1">__ portions/day</Field>
                  </BAShow>
                  <td>
                    <Field id="ba_over2">__%</Field>
                  </td>
                </tr>
                <tr>
                  <td>Plate waste</td>
                  <BAShow v="0" as="td">
                    <Field id="ba_plate0">__ g/meal</Field>
                  </BAShow>
                  <BAShow v="1" as="td">
                    <Field id="ba_plate1">__ g/meal</Field>
                  </BAShow>
                  <td>
                    <Field id="ba_plate2">__%</Field>
                  </td>
                </tr>
                <tr>
                  <td>Student satisfaction (1–5)</td>
                  <BAShow v="0" as="td">
                    <Field id="ba_sat0">__</Field>
                  </BAShow>
                  <BAShow v="1" as="td">
                    <Field id="ba_sat1">__</Field>
                  </BAShow>
                  <td>
                    <Field id="ba_sat2">__</Field>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid g2" style={{ marginTop: "18px" }}>
            <figure>
              <MediaSlot id="ba_before" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Before: a typical waste bin after lunch</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_ba_before">date and caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="ba_after" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>After: the same bin during the pilot</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_ba_after">date and caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Tab id="difference" label="Difference made">
          <div className="tab-title">
            <h2>What difference the project made</h2>
          </div>
          <p className="tab-intro">Our results, grouped by who benefits. Fill in from the audit, sales records and survey.</p>
          <div className="impact">
            <div className="comp">
              <div className="comp-h">
                <h3>For the canteen</h3>
              </div>
              <ul className="clean small">
                <li>
                  Waste per meal: <Field id="d_wpm">from __ g to __ g</Field>
                </li>
                <li>
                  Ingredient cost saved: <Field id="d_cost">VND __ / month</Field>
                </li>
                <li>
                  Revenue from last-hour sales: <Field id="d_rev">VND __</Field>
                </li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>For students</h3>
              </div>
              <ul className="clean small">
                <li>
                  Students choosing small or regular portions: <Field id="d_portion">__%</Field>
                </li>
                <li>
                  Satisfaction before → after: <Field id="d_sat">__ → __</Field>
                </li>
                <li>
                  Discounted meals bought: <Field id="d_disc">__</Field>
                </li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>For the community</h3>
              </div>
              <ul className="clean small">
                <li>
                  Meals redistributed: <Field id="d_meals">__</Field>
                </li>
                <li>
                  Partner involved: <Field id="d_partner">__</Field>
                </li>
                <li>
                  Safety incidents: <Field id="d_incidents">0</Field>
                </li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>For the environment</h3>
              </div>
              <ul className="clean small">
                <li>
                  Food kept out of the bin: <Field id="d_kg">__ kg during the pilot</Field>
                </li>
                <li>
                  Projected per year: <Field id="d_year">__ t</Field>
                </li>
                <li>
                  Waste sorted for compost: <Field id="d_sorted">__ kg</Field>
                </li>
              </ul>
            </div>
          </div>
          <div className="panel stack" style={{ marginTop: "16px" }}>
            <h3>What changed in how people act</h3>
            <p className="small muted">Observations count as evidence. Note what you saw, with a date.</p>
            <ul className="clean">
              <li>
                <Field id="d_obs1">e.g. kitchen staff started checking the forecast sheet before cooking</Field>
              </li>
              <li>
                <Field id="d_obs2">e.g. students asked for small portions without being prompted</Field>
              </li>
              <li>
                <Field id="d_obs3">e.g. the canteen manager agreed to keep weighing after the pilot</Field>
              </li>
            </ul>
          </div>
          <div className="callout g" style={{ marginTop: "16px" }}>
            <b>If the model scaled.</b> At the Hanoi school rate, one 1,000-meal canteen wastes about 23.6 t of food a year. A 25% cut
            prevents about 5.9 t per canteen. Ten campus canteens would keep about <span className="hl">59 t</span> of food out of Nam Sơn
            every year. These are illustrative estimates, not results.
          </div>
        </Tab>
        <Tab id="feedback" label="What people told us">
          <div className="tab-title">
            <h2>What people told us</h2>
          </div>
          <p className="tab-intro">
            Survey results and quotes from students and staff. The full statistical analysis is on the{" "}
            <GoButton to="survey-anova" color="secondary" size="xs">
              Survey &amp; analysis
            </GoButton>{" "}
            page.
          </p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Evidence</th>
                  <th>Result</th>
                  <th>What it shows</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Survey B10: willing to choose a smaller portion</td>
                  <td>
                    <Field id="fb_b10">__% of n</Field>
                  </td>
                  <td>Whether choice-preserving nudges work</td>
                </tr>
                <tr>
                  <td>Survey B3 / B8 / B13: ethical acceptability of A, B, C</td>
                  <td>
                    <Field id="fb_b3">mean scores</Field>
                  </td>
                  <td>Stakeholder support for each solution</td>
                </tr>
                <tr>
                  <td>Survey D2: biggest barrier</td>
                  <td>
                    <Field id="fb_d2">top answer, %</Field>
                  </td>
                  <td>Which ethical risk matters most to students</td>
                </tr>
                <tr>
                  <td>Top reasons for plate waste (QR survey)</td>
                  <td>
                    <Field id="fb_qr">e.g. portion too large __%</Field>
                  </td>
                  <td>Which design changes to make</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid g2" style={{ marginTop: "18px" }}>
            <div className="panel stack">
              <span className="eyebrow">Student</span>
              <p className="quote">
                “<Field id="q_student">add a quote</Field>”
              </p>
              <p className="small muted">
                <Field id="q_student_who">year, faculty</Field>
              </p>
            </div>
            <div className="panel stack">
              <span className="eyebrow">Kitchen staff</span>
              <p className="quote">
                “<Field id="q_staff">add a quote</Field>”
              </p>
              <p className="small muted">
                <Field id="q_staff_who">role</Field>
              </p>
            </div>
          </div>
          <figure style={{ marginTop: "18px" }}>
            <MediaSlot id="fb_chart" className="media wide">
              <div className="ph">
                <span className="ic">Chart or screenshot</span>
                <b>Survey results chart</b>
                <span className="small muted">Export from Google Forms or Sheets</span>
              </div>
            </MediaSlot>
            <figcaption>
              <Field id="cap_fb_chart">caption</Field>
            </figcaption>
          </figure>
        </Tab>
        <Tab id="learned" label="What we learned">
          <div className="tab-title">
            <h2>What we learned</h2>
          </div>
          <p className="tab-intro">Six lessons from the research and the pilot.</p>
          <details className="acc" open>
            <summary>1. Responsibility sits where decisions are made</summary>
            <div className="in">
              <p>
                We started by blaming household habits. The research showed that portion size, menus and production quantity are decided by
                businesses, so the ethical question became: <b>who controls the waste?</b>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>2. What is not measured cannot be managed</summary>
            <div className="in">
              <p>
                Vietnam has no data on food-service waste, and before our audit our canteen <Field id="l_knew">did / did not</Field> know
                how much it wasted. Measuring was the first ethical act.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>3. Not all evidence is equal</summary>
            <div className="in">
              <p>
                We learned to check who funded a study. A survey run with a refrigerator brand had a potential conflict of interest, so we
                did not rely on it. We also found that some widely repeated figures did not match their original sources, and corrected
                them.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>4. Good solutions can create new ethical problems</summary>
            <div className="in">
              <p>
                Discounts and donations can encourage over-cooking (moral hazard), and donations can harm dignity or safety if done badly.
                That is why prevention comes first and every solution has safeguards.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>5. Legal is not the same as ethical</summary>
            <div className="in">
              <p>
                Vietnamese law lets firms throw away safe food and makes donation risky. Business ethics matters most exactly where the law
                is weak.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>6. What happened in our pilot</summary>
            <div className="in">
              <p>
                <Field id="l_pilot">
                  What worked, what did not, what surprised us, what we would do differently, and how the team worked together.
                </Field>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>7. Design thinking: talking to people changed our design</summary>
            <div className="in">
              <p>
                <Field id="l_dt">
                  Give one or two examples of feedback from students or staff that changed the design (e.g. dropping fines for leftovers in
                  favour of a free refill).
                </Field>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>8. How we worked as a team</summary>
            <div className="in">
              <p>
                <Field id="l_team">How we split the work, what went well, one conflict or difficulty and how we solved it.</Field>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>9. If we did it again</summary>
            <div className="in">
              <p>
                <Field id="l_again">
                  e.g. start weighing earlier, randomise the order of solutions in the survey, involve kitchen staff from day one.
                </Field>
              </p>
            </div>
          </details>
        </Tab>
        <Tab id="next" label="Limits & next steps">
          <div className="tab-title">
            <h2>Limitations and next steps</h2>
          </div>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Limitations</h3>
              <ul className="clean">
                <li>
                  Our pilot covers <Field id="n_scope">one canteen, lunch only, __ weeks</Field>, so results may differ in other canteens or
                  seasons.
                </li>
                <li>Benchmarks (Champions 12.3, Meliá Hồ Tràm) come from larger, international or resort operations.</li>
                <li>Survey answers are self-reported.</li>
                <li>Solution scores are our team’s judgement and should be revisited after the pilot.</li>
              </ul>
            </div>
            <div className="panel stack">
              <h3>Next steps</h3>
              <p>
                <Field id="n_next">
                  e.g. present to university operations; extend to dinner; add a partner for Solution C; add composting
                </Field>
              </p>
            </div>
          </div>
          <figure style={{ marginTop: "18px" }}>
            <MediaSlot id="team_photo" className="media wide">
              <div className="ph">
                <span className="ic">Photo</span>
                <b>Team photo</b>
              </div>
            </MediaSlot>
            <figcaption>
              <Field id="cap_team_photo">caption</Field>
            </figcaption>
          </figure>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
