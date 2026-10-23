/* Site content moved out of the original script. Strings with HTML (<b>, <i>) are fixed text
   written by the team and are rendered with <Html>; never put visitor input in here. */

export interface PlanStep { k: string; a: number; b: number; obj: string; act: string; own: string; res: string; kpi: string }

export const DONUT: { k: string; v: number; p: number; c: string; t: string }[] = [
 {k:"Households",v:631,p:60,c:"var(--muted)",t:"Most waste is in homes, but in Hanoi much of it is preparation waste such as peels and bones, which is hard to avoid (Liu & Nguyen, 2020)."},
 {k:"Food service",v:290,p:28,c:"var(--waste)",t:"Restaurants, canteens, hotels and caterers. One business decision affects hundreds of meals. This is where our project acts."},
 {k:"Retail",v:131,p:12,c:"var(--gold)",t:"Supermarkets and shops. Date-coded food is removed from shelves each morning, even when it is still safe."}];

export const CHARTS: Record<string, { max: number; unit: string; detail?: string; rows: { k: string; v: number; lab: string; sub?: string; cls?: string; t: string }[] }> = {
 lunch:{max:60,unit:"g",rows:[
  {k:"Vegetables",v:48,lab:"48 g",sub:"46% wasted (highest)",t:"Students strongly dislike mixed stir-fried vegetables, especially with carrot: vegetable plate waste was 40 g on those days vs 25 g on others."},
  {k:"Rice",v:54,lab:"54 g",sub:"about 21–24% wasted",t:"The largest waste by weight. In secondary schools it is mostly plate waste, 20–60 g per student."},
  {k:"Meat",v:16,lab:"16 g",sub:"about 18–20% (lowest)",t:"Almost always fully served. Meat plate waste fell to 7–8 g on days with fried or simmered meat vs 24 g on other days."},
  {k:"Total",v:118,lab:"118 g",sub:"about 29% of food cooked",cls:"",t:"Of all food cooked and sent to classes, excluding added water and seasoning. Measured by weighing in 8 urban school kitchens."}],detail:"lunch"},
 intl:{max:50,unit:"%",rows:[
  {k:"United States (early elementary)",v:45.3,lab:"45.3%",cls:"mute",t:"As reported in Pham et al. (2025)."},
  {k:"Hanoi (8 urban schools)",v:29,lab:"29%",t:"118 g per child per lunch (Pham et al., 2025)."},
  {k:"Beijing",v:21,lab:"21%",cls:"mute",t:"130 g per student per meal."},
  {k:"Italy",v:15,lab:"> 15%",cls:"mute",t:"Over 15% of food served."}]}
};

export const CHAIN: { i: string; k: string; who: string; pv: string; d: string[] }[] = [
 {i:"01",k:"Farm & supply",who:"Outside our control",pv:"About 25% of produce is lost soon after harvest.",d:["Weak cold chains and handling cause losses before food reaches businesses: about 32% for fruit and vegetables, 14% for meat, 12% for seafood (CEL Consulting, 2018, as reported in Pham et al., 2025).","It shows that every wasted plate also wastes a farmer’s labour."]},
 {i:"02",k:"Purchasing & storage",who:"Purchasing manager decides",pv:"Over-ordering “to be safe” and poor stock rotation.",d:["Order quantities, first-expired-first-out rotation and supplier terms are all business decisions.","Supermarkets remove date-coded food every morning. Vietnam’s date labels do not separate safety dates from quality dates, so safe food is binned (Harvard FLPC & GFN, 2024; Báo Pháp luật, 2025)."]},
 {i:"03",k:"Kitchen",who:"Head chef decides",pv:"Cooking by habit and intuition, not data: overproduction.",d:["Kitchens prepare the same quantity every day “so we never run out”. In Hanoi primary schools, 55.6 g per student per day was cooked but never served (Pham et al., 2025).","Buffets prepare dishes too early or for visual abundance (Báo Pháp luật, 2025)."]},
 {i:"04",k:"Serving counter",who:"Owner & marketing decide",pv:"One standard portion for everyone, often too large.",d:["Students with smaller appetites receive the same rice and vegetables as everyone else and leave what they cannot eat.","Restaurants and wedding venues sell set menus with more dishes than guests can finish, reflecting the mâm cơm đầy (full-table) norm."]},
 {i:"05",k:"The plate",who:"Customer chooses, within the firm’s defaults",pv:"Over-ordering, disliked dishes, food served cold.",d:["Top eating-out reasons: ordering too much and servings too large (Liu & Nguyen, 2020).","Disliked mixed vegetables nearly doubled vegetable plate waste (Pham et al., 2025)."]},
 {i:"06",k:"Bin & landfill",who:"Facilities manager decides",pv:"Mixed food waste goes to Nam Sơn, already 5× over capacity.",d:["Up to 5,000 tonnes a day in 2020 against a design capacity of about 1,000 tonnes (VietNamNet, 2020).","Buried food rots without oxygen and releases methane: about 27 times as warming as CO₂ over 100 years and about 80 times over 20 years (IPCC, 2021)."]}];

