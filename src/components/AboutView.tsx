import type { Language } from "@/lib/i18n";

const resourceHrefs = [
  ["/PPD_Horizontal_Primary_Teal.svg", "/social-preview.svg"],
  [
    "/templates/pilot-workflow-metrics.csv",
    "/templates/assumptions-template.json",
    "/templates/contribution-instruction-template.json"
  ],
  ["/legal/privacy-notice.md", "/legal/terms-placeholder.md"]
];

type AboutViewProps = {
  language: Language;
};

const aboutCopy = {
  en: {
    eyebrow: "About the project",
    title: "Pension from AI Productivity Dividend in Japan",
    body:
      "Prepared by Eyal Shahaf. A SaaS MVP for turning verified AI productivity into retirement contribution capacity.",
    role: "Role",
    roleValue: "Measurement layer",
    roleBody: "Not custody, not investment advice, not pension administration.",
    roleChips: ["Measurement layer", "No custody", "Partner-operated rails"],
    founderTitle: "Founder",
    founderParagraphs: [
      "Eyal Shahaf is the founder of Pension Productivity Dividend.",
      "He brings more than 20 years of international business-development experience across industries, alongside long-standing engagement with Japan and cross-border partnership work.",
      "At PPD, Eyal leads market development, pilot design, partner engagement, and the coalition-building needed to connect employers, assurance providers, and regulated benefit or pension partners.",
      "PPD is deliberately not built around a claim that one founder can replace pension operators, auditors, legal advisers, or security specialists. Those capabilities are assembled through expert partners and advisers."
    ],
    productTitle: "What the product does",
    principles: [
      "Measure verified AI productivity gains.",
      "Net out AI and implementation costs.",
      "Apply a transparent dividend rule.",
      "Generate regulated-partner instructions.",
      "Report evidence and impact."
    ],
    boundariesTitle: "What it deliberately avoids",
    productBoundaries: [
      ["Not a pension operator", "No custody, accounts, or fund movement."],
      ["Not investment advice", "Models employer contribution capacity only."],
      ["Not surveillance", "Use aggregated workflow evidence."],
      ["Not policy-dependent", "Starts as voluntary employer SaaS."]
    ],
    japanTitle: "Why Japan is a strong first market",
    japanBody:
      "Aging demographics, enterprise scale, pension pressure, and responsible AI adoption. The product adds measurement; partners keep execution.",
    proofTitle: "Investor proof logic",
    proofPoints: [
      ["Employer proof", "Measured workflow gains."],
      ["Worker value", "Share of verified gains."],
      ["Partner proof", "Regulated rails execute."],
      ["Investor proof", "SaaS without custody risk."]
    ],
    languagePathTitle: "Japanese version path",
    languagePathBody:
      "Localize the interface first, then validate regulated terminology before pilots.",
    languageSteps: [
      ["Interface", "Navigation, labels, KPIs."],
      ["Terminology", "Pension, HR, tax, privacy."],
      ["Partner fit", "Instruction file/API format."],
      ["Customer test", "HR, CFO, compliance review."]
    ],
    resourcesTitle: "Project resources",
    resourcesBody: "Investor and pilot files served from",
    resourceGroups: [
      {
        title: "Demo identity",
        body: "Deck and sharing assets.",
        links: ["Official horizontal logo", "Social preview"]
      },
      {
        title: "Pilot templates",
        body: "Aggregated demo data formats.",
        links: ["Workflow CSV", "Assumptions JSON", "Partner instruction JSON"]
      },
      {
        title: "Prototype legal notes",
        body: "Prototype boundaries.",
        links: ["Privacy notice", "Terms placeholder"]
      }
    ],
    footer: [
      ["Pension from AI Productivity Dividend", "Prepared by Eyal Shahaf. Prototype SaaS MVP."],
      ["Current status", "Next.js demo with SQLite, uploads, and static resources."],
      ["Compliance boundary", "Not advice. Regulated partners execute pension rails."]
    ]
  },
  ja: {
    eyebrow: "プロジェクト概要",
    title: "日本におけるAI生産性配当から年金原資へ",
    body:
      "作成: Eyal Shahaf。検証済みAI生産性を退職拠出能力へ変換するSaaS MVP。",
    role: "役割",
    roleValue: "測定レイヤー",
    roleBody: "資産保管、投資助言、年金管理ではありません。",
    roleChips: ["測定レイヤー", "資産保管なし", "パートナー運営レール"],
    founderTitle: "創業者",
    founderParagraphs: [
      "シャハフ・エヤールは、Pension Productivity Dividendの創業者です。",
      "複数業界で20年以上にわたる国際事業開発の経験と、日本との長年の関わり、国境を越えたパートナーシップ構築の経験を持ちます。",
      "PPDでは、市場開拓、パイロット設計、パートナー連携、そして雇用主・第三者検証機関・規制対象の福利厚生／年金パートナーを結ぶ連携体制づくりを主導します。",
      "PPDは、一人の創業者が年金運営、監査、法務、セキュリティをすべて担うという考え方ではありません。これらの専門性は、専門家とパートナーとともに構築します。"
    ],
    productTitle: "プロダクトの役割",
    principles: [
      "検証済みAI生産性効果を測定します。",
      "AIコストと導入コストを控除します。",
      "透明な配分ルールを適用します。",
      "規制対象パートナー向けの指示を生成します。",
      "エビデンスとインパクトを報告します。"
    ],
    boundariesTitle: "意図的に行わないこと",
    productBoundaries: [
      ["年金運営者ではない", "資産保管、口座管理、資金移動は行いません。"],
      ["投資助言ではない", "雇用主の拠出能力のみをモデル化します。"],
      ["監視ツールではない", "集計された業務エビデンスを使用します。"],
      ["政策依存ではない", "任意参加の雇用主向けSaaSとして開始します。"]
    ],
    japanTitle: "日本が最初の市場として強い理由",
    japanBody:
      "高齢化、企業規模、年金圧力、責任あるAI導入が重なっています。プロダクトは測定を追加し、実行はパートナーが担います。",
    proofTitle: "投資家向け検証ロジック",
    proofPoints: [
      ["雇用主の証明", "測定された業務効果。"],
      ["従業員価値", "検証済み効果の一部。"],
      ["パートナー証明", "規制対象レールが実行。"],
      ["投資家証明", "資産保管リスクのないSaaS。"]
    ],
    languagePathTitle: "日本語版の進め方",
    languagePathBody:
      "まずUIを短くローカライズし、パイロット前に規制・実務用語を確認します。",
    languageSteps: [
      ["インターフェース", "ナビゲーション、ラベル、KPI。"],
      ["専門用語", "年金、人事、税務、プライバシー。"],
      ["パートナー適合", "指示ファイル / API形式。"],
      ["顧客テスト", "人事、CFO、コンプライアンスレビュー。"]
    ],
    resourcesTitle: "プロジェクトリソース",
    resourcesBody: "投資家・パイロット用ファイルの配信元",
    resourceGroups: [
      {
        title: "デモ用ブランド",
        body: "デックおよび共有用アセット。",
        links: ["公式横長ロゴ", "ソーシャルプレビュー"]
      },
      {
        title: "パイロットテンプレート",
        body: "集計デモデータ形式。",
        links: ["業務CSV", "前提条件JSON", "パートナー指示JSON"]
      },
      {
        title: "プロトタイプ法務メモ",
        body: "プロトタイプの境界。",
        links: ["プライバシー通知", "利用規約プレースホルダー"]
      }
    ],
    footer: [
      ["Pension from AI Productivity Dividend", "作成: Eyal Shahaf。プロトタイプSaaS MVP。"],
      ["現在の状態", "SQLite、アップロード、静的リソースを備えたNext.jsデモ。"],
      ["コンプライアンス境界", "助言ではありません。規制対象パートナーが年金レールを実行します。"]
    ]
  }
} as const;

