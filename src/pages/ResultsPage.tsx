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
            <b>12</b>
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
          <p className="tab-intro">
            Twelve lessons in four groups: the problem, the ethics, the evidence and our own process. For each one: what we assumed at the
            start, what we found, and what it changed in our project.
          </p>
          <h3 style={{ margin: "26px 0 12px" }}>About the problem</h3>
          <details className="acc" open>
            <summary>1. Responsibility sits where decisions are made</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> Food waste is mostly a household habit, so the answer is to tell people not to waste. Households do
                produce about 60% of the food wasted worldwide (UNEP, 2024).
              </p>
              <p>
                <b>What we found.</b> In a canteen, the customer chooses almost nothing. How much is bought, how much is cooked, how large
                the default portion is and what happens to leftovers are all decided by the business, and one decision affects hundreds of
                meals at once. Customers share responsibility for plate waste, but the business designs the choice.
              </p>
              <p>
                <b>What it changed.</b> We stopped designing awareness campaigns and focused on the canteen’s own decisions. We also
                learned to separate the firm from its staff: rules like “bin everything at closing” are company policy, so front-line
                workers should never carry the blame (French, 1979).
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>2. What is not measured cannot be managed</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> A canteen roughly knows how much it throws away.
              </p>
              <p>
                <b>What we found.</b> Vietnam has no national data on food-service waste, and Hanoi school kitchens were first weighed only
                in 2024 (Pham et al., 2025). Before our audit, our canteen <Field id="l_knew">did / did not</Field> know how much it
                wasted. The Hanoi study also showed that <em>where</em> waste happens depends on how food is served: primary schools lost
                most food before serving, secondary schools on the plate.
              </p>
              <p>
                <b>What it changed.</b> Measuring became our first step, not an afterthought. Our audit separates preparation waste,
                overproduction and plate waste, because each has a different fix. It costs little: one scale, three bins and one sheet.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>3. Waste has many causes, so no single fix works</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> Portions are too big; make them smaller.
              </p>
              <p>
                <b>What we found.</b> The causes sit in methods (cooking by habit, one portion size), people (dislike of certain dishes),
                culture (the <em>mâm cơm đầy</em>, the full table as hospitality), law (no donor protection) and infrastructure (mixed
                collection, landfill). Menu design alone matters: disliked mixed vegetables pushed vegetable plate waste from 25 g to 40 g
                (Pham et al., 2025).
              </p>
              <p>
                <b>What it changed.</b> We combined three solutions in a fixed order: prevent (B), then rescue (A), then redistribute
                safely (C), with plate-waste feedback so the menu itself can change.
              </p>
            </div>
          </details>
          <h3 style={{ margin: "26px 0 12px" }}>About the ethics</h3>
          <details className="acc">
            <summary>4. Legal is not the same as ethical</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> If wasting food were really wrong, the law would forbid it.
              </p>
              <p>
                <b>What we found.</b> Vietnamese law does not penalise food waste, does not protect donors and does not separate safety
                dates from quality dates (Harvard FLPC &amp; GFN, 2024). The new Law on Thrift and Anti-Waste (No. 110/2025/QH15) only{" "}
                <em>encourages</em> thrift in private business. The legal gap even pulls the wrong way: liability risk makes the bin the
                safest legal choice.
              </p>
              <p>
                <b>What it changed.</b> We argued from Carroll’s (1991) ethical layer rather than from compliance, and wrote our own
                safety protocol for Solution C instead of waiting for a Good Samaritan law.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>5. Good solutions can create new ethical problems</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> Any idea that reduces waste is a good idea.
              </p>
              <p>
                <b>What we found.</b> Every solution carried its own risk. A reliable discount or donation channel can make a kitchen
                careless about over-cooking (moral hazard). Food held too long can harm the people it is meant to help. A smaller default
                portion can feel like “getting less”. An app collects personal data. Weighing adds work for staff.
              </p>
              <p>
                <b>What it changed.</b> Each risk got a safeguard: last calls not every day, and never cooking “for donation”; a 2-hour,
                above-60 °C rule (WHO, 2006); a free refill; the kitchen sees only totals of 5 people or more; weighing built into paid
                shifts. Prevention stays the main KPI, so rescue never becomes the target.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>6. Different theories, one verdict, different duties</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> Choosing one ethical theory would be enough.
              </p>
              <p>
                <b>What we found.</b> All eight lenses condemn a standing policy of binning safe food, so the verdict does not depend on
                any single theory. They disagree on what follows: Friedman sees no duty to donate, while Kant, Rawls and Young see at least
                an imperfect duty for firms that can. Sen (1981) warned that hunger is a lack of access, not of food, so surplus does not
                automatically feed anyone.
              </p>
              <p>
                <b>What it changed.</b> We treat prevention as obligatory and safe redistribution as strongly expected, and we rank{" "}
                <b>prevention above donation</b> in every plan.
              </p>
            </div>
          </details>
          <h3 style={{ margin: "26px 0 12px" }}>About the evidence</h3>
          <details className="acc">
            <summary>7. Not all evidence is equal</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> A published number is a reliable number.
              </p>
              <p>
                <b>What we found.</b> A survey run with a refrigerator brand had a potential conflict of interest, so we did not rely on
                it. Some widely repeated figures did not match their original sources. Self-reported surveys are weaker than weighed food.
                Even good papers differ between sections, so we show ranges where they do.
              </p>
              <p>
                <b>What it changed.</b> We check who funded a study, go back to the original source, and label each number with how it was
                collected.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>8. Benchmarks are not predictions</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> If restaurants cut waste by 26% in a year, we can too.
              </p>
              <p>
                <b>What we found.</b> The 21–36% benchmarks come from large international firms that chose to measure their waste and ran
                programmes for a full year (Champions 12.3, 2018a, 2018b, 2019). A student pilot in one canteen is shorter and smaller.
              </p>
              <p>
                <b>What it changed.</b> We set a realistic minimum target of 15% less waste per meal, with 20–30% as a stretch goal, and we
                report the result honestly even if we miss it.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>9. Scores need judgement, and judgement should be visible</summary>
            <div className="in">
              <p>
                <b>What we assumed.</b> Scoring the solutions would give one clear answer.
              </p>
              <p>
                <b>What we found.</b> Without weights, Solutions A and B tied at 17.0 out of 20. The ranking depended on how much we
                valued effectiveness against feasibility, which is a judgement, not a fact.
              </p>
              <p>
                <b>What it changed.</b> We published our weights and reasons, let readers move the sliders themselves, and tested the
                shortlist with people through the survey and statistical analysis instead of relying only on our own scores.
              </p>
            </div>
          </details>
          {/* <h3 style={{ margin: "26px 0 12px" }}>About our process</h3>
          <details className="acc">
            <summary>10. Talking to people changed our design</summary>
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
            <summary>11. What happened in our pilot</summary>
            <div className="in">
              <p>
                <Field id="l_pilot">
                  What worked, what did not, what surprised us, what we would do differently, and how the team worked together.
                </Field>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>12. How we worked as a team, and what we would do again</summary>
            <div className="in">
              <p>
                <Field id="l_team">How we split the work, what went well, one conflict or difficulty and how we solved it.</Field>
              </p>
              <p>
                <Field id="l_again">
                  e.g. start weighing earlier, randomise the order of solutions in the survey, involve kitchen staff from day one.
                </Field>
              </p>
            </div>
          </details> */}
          <div className="callout g" style={{ marginTop: "18px" }}>
            <b>The lesson behind all the others.</b> Food waste in a canteen is less a problem of bad habits than of decisions nobody
            measures. Make the decisions visible, put prevention first, protect the people each fix could harm, and report honestly.
          </div>
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