export const LAW: { y: string; k: string; e: string; m: string }[] = [
 {y:"2010",k:"Law on Food Safety",e:"Law No. 55/2010/QH12",m:"Sets food-safety rules. It mentions donation but does not define how donated food is treated, which causes confusion (Harvard FLPC & GFN, 2024)."},
 {y:"2015",k:"SDGs adopted",e:"UN 2030 Agenda, including target 12.3",m:"Halve per-capita food waste at retail and consumer level by 2030."},
 {y:"2018",k:"Food-safety decrees",e:"Decree 15/2018 and Decree 115/2018",m:"Penalties for trading food past its expiry date. Safety-first rules make discarding the default."},
 {y:"2019–20",k:"Nam Sơn blockades",e:"Residents block the landfill road",m:"Shows the social cost of an overloaded landfill: rubbish piled up across Hanoi."},
 {y:"2020",k:"Environmental Protection Law",e:"Law No. 72/2020/QH14, Art. 75",m:"Organisations must sort domestic solid waste at source and hand it to licensed collectors."},
 {y:"2021",k:"Penalties amended",e:"Decree 124/2021",m:"The penalty regime stays; still no protection for donors."},
 {y:"2022",k:"Three changes",e:"Decree 08/2022 (Art. 58); Decision 942/QĐ-TTg; VietHarvest launched",m:"Firms under 300 kg/day may follow household rules; methane −30% by 2030; a new surplus-food rescuer starts work in Hanoi, supported by IHG hotels."},
 {y:"2024",k:"Policy Atlas: Viet Nam",e:"Harvard FLPC & GFN",m:"Finds no Good Samaritan law, no tax incentive, no date-label distinction and no penalty for waste."},
 {y:"2025",k:"Thrift and Anti-Waste Law passed",e:"Law No. 110/2025/QH15, 10 December",m:"Covers business activity, but for private firms it encourages rather than requires thrift. No food-specific rules."},
 {y:"2026",k:"Law in force; first retailer partnership",e:"1 July; MM Mega Market–Food Bank Vietnam (May)",m:"A large retailer turns food waste into inputs for community gardens and fertiliser, piloted in Ho Chi Minh City."}];

export const FLIPS: [says: string, realityHtml: string][] = [
 ["“Leftovers are just a normal cost of doing business.”","Prevention usually <b>saves money</b> (US$6–7 per US$1). Waste persists because it is <b>not measured</b>, and part of its cost is pushed onto neighbours, workers and the climate."],
 ["“We follow the law.”","Vietnamese law <b>does not penalise food waste</b>. Legal compliance is the floor, not the standard: Carroll’s ethical layer applies where the law is silent."],
 ["“Customers choose to leave food.”","The business sets the default: portion size, set menus, “all you can eat”. The top reasons for leftovers are <b>over-ordering and large servings</b> (Liu & Nguyen, 2020)."],
 ["“Donating food is too risky.”","The legal risk is real, but partners such as Hanoi Food Rescue and VietHarvest already collect safely, and <b>prevention needs no donation at all</b>."],
 ["“Generous portions show respect for guests.”","Generosity is a virtue. Selling <b>excess as a product</b> is what Aristotle calls vulgarity: display beyond what the occasion needs."],
 ["“We donate our surplus, so we are sustainable.”","Donating while over-producing is <b>CSR-washing</b>. The honest measure is grams wasted per meal, not meals donated."]];

