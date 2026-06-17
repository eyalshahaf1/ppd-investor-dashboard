export type Language = "en" | "ja";

export const languages: Array<{ key: Language; label: string }> = [
  { key: "en", label: "English" },
  { key: "ja", label: "日本語" }
];

export const copy = {
  en: {
    topbar: {
      eyebrow: "Japan investor demo app",
      title: "Pension from AI Productivity",
      subtitle:
        "A SaaS MVP dashboard for the AI Pension Productivity Dividend concept. Prepared by Eyal Shahaf. The product wedge is measurement, allocation, and reporting while regulated partners handle pension execution.",
      baseCase: "Base case",
      y5Flow: "Y5 flow",
      backend: "Backend",
      offline: "Offline",
      reset: "Reset",
      save: "Save",
      snapshot: "Snapshot",
      switchTheme: "Switch theme"
    },
    tabs: {
      overview: "Overview",
      calculator: "Calculator",
      scenarios: "Scenarios",
      pilot: "Pilot Tasks",
      data: "Data Connect",
      about: "About",
      investor: "Investor Room"
    },
    overview: {
      thesisTitle: "Show investors the linking layer, not a new pension system.",
      thesisBody:
        "The clean venture story is a B2B fintech infrastructure product: quantify verified AI productivity gains, apply a rules-based dividend, generate contribution instructions, and report impact for CFO, HR, ESG, and policy stakeholders.",
      askTitle: "90-day proof-of-concept ask",
      asks: [
        "Two pilot employers with measurable workflows.",
        "One regulated pension, insurer, payroll, or trust-bank rail partner.",
        "One assurance partner to validate the method."
      ],
      dashboardTitle: "Investor opening dashboard",
      dashboardBody:
        "Lead with Japan's structural need, then immediately separate retirement value created from platform revenue earned.",
      population65: "Japan population 65+",
      births2024: "2024 births",
      defaultDividend: "Default dividend rule",
      y5RetirementFlow: "Medium Y5 retirement flow",
      dividendNote: "Editable. Source one-pager frames 1% to 5%.",
      y5Note: "Retirement contributions created, not startup revenue.",
      macroSource: "Source",
      refreshed: "Refreshed",
      operatingFlowTitle: "Operating flow",
      operatingFlowBody:
        "The demo should make regulatory restraint visible. The platform does not custody assets, recommend investments, or operate as the pension administrator.",
      flowSteps: [
        [
          "AI deployment inside employer",
          "Choose measurable workflows such as claims, invoices, HR admin, or call-center wrap-up time."
        ],
        [
          "Measurement and audit trail",
          "Calculate verified net efficiency value after AI costs, baseline checks, and confidence haircut."
        ],
        [
          "Dividend rule",
          "Allocate an editable share of eligible gains to retirement support while excluding layoff gains."
        ],
        [
          "Regulated rails",
          "Contribution instructions flow through existing DC, iDeCo, insurer, trust-bank, payroll, or benefits partners."
        ],
        [
          "Impact reporting",
          "Generate CFO, HR, employee, assurance, and policy reports under a consistent PPD methodology."
        ]
      ],
      valueSplitTitle: "Holistic value split",
      valueSplitBody:
        "Use this as a strategic frame, not the primary pilot pricing promise. The calculator keeps the source default at {amount} yen per employee.",
      employerRetained: "Employer retained",
      employeePension: "Employee pension",
      socialResilience: "Social resilience",
      futureLayer: "future layer",
      positioning:
        "Investor positioning: start with voluntary B2B pilots, then keep coalition and policy pathways as upside optionality.",
      chartTitle: "5-year SaaS revenue vs pension impact",
      contributionFlow: "Retirement contribution flow",
      aumTracked: "End-year AUM tracked",
      platformRevenue: "Platform revenue"
    },
    footer: {
      disclaimer:
        "Disclaimer: The data provided here is for educational purposes only. Renewable energy terminology may evolve over time."
    }
  },
  ja: {
    topbar: {
      eyebrow: "日本向け投資家デモアプリ",
      title: "AI生産性から年金原資へ",
      subtitle:
        "AI Pension Productivity Dividend構想を説明するSaaS MVPダッシュボードです。作成: Eyal Shahaf。年金実行は規制対象パートナーが担い、本アプリは測定、配分、レポーティングに集中します。",
      baseCase: "基本ケース",
      y5Flow: "5年目フロー",
      backend: "バックエンド",
      offline: "オフライン",
      reset: "リセット",
      save: "保存",
      snapshot: "スナップショット",
      switchTheme: "テーマ切替"
    },
    tabs: {
      overview: "概要",
      calculator: "計算",
      scenarios: "シナリオ",
      pilot: "パイロット",
      data: "データ接続",
      about: "概要説明",
      investor: "投資家向け"
    },
    overview: {
      thesisTitle: "新しい年金制度ではなく、接続・測定レイヤーを見せる。",
      thesisBody:
        "投資家向けの明確なストーリーはB2Bフィンテック基盤です。検証済みのAI生産性向上を測定し、ルールベースの配分率を適用し、拠出指示を生成し、CFO、人事、ESG、政策関係者にインパクトを報告します。",
      askTitle: "90日PoCで確認すること",
      asks: [
        "測定可能な業務を持つパイロット企業2社。",
        "年金、保険、給与、信託銀行などの規制対象パートナー1社。",
        "手法を検証する保証・監査パートナー1社。"
      ],
      dashboardTitle: "投資家向けオープニング指標",
      dashboardBody:
        "まず日本の構造的課題を示し、その後すぐに退職給付価値とプラットフォーム収益を分けて説明します。",
      population65: "日本の65歳以上人口",
      births2024: "2024年出生数",
      defaultDividend: "標準配分ルール",
      y5RetirementFlow: "中位ケース5年目退職フロー",
      dividendNote: "編集可能。一枚資料では1%から5%を想定。",
      y5Note: "創出される退職拠出額であり、スタートアップ収益ではありません。",
      macroSource: "出所",
      refreshed: "更新",
      operatingFlowTitle: "運用フロー",
      operatingFlowBody:
        "規制上の節度をデモで明確にします。本プラットフォームは資産を保管せず、投資推奨も行わず、年金管理者にもなりません。",
      flowSteps: [
        [
          "企業内AI導入",
          "保険請求、請求書処理、人事事務、コールセンター後処理など、測定可能な業務を選定します。"
        ],
        [
          "測定と監査証跡",
          "AIコスト、ベースライン確認、信頼度調整後の純効率価値を計算します。"
        ],
        [
          "配分ルール",
          "レイオフによる利益を除外し、適格な生産性向上の一部を退職支援に配分します。"
        ],
        [
          "規制対象レール",
          "拠出指示はDC、iDeCo、保険、信託銀行、給与、福利厚生パートナーを通じて実行します。"
        ],
        [
          "インパクト報告",
          "CFO、人事、従業員、保証パートナー、政策関係者向けに一貫したPPD手法で報告します。"
        ]
      ],
      valueSplitTitle: "価値配分の全体像",
      valueSplitBody:
        "これは戦略的な説明フレームであり、初期パイロット価格の約束ではありません。計算機は従業員1人あたり{amount}円の初期値を維持します。",
      employerRetained: "企業に残る価値",
      employeePension: "従業員年金",
      socialResilience: "社会的レジリエンス",
      futureLayer: "将来レイヤー",
      positioning:
        "投資家向け位置づけ: まず任意のB2Bパイロットから始め、政策・連携の道筋はアップサイドとして残します。",
      chartTitle: "5年間のSaaS収益と年金インパクト",
      contributionFlow: "退職拠出フロー",
      aumTracked: "年末AUMトラッキング",
      platformRevenue: "プラットフォーム収益"
    },
    footer: {
      disclaimer:
        "免責事項: ここで提供されるデータは教育目的のみです。再生可能エネルギーに関する用語は時間とともに変化する可能性があります。"
    }
  }
} as const;

export function getCopy(language: Language) {
  return copy[language];
}
