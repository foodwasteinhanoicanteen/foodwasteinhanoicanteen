// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection } from "../components/layout";
import { CountUp, HomeCards, MediaSlot, REF_COUNT } from "../components";

export default function HomePage() {
  return (
    <PageSection id="home">
      <div className="wrap">
        <div className="hero">
          <div className="stack">
            <div className="eyebrow">MANA3021 Business Ethics · Team Mini Social Impact Project · Hanoi</div>
            <h1>
              Almost a third of a Hanoi school lunch ends up <em>in the bin.</em>
            </h1>
            <p style={{ fontSize: "1.12rem", color: "var(--muted)" }}>
              Most of the decisions that cause this waste are made by businesses, not by the people eating. We studied the problem
              ethically, designed a response with our university canteen, tested it with people, and learned from the results.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
              <button className="btn" data-go="problem">
                Start the journey →
              </button>{" "}
              <button className="btn ghost" data-go="plan">
                See our action plans
              </button>
            </div>
          </div>
          <div className="tray" aria-label="One Hanoi school lunch, average waste per child">
            <div className="eyebrow">One school lunch, per child · Hanoi, 2024</div>
            <div className="row">
              <span>Vegetables</span>
              <span className="track">
                <i className="eat" style={{ width: "54%" }}></i>
                <i className="bin" style={{ width: "46%" }}></i>
              </span>
              <span className="num">48 g</span>
            </div>
            <div className="row">
              <span>Rice</span>
              <span className="track">
                <i className="eat" style={{ width: "76%" }}></i>
                <i className="bin" style={{ width: "24%" }}></i>
              </span>
              <span className="num">54 g</span>
            </div>
            <div className="row">
              <span>Meat</span>
              <span className="track">
                <i className="eat" style={{ width: "81%" }}></i>
                <i className="bin" style={{ width: "19%" }}></i>
              </span>
              <span className="num">16 g</span>
            </div>
            <div className="small muted">
              <span
                style={{ display: "inline-block", width: "10px", height: "10px", background: "var(--leaf)", borderRadius: "2px" }}
              ></span>{" "}
              eaten{" "}
              <span
                style={{ display: "inline-block", width: "10px", height: "10px", background: "var(--waste)", borderRadius: "2px" }}
              ></span>{" "}
              thrown away (waste rate)
            </div>
            <div className="scale">
              <span className="mono small">IN THE BIN</span>
              <span className="num">
                <CountUp to={118} suf="">
                  118
                </CountUp>
              </span>
              <span className="mono">g / child</span>
            </div>
            <div className="src">Pham et al. (2025), 8 urban Hanoi school kitchens, food weighed</div>
          </div>
        </div>
        <MediaSlot id="home_hero" className="media wide">
          <div className="ph">
            <span className="ic">Photo or video</span>
            <b>Your hero image: the canteen at lunchtime, or a tray of leftovers</b>
            <span className="small muted">Wide image, 21:9 works best</span>
          </div>
        </MediaSlot>
        <div className="sec-h">
          <svg className="ic lg">
            <use href="#i-target"></use>
          </svg>
          <div>
            <div className="eyebrow">The brief</div>
            <h2>Our challenge</h2>
          </div>
        </div>
        <div className="grid g2">
          <div className="panel stack">
            <p>
              We chose a <b>real, local, unresolved ethical problem</b>: safe food thrown away by food businesses in Hanoi, starting with
              our own university canteen.
            </p>
            <p>
              Following the brief, our goal is <b>not to solve food waste completely</b>. It is to show that we can:
            </p>
            <ol className="clean">
              <li>
                <b>understand</b> the problem ethically,
              </li>
              <li>
                <b>design</b> a responsible response,
              </li>
              <li>
                <b>suggest</b> a course of action, and
              </li>
              <li>
                <b>learn</b> from the results.
              </li>
            </ol>
          </div>
          <div className="panel stack hmw">
            <div className="eyebrow">Our “How might we…” question</div>
            <p className="quote">
              How might we help our university canteen cook and serve the right amount of food, so that less safe food is thrown away,
              without making students pay more or eat less than they want?
            </p>
            <p className="small muted">
              Realistic target for the pilot: cut food waste per meal in one canteen by <b>at least 15%</b>, with no fall in student
              satisfaction, and leave a model other canteens can copy.
            </p>
          </div>
        </div>
        <div className="sec-h">
          <svg className="ic lg">
            <use href="#i-flag"></use>
          </svg>
          <div>
            <div className="eyebrow">Aim and objectives</div>
            <h2>What we set out to achieve</h2>
          </div>
        </div>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>Objective</th>
                <th>Measure</th>
                <th>By when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>O1 · Measure</b> how much food one VinUni canteen wastes, and where (preparation, overproduction, plate)
                </td>
                <td>Baseline grams of waste per meal from a 2-week weighing audit</td>
                <td>Week 2</td>
              </tr>
              <tr>
                <td>
                  <b>O2 · Test</b> which solution people support, with at least 50 survey responses
                </td>
                <td>One-way ANOVA and Tukey post-hoc on ratings of A, B and C</td>
                <td>Week 3</td>
              </tr>
              <tr>
                <td>
                  <b>O3 · Reduce</b> waste per meal in the pilot canteen
                </td>
                <td>At least 15% below baseline, with no fall in student satisfaction</td>
                <td>Week 10</td>
              </tr>
              <tr>
                <td>
                  <b>O4 · Act responsibly</b>: no food-safety incidents, no blame on staff, no personal data shared
                </td>
                <td>Incident log, staff feedback, data protocol</td>
                <td>Throughout</td>
              </tr>
              <tr>
                <td>
                  <b>O5 · Learn and hand over</b> a model other canteens can copy
                </td>
                <td>Weekly report, lessons learned, recommendation to university operations</td>
                <td>Week 12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="sec-h">
          <svg className="ic lg">
            <use href="#i-bulb"></use>
          </svg>
          <div>
            <div className="eyebrow">Design thinking</div>
            <h2>Our journey in eight steps</h2>
          </div>
        </div>
        <p className="muted" style={{ marginBottom: "14px" }}>
          Each step is one page of this site. Click a step to open it.
        </p>
        <HomeCards />
        <div className="sec-h">
          <svg className="ic lg">
            <use href="#i-check"></use>
          </svg>
          <div>
            <div className="eyebrow">Brief and rubric</div>
            <h2>Where to find each requirement</h2>
          </div>
        </div>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>The brief asks us to…</th>
                <th>Rubric criterion</th>
                <th>Where we show it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Understand a real problem</b>: why it matters and who is affected
                </td>
                <td>1 · Understanding the problem</td>
                <td>
                  <button className="linkbtn" data-go="problem">
                    1 The problem
                  </button>{" "}
                  ·{" "}
                  <button className="linkbtn" data-go="problem-who">
                    Who is affected
                  </button>{" "}
                  ·{" "}
                  <button className="linkbtn" data-go="survey">
                    4 Survey
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Understand it ethically</b>
                </td>
                <td>5 · Connections to ethics</td>
                <td>
                  <button className="linkbtn" data-go="ethics">
                    2 Why it’s ethical
                  </button>{" "}
                  ·{" "}
                  <button className="linkbtn" data-go="ethics-lenses">
                    8 lenses
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Design a responsible, creative response</b> (design thinking, social innovation)
                </td>
                <td>2 · Idea &amp; creativity</td>
                <td>
                  <button className="linkbtn" data-go="solution">
                    3 Our solutions
                  </button>{" "}
                  ·{" "}
                  <button className="linkbtn" data-go="decision">
                    5 Our decision
                  </button>{" "}
                  ·{" "}
                  <button className="linkbtn" data-go="app">
                    6 CampusMeal app
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Suggest a course of action</b>
                </td>
                <td>3 · Planning &amp; action</td>
                <td>
                  <button className="linkbtn" data-go="plan">
                    7 Action plans
                  </button>
                  : one plan per solution ·{" "}
                  <button className="linkbtn" data-go="app-protocol">
                    App protocol
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Learn from the results</b>
                </td>
                <td>4 · Results &amp; learning</td>
                <td>
                  <button className="linkbtn" data-go="survey-conclusion">
                    4 Survey results
                  </button>{" "}
                  ·{" "}
                  <button className="linkbtn" data-go="results">
                    8 Results &amp; learning
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="sec-h">
          <svg className="ic lg">
            <use href="#i-chart"></use>
          </svg>
          <div>
            <div className="eyebrow">In numbers</div>
            <h2>Four things to know</h2>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <svg className="ic">
              <use href="#i-store"></use>
            </svg>
            <div className="v">
              <CountUp to={40} suf="%">
                40%
              </CountUp>
            </div>
            <div className="l">
              of the world’s consumer-level food waste comes from <b>food service and retail</b>
            </div>
            <div className="s">UNEP (2024)</div>
          </div>
          <div className="stat">
            <svg className="ic">
              <use href="#i-plate"></use>
            </svg>
            <div className="v">
              <CountUp to={118} suf=" g">
                118 g
              </CountUp>
            </div>
            <div className="l">
              wasted per meal in Hanoi school kitchens, and <b>nobody measured it until 2024</b>
            </div>
            <div className="s">Pham et al. (2025)</div>
          </div>
          <div className="stat">
            <svg className="ic">
              <use href="#i-law"></use>
            </svg>
            <div className="v">0</div>
            <div className="l">
              Vietnamese laws that <b>penalise food waste or protect food donors</b>
            </div>
            <div className="s">Harvard FLPC &amp; GFN (2024)</div>
          </div>
          <div className="stat g">
            <svg className="ic">
              <use href="#i-coin"></use>
            </svg>
            <div className="v">$7 : $1</div>
            <div className="l">
              typical saving per dollar restaurants invest in <b>preventing</b> waste
            </div>
            <div className="s">Champions 12.3 (2019)</div>
          </div>
        </div>
        <div className="sec-h">
          <svg className="ic lg">
            <use href="#i-users"></use>
          </svg>
          <div>
            <div className="eyebrow">Effort</div>
            <h2>What went into this project</h2>
          </div>
        </div>
        <div className="effort" id="effort">
          <div>
            <b>{REF_COUNT}</b>
            <span>sources cited</span>
          </div>
          <div>
            <b>8</b>
            <span>Vietnamese laws checked</span>
          </div>
          <div>
            <b>8</b>
            <span>ethical theories applied</span>
          </div>
          <div>
            <b>6</b>
            <span>ideas considered</span>
          </div>
          <div>
            <b>3</b>
            <span>action plans</span>
          </div>
          <div>
            <b>14</b>
            <span>app functions</span>
          </div>
          <div>
            <b>5</b>
            <span>statistical tests</span>
          </div>
          <div>
            <b>12</b>
            <span>week roadmap</span>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
