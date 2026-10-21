// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import { ActionLog, Field, Gantt, GanttDetail, MediaSlot, PlanSteps, SV, TeamCards } from "../components";

export default function PlanPage() {
  return (
    <PageSection id="plan">
      <div className="wrap phead">
        <StageStepper current={7} />
        <div className="eyebrow">
          <span>Step 7 · Act</span>
          <span className="rubric">Rubric 3 · Planning &amp; action</span>
        </div>
        <h1>Action plans</h1>
        <p className="lede">
          A careful plan for each solution: what it is, who is in charge, how it connects to ethics, the difference it makes, and every step
          with resources, KPIs and risks.
        </p>
        <div className="takeaways">
          <div>
            <svg className="ic">
              <use href="#i-cal"></use>
            </svg>
            <b>12 weeks</b>
            <span>one roadmap for all three solutions</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-users"></use>
            </svg>
            <b>5–7</b>
            <span>named roles per solution</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-target"></use>
            </svg>
            <b>≥ 15%</b>
            <span>target cut in waste per meal</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-shield"></use>
            </svg>
            <b>0</b>
            <span>food-safety incidents allowed</span>
          </div>
        </div>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="roadmap" label="Roadmap">
          <div className="tab-title">
            <h2>One roadmap, three solutions</h2>
          </div>
          <p className="tab-intro">
            Solution B runs the full 12 weeks. Solution C’s partnership is set up early because it takes longest to arrange. Solution A
            starts only once B has shown how much surplus is really left. Click any bar for details.
          </p>
          <div className="legend-row">
            <span>
              <i style={{ background: "var(--cB)" }}></i>B · Forecasting &amp; Portion Control (main)
            </span>
            <span>
              <i style={{ background: "var(--cA)" }}></i>A · Last-Hour Food Rescue
            </span>
            <span>
              <i style={{ background: "var(--cC)" }}></i>C · Safe Redistribution
            </span>
          </div>
          <div className="panel">
            <div style={{ overflowX: "auto" }}>
              <Gantt className="gantt" />
            </div>
            <GanttDetail className="chart-detail" style={{ marginTop: "14px" }} />
          </div>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <button className="navcard" data-go="plan-solb">
              <span className="k" style={{ color: "var(--cB)" }}>
                Main solution
              </span>
              <b style={{ fontFamily: "var(--f-display)", fontSize: "1.1rem" }}>Plan for Solution B</b>
              <span className="small muted">7 stages · weeks 1–12</span>
            </button>{" "}
            <button className="navcard" data-go="plan-sola">
              <span className="k" style={{ color: "var(--cA)" }}>
                Supporting step
              </span>
              <b style={{ fontFamily: "var(--f-display)", fontSize: "1.1rem" }}>Plan for Solution A</b>
              <span className="small muted">4 steps · weeks 7–10</span>
            </button>{" "}
            <button className="navcard" data-go="plan-solc">
              <span className="k" style={{ color: "var(--cC)" }}>
                Supporting step
              </span>
              <b style={{ fontFamily: "var(--f-display)", fontSize: "1.1rem" }}>Plan for Solution C</b>
              <span className="small muted">5 steps · weeks 3–12</span>
            </button>
          </div>
          <div className="callout g" style={{ marginTop: "16px" }}>
            <b>Why these targets.</b> Organisations with established programmes cut kitchen waste by{" "}
            <span className="hl">21–36% within one year</span> (Champions 12.3, 2018a, 2018b, 2019). A student pilot is much shorter, so our
            minimum target is <b>15%</b> less waste per meal, with <b>20–30%</b> as a stretch goal.
          </div>
        </Tab>
        <Tab id="solb" label="Plan · Solution B">
          <div className="planhead">
            <span className="badge" style={{ background: "var(--cB)" }}>
              B
            </span>
            <div>
              <div className="eyebrow">Main solution · Prevent · Weeks 1–12</div>
              <h2>Demand Forecasting &amp; Portion Control</h2>
              <p className="muted">Cook to demand, serve portions that fit, and learn from what is left.</p>
            </div>
          </div>
          <div className="quick">
            <div>
              <span className="k">Owner</span>
              <span className="v">Canteen manager</span>
            </div>
            <div>
              <span className="k">Cost</span>
              <span className="v">Low to medium</span>
            </div>
            <div>
              <span className="k">Time to start</span>
              <span className="v">4 weeks</span>
            </div>
            <div>
              <span className="k">Main KPI</span>
              <span className="v">Grams wasted per meal</span>
            </div>
          </div>
          <div className="grid g2f">
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-bulb"></use>
                </svg>
                <h3>What is the solution?</h3>
              </div>
              <p className="small">
                It tackles the two root causes found in our research: <b>cooking more than people buy</b> and{" "}
                <b>serving more than people eat</b>.
              </p>
              <ul className="clean small">
                <li>
                  <b>Forecast demand:</b> record each dish as Day → Time → Prepared → Sold → Left over, then cook to the numbers, in small
                  batches.
                </li>
                <li>
                  <b>Flexible portions:</b> Small / Regular / Large, or a smaller default (e.g. 150 g of rice instead of 200 g) with a free
                  refill.
                </li>
                <li>
                  <b>Plate-waste feedback:</b> a QR question asks why food was left, so the menu can be adjusted.
                </li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-users"></use>
                </svg>
                <h3>Who is in charge?</h3>
              </div>
              <div className="tbl">
                <table className="roles">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>Canteen manager</b> (owner)
                      </td>
                      <td>Approves changes, shares sales data, accountable for results</td>
                    </tr>
                    <tr>
                      <td>Kitchen supervisor</td>
                      <td>Uses the forecast to set daily batches; runs batch cooking</td>
                    </tr>
                    <tr>
                      <td>Kitchen staff</td>
                      <td>Weigh waste daily (under 10 minutes); serve the three portion sizes</td>
                    </tr>
                    <tr>
                      <td>Cashier</td>
                      <td>Records portions sold by size</td>
                    </tr>
                    <tr>
                      <td>
                        Data lead (<Field id="pb_data">name</Field>)
                      </td>
                      <td>Baseline audit, forecasting sheet, KPI calculations</td>
                    </tr>
                    <tr>
                      <td>
                        Survey lead (<Field id="pb_survey">name</Field>)
                      </td>
                      <td>QR plate-waste form, student survey</td>
                    </tr>
                    <tr>
                      <td>
                        Project leader (<Field id="pb_lead">name</Field>)
                      </td>
                      <td>Coordination; presents results to university operations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-scale"></use>
                </svg>
                <h3>Connection to ethics</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Utilitarianism (Singer):</b> prevents harm at little or no cost, since prevention usually saves money.
                </li>
                <li>
                  <b>Kant:</b> a duty to use resources carefully; honest portion choices treat students as rational agents, not a means to a
                  bigger bill.
                </li>
                <li>
                  <b>Stakeholder theory and shared value:</b> helps the owner <em>and</em> the powerless stakeholders at once.
                </li>
                <li>
                  <b>Virtue ethics:</b> measuring builds practical wisdom and temperance in the kitchen.
                </li>
                <li>
                  <b>Environmental ethics:</b> top of the food recovery hierarchy.
                </li>
              </ul>
              <p className="small muted">
                Safeguards: quality never cut; refills always free; staff never blamed; only aggregated data kept.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-heart"></use>
                </svg>
                <h3>How it makes a difference</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Less food bought and binned:</b> at the Hanoi school rate, a 1,000-meal canteen wastes about 23.6 t a year; a 25% cut
                  prevents about <b>5.9 t</b>.
                </li>
                <li>
                  <b>Savings</b> can keep meal prices stable for students.
                </li>
                <li>
                  <b>Students</b> eat what they want;{" "}
                  <span>
                    <SV k="bportion">__</SV>
                  </span>{" "}
                  of our respondents would choose a matching portion.
                </li>
                <li>
                  <b>Less methane</b> from Nam Sơn; supports Vietnam’s −30% methane plan and SDG 12.3.
                </li>
                <li>
                  <b>Replicable:</b> every campus canteen could copy it.
                </li>
              </ul>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 8px" }}>Step-by-step plan</h3>
          <PlanSteps sol="B" className="steps panel" style={{ padding: "6px 20px" }} />
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-coin"></use>
                </svg>
                <h3>Resources and cost</h3>
              </div>
              <ul className="clean small">
                <li>
                  Digital kitchen scale: <Field id="cost_b_scale">VND __</Field>
                </li>
                <li>
                  3 labelled bins: <Field id="cost_b_bins">VND __</Field>
                </li>
                <li>
                  Portion scoops (S/R/L): <Field id="cost_b_scoops">VND __</Field>
                </li>
                <li>
                  Signs and QR posters: <Field id="cost_b_signs">VND __</Field>
                </li>
                <li>Google Sheets and Forms: free</li>
                <li>Staff training: 1 hour</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-target"></use>
                </svg>
                <h3>How we measure</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Grams wasted per meal:</b> −15% (stretch −20 to −30%)
                </li>
                <li>Overproduction rate (prepared but unsold)</li>
                <li>Plate waste per meal</li>
                <li>Student satisfaction: no fall</li>
                <li>Staff workload: no unreasonable increase</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>Risks and safeguards</h3>
              </div>
              <ul className="clean small">
                <li>Manager says no → start with 2–3 dishes, show savings</li>
                <li>Wrong forecast on exam or holiday days → batch cooking, small buffer</li>
                <li>Students dislike smaller default → free refill, clear signs</li>
                <li>Inconsistent weighing → one scale, one sheet, fixed time</li>
              </ul>
            </div>
          </div>
          <div className="grid g2" style={{ marginTop: "16px" }}>
            <figure>
              <MediaSlot id="plan_b_1" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Solution B in action: weighing or portion signs</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_plan_b_1">caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="plan_b_2" className="media">
                <div className="ph">
                  <span className="ic">Screenshot</span>
                  <b>Our forecasting spreadsheet</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_plan_b_2">caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Tab id="sola" label="Plan · Solution A">
          <div className="planhead">
            <span className="badge" style={{ background: "var(--cA)" }}>
              A
            </span>
            <div>
              <div className="eyebrow">Supporting step · Sell the surplus · Weeks 7–10</div>
              <h2>Last-Hour Food Rescue</h2>
              <p className="muted">Sell genuine end-of-service surplus at a discount instead of binning it.</p>
            </div>
          </div>
          <div className="quick">
            <div>
              <span className="k">Owner</span>
              <span className="v">Canteen manager</span>
            </div>
            <div>
              <span className="k">Cost</span>
              <span className="v">Very low</span>
            </div>
            <div>
              <span className="k">Time to start</span>
              <span className="v">1 week</span>
            </div>
            <div>
              <span className="k">Main KPI</span>
              <span className="v">Share of surplus sold</span>
            </div>
          </div>
          <div className="grid g2f">
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-tag"></use>
                </svg>
                <h3>What is the solution?</h3>
              </div>
              <p className="small">
                Meals that are still safe but unsold in the last <b>30–60 minutes</b> are sold at a discount, for example 30–50% off a VND
                50,000 meal.
              </p>
              <ul className="clean small">
                <li>Announced on a notice board, a QR poster and student Zalo or Facebook groups.</li>
                <li>
                  Only for <b>unexpected</b> surplus, and not every day, so the kitchen never cooks extra to sell cheap.
                </li>
                <li>Food-safety rule: hot food kept above 60 °C and sold within 2 hours of cooking (WHO, 2006).</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-users"></use>
                </svg>
                <h3>Who is in charge?</h3>
              </div>
              <div className="tbl">
                <table className="roles">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>Canteen manager</b> (owner)
                      </td>
                      <td>Sets the discount, time window and eligible dishes; accountable</td>
                    </tr>
                    <tr>
                      <td>Kitchen supervisor</td>
                      <td>Decides each day which dishes are safe to offer</td>
                    </tr>
                    <tr>
                      <td>Cashier</td>
                      <td>Applies the discount; records meals sold</td>
                    </tr>
                    <tr>
                      <td>
                        Communications lead (<Field id="pa_comms">name</Field>)
                      </td>
                      <td>QR poster; “last call” messages in student groups</td>
                    </tr>
                    <tr>
                      <td>
                        Data lead (<Field id="pa_data">name</Field>)
                      </td>
                      <td>Records meals offered, sold and still binned each day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-scale"></use>
                </svg>
                <h3>Connection to ethics</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Utilitarianism:</b> food gets eaten, students save money, the canteen recovers revenue.
                </li>
                <li>
                  <b>Justice (Rawls):</b> the benefit goes mostly to price-sensitive students.
                </li>
                <li>
                  <b>Kant (honesty):</b> clearly labelled as end-of-service surplus, with the time it was cooked.
                </li>
                <li>
                  <b>Risk, moral hazard (Carroll, virtue ethics):</b> a reliable discount could make the kitchen careless about
                  over-cooking.
                </li>
              </ul>
              <p className="small muted">Safeguards: not every day; prevention (B) stays the main KPI; food-safety time limit.</p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-heart"></use>
                </svg>
                <h3>How it makes a difference</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Cheaper meals</b> for students on tight budgets;{" "}
                  <span>
                    <SV k="abuy">__</SV>
                  </span>{" "}
                  of our respondents would buy one.
                </li>
                <li>
                  <b>Less food to landfill</b> on days when the forecast is wrong.
                </li>
                <li>
                  <b>Revenue recovered</b> helps the canteen keep normal prices stable.
                </li>
                <li>
                  <b>Normalises buying surplus food</b> without stigma.
                </li>
                <li>
                  <b>Almost free to copy</b> for any canteen, bakery or restaurant in Hanoi.
                </li>
              </ul>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 8px" }}>Step-by-step plan</h3>
          <PlanSteps sol="A" className="steps panel" style={{ padding: "6px 20px" }} />
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-coin"></use>
                </svg>
                <h3>Resources and cost</h3>
              </div>
              <ul className="clean small">
                <li>
                  A3 poster printing: <Field id="cost_a_poster">VND __</Field>
                </li>
                <li>
                  Price stickers: <Field id="cost_a_stickers">VND __</Field>
                </li>
                <li>QR code and student groups: free</li>
                <li>Record sheet in Google Sheets: free</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-target"></use>
                </svg>
                <h3>How we measure</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Share of offered surplus sold:</b> target ≥ 50%
                </li>
                <li>Kilograms of food not binned</li>
                <li>VND recovered</li>
                <li>Full-price sales: no fall</li>
                <li>Food-safety complaints: 0</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>Risks and safeguards</h3>
              </div>
              <ul className="clean small">
                <li>Customers wait for the discount → not every day, limited dishes</li>
                <li>Food held too long → 2-hour rule, kept hot</li>
                <li>Extra work for the cashier → one sticker, one tick on the sheet</li>
                <li>Becomes an excuse to over-cook → prevention KPI comes first</li>
              </ul>
            </div>
          </div>
          <figure style={{ marginTop: "16px" }}>
            <MediaSlot id="plan_a_1" className="media wide">
              <div className="ph">
                <span className="ic">Photo</span>
                <b>Last-hour poster or discounted meals</b>
              </div>
            </MediaSlot>
            <figcaption>
              <Field id="cap_plan_a_1">caption</Field>
            </figcaption>
          </figure>
        </Tab>
        <Tab id="solc" label="Plan · Solution C">
          <div className="planhead">
            <span className="badge" style={{ background: "var(--cC)" }}>
              C
            </span>
            <div>
              <div className="eyebrow">Supporting step · Share the rest · Weeks 3–12</div>
              <h2>Safe Redistribution of Surplus</h2>
              <p className="muted">Pass safe, untouched food that could not be sold to people who need it, through a trained partner.</p>
            </div>
          </div>
          <div className="quick">
            <div>
              <span className="k">Owner</span>
              <span className="v">Canteen manager + partner</span>
            </div>
            <div>
              <span className="k">Cost</span>
              <span className="v">Low (partner transports)</span>
            </div>
            <div>
              <span className="k">Time to start</span>
              <span className="v">6 weeks</span>
            </div>
            <div>
              <span className="k">Main KPI</span>
              <span className="v">0 safety incidents</span>
            </div>
          </div>
          <div className="grid g2f">
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-truck"></use>
                </svg>
                <h3>What is the solution?</h3>
              </div>
              <p className="small">Food still left after Solution A goes through a fixed process:</p>
              <p className="small">
                <b>Safety check → Packaging → Label with dish and time cooked → Chilled storage → Collected by a partner</b>
              </p>
              <ul className="clean small">
                <li>Partners: Hanoi Food Rescue, VietHarvest or Food Bank Vietnam.</li>
                <li>
                  <b>Never</b> plate leftovers or food with an uncertain storage history.
                </li>
                <li>Food is presented as rescued surplus, not “leftovers”.</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-users"></use>
                </svg>
                <h3>Who is in charge?</h3>
              </div>
              <div className="tbl">
                <table className="roles">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>Canteen manager</b> (owner)
                      </td>
                      <td>Signs the written agreement with the partner; accountable</td>
                    </tr>
                    <tr>
                      <td>Kitchen supervisor</td>
                      <td>Safety check, packing, labelling, records</td>
                    </tr>
                    <tr>
                      <td>Partner organisation</td>
                      <td>Collects on a fixed schedule; distributes with dignity</td>
                    </tr>
                    <tr>
                      <td>
                        Partnership lead (<Field id="pc_partner">name</Field>)
                      </td>
                      <td>Contacts partners, drafts the protocol, books pickups</td>
                    </tr>
                    <tr>
                      <td>University administration</td>
                      <td>Approves; advises on liability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-scale"></use>
                </svg>
                <h3>Connection to ethics</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Kant:</b> meets the imperfect duty of beneficence, and treats recipients as ends: safe food, delivered with dignity.
                </li>
                <li>
                  <b>Rawls and Young:</b> moves benefits to the least advantaged; larger organisations carry more responsibility.
                </li>
                <li>
                  <b>Carroll:</b> philanthropy must not replace prevention, so nothing is ever cooked “for donation”.
                </li>
                <li>
                  <b>The legal gap:</b> no Good Samaritan law, so a written protocol and a trained partner reduce the risk.
                </li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-heart"></use>
                </svg>
                <h3>How it makes a difference</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Meals for people in need:</b> patients’ families at K Hospital, low-income students and workers.
                </li>
                <li>
                  <b>Connects the campus to the community</b>;{" "}
                  <span>
                    <SV k="ccomfort">__</SV>
                  </span>{" "}
                  of our respondents are comfortable with it.
                </li>
                <li>
                  <b>Shows safe donation is possible</b> despite the legal gap, which is evidence for a future Good Samaritan law.
                </li>
                <li>
                  <b>Less food to landfill.</b>
                </li>
              </ul>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 8px" }}>Step-by-step plan</h3>
          <PlanSteps sol="C" className="steps panel" style={{ padding: "6px 20px" }} />
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-coin"></use>
                </svg>
                <h3>Resources and cost</h3>
              </div>
              <ul className="clean small">
                <li>
                  Food-safe containers: <Field id="cost_c_boxes">VND __</Field>
                </li>
                <li>
                  Labels: <Field id="cost_c_labels">VND __</Field>
                </li>
                <li>Fridge space in the canteen</li>
                <li>Transport: provided by the partner</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-target"></use>
                </svg>
                <h3>How we measure</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Food-safety incidents: 0</b>
                </li>
                <li>Meals and kilograms redistributed</li>
                <li>Partner and recipient feedback</li>
                <li>Prevention KPI not getting worse</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>Risks and safeguards</h3>
              </div>
              <ul className="clean small">
                <li>Unsafe food → “If in doubt, do not donate”, WHO Five Keys</li>
                <li>Partner misses a pickup → a back-up partner</li>
                <li>Liability → written protocol and university advice</li>
                <li>Over-cooking to donate → refused; prevention first</li>
              </ul>
            </div>
          </div>
          <figure style={{ marginTop: "16px" }}>
            <MediaSlot id="plan_c_1" className="media wide">
              <div className="ph">
                <span className="ic">Photo</span>
                <b>Packed, labelled surplus or the partner pickup</b>
              </div>
            </MediaSlot>
            <figcaption>
              <Field id="cap_plan_c_1">caption</Field>
            </figcaption>
          </figure>
        </Tab>
        <Tab id="kpis" label="How we measure">
          <div className="tab-title">
            <h2>How we measure success</h2>
          </div>
          <p className="tab-intro">Six indicators. Yellow fields are filled in by the team from the audit.</p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>KPI</th>
                  <th>Formula</th>
                  <th>Baseline</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Food waste per meal</b>
                  </td>
                  <td>Total food waste (g) ÷ meals served</td>
                  <td>
                    <Field id="k_wpm">__ g</Field>
                  </td>
                  <td>−15% (stretch −20 to −30%)</td>
                </tr>
                <tr>
                  <td>Overproduction rate</td>
                  <td>(Prepared − sold) ÷ prepared</td>
                  <td>
                    <Field id="k_over">__%</Field>
                  </td>
                  <td>
                    <Field id="k_over_t">__%</Field>
                  </td>
                </tr>
                <tr>
                  <td>Plate waste per meal</td>
                  <td>Plate waste (g) ÷ meals served</td>
                  <td>
                    <Field id="k_plate">__ g</Field>
                  </td>
                  <td>
                    <Field id="k_plate_t">__ g</Field>
                  </td>
                </tr>
                <tr>
                  <td>Ingredients bought but unused</td>
                  <td>kg purchased − kg used</td>
                  <td>
                    <Field id="k_unused">__ kg/week</Field>
                  </td>
                  <td>Lower</td>
                </tr>
                <tr>
                  <td>Student satisfaction</td>
                  <td>Mean score, 1–5</td>
                  <td>
                    <Field id="k_sat">__</Field>
                  </td>
                  <td>No fall</td>
                </tr>
                <tr>
                  <td>Staff workload</td>
                  <td>Staff feedback</td>
                  <td>
                    <Field id="k_staff">__</Field>
                  </td>
                  <td>No unreasonable increase</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="panel" style={{ marginTop: "16px" }}>
            <p>
              <b>Waste reduction (%) = (baseline − pilot) ÷ baseline × 100.</b>
            </p>
            <p className="small muted" style={{ marginTop: "6px" }}>
              Example with the Hanoi school benchmark: from 118 g to 89 g per meal is (118 − 89) ÷ 118 × 100 ={" "}
              <span className="hl">24.6%</span>.
            </p>
          </div>
        </Tab>
        <Tab id="team" label="Our team">
          <div className="tab-title">
            <h2>Who did what</h2>
          </div>
          <p className="tab-intro">Every member had a clear role and left evidence of their contribution.</p>
          <TeamCards className="grid g3" />
        </Tab>
        <Tab id="risks" label="Risks">
          <div className="tab-title">
            <h2>Risk management</h2>
          </div>
          <p className="tab-intro">What could go wrong, and what we planned to do about it.</p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Risk</th>
                  <th>Likelihood</th>
                  <th>Impact</th>
                  <th>How we manage it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Canteen does not agree to the pilot</td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>
                    <span className="pill lo">High</span>
                  </td>
                  <td>Start with 2–3 dishes; show the cost savings; involve the manager in the design.</td>
                </tr>
                <tr>
                  <td>Forecast is wrong on unusual days (exams, holidays)</td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>Batch cooking; a small safety buffer; adjust weekly.</td>
                </tr>
                <tr>
                  <td>Students dislike smaller default portions</td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>Free refill; clear signs; daily feedback.</td>
                </tr>
                <tr>
                  <td>Staff see weighing as extra work</td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>Part of the shift; under 10 minutes; thank staff publicly.</td>
                </tr>
                <tr>
                  <td>Inconsistent measurement</td>
                  <td>
                    <span className="pill md">Medium</span>
                  </td>
                  <td>
                    <span className="pill lo">High</span>
                  </td>
                  <td>One scale, one sheet, a fixed weighing time, trained team members.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab id="actions" label="Evidence of action">
          <div className="tab-title">
            <h2>What we actually did</h2>
          </div>
          <p className="tab-intro">Our action log and photos from each step.</p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Action</th>
                  <th>Who</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <ActionLog />
            </table>
          </div>
          <div className="grid g3" style={{ marginTop: "18px" }}>
            <figure>
              <MediaSlot id="act_meeting" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Meeting with the canteen manager</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_act_meeting">date and caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="act_weigh" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Baseline weighing: scale and bins</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_act_weigh">date and caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="act_training" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Staff training session</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_act_training">date and caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="act_survey" className="media">
                <div className="ph">
                  <span className="ic">Screenshot</span>
                  <b>Our survey</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_act_survey">date and caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="act_pilot" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>The pilot running</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_act_pilot">date and caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="act_video" className="media">
                <div className="ph">
                  <span className="ic">Video</span>
                  <b>Behind the scenes</b>
                  <span className="small muted">MP4 or WebM, under 20 MB</span>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_act_video">date and caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