export const DIL: { t: string; s: string; o: string[]; best: number[]; u: string[] }[] = [
 {t:"1:30 pm, 40 portions left",s:"Lunch is ending. 40 portions of chicken rice are still hot and safe. The standard policy is to throw them away at closing.",o:["Follow policy and bin them.","Sell them at 50% off for the last 30 minutes.","Call a food-rescue partner to collect them.","Use today’s numbers to cook less tomorrow."],best:[3,1],u:["<b>Our answer: D, plus B today. C only with a trained partner and strict safety rules.</b>","<b>Research:</b> prevention (D) is the top of the food recovery hierarchy and usually saves money (Champions 12.3). Discounts (B) rescue food now, but if offered every day customers wait for them and the kitchen keeps over-cooking.","<b>Theory:</b> utilitarianism favours D + B; Kant’s imperfect duty of beneficence supports C; Carroll warns that philanthropy must not replace prevention."]},
 {t:"The 12-dish wedding table",s:"A family books a wedding for 300 guests and asks for 12 dishes per table of 10. From experience, the venue knows about a third will come back untouched.",o:["Sell the 12-dish menu: the customer is always right.","Advise a smaller menu and explain the expected leftovers.","Sell the 12 dishes and offer take-home boxes."],best:[1,2],u:["<b>Our answer: B, with C as back-up.</b>","<b>Theory:</b> Kant’s duty of honesty: the venue knows the food will be wasted and should say so. Aristotle: keep the generosity, drop the vulgarity. Freeman: the host’s interest in value and the community’s interest in less waste can both be met."]},
 {t:"Yoghurt with tomorrow’s date",s:"A supermarket has 200 yoghurts reaching their date tomorrow. They are safe today. Donating carries legal risk because Vietnam has no Good Samaritan law.",o:["Bin them tomorrow, as usual.","Mark them down today.","Donate them today through a food bank.","Order fewer next time."],best:[3,1],u:["<b>Our answer: D + B. C if a partner can collect today and follow safety rules.</b>","<b>Research:</b> Vietnamese date labels do not separate safety from quality, so safe food is often binned (Harvard FLPC & GFN, 2024).","<b>Theory:</b> Rawls: part of the injustice lies in the institutions. Young: large retailers have the collective power to push for dual date labels and donor protection."]},
 {t:"“I’m paying the same for less rice!”",s:"After the canteen switches to a smaller default portion with free refills, a student complains.",o:["Go back to the old portion.","Keep the change and explain the free refill clearly.","Also offer a cheaper small portion."],best:[1,2],u:["<b>Our answer: B + C.</b>","<b>Theory:</b> Kant (autonomy): customers stay free to take more, so the nudge respects them (Thaler & Sunstein, 2008). Fairness: a cheaper small option lets students pay for what they eat."]},
 {t:"The worker who takes leftovers",s:"A kitchen worker takes home food that would otherwise be binned. The manager wants to discipline her.",o:["Discipline her: rules are rules.","Ignore it.","Create a clear, safe staff-meal policy for surplus."],best:[2],u:["<b>Our answer: C.</b>","<b>Theory:</b> Kant’s humanity formula: punishing staff for not wasting food treats them as instruments of a bad policy. Role responsibility: the policy-maker, not the worker, answers for the waste."]},
 {t:"“Can you cook extra for us?”",s:"A charity partner asks the canteen to cook 30 extra meals every day so it always has food to distribute.",o:["Agree: it helps people in need.","Decline extra cooking, but donate genuine surplus.","Offer a separate, paid catering arrangement instead."],best:[1,2],u:["<b>Our answer: B, or C as an honest separate transaction.</b>","<b>Theory:</b> cooking surplus in order to donate it is moral hazard and CSR-washing (Carroll). Prevention stays the first duty; rescue is a safeguard, not a target."]}];

export const VERD: [lens: string, name: string, verdict: string, why: string, partly?: number][] = [["friedman","Friedman","◐ Partly fails","Lost profit; relies on externalities; donation not required",1],["freeman","Freeman","✗ Fails","Costs pushed onto the powerless"],["carroll","Carroll","✗ Fails","Fails the ethical layer, often the economic one"],["util","Utilitarianism","✗ Fails","Small gain, wide harm"],["kant","Kant","✗ Fails","Contradiction in the will; people used as means"],["rawls","Rawls & Young","✗ Fails","Burdens on the least advantaged"],["virtue","Virtue ethics","✗ Fails","Excess and display"],["env","Environmental ethics","✗ Fails","Environment used as a free sink"]];

