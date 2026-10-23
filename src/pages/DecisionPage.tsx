// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import { Badge, GoButton, SV, SVPill, VerdictChart, VerdictNote } from "../components";

export default function DecisionPage() {
  return (
    <PageSection id="decision">
      <div className="wrap phead">
        <StageStepper current={5} />
        <h1>Our decision</h1>
        <p className="lede">
          Putting the analysis, the survey and the ethics together: Solution B is the best choice, and Solutions A and C make it complete.
        </p>
        <p className="stage-note">Design thinking: Decide. Rubrics 2 &amp; 5: Idea, creativity, ethics.</p>
        <div className="takeaways">
          <div>
            <b>B</b>
            <span>the core solution</span>
          </div>
          <div>
            <b>
              <span>
                <SV k="bmean">4.26</SV>
              </span>
            </b>
            <span>B’s mean effectiveness rating</span>
          </div>
          <div>
            <b>
              <span>
                <SV k="tk">B &gt; A, C</SV>
              </span>
            </b>
            <span>Tukey post-hoc result</span>
          </div>
          <div>
            <b>3 in 1</b>
            <span>solutions combined into one system</span>
          </div>
        </div>
        <p className="small" style={{ marginTop: "10px", fontWeight: "600", color: "var(--gold)" }}>
          <SV k="srcnote"></SV>
        </p>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="verdict" label="Our decision">
          <div className="tab-title">
            <h2>Solution B is the best choice, and A and C make it complete</h2>
          </div>
          <p className="tab-intro">
            We combined three kinds of evidence: our own analysis, the survey and the ethical analysis. They point the same way, with one
            honest trade-off on feasibility.
          </p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Effectiveness, as rated in our survey</h3>
              <VerdictChart className="bars" />
              <VerdictNote className="small muted" />
            </div>
            <div className="panel stack">
              <h3>Our weighted analysis (out of 5)</h3>
              <div className="bars">
                <div className="bar" style={{ cursor: "default" }}>
                  <span className="lab">A · Last-Hour Rescue</span>
                  <span className="track">
                    <span className="fill" style={{ display: "block", width: "77%", background: "var(--cA)" }}></span>
                  </span>
                  <span className="val">3.85</span>
                </div>
                <div className="bar" style={{ cursor: "default" }}>
                  <span className="lab">B · Forecasting &amp; Portions</span>
                  <span className="track">
                    <span className="fill" style={{ display: "block", width: "86%", background: "var(--cB)" }}></span>
                  </span>
                  <span className="val">4.30</span>
                </div>
                <div className="bar" style={{ cursor: "default" }}>
                  <span className="lab">C · Redistribution</span>
                  <span className="track">
                    <span className="fill" style={{ display: "block", width: "64%", background: "var(--cC)" }}></span>
                  </span>
                  <span className="val">3.20</span>
                </div>
              </div>
              <p className="small muted">B ranks first under every weighting we tested (Solutions page → Analysis).</p>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>The evidence, side by side</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Evidence</th>
                  <th>What it shows</th>
                  <th>Points to</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Our weighted analysis</b>
                  </td>
                  <td>B 4.30 · A 3.85 · C 3.20, and B first under all four weightings</td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Survey: effectiveness</b> (ANOVA + Tukey)
                  </td>
                  <td>
                    <span>
                      <SV k="anstat">F test</SV>
                    </span>
                    ; Tukey:{" "}
                    <span>
                      <SV k="tk">B &gt; A, C</SV>
                    </span>
                  </td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Survey: root cause vs leftovers</b>
                  </td>
                  <td>
                    B compared with the average of A and C:{" "}
                    <span>
                      <SV k="contrast">contrast</SV>
                    </span>
                  </td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Survey: overall score</b> (mean of 4 statements)
                  </td>
                  <td>
                    A{" "}
                    <span>
                      <SV k="oA">__</SV>
                    </span>{" "}
                    · B{" "}
                    <span>
                      <SV k="oB">__</SV>
                    </span>{" "}
                    · C{" "}
                    <span>
                      <SV k="oC">__</SV>
                    </span>
                  </td>
                  <td>
                    <SVPill k="otop" className="pill" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Ethical analysis</b>
                  </td>
                  <td>All eight lenses favour prevention over handling surplus; prevention is the only step every lens agrees on</td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Survey: feasibility</b>
                  </td>
                  <td>
                    A{" "}
                    <span>
                      <SV k="fA">__</SV>
                    </span>{" "}
                    · B{" "}
                    <span>
                      <SV k="fB">__</SV>
                    </span>{" "}
                    · C{" "}
                    <span>
                      <SV k="fC">__</SV>
                    </span>
                  </td>
                  <td>
                    <SVPill k="ftop" className="pill" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Survey: social acceptance of C</b>
                  </td>
                  <td>
                    <span>
                      <SV k="ccomfort">__</SV>
                    </span>{" "}
                    comfortable with safe surplus going to people in need
                  </td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cC)] text-white ring-transparent">
                      C
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout g" style={{ marginTop: "18px" }}>
            <p className="quote">Our decision: make Solution B the core, and add A and C as back-ups.</p>
            <p style={{ marginTop: "8px" }}>
              B is rated most effective and is the only solution that tackles the root cause. A is the most feasible and catches surplus on
              days the forecast is wrong. C gives what is still left to people in need. The{" "}
              <GoButton to="app" color="link-color" size="md">
                CampusMeal app
              </GoButton>{" "}
              connects all three.
            </p>
          </div>
          <div className="grid g3" style={{ marginTop: "18px" }}>
            <div className="comp" style={{ borderColor: "var(--cB)" }}>
              <div className="comp-h">
                <span
                  className="badge"
                  style={{ background: "var(--cB)", width: "40px", height: "40px", fontSize: "1.2rem", borderRadius: "10px" }}
                >
                  B
                </span>
                <h3>Why B is the core</h3>
              </div>
              <ul className="clean small">
                <li>
                  Rated most effective in our survey (Tukey:{" "}
                  <span>
                    <SV k="tk">B &gt; A, C</SV>
                  </span>
                  )
                </li>
                <li>Tackles the root cause: overproduction and oversized portions</li>
                <li>Top of the food recovery hierarchy; all eight lenses agree</li>
                <li>Usually saves money, so the canteen has a reason to keep it</li>
              </ul>
            </div>
            <div className="comp" style={{ borderColor: "var(--cA)" }}>
              <div className="comp-h">
                <span
                  className="badge"
                  style={{ background: "var(--cA)", width: "40px", height: "40px", fontSize: "1.2rem", borderRadius: "10px" }}
                >
                  A
                </span>
                <h3>Why we also use A</h3>
              </div>
              <ul className="clean small">
                <li>
                  Rated <b>most feasible</b>: a quick win while B is set up
                </li>
                <li>Catches surplus on days the forecast is wrong</li>
                <li>
                  <span>
                    <SV k="abuy">__</SV>
                  </span>{" "}
                  of respondents would buy a discounted meal
                </li>
                <li>Limited to genuine surplus, so it never replaces prevention</li>
              </ul>
            </div>
            <div className="comp" style={{ borderColor: "var(--cC)" }}>
              <div className="comp-h">
                <span
                  className="badge"
                  style={{ background: "var(--cC)", width: "40px", height: "40px", fontSize: "1.2rem", borderRadius: "10px" }}
                >
                  C
                </span>
                <h3>Why we also use C</h3>
              </div>
              <ul className="clean small">
                <li>
                  Highest <b>social value</b>: food reaches people in need
                </li>
                <li>Meets the duty of beneficence (Kant) and helps the least advantaged (Rawls)</li>
                <li>
                  <span>
                    <SV k="ccomfort">__</SV>
                  </span>{" "}
                  of respondents are comfortable with it
                </li>
                <li>Only through a trained partner, with strict safety rules</li>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab id="system" label="How they fit together">
          <div className="tab-title">
            <h2>Why Solution B, and how all three work together</h2>
          </div>
          <p className="tab-intro">
            Ordered by the food recovery hierarchy (US EPA, n.d.): the higher the step, the more of the food’s value is kept.
          </p>
          <div className="flow">
            <div className="top">
              <span className="lv">Step 1 · Solution B</span>
              <b>Prevent</b>
              <span className="small">Forecast demand, flexible portions. The main KPI.</span>
            </div>
            <div>
              <span className="lv">Step 2 · Solution A</span>
              <b>Sell surplus</b>
              <span className="small">Discount genuine surplus in the last hour. Not every day.</span>
            </div>
            <div>
              <span className="lv">Step 3 · Solution C</span>
              <b>Redistribute</b>
              <span className="small">Safe, untouched food through a trained partner only.</span>
            </div>
            <div>
              <span className="lv">Step 4</span>
              <b>Sort</b>
              <span className="small">Compost or animal feed for what cannot be eaten.</span>
            </div>
          </div>
          <div className="grid g2" style={{ marginTop: "20px", alignItems: "center" }}>
            <div className="hier" aria-label="Food recovery hierarchy">
              <div style={{ width: "100%", background: "var(--cB)" }}>1 · Prevent waste at source</div>
              <div style={{ width: "84%", background: "var(--cA)" }}>2 · Sell the surplus</div>
              <div style={{ width: "68%", background: "var(--cC)" }}>3 · Feed people in need</div>
              <div style={{ width: "52%", background: "var(--muted)" }}>4 · Animal feed or compost</div>
              <div style={{ width: "36%", background: "var(--waste)" }}>5 · Landfill (last resort)</div>
            </div>
            <p className="small muted">
              The food recovery hierarchy (US EPA, n.d.): the higher the step, the more of the food’s value is kept. Our three solutions
              follow it from the top.
            </p>
          </div>
          <div className="grid g2" style={{ marginTop: "20px" }}>
            <div className="panel stack">
              <h3>Why B fits the ethics</h3>
              <ul className="clean">
                <li>
                  <b>Utilitarianism:</b> lower costs, portions that fit, less wasted food, water, energy and labour. Passes Singer’s test
                  because prevention usually saves money.
                </li>
                <li>
                  <b>Kant:</b> a duty to use resources carefully; honest portion choices treat customers as rational agents.
                </li>
                <li>
                  <b>Stakeholder theory and shared value:</b> the only option that helps the owner <em>and</em> the powerless stakeholders
                  at the same time.
                </li>
                <li>
                  <b>Virtue ethics:</b> measuring and cooking to need builds temperance and practical wisdom.
                </li>
                <li>
                  <b>Justice:</b> less unnecessary food reduces the burden on the least advantaged, without asking them to accept
                  second-hand food.
                </li>
              </ul>
            </div>
            <div className="panel stack">
              <h3>Two rules that keep the system honest</h3>
              <ol className="clean">
                <li>
                  <b>Prevention stays the main KPI.</b> Discounts and donations are a fallback, never a reason to keep over-cooking.
                </li>
                <li>
                  <b>Donation only through a trained partner</b> who collects free of charge and follows strict safety rules.
                </li>
              </ol>
            </div>
          </div>
        </Tab>
        <Tab id="toc" label="Theory of change">
          <div className="tab-title">
            <h2>Theory of change</h2>
          </div>
          <p className="tab-intro">How our activities are expected to lead to the impact we want, and what has to be true along the way.</p>
          <div className="flow">
            <div>
              <span className="lv">Inputs</span>
              <b>What we put in</b>
              <span className="small">Team time, canteen sales data, kitchen scale and bins, the CampusMeal app, a partner food bank</span>
            </div>
            <div>
              <span className="lv">Activities</span>
              <b>What we do</b>
              <span className="small">
                Weighing audit, demand forecast, batch cooking, portion choice, last call, safe donation, finish-check
              </span>
            </div>
            <div>
              <span className="lv">Outputs</span>
              <b>What we can count</b>
              <span className="small">Daily forecasts, pre-orders, waste logs, last calls sent, meals donated, feedback answers</span>
            </div>
            <div className="top">
              <span className="lv">Outcomes</span>
              <b>What changes</b>
              <span className="small">Less overproduction and plate waste: −15% grams per meal; satisfaction kept; meals shared</span>
            </div>
            <div>
              <span className="lv">Impact</span>
              <b>Why it matters</b>
              <span className="small">
                Less food to Nam Sơn and less methane; lower costs; food for people in need; a model other canteens copy
              </span>
            </div>
          </div>
          <h3 style={{ margin: "24px 0 10px" }}>Assumptions we must test</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Assumption</th>
                  <th>How we test it</th>
                  <th>If it is wrong</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Students will pre-order and choose smaller portions</td>
                  <td>Pre-order share and portion mix in the app; survey statement on choosing a portion</td>
                  <td>Rely more on walk-in history; promote the free refill</td>
                </tr>
                <tr>
                  <td>Past sales predict future demand</td>
                  <td>Forecast error in the weekly report (target within 20%)</td>
                  <td>Recalibrate; use overrides for exams and holidays</td>
                </tr>
                <tr>
                  <td>The kitchen will weigh waste every day</td>
                  <td>Days with a waste log out of days served</td>
                  <td>Simplify to one combined bin; build it into the shift</td>
                </tr>
                <tr>
                  <td>Smaller portions do not lower satisfaction</td>
                  <td>Satisfaction before and after; finish-check answers</td>
                  <td>Raise the default portion; keep portion choice</td>
                </tr>
                <tr>
                  <td>A partner can collect safely and on time</td>
                  <td>Pickup records; incidents (target 0)</td>
                  <td>Use a back-up partner, or sort surplus for compost</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab id="fit" label="Fits the people">
          <div className="tab-title">
            <h2>How the idea fits the people affected</h2>
          </div>
          <p className="tab-intro">Every stakeholder from Page 1 gets something specific from the combined system.</p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Who</th>
                  <th>What they need (Page 1)</th>
                  <th>What our design gives them</th>
                  <th>From</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Students and customers</b>
                  </td>
                  <td>Portions that fit, choice, fair prices, a voice</td>
                  <td>
                    Small / Regular / Large or a smaller default with free refill; cheaper last-hour meals; a QR form to say why food was
                    left
                  </td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>{" "}
                    <Badge size="sm" className="bg-[var(--cA)] text-white ring-transparent">
                      A
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Canteen owner</b>
                  </td>
                  <td>Lower costs; confidence customers stay happy</td>
                  <td>Buys and cooks less; recovers revenue from surplus; sees the numbers every day</td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>{" "}
                    <Badge size="sm" className="bg-[var(--cA)] text-white ring-transparent">
                      A
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Kitchen staff</b>
                  </td>
                  <td>Clear, fair rules; no blame</td>
                  <td>Weighing built into paid shifts; data used to improve, never to blame; a safe staff-meal rule for surplus</td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cB)] text-white ring-transparent">
                      B
                    </Badge>{" "}
                    <Badge size="sm" className="bg-[var(--cC)] text-white ring-transparent">
                      C
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Food-insecure people</b>
                  </td>
                  <td>Safe food, delivered with dignity</td>
                  <td>Untouched, labelled surplus collected by a trained partner</td>
                  <td>
                    <Badge size="sm" className="bg-[var(--cC)] text-white ring-transparent">
                      C
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Neighbours, waste workers, environment</b>
                  </td>
                  <td>Less waste sent to landfill</td>
                  <td>Less food cooked; what remains is sold, shared or sorted for compost</td>
                  <td>All</td>
                </tr>
                <tr>
                  <td>
                    <b>University and government</b>
                  </td>
                  <td>A model that can scale</td>
                  <td>Low-cost tools and a written protocol any campus canteen can copy; evidence for SDG 12.3</td>
                  <td>All</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout g" style={{ marginTop: "16px" }}>
            <b>We checked the fit with the people themselves.</b> In our survey,{" "}
            <b>
              <SV k="bportion">__</SV>
            </b>{" "}
            of respondents would choose a portion that matches their needs,{" "}
            <b>
              <SV k="abuy">__</SV>
            </b>{" "}
            would buy a discounted meal near closing time, and{" "}
            <b>
              <SV k="ccomfort">__</SV>
            </b>{" "}
            are comfortable with safe surplus going to people in need.{" "}
            <GoButton to="survey-ratings" color="link-color" size="md">
              See the survey ratings
            </GoButton>
          </div>
        </Tab>
        <Tab id="creative" label="What’s new about it">
          <div className="tab-title">
            <h2>What makes our idea creative</h2>
          </div>
          <p className="tab-intro">Social innovation does not have to be high-tech. Our idea is new in how it combines simple tools.</p>
          <div className="grid g3">
            <div className="comp">
              <div className="comp-h">
                <h3>Change the default, not the person</h3>
              </div>
              <p className="small">
                Instead of asking students to “waste less”, we change what they receive by default: a smaller portion with a free refill.
                Choice stays open, but the easy option becomes the low-waste one.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>Plate waste becomes feedback</h3>
              </div>
              <p className="small">
                A QR question, “Why didn’t you finish this?”, turns leftovers into data the kitchen can act on: smaller vegetable portions,
                different cooking, better menu combinations.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>A chain, not a one-off fix</h3>
              </div>
              <p className="small">
                Prevent → sell → share → sort. Each step catches what the one before missed, in the order that keeps most of the food’s
                value (food recovery hierarchy).
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>Low-cost tools anyone can copy</h3>
              </div>
              <p className="small">
                A kitchen scale, three bins and a spreadsheet replace expensive AI cameras. Any canteen in Hanoi could start next week.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>Ethics designed in from the start</h3>
              </div>
              <p className="small">
                Safeguards for safety, dignity, workload and honesty were designed before launch, and prevention is the main KPI so
                donations cannot become CSR-washing.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>Partner, don’t duplicate</h3>
              </div>
              <p className="small">
                We connect the canteen to existing Hanoi rescue organisations instead of building a new charity, which keeps the project
                small, safe and realistic.
              </p>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>What already exists, and what we add</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Existing approach</th>
                  <th>Its limit</th>
                  <th>What our project adds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hanoi Food Rescue, VietHarvest: rescue surplus from hotels and restaurants</td>
                  <td>Acts after the waste exists; focused on large hotels</td>
                  <td>Prevention inside a campus canteen, with rescue as a back-up</td>
                </tr>
                <tr>
                  <td>AI waste tracking (Lumitics at Meliá Hồ Tràm)</td>
                  <td>Effective but costly for small canteens</td>
                  <td>The same measure-and-adjust idea with a scale and a spreadsheet</td>
                </tr>
                <tr>
                  <td>Awareness posters</td>
                  <td>Puts responsibility on customers; rarely changes behaviour</td>
                  <td>Changes the default portion the business serves</td>
                </tr>
                <tr>
                  <td>Buffet fines for leftovers</td>
                  <td>Punishes customers for portions the business designed</td>
                  <td>Free refill keeps choice and fairness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab id="safeguards" label="Ethical safeguards">
          <div className="tab-title">
            <h2>Ethical safeguards built into the design</h2>
          </div>
          <p className="tab-intro">Every solution can create new ethical problems. Here is how we designed against each one.</p>
          <div className="grid g2">
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>Food quality or choice reduced</h4>
              <p className="small">Portion sizes may change; quality may not. A free refill and a large option are always available.</p>
              <p className="who">Kant · autonomy</p>
            </div>
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>Unfair workload for staff</h4>
              <p className="small">
                Weighing and recording are part of paid shifts; data is used to improve the system, <b>never to blame individuals</b>.
              </p>
              <p className="who">Stakeholder theory · Rawls</p>
            </div>
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>Privacy</h4>
              <p className="small">
                If pre-orders or student data are used, only aggregated sales data is kept, no personal data is shared, and students are
                told how data is used.
              </p>
              <p className="who">Kant · respect</p>
            </div>
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>Moral hazard</h4>
              <p className="small">Prevention is the main KPI; discounts are not offered every day; nothing is cooked “for donation”.</p>
              <p className="who">Virtue · Carroll</p>
            </div>
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>Food safety and recipients’ dignity</h4>
              <p className="small">
                “If in doubt, do not donate.” Only untouched, labelled food handled under the WHO Five Keys to Safer Food (WHO, 2006); a
                trained partner only; presented as rescued surplus, not leftovers.
              </p>
              <p className="who">Kant · Rawls</p>
            </div>
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>Unfair demands on small businesses</h4>
              <p className="small">Low-cost steps first; donation only where a partner collects for free.</p>
              <p className="who">Young · proportional responsibility</p>
            </div>
            <div className="panel stack">
              <Badge size="sm" color="error">Risk</Badge>
              <h4>CSR-washing</h4>
              <p className="small">Report grams wasted per meal alongside any meals donated.</p>
              <p className="who">Kant · honesty</p>
            </div>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
