const principles = [
  "Measure verified AI productivity gains from real operating workflows.",
  "Net out AI software, cloud, implementation, training, and change-management costs.",
  "Apply a transparent dividend rule and confidence haircut.",
  "Generate contribution instructions for regulated partners instead of moving money directly.",
  "Report evidence to employers, employees, investors, and assurance partners."
];

const productBoundaries = [
  ["Not a pension operator", "The product should not custody assets, administer pension accounts, or move funds."],
  ["Not investment advice", "The dashboard models employer contribution capacity, not personal investment decisions."],
  ["Not employee surveillance", "Pilot data should stay aggregated by workflow, department, or employee group."],
  ["Not policy-dependent", "The business can start as a voluntary employer SaaS before any public mandate exists."]
];

const staticResources = [
  ["Brand mark", "/brand-mark.svg", "SVG identity asset for decks and lightweight web use."],
  ["Social preview", "/social-preview.svg", "Open Graph preview image for sharing the project link."],
  ["Pilot CSV template", "/templates/pilot-workflow-metrics.csv", "Safe aggregated workflow upload format."],
  ["Assumptions JSON", "/templates/assumptions-template.json", "Static model assumptions template."],
  ["Partner instruction JSON", "/templates/contribution-instruction-template.json", "Dry-run partner execution payload."],
  ["Privacy notice", "/legal/privacy-notice.md", "Prototype privacy and data-handling notice."],
  ["Terms placeholder", "/legal/terms-placeholder.md", "Prototype terms and compliance boundary notice."]
];

const proofPoints = [
  ["Employer proof", "A 90-day pilot can show measured workflow improvement and CFO-reviewed net savings."],
  ["Worker value", "A defined share of verified gains can be allocated to retirement contribution capacity."],
  ["Partner proof", "Regulated partners can execute contribution rails while the SaaS stays a measurement layer."],
  ["Investor proof", "The platform can monetize SaaS, setup, verification, and reporting without custody risk."]
];

export function AboutView() {
  return (
    <div className="dashboard-grid">
      <section className="span-12 about-hero">
        <div>
          <p className="eyebrow">About the project</p>
          <h2>Pension from AI Productivity Dividend in Japan</h2>
          <p>
            Prepared by Eyal Shahaf. This SaaS MVP demonstrates how employers
            can measure responsible AI productivity gains and translate a defined
            share of verified value into retirement contribution capacity.
          </p>
        </div>
        <div className="about-hero-stat">
          <span>Role</span>
          <strong>Measurement layer</strong>
          <p>Not custody, not investment advice, not pension administration.</p>
        </div>
      </section>

      <section className="span-7 panel">
        <h3>What the product does</h3>
        <div className="principle-list">
          {principles.map((item, index) => (
            <div className="principle-row" key={item}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="span-5 panel">
        <h3>What it deliberately avoids</h3>
        <div className="boundary-list">
          {productBoundaries.map(([title, body]) => (
            <div className="boundary-row" key={title}>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </aside>

      <section className="span-6 panel">
        <h3>Why Japan is a strong first market</h3>
        <p>
          Japan combines aging demographics, deep employer responsibility,
          pension adequacy pressure, strong enterprise operations, and a national
          interest in responsible AI adoption. The clean entry path is not to
          replace pension infrastructure; it is to help employers prove and
          allocate AI-generated productivity value.
        </p>
      </section>

      <section className="span-6 panel">
        <h3>Investor proof logic</h3>
        <div className="proof-list">
          {proofPoints.map(([title, body]) => (
            <div className="proof-row" key={title}>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="span-12 panel">
        <div className="resource-head">
          <div>
            <h3>Static project resources</h3>
            <p>
              These files live in the Next.js <code>public/</code> folder and
              are included in the GitHub-ready project zip.
            </p>
          </div>
        </div>
        <div className="resource-link-grid">
          {staticResources.map(([title, href, body]) => (
            <a className="resource-link" href={href} key={href}>
              <span>{title}</span>
              <p>{body}</p>
              <small>{href}</small>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
