// Generated from the original HTML page, then edited by hand. Content lives here; behaviour lives in components.
import { PageSection, Pager, SubTabs, Tab } from "../components/layout";
import { Field, RefFilters, RefList, RefSearch } from "../components";

export default function SourcesPage() {
  return (
    <PageSection id="sources">
      <div className="wrap phead">
        <h1>Methods &amp; sources</h1>
        <p className="lede">How we did the research, and every source we used, in APA 7.</p>
        <p className="stage-note">Design thinking: Evidence. Rubrics 1 &amp; 5: Reliable evidence.</p>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="methods" label="How we researched">
          <div className="tab-title">
            <h2>How we did the research</h2>
          </div>
          <div className="grid g2">
            <div className="panel stack">
              <h3>Desk research</h3>
              <p>
                UN reports, peer-reviewed studies, Vietnamese law, legal analyses and news reports. Peer-reviewed and official sources were
                preferred; every figure was checked against its original source, and sponsored surveys with a conflict of interest were not
                used as evidence.
              </p>
            </div>
            <div className="panel stack">
              <h3>Food-waste audit</h3>
              <p>Weighing waste after each lunch, separated into preparation waste, overproduction and plate waste.</p>
              <p className="small">
                <Field id="m_audit">dates, number of days, meals counted</Field>
              </p>
            </div>
            <div className="panel stack">
              <h3>Student survey</h3>
              <p>Portion size, disliked dishes, willingness to choose smaller portions, and how ethically acceptable each solution is.</p>
              <p className="small">
                <Field id="m_survey">n, dates, how it was distributed</Field>
              </p>
            </div>
            <div className="panel stack">
              <h3>Interviews</h3>
              <p>Canteen manager and kitchen staff.</p>
              <p className="small">
                <Field id="m_interviews">number, dates</Field>
              </p>
            </div>
          </div>
        </Tab>
        <Tab id="refs" label="References">
          <div className="tab-title">
            <h2>References</h2>
          </div>
          <p className="tab-intro">Search the list, or filter by type.</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px", alignItems: "center" }}>
            <RefSearch
              style={{
                font: "inherit",
                padding: "9px 12px",
                border: "1px solid var(--line)",
                borderRadius: "10px",
                background: "var(--panel)",
                color: "var(--ink)",
                flex: "1",
                minWidth: "0",
                maxWidth: "360px",
              }}
            />
            <RefFilters className="filters" style={{ margin: "0" }} />
          </div>
          <div className="panel">
            <RefList className="clean" style={{ gap: "10px" }} />
          </div>
        </Tab>
        <Tab id="laws" label="Vietnamese law">
          <div className="tab-title">
            <h2>Vietnamese legal instruments</h2>
          </div>
          <div className="panel">
            <ol className="clean">
              <li>Law on Food Safety No. 55/2010/QH12 (2010).</li>
              <li>Decree No. 15/2018/NĐ-CP detailing the Law on Food Safety (2018).</li>
              <li>
                Decree No. 115/2018/NĐ-CP on administrative penalties for food-safety violations (2018), amended by Decree No.
                124/2021/NĐ-CP.
              </li>
              <li>Law on Environmental Protection No. 72/2020/QH14 (2020), Article 75.</li>
              <li>Circular No. 96/2020/TT-BTC guiding information disclosure on the securities market (2020).</li>
              <li>Decree No. 08/2022/NĐ-CP detailing the Law on Environmental Protection (2022), Article 58.</li>
              <li>Decision No. 942/QĐ-TTg approving the Action Plan for Methane Emission Reduction to 2030 (5 August 2022).</li>
              <li>Law on Thrift and Anti-Waste No. 110/2025/QH15 (passed 10 December 2025; in force 1 July 2026).</li>
            </ol>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
