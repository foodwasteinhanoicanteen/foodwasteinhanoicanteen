// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import { Card, Field, FilterButtons, Front, MediaSlot, More, SV, ScoreBars, ScoreCalc, WeightReset, WeightSliders } from "../components";

export default function SolutionPage() {
  return (
    <PageSection id="solution">
      <div className="wrap phead">
        <StageStepper current={3} />
        <div className="eyebrow">
          <span>Step 3 · Ideate</span>
          <span className="rubric">Rubric 2 · Idea &amp; creativity</span>
        </div>
        <h1>Our solutions</h1>
        <p className="lede">
          We present our three shortlisted solutions, what each does and where it falls short, then analyse them against four weighted
          criteria before asking people in the survey.
        </p>
        <div className="takeaways">
          <div>
            <svg className="ic">
              <use href="#i-tag"></use>
            </svg>
            <b>A</b>
            <span>sells surplus that already exists</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-target"></use>
            </svg>
            <b>B</b>
            <span>prevents waste at the root cause</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-truck"></use>
            </svg>
            <b>C</b>
            <span>shares what is left with people in need</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-chart"></use>
            </svg>
            <b>4.30 / 5</b>
            <span>B’s score in our weighted analysis</span>
          </div>
        </div>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="process" label="How we got here">
          <div className="tab-title">
            <h2>How we designed our response</h2>
          </div>
          <p className="tab-intro">We followed the design-thinking process the brief asks for. Each step changed what came next.</p>
          <ol className="steps panel" style={{ padding: "6px 20px" }}>
            <li>
              <span className="wk">
                <svg className="ic">
                  <use href="#i-search"></use>
                </svg>
                <br />
                Empathise
              </span>
              <div>
                <h4>Understand the people and the problem</h4>
                <p className="small">
                  Desk research (48 sources, 8 laws), observing our canteen at lunchtime, talking to the canteen manager and kitchen staff,
                  and a survey of{" "}
                  <span>
                    <SV k="n">50</SV>
                  </span>{" "}
                  people.
                </p>
                <p className="out">
                  Found: waste is decided by the business (portions, quantities), and the people most affected have the least say.
                </p>
              </div>
            </li>
            <li>
              <span className="wk">
                <svg className="ic">
                  <use href="#i-flag"></use>
                </svg>
                <br />
                Define
              </span>
              <div>
                <h4>Frame the problem ethically</h4>
                <p className="small">
                  Problem statement, eight ethical lenses, and our “How might we” question:{" "}
                  <em>
                    How might we help our canteen cook and serve the right amount of food, so less safe food is thrown away, without making
                    students pay more or eat less?
                  </em>
                </p>
                <p className="out">Decided: prevention first, rescue second, redistribute safely third.</p>
              </div>
            </li>
            <li>
              <span className="wk">
                <svg className="ic">
                  <use href="#i-bulb"></use>
                </svg>
                <br />
                Ideate
              </span>
              <div>
                <h4>Generate and filter ideas</h4>
                <p className="small">
                  Six ideas, from fines to AI cameras. Each judged on effectiveness, feasibility, ethics and support, with weights and a
                  stress test.
                </p>
                <p className="out">Shortlisted A, B and C; chose B as the main solution and combined all three.</p>
              </div>
            </li>
            <li>
              <span className="wk">
                <svg className="ic">
                  <use href="#i-flask"></use>
                </svg>
                <br />
                Test ideas
              </span>
              <div>
                <h4>Ask the people affected</h4>
                <p className="small">Survey ratings analysed with one-way ANOVA and Tukey post-hoc tests, plus robustness checks.</p>
                <p className="out">
                  Result:{" "}
                  <span>
                    <SV k="tk">B &gt; A, C</SV>
                  </span>{" "}
                  on effectiveness; A seen as most feasible, so B is phased in step by step.
                </p>
              </div>
            </li>
            <li>
              <span className="wk">
                <svg className="ic">
                  <use href="#i-play"></use>
                </svg>
                <br />
                Prototype
              </span>
              <div>
                <h4>Plan and pilot</h4>
                <p className="small">A 12-week roadmap with a careful plan for each solution: owner, steps, resources, KPIs and risks.</p>
                <p className="out">See the Action plans page.</p>
              </div>
            </li>
            <li>
              <span className="wk">
                <svg className="ic">
                  <use href="#i-book"></use>
                </svg>
                <br />
                Learn
              </span>
              <div>
                <h4>Measure and reflect</h4>
                <p className="small">
                  Before/after measurement of grams wasted per meal, feedback from students and staff, and honest reflection.
                </p>
                <p className="out">See the Results &amp; learning page.</p>
              </div>
            </li>
          </ol>
        </Tab>
        <Tab id="a" label="Solution A">
          <div className="planhead">
            <span className="badge" style={{ background: "var(--cA)" }}>
              A
            </span>
            <div>
              <div className="eyebrow">Handles leftovers · sell the surplus</div>
              <h2>Last-Hour Food Rescue</h2>
              <p className="muted">
                Meals that are still safe but unsold near closing time are sold at a discount instead of being thrown away.
              </p>
            </div>
          </div>
          <div className="grid g2f">
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-tag"></use>
                </svg>
                <h3>How it works</h3>
              </div>
              <div className="flow" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,130px),1fr))" }}>
                <div>
                  <span className="lv">1</span>
                  <b>Surplus check</b>
                  <span className="small">30–60 min before closing</span>
                </div>
                <div>
                  <span className="lv">2</span>
                  <b>Announce</b>
                  <span className="small">Notice board, app, student groups</span>
                </div>
                <div>
                  <span className="lv">3</span>
                  <b>Sell</b>
                  <span className="small">30–50% off, only safe food</span>
                </div>
              </div>
              <p className="small muted">
                Only for <b>unexpected</b> surplus. Canteens must not over-produce on purpose to sell at a discount.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-plate"></use>
                </svg>
                <h3>Example</h3>
              </div>
              <p className="small">
                At 13:15, Little Kitchen still has 12 portions of teriyaki chicken, cooked at 11:30 and kept hot. A “last call” goes out:
                40% off until 13:45. Eight are sold; four still have to be handled by Solution C or sorted for compost.
              </p>
            </div>
          </div>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-check"></use>
                </svg>
                <h3>Strengths</h3>
              </div>
              <ul className="clean small">
                <li>Easiest to start: a price change and a sign</li>
                <li>Clear benefit for students on tight budgets</li>
                <li>Recovers some revenue for the canteen</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>Weaknesses</h3>
              </div>
              <ul className="clean small">
                <li>
                  Acts only <b>after</b> surplus exists
                </li>
                <li>Does nothing about plate waste</li>
                <li>Customers may wait for the discount</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-scale"></use>
                </svg>
                <h3>Ethical risk</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Moral hazard:</b> a reliable discount channel can make the kitchen careless about over-cooking
                </li>
                <li>
                  <b>Food safety:</b> food held too long
                </li>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab id="b" label="Solution B">
          <div className="planhead">
            <span className="badge" style={{ background: "var(--cB)" }}>
              B
            </span>
            <div>
              <div className="eyebrow">Tackles the root cause · prevent</div>
              <h2>Demand Forecasting &amp; Portion Control</h2>
              <p className="muted">
                Cook to demand, serve portions that fit, and learn from what is left. Three features, each aimed at a root cause from Page
                1.
              </p>
            </div>
          </div>
          <div className="grid g3">
            <div className="panel stack">
              <span className="eyebrow">Feature 1 · fixes overproduction</span>
              <h3>Demand forecasting</h3>
              <p>
                Record every dish as: <b>Day → Time → Menu item → Prepared → Sold → Left over.</b> Cook to data, not habit.
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>Friday chicken rice</th>
                      <th className="n">Portions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Average prepared</td>
                      <td className="n">120</td>
                    </tr>
                    <tr>
                      <td>Average sold</td>
                      <td className="n">96</td>
                    </tr>
                    <tr>
                      <td>Average left over</td>
                      <td className="n" style={{ color: "var(--waste)", fontWeight: "700" }}>
                        24
                      </td>
                    </tr>
                    <tr className="win">
                      <td>New starting batch</td>
                      <td className="n">90–100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="small muted">
                Then cook more in small batches only if demand rises. Optional inputs: online pre-orders and a short survey on preferred
                dishes, with privacy safeguards.
              </p>
            </div>
            <div className="panel stack">
              <span className="eyebrow">Feature 2 · fixes oversized portions</span>
              <h3>Flexible portions</h3>
              <p>
                Small / Regular / Large, or a smaller default with a <span className="hl">free refill</span>: for example{" "}
                <b>150 g of rice instead of 200 g</b>.
              </p>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div className="panel" style={{ background: "var(--waste-soft)", borderColor: "transparent", padding: "12px" }}>
                  <div className="eyebrow">Now</div>
                  <p className="small">Take a lot → can’t finish → throw away</p>
                </div>
                <div className="panel" style={{ background: "var(--leaf-soft)", borderColor: "transparent", padding: "12px" }}>
                  <div className="eyebrow">New</div>
                  <p className="small">Take enough → take more if hungry</p>
                </div>
              </div>
              <p className="small muted">
                A nudge that keeps choice open: no fines, and students stay free to eat as much as they want (Thaler &amp; Sunstein, 2008).
              </p>
            </div>
            <div className="panel stack">
              <span className="eyebrow">Feature 3 · fixes menu problems</span>
              <h3>Learning from plate waste</h3>
              <p>
                A QR survey asks: <em>Why didn’t you finish this food?</em>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span className="pill">Portion too large</span>
                <span className="pill">Don’t like the taste</span>
                <span className="pill">Food too cold</span>
                <span className="pill">Too salty</span>
                <span className="pill">Poor combination</span>
                <span className="pill">Not hungry</span>
              </div>
              <p className="small muted">
                In Hanoi schools, vegetables were wasted most (46%) and meat least (about 18–20%), and disliked mixed vegetables nearly
                doubled vegetable waste (Pham et al., 2025). If our audit shows the same, the canteen can shrink vegetable portions, change
                cooking methods or let students choose sides.
              </p>
            </div>
          </div>
          <div className="grid g2" style={{ marginTop: "18px" }}>
            <figure>
              <MediaSlot id="design_portion" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>New portion sizes or refill sign</b>
                </div>
              </MediaSlot>
              <figcaption>
                Caption: <Field id="cap_design_portion">add a caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="design_qr" className="media">
                <div className="ph">
                  <span className="ic">Photo or screenshot</span>
                  <b>The QR “why didn’t you finish?” survey</b>
                </div>
              </MediaSlot>
              <figcaption>
                Caption: <Field id="cap_design_qr">add a caption</Field>
              </figcaption>
            </figure>
          </div>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-check"></use>
                </svg>
                <h3>Strengths</h3>
              </div>
              <ul className="clean small">
                <li>
                  The only option that <b>prevents</b> waste before it exists
                </li>
                <li>Tackles both root causes: overproduction and oversized portions</li>
                <li>Usually saves money (US$6–7 per US$1 in benchmarks)</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>Weaknesses</h3>
              </div>
              <ul className="clean small">
                <li>Needs data recording, training and new serving routines</li>
                <li>Forecasts can be wrong on exam days or holidays</li>
                <li>No direct discount for customers</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-scale"></use>
                </svg>
                <h3>Ethical risk</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Autonomy:</b> a smaller default could feel like “less food”
                </li>
                <li>
                  <b>Workload:</b> extra tasks for kitchen staff
                </li>
                <li>
                  <b>Privacy</b> if student order data is used
                </li>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab id="c" label="Solution C">
          <div className="planhead">
            <span className="badge" style={{ background: "var(--cC)" }}>
              C
            </span>
            <div>
              <div className="eyebrow">Handles leftovers · share the rest</div>
              <h2>Safe Redistribution of Surplus</h2>
              <p className="muted">
                Food that is safe, unserved and untouched is passed to charities, food banks or community organisations.
              </p>
            </div>
          </div>
          <div className="grid g2f">
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-truck"></use>
                </svg>
                <h3>How it works</h3>
              </div>
              <div className="flow" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,110px),1fr))" }}>
                <div>
                  <span className="lv">1</span>
                  <b>Safety check</b>
                </div>
                <div>
                  <span className="lv">2</span>
                  <b>Pack</b>
                </div>
                <div>
                  <span className="lv">3</span>
                  <b>Label</b>
                  <span className="small">dish + time cooked</span>
                </div>
                <div>
                  <span className="lv">4</span>
                  <b>Chill</b>
                </div>
                <div>
                  <span className="lv">5</span>
                  <b>Partner collects</b>
                </div>
              </div>
              <p className="small muted">
                Food left on plates, or with an uncertain storage history, is <b>never</b> redistributed.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-heart"></use>
                </svg>
                <h3>Example</h3>
              </div>
              <p className="small">
                After the last call, four portions remain untouched. The kitchen supervisor checks them, packs and labels them, and chills
                them. A partner such as Hanoi Food Rescue, VietHarvest or Food Bank Vietnam collects them that afternoon for people in need.
              </p>
            </div>
          </div>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-check"></use>
                </svg>
                <h3>Strengths</h3>
              </div>
              <ul className="clean small">
                <li>Strongest social value: food reaches people in need</li>
                <li>Connects the campus to the community</li>
                <li>Partners already exist in Hanoi</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-alert"></use>
                </svg>
                <h3>Weaknesses</h3>
              </div>
              <ul className="clean small">
                <li>Hardest to organise: safety, packaging, transport</li>
                <li>Acts only after surplus exists</li>
                <li>No Good Samaritan law, so the donor carries the risk</li>
              </ul>
            </div>
            <div className="comp">
              <div className="comp-h">
                <svg className="ic">
                  <use href="#i-scale"></use>
                </svg>
                <h3>Ethical risk</h3>
              </div>
              <ul className="clean small">
                <li>
                  <b>Safety and dignity</b> of vulnerable recipients
                </li>
                <li>
                  <b>Moral hazard:</b> pressure to cook extra “for donation”
                </li>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab id="ideas" label="All six ideas">
          <div className="tab-title">
            <h2>Ideas we considered</h2>
          </div>
          <p className="tab-intro">Filter to see the shortlist or the ideas we rejected, and why.</p>
          <FilterButtons group="ideas" cats={["Shortlisted", "Rejected"]} className="filters" />
          <div className="grid g3" data-cards="ideas">
            <Card title="Last-Hour Food Rescue" tag="Shortlisted · Solution A" group="ideas" cat="Shortlisted">
              <div className="tagline">Shortlisted · Solution A</div>
              <Front>
                <h3>Last-Hour Food Rescue</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Sell unsold meals at a discount in the last 30–60 minutes of service.
                </p>
              </Front>
              <More>
                <p>
                  <b>Pros:</b> very easy to start; customers save money; no change to kitchen operations.
                </p>
                <p>
                  <b>Cons:</b> acts only after surplus exists; customers may wait for discounts; anything unsold at closing is still wasted.
                </p>
                <p>
                  <b>Decision:</b> kept as step 2 of our combined system.
                </p>
              </More>
              <button className="open">Pros, cons, decision</button>
            </Card>
            <Card
              title="Demand Forecasting & Portion Control"
              tag="Shortlisted · Solution B · Chosen"
              group="ideas"
              cat="Shortlisted"
              style={{ borderColor: "var(--leaf)", borderWidth: "2px" }}
            >
              <div className="tagline" style={{ color: "var(--leaf)" }}>
                Shortlisted · Solution B · Chosen
              </div>
              <Front>
                <h3>Demand Forecasting &amp; Portion Control</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Cook to demand using sales data, and let students choose portion sizes with free refills.
                </p>
              </Front>
              <More>
                <p>
                  <b>Pros:</b> prevents waste before it happens; tackles both overproduction and plate waste; usually saves money.
                </p>
                <p>
                  <b>Cons:</b> needs data recording, staff training and new serving routines; forecasts can be wrong.
                </p>
                <p>
                  <b>Decision:</b> chosen as our main solution.
                </p>
              </More>
              <button className="open">Pros, cons, decision</button>
            </Card>
            <Card title="Safe Redistribution of Surplus" tag="Shortlisted · Solution C" group="ideas" cat="Shortlisted">
              <div className="tagline">Shortlisted · Solution C</div>
              <Front>
                <h3>Safe Redistribution of Surplus</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Give safe, untouched surplus to a partner such as Hanoi Food Rescue, VietHarvest or Food Bank Vietnam.
                </p>
              </Front>
              <More>
                <p>
                  <b>Pros:</b> strong social value; helps food-insecure people.
                </p>
                <p>
                  <b>Cons:</b> hardest to organise (safety, packaging, transport); legal risk with no Good Samaritan law; risk of
                  over-cooking in order to donate.
                </p>
                <p>
                  <b>Decision:</b> kept as step 3, only with a trained partner.
                </p>
              </More>
              <button className="open">Pros, cons, decision</button>
            </Card>
            <Card title="Fines for food left on plates" tag="Rejected" group="ideas" cat="Rejected">
              <div className="tagline">Rejected</div>
              <Front>
                <h3>Fines for food left on plates</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Charge customers for leftovers, as some buffets do.
                </p>
              </Front>
              <More>
                <p>
                  <b>Why rejected:</b> punishes customers for portions the business designed, restricts their autonomy (Kant) and is likely
                  to reduce satisfaction. A free refill achieves the goal more fairly.
                </p>
              </More>
              <button className="open">Why we rejected it</button>
            </Card>
            <Card title="Awareness posters only" tag="Rejected as main solution" group="ideas" cat="Rejected">
              <div className="tagline">Rejected as main solution</div>
              <Front>
                <h3>Awareness posters only</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Posters asking students not to waste food.
                </p>
              </Front>
              <More>
                <p>
                  <b>Why rejected:</b> it puts the responsibility on customers rather than on the decisions the business controls, and
                  awareness alone rarely changes default behaviour. We kept it as supporting communication for Solution B.
                </p>
              </More>
              <button className="open">Why we rejected it</button>
            </Card>
            <Card title="AI waste-tracking cameras" tag="Rejected for the pilot" group="ideas" cat="Rejected">
              <div className="tagline">Rejected for the pilot</div>
              <Front>
                <h3>AI waste-tracking cameras</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Systems like Lumitics that photograph and weigh waste automatically.
                </p>
              </Front>
              <More>
                <p>
                  <b>Why rejected:</b> effective (Meliá Hồ Tràm cut waste by 40%; VOV, n.d.) but too costly for one canteen. A digital scale
                  and a spreadsheet give the same baseline. A possible later upgrade.
                </p>
              </More>
              <button className="open">Why we rejected it</button>
            </Card>
          </div>
        </Tab>
        <Tab id="scoring" label="Our analysis">
          <div className="tab-title">
            <h2>How we scored the shortlist</h2>
          </div>
          <p className="tab-intro">
            Four criteria, each with a defined 1–5 scale and a weight. Drag the sliders to change the weights yourself: Solution B stays
            first.
          </p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Weights</h3>
              <WeightSliders className="sliders" />
              <p className="small muted" id="wnote">
                Weights are rescaled to add up to 100%.
              </p>
              <WeightReset className="navcard" style={{ padding: "8px 12px", justifySelf: "start" }} />
            </div>
            <div className="panel stack">
              <h3>Weighted score (out of 5)</h3>
              <ScoreBars className="bars" />
              <ScoreCalc className="chart-detail" />
            </div>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Scoring guide</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>Our weight</th>
                  <th>Question</th>
                  <th>1 = weak</th>
                  <th>3 = moderate</th>
                  <th>5 = strong</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Effectiveness</b>
                  </td>
                  <td className="n">35%</td>
                  <td>How much avoidable waste does it prevent or recover? Does it address root causes?</td>
                  <td>Little effect</td>
                  <td>Recovers part of the surplus after it exists</td>
                  <td>Prevents waste at source</td>
                </tr>
                <tr>
                  <td>
                    <b>Feasibility</b>
                  </td>
                  <td className="n">25%</td>
                  <td>Can one canteen do it within about 12 weeks with its staff, budget and the law?</td>
                  <td>Major investment or legal change</td>
                  <td>Some training or one partner</td>
                  <td>Can start within weeks</td>
                </tr>
                <tr>
                  <td>
                    <b>Ethical acceptability</b>
                  </td>
                  <td className="n">25%</td>
                  <td>Does it fit our ethical analysis, and how serious are the risks it creates?</td>
                  <td>Serious unmanaged risks</td>
                  <td>Clear benefit, significant risks</td>
                  <td>Strong benefit, small manageable risks</td>
                </tr>
                <tr>
                  <td>
                    <b>Stakeholder support</b>
                  </td>
                  <td className="n">15%</td>
                  <td>Will customers, staff and management accept it?</td>
                  <td>Resistance from a key group</td>
                  <td>Mixed</td>
                  <td>Clear gains for most groups</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small muted" style={{ marginTop: "8px" }}>
            <b>Why these weights:</b> reducing waste is the purpose (35%); a student pilot must be workable (25%); this is an ethics project
            and solutions can create ethical risks (25%); support can be built through design and communication (15%). Without weights, A
            and B tie at 17.0 out of 20, which is why weighting was needed.
          </p>
          <h3 style={{ margin: "26px 0 12px" }}>The scores</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Solution</th>
                  <th className="n">Effectiveness</th>
                  <th className="n">Feasibility</th>
                  <th className="n">Ethical</th>
                  <th className="n">Support</th>
                  <th className="n">Weighted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A. Last-Hour Food Rescue</td>
                  <td className="n">3.0</td>
                  <td className="n">4.5</td>
                  <td className="n">4.0</td>
                  <td className="n">4.5</td>
                  <td className="n">3.85</td>
                </tr>
                <tr className="win">
                  <td>B. Forecasting &amp; Portion Control</td>
                  <td className="n">4.5</td>
                  <td className="n">4.0</td>
                  <td className="n">4.5</td>
                  <td className="n">4.0</td>
                  <td className="n">4.30</td>
                </tr>
                <tr>
                  <td>C. Safe Redistribution</td>
                  <td className="n">3.0</td>
                  <td className="n">2.5</td>
                  <td className="n">4.0</td>
                  <td className="n">3.5</td>
                  <td className="n">3.20</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Why each score</h3>
          <details className="acc">
            <summary>Solution A: Last-Hour Food Rescue · 3.85</summary>
            <div className="in">
              <p>
                <b>Effectiveness 3.0.</b> Rescues surplus, but only after it is created. Does nothing about overproduction or plate waste
                (about 29% of food in Hanoi school kitchens; Pham et al., 2025). Customers may wait for the discount.
              </p>
              <p>
                <b>Feasibility 4.5.</b> A price change and a sign; only needs a rule on how long hot food may be held.
              </p>
              <p>
                <b>Ethical 4.0.</b> Reduces waste and helps price-sensitive students. Risks: food held too long, and moral hazard.
              </p>
              <p>
                <b>Support 4.5.</b> Clear benefit to customers; management may worry about lost full-price sales.
              </p>
              <p>
                <b>Overall:</b> a good short-term measure that treats the symptom, not the cause.
              </p>
            </div>
          </details>
          <details className="acc" open>
            <summary>Solution B: Forecasting &amp; Portion Control · 4.30</summary>
            <div className="in">
              <p>
                <b>Effectiveness 4.5.</b> The only option that prevents waste before it happens and tackles both main causes. Benchmarks:
                restaurants −26%, hotels about −21%, caterers −36% within a year (Champions 12.3). Not 5.0, because forecasts can be wrong
                around exams, weather and holidays.
              </p>
              <p>
                <b>Feasibility 4.0.</b> Needs recording, a spreadsheet forecast, training and new serving routines, but the cost is{" "}
                <b>low to medium</b>: a digital scale, bins and Google Sheets, with no major equipment.
              </p>
              <p>
                <b>Ethical 4.5.</b> Top of the food recovery hierarchy; all eight lenses agree; respects autonomy if choice is kept open.
                Staff workload and reduced choice are managed by design.
              </p>
              <p>
                <b>Support 4.0.</b> Saves money and fits student appetites, but there is no direct discount and some may see a smaller
                default as “getting less”. Our survey: <Field id="sc_b10">% willing to choose a smaller portion</Field>.
              </p>
              <p>
                <b>Overall:</b> the strongest long-term solution, because it addresses root causes.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>Solution C: Safe Redistribution · 3.20</summary>
            <div className="in">
              <p>
                <b>Effectiveness 3.0.</b> Recovers surplus for people in need, but acts after surplus exists, depends on a partner being
                available and does nothing about plate waste.
              </p>
              <p>
                <b>Feasibility 2.5.</b> Safety handling, packaging, cold storage, transport and a reliable partner; no Good Samaritan law,
                no tax deduction, unclear date labels (Harvard FLPC &amp; GFN, 2024).
              </p>
              <p>
                <b>Ethical 4.0.</b> Strong social value (Kant’s beneficence; Rawls’s justice) but the most serious risks: food-safety harm,
                recipients’ dignity, and pressure to over-cook for donation.
              </p>
              <p>
                <b>Support 3.5.</b> Welcomed by charities; management fears liability; staff face extra packaging work; some people distrust
                donated food.
              </p>
              <p>
                <b>Note:</b> redistribution already exists in Hanoi through specialist organisations, but it is not yet common among
                canteens, mainly because of the legal gaps.
              </p>
            </div>
          </details>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