export function AboutView({ language }: AboutViewProps) {
  const copy = aboutCopy[language];

  return (
    <div className="dashboard-grid">
      <section className="span-12 about-hero">
        <div>
          <div className="about-brand-lockup-frame">
            <img
              className="about-brand-lockup"
              src="/PPD_Horizontal_Primary_Teal.svg"
              alt="Pension Productivity Dividend"
            />
          </div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
          <div className="about-role-strip" aria-label={copy.role}>
            {copy.roleChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="span-12 panel">
        <h3>{copy.founderTitle}</h3>
        <div className="about-founder-copy">
          {copy.founderParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="span-12 panel about-two-column">
        <div>
          <h3>{copy.productTitle}</h3>
          <div className="principle-list">
            {copy.principles.map((item, index) => (
              <div className="principle-row" key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>{copy.boundariesTitle}</h3>
          <div className="boundary-list">
            {copy.productBoundaries.map(([title, body]) => (
              <div className="boundary-row" key={title}>
                <b>{title}</b>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="span-12 panel about-market-proof">
        <div className="about-market-copy">
          <h3>{copy.japanTitle}</h3>
          <p>{copy.japanBody}</p>
        </div>
        <div>
          <h3>{copy.proofTitle}</h3>
          <div className="proof-list">
            {copy.proofPoints.map(([title, body]) => (
              <div className="proof-row" key={title}>
                <b>{title}</b>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="span-12 panel">
        <h3>{copy.languagePathTitle}</h3>
        <p>{copy.languagePathBody}</p>
        <div className="localization-grid">
          {copy.languageSteps.map(([title, body]) => (
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
            <h3>{copy.resourcesTitle}</h3>
            <p>
              {copy.resourcesBody} <code>public/</code>.
            </p>
          </div>
        </div>
        <div className="resource-group-grid">
          {copy.resourceGroups.map((group, groupIndex) => (
            <article className="resource-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.body}</p>
              <div className="resource-actions">
                {group.links.map((label, linkIndex) => (
                  <a href={resourceHrefs[groupIndex][linkIndex]} key={resourceHrefs[groupIndex][linkIndex]}>
                    {label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="span-12 about-footer">
        {copy.footer.map(([title, body]) => (
          <div key={title}>
            <b>{title}</b>
            <p>{body}</p>
          </div>
        ))}
      </footer>
    </div>
  );
}