export const CRIT: string[] = ["Effectiveness","Feasibility","Ethical acceptability","Stakeholder support"];

export const DEFW: number[] = [35,25,25,15];

export const SOL: { k: string; s: number[] }[] = [{k:"A. Last-Hour Food Rescue",s:[3,4.5,4,4.5]},{k:"B. Forecasting & Portion Control",s:[4.5,4,4.5,4]},{k:"C. Safe Redistribution",s:[3,2.5,4,3.5]}];

export const STAGES: PlanStep[] = [
 {k:"Measure the baseline",a:1,b:2,obj:"Find out how much food is wasted and where it comes from.",act:"Weigh food waste after each lunch; separate preparation waste, overproduction and plate waste; record meals prepared, sold and left over.",own:"Project team + canteen manager",res:"Digital scale, labelled bins, Google Sheets",kpi:"Baseline: grams of waste per meal; overproduction rate"},
 {k:"Analyse demand and problems",a:3,b:3,obj:"Find demand patterns and high-waste dishes.",act:"Analyse the baseline data and any existing sales records by day, time and dish; run a short student survey on portion size and disliked dishes.",own:"Data and survey leads",res:"Sales records, survey, spreadsheet",kpi:"Peak and low-demand periods; top 3 waste sources"},
 {k:"Design the new system",a:4,b:4,obj:"Build a simple forecasting and portion system.",act:"Estimate demand; design Small/Regular/Large or a smaller default + free refill; set up pre-orders and weekly menu ratings in the CampusMeal pilot app (Google Form as back-up); create a batch-cooking schedule; train kitchen staff.",own:"Canteen manager + kitchen supervisor + project team",res:"Portion tools, training session, forecasting sheet",kpi:"Staff understand the process; production targets set"},
 {k:"Small-scale pilot",a:5,b:6,obj:"Test with low risk.",act:"Apply forecasting to 2–3 popular dishes; offer flexible portions; collect daily feedback by QR code.",own:"Kitchen supervisor + staff",res:"Existing equipment, QR feedback form",kpi:"10–15% less waste on pilot dishes, with no fall in satisfaction"},
 {k:"Full pilot",a:7,b:10,obj:"Test at normal operating scale.",act:"Extend forecasting and portion choice to the full lunch menu; adjust production daily.",own:"Canteen manager with the project team",res:"Sales data, staff, portion system",kpi:"At least 15% less waste per meal; stretch goal 20–30%"},
 {k:"Evaluation and ethical review",a:11,b:11,obj:"Compare before and after.",act:"Compare baseline and pilot data; survey students and staff; check whether workload, food quality or choice were harmed.",own:"Project team + canteen manager",res:"Waste records, surveys, interviews",kpi:"Waste reduction, satisfaction, staff feedback, problems found"},
 {k:"Improve and decide on scale-up",a:12,b:12,obj:"Decide whether to continue, change or expand.",act:"Adjust the model; present results to university management; recommend continuation, changes or expansion.",own:"Project leader + university operations + canteen manager",res:"Final report, presentation, budget estimate",kpi:"A decision based on effectiveness, feasibility, ethics and support"}];

export const A_STEPS: PlanStep[] = [
 {k:"Agree the rules",a:7,b:7,obj:"Set clear, safe rules before selling anything.",act:"Agree the discount (30–50%), time window (last 30–60 minutes), eligible dishes, the 2-hour food-safety limit and a simple record sheet with the canteen manager.",own:"Canteen manager + project leader",res:"One-page rules sheet",kpi:"Rules agreed and signed"},
 {k:"Set up the announcement channel",a:7,b:7,obj:"Let students know when surplus is available.",act:"Make a QR poster for the counter and a message template for student Zalo or Facebook groups.",own:"Communications lead",res:"A3 poster, QR code, student groups",kpi:"Poster up; group ready"},
 {k:"Trial three days a week",a:8,b:9,obj:"Test whether surplus sells without encouraging over-cooking.",act:"Kitchen supervisor picks safe dishes; cashier sells at the discount; data lead records meals offered, sold and still binned each day.",own:"Kitchen supervisor + cashier + data lead",res:"Price stickers, record sheet",kpi:"≥ 50% of offered surplus sold; 0 safety complaints"},
 {k:"Review and decide",a:10,b:10,obj:"Decide whether to continue, adjust or stop.",act:"Compare surplus sold, kilograms avoided, revenue recovered and full-price sales; check for customers waiting for discounts.",own:"Project team + canteen manager",res:"Daily log, one-page review",kpi:"A clear decision with reasons"}];

