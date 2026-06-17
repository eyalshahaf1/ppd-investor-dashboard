import type { Language } from "@/lib/i18n";

const principles = [
  "Measure verified AI productivity gains.",
  "Net out AI and implementation costs.",
  "Apply a transparent dividend rule.",
  "Generate regulated-partner instructions.",
  "Report evidence and impact."
];

const productBoundaries = [
  ["Not a pension operator", "No custody, accounts, or fund movement."],
  ["Not investment advice", "Models employer contribution capacity only."],
  ["Not surveillance", "Use aggregated workflow evidence."],
  ["Not policy-dependent", "Starts as voluntary employer SaaS."]
];

const staticResourceGroups = [
  {
    title: "Demo identity",
    body: "Deck and sharing assets.",
    links: [
      ["Brand mark", "/brand-mark.svg"],
      ["Social preview", "/social-preview.svg"]
    ]
  },
  {
    title: "Pilot templates",
    body: "Aggregated demo data formats.",
    links: [
      ["Workflow CSV", "/templates/pilot-workflow-metrics.csv"],
      ["Assumptions JSON", "/templates/assumptions-template.json"],
      ["Partner instruction JSON", "/templates/contribution-instruction-template.json"]
    ]
  },
  {
    title: "Prototype legal notes",
    body: "Prototype boundaries.",
    links: [
      ["Privacy notice", "/legal/privacy-notice.md"],
      ["Terms placeholder", "/legal/terms-placeholder.md"]
    ]
  }
];

const proofPoints = [
  ["Employer proof", "Measured workflow gains."],
  ["Worker value", "Share of verified gains."],
  ["Partner proof", "Regulated rails execute."],
  ["Investor proof", "SaaS without custody risk."]
];

const japaneseVersionSteps = [
  ["Interface", "Navigation, labels, KPIs."],
  ["Terminology", "Pension, HR, tax, privacy."],
  ["Partner fit", "Instruction file/API format."],
  ["Customer test", "HR, CFO, compliance review."]
];

type AboutViewProps = {
  language: Language;
};

export function AboutView({ language }: AboutViewProps) {
  const isJapanese = language === "ja";

  return (
    <div className="dashboard-grid">
      <section className="span-12 about-hero">
        <div>
          <p className="eyebrow">{isJapanese ? "プロジェクト概要" : "About the project"}</p>
          <h2>
            {isJapanese
              ? "日本におけるAI生産性配当から年金原資へ"
              : "Pension from AI Productivity Dividend in Japan"}
          </h2>
          <p>
            {isJapanese
              ? "作成: Eyal Shahaf。検証済みAI生産性を退職拠出能力へ変換するSaaS MVP。"
              : "Prepared by Eyal Shahaf. A SaaS MVP for turning verified AI productivity into retirement contribution capacity."}
          </p>
        </div>
        <div className="about-hero-stat">
          <span>{isJapanese ? "役割" : "Role"}</span>
          <strong>{isJapanese ? "測定レイヤー" : "Measurement layer"}</strong>
          <p>
            {isJapanese
              ? "資産保管、投資助言、年金管理ではありません。"
              : "Not custody, not investment advice, not pension administration."}
          </p>
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
          Aging demographics, enterprise scale, pension pressure, and responsible AI adoption.
          The product adds measurement; partners keep execution.
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
        <h3>{isJapanese ? "日本語版の進め方" : "Japanese version path"}</h3>
        <p>
          {isJapanese
            ? "まずUIを短くローカライズし、パイロット前に専門用語を確認します。"
            : "Localize the interface first, then validate regulated terminology before pilots."}
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
              Investor and pilot files served from <code>public/</code>.
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
          <p>Prepared by Eyal Shahaf. Prototype SaaS MVP.</p>
        </div>
        <div>
          <b>Current status</b>
          <p>Next.js demo with SQLite, uploads, and static resources.</p>
        </div>
        <div>
          <b>Compliance boundary</b>
          <p>Not advice. Regulated partners execute pension rails.</p>
        </div>
      </footer>
    </div>
  );
}
