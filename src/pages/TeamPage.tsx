// Team members, their photos, and who led each area of work.
import { PageSection, Pager, SubTabs, Tab } from "../components/layout";

const MEMBERS = ["Doan Bui Minh Phuong", "Le Duc Anh", "Nguyen Bao Son", "Phan Ngoc Tram"];

/* Every workstream visible on the site, and who led it. */
const WORK: [area: string, what: string, lead: string][] = [
  ["Desk research", "UN reports, studies, news and every source on the Sources page", "Le Duc Anh"],
  ["Vietnamese law review", "The 8 laws and decrees on the Problem and Sources pages", "Le Duc Anh"],
  ["Ethical analysis", "The five reasons, eight lenses, dilemmas, SDGs and verdict", "Doan Bui Minh Phuong"],
  ["Solution design", "Six ideas, the shortlist of A, B and C, and the weighted scoring", "Doan Bui Minh Phuong"],
  ["Survey design and data collection", "The questionnaire and collecting responses", "Doan Bui Minh Phuong"],
  ["Data analysis", "Ratings, ANOVA, Tukey post-hoc and robustness checks", "Doan Bui Minh Phuong"],
  ["Food-waste audit", "Weighing preparation, overproduction and plate waste", "Le Duc Anh"],
  ["CampusMeal app", "The pilot app, kitchen forecast and operating protocol", "Nguyen Bao Son"],
  ["Action plans", "The 12-week roadmap and a plan for each solution", "Doan Bui Minh Phuong"],
  ["Awareness campaign", "Planning the campaign and putting up 5 posters on campus", "Phan Ngoc Tram"],
  ["Illustration and poster design", "The poster and campaign visuals", "Phan Ngoc Tram"],
  ["Social media", "The Threads and Facebook posts and their insights", "Phan Ngoc Tram"],
  ["Website", "Building and writing this website", "Nguyen Bao Son"],
  ["Results and reflection", "Results, lessons learned and next steps", "Nguyen Bao Son"],
];

export default function TeamPage() {
  return (
    <PageSection id="team">
      <div className="wrap phead">
        <h1>Our team</h1>
        <p className="lede">Who we are, and who led each part of the project.</p>
      </div>
      <SubTabs />
      <div className="wrap">
        <Tab id="members" label="Our team">
          <div className="grid team">
            {MEMBERS.map((name) => (
              <div className="panel stack" key={name}>
                <img src={`Our team/${name}.jpg`} alt={name} loading="lazy" />
                <h3>{name}</h3>
              </div>
            ))}
          </div>
          <h3 style={{ margin: "26px 0 12px" }}>Who did what</h3>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Area of work</th>
                  <th>What it covers</th>
                  <th>Led by</th>
                </tr>
              </thead>
              <tbody>
                {WORK.map(([area, what, lead]) => (
                  <tr key={area}>
                    <td>
                      <b>{area}</b>
                    </td>
                    <td>{what}</td>
                    <td>{lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab>
        <Pager />
      </div>
    </PageSection>
  );
}