export const C_STEPS: PlanStep[] = [
 {k:"Contact partners",a:3,b:4,obj:"Find a trained partner that can collect safely.",act:"Contact Hanoi Food Rescue, VietHarvest and Food Bank Vietnam; learn their minimum quantities, pickup times and packaging rules.",own:"Partnership lead",res:"Phone, email, meeting notes",kpi:"At least one partner agrees in principle"},
 {k:"Write the protocol",a:5,b:5,obj:"Agree exactly what can be donated and how.",act:"Eligible food, packaging, labels (dish and time cooked), chilled storage, pickup window and record sheet; ask the university for liability advice.",own:"Partnership lead + canteen manager + university",res:"Written protocol",kpi:"Protocol signed by canteen and partner"},
 {k:"Train the kitchen",a:6,b:6,obj:"Make sure everyone follows the same safety rules.",act:"One-hour session on the protocol and the WHO Five Keys to Safer Food.",own:"Kitchen supervisor + partner",res:"WHO Five Keys handout",kpi:"All kitchen staff trained"},
 {k:"Pilot pickups",a:9,b:11,obj:"Redistribute food that was not sold even after Solution A.",act:"One or two pickups a week; only untouched, labelled, chilled food; never plate leftovers.",own:"Kitchen supervisor + partner",res:"Food-safe boxes, labels, fridge space",kpi:"0 safety incidents; meals and kg recorded"},
 {k:"Review and decide",a:12,b:12,obj:"Decide whether to continue.",act:"Review meals and kg donated, incidents, partner and recipient feedback; check the prevention KPI did not get worse.",own:"Project team + canteen manager + partner",res:"Pickup records, feedback",kpi:"A clear decision with reasons"}];

export const ROLES: [role: string, duty: string][] = [["Project leader","Coordination, deadlines, contact with university management"],["Research lead","Literature and data on the problem (Page 1)"],["Ethics lead","Ethical analysis (Page 2)"],["Data and audit lead","Weighing, spreadsheet, KPI calculations"],["Survey and stakeholder lead","Survey design; interviews with students and staff"],["Canteen liaison and design lead","Working with the kitchen; website design"]];

export const LOG: string[] = ["Meeting with the canteen manager to agree the pilot","First baseline weighing","Survey launched","Staff training session","Pilot started","Results presented"];

