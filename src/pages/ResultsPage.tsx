// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import { Field, SV } from "../components";

export default function ResultsPage() {
  return (
    <PageSection id="results">
      <div className="wrap phead">
        <StageStepper current={8} />
        <h1>Results &amp; learning</h1>
        <p className="lede">
          What happened, what difference it made, and what we learned. Every number here comes from our own audit, sales records and survey.
        </p>
        {/* <p className="stage-note">Design thinking: Learn. Rubric 4: Results &amp; learning.</p> */}
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
        <Tab id="learned" label="What we learned">
          <div className="tab-title">
            <h2>What we learned</h2>
          </div>
          <details className="acc" open>
            <summary>1. Most social problems are designed, not accidental</summary>
            <div className="in">
              <p>
                We first assumed food waste came from careless individuals: students who don’t finish their plates. The research
                showed something different. Most waste is built into the system: kitchens cook “just in case”, everyone gets the
                same portion, and nobody measures what is thrown away. This changed how we see social problems in general. When
                a harmful outcome repeats every day, it is usually the result of rules, habits and incentives, not individual
                bad intentions. To fix a social problem, look first at the system that produces it, not only at the people
                inside it.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>2. Responsibility follows power and the capacity to act</summary>
            <div className="in">
              <p>
                Everyone contributes a little to food waste, but not everyone has the same power to stop it. A student decides
                one plate; a canteen manager decides hundreds of meals a day. Iris Young’s social connection model helped us see
                this clearly. Responsibility for structural injustice is shared, but those with more power, more privilege and
                more ability to act carry more of it. The same applies to fast fashion, pollution or unfair wages: asking “who
                can change this most easily?” is often more useful than asking “who is to blame?”
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>3. Legal is not the same as ethical</summary>
            <div className="in">
              <p>
                Vietnamese law lets businesses throw away safe food and makes donating it legally risky. Nothing about food
                waste breaks the law, yet it harms the environment, wastes resources and ignores people who go hungry. Carroll’s
                CSR pyramid reminded us that legal compliance is the floor, not the ceiling. Ethics matters most precisely where
                the law is silent, weak or slow, and in many social problems the law is all three.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>4. What is not measured is not managed, and often not seen</summary>
            <div className="in">
              <p>
                Food waste is invisible because it disappears the moment a tray is scraped. Many social problems stay unsolved
                for the same reason: unpaid care work, informal waste pickers, hidden supply-chain abuses. We learned that
                making a problem visible, by counting, weighing and recording it, is the first ethical act. Data does not solve
                a problem by itself, but without it, problems are easy to deny and impossible to track.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>5. Every solution creates new ethical questions</summary>
            <div className="in">
              <p>
                Discounting leftovers can teach customers to wait for cheap food and push kitchens to over-cook. Donating
                surplus can harm dignity or safety if done badly. Even “nudges” like smaller default portions raise questions
                about respecting people’s choices. We learned to ask of every solution: Who benefits? Who carries the risk?
                Could this make the problem worse in another way? This is the heart of applied ethics. Good intentions are not
                enough; consequences and fairness must be checked too.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>6. Prevention is more ethical than cure</summary>
            <div className="in">
              <p>
                The food recovery hierarchy taught us that preventing waste is better than rescuing it, and rescuing it is
                better than throwing it away. The same principle applies widely: preventing pollution is better than cleaning it
                up, and preventing poverty is better than relying on charity. We also learned to recognise “CSR-washing”: when
                an organisation is praised for donating surplus while continuing to over-produce. Real responsibility means
                fixing the root cause, not only managing the symptoms.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>7. Different ethical theories light up different parts of the same problem</summary>
            <div className="in">
              <ul className="clean">
                <li>
                  <b>Utilitarianism</b> showed us the total harm: money, emissions and land wasted.
                </li>
                <li>
                  <b>Kant</b> reminded us that people must not be used as a free dumping ground for costs.
                </li>
                <li>
                  <b>Rawls</b> asked us to judge the system from the position of the least advantaged.
                </li>
                <li>
                  <b>Stakeholder theory</b> made us list everyone affected, from kitchen staff to landfill neighbours.
                </li>
                <li>
                  <b>Virtue ethics</b> made us question whether “generous” portions were generosity or display.
                </li>
              </ul>
              <p>
                No single theory gave the full answer, but together they showed the problem from every side. Using several
                lenses is the best protection against a one-sided judgement.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>8. Listening to stakeholders changes the solution</summary>
            <div className="in">
              <p>
                We first designed solutions for the canteen; talking with staff and students made them realistic. Students told
                us what they actually eat; kitchen staff knew which dishes come back and why. Social change that ignores the
                people it affects often fails or causes harm. The people closest to a problem usually hold the knowledge needed
                to solve it, and including them is both more effective and more respectful.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>9. Awareness is the start of change, not the end</summary>
            <div className="in">
              <p>
                Our campaign reached 822 views and created 638 interactions, far more than we expected. But we learned to be
                honest: attention is not the same as impact. Awareness builds support and makes change socially acceptable, yet
                it rarely changes behaviour on its own. The same is true of most social campaigns. Awareness works when it is
                connected to an easy, concrete action and to a change in the system.
              </p>
            </div>
          </details>
        </Tab>
        <Tab id="campaign" label="Campaign in Action">
          <div className="tab-title">
            <h2>Campaign in Action</h2>
          </div>
          <p className="tab-intro">How we took the message to students: posters around campus and posts on social media.</p>
          <h3 style={{ margin: "26px 0 12px" }}>Posters on campus</h3>
          <div className="gallery">
            <figure>
              <img src="social media post/Media (2).jpg" alt="Our poster “Nearly a third of school lunch goes in the bin” on a whiteboard" loading="lazy" />
              <figcaption>Our poster: “Nearly a third of school lunch goes in the bin”</figcaption>
            </figure>
            <figure>
              <img src="social media post/Media (4).jpg" alt="The poster pinned to a cork noticeboard with a QR code" loading="lazy" />
              <figcaption>On a campus noticeboard</figcaption>
            </figure>
            <figure>
              <img src="social media post/Media (1).jpg" alt="The poster among other notices on a cork board" loading="lazy" />
              <figcaption>Among the other notices students walk past</figcaption>
            </figure>
            <figure>
              <img src="social media post/Media (3).jpg" alt="The poster on a noticeboard next to other campaign posters" loading="lazy" />
              <figcaption>Next to other campus posters</figcaption>
            </figure>
            <figure>
              <img src="social media post/Media (5).jpg" alt="The poster on the glass of a canteen food counter, beside trays of fried chicken" loading="lazy" />
              <figcaption>At the canteen counter, where portions are chosen</figcaption>
            </figure>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Online</h3>
          <div className="gallery">
            <figure>
              <img src="social media post/Facebook.png" alt="Our Facebook post “Before You Scrape Your Tray” with a photo of a full lunch tray" loading="lazy" />
              <figcaption>Facebook: “Before You Scrape Your Tray”</figcaption>
            </figure>
            <figure>
              <img src="social media post/2.png" alt="Our Threads post “118 grams” with photos of a canteen bin and counter" loading="lazy" />
              <figcaption>Threads: “118 grams”</figcaption>
            </figure>
            <figure>
              <img src="social media post/1.png" alt="Threads insights: 496 interactions, 61 reposts, 81 replies, 56 quotes, 55 follows" loading="lazy" />
              <figcaption>Threads insights: 496 interactions, 55 new follows</figcaption>
            </figure>
            <figure>
              <img src="social media post/3.png" alt="Threads insights: 822 total views, 91% from the home feed" loading="lazy" />
              <figcaption>Threads insights: 822 views</figcaption>
            </figure>
          </div>
        </Tab>
        <Tab id="awareness" label="Reach and Engagement">
          <div className="tab-title">
            <h2>Awareness campaign</h2>
          </div>
          <p className="tab-intro">
            Before asking the canteen to cook differently, we wanted students to start seeing a problem that usually goes unnoticed. Food
            waste is easy to ignore because it vanishes the moment a tray is scraped. Our campaign set out to make it visible: on the walls
            students pass every day, and on the feeds they scroll every evening.
          </p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>On campus</h3>
              <p>
                Between 10 and 25 October, we designed, printed and put up <b>5 posters</b> in the places where eating habits are formed:
                the canteen, the JA, JB and T dormitories, and classrooms. The canteen poster met students at the moment of choosing a
                portion. The dormitory and classroom posters followed them into everyday life, so the message wasn’t something they saw
                once and forgot.
              </p>
            </div>
            <div className="panel stack">
              <h3>Online</h3>
              <p>
                We published <b>2 posts</b> on Threads and Facebook to reach students outside campus hours, using real figures from our
                research: around <span className="hl">118 g</span> of every school lunch in Hanoi is thrown away, and most of it comes
                from kitchens cooking “just in case”.
              </p>
            </div>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Reach and engagement</h3>
          <p className="prose" style={{ marginBottom: "12px" }}>
            The two posts gained 822 views, 496 reactions, 61 reposts and 81 comments.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="v">822</div>
              <div className="l">views</div>
            </div>
            <div className="stat">
              <div className="v">496</div>
              <div className="l">reactions</div>
            </div>
            <div className="stat">
              <div className="v">61</div>
              <div className="l">reposts</div>
            </div>
            <div className="stat">
              <div className="v">81</div>
              <div className="l">comments</div>
            </div>
          </div>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <div className="comp">
              <div className="comp-h">
                <h3>638 interactions from 822 views</h3>
              </div>
              <p className="small">
                Together, reactions, reposts and comments are roughly 0.78 interactions per view, far above what a typical student post
                receives.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>Reposts</h3>
              </div>
              <p className="small">
                Students shared the message 61 times, carrying it into networks our team could never have reached alone.
              </p>
            </div>
            <div className="comp">
              <div className="comp-h">
                <h3>Comments</h3>
              </div>
              <p className="small">
                81 comments show that people did not just scroll past. They stopped, thought and responded, turning a one-way message into
                a conversation about why food is wasted and who is responsible.
              </p>
            </div>
          </div>
          <div className="callout g" style={{ marginTop: "16px" }}>
            <b>What this means.</b> Two weeks, five posters and two posts, made with almost no budget, were enough to get hundreds of
            students talking about a problem most of them had never thought about. The campaign created attention, conversation and social
            permission for change. These are the conditions Solution B needs: students who understand why portion choice and pre-ordering
            matter are far more likely to use them.
          </div>
          <div className="callout" style={{ marginTop: "16px" }}>
            <b>Being honest about its limits.</b> Awareness is not the same as less waste. Our campaign changed what people saw and talked
            about; it did not, by itself, change how much the kitchen cooks. That is exactly why we treat communication as a supporting
            nudge for Solution B, not as the solution. The next step is to link this awareness to measurable action: weighing canteen
            waste before and after, and tracking how many students choose smaller portions.
          </div>
        </Tab>
        <Tab id="next" label="Limits & next steps">
          <div className="tab-title">
            <h2>Limitations</h2>
          </div>
          <div className="grid g2">
            <div className="panel stack">
              <h3>1. Short time frame and small scale</h3>
              <p>
                Our project ran for only a few weeks within one semester. The awareness campaign lasted 15 days (10–25 October) and focused
                on one university. This is enough to test ideas and gauge reactions, but not to show lasting change in how canteens cook or
                how students eat. Food waste also varies by season, menu and exam period, so a short window may not reflect a typical month.
              </p>
            </div>
            <div className="panel stack">
              <h3>2. Awareness is not the same as behaviour change</h3>
              <p>
                Our campaign reached 822 views and generated 638 interactions. These numbers show attention and conversation, not reduced
                waste. One view can come from the same person more than once, and the people who react are mostly friends and peers who
                already care. Without weighing waste before and after the campaign over a longer period, we cannot claim that our posters or
                posts reduced the amount of food thrown away.
              </p>
            </div>
            <div className="panel stack">
              <h3>3. Survey limits</h3>
              <ul className="clean">
                <li>
                  <b>Sampling:</b> responses came mainly from students in our own networks (convenience sampling), so they may not
                  represent all students, staff or other canteens.
                </li>
                <li>
                  <b>Self-report:</b> the survey measured what people say they think and would do. It did not measure what they actually do
                  at lunch.
                </li>
                <li>
                  <b>Social desirability:</b> respondents may have rated “ethical” options more favourably because they knew the topic was
                  food waste.
                </li>
                <li>
                  <b>Scope:</b> the ANOVA and Tukey tests show which solution students rated as most effective. They do not prove which
                  solution works best in practice.
                </li>
              </ul>
            </div>
            <div className="panel stack">
              <h3>4. Limited control over the root cause</h3>
              <p>
                The main driver of waste is a business decision: how much the kitchen cooks and how large a standard portion is. As
                students we can recommend, persuade and pilot, but the canteen operator decides menus, portions and procurement. Real
                progress on Solution B depends on the canteen’s willingness and capacity to change.
              </p>
            </div>
            <div className="panel stack">
              <h3>5. Legal and safety barriers for redistribution (Solution C)</h3>
              <p>
                Vietnam has no Good Samaritan law protecting food donors, and date labels do not separate safety from quality. Donating
                surplus therefore carries legal and food-safety risk. For this reason we treat Solution C as a careful, partner-led
                complement, not something students can run alone.
              </p>
            </div>
            <div className="panel stack">
              <h3>6. The CampusMeal app is a prototype</h3>
              <p>
                The app shows how forecasting, pre-orders, portion choice and waste logging could work together. However, it has not been
                used by the canteen in daily service. Its forecasts need several weeks of real sales and waste data before they become
                reliable.
              </p>
            </div>
          </div>
          <div className="tab-title" style={{ marginTop: "30px" }}>
            <h2>Next steps</h2>
          </div>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>When</th>
                  <th>Action</th>
                  <th>Owner</th>
                  <th>How we will measure it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Next 2–4 weeks</td>
                  <td>
                    Weigh canteen waste (preparation, overproduction, plate waste) for at least 5 lunches to set a real baseline in g per meal
                  </td>
                  <td>Data and audit lead + canteen staff</td>
                  <td>Baseline waste in g per meal; top 3 most-wasted dishes</td>
                </tr>
                <tr>
                  <td>Next 2–4 weeks</td>
                  <td>Share our survey findings and campaign results with the canteen manager; agree on one low-risk pilot</td>
                  <td>Project leader + canteen liaison</td>
                  <td>Pilot agreed in writing</td>
                </tr>
                <tr>
                  <td>Month 2</td>
                  <td>
                    Pilot Solution B on 2–3 popular dishes: smaller default portion with free refill, plus simple forecasting from pre-orders
                    or sales records
                  </td>
                  <td>Canteen manager + kitchen supervisor, with project team support</td>
                  <td>At least 10–15% less waste on pilot dishes, with no drop in student satisfaction</td>
                </tr>
                <tr>
                  <td>Month 2</td>
                  <td>Re-run the campaign alongside the pilot, using posters at the counter that explain portion choice</td>
                  <td>Communications lead</td>
                  <td>Share of students choosing the smaller portion; waste weighed before vs after</td>
                </tr>
                <tr>
                  <td>Month 3</td>
                  <td>
                    Add Solution A: discount genuine surplus in the last 30–60 minutes, with clear food-safety rules (cooked within 2 hours,
                    kept hot)
                  </td>
                  <td>Canteen manager + cashier</td>
                  <td>Share of surplus sold; zero safety complaints; check students are not waiting for discounts</td>
                </tr>
                <tr>
                  <td>Month 3+</td>
                  <td>
                    Explore Solution C with a trained partner (Hanoi Food Rescue, VietHarvest or Food Bank Vietnam) and ask the university for
                    advice on liability
                  </td>
                  <td>Partnership lead + university operations</td>
                  <td>Partner agreement; meals and kg donated; zero safety incidents</td>
                </tr>
                <tr>
                  <td>End of semester</td>
                  <td>
                    Evaluate results, check for unintended harms (staff workload, food quality, student choice), and present a recommendation
                    to university management
                  </td>
                  <td>Whole team</td>
                  <td>Decision to continue, change or scale up, based on evidence</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
