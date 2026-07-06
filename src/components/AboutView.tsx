import type { Language } from "@/lib/i18n";

type AboutViewProps = {
  language: Language;
};

const aboutCopy = {
  en: {
    eyebrow: "About TOMO PENSION",
    title: "A measurement layer for shared long-term value.",
    body:
      "TOMO PENSION helps employers measure and verify productivity gains from AI, then prepares an agreed share for partner-operated retirement contribution routes.",
    role: "Role",
    roleChips: ["Measure", "Verify", "Partner-operated execution"],
    founderTitle: "Founder",
    founderParagraphs: [
      "Eyal Shahaf is the founder of TOMO PENSION and the creator of the Pension Productivity Dividend framework.",
      "He brings more than 20 years of international business-development experience across technology, renewable energy, and cross-border partnerships, alongside long-standing engagement with Japan.",
      "Japan is not simply a market for this project. It is a society I have engaged with for many years, and one that has shaped how I think about responsibility across generations, long-term security, and the importance of building for the future. That respect and concern are part of why Japan is TOMO PENSION’s first market.",
      "At TOMO PENSION, Eyal leads market development, pilot design, and partner engagement. The product provides a measurement and verification layer, while regulated partners retain responsibility for pension administration, custody, and execution."
    ],
    productTitle: "What the product does",
    principles: [
      "Measure verified AI productivity gains.",
      "Net out AI and implementation costs.",
      "Apply a transparent dividend rule.",
      "Generate regulated-partner instructions.",
      "Report evidence and impact."
    ],
    boundariesTitle: "Operating boundary",
    productBoundaries: [
      ["TOMO PENSION", "Measures, verifies, and reports eligible productivity gains."],
      ["Employers", "Provide aggregated workflow and financial evidence, and set allocation rules."],
      ["Regulated partners", "Operate retirement accounts, custody, and contribution execution."]
    ],
    japanTitle: "Why Japan is a strong first market",
    japanBody:
      "Aging demographics, enterprise scale, pension pressure, and responsible AI adoption. The product adds measurement; partners keep execution.",
    pilotTitle: "Current pilot focus",
    pilotBody:
      "The immediate objective is a measurement-only pilot with one operating employer, one assurance partner, and one regulated benefits or pension partner. TOMO PENSION prepares evidence and contribution instructions. Partners retain responsibility for execution.",
    footer: [
      ["TOMO PENSION", "Prepared by Eyal Shahaf using the Pension Productivity Dividend framework."],
      ["Current focus", "Measurement-only pilot design and partner engagement."],
      ["Compliance boundary", "Not advice. Regulated partners execute pension rails."]
    ]
  },
  ja: {
    eyebrow: "TOMO PENSIONについて",
    title: "検証された生産性を、長期的な安心へ。",
    body:
      "TOMO PENSIONは、AIによる生産性向上を測定・検証し、合意された一部をパートナー運営の退職給付・年金拠出ルートにつなぐための準備を行います。",
    role: "役割",
    roleChips: ["測定", "検証", "パートナー運営による実行"],
    founderTitle: "創業者",
    founderParagraphs: [
      "シャハフ・エヤールは、TOMO PENSIONの創業者であり、Pension Productivity Dividendの構想を考案した人物です。",
      "テクノロジー、再生可能エネルギー、国境を越えたパートナーシップの分野で20年以上にわたる国際事業開発の経験を持ち、日本との長年の関わりを深めてきました。",
      "私にとって日本は、このプロジェクトにおける単なる市場ではありません。長年にわたり関わってきた社会であり、世代を超えた責任、長期的な安心、そして未来に向けて仕組みを築くことの大切さを考える上で、大きな影響を受けてきました。その敬意と問題意識が、日本をTOMO PENSIONの最初の市場と考える理由の一つです。",
      "TOMO PENSIONでは、市場開拓、パイロット設計、パートナー連携を主導します。プロダクトの役割は測定と検証であり、年金管理、資産保管、執行は規制対象のパートナーが担います。"
    ],
    productTitle: "プロダクトの役割",
    principles: [
      "検証済みAI生産性効果を測定します。",
      "AIコストと導入コストを控除します。",
      "透明な配分ルールを適用します。",
      "規制対象パートナー向けの指示を生成します。",
      "エビデンスとインパクトを報告します。"
    ],
    boundariesTitle: "運用上の役割分担",
    productBoundaries: [
      ["TOMO PENSION", "対象となる生産性向上を測定・検証・報告します。"],
      ["雇用主", "集計された業務・財務エビデンスを提供し、配分ルールを設定します。"],
      ["規制対象パートナー", "退職給付口座、資産保管、拠出の実行を担います。"]
    ],
    japanTitle: "日本が最初の市場として強い理由",
    japanBody:
      "高齢化、企業規模、年金圧力、責任あるAI導入が重なっています。プロダクトは測定を追加し、実行はパートナーが担います。",
    pilotTitle: "現在のパイロット焦点",
    pilotBody:
      "直近の目標は、導入企業1社、第三者検証パートナー1社、規制対象の福利厚生・年金パートナー1社とともに、測定に限定したパイロットを設計することです。TOMO PENSIONはエビデンスと拠出指示の準備を担い、執行の責任はパートナーが担います。",
    footer: [
      ["TOMO PENSION", "Eyal ShahafがPension Productivity Dividendの枠組みを用いて作成。"],
      ["現在の焦点", "測定限定パイロットの設計とパートナー連携。"],
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
        <div className="about-market-copy">
          <h3>{copy.pilotTitle}</h3>
          <p>{copy.pilotBody}</p>
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