export const REFS: [type: string, html: string][] = [
 ["Academic","Aristotle. (2009). <i>The Nicomachean ethics</i> (W. D. Ross, Trans.; L. Brown, Ed.). Oxford University Press. (Original work written c. 340 BCE)"],
 ["News","Báo Pháp luật. (2025, January 2). Bài 1: Lãng phí đồ ăn từ mâm cơm gia đình tới nhà hàng ở Việt Nam. https://baophapluat.vn/bai-1-lang-phi-do-an-tu-mam-com-gia-dinh-toi-nha-hang-o-viet-nam-post535007.html"],
 ["Academic","Bentham, J. (1996). <i>An introduction to the principles of morals and legislation</i> (J. H. Burns & H. L. A. Hart, Eds.). Clarendon Press. (Original work published 1789)"],
 ["Academic","Carroll, A. B. (1991). The pyramid of corporate social responsibility: Toward the moral management of organizational stakeholders. <i>Business Horizons, 34</i>(4), 39–48."],
 ["Reports","CEL Consulting. (2018). <i>Food loss and waste in Vietnam</i> [Study cited in Pham et al., 2025]."],
 ["Business","Champions 12.3. (2018a). <i>The business case for reducing food loss and waste: Hotels</i>. https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/"],
 ["Business","Champions 12.3. (2018b). <i>The business case for reducing food loss and waste: Catering</i>. https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-caterers/"],
 ["Business","Champions 12.3. (2019, February 13). <i>New report finds restaurants save significant money from fighting food waste</i> [Press release]. https://champions123.org/release-new-report-finds-restaurants-save-significant-money-fighting-food-waste"],
 ["Reports","Food and Agriculture Organization of the United Nations. (2013). <i>Food wastage footprint: Impacts on natural resources. Summary report</i>. FAO."],
 ["Academic","Freeman, R. E. (1984). <i>Strategic management: A stakeholder approach</i>. Pitman."],
 ["Academic","French, P. A. (1979). The corporation as a moral person. <i>American Philosophical Quarterly, 16</i>(3), 207–215."],
 ["Academic","Friedman, M. (1970, September 13). The social responsibility of business is to increase its profits. <i>The New York Times Magazine</i>."],
 ["News","Giảm rác nhựa. (2020). <i>The largest landfill in Hanoi is blocked</i>. https://giamracnhua.vn/en/the-largest-landfill-in-hanoi-is-blocked/"],
 ["Academic","Goodpaster, K. E., & Matthews, J. B. (1982). Can a corporation have a conscience? <i>Harvard Business Review, 60</i>(1), 132–141."],
 ["Reports","Harvard Law School Food Law and Policy Clinic & The Global FoodBanking Network. (2024). <i>The Global Food Donation Policy Atlas: Viet Nam</i> [Executive summary]. https://atlas.foodbanking.org/wp-content/uploads/2024/10/Food-Donation-Policy-Atlas_Viet-Nam-Executive-Summary.pdf"],
 ["Business","IHG Hotels & Resorts. (2022, December 1). <i>IHG Hotels & Resorts teams up with VietHarvest to cut food waste and hunger in Vietnam</i> [Press release]. https://www.ihgplc.com/en/news-and-media/news-releases/2022/ihg-hotels-and-resorts-teams-up-with-vietharvest-to-cut-food-waste-and-hunger-in-vietnam"],
 ["Reports","Intergovernmental Panel on Climate Change. (2021). <i>Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report</i> (Chapter 7, Table 7.15). Cambridge University Press."],
 ["Academic","Kant, I. (1996). <i>The metaphysics of morals</i> (M. Gregor, Trans.). Cambridge University Press. (Original work published 1797)"],
 ["Academic","Kant, I. (1998). <i>Groundwork of the metaphysics of morals</i> (M. Gregor, Trans.). Cambridge University Press. (Original work published 1785)"],
 ["Academic","Leopold, A. (1949). <i>A Sand County almanac, and sketches here and there</i>. Oxford University Press."],
 ["Academic","Liu, C., & Nguyen, T. T. (2020). Evaluation of household food waste generation in Hanoi and policy implications towards SDGs target 12.3. <i>Sustainability, 12</i>(16), 6565. https://doi.org/10.3390/su12166565"],
 ["Academic","Mill, J. S. (1863). <i>Utilitarianism</i>. Parker, Son, and Bourn."],
 ["Academic","Mitchell, R. K., Agle, B. R., & Wood, D. J. (1997). Toward a theory of stakeholder identification and salience: Defining the principle of who and what really counts. <i>Academy of Management Review, 22</i>(4), 853–886."],
 ["Academic","Naess, A. (1973). The shallow and the deep, long-range ecology movement: A summary. <i>Inquiry, 16</i>(1–4), 95–100."],
 ["Academic","Ngo, T. L. P., Yabar, H., & Mizunoya, T. (2021). Characterization and analysis of household solid waste composition to identify the optimal waste management method: A case study in Hanoi City, Vietnam. <i>Earth, 2</i>(4), 1046–1058. https://doi.org/10.3390/earth2040062"],
 ["Academic","Pham, H. V., Nguyen, T. T., Phan, K. H., Duong, T. T., & Ngo, X. B. (2025). Food waste in school lunches in Hanoi urban, a weighing-based empirical study. <i>Engineering and Technology for Sustainable Development, 35</i>(3), 61–69. https://doi.org/10.51316/jst.183.etsd.2025.35.3.8"],
 ["Academic","Porter, M. E., & Kramer, M. R. (2011). Creating shared value. <i>Harvard Business Review, 89</i>(1/2), 62–77."],
 ["Academic","Rawls, J. (1971). <i>A theory of justice</i>. Harvard University Press."],
 ["Academic","Sen, A. (1981). <i>Poverty and famines: An essay on entitlement and deprivation</i>. Clarendon Press."],
 ["Academic","Singer, P. (1972). Famine, affluence, and morality. <i>Philosophy & Public Affairs, 1</i>(3), 229–243."],
 ["Academic","Solomon, R. C. (1992). <i>Ethics and excellence: Cooperation and integrity in business</i>. Oxford University Press."],
 ["News","Tạp chí Công Thương. (2026). 7 nội dung chính triển khai thi hành Luật Tiết kiệm, chống lãng phí. https://tapchicongthuong.vn/7-noi-dung-chinh-trien-khai-thi-hanh-luat-tiet-kiem--chong-lang-phi-456627.htm"],
 ["Academic","Thaler, R. H., & Sunstein, C. R. (2008). <i>Nudge: Improving decisions about health, wealth, and happiness</i>. Yale University Press."],
 ["News","Tuổi Trẻ News. (2022, April 26). <i>Hanoi students fight against food waste for nearly 10 years</i>. https://news.tuoitre.vn/hanoi-students-fight-against-food-waste-for-nearly-10-years-10366796.htm"],
 ["News","Tuổi Trẻ News. (2025, September 30). <i>Vietnam wastes nearly $4bn in edible food annually</i>. https://news.tuoitre.vn/print/vietnam-wastes-nearly-4bn-in-edible-food-annually-103250930133910138.htm"],
 ["News","UN News. (2024, March 27). <i>With 783 million people going hungry, a fifth of all food goes to waste</i>. https://news.un.org/en/node/1148036"],
 ["Reports","United Nations. (2015). <i>Transforming our world: The 2030 Agenda for Sustainable Development</i> (A/RES/70/1)."],
 ["Reports","United Nations Environment Programme. (2024). <i>Food Waste Index Report 2024. Think eat save: Tracking progress to halve global food waste</i>. UNEP."],
 ["Reports","United States Environmental Protection Agency. (n.d.). <i>Food recovery hierarchy</i>. https://www.epa.gov/sustainable-management-food/food-recovery-hierarchy"],
 ["Academic","Velasquez, M. G. (1983). Why corporations are not morally responsible for anything they do. <i>Business & Professional Ethics Journal, 2</i>(3), 1–18."],
 ["News","Vietnam News. (2023, August 23). <i>Food Bank Vietnam, Starbucks partner to reduce food waste</i>. https://bizhub.vietnamnews.vn/food-bank-vietnam-starbucks-partner-to-reduce-food-waste-post347396.html"],
 ["News","Vietnam News. (2026, May 26). <i>Food Bank Việt Nam, MM Mega Market partner for circular economy</i>. https://vietnamnews.vn/economy/1782093/food-bank-viet-nam-mm-mega-market-partner-for-circular-economy.html"],
 ["News","VietNamNet. (2019, July 4). <i>Hanoi rubbish dispute up as families await relocation</i>. https://vietnamnet.vn/en/hanoi-rubbish-dispute-up-as-families-await-relocation-547425.html"],
 ["News","VietNamNet. (2020, November 4). <i>Hanoi’s landfills overloaded</i>. https://vietnamnet.vn/en/hanois-landfills-overloaded-685456.html"],
 ["News","VnEconomy. (2025, September 5). Mỗi ngày cả nước phát sinh gần 70 nghìn tấn chất thải rắn sinh hoạt. https://vneconomy.vn/moi-ngay-ca-nuoc-phat-sinh-gan-70-nghin-tan-chat-thai-ran-sinh-hoat.htm"],
 ["News","VOV. (n.d.). Giải quyết vấn đề thức ăn thừa trong ngành khách sạn Việt Nam. https://vov.vn/du-lich/tu-van/giai-quyet-van-de-thuc-an-thua-trong-nganh-khach-san-viet-nam-post1128315.vov"],
 ["News","Vu, H. T. (2023, May 17). In Vietnam, waste pickers fight the climate crisis, but with no social safety net. <i>Eco-Business</i>. https://www.eco-business.com/news/in-vietnam-waste-pickers-fight-the-climate-crisis-but-with-no-social-safety-net/"],
 ["Reports","World Bank & UNICEF. (2019, September 12). <i>World Bank, UNICEF call for solid steps to address child undernutrition in Viet Nam</i> [Press release]. https://www.worldbank.org/en/news/press-release/2019/09/12/world-bank-unicef-call-for-solid-steps-to-address-child-undernutrition-in-vietnam"],
 ["Reports","World Health Organization. (2006). <i>Five keys to safer food manual</i>. WHO."],
 ["Academic","Young, I. M. (2011). <i>Responsibility for justice</i>. Oxford University Press."]];

