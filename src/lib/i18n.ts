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
        "Measurement, dividend calculation, and partner-ready pension instructions. Prepared by Eyal Shahaf.",
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
      thesisTitle: "AI productivity dividend layer for Japan.",
      thesisBody:
        "Measure gains. Apply a transparent rule. Send instructions to regulated partners.",
      askTitle: "90-day proof ask",
      asks: [
        "2 pilot employers",
        "1 regulated rail partner",
        "1 assurance partner"
      ],
      dashboardTitle: "Investor opening dashboard",
      dashboardBody:
        "Macro context, pension impact, and SaaS revenue in one view.",
      macroContextTitle: "Japan macro context",
      modelOutputTitle: "PPD model output",
      population65: "Japan population 65+",
      births2024: "2024 births",
      workingAgeShare: "Working-age share",
      defaultDividend: "Default dividend rule",
      y5RetirementFlow: "Illustrative Y5 contribution flow",
      dividendNote: "Editable. Source one-pager frames 1% to 5%.",
      y5Note: "Medium scenario. Retirement value created, not platform revenue.",
      macroSource: "Source",
      cachedOfficialSource: "Cached official source",
      officialEstimateNote: "Latest official estimate. Source: Statistics Bureau of Japan.",
      officialAnnualNote: "Latest official annual data. Source: MHLW / e-Stat.",
      modelOutputNote: "Illustrative medium scenario model output.",
      refreshed: "Refreshed",
      operatingFlowTitle: "Operating flow",
      operatingFlowBody:
        "Where the SaaS stops and regulated partners execute.",
      flowSteps: [
        [
          "AI workflow",
          "Measured business process."
        ],
        [
          "Verified gain",
          "Net AI costs and baseline checks."
        ],
        [
          "Dividend rule",
          "Share of eligible gain."
        ],
        [
          "Regulated rails",
          "Existing pension partners execute."
        ],
        [
          "Impact reporting",
          "CFO, HR, employee, assurance."
        ]
      ],
      valueSplitTitle: "Holistic value split",
      valueSplitBody:
        "Strategic frame. Calculator default: {amount} yen per employee.",
      employerRetained: "Employer retained",
      employeePension: "Employee pension",
      socialResilience: "Social resilience",
      futureLayer: "future layer",
      positioning:
        "Investor positioning: start with voluntary B2B pilots.",
      chartTitle: "5-year SaaS revenue vs pension impact",
      contributionFlow: "Retirement contribution flow",
      aumTracked: "End-year AUM tracked",
      platformRevenue: "Platform revenue"
    },
    footer: {
      disclaimer:
        "Demo version for discussion purposes only. Calculations are based on simplified assumptions and do not represent financial, legal, tax, actuarial, investment, or pension advice."
    }
  },
  ja: {
    topbar: {
      eyebrow: "日本向け投資家デモアプリ",
      title: "AI生産性から年金原資へ",
      subtitle:
        "測定、配分計算、パートナー向け年金指示。作成: Eyal Shahaf。",
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
      thesisTitle: "日本向けAI生産性配当レイヤー。",
      thesisBody:
        "生産性向上を測定し、透明なルールを適用し、規制対象パートナーへ指示します。",
      askTitle: "90日PoCの要点",
      asks: [
        "パイロット企業2社",
        "規制対象パートナー1社",
        "保証パートナー1社"
      ],
      dashboardTitle: "投資家向けオープニング指標",
      dashboardBody:
        "マクロ背景、年金インパクト、SaaS収益を一画面で表示。",
      macroContextTitle: "日本のマクロ背景",
      modelOutputTitle: "PPDモデル出力",
      population65: "日本の65歳以上人口",
      births2024: "2024年出生数",
      workingAgeShare: "生産年齢人口比率",
      defaultDividend: "標準配分ルール",
      y5RetirementFlow: "5年目拠出フロー（例示）",
      dividendNote: "編集可能。一枚資料では1%から5%を想定。",
      y5Note: "中位シナリオ。創出される退職価値であり、プラットフォーム収益ではありません。",
      macroSource: "出所",
      cachedOfficialSource: "公式データのキャッシュ",
      officialEstimateNote: "最新の公式推計。出所: 日本の統計局。",
      officialAnnualNote: "最新の公式年次データ。出所: 厚生労働省 / e-Stat。",
      modelOutputNote: "中位シナリオの例示モデル出力。",
      refreshed: "更新",
      operatingFlowTitle: "運用フロー",
      operatingFlowBody:
        "SaaSの役割とパートナー実行を分離。",
      flowSteps: [
        [
          "AI業務",
          "測定可能な業務プロセス。"
        ],
        [
          "検証済み効果",
          "AIコストと基準値を確認。"
        ],
        [
          "配分ルール",
          "適格利益の一部。"
        ],
        [
          "規制対象レール",
          "既存パートナーが実行。"
        ],
        [
          "インパクト報告",
          "CFO、人事、従業員、保証。"
        ]
      ],
      valueSplitTitle: "価値配分の全体像",
      valueSplitBody:
        "戦略フレーム。計算初期値: 従業員1人あたり{amount}円。",
      employerRetained: "企業に残る価値",
      employeePension: "従業員年金",
      socialResilience: "社会的レジリエンス",
      futureLayer: "将来レイヤー",
      positioning:
        "投資家向け位置づけ: 任意のB2Bパイロットから開始。",
      chartTitle: "5年間のSaaS収益と年金インパクト",
      contributionFlow: "退職拠出フロー",
      aumTracked: "年末AUMトラッキング",
      platformRevenue: "プラットフォーム収益"
    },
    footer: {
      disclaimer:
        "本ダッシュボードは議論用のデモ版です。計算は簡略化された前提に基づくものであり、金融、法律、税務、年金数理、投資、または年金制度に関する助言ではありません。"
    }
  }
} as const;

export function getCopy(language: Language) {
  return copy[language];
}
