// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import {
  Card,
  DilemmaScore,
  Dilemmas,
  ExcuseFlips,
  Field,
  FilterButtons,
  FlipAllButton,
  Front,
  MediaSlot,
  More,
  QuoteCarousel,
  Verdict,
  VerdictGrid,
} from "../components";

export default function EthicsPage() {
  return (
    <PageSection id="ethics">
      <div className="wrap phead">
        <StageStepper current={2} />
        <div className="eyebrow">
          <span>Step 2 · Define</span>
          <span className="rubric">Rubric 5 · Connections to ethics</span>
        </div>
        <h1>Why is it an ethical problem?</h1>
        <p className="lede">
          When a restaurant, hotel, wedding venue, canteen or supermarket throws away food that was safe to eat, a business is making a
          moral choice, not “Hanoi” in the abstract. We test that claim against eight theories from the course.
        </p>
        <div className="takeaways">
          <div>
            <svg className="ic">
              <use href="#i-scale"></use>
            </svg>
            <b>8 of 8</b>
            <span>ethical lenses find routine binning of safe food wrong (1 only partly)</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-law"></use>
            </svg>
            <b>0</b>
            <span>Vietnamese laws penalise food waste or protect donors</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-users"></use>
            </svg>
            <b>2,000+</b>
            <span>families near Nam Sơn bear costs they did not choose</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-coin"></use>
            </svg>
            <b>$6–7</b>
            <span>saved per $1 spent on prevention, so waste is a choice</span>
          </div>
        </div>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="claim" label="Our claim">
          <div className="tab-title">
            <h2>Five reasons it is an ethical problem</h2>
          </div>
          <p className="tab-intro">Not just an operating cost. Open each reason for the argument behind it.</p>
          <div className="grid g3">
            <Card title="Control" tag="Reason 1">
              <div className="tagline">Reason 1</div>
              <Front>
                <h3>Control</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  The firm decides how much to buy, cook, portion, display and discard.
                </p>
              </Front>
              <More>
                <p>
                  Moral responsibility follows the capacity to act, usually summarised as “ought implies can”. The more control an agent has
                  over an outcome, the stronger its responsibility for it. In almost every stage of the food journey, the decisive choice is
                  made inside the firm.
                </p>
              </More>
              <button className="open">Read the argument</button>
            </Card>
            <Card title="Cost shifting" tag="Reason 2">
              <div className="tagline">Reason 2</div>
              <Front>
                <h3>Cost shifting</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  The firm keeps the benefits of over-provision; <span className="hl">others pay the costs</span>.
                </p>
              </Front>
              <More>
                <p>
                  <b>Benefits to the firm:</b> no stock-outs, an image of abundance, simple operations, no donation risk.
                </p>
                <p>
                  <b>Costs to others:</b> landfill neighbours, waste workers, the climate and future generations, none of whom agreed to
                  bear them. Economists call these <b>negative externalities</b>.
                </p>
              </More>
              <button className="open">Read the argument</button>
            </Card>
            <Card title="Neglected stakeholders" tag="Reason 3">
              <div className="tagline">Reason 3</div>
              <Front>
                <h3>Neglected stakeholders</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Customers, staff and hungry people are treated as if they do not count.
                </p>
              </Front>
              <More>
                <p>Customers pay for portions larger than many want, staff are told to bin edible food, and people in need are bypassed.</p>
              </More>
              <button className="open">Read the argument</button>
            </Card>
            <Card title="The law does not close the gap" tag="Reason 4">
              <div className="tagline">Reason 4</div>
              <Front>
                <h3>The law does not close the gap</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  No penalty for waste, <span className="hl">no protection for donors</span>, no clear date labels.
                </p>
              </Front>
              <More>
                <p>
                  Vietnamese law does not penalise food waste, does not protect donors from liability, and does not separate safety dates
                  from quality dates (Harvard FLPC &amp; GFN, 2024). The new Law on Thrift and Anti-Waste (No. 110/2025/QH15) only{" "}
                  <em>encourages</em> thrift in private business. Where the law stops, Carroll’s (1991) ethical layer of responsibility
                  begins.
                </p>
              </More>
              <button className="open">Read the argument</button>
            </Card>
            <Card title="Prevention usually pays" tag="Reason 5">
              <div className="tagline">Reason 5</div>
              <Front>
                <h3>Prevention usually pays</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Firms typically save <span className="hl">US$6–7 per US$1</span> invested in cutting waste.
                </p>
              </Front>
              <More>
                <p>
                  In benchmark studies, restaurants, hotels and caterers saved about US$6–7 for every US$1 invested in measuring and
                  preventing waste (Champions 12.3, 2018a, 2018b, 2019). So continuing to waste usually reflects habit and lack of
                  measurement, not necessity.
                </p>
                <p>
                  These are international firms that chose to measure their waste, so a Hanoi canteen may save less, but the direction is
                  clear.
                </p>
              </More>
              <button className="open">Read the argument</button>
            </Card>
            <Card
              title="8 lenses, 1 verdict"
              tag="How we tested it"
              style={{ background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" }}
            >
              <div className="tagline" style={{ color: "var(--paper)", opacity: ".7" }}>
                How we tested it
              </div>
              <Front>
                <h3>8 lenses, 1 verdict</h3>
                <p className="small" style={{ marginTop: "6px" }}>
                  Business theories, classical ethics, justice and environmental ethics. Every lens reached the same conclusion.
                </p>
              </Front>
              <button className="open" data-go="ethics-verdict">
                See the verdict
              </button>
            </Card>
          </div>
        </Tab>
        <Tab id="excuses" label="Excuses vs reality">
          <div className="tab-title">
            <h2>What businesses say vs what the research shows</h2>
          </div>
          <p className="tab-intro">Typical statements, not quotes from any named company. Flip one card at a time, or switch them all.</p>
          <div className="switch" role="group" aria-label="Show">
            <FlipAllButton v="0">What businesses often say</FlipAllButton>
            <FlipAllButton v="1">What the research shows</FlipAllButton>
          </div>
          <ExcuseFlips className="grid g3" />
        </Tab>
        <Tab id="responsibility" label="Who is responsible?">
          <div className="tab-title">
            <h2>Who decides? The responsibility map</h2>
          </div>
          <p className="tab-intro">For each kind of waste, who makes the decision that creates it.</p>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Waste stream</th>
                  <th>Who decides</th>
                  <th>What the business controls</th>
                  <th>Ethical issue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Over-purchasing, spoiled stock</b>
                  </td>
                  <td>Purchasing manager</td>
                  <td>Order quantities, first-expired-first-out rotation, supplier terms</td>
                  <td>Careless use of resources</td>
                </tr>
                <tr>
                  <td>
                    <b>Overproduction</b>
                  </td>
                  <td>Head chef, operations manager</td>
                  <td>Forecasting, batch cooking, menu size</td>
                  <td>Treating food as disposable</td>
                </tr>
                <tr>
                  <td>
                    <b>Plate waste “by design”</b>
                  </td>
                  <td>Owner, marketing</td>
                  <td>Default portion, set menus, refill policy</td>
                  <td>Customers pay for food likely to be left</td>
                </tr>
                <tr>
                  <td>
                    <b>Unsold date-coded food</b>
                  </td>
                  <td>Store and head-office policy</td>
                  <td>Markdowns, donation contracts, how date labels are read</td>
                  <td>Safe food destroyed while others go hungry</td>
                </tr>
                <tr>
                  <td>
                    <b>Surplus that could be donated</b>
                  </td>
                  <td>Senior management, legal team</td>
                  <td>Partnerships and safety protocols</td>
                  <td>Unmet duty to help; fear of liability</td>
                </tr>
                <tr>
                  <td>
                    <b>Disposal route</b>
                  </td>
                  <td>Facilities manager</td>
                  <td>Sorting, composting, animal feed or the mixed bin</td>
                  <td>Environmental harm pushed onto others</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout" style={{ marginTop: "16px" }}>
            <b>In almost every row, the decisive choice is made inside the firm.</b> Customers share responsibility for plate waste, but the
            business designs the choice, so it carries the larger share.
          </div>
          <h3 style={{ margin: "30px 0 12px" }}>Can a company be morally responsible at all?</h3>
          <details className="acc" open>
            <summary>The objection</summary>
            <div className="in">
              <p>
                <b>Velasquez (1983):</b> only people have minds and act. A corporation cannot be morally responsible; only the individuals
                inside it can.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>Two replies</summary>
            <div className="in">
              <p>
                <b>French (1979):</b> a corporation has a Corporate Internal Decision Structure: policies, procedures and lines of
                authority. A decision made through it, such as “discard all buffet food at 10:30”, is the corporation’s own decision, not
                just the sum of individual choices.
              </p>
              <p>
                <b>Goodpaster &amp; Matthews (1982):</b> a firm can and should have a “conscience”. Rationality and respect for others can
                be built into corporate policy.
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>Our position</summary>
            <div className="in">
              <p>
                We treat the firm as responsible for its policies, while individual managers remain accountable in their roles. Rules like
                “throw away unsold food at closing” are company policy, not the choice of the kitchen worker who carries them out, so
                front-line staff should not carry the blame.
              </p>
            </div>
          </details>
        </Tab>
        <Tab id="lenses" label="8 ethical lenses">
          <div className="tab-title">
            <h2>Eight ethical lenses</h2>
          </div>
          <p className="tab-intro">
            Each card gives the theory, how it applies to corporate food waste, its limits and the verdict. Filter by family of theory.
          </p>
          <FilterButtons group="lens" cats={["Business theories", "Classical ethics", "Justice", "Environment"]} className="filters" />
          <div className="grid g2" data-cards="lens">
            <Card
              title="Friedman · shareholder theory"
              tag="Friedman · shareholder theory"
              group="lens"
              showFront
              cat="Business theories"
              lens="friedman"
            >
              <div className="tagline">Friedman · shareholder theory</div>
              <Verdict className="verdict part">◐ Partly fails</Verdict>
              <Front>
                <p>
                  Even a profit-maximiser should cut waste: <span className="hl">wasted food is lost profit.</span>
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> Managers should maximise profit “while conforming to the basic rules of the society, both those embodied in
                  law and those embodied in ethical custom” (Friedman, 1970).
                </p>
                <p>
                  <b>What Friedman would say.</b> Cut waste for efficiency: restaurants cut kitchen waste by <b>26%</b> in one year and
                  saved about US$7 per US$1 (114 restaurants, 12 countries); hotels by about 21% (42 hotels, 15 countries); caterers by{" "}
                  <b>36%</b>, saving more than US$6 per US$1 (86 sites, 6 countries) (Champions 12.3, 2018a, 2018b, 2019). In Vietnam, Meliá
                  Hồ Tràm cut food waste by 40% and ingredient costs by 8% (VOV, n.d.). But Friedman would <em>not</em> require donation,
                  and Vietnamese law does not either.
                </p>
                <p>
                  <b>Our critique.</b> (1) The “rules of the game” are incomplete: a collection fee does not cover methane, landfill
                  pollution or waste-worker health, so profit partly depends on <b>negative externalities</b>. (2) Vietnamese ethical custom
                  condemns waste (<em>ăn quả nhớ kẻ trồng cây</em>, “when eating fruit, remember who planted the tree”;{" "}
                  <em>tiết kiệm, chống lãng phí</em>
                  ), and Law No. 110/2025/QH15 (passed 10 December 2025, in force 1 July 2026) extends thrift to business activity. (3) If
                  prevention pays and firms still waste, the cause is habit and lack of measurement: a management failure.
                </p>
                <p>
                  <b>Limit.</b> Friedman gives no reason to help people outside the firm.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card
              title="Freeman · stakeholder theory"
              tag="Freeman · stakeholder theory"
              group="lens"
              showFront
              cat="Business theories"
              lens="freeman"
            >
              <div className="tagline">Freeman · stakeholder theory</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  Costs fall on groups with <span className="hl">legitimate claims but no power.</span>
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> A stakeholder is any group that can affect or is affected by the firm’s objectives (Freeman, 1984).
                  Managers pay attention according to <b>power</b>, <b>legitimacy</b> and <b>urgency</b> (Mitchell, Agle &amp; Wood, 1997).
                </p>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>Stakeholder</th>
                        <th>How current practice treats them</th>
                        <th>Power / legitimacy / urgency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Shareholders, owners</td>
                        <td>Often unaware: waste is not measured</td>
                        <td>High / high / low</td>
                      </tr>
                      <tr>
                        <td>Customers</td>
                        <td>Fixed large portions, little choice</td>
                        <td>Medium / high / low</td>
                      </tr>
                      <tr>
                        <td>Employees</td>
                        <td>Bear the moral discomfort</td>
                        <td>Low / high / medium</td>
                      </tr>
                      <tr>
                        <td>Farmers, suppliers</td>
                        <td>Invisible at the point of disposal</td>
                        <td>Low–medium / high / low</td>
                      </tr>
                      <tr>
                        <td>Food-insecure people</td>
                        <td>Bypassed: the default is the bin</td>
                        <td>
                          <b>Very low</b> / high / high
                        </td>
                      </tr>
                      <tr>
                        <td>Landfill neighbours, waste workers</td>
                        <td>Bear costs without consent or insurance</td>
                        <td>
                          <b>Very low</b> / high / high
                        </td>
                      </tr>
                      <tr>
                        <td>Environment, future generations</td>
                        <td>Treated as a free sink</td>
                        <td>
                          <b>None</b> / high / high
                        </td>
                      </tr>
                      <tr>
                        <td>Government, community</td>
                        <td>Rules new and weakly enforced</td>
                        <td>High / high / medium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <b>Way forward.</b> Porter and Kramer’s (2011) <b>shared value</b>: forecasting and portion control raise profit{" "}
                  <em>and</em> reduce harm to silent stakeholders.
                </p>
                <p>
                  <b>Limit.</b> The salience ratings are our team’s judgement.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card title="Carroll · CSR pyramid" tag="Carroll · CSR pyramid" group="lens" showFront cat="Business theories" lens="carroll">
              <div className="tagline">Carroll · CSR pyramid</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  Legal is not enough. The <span className="hl">ethical layer is decisive</span> where the law is silent.
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> Firms have economic (required), legal (required), ethical (expected) and philanthropic (desired)
                  responsibilities (Carroll, 1991).
                </p>
                <p>
                  <b>Economic.</b> Many firms do not measure waste, so they lose money they could save.
                </p>
                <p>
                  <b>Legal.</b> The Law on Environmental Protection 2020 (Art. 75) requires organisations to sort domestic waste at source;
                  Decree 08/2022 (Art. 58) lets firms producing under 300 kg a day follow household rules; food-safety law penalises trading
                  expired food (Decree 115/2018, amended by Decree 124/2021). But there is no Good Samaritan law, no tax deduction, no
                  date-label distinction and no duty to donate (Harvard FLPC &amp; GFN, 2024).{" "}
                  <b>A firm can be fully legal and still bin tonnes of safe food.</b>
                </p>
                <p>
                  <b>Ethical.</b> Some firms go further: IHG’s InterContinental Hanoi Westlake and Landmark72 support VietHarvest (IHG,
                  2022); Hanoi Food Rescue partners; MM Mega Market’s food-waste sorting since 2023. Most still treat the bin as the
                  default.
                </p>
                <p>
                  <b>Philanthropic.</b> Food Bank Vietnam partnerships (Starbucks Vietnam since 2023; MM Mega Market, 500+ tonnes of surplus
                  managed and a 2026 circular-economy agreement, piloted in Ho Chi Minh City). Voluntary, fragmented and concentrated in
                  large brands.
                </p>
                <p>
                  <b>Two critical points.</b> (1) In Vietnam the legal layer pulls the wrong way: liability risk and unclear rules make the
                  bin the safest legal choice, so the ethical layer becomes <em>more</em> demanding. (2) Philanthropy must not replace
                  ethics: a firm that over-produces and then donates for publicity has the pyramid upside down.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card
              title="Bentham, Mill, Singer · utilitarianism"
              tag="Bentham, Mill, Singer · utilitarianism"
              group="lens"
              showFront
              cat="Classical ethics"
              lens="util"
            >
              <div className="tagline">Bentham, Mill, Singer · utilitarianism</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  Small private gain, large and widespread harm. <span className="hl">Prevention costs almost nothing.</span>
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> The right policy produces the greatest overall well-being, counting everyone equally (Bentham, 1789/1996;
                  Mill, 1863). Singer (1972, p. 231): “if it is in our power to prevent something bad from happening, without thereby
                  sacrificing anything of comparable moral importance, we ought, morally, to do it.”
                </p>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>Benefits to the firm</th>
                        <th>Costs to the firm</th>
                        <th>Costs to others</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Never running out; look of abundance; simple operations; no donation risk</td>
                        <td>Ingredients, labour, energy, water; disposal fees</td>
                        <td>
                          Methane (27× CO₂ over 100 years, ~80× over 20; IPCC, 2021); pressure on Nam Sơn; lost meals for the food-insecure;
                          risks to waste workers
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <b>Worked example.</b> A canteen serving <b>1,000 meals a day</b> at the Hanoi rate of 118 g discards about{" "}
                  <b>118 kg a day</b>, roughly 23.6 tonnes over 200 service days. Cutting this by 20–30% prevents{" "}
                  <b>4.7–7.1 tonnes a year</b>. (Try the calculator on the Problem page.)
                </p>
                <p>
                  <b>Singer’s test is met:</b> measurement and portion options cost little and usually save money.{" "}
                  <b>Rule utilitarianism:</b> “measure, prevent, redistribute safely”, applied across Hanoi, produces far more well-being
                  than “cook plenty, bin the rest”.
                </p>
                <p>
                  <b>Limit.</b> Totals can hide harm to a few (for example, giving unsafe food to poor people), so Kant and Rawls are needed
                  too.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card title="Kant · deontology" tag="Kant · deontology" group="lens" showFront cat="Classical ethics" lens="kant">
              <div className="tagline">Kant · deontology</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  The “bin it” rule cannot be willed for everyone, and people are used <span className="hl">merely as means.</span>
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> Act only on maxims you could will as universal law, and treat humanity never merely as a means but always
                  also as an end (Kant, 1785/1998). A maxim that cannot even be <em>conceived</em> universally breaks a perfect duty; one
                  that can be conceived but not rationally <em>willed</em> breaks an imperfect duty, such as beneficence (Kant, 1797/1996).
                </p>
                <p>
                  <b>Universal law.</b> Maxim: “When unsold food costs more to redistribute than to bin, I will bin it.” A world where every
                  firm does this is conceivable (it is close to today’s), but no rational owner, who is also a citizen and may one day need
                  help, could <em>will</em> it. This is a <b>contradiction in the will</b>: a breach of the imperfect duty of beneficence.
                </p>
                <p>
                  <b>Customers.</b> Portions set above need, to raise the bill or show generosity, treat customers as a means to revenue.
                  Honest portion choices respect them as rational agents.
                </p>
                <p>
                  <b>Employees.</b> Forcing staff to destroy edible food, sometimes under threat of discipline, uses them as instruments of
                  a policy they may find distressing.
                </p>
                <p>
                  <b>Recipients.</b> Donating food of uncertain safety, or for publicity photos, uses poor people as a disposal channel.
                  Safe, labelled food delivered with dignity treats them as ends.
                </p>
                <p>
                  <b>Honesty (perfect duty).</b> Claiming to be “green” while routinely binning food is deception.
                </p>
                <p>
                  <b>Limit.</b> Kant says we must help, but not how much, and protects nature only indirectly.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card title="Rawls, Young, Sen · justice" tag="Rawls, Young, Sen · justice" group="lens" showFront cat="Justice" lens="rawls">
              <div className="tagline">Rawls, Young, Sen · justice</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  Benefits stay private; <span className="hl">burdens fall on the least advantaged.</span>
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> Behind a “veil of ignorance” we would accept inequalities only if they benefit the least advantaged (Rawls,
                  1971). Rawls applies this to society’s basic institutions. Young (2011) adds the <b>social connection model</b>: everyone
                  who takes part in a structure that produces injustice shares responsibility for changing it, in proportion to their{" "}
                  <b>power, privilege, interest and collective ability</b>.
                </p>
                <p>
                  <b>Application.</b> The costs land on 2,000+ families near Nam Sơn, uninsured waste pickers and food-insecure groups
                  (nearly 1 in 3 ethnic-minority children stunted; World Bank &amp; UNICEF, 2019). Not knowing whether you would be the
                  hotel owner or the waste picker, you would not choose rules that send safe food to landfill by default.
                </p>
                <p>
                  <b>The injustice is partly institutional.</b> Liability fear, no tax incentive and confusing date labels make the bin the
                  rational choice for a cautious firm (Harvard FLPC &amp; GFN, 2024).
                </p>
                <p>
                  <b>Proportional responsibility.</b> Large hotels, chains and caterers have the most power and capacity, so they carry the
                  heaviest duties. Small household businesses (<em>hộ kinh doanh</em>) should prevent waste but are not expected to run
                  donation logistics. France and the Czech Republic target their laws at large retailers for the same reason.
                </p>
                <p>
                  <b>Counter-argument (Sen, 1981).</b> Hunger comes from lack of <em>entitlement</em> (income, access), not lack of food, so
                  surplus in Tây Hồ does not automatically feed a child elsewhere. <b>Our response:</b> local redistribution does reach
                  Hanoi’s food-insecure (80,000+ meals by Hanoi Food Rescue), and this is exactly why we rank{" "}
                  <b>prevention above donation</b>.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card
              title="Aristotle, Solomon · virtue ethics"
              tag="Aristotle, Solomon · virtue ethics"
              group="lens"
              showFront
              cat="Classical ethics"
              lens="virtue"
            >
              <div className="tagline">Aristotle, Solomon · virtue ethics</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  Generosity is a virtue. <span className="hl">Selling excess</span> is a vice.
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> A virtue is a settled habit at the mean between excess and deficiency, guided by practical wisdom (
                  <em>phronesis</em>) (Aristotle, trans. 2009). Solomon (1992): a company has a character, built through its routines.
                </p>
                <p>
                  <b>The full table.</b> <em>Mâm cơm đầy</em> and the generous wedding <em>cỗ</em> express real generosity. But selling set
                  menus guests cannot finish turns it into a product. In Book IV, the excess of <em>magnificence</em> (appropriate spending
                  on great occasions) is <b>vulgarity</b>: display beyond what the occasion needs.
                </p>
                <p>
                  <b>Habits.</b> A kitchen that cooks 200 meals “to be safe” every day is habituated to waste; daily weighing and batch
                  cooking build temperance.
                </p>
                <p>
                  <b>Practical wisdom means measuring.</b> Without data a firm cannot find the mean.
                </p>
                <p>
                  <b>Gratitude.</b> <em>Ăn quả nhớ kẻ trồng cây</em>: discarding food disrespects the farmers who grew it.{" "}
                  <b>Leadership:</b> a head chef who praises an empty waste bin builds a different character from one who praises
                  overflowing trays.
                </p>
                <p>
                  <b>Limit.</b> No precise rules, so it must be combined with measurable targets.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
            <Card
              title="Leopold, Naess · environmental ethics"
              tag="Leopold, Naess · environmental ethics"
              group="lens"
              showFront
              cat="Environment"
              lens="env"
            >
              <div className="tagline">Leopold, Naess · environmental ethics</div>
              <Verdict className="verdict fail">✗ Fails</Verdict>
              <Front>
                <p>
                  The environment is treated as a <span className="hl">free dump.</span>
                </p>
              </Front>
              <More>
                <p>
                  <b>Theory.</b> “A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.
                  It is wrong when it tends otherwise” (Leopold, 1949, pp. 224–225). Naess (1973): living things have value in their own
                  right.
                </p>
                <p>
                  <b>Application.</b> Businesses produce concentrated, predictable organic waste that is easy to separate and compost. MM
                  Mega Market and Food Bank Vietnam’s 2026 partnership turns food waste into inputs for community gardens and organic
                  fertiliser (Vietnam News, 2026).
                </p>
                <p>
                  <b>National commitment.</b> Methane −30% by 2030 (Decision 942/QĐ-TTg, 2022).
                </p>
                <p>
                  <b>Food recovery hierarchy.</b> Prevent → feed people → feed animals → compost → landfill last (US EPA, n.d.). Our project
                  follows this order.
                </p>
                <p>
                  <b>Verdict.</b> Dumping avoidable waste harms non-human life and future generations, who cannot consent.
                </p>
              </More>
              <button className="open">Open the full analysis</button>
            </Card>
          </div>
        </Tab>
        <Tab id="dilemmas" label="What would you do?">
          <div className="tab-title">
            <h2>What would you do?</h2>
          </div>
          <p className="tab-intro">Six situations based on our research. Pick an option to unlock the research and the ethical analysis.</p>
          <div className="scorebar">
            <DilemmaScore className="pill hi" />
            <span className="small muted">Green marks the option our analysis supports.</span>
          </div>
          <Dilemmas className="stack" />
        </Tab>
        <Tab id="voices" label="Voices">
          <div className="tab-title">
            <h2>Voices</h2>
          </div>
          <p className="tab-intro">What experts, the law and the people closest to the problem say.</p>
          <QuoteCarousel className="carousel" aria-live="polite" />
          <div className="grid g2" style={{ marginTop: "18px" }}>
            <figure>
              <MediaSlot id="voice_video" className="media">
                <div className="ph">
                  <span className="ic">Video</span>
                  <b>Short interview with a student or kitchen staff member</b>
                  <span className="small muted">MP4 or WebM, under 20 MB</span>
                </div>
              </MediaSlot>
              <figcaption>
                Caption: <Field id="cap_voice_video">who is speaking and when</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="voice_photo" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Interview or survey in progress</b>
                </div>
              </MediaSlot>
              <figcaption>
                Caption: <Field id="cap_voice_photo">add a caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Tab id="sdgs" label="SDGs">
          <div className="tab-title">
            <h2>Links to the Sustainable Development Goals</h2>
          </div>
          <p className="tab-intro">
            The SDGs are political commitments, not binding law (United Nations, 2015). A business that keeps wasting avoidable food falls
            short of commitments its country has made.
          </p>
          <div className="grid g3">
            <div className="panel stack">
              <div className="stat-like">
                <span className="hl" style={{ fontFamily: "var(--f-display)", fontSize: "2rem" }}>
                  12.3
                </span>
              </div>
              <p>
                <b>Halve food waste</b> at retail and consumer levels by 2030 and reduce losses along supply chains.
              </p>
              <p className="small muted">
                Food service counts as “consumer level”. Our KPI, grams wasted per meal, is a direct contribution.
              </p>
            </div>
            <div className="panel stack">
              <span className="hl" style={{ fontFamily: "var(--f-display)", fontSize: "2rem" }}>
                12.5
              </span>
              <p>
                <b>Substantially reduce waste</b> through prevention, reduction, recycling and reuse.
              </p>
              <p className="small muted">Prevention first; organic sorting for the rest.</p>
            </div>
            <div className="panel stack">
              <span className="hl" style={{ fontFamily: "var(--f-display)", fontSize: "2rem" }}>
                12.6
              </span>
              <p>
                <b>Encourage companies</b>, especially large ones, to adopt sustainable practices and report on them.
              </p>
              <p className="small muted">
                Listed Vietnamese firms already report environmental impacts (Circular 96/2020/TT-BTC); food waste should be part of it.
              </p>
            </div>
            <div className="panel stack">
              <span className="hl" style={{ fontFamily: "var(--f-display)", fontSize: "2rem" }}>
                2.1 · 2.2
              </span>
              <p>
                <b>End hunger</b> and all forms of malnutrition.
              </p>
              <p className="small muted">Safe redistribution of genuine surplus, within Sen’s limits.</p>
            </div>
            <div className="panel stack">
              <span className="hl" style={{ fontFamily: "var(--f-display)", fontSize: "2rem" }}>
                13
              </span>
              <p>
                <b>Climate action.</b>
              </p>
              <p className="small muted">Less organic waste to Nam Sơn supports Vietnam’s methane plan.</p>
            </div>
          </div>
        </Tab>
        <Tab id="verdict" label="The verdict">
          <div className="tab-title">
            <h2>The verdict</h2>
          </div>
          <p className="tab-intro">Tap a tile to reopen that lens.</p>
          <VerdictGrid className="vgrid" />
          <div className="grid g2" style={{ marginTop: "20px" }}>
            <div className="panel stack">
              <h3>Where the lenses agree</h3>
              <p>
                Every lens condemns a <b>standing policy of discarding safe food</b> when cheap prevention and safe redistribution exist,
                and every lens finds a victim who had no say. Theories with completely different starting points reach the same verdict, so
                the conclusion does not depend on any single theory.
              </p>
            </div>
            <div className="panel stack">
              <h3>Where they disagree</h3>
              <p>
                <b>Is donation obligatory?</b> Friedman says no; Kant, Rawls and Young say firms with capacity have at least an imperfect
                duty. <b>Our position:</b> prevention is obligatory; safe redistribution is strongly expected of firms with capacity and a
                partner.
              </p>
              <p>
                <b>Firm or system?</b> Both. Firms answer for what they control and, following Young, for supporting better rules such as
                donor protection and dual date labels.
              </p>
              <p>
                <b>Firm or customer?</b> Both share plate waste, but the firm sets the defaults, so it carries more.
              </p>
            </div>
          </div>
          <div className="callout" style={{ marginTop: "18px" }}>
            <p className="quote">Food waste in Hanoi is, to a significant degree, a corporate ethical problem.</p>
            <p style={{ marginTop: "8px" }}>
              Businesses control the decisions that create most avoidable food-service and retail waste, benefit from over-provision and
              push its costs onto those least able to object. Their responsibility is proportional to their size, and it is ordered:{" "}
              <span className="hl">prevent first, rescue second, redistribute safely third, recycle the rest.</span>
            </p>
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Six principles that shaped our solution</h3>
          <div className="grid g3">
            <div className="panel">
              <b>1. Lead with prevention.</b> Where every lens agrees and firms save money.
            </div>
            <div className="panel">
              <b>2. Rescue is a safeguard, not a target.</b> Avoids moral hazard and CSR-washing.
            </div>
            <div className="panel">
              <b>3. Safety and dignity first.</b> Above the volume of food redistributed.
            </div>
            <div className="panel">
              <b>4. Respect customer choice.</b> Nudges that keep choice open, never penalties.
            </div>
            <div className="panel">
              <b>5. Support staff, don’t blame them.</b> Match demands to the size of the business.
            </div>
            <div className="panel">
              <b>6. Measure and report honestly.</b> Grams wasted per meal, even if targets are missed.
            </div>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