export const FEATS: [name: string, audience: string, status: string, sol: string, what: string, why: string][] = [
 ["Today’s meals","For students","Core","B","All canteens and dishes for today in one place.","Shows demand in advance instead of guessing."],
 ["Pre-order","For students","Core","B","Order before 10:00 and collect at the counter.","Pre-orders are the most reliable part of the forecast."],
 ["Weekly menu and 1–5 interest rating","For students","Core","B","Rate how interested you are in next week’s dishes.","Adjusts the forecast and flags unpopular dishes before they are cooked."],
 ["Portion choice and free refill","For students","New","B","Small, Regular or Large; free refill of rice and vegetables.","Tackles oversized portions, the second root cause."],
 ["Cut-off and pickup reminders","For students","New","B","10:00 cut-off, 11:30 reminder, release of uncollected orders at 12:30.","Keeps the forecast accurate and avoids wasted pre-orders."],
 ["Dietary filters","For students","New","Fit","V-Halal, vegetarian and allergen labels checked by the canteen.","Respects religious and health needs, so nobody orders the wrong meal and leaves it."],
 ["Forecast and batch planner","For the kitchen","New","B","Pre-orders + expected walk-ins, turned into a first batch and top-ups.","The core of Solution B: cook to data, not habit."],
 ["Low-stock batch alerts","For the kitchen","New","B","Alerts when a dish falls below one batch.","Makes batch cooking practical during a busy service."],
 ["Waste log","For the kitchen","New","B","Daily weights for preparation, overproduction and plate waste.","Gives the KPI, grams wasted per meal, every day."],
 ["Finish-check feedback","For students","New","B","One tap after lunch: how much did you finish, and why not?","Turns plate waste into feedback the kitchen can act on."],
 ["Menu insights","For the kitchen","New","B","Flags dishes that are often left half-eaten or rated low.","Fixes recipes and portions at the source."],
 ["Last-call alerts","For students","New","A","Discounted surplus after service, only when it really exists.","Rescues food on days the forecast is wrong."],
 ["Surplus and donation log","For the kitchen","New","C","Safety checklist, labels with time cooked, partner pickup record.","Makes safe redistribution traceable and accountable."],
 ["Impact view and weekly report","Reporting","New","Learn","Private impact for each student; KPI report for the canteen manager.","Measures the difference made and keeps reporting honest."]];

