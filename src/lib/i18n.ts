export type Language = "en" | "ja";

export const languages: Array<{ key: Language; label: string }> = [
  { key: "en", label: "English" },
  { key: "ja", label: "日本語" }
];

export const copy = {
  en: {
    topbar: {
      eyebrow: "Japan Pilot Feasibility Concept",
      title: "Pension from AI Productivity",
      subtitle:
        "Measure verified AI gains. Allocate a small pre-agreed share. Generate validated contribution instructions for partner-operated rails.",
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
      calculator: "Verified Ledger",
      scenarios: "Investor Scenario",
      pilot: "Pilot Evidence",
      data: "Partner Execution",
      about: "About",
      investor: "Investor Room"
    },
    overview: {
      thesisTitle: "AI productivity dividend layer for Japan.",
      thesisBody:
        "Measurement is the product. Pension value is the outcome. Existing partner-operated rails execute approved contribution routes.",
      askTitle: "90-day measurement-only pilot",
      asks: [
        "1 operating employer",
        "1 benefits / pension rail partner",
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
        "PPD measures, validates, reports, and prepares instructions. Regulated partners custody assets and execute approved routes.",
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
          "Partner-operated benefits or pension rails execute."
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
      chartTitle: "Impact horizon: value now and at scale",
      contributionFlow: "Retirement contribution flow",
      aumTracked: "End-year AUM tracked",
      platformRevenue: "Platform revenue",
      enterprise: {
        mode: "Enterprise pilot demo",
        title: "Measurement workflow for a corporate customer",
        body:
          "A customer can test the full flow with safe sample files: evidence upload, verified gain ledger, approval gate, and partner instruction export.",
        allocationLabel: "Current verified allocation",
        allocationNote: "Instruction value only. No custody by PPD.",
        steps: [
          {
            status: "Pilot input",
            title: "1. Upload evidence",
            body: "Workflow, finance, HR aggregate, and assurance files enter the pilot workspace."
          },
          {
            status: "CFO source",
            title: "2. Verify ledger",
            body: "Map evidence to the ledger categories below before any pension allocation."
          },
          {
            status: "Control gate",
            title: "3. Review approval",
            body: "CFO, HR, compliance, assurance, and partner readiness are checked."
          },
          {
            status: "Partner rail",
            title: "4. Export instruction",
            body: "Generate a dry-run instruction for regulated partner rails. PPD does not custody funds."
          }
        ],
        ledgerKeyTitle: "Ledger key",
        ledgerKeyItems: [
          "O = avoided overtime",
          "S = reduced outsourcing",
          "Q = quality / rework savings",
          "M = incremental margin",
          "A = AI-related costs to subtract"
        ],
        ledgerKeyNote:
          "Only documented financial outcomes enter the ledger. Hours saved alone are evidence, not eligible gain.",
        demoFilesTitle: "Demo scenario files",
        demoFilesBody:
          "Use these files in Partner Execution / Secure pilot upload to test conservative, medium, and strong pilot evidence.",
        demoFiles: [
          "Conservative pilot CSV",
          "Medium pilot CSV",
          "Strong pilot CSV",
          "Partner instruction JSON"
        ]
      }
    },
    scenario: {
      title: "Adoption scenarios and five-year projection",
      body:
        "Low / Medium / High are illustrative adoption scenarios for investor storytelling, not verified pilot results. Verified Calculation Mode is the source of truth for CFO-reviewed process economics.",
      savedWorkspaceTitle: "Saved scenario workspace",
      savedWorkspaceNote: "Local browser storage for investor demo prep",
      saveCurrent: "Save current scenario",
      emptySaved:
        "Save an assumption set before an investor meeting, then switch back to it during Q&A.",
      apply: "Apply",
      delete: "Delete"
    },
    dataConnection: {
      templateLinks: [
        "Conservative pilot CSV",
        "Medium pilot CSV",
        "Strong pilot CSV",
        "Secure pilot Excel sample",
        "Verified gain Excel calculator",
        "Workflow CSV template",
        "Assumptions JSON",
        "Partner instruction JSON"
      ]
    },
    footer: {
      disclaimer:
        "Demo version for discussion purposes only. Calculations are based on simplified assumptions and do not represent financial, legal, tax, actuarial, investment, or pension advice."
    }
  },
  ja: {
    topbar: {
      eyebrow: "日本向け実証可能性コンセプト",
      title: "Pension from AI Productivity",
      subtitle:
        "検証済みAI効果を測定し、事前合意された小さな割合を配分し、パートナー運営レール向けの検証済み拠出指示を生成します。",
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
      calculator: "検証台帳",
      scenarios: "投資家シナリオ",
      pilot: "実証エビデンス",
      data: "パートナー実行",
      about: "概要説明",
      investor: "投資家向け"
    },
    overview: {
      thesisTitle: "日本向けAI生産性配当レイヤー。",
      thesisBody:
        "測定がプロダクトであり、年金価値が成果です。既存のパートナー運営レールが承認済み拠出ルートを実行します。",
      askTitle: "90日間の測定限定パイロット",
      asks: [
        "実証参加企業 1社",
        "福利厚生・年金レールパートナー 1社",
        "保証・検証パートナー 1社"
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
        "PPDは測定、検証、報告、拠出指示の作成を行います。資産保管と実行は規制対象パートナーが担います。",
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
          "パートナー運営の福利厚生・年金レールが実行。"
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
      chartTitle: "インパクト期間: 現在と拡大時の価値",
      contributionFlow: "退職拠出フロー",
      aumTracked: "年末AUMトラッキング",
      platformRevenue: "プラットフォーム収益",
      enterprise: {
        mode: "企業向けパイロットデモ",
        title: "企業顧客向けの測定ワークフロー",
        body:
          "顧客は安全なサンプルファイルで、エビデンスアップロード、検証台帳、承認ゲート、パートナー向け指示書出力までを確認できます。",
        allocationLabel: "現在の検証済み配分額",
        allocationNote: "指示額のみ。PPDは資産を保管しません。",
        steps: [
          {
            status: "パイロット入力",
            title: "1. エビデンス登録",
            body: "業務、財務、人事集計、保証資料をパイロット作業領域に入れます。"
          },
          {
            status: "CFO基準",
            title: "2. 台帳検証",
            body: "年金配分の前に、エビデンスを下の台帳カテゴリに照合します。"
          },
          {
            status: "管理ゲート",
            title: "3. 承認レビュー",
            body: "CFO、人事、コンプライアンス、保証、パートナー準備状況を確認します。"
          },
          {
            status: "パートナーレール",
            title: "4. 指示書出力",
            body: "規制対象パートナー向けのドライラン指示を生成します。PPDは資金を保管しません。"
          }
        ],
        ledgerKeyTitle: "台帳キー",
        ledgerKeyItems: [
          "O = 回避された残業費",
          "S = 外部委託費の削減",
          "Q = 品質・手戻り削減",
          "M = 追加限界利益",
          "A = 控除するAI関連コスト"
        ],
        ledgerKeyNote:
          "台帳に入るのは文書化された財務成果のみです。時間削減だけでは適格利益になりません。",
        demoFilesTitle: "デモ用シナリオファイル",
        demoFilesBody:
          "Partner Execution / Secure pilot uploadで、保守的・中位・強めのパイロットエビデンスをテストできます。",
        demoFiles: [
          "保守的パイロットCSV",
          "中位パイロットCSV",
          "強めパイロットCSV",
          "パートナー指示JSON"
        ]
      }
    },
    scenario: {
      title: "導入シナリオと5年予測",
      body:
        "Low / Medium / Highは投資家向け説明用の例示導入シナリオであり、検証済みパイロット結果ではありません。Verified Calculation ModeがCFOレビュー済みプロセス経済性の基準です。",
      savedWorkspaceTitle: "保存済みシナリオ作業領域",
      savedWorkspaceNote: "投資家デモ準備用のローカルブラウザ保存",
      saveCurrent: "現在のシナリオを保存",
      emptySaved:
        "投資家ミーティング前に前提セットを保存し、Q&A中に戻せるようにします。",
      apply: "適用",
      delete: "削除"
    },
    dataConnection: {
      templateLinks: [
        "保守的パイロットCSV",
        "中位パイロットCSV",
        "強めパイロットCSV",
        "安全なパイロットExcelサンプル",
        "検証済みAI効果Excel計算サンプル",
        "業務CSVテンプレート",
        "前提条件JSON",
        "パートナー指示JSON"
      ]
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
