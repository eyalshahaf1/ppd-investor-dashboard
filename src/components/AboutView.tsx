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

const staticResourceGroups = [
  {
    title: "Demo identity",
    body: "Useful for decks, browser metadata, and shared links.",
    links: [
      ["Brand mark", "/brand-mark.svg"],
      ["Social preview", "/social-preview.svg"]
    ]
  },
  {
    title: "Pilot templates",
    body: "Starter files for safe aggregated customer-data demonstrations.",
    links: [
      ["Workflow CSV", "/templates/pilot-workflow-metrics.csv"],
      ["Assumptions JSON", "/templates/assumptions-template.json"],
      ["Partner instruction JSON", "/templates/contribution-instruction-template.json"]
    ]
  },
  {
    title: "Prototype legal notes",
    body: "Plain-language placeholders that clarify demo boundaries.",
    links: [
      ["Privacy notice", "/legal/privacy-notice.md"],
      ["Terms placeholder", "/legal/terms-placeholder.md"]
    ]
  }
];

const proofPoints = [
  ["Employer proof", "A 90-day pilot can show measured workflow improvement and CFO-reviewed net savings."],
  ["Worker value", "A defined share of verified gains can be allocated to retirement contribution capacity."],
  ["Partner proof", "Regulated partners can execute contribution rails while the SaaS stays a measurement layer."],
  ["Investor proof", "The platform can monetize SaaS, setup, verification, and reporting without custody risk."]
];

const japaneseVersionSteps = [
  ["Interface translation", "Translate navigation, dashboards, labels, investor text, and customer workflow language."],
  ["Terminology review", "Review Japanese pension, HR, tax, labor, and financial-regulatory terminology with local experts."],
  ["Partner localization", "Adapt contribution instruction formats to the regulated partner and employer benefit workflow."],
  ["Customer validation", "Test wording with HR, CFO, compliance, and employee-communications stakeholders in Japan."]
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
        <h3>Japanese version path</h3>
        <p>
          A Japanese version is possible and commercially important. The right
          path is to localize the interface first, then validate pension,
          employment, tax, privacy, and financial-regulatory wording before any
          customer pilot.
        </p>
        <div className="localization-grid">
          {japaneseVersionSteps.map(([title, body]) => (
            <article className="localization-step" key={title}>
              <b>{title}</b>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="span-12 panel">
        <div className="resource-head">
          <div>
            <h3>Project resources</h3>
            <p>
              Investor and pilot support files included with the app. They are
              served from the Next.js <code>public/</code> folder and included
              in the GitHub-ready zip.
            </p>
          </div>
        </div>
        <div className="resource-group-grid">
          {staticResourceGroups.map((group) => (
            <article className="resource-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.body}</p>
              <div className="resource-actions">
                {group.links.map(([label, href]) => (
                  <a href={href} key={href}>
                    {label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="span-12 about-footer">
        <div>
          <b>Pension from AI Productivity Dividend</b>
          <p>Prepared by Eyal Shahaf. Prototype SaaS MVP for investor and pilot discussion.</p>
        </div>
        <div>
          <b>Current status</b>
          <p>Local Next.js demo with SQLite persistence, pilot upload workflow, and static project resources.</p>
        </div>
        <div>
          <b>Compliance boundary</b>
          <p>Not financial, pension, legal, tax, or investment advice. Regulated partners execute pension rails.</p>
        </div>
      </footer>
    </div>
  );
}
