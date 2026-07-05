export type Language = "en" | "ja";

export const languages: Array<{ key: Language; label: string }> = [
  { key: "en", label: "English" },
  { key: "ja", label: "日本語" }
];

export const copy = {
  en: {
    topbar: {
      eyebrow: "Japan Pilot Feasibility Concept",
      title: "TOMO PENSION",
      tagline: "",
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
      thesisTitle: "TOMO PENSION for Japan.",
      thesisBody:
        "Measurement is the product. Pension value is the outcome. The Pension Productivity Dividend framework turns verified productivity gains into partner-ready contribution instructions.",
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
      modelOutputTitle: "Pension Productivity Dividend model output",
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
      tomoConceptHeading: "Measured gains. Verified value. Shared future.",
      tomoConceptItems: [
        ["Measure / 測定", "Evidence from workflow change."],
        ["Verify / 検証", "Reconciled eligible value."],
        ["Share / 分かち合い", "Small agreed allocation."],
        ["Future / 未来", "Long-term employee security."]
      ],
      refreshed: "Refreshed",
      operatingFlowTitle: "Operating flow",
      operatingFlowBody:
        "TOMO PENSION measures, validates, reports, and prepares instructions. Regulated partners custody assets and execute approved routes.",
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
      impactHorizons: ["Immediate", "Daily", "Monthly", "Annual", "Multi-year"],
      horizonSummaries: {
        immediate: "Immediate view shows contribution and platform run-rate by covered employee scale.",
        daily: "Daily view shows cumulative first-month run-rate from the medium Year 1 adoption case.",
        monthly: "Monthly view shows how the medium Year 1 case becomes visible inside the first year.",
        annual: "Annual view shows quarterly build-up inside Year 1.",
        multiYear: "Multi-year view shows cumulative five-year contribution and platform scale.",
        lastPoint: "Last point",
        retirementValue: "retirement value",
        platformRevenue: "platform revenue"
      },
      readinessTitle: "SaaS readiness path",
      readinessItems: [
        ["Workspace accounts", "Next", "Employer, assurance, and partner roles."],
        ["Cloud database", "Next", "Managed Postgres for multi-customer pilots."],
        ["Security controls", "Next", "Audit trail, role-based access, and upload retention rules."],
        ["Signup flow", "Later", "Invite-only pilot onboarding before public signup."]
      ],
      enterprise: {
        mode: "Enterprise pilot demo",
        title: "Measurement workflow for a corporate customer",
        body:
          "A customer can test the full flow with safe sample files: evidence upload, verified gain ledger, approval gate, and partner instruction export.",
        allocationLabel: "Current verified allocation",
        allocationNote: "Instruction value only. No custody by TOMO PENSION.",
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
            body: "Generate a dry-run instruction for regulated partner rails. TOMO PENSION does not custody funds."
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
      scenarioLabels: {
        low: "Low",
        medium: "Medium",
        high: "High"
      },
      savedWorkspaceTitle: "Saved scenario workspace",
      savedWorkspaceNote: "Local browser storage for investor demo prep",
      saveCurrent: "Save current scenario",
      emptySaved:
        "Save an assumption set before an investor meeting, then switch back to it during Q&A.",
      apply: "Apply",
      delete: "Delete",
      savedScenarioMeta: {
        employeesPerEmployer: "employees per employer",
        employers: "employer(s)",
        rule: "rule"
      },
      comparisonTitle: "Scenario comparison cockpit",
      comparisonBody:
        "Illustrative adoption scenarios only. They are useful for investor scale discussion but are not verified pilot results.",
      y5ContributionFlow: "Y5 contribution flow",
      y5AumInfluenced: "Y5 AUM influenced",
      y5PlatformRevenue: "Y5 platform revenue",
      projectionSuffix: "projection",
      annualContributions: "Annual contributions",
      endYearAumTracked: "End-year AUM tracked",
      platformRevenue: "Platform revenue",
      snapshotTitle: "Scenario snapshot",
      snapshotKpis: [
        ["Y5 covered employees", "Scale assumption at year five."],
        ["Y5 annual contributions", "Retirement value created in year five."],
        ["Y5 platform revenue", "Startup revenue earned from the platform model."]
      ],
      investorSafeTitle: "Investor-safe phrasing",
      investorSafeBody:
        "AUM tracked means assets verified through the program. The startup should not imply that it legally manages pension assets.",
      tableTitle: "Projection table",
      tableHeaders: ["Year", "Employees", "Annual contribution", "End-year AUM tracked", "Platform revenue", "New employers"],
      metricLabels: {
        employees: "Employees",
        aum: "AUM",
        revenue: "Revenue"
      }
    },
    dataConnection: {
      title: "Customer data connection",
      body: "Evidence in. Dividend calculation. Partner instructions out.",
      connectionModelTitle: "Connection model",
      connectionSteps: [
        ["Customer export", "Workflow and cost data."],
        ["TOMO PENSION verification", "Net AI cost and apply controls."],
        ["Partner instruction", "Contribution instructions only."]
      ],
      privacyTitle: "Privacy guardrails",
      guardrails: [
        "Use aggregated workflow, team, or department-level data wherever possible.",
        "Do not upload national IDs, bank details, pension account numbers, salaries, or secrets.",
        "Do not count involuntary-layoff savings as eligible productivity dividend gains.",
        "Keep customer exports in ignored local storage during the demo and pilot."
      ],
      uploadTypes: [
        ["Workflow metrics", "Throughput, cycle time, volume, error, and rework metrics by workflow."],
        ["Aggregated HR", "Covered employee counts by eligible group, department, or period."],
        ["Finance costs", "AI costs, overtime savings, outsourcing savings, and implementation costs."],
        ["Partner instruction test", "Dry-run contribution instruction payloads for regulated partners."],
        ["Assurance evidence", "Evidence extracts for baseline validation and audit review."]
      ],
      messages: {
        ready: "Ready for aggregated pilot data.",
        unavailable: "Upload registry unavailable.",
        chooseFile: "Choose a CSV, TXT, or XLSX pilot export first.",
        uploading: "Uploading local pilot file...",
        stored: "Stored locally for review.",
        failed: "Upload failed.",
        excelSelected: "Excel sample selected. It will be stored for review; CSV preview is not available yet.",
        usable: "Pilot file looks usable for mapping.",
        needsReview: "Pilot file needs mapping review.",
        previewFailed: "Could not preview this file."
      },
      uploadTitle: "Secure pilot upload",
      uploadBody: "Local CSV/TXT evidence under",
      datasetType: "Dataset type",
      fileLabel: "CSV, TXT, or XLSX file",
      uploadButton: "Upload pilot data",
      uploadingButton: "Uploading",
      connectorTitle: "SaaS connector roadmap",
      connectorLanes: [
        ["Pilot", "Secure CSV upload", "Fastest path for a 90-day proof of concept."],
        ["Scale", "SFTP import/export", "Standard enterprise transfer for larger employers."],
        ["Enterprise", "HRIS, payroll, ERP APIs", "Automated data sync after security and legal review."],
        ["Execution", "Regulated partner API", "Contribution instructions only; partners execute the rails."]
      ],
      recentUploadsTitle: "Recent local uploads",
      tableHeaders: ["Dataset", "File", "Status", "Size", "Created"],
      noUploads: "No uploads yet. The first pilot file will appear here after it is stored locally.",
      mappingTitle: "Upload mapping preview",
      mappingEmpty: "Choose a pilot CSV to preview headers, mapped fields, and evidence red flags before storage.",
      rowsDetected: "rows detected.",
      readiness: "Readiness",
      notMapped: "Not mapped",
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
    securityBoundary: {
      eyebrow: "Enterprise readiness",
      title: "Security and data boundary",
      status: "Demo-safe posture",
      body:
        "The current dashboard is designed for investor demos and 90-day pilots with aggregated evidence only. Live employee, salary, pension account, bank, national ID, and secret data should stay outside the prototype.",
      cards: [
        [
          "Cookies",
          "Essential first",
          "Only local preferences are stored by default. Analytics should remain off unless a user explicitly accepts it."
        ],
        [
          "Secrets",
          "Environment variables",
          "API keys, database URLs, OAuth secrets, and connector credentials belong in Vercel environment variables, never in Git."
        ],
        [
          "Customer data",
          "Aggregated evidence",
          "Use workflow, team, department, or cost-center data for pilots. Avoid personal employee-level exports."
        ],
        [
          "Future SaaS",
          "Controlled access",
          "Production use requires SSO, roles, tenant isolation, audit logs, retention rules, and legal/security review."
        ]
      ],
      noteTitle: "Boundary",
      noteBody:
        "TOMO PENSION prepares verified contribution instructions. Regulated partners execute funds, custody, and pension account operations."
    },
    cookieConsent: {
      title: "Cookie preferences",
      body:
        "This prototype uses essential local storage for language, theme, accessibility, and demo preferences. Optional analytics should be enabled only with consent.",
      essential: "Essential only",
      analytics: "Allow analytics"
    },
    footer: {
      disclaimer:
        "Demo version for discussion purposes only. Calculations are based on simplified assumptions and do not represent financial, legal, tax, actuarial, investment, or pension advice."
    }
  },
  ja: {
    topbar: {
      eyebrow: "日本向け実証可能性コンセプト",
      title: "TOMO PENSION",
      tagline: "共に未来をつくる",
      subtitle:
        "検証済みAI効果を測定し、事前合意された小さな割合を配分し、パートナー運営レール向けの検証済み拠出指示を生成します。",
      baseCase: "基本ケース",
      y5Flow: "5年目フロー",
      backend: "バックエンド",
      offline: "オフライン",
      reset: "リセット",
      save: "保存",
      snapshot: "印刷",
      switchTheme: "テーマ切替"
    },
    tabs: {
      overview: "概要",
      calculator: "検証台帳",
      scenarios: "投資家シナリオ",
      pilot: "実証エビデンス",
      data: "パートナー実行",
      about: "共に未来をつくる TOMO PENSION",
      investor: "投資家向け"
    },
    overview: {
      thesisTitle: "日本向けTOMO PENSION。",
      thesisBody:
        "測定がプロダクトであり、年金価値が成果です。Pension Productivity Dividendの枠組みにより、検証済み生産性効果をパートナー向け拠出指示へ変換します。",
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
      modelOutputTitle: "Pension Productivity Dividendモデル出力",
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
      tomoConceptHeading: "Measured gains. Verified value. Shared future.",
      tomoConceptItems: [
        ["Measure / 測定", "業務変化からのエビデンス。"],
        ["Verify / 検証", "照合済みの適格価値。"],
        ["Share / 分かち合い", "事前合意された小さな配分。"],
        ["Future / 未来", "従業員の長期的安心。"]
      ],
      refreshed: "更新",
      operatingFlowTitle: "運用フロー",
      operatingFlowBody:
        "TOMO PENSIONは測定、検証、報告、拠出指示の作成を行います。資産保管と実行は規制対象パートナーが担います。",
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
      impactHorizons: ["即時", "日次", "月次", "年次", "複数年"],
      horizonSummaries: {
        immediate: "即時ビューは、対象従業員規模ごとの拠出額とプラットフォーム収益ランレートを示します。",
        daily: "日次ビューは、中位シナリオYear 1の初月累計ランレートを示します。",
        monthly: "月次ビューは、中位シナリオYear 1が初年度内にどう可視化されるかを示します。",
        annual: "年次ビューは、Year 1内の四半期ごとの積み上がりを示します。",
        multiYear: "複数年ビューは、5年間の累計拠出額とプラットフォーム規模を示します。",
        lastPoint: "最終点",
        retirementValue: "退職価値",
        platformRevenue: "プラットフォーム収益"
      },
      readinessTitle: "SaaS準備ロードマップ",
      readinessItems: [
        ["ワークスペースアカウント", "次", "雇用主、保証、パートナーの役割。"],
        ["クラウドデータベース", "次", "複数顧客パイロット向けのManaged Postgres。"],
        ["セキュリティ管理", "次", "監査証跡、ロールベースアクセス、アップロード保持ルール。"],
        ["サインアップ導線", "後続", "公開登録前の招待制パイロットオンボーディング。"]
      ],
      enterprise: {
        mode: "企業向けパイロットデモ",
        title: "企業顧客向けの測定ワークフロー",
        body:
          "顧客は安全なサンプルファイルで、エビデンスアップロード、検証台帳、承認ゲート、パートナー向け指示書出力までを確認できます。",
        allocationLabel: "現在の検証済み配分額",
        allocationNote: "指示額のみ。TOMO PENSIONは資産を保管しません。",
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
            body: "規制対象パートナー向けのドライラン指示を生成します。TOMO PENSIONは資金を保管しません。"
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
      scenarioLabels: {
        low: "低位",
        medium: "中位",
        high: "高位"
      },
      savedWorkspaceTitle: "保存済みシナリオ作業領域",
      savedWorkspaceNote: "投資家デモ準備用のローカルブラウザ保存",
      saveCurrent: "現在のシナリオを保存",
      emptySaved:
        "投資家ミーティング前に前提セットを保存し、Q&A中に戻せるようにします。",
      apply: "適用",
      delete: "削除",
      savedScenarioMeta: {
        employeesPerEmployer: "従業員 / 企業",
        employers: "企業",
        rule: "ルール"
      },
      comparisonTitle: "シナリオ比較コックピット",
      comparisonBody:
        "例示導入シナリオのみです。投資家向けの拡大議論には有用ですが、検証済みパイロット結果ではありません。",
      y5ContributionFlow: "5年目拠出フロー",
      y5AumInfluenced: "5年目AUM影響額",
      y5PlatformRevenue: "5年目プラットフォーム収益",
      projectionSuffix: "予測",
      annualContributions: "年間拠出",
      endYearAumTracked: "年末AUMトラッキング",
      platformRevenue: "プラットフォーム収益",
      snapshotTitle: "シナリオ概要",
      snapshotKpis: [
        ["5年目対象従業員数", "5年目の規模前提。"],
        ["5年目年間拠出額", "5年目に創出される退職価値。"],
        ["5年目プラットフォーム収益", "プラットフォームモデルから得るスタートアップ収益。"]
      ],
      investorSafeTitle: "投資家向けの安全な表現",
      investorSafeBody:
        "AUM trackedは、このプログラムを通じて確認された資産を意味します。スタートアップが法的に年金資産を運用しているとは示唆しません。",
      tableTitle: "予測テーブル",
      tableHeaders: ["年", "従業員数", "年間拠出", "年末AUMトラッキング", "プラットフォーム収益", "新規雇用主"],
      metricLabels: {
        employees: "従業員数",
        aum: "AUM",
        revenue: "収益"
      }
    },
    dataConnection: {
      title: "顧客データ接続",
      body: "エビデンス入力、配当計算、パートナー指示出力。",
      connectionModelTitle: "接続モデル",
      connectionSteps: [
        ["顧客エクスポート", "業務データとコストデータ。"],
        ["TOMO PENSION検証", "AI純コストと管理条件を確認。"],
        ["パートナー指示", "拠出指示のみ。"]
      ],
      privacyTitle: "プライバシー管理",
      guardrails: [
        "可能な限り、業務・チーム・部門レベルの集計データを使用します。",
        "国民ID、銀行情報、年金口座番号、給与、秘密情報はアップロードしません。",
        "非自発的な人員削減による節減は、生産性配当の適格利益に含めません。",
        "顧客エクスポートはデモ・パイロット中、除外されたローカル保存に保持します。"
      ],
      uploadTypes: [
        ["業務指標", "ワークフロー別の処理量、サイクル時間、件数、エラー、手戻り指標。"],
        ["集計HR", "対象グループ、部門、期間別の対象従業員数。"],
        ["財務コスト", "AIコスト、残業削減、外部委託削減、導入コスト。"],
        ["パートナー指示テスト", "規制対象パートナー向けのドライラン拠出指示ペイロード。"],
        ["保証エビデンス", "基準値検証と監査レビュー用のエビデンス抽出。"]
      ],
      messages: {
        ready: "集計パイロットデータの準備ができています。",
        unavailable: "アップロード台帳を利用できません。",
        chooseFile: "CSV、TXT、またはXLSXのパイロット出力を選択してください。",
        uploading: "ローカルパイロットファイルをアップロード中...",
        stored: "レビュー用にローカル保存しました。",
        failed: "アップロードに失敗しました。",
        excelSelected: "Excelサンプルが選択されました。レビュー用に保存されますが、CSVプレビューはまだ利用できません。",
        usable: "パイロットファイルはマッピングに使用できそうです。",
        needsReview: "パイロットファイルはマッピングレビューが必要です。",
        previewFailed: "このファイルをプレビューできませんでした。"
      },
      uploadTitle: "安全なパイロットアップロード",
      uploadBody: "ローカルCSV/TXTエビデンス保存先",
      datasetType: "データセット種別",
      fileLabel: "CSV、TXT、またはXLSXファイル",
      uploadButton: "パイロットデータをアップロード",
      uploadingButton: "アップロード中",
      connectorTitle: "SaaS接続ロードマップ",
      connectorLanes: [
        ["Pilot", "安全なCSVアップロード", "90日間PoCの最短ルート。"],
        ["Scale", "SFTPインポート/エクスポート", "大規模雇用主向けの標準的な企業転送。"],
        ["Enterprise", "HRIS、給与、ERP API", "セキュリティ・法務レビュー後の自動データ同期。"],
        ["Execution", "規制対象パートナーAPI", "拠出指示のみ。実行はパートナーが担います。"]
      ],
      recentUploadsTitle: "最近のローカルアップロード",
      tableHeaders: ["データセット", "ファイル", "ステータス", "サイズ", "作成日時"],
      noUploads: "アップロードはまだありません。最初のパイロットファイルはローカル保存後にここへ表示されます。",
      mappingTitle: "アップロードマッピングプレビュー",
      mappingEmpty: "保存前にヘッダー、マッピング項目、エビデンス上の注意点を確認するには、パイロットCSVを選択してください。",
      rowsDetected: "行を検出しました。",
      readiness: "準備度",
      notMapped: "未マッピング",
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
    securityBoundary: {
      eyebrow: "エンタープライズ準備",
      title: "セキュリティとデータ境界",
      status: "デモ向け安全設計",
      body:
        "現在のダッシュボードは、投資家デモと90日間パイロット向けに、集計エビデンスのみを扱う前提です。従業員、給与、年金口座、銀行、国民ID、秘密情報などの本番データは、このプロトタイプの外に置くべきです。",
      cards: [
        [
          "Cookie",
          "必須を優先",
          "初期状態では、言語、テーマ、アクセシビリティ、デモ設定などのローカル設定のみを保存します。分析は明示的な同意後に限定します。"
        ],
        [
          "シークレット",
          "環境変数",
          "APIキー、データベースURL、OAuthシークレット、接続認証情報はGitではなく、Vercel環境変数で管理します。"
        ],
        [
          "顧客データ",
          "集計エビデンス",
          "パイロットでは業務、チーム、部門、コストセンター単位のデータを使用し、個人従業員レベルのエクスポートは避けます。"
        ],
        [
          "将来SaaS",
          "アクセス管理",
          "本番利用にはSSO、ロール、テナント分離、監査ログ、保持ルール、法務・セキュリティレビューが必要です。"
        ]
      ],
      noteTitle: "境界",
      noteBody:
        "TOMO PENSIONは検証済み拠出指示を作成します。資金、保管、年金口座運用は規制対象パートナーが実行します。"
    },
    cookieConsent: {
      title: "Cookie設定",
      body:
        "このプロトタイプは、言語、テーマ、アクセシビリティ、デモ設定のために必須のローカル保存を使用します。任意の分析は同意がある場合のみ有効にします。",
      essential: "必須のみ",
      analytics: "分析を許可"
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