/** Ethics › Voices. Entries with `field` are filled in by the team (see <Field>). */
export const QUOTES: { q: string; w: string; s: string; field?: [quoteId: string, quotePh: string, whoId: string, whoPh: string] }[] = [
  { q: "Food waste is a global tragedy. Millions will go hungry today as food is wasted across the world.", w: "Inger Andersen, Executive Director, UN Environment Programme", s: "UN News (2024)" },
  { q: "Vietnam does not currently have a law that penalizes food waste or mandates the donation of surplus food.", w: "Global Food Donation Policy Atlas: Viet Nam", s: "Harvard FLPC & GFN (2024)" },
  { q: "I have to work until I cannot work anymore.", w: "Phương, informal waste picker without health or social insurance", s: "Vu (2023), Eco-Business" },
  { q: "If it is in our power to prevent something bad from happening, without thereby sacrificing anything of comparable moral importance, we ought, morally, to do it.", w: "Peter Singer, philosopher", s: "Singer (1972, p. 231)" },
  { q: "A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.", w: "Aldo Leopold, ecologist", s: "Leopold (1949, p. 224)" },
  { q: "", w: "", s: "Team survey", field: ["cq_student", "Add a quote from a student in our survey or interview", "cq_student_who", "e.g. 2nd-year student"] },
  { q: "", w: "", s: "Team interview", field: ["cq_staff", "Add a quote from the canteen manager or kitchen staff", "cq_staff_who", "role"] },
];

/** App › Kitchen forecast: example dashboard rows [canteen, dish, pre-orders, avg walk-ins, interest, old habit]. */
export const DASH_ROWS: [string, string, number, number, number, number][] = [
  ["Little Kitchen", "Teriyaki chicken", 40, 60, 3.6, 130], ["Little Kitchen", "Sweet & sour chicken", 22, 45, 3.1, 90], ["Foodology", "Chicken salad", 18, 30, 2.6, 60],
  ["Foodology", "Fish noodle soup", 25, 40, 3.4, 80], ["Our Home", "V-food dish", 12, 25, 3.0, 50], ["Our Home", "V-Halal dish", 15, 20, 3.2, 45],
];

