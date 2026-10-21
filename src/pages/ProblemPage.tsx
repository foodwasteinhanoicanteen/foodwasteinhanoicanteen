// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, StageStepper, SubTabs, Tab } from "../components/layout";
import {
  BarChart,
  BarDetail,
  CalcInput,
  CalcOut,
  Card,
  CountUp,
  DonutChart,
  DonutDetail,
  DonutLegend,
  Field,
  FilterButtons,
  FoodJourney,
  FoodJourneyDetail,
  Front,
  LawDetail,
  LawTimeline,
  MediaSlot,
  More,
} from "../components";

export default function ProblemPage() {
  return (
    <PageSection id="problem">
      <div className="wrap phead">
        <StageStepper current={1} />
        <div className="eyebrow">
          <span>Step 1 · Empathise</span>
          <span className="rubric">Rubric 1 · Understanding the problem</span>
        </div>
        <h1>The problem</h1>
        <p className="lede">
          Large amounts of safe, edible food are thrown away by Hanoi’s food businesses: restaurants, hotel buffets, wedding venues,
          supermarkets and institutional canteens like ours. Here is how big it is, where it happens, why, and who pays.
        </p>
        <div className="takeaways">
          <div>
            <svg className="ic">
              <use href="#i-bin"></use>
            </svg>
            <b>1.05 bn t</b>
            <span>food wasted worldwide in 2022</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-store"></use>
            </svg>
            <b>40%</b>
            <span>of it from food service and retail</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-plate"></use>
            </svg>
            <b>29%</b>
            <span>of Hanoi school-lunch food is thrown away</span>
          </div>
          <div>
            <svg className="ic">
              <use href="#i-cloud"></use>
            </svg>
            <b>5×</b>
            <span>Nam Sơn landfill was over its design capacity</span>
          </div>
        </div>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="scale" label="Scale">
          <div className="tab-title">
            <h2>How big is the problem?</h2>
          </div>
          <p className="tab-intro">Three levels, from the world down to our city. Hover or tap any number to see where it comes from.</p>
          <div className="callout">
            <b>Problem statement.</b> Safe food thrown away by businesses <span className="hl">costs them money</span>,{" "}
            <span className="hl">adds methane to an overloaded landfill</span>, wastes the land, water and labour used to grow it, and
            happens <span className="hl">while vulnerable people still lack adequate nutrition</span>. Because businesses decide how much
            food to buy, cook, portion and discard, they are the actors best placed to reduce it.
          </div>
          <div className="tier">
            <span>World</span>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="v">1.05 bn t</div>
              <div className="l">food wasted at retail and consumer level in 2022</div>
              <div className="s">UNEP (2024); UN News (2024)</div>
            </div>
            <div className="stat">
              <div className="v">
                <CountUp to={79} suf=" kg">
                  79 kg
                </CountUp>
              </div>
              <div className="l">wasted per person per year</div>
              <div className="s">UNEP (2024)</div>
            </div>
            <div className="stat">
              <div className="v">8–10%</div>
              <div className="l">of global greenhouse-gas emissions come from food loss and waste</div>
              <div className="s">UNEP (2024)</div>
            </div>
          </div>
          <p className="prose" style={{ marginTop: "14px" }}>
            At the same time, about <span className="hl">783 million people</span> were going hungry (UN News, 2024). Food that is lost or
            wasted also uses about <span className="hl">1.4 billion hectares</span> of land, close to 30% of the world’s farmland, and about{" "}
            <span className="hl">250 km³</span> of surface and groundwater (FAO, 2013).
          </p>
          <div className="tier">
            <span>Vietnam</span>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="v">&gt; 8 m t</div>
              <div className="l">edible food discarded in Vietnam every year</div>
              <div className="s">Vietnam Foodbanking Network, in Tuổi Trẻ News (2025)</div>
            </div>
            <div className="stat">
              <div className="v">US$3.9 bn</div>
              <div className="l">estimated economic loss each year</div>
              <div className="s">Tuổi Trẻ News (2025)</div>
            </div>
            <div className="stat">
              <div className="v">
                <CountUp to={76} suf=" kg">
                  76 kg
                </CountUp>
              </div>
              <div className="l">household food waste per person per year (global average 74 kg in that dataset)</div>
              <div className="s">Tuổi Trẻ News (2025), citing UNEP</div>
            </div>
          </div>
          <p className="prose" style={{ marginTop: "14px" }}>
            Losses start before food reaches a kitchen: about <span className="hl">25% of agricultural produce</span> is lost soon after
            harvest, with loss rates near 32% for fruit and vegetables, 14% for meat and 12% for seafood (CEL Consulting, 2018, as reported
            in Pham et al., 2025). Our project focuses on the later, <em>avoidable</em> stage: food a business has already bought or cooked
            and then throws away.
          </p>
          <div className="tier">
            <span>Hanoi</span>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="v">7,300 t</div>
              <div className="l">
                domestic solid waste generated in Hanoi <b>every day</b>
              </div>
              <div className="s">VnEconomy (2025)</div>
            </div>
            <div className="stat">
              <div className="v">~50–65%</div>
              <div className="l">organic share of Hanoi household waste in most studies</div>
              <div className="s">Ngo et al. (2021)</div>
            </div>
            <div className="stat">
              <div className="v">5×</div>
              <div className="l">Nam Sơn landfill was receiving up to 5,000 t a day, five times its design capacity</div>
              <div className="s">VietNamNet (2020)</div>
            </div>
          </div>
          <p className="prose" style={{ marginTop: "14px" }}>
            Organic material, mainly food, is the biggest part of Hanoi’s household waste: earlier studies found{" "}
            <span className="hl">48.8–64.5%</span>, and a 2021 survey during COVID-19 lockdowns found 78.9% (Ngo et al., 2021). Most of it
            goes to Nam Sơn, which serves districts producing <span className="hl">77% of the city’s waste</span> (VietNamNet, 2020).
          </p>
          <div className="tier">
            <span>Try it: one canteen, one year</span>
          </div>
          <div className="panel stack">
            <p className="prose">
              How much would a single canteen throw away if it wasted food at the Hanoi school rate? Change the numbers.
            </p>
            <div className="calc">
              <label htmlFor="c-meals">
                Meals per day
                <CalcInput name="meals" type="number" min="0" defaultValue="1000" />
              </label>
              <label htmlFor="c-g">
                Grams wasted per meal
                <CalcInput name="g" type="number" min="0" defaultValue="118" />
              </label>
              <label htmlFor="c-days">
                Service days per year
                <CalcInput name="days" type="number" min="0" defaultValue="200" />
              </label>
              <label htmlFor="c-red">
                Reduction target (%)
                <CalcInput name="red" type="number" min="0" max="100" defaultValue="25" />
              </label>
            </div>
            <div className="stats" id="calc-out">
              <div className="stat">
                <CalcOut name="day" className="v" />
                <div className="l">wasted per day</div>
              </div>
              <div className="stat">
                <CalcOut name="year" className="v" />
                <div className="l">wasted per year</div>
              </div>
              <div className="stat g">
                <CalcOut name="save" className="v" />
                <div className="l">prevented per year at the target</div>
              </div>
            </div>
            <p className="small muted">
              Default values are illustrative: 118 g is the Hanoi school benchmark (Pham et al., 2025). Our own baseline is on the Results
              page.
            </p>
          </div>
        </Tab>
        <Tab id="where" label="Where it happens">
          <div className="tab-title">
            <h2>Where does food waste happen?</h2>
          </div>
          <p className="tab-intro">The 1.05 billion tonnes wasted worldwide in 2022, split by where it happened. Click a segment.</p>
          <div className="panel">
            <div className="donut-wrap">
              <DonutChart viewBox="0 0 200 200" role="img" aria-label="Donut chart: households 60%, food service 28%, retail 12%" />
              <DonutLegend className="legend" />
            </div>
            <DonutDetail className="chart-detail" />
            <p className="src" style={{ marginTop: "10px" }}>
              UNEP (2024), via UN News (2024). Shares are our calculation from the tonnages (total 1,052 Mt).
            </p>
          </div>
          <div className="callout g" style={{ marginTop: "16px" }}>
            <b>
              Food service and retail together: about <span className="hl">40%</span>.
            </b>{" "}
            One business decision, such as how many portions to cook or how large a set menu is, affects hundreds of meals at once. That is
            why our project acts on businesses.
          </div>
        </Tab>
        <Tab id="kitchens" label="Hanoi kitchens">
          <div className="tab-title">
            <h2>What happens inside Hanoi kitchens?</h2>
          </div>
          <p className="tab-intro">
            The best local evidence is a 2025 study that physically weighed food in 8 urban Hanoi school kitchens (4 primary, 4 secondary, 6
            districts) over 8 weeks in March–April 2024 (Pham et al., 2025).
          </p>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Waste per child per lunch, by food type</h3>
              <BarChart chart="lunch" className="bars" />
              <BarDetail chart="lunch" className="chart-detail" />
              <p className="src">
                Pham et al. (2025). Rice and meat rates differ slightly between sections of the paper, so ranges are shown.
              </p>
            </div>
            <div className="panel stack">
              <h3>Hanoi compared with other countries</h3>
              <BarChart chart="intl" className="bars" />
              <p className="small muted">
                United Kingdom: one-third to one-half of food served; Italy: over 15%. Study methods differ, so compare with care.
              </p>
              <p className="src">International comparison as reported in Pham et al. (2025)</p>
            </div>
          </div>
          <div className="grid g3" style={{ marginTop: "16px" }}>
            <Card title="Same portion, three times the plate waste" tag="Finding">
              <div className="tagline">Finding</div>
              <Front>
                <h4>Same portion, three times the plate waste</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Secondary students left <span className="hl">118.9 g</span> on their plates, primary students 39.7 g.
                </p>
              </Front>
              <More>
                <p>
                  Primary schools: 55.6 g per student per day was <em>never served</em>, because teachers deliberately served small
                  portions, and 39.7 g was left on plates.
                </p>
                <p>
                  Secondary schools: only 19.0 g was never served, but <b>118.9 g was left on plates</b>. The authors suggest older students
                  can buy or bring other food and are less hungry, but they did not test this.
                </p>
                <p>
                  <b>Lesson for our canteen:</b> the type of waste depends on how food is served. That is why our audit separates
                  preparation waste, overproduction and plate waste.
                </p>
                <p className="src">Pham et al. (2025)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Menu design changes waste" tag="Finding">
              <div className="tagline">Finding</div>
              <Front>
                <h4>Menu design changes waste</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Disliked mixed vegetables pushed vegetable plate waste from 25 g to <span className="hl">40 g</span>.
                </p>
              </Front>
              <More>
                <p>
                  On days with mixed stir-fried vegetables (cabbage or chayote with carrot), vegetable plate waste was 40 g vs 25 g on other
                  days.
                </p>
                <p>
                  On days with fried or simmered meat, meat plate waste fell to 7–8 g vs 24 g. Kitchens limit these dishes for health
                  reasons, so there is a real trade-off.
                </p>
                <p className="src">Pham et al. (2025)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Eating out: the menu decides" tag="Finding">
              <div className="tagline">Finding</div>
              <Front>
                <h4>Eating out: the menu decides</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Top reasons for leftovers: <span className="hl">ordering too much</span> and{" "}
                  <span className="hl">servings too large</span>.
                </p>
              </Front>
              <More>
                <p>
                  In a survey of 252 Hanoi residents, the top reasons for food waste when eating out were ordering too much and servings
                  that were too large, followed by disliking the taste. Both are shaped by the business through menu design, portion size
                  and set menus.
                </p>
                <p>
                  At home, households reported about 1.2 kg (urban) and 1.7 kg (rural) of food waste a day; the difference was not
                  statistically significant. More than 70% was cooking and preparation waste such as peels and bones, which is hard to
                  avoid.
                </p>
                <p className="src">Liu &amp; Nguyen (2020). Self-reported, so moderate reliability.</p>
              </More>
              <button className="open">Read details</button>
            </Card>
          </div>
          <div className="grid g2" style={{ marginTop: "16px" }}>
            <figure>
              <MediaSlot id="kitchen_1" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Our canteen’s serving counter</b>
                  <span className="small muted">Show the standard portion students receive</span>
                </div>
              </MediaSlot>
              <figcaption data-cap="kitchen_1">
                Caption: <Field id="cap_kitchen_1">add a caption</Field>
              </figcaption>
            </figure>
            <figure>
              <MediaSlot id="kitchen_2" className="media">
                <div className="ph">
                  <span className="ic">Photo</span>
                  <b>Leftovers after lunch</b>
                  <span className="small muted">Trays or bins at the end of service</span>
                </div>
              </MediaSlot>
              <figcaption>
                Caption: <Field id="cap_kitchen_2">add a caption</Field>
              </figcaption>
            </figure>
          </div>
        </Tab>
        <Tab id="causes" label="Root causes">
          <div className="tab-title">
            <h2>The food journey: where is food wasted, and why?</h2>
          </div>
          <p className="tab-intro">Follow food from farm to landfill. Click each stage to open the evidence.</p>
          <div className="panel">
            <FoodJourney className="chain" />
            <FoodJourneyDetail className="chart-detail" style={{ marginTop: "18px" }} />
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Root causes at a glance</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Root causes found in our research</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Methods</b>
                  </td>
                  <td>No measurement of waste; cooking by habit rather than demand data; one fixed portion size</td>
                </tr>
                <tr>
                  <td>
                    <b>People</b>
                  </td>
                  <td>Over-ordering to show hospitality; dislike of certain dishes; students able to buy outside food</td>
                </tr>
                <tr>
                  <td>
                    <b>Policy and law</b>
                  </td>
                  <td>No penalty for waste; no donor liability protection; confusing date labels; no tax deduction for donations</td>
                </tr>
                <tr>
                  <td>
                    <b>Culture</b>
                  </td>
                  <td>
                    The <em>mâm cơm đầy</em> (full table) norm; abundance as prestige at weddings and buffets
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Infrastructure</b>
                  </td>
                  <td>Weak cold chains; mixed waste collection; landfill instead of composting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab id="impact" label="Consequences">
          <div className="tab-title">
            <h2>Why it matters: the consequences</h2>
          </div>
          <p className="tab-intro">Filter by type of harm. Open a card for the full evidence.</p>
          <FilterButtons group="impact" cats={["Environment", "Economy", "Society", "Health"]} className="filters" />
          <div className="grid g3" data-cards="impact">
            <Card title="Methane and climate" tag="Environment" group="impact" cat="Environment">
              <div className="tagline">Environment</div>
              <Front>
                <h4>Methane and climate</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Food loss and waste causes <span className="hl">8–10%</span> of global emissions.
                </p>
              </Front>
              <More>
                <p>
                  Buried food rots without oxygen and releases methane, which traps about <b>27 times</b> as much heat as CO₂ over 100 years
                  and about <b>80 times</b> over 20 years (IPCC, 2021).
                </p>
                <p>
                  Vietnam has committed to cut methane emissions by <b>at least 30% by 2030</b> compared with 2020 (Decision 942/QĐ-TTg,
                  2022). Commercial food waste sent to landfill works against this.
                </p>
                <p className="src">UNEP (2024); IPCC (2021); Decision 942/QĐ-TTg</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Wasted land, water and labour" tag="Environment" group="impact" cat="Environment">
              <div className="tagline">Environment</div>
              <Front>
                <h4>Wasted land, water and labour</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Every wasted meal also wastes the resources used to grow it.
                </p>
              </Front>
              <More>
                <p>Globally, food that is lost or wasted uses about 1.4 billion hectares of land and 250 km³ of water a year.</p>
                <p className="src">FAO (2013)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Money lost by businesses" tag="Economy" group="impact" cat="Economy">
              <div className="tagline">Economy</div>
              <Front>
                <h4>Money lost by businesses</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Vietnam loses an estimated <span className="hl">US$3.9 billion</span> a year to discarded food.
                </p>
              </Front>
              <More>
                <p>Each kilogram a canteen wastes carries its purchase cost, the labour and energy used to cook it, and a disposal fee.</p>
                <p>
                  In international studies, restaurants saved about <b>US$7 for every US$1</b> they invested in cutting waste.
                </p>
                <p className="src">Tuổi Trẻ News (2025); Champions 12.3 (2019)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Hunger next to waste" tag="Society" group="impact" cat="Society">
              <div className="tagline">Society</div>
              <Front>
                <h4>Hunger next to waste</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Nearly <span className="hl">1 in 3</span> ethnic-minority children in Vietnam is stunted.
                </p>
              </Front>
              <More>
                <p>That is more than twice the rate among the Kinh majority.</p>
                <p>
                  In Hanoi, low-income students, workers and patients’ families at K Hospital already receive rescued surplus through Hanoi
                  Food Rescue.
                </p>
                <p className="src">World Bank &amp; UNICEF (2019); Báo Pháp luật (2025)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Landfill neighbours" tag="Health" group="impact" cat="Health">
              <div className="tagline">Health</div>
              <Front>
                <h4>Landfill neighbours</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  <span className="hl">More than 2,000 families</span> live within 500 m of Nam Sơn.
                </p>
              </Front>
              <More>
                <p>
                  Residents have repeatedly blocked the landfill road (2019, 2020) to demand compensation and relocation, and rubbish piled
                  up across Hanoi as a result.
                </p>
                <p>They live with foul odours that get worse in summer.</p>
                <p className="src">VietNamNet (2019); Giảm rác nhựa (2020)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Informal waste workers" tag="Health" group="impact" cat="Health">
              <div className="tagline">Health</div>
              <Front>
                <h4>Informal waste workers</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  An estimated <span className="hl">10,000–16,000</span> waste pickers work in Hanoi and Ho Chi Minh City.
                </p>
              </Front>
              <More>
                <p>
                  They have no social or health insurance because their work is not formally recognised. Wet, mixed food waste makes their
                  work dirtier and more dangerous.
                </p>
                <p className="src">Vu (2023), Eco-Business</p>
              </More>
              <button className="open">Read details</button>
            </Card>
          </div>
        </Tab>
        <Tab id="law" label="Laws & policy">
          <div className="tab-title">
            <h2>The legal and policy context</h2>
          </div>
          <p className="tab-intro">Click a year. The short version: the law makes throwing food away the safe choice for a business.</p>
          <div className="panel">
            <LawTimeline className="tl" />
            <LawDetail className="chart-detail" style={{ marginTop: "14px" }} />
          </div>
          <div className="callout" style={{ marginTop: "16px" }}>
            <p className="quote">
              “Vietnam does not currently have a law that penalizes food waste or mandates the donation of surplus food.”
            </p>
            <p className="small" style={{ marginTop: "8px" }}>
              Global Food Donation Policy Atlas: Viet Nam (Harvard FLPC &amp; GFN, 2024).{" "}
              <b>A firm can be fully legal and still throw away tonnes of safe food.</b>
            </p>
          </div>
        </Tab>
        <Tab id="who" label="Who is affected">
          <div className="tab-title">
            <h2>Who is affected, and what do they need?</h2>
          </div>
          <p className="tab-intro">
            Filter the stakeholders, then open a card to see how they are affected, what they need and our evidence.
          </p>
          <FilterButtons group="who" cats={["Inside the business", "Customers", "Community", "Environment"]} className="filters" />
          <div className="grid g3" data-cards="who">
            <Card title="Canteen and restaurant owners" tag="Inside the business" group="who" cat="Inside the business">
              <div className="tagline">Inside the business</div>
              <Front>
                <h4>Canteen and restaurant owners</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Lose money on wasted ingredients, labour and disposal, often without knowing how much.
                </p>
              </Front>
              <More>
                <p>
                  <b>How affected:</b> waste is rarely measured, so the loss is invisible; they face pressure never to run out.
                </p>
                <p>
                  <b>What they need:</b> simple ways to measure waste, forecast demand and adjust portions, and reassurance that changes
                  will not upset customers.
                </p>
                <p>
                  <b>Evidence:</b> Meliá Hồ Tràm resort cut food waste by <b>40%</b> and ingredient costs by <b>8%</b> with the Lumitics
                  tracking system (VOV, n.d.).
                </p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Kitchen and store staff" tag="Inside the business" group="who" cat="Inside the business">
              <div className="tagline">Inside the business</div>
              <Front>
                <h4>Kitchen and store staff</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Told to bin edible food; may face extra work from new systems.
                </p>
              </Front>
              <More>
                <p>
                  <b>How affected:</b> moral discomfort at discarding food; in some firms, discipline for taking leftovers; extra tasks such
                  as weighing and sorting.
                </p>
                <p>
                  <b>What they need:</b> clear, fair rules; new tasks built into paid shifts; recognition rather than blame.
                </p>
                <p>
                  <b>Evidence:</b> <Field id="ev_staff">add a quote or result from our staff interview</Field>
                </p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Students and customers" tag="Customers" group="who" cat="Customers">
              <div className="tagline">Customers</div>
              <Front>
                <h4>Students and customers</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Pay for portions that do not match their appetite; want choice and value.
                </p>
              </Front>
              <More>
                <p>
                  <b>How affected:</b> one standard portion, little choice of smaller sizes, disliked dishes served anyway.
                </p>
                <p>
                  <b>What they need:</b> portion choice, free refills, menus that reflect what they actually eat, fair prices.
                </p>
                <p>
                  <b>Evidence:</b> top eating-out reasons for leftovers are over-ordering and large servings (Liu &amp; Nguyen, 2020). Our
                  survey: <Field id="ev_students">add our key survey result</Field>
                </p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Food-insecure people in Hanoi" tag="Community" group="who" cat="Community">
              <div className="tagline">Community</div>
              <Front>
                <h4>Food-insecure people in Hanoi</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Safe surplus is binned while they struggle to afford meals.
                </p>
              </Front>
              <More>
                <p>
                  <b>Who:</b> low-income students and workers, patients’ families at K Hospital, residents of social care centres.
                </p>
                <p>
                  <b>What they need:</b> access to safe, nutritious food, delivered with dignity.
                </p>
                <p>
                  <b>Evidence:</b> Hanoi Food Rescue, a student-led project running since about 2012, reports more than <b>80,000 meals</b>{" "}
                  redistributed to over 30,000 people from about 30 hotels, restaurants and bakeries (Báo Pháp luật, 2025; Tuổi Trẻ News,
                  2022).
                </p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Landfill neighbours" tag="Community" group="who" cat="Community">
              <div className="tagline">Community</div>
              <Front>
                <h4>Landfill neighbours</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Live with odour and pollution from waste they did not create.
                </p>
              </Front>
              <More>
                <p>
                  <b>Who:</b> more than 2,000 families within 500 m of Nam Sơn.
                </p>
                <p>
                  <b>What they need:</b> less waste sent to landfill; relocation and compensation.
                </p>
                <p className="src">VietNamNet (2019); Giảm rác nhựa (2020)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Informal waste workers" tag="Community" group="who" cat="Community">
              <div className="tagline">Community</div>
              <Front>
                <h4>Informal waste workers</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Handle wet, mixed waste without insurance.
                </p>
              </Front>
              <More>
                <p>
                  <b>Who:</b> 10,000–16,000 waste pickers in Hanoi and Ho Chi Minh City.
                </p>
                <p>
                  <b>What they need:</b> separated waste, recognition, social protection.
                </p>
                <p className="src">Vu (2023)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Environment and future generations" tag="Environment" group="who" cat="Environment">
              <div className="tagline">Environment</div>
              <Front>
                <h4>Environment and future generations</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Bear methane and resource loss but <span className="hl">have no voice</span> in business decisions.
                </p>
              </Front>
              <More>
                <p>
                  <b>What they need:</b> less landfilled organic waste; composting or animal feed for what cannot be eaten.
                </p>
                <p className="src">UNEP (2024); IPCC (2021); FAO (2013)</p>
              </More>
              <button className="open">Read details</button>
            </Card>
            <Card title="Government and university management" tag="Decision makers" group="who" cat="Environment">
              <div className="tagline">Decision makers</div>
              <Front>
                <h4>Government and university management</h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Responsible for landfill capacity, methane targets and campus operations.
                </p>
              </Front>
              <More>
                <p>
                  <b>What they need:</b> practical models that reduce waste and can be scaled across canteens.
                </p>
                <p className="src">Decision 942/QĐ-TTg (2022); Law No. 110/2025/QH15</p>
              </More>
              <button className="open">Read details</button>
            </Card>
          </div>
          <h3 style={{ margin: "28px 0 12px" }}>Power and interest</h3>
          <div className="grid g2">
            <div className="panel" style={{ background: "var(--panel-2)" }}>
              <div className="eyebrow">High power · lower interest</div>
              <p style={{ marginTop: "6px" }}>
                <b>Government regulators.</b> Keep satisfied.
              </p>
            </div>
            <div className="panel" style={{ borderColor: "var(--ink)" }}>
              <div className="eyebrow">High power · high interest</div>
              <p style={{ marginTop: "6px" }}>
                <b>Canteen management, university operations.</b> <span className="hl-g">Manage closely: they decide.</span>
              </p>
            </div>
            <div className="panel" style={{ background: "var(--panel-2)" }}>
              <div className="eyebrow">Low power · no voice</div>
              <p style={{ marginTop: "6px" }}>
                <b>Environment and future generations.</b>
              </p>
            </div>
            <div className="panel" style={{ borderColor: "var(--waste)", background: "var(--waste-soft)" }}>
              <div className="eyebrow">Low power · high interest</div>
              <p style={{ marginTop: "6px" }}>
                <b>Students, kitchen staff, food-insecure people, landfill neighbours, waste workers.</b>{" "}
                <span className="hl">Most affected, least heard.</span>
              </p>
            </div>
          </div>
          <p className="prose muted" style={{ marginTop: "12px" }}>
            The people most affected by food waste have the least power over it. That imbalance is where the ethical analysis begins.
          </p>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
