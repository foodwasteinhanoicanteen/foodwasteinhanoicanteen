// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import {
  CopyButton,
  DemoText,
  FeatureFilters,
  FeatureGrid,
  Field,
  ForecastFormula,
  ForecastInput,
  ForecastNote,
  ForecastOut,
  ForecastTable,
  MediaSlot,
  PhonePreview,
  ProtocolDownload,
} from "../components";

export default function AppPage() {
  return (
    <PageSection id="app">
      <div className="wrap phead">
        <StageStepper current={6} />
        <div className="eyebrow">
          <span>Step 6 · Prototype</span>
          <span className="rubric">Rubrics 2 &amp; 3 · Creativity and planning</span>
        </div>
        <h1>CampusMeal app</h1>
        <p className="lede">
          Our app idea, a new section of the MyVinUni app, turns Solution B into something students and the kitchen use every day, and links
          in A and C.
        </p>
        <div className="takeaways">
          <div>
            <svg className="ic">
              <use href="#i-users"></use>
            </svg>
            <b>3</b>
            <span>canteens: Little Kitchen, Foodology, Our Home</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-bulb"></use>
            </svg>
            <b>14</b>
            <span>functions: 3 core, 11 new</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-clock"></use>
            </svg>
            <b>10:00</b>
            <span>daily pre-order cut-off</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-shield"></use>
            </svg>
            <b>16</b>
            <span>sections in the operating protocol</span>
          </div>
        </div>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="overview" label="What it is">
          <div className="grid g2" style={{ alignItems: "center" }}>
            <div className="stack">
              <div className="eyebrow">A new section of the MyVinUni app</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3.4vw,2.6rem)" }}>CampusMeal</h2>
              <p style={{ fontSize: "1.08rem" }}>
                Students see today’s meals, pre-order, choose their portion and rate next week’s menu. The kitchen gets a forecast of how
                much to cook. <b>Less guessing, less waste.</b>
              </p>
              <div className="quick">
                <div>
                  <span className="k">For</span>
                  <span className="v">VinUni students and staff</span>
                </div>
                <div>
                  <span className="k">Canteens</span>
                  <span className="v">Little Kitchen · Foodology · Our Home (V-food, V-Halal)</span>
                </div>
                <div>
                  <span className="k">Supports</span>
                  <span className="v">Solution B, plus A and C</span>
                </div>
                <div>
                  <span className="k">Status</span>
                  <span className="v">Working pilot app</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a className="btn" href="campusmeal.html">
                  Open the working app ↗
                </a>
                <button className="btn ghost" data-go="app-demo">
                  Quick preview
                </button>
                <button className="btn ghost" data-go="app-protocol">
                  Read the protocol
                </button>
              </div>
            </div>
            <div className="phonepair" aria-hidden="true">
              <div className="phone mini">
                <div className="ph-top">
                  <b>CampusMeal</b>
                  <span>Today</span>
                </div>
                <div className="ph-body">
                  <div className="ph-chip on">Little Kitchen</div>
                  <div className="ph-dish">
                    <span className="ph-thumb" style={{ background: "#E8B04A" }}></span>
                    <div>
                      <b>Teriyaki chicken</b>
                      <span>Pre-order by 10:00</span>
                    </div>
                  </div>
                  <div className="ph-dish">
                    <span className="ph-thumb" style={{ background: "#D9774B" }}></span>
                    <div>
                      <b>Sweet &amp; sour chicken</b>
                      <span>with fried rice</span>
                    </div>
                  </div>
                  <div className="ph-portion">
                    <span>S</span>
                    <span className="on">R</span>
                    <span>L</span>
                  </div>
                </div>
              </div>
              <div className="phone mini">
                <div className="ph-top">
                  <b>Kitchen</b>
                  <span>Forecast</span>
                </div>
                <div className="ph-body">
                  <div className="ph-row">
                    <span>Pre-orders</span>
                    <b>40</b>
                  </div>
                  <div className="ph-row">
                    <span>Expected walk-ins</span>
                    <b>72</b>
                  </div>
                  <div className="ph-row big">
                    <span>Cook today</span>
                    <b>112</b>
                  </div>
                  <div className="ph-row">
                    <span>First batch</span>
                    <b>90</b>
                  </div>
                  <div className="ph-bar">
                    <i style={{ width: "80%" }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 style={{ margin: "30px 0 12px" }}>The problem it solves</h3>
          <div className="grid g3">
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-search"></use>
                </svg>
                <h3>Kitchens cook blind</h3>
              </div>
              <p className="small">
                Without demand data, cooks prepare the same amount every day “so we never run out”. That is the overproduction root cause.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-plate"></use>
                </svg>
                <h3>One portion for everyone</h3>
              </div>
              <p className="small">
                Students with smaller appetites cannot choose less, so food is left on plates. That is the oversized-portion root cause.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-bin"></use>
                </svg>
                <h3>Surplus is invisible</h3>
              </div>
              <p className="small">
                When food is left at closing, nobody outside the kitchen knows, so it is binned instead of sold or shared.
              </p>
            </div>
          </div>
          <h3 style={{ margin: "30px 0 12px" }}>How the app connects the three solutions</h3>
          <div className="flow">
            <div>
              <span className="lv">Student</span>
              <b>Rate &amp; pre-order</b>
              <span className="small">Weekly interest ratings, pre-orders, portion choice</span>
            </div>
            <div className="top">
              <span className="lv">Solution B</span>
              <b>Forecast &amp; batch cook</b>
              <span className="small">Kitchen cooks to the forecast in small batches</span>
            </div>
            <div>
              <span className="lv">Solution A</span>
              <b>Last call</b>
              <span className="small">Alert when genuine surplus is left</span>
            </div>
            <div>
              <span className="lv">Solution C</span>
              <b>Share</b>
              <span className="small">Log safe surplus for partner pickup</span>
            </div>
            <div>
              <span className="lv">Learn</span>
              <b>Feedback &amp; data</b>
              <span className="small">Finish-check, waste log, weekly report</span>
            </div>
          </div>
          <div className="grid g2" style={{ marginTop: "18px" }}>
            <figure>
              <MediaSlot id="app_shot_1" className="media">
                <div className="ph">
                  <span className="ic">Screenshot</span>
                  <b>Our app design (Figma or Canva)</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_app_shot_1">caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="app_shot_2" className="media">
                <div className="ph">
                  <span className="ic">Screenshot or video</span>
                  <b>App walkthrough</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_app_shot_2">caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Tab id="demo" label="Quick preview">
          <div className="tab-title">
            <h2>Quick preview</h2>
          </div>
          <p className="tab-intro">
            A phone-sized preview of the student side. The <b>full working app</b> is separate: students pre-order, choose portions and rate
            menus, and the kitchen gets a live forecast, pickup list, last call, donation log, waste log, insights and a weekly report.
          </p>
          <div className="callout g" style={{ marginBottom: "16px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <span>
              <b>CampusMeal is built and working.</b> Try the demo: it starts with six weeks of sample data, and everything you do stays in your own browser.
            </span>
            <a className="btn" href="campusmeal.html">
              Open CampusMeal ↗
            </a>
          </div>
          <div className="demo-wrap">
            <PhonePreview className="phone" />
            <div className="stack" style={{ maxWidth: "46ch" }}>
              <div className="panel stack">
                <span className="eyebrow">What this screen does</span>
                <DemoText part="h" />
                <DemoText part="p" />
                <p className="small">
                  <b>Supports:</b> <DemoText part="s" />
                </p>
              </div>
              <p className="small muted">
                Dish names come from our CampusMeal overview. V-food and V-Halal dishes are left for the team to insert. Prices are not
                shown because they are set by each canteen.
              </p>
            </div>
          </div>
        </Tab>
        <Tab id="features" label="All functions">
          <div className="tab-title">
            <h2>All functions</h2>
          </div>
          <p className="tab-intro">
            <span className="pill hi">Core</span> = in our original CampusMeal overview. <span className="pill md">New</span> = added to
            make the app support Solution B fully, and to link in A and C.
          </p>
          <FeatureFilters className="filters" />
          <FeatureGrid className="grid g3" />
        </Tab>
        <Tab id="kitchen" label="Kitchen forecast">
          <div className="tab-title">
            <h2>How the kitchen forecast works</h2>
          </div>
          <p className="tab-intro">The heart of Solution B. Change the numbers to see how much the kitchen should cook.</p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>One dish, one day</h3>
              <div className="calc">
                <label htmlFor="k-pre">
                  Pre-orders at 10:00
                  <ForecastInput name="pre" type="number" min="0" defaultValue="40" />
                </label>
                <label htmlFor="k-walk">
                  Average walk-ins (same weekday, last 4 weeks)
                  <ForecastInput name="walk" type="number" min="0" defaultValue="60" />
                </label>
                <label htmlFor="k-int">
                  Average interest rating (1–5)
                  <ForecastInput name="int" type="number" min="1" max="5" step="0.1" defaultValue="3.6" />
                </label>
                <label htmlFor="k-batch">
                  Batch size (portions)
                  <ForecastInput name="batch" type="number" min="1" defaultValue="10" />
                </label>
                <label htmlFor="k-old">
                  What the kitchen used to cook
                  <ForecastInput name="old" type="number" min="0" defaultValue="130" />
                </label>
              </div>
              <ForecastFormula className="formula" />
            </div>
            <div className="panel stack">
              <h3>Result</h3>
              <ForecastOut className="stats" />
              <ForecastNote className="chart-detail small" />
            </div>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Example kitchen dashboard</h3>
          <p className="small muted" style={{ marginBottom: "10px" }}>
            Example numbers to show the layout, not real data.
          </p>
          <div className="tbl">
            <ForecastTable />
          </div>
          <details className="acc" style={{ marginTop: "16px" }}>
            <summary>The forecasting rule in words</summary>
            <div className="in">
              <p>
                <b>Forecast</b> = pre-orders + expected walk-ins.
              </p>
              <p>
                <b>Expected walk-ins</b> = average walk-ins for this dish on this weekday over the last 4 weeks × an interest factor. The
                interest factor is the average rating ÷ 3, kept between 0.7 and 1.3, so a popular dish gets a little more and an unpopular
                one a little less.
              </p>
              <p>
                <b>First batch</b> = 80% of the forecast, rounded up to a full batch. More batches are cooked only when stock runs low.
              </p>
              <p>
                <b>No history yet?</b> Use the average sold for similar dishes until four weeks of data exist.
              </p>
              <p>
                <b>Check:</b> if the forecast is more than 20% off for three days in a row, the data lead recalibrates it.
              </p>
            </div>
          </details>
        </Tab>
        <Tab id="protocol" label="App protocol">
          <div className="tab-title">
            <h2>CampusMeal operating protocol</h2>
          </div>
          <p className="tab-intro">
            The rules for how the app, the kitchen and the team work together during the pilot. Version 1.0, a draft for the canteen manager
            and university IT to approve.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
            <ProtocolDownload className="btn" type="button" hidden />
            <CopyButton target="protocol-doc" className="btn ghost" type="button">
              Copy protocol text
            </CopyButton>
          </div>
          <div className="panel protocol" id="protocol-doc">
            <h3>CampusMeal Operating Protocol · v1.0 (pilot draft)</h3>
            <p className="small muted">Owner: canteen manager · Prepared by: MANA3021 project team · Review: after pilot weeks 6 and 12</p>
            <h4>1. Purpose</h4>
            <p>
              Help VinUni canteens cook and serve the right amount of food, so less safe food is thrown away, while protecting choice, food
              safety, fairness and privacy. Pilot target: <b>at least 15% less food waste per meal</b> with no fall in satisfaction.
            </p>
            <h4>2. Scope</h4>
            <ul className="clean">
              <li>Canteens: Little Kitchen, Foodology, Our Home (V-food and V-Halal counters).</li>
              <li>Service: lunch during the pilot; dinner may be added after review.</li>
              <li>
                Users: students and staff with a MyVinUni account. <b>Walk-in customers without the app are always served.</b>
              </li>
            </ul>
            <h4>3. Roles and responsibilities</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Responsibilities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Canteen manager</b> (protocol owner)
                    </td>
                    <td>Approves menus, portion sizes, discounts and partner agreements; accountable for results and food safety</td>
                  </tr>
                  <tr>
                    <td>Kitchen supervisor</td>
                    <td>
                      Confirms the daily forecast (override allowed, with a reason logged); runs batch cooking; decides last-call and
                      donation eligibility
                    </td>
                  </tr>
                  <tr>
                    <td>Kitchen staff</td>
                    <td>Serve standard portions with standard scoops; weigh and log waste daily</td>
                  </tr>
                  <tr>
                    <td>Cashier</td>
                    <td>Confirms pre-orders at pickup; sells last-call meals; records sales</td>
                  </tr>
                  <tr>
                    <td>Project data lead</td>
                    <td>Maintains the forecast settings; prepares the weekly report; recalibrates when forecasts drift</td>
                  </tr>
                  <tr>
                    <td>MyVinUni app admin (university IT)</td>
                    <td>Accounts, notifications, data security, data deletion</td>
                  </tr>
                  <tr>
                    <td>Partner organisation</td>
                    <td>Collects donated food on schedule; distributes with dignity; reports problems</td>
                  </tr>
                  <tr>
                    <td>Users (students and staff)</td>
                    <td>Pre-order and rate menus voluntarily; collect orders on time; give feedback</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>4. Weekly cycle</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>When</th>
                    <th>What happens</th>
                    <th>Who</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mono">Thu 17:00</td>
                    <td>Next week’s menu is published in the app for all canteens</td>
                    <td>Canteen manager</td>
                  </tr>
                  <tr>
                    <td className="mono">Thu–Sun 20:00</td>
                    <td>Users rate their interest in each dish, 1 (not interested) to 5 (very interested). Optional.</td>
                    <td>Users</td>
                  </tr>
                  <tr>
                    <td className="mono">Mon 08:00</td>
                    <td>Interest summary goes to the kitchen; ingredient orders are adjusted</td>
                    <td>App → kitchen supervisor</td>
                  </tr>
                  <tr>
                    <td className="mono">Fri 16:00</td>
                    <td>Weekly report: waste per meal, overproduction, last calls, donations, feedback</td>
                    <td>Data lead → canteen manager</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>5. Daily cycle (lunch)</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Step</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mono">18:00 (day before)</td>
                    <td>Pre-orders open</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">10:00</td>
                    <td>Pre-orders close</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">10:05</td>
                    <td>The app calculates the forecast and batch plan for each dish</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">10:15</td>
                    <td>Kitchen supervisor confirms or overrides the plan (reason logged)</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">11:00</td>
                    <td>Service starts; first batch = 80% of the forecast</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">11:00–13:00</td>
                    <td>The app alerts the kitchen when stock of a dish falls below one batch; another batch is cooked only if needed</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">11:30</td>
                    <td>Pickup reminder to users with an uncollected pre-order</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">12:30</td>
                    <td>Uncollected pre-orders are released for walk-in sale</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">13:15</td>
                    <td>Surplus check; last call sent if the rules in section 9 are met</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td className="mono">13:45</td>
                    <td>
                      Service ends; eligible food is chilled and labelled for the partner (section 10); the rest is sorted for compost
                    </td>
                    <td>C</td>
                  </tr>
                  <tr>
                    <td className="mono">14:00</td>
                    <td>Waste is weighed and logged: preparation, overproduction, plate waste</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">14:15</td>
                    <td>One-tap finish-check sent to users who ordered</td>
                    <td>B</td>
                  </tr>
                  <tr>
                    <td className="mono">15:00</td>
                    <td>Dashboard updated</td>
                    <td>All</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>6. Forecasting rule</h4>
            <p>
              <b>Forecast = pre-orders + expected walk-ins.</b> Expected walk-ins = the average walk-ins for that dish on that weekday over
              the last 4 weeks × the interest factor (average rating ÷ 3, kept between 0.7 and 1.3). With no history, use the average sold
              for similar dishes.
            </p>
            <p>
              <b>First batch</b> = 80% of the forecast, rounded up to a full batch (10 portions by default). Top-up batches are cooked only
              when stock falls below one batch.
            </p>
            <p>
              <b>Worked example:</b> 40 pre-orders; 60 average walk-ins; average rating 3.6, so the factor is 1.2 and expected walk-ins are
              72. Forecast = 112. First batch = 90.
            </p>
            <p>
              <b>Recalibration:</b> if the forecast is more than 20% off for three service days in a row, the data lead reviews the
              settings.
            </p>
            <h4>7. Portion rule</h4>
            <ul className="clean">
              <li>
                Three sizes using standard scoops. Proposed rice weights: <b>Small 100 g, Regular 150 g (default), Large 200 g</b>.
              </li>
              <li>
                <b>Free refill</b> of rice and vegetables at the counter, on request.
              </li>
              <li>Small portions cost less than Regular; the difference is set by the canteen manager.</li>
            </ul>
            <h4>8. Pre-orders and no-shows</h4>
            <ul className="clean">
              <li>Payment method (in the app or at the counter) is set by the canteen and university IT.</li>
              <li>A reminder is sent at 11:30; uncollected orders are released at 12:30.</li>
              <li>
                After 3 no-shows in 2 weeks, pre-ordering is paused for 7 days, with notice. <b>No fines.</b>
              </li>
            </ul>
            <h4>9. Last-call rule (Solution A)</h4>
            <ul className="clean">
              <li>
                Sent only if, at 13:15, there are at least 10 safe portions of a dish that were cooked no more than 2 hours earlier and kept
                hot above 60 °C (WHO, 2006).
              </li>
              <li>Discount of 30–50%; the app shows the quantity left and the pickup deadline (13:45).</li>
              <li>At most one last call per canteen per day.</li>
              <li>
                <b>Prevention comes first:</b> the kitchen never cooks extra for a last call. If a canteen sends last calls on more than 3
                days in a week, its forecast is reviewed.
              </li>
            </ul>
            <h4>10. Redistribution rule (Solution C)</h4>
            <ul className="clean">
              <li>
                <b>Eligible:</b> food cooked that day, never served, untouched, held safely.
              </li>
              <li>
                <b>Never eligible:</b> plate leftovers; food with an unknown storage history. If in doubt, do not donate.
              </li>
              <li>
                Pack in food-safe containers; label with dish name and time cooked; refrigerate promptly, preferably below 5 °C (WHO, 2006).
              </li>
              <li>Collected the same day by a partner under a written agreement; every handover is recorded.</li>
              <li>Food is never cooked “for donation”.</li>
            </ul>
            <h4>11. Feedback and waste data</h4>
            <ul className="clean">
              <li>Finish-check: “How much did you finish?” (All / Most / Half / A little) plus an optional reason.</li>
              <li>If a dish has 30% or more “Half” or “A little” answers for 2 weeks, the kitchen reviews its recipe or portion.</li>
              <li>Waste is recorded per dish and per day, never per staff member.</li>
            </ul>
            <h4>12. Data and privacy</h4>
            <ul className="clean">
              <li>
                <b>Collected:</b> account ID, orders, portion size, ratings, feedback. Nothing else.
              </li>
              <li>
                <b>Purpose:</b> forecasting and improving menus only; never marketing.
              </li>
              <li>The kitchen sees only totals, and no total based on fewer than 5 people.</li>
              <li>Individual data is deleted at the end of each semester; anonymous totals are kept for reports.</li>
              <li>Users agree on first use and can switch off feedback prompts at any time.</li>
              <li>Handled in line with Vietnam’s Decree No. 13/2023/NĐ-CP on personal data protection and VinUni’s own data policy.</li>
            </ul>
            <h4>13. Ethical safeguards</h4>
            <ul className="clean">
              <li>No public leaderboards or shaming; each user’s impact is shown privately.</li>
              <li>Walk-ins are always served; the app is never required to eat.</li>
              <li>Vietnamese and English; dietary labels (V-Halal, vegetarian, allergens) are checked by the canteen before publishing.</li>
              <li>Staff are never blamed for waste figures; the data is used to improve the system.</li>
              <li>Results are reported honestly, including when targets are missed.</li>
            </ul>
            <h4>14. KPIs and reporting</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>KPI</th>
                    <th>Target</th>
                    <th>Reviewed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Food waste per meal (g)</td>
                    <td>−15% vs baseline (stretch −20 to −30%)</td>
                    <td>Weekly</td>
                  </tr>
                  <tr>
                    <td>Forecast error</td>
                    <td>Within ±20%</td>
                    <td>Daily</td>
                  </tr>
                  <tr>
                    <td>Share of meals pre-ordered</td>
                    <td>Rising over the pilot</td>
                    <td>Weekly</td>
                  </tr>
                  <tr>
                    <td>Last calls per week</td>
                    <td>3 or fewer per canteen</td>
                    <td>Weekly</td>
                  </tr>
                  <tr>
                    <td>Food-safety incidents</td>
                    <td>0</td>
                    <td>Every incident</td>
                  </tr>
                  <tr>
                    <td>Student satisfaction (1–5)</td>
                    <td>No fall</td>
                    <td>Monthly</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>15. Incidents and fallback</h4>
            <ul className="clean">
              <li>
                <b>Food-safety concern:</b> stop last calls and donations immediately; inform the canteen manager and partner; record it;
                review within 48 hours.
              </li>
              <li>
                <b>App outage:</b> switch to the Google Form back-up for pre-orders and use last week’s average batch plan.
              </li>
              <li>
                <b>Changes to this protocol:</b> proposed by the project team, approved by the canteen manager, and announced in the app.
              </li>
            </ul>
            <h4>16. Review</h4>
            <p>
              This protocol is reviewed after pilot week 6 and week 12, using the KPIs above and feedback from students, staff and partners.
            </p>
          </div>
        </Tab>
        <Tab id="rollout" label="Build & test plan">
          <div className="tab-title">
            <h2>How we build and test it</h2>
          </div>
          <p className="tab-intro">
            Design thinking says: prototype cheaply, test with real users, then build. We do not need a finished app to start reducing
            waste.
          </p>
          <ol className="steps panel" style={{ padding: "6px 20px" }}>
            <li>
              <span className="wk">
                Phase 0
                <br />
                W1–4
              </span>
              <div>
                <h4>Low-fidelity prototype</h4>
                <p className="small">
                  Google Form for pre-orders and weekly ratings, Google Sheet for the forecast. Tests the idea with no development cost.
                </p>
                <p className="out">Proves students will pre-order and rate.</p>
              </div>
            </li>
            <li>
              <span className="wk">
                Phase 1
                <br />
                W4–6
              </span>
              <div>
                <h4>Pilot app + usability test</h4>
                <p className="small">
                  The working <a href="campusmeal.html">CampusMeal pilot app</a> tested with 5–8 students and the kitchen supervisor. Tasks:
                  find today’s meal, pre-order a Small portion, rate next week’s menu, answer the finish-check; for staff, record a batch
                  and mark a pickup. Success: each task completed in under one minute without help.
                </p>
                <p className="out">Fixes confusing screens before the canteen relies on it.</p>
              </div>
            </li>
            <li>
              <span className="wk">
                Phase 2
                <br />
                after pilot
              </span>
              <div>
                <h4>Move into MyVinUni</h4>
                <p className="small">
                  Today’s meal, pre-order with portion choice, weekly interest ratings, kitchen forecast view. Proposed to university IT
                  with the pilot results.
                </p>
                <p className="out">The core of Solution B, digitised.</p>
              </div>
            </li>
            <li>
              <span className="wk">
                Phase 3
                <br />
                later
              </span>
              <div>
                <h4>Full version</h4>
                <p className="small">
                  Last-call alerts (A), surplus and donation log (C), finish-check feedback, menu insights and the weekly report.
                </p>
                <p className="out">Connects all three solutions.</p>
              </div>
            </li>
          </ol>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-users"></use>
                </svg>
                <h3>Not everyone uses the app</h3>
              </div>
              <p className="small">Walk-in customers are always served. The forecast already includes walk-ins, so nobody is excluded.</p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-shield"></use>
                </svg>
                <h3>Privacy</h3>
              </div>
              <p className="small">
                The kitchen sees only totals, never who ordered what. Personal data is deleted at the end of each semester.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>No-shows</h3>
              </div>
              <p className="small">
                Reminders, then unclaimed orders are released for walk-ins. No fines; repeated no-shows only pause pre-ordering for a week.
              </p>
            </div>
          </div>
          <div className="grid g2" style={{ marginTop: "16px" }}>
            <figure>
              <MediaSlot id="app_test_1" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Usability test with students</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_app_test_1">caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="app_test_2" className="media">
                <div className="ph">
                  <span className="ic">Screenshot</span>
                  <b>Google Form prototype</b>
                </div>
              </MediaSlot>
              <figcaption>
                <Field id="cap_app_test_2">caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
