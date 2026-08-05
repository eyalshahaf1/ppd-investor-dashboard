export type SiteLanguage = "en" | "ja";

type LandingSection = {
  title: string;
  body?: string;
  items?: Array<{ title: string; body: string }>;
};

export type HoldingPageContent = {
  logoAlt: string;
  languageLabel: string;
  comingSoonText: string;
  heroTitle: string;
  heroQuestion: string;
  heroDescription: string;
  primaryCTA: string;
  primaryCTALink: string;
  secondaryCTA: string;
  secondaryCTALink: string;
  statusLine: string;
  boundaryLine: string;
  imageAlt: string;
  japanFacts: Array<{ value: string; label: string }>;
  sections: {
    japan: LandingSection;
    simpleIdea: LandingSection;
    whyTomo: LandingSection;
    measure: LandingSection;
    firstStep: LandingSection;
    founder: LandingSection;
    boundaries: LandingSection;
    pilot: LandingSection;
  };
  footerText: string;
  founded: string;
};

// Edit this file for public website copy. The page component only owns layout and interaction.
export const holdingPageContent: Record<SiteLanguage, HoldingPageContent> = {
  en: {
    logoAlt: "Tomo Pension",
    languageLabel: "Language",
    comingSoonText: "COMING SOON",
    heroTitle: "Turning AI productivity into retirement security.",
    heroQuestion:
      "When technology creates meaningful value, can a small, responsibly governed share strengthen the future of the people who help create it?",
    heroDescription:
      "TOMO PENSION is exploring a practical way for employers to connect credible evidence of AI-enabled progress with long-term employee value.",
    primaryCTA: "Start a pilot conversation",
    primaryCTALink: "mailto:info@tomopension.com",
    secondaryCTA: "Learn how it works",
    secondaryCTALink: "#how-it-works",
    statusLine: "Concept and prototype under validation.",
    boundaryLine: "Evidence and decision support first. No pension assets or money movement.",
    imageAlt: "West Shinjuku business district skyline",
    japanFacts: [
      { value: "Fewer workers", label: "A changing working-age population" },
      { value: "Longer lives", label: "Growing pressure on retirement security" },
      { value: "Responsible AI", label: "A need to connect progress with trust" }
    ],
    sections: {
      japan: {
        title: "Japan is changing",
        body:
          "Japan is already living with the future many countries are only beginning to imagine: fewer workers, longer lives and growing pressure on retirement security. AI may help organizations sustain output and protect services, but productivity progress alone does not strengthen the future of employees."
      },
      simpleIdea: {
        title: "The simple idea",
        items: [
          { title: "AI can create meaningful operational value inside an organization.", body: "" },
          { title: "TOMO helps establish what the evidence can responsibly support.", body: "" },
          { title: "The employer decides whether a small, voluntary and capped share can become long-term employee value.", body: "" }
        ]
      },
      whyTomo: {
        title: "Why TOMO",
        items: [
          { title: "AI can create operational value", body: "AI may reduce friction, improve throughput, reduce avoidable cost and protect service quality." },
          { title: "The value is difficult to establish credibly", body: "Volume, pricing, seasonality, parallel process changes and management assumptions can distort the result." },
          { title: "Progress does not automatically strengthen employees' future", body: "A deliberate, evidence-supported and employer-controlled decision is required." }
        ]
      },
      measure: {
        title: "Measure. Verify. Share.",
        items: [
          { title: "Measure", body: "Define the workflow, baseline, outcomes, quality measures, AI-related costs, external factors and source ownership." },
          { title: "Verify", body: "Test completeness and consistency, record exclusions and quality gates, and establish a conservative evidence-supported AI value." },
          { title: "Share", body: "Finance may approve an allocation base from zero up to the supported value. The employer may then apply a voluntary rate and cap." }
        ]
      },
      firstStep: {
        title: "Start with a decision-ready evidence product.",
        items: [
          { title: "Evidence Sprint", body: "A paid readiness engagement covering workflow definition, data availability, calculation method, quality measures, privacy constraints and decision ownership." },
          { title: "Measurement Pilot", body: "A time-boxed process producing a traceable evidence report, evidence grade, limitations and a Finance decision record." }
        ]
      },
      founder: {
        title: "Founder perspective",
        body:
          "Japan has been part of my life for many years. What has stayed with me is not only its technology or economic strength, but its sense of responsibility, respect for work and concern for future generations. TOMO PENSION began with a simple question: when progress creates value, can part of that progress help strengthen the future of the people who make it possible?"
      },
      boundaries: {
        title: "Clear boundaries",
        items: [
          { title: "TOMO provides", body: "Evidence structure, method documentation, validation checks, evidence grading, Finance reconciliation and decision reporting." },
          { title: "TOMO does not provide", body: "Pension custody, funds transfer, investment advice, independent assurance by default, guaranteed AI attribution or guaranteed tax or regulatory treatment." }
        ]
      },
      pilot: {
        title: "One employer. One measurable AI-enabled workflow. One transparent Evidence Sprint.",
        body: "A pension deposit is not required to prove the first product."
      }
    },
    footerText: "Measured gains. Verified value. Shared future.",
    founded: "Founded by Eyal Shahaf"
  },
  ja: {
    logoAlt: "Tomo Pension",
    languageLabel: "言語",
    comingSoonText: "COMING SOON",
    heroTitle: "AIによる生産性を、老後の安心へ。",
    heroQuestion:
      "テクノロジーが意味のある価値を生み出すとき、その価値の一部を責任ある形で分かち合い、支える人々の未来を強くできるでしょうか。",
    heroDescription:
      "TOMO PENSIONは、AIによる進展の確かなエビデンスを、従業員の長期的な価値につなぐ実践的な方法を探っています。",
    primaryCTA: "パイロットについて相談する",
    primaryCTALink: "mailto:info@tomopension.com",
    secondaryCTA: "仕組みを見る",
    secondaryCTALink: "#how-it-works",
    statusLine: "コンセプトとプロトタイプを検証中です。",
    boundaryLine: "まずはエビデンスと意思決定の支援から。年金資産や資金移動は扱いません。",
    imageAlt: "西新宿のビジネス街",
    japanFacts: [
      { value: "働き手の減少", label: "変化する生産年齢人口" },
      { value: "長寿化", label: "老後の安心への高まる課題" },
      { value: "責任あるAI", label: "進展と信頼を結ぶ必要性" }
    ],
    sections: {
      japan: {
        title: "日本は変化の中にあります",
        body:
          "日本は、多くの国がこれから向き合う未来をすでに経験しています。働き手の減少、長寿化、そして老後の安心への高まる課題です。AIは生産やサービスを支える可能性がありますが、生産性の向上だけで従業員の未来が強くなるわけではありません。"
      },
      simpleIdea: {
        title: "シンプルな考え方",
        items: [
          { title: "AIは組織の中で意味のある業務上の価値を生み出す可能性があります。", body: "" },
          { title: "TOMOは、エビデンスが責任を持って支えられる範囲を整理します。", body: "" },
          { title: "雇用主が、自主的で上限のある一部を長期的な従業員価値にするかを決めます。", body: "" }
        ]
      },
      whyTomo: {
        title: "なぜTOMOなのか",
        items: [
          { title: "AIは業務上の価値を生み出す可能性があります", body: "AIは業務の摩擦を減らし、処理量を高め、避けられるコストを減らし、サービス品質を守る可能性があります。" },
          { title: "その価値を確かめることは簡単ではありません", body: "処理量、価格、季節性、同時に行われた変更、経営上の仮定が結果を歪める可能性があります。" },
          { title: "進展が自動的に従業員の未来を強くするわけではありません", body: "意図的で、エビデンスに支えられ、雇用主が管理する意思決定が必要です。" }
        ]
      },
      measure: {
        title: "測定・検証・分かち合い",
        items: [
          { title: "測定", body: "業務、基準値、成果、品質指標、AI関連コスト、外部要因、データの所有者を定義します。" },
          { title: "検証", body: "完全性と整合性を確認し、除外項目と品質ゲートを記録し、エビデンスが支える保守的な価値を整理します。" },
          { title: "分かち合い", body: "財務部門は、支えられた価値の範囲内で配分基礎額をゼロから承認できます。その後、雇用主が任意の率と上限を設定します。" }
        ]
      },
      firstStep: {
        title: "意思決定に使えるエビデンスから始めます。",
        items: [
          { title: "Evidence Sprint", body: "業務定義、データの可用性、計算方法、品質指標、プライバシー上の制約、意思決定者を確認する有償の準備支援です。" },
          { title: "測定パイロット", body: "追跡可能なエビデンスレポート、評価、限界、財務部門の意思決定記録を作成する期間限定のプロセスです。" }
        ]
      },
      founder: {
        title: "創業者の視点",
        body:
          "日本は、私にとって長年関わってきた場所です。技術や経済力だけでなく、責任感、仕事への敬意、そして次の世代への思いが心に残っています。TOMO PENSIONは、進展が価値を生み出すとき、その一部を価値を生み出す人々の未来を支えることに役立てられるか、という問いから始まりました。"
      },
      boundaries: {
        title: "明確な役割の境界",
        items: [
          { title: "TOMOが提供するもの", body: "エビデンスの構造化、方法の文書化、検証チェック、評価、財務部門との照合、意思決定レポートです。" },
          { title: "TOMOが提供しないもの", body: "年金資産の保管、資金移動、投資助言、原則としての独立保証、AIへの帰属の保証、税務・規制上の取扱いの保証です。" }
        ]
      },
      pilot: {
        title: "1社の雇用主。1つの測定可能なAI業務。1つの透明なEvidence Sprint。",
        body: "最初のプロダクトを確かめるために、年金拠出は必要ありません。"
      }
    },
    footerText: "Measured gains. Verified value. Shared future.",
    founded: "Founded by Eyal Shahaf"
  }
};
