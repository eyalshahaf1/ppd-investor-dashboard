import { calculateEmployerEconomics } from "@/lib/calculations";
import { formatNumber, formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";
import { AssumptionControl } from "./AssumptionControl";
import { KpiCard } from "./KpiCard";
import { ProductivityWaterfallChart } from "./ProductivityWaterfallChart";
import { SensitivityTornadoChart } from "./SensitivityTornadoChart";
import { VerifiedAiGainCalculator } from "./VerifiedAiGainCalculator";

type CalculatorViewProps = {
  assumptions: Assumptions;
  language: Language;
  onAssumptionChange: <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;
};

export function CalculatorView({
  assumptions,
  language,
  onAssumptionChange
}: CalculatorViewProps) {
  const economics = calculateEmployerEconomics(assumptions);
  const copy = calculationCopy[language];
  const tips = calculatorHelp[language];

  return (
    <div className="dashboard-grid calculator-grid">
      <section className="span-12 section-title calc-intro">
        <div>
          <h2>{copy.introTitle}</h2>
          <p>{copy.introBody}</p>
        </div>
      </section>

      <CalculationExplainer title={copy.title} items={copy.items} />

      <VerifiedAiGainCalculator
        assumptions={assumptions}
        language={language}
        onAssumptionChange={onAssumptionChange}
      />

      <section className="span-6 panel calc-assumptions">
        <h3>{copy.quickInputsTitle}</h3>
        <p className="source-note">
          {copy.quickInputsBody}
        </p>
        <div className="control-grid">
          <AssumptionControl name="coveredEmployees" label={tips.coveredEmployees.label} help={tips.coveredEmployees.help} value={assumptions.coveredEmployees} min={1000} max={50000} step={1000} onChange={(value) => onAssumptionChange("coveredEmployees", value)} />
          <AssumptionControl name="employers" label={tips.employers.label} help={tips.employers.help} value={assumptions.employers} min={1} max={250} step={1} onChange={(value) => onAssumptionChange("employers", value)} />
          <AssumptionControl name="gainPerEmployee" label={tips.gainPerEmployee.label} help={tips.gainPerEmployee.help} value={assumptions.gainPerEmployee} min={200000} max={3000000} step={50000} onChange={(value) => onAssumptionChange("gainPerEmployee", value)} />
          <AssumptionControl name="dividendRate" label={tips.dividendRate.label} help={tips.dividendRate.help} value={assumptions.dividendRate} min={1} max={10} step={0.25} onChange={(value) => onAssumptionChange("dividendRate", value)} />
          <AssumptionControl name="annualReturn" label={tips.annualReturn.label} help={tips.annualReturn.help} value={assumptions.annualReturn} min={0} max={6} step={0.25} onChange={(value) => onAssumptionChange("annualReturn", value)} />
        </div>
      </section>

      <section className="span-6 panel calc-outputs">
        <h3>{copy.quickOutputsTitle}</h3>
        <p className="source-note">
          {copy.quickOutputsBody}
        </p>
        <div className="metric-grid">
          <KpiCard label={copy.outputKpis[0][0]} value={formatYen(economics.retirementPool)} note={copy.outputKpis[0][1]} />
          <KpiCard label={copy.outputKpis[1][0]} value={formatYen(economics.perEmployee)} note={copy.outputKpis[1][1]} accent="amber" />
          <KpiCard label={copy.outputKpis[2][0]} value={formatYen(economics.employerRetained)} note={copy.outputKpis[2][1]} accent="coral" />
          <KpiCard label={copy.outputKpis[3][0]} value={formatYen(economics.recurringRevenue)} note={copy.outputKpis[3][1]} accent="blue" />
          <KpiCard label={copy.outputKpis[4][0]} value={formatYen(economics.ltv)} note={copy.outputKpis[4][1]} accent="indigo" />
          <KpiCard label={copy.outputKpis[5][0]} value={`${formatNumber(economics.paybackMonths, 1)} ${copy.monthSuffix}`} note={copy.outputKpis[5][1]} />
        </div>
      </section>

      <section className="span-6 panel calc-pricing">
        <h3>{copy.pricingTitle}</h3>
        <div className="control-grid">
          <AssumptionControl name="setupFeeM" label={copy.pricingControls[0][0]} help={copy.pricingControls[0][1]} value={assumptions.setupFeeM} min={0} max={50} step={1} onChange={(value) => onAssumptionChange("setupFeeM", value)} />
          <AssumptionControl name="monthlySaas" label={copy.pricingControls[1][0]} help={copy.pricingControls[1][1]} value={assumptions.monthlySaas} min={100} max={1500} step={50} onChange={(value) => onAssumptionChange("monthlySaas", value)} />
          <AssumptionControl name="takeRate" label={copy.pricingControls[2][0]} help={copy.pricingControls[2][1]} value={assumptions.takeRate} min={0} max={2} step={0.05} onChange={(value) => onAssumptionChange("takeRate", value)} />
          <AssumptionControl name="auditFeeM" label={copy.pricingControls[3][0]} help={copy.pricingControls[3][1]} value={assumptions.auditFeeM} min={0} max={10} step={0.5} onChange={(value) => onAssumptionChange("auditFeeM", value)} />
          <AssumptionControl name="grossMargin" label={copy.pricingControls[4][0]} help={copy.pricingControls[4][1]} value={assumptions.grossMargin} min={40} max={90} step={1} onChange={(value) => onAssumptionChange("grossMargin", value)} />
          <AssumptionControl name="cacM" label={copy.pricingControls[5][0]} help={copy.pricingControls[5][1]} value={assumptions.cacM} min={1} max={80} step={1} onChange={(value) => onAssumptionChange("cacM", value)} />
        </div>
      </section>

      <section className="span-6 panel calc-operational">
        <h3>{copy.operationalTitle}</h3>
        <p>
          {copy.operationalBody}
        </p>
        <div className="control-grid">
          <AssumptionControl name="hoursSaved" label={copy.operationalControls[0][0]} help={copy.operationalControls[0][1]} value={assumptions.hoursSaved} min={0} max={3000000} step={25000} onChange={(value) => onAssumptionChange("hoursSaved", value)} />
          <AssumptionControl name="costPerHour" label={copy.operationalControls[1][0]} help={copy.operationalControls[1][1]} value={assumptions.costPerHour} min={1000} max={12000} step={100} onChange={(value) => onAssumptionChange("costPerHour", value)} />
          <AssumptionControl name="overtimeM" label={copy.operationalControls[2][0]} help={copy.operationalControls[2][1]} value={assumptions.overtimeM} min={0} max={5000} step={50} onChange={(value) => onAssumptionChange("overtimeM", value)} />
          <AssumptionControl name="outsourcingM" label={copy.operationalControls[3][0]} help={copy.operationalControls[3][1]} value={assumptions.outsourcingM} min={0} max={5000} step={50} onChange={(value) => onAssumptionChange("outsourcingM", value)} />
          <AssumptionControl name="qualityM" label={copy.operationalControls[4][0]} help={copy.operationalControls[4][1]} value={assumptions.qualityM} min={0} max={5000} step={50} onChange={(value) => onAssumptionChange("qualityM", value)} />
          <AssumptionControl name="aiCostM" label={copy.operationalControls[5][0]} help={copy.operationalControls[5][1]} value={assumptions.aiCostM} min={0} max={5000} step={50} onChange={(value) => onAssumptionChange("aiCostM", value)} />
        </div>
        <div className="operational-note-grid">
          {copy.operationalCards.map(([title, body]) => (
            <article className="operational-note-card" key={title}>
              <h4>{title}</h4>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="operational-formula-strip">
          <h4>{copy.formulaStripTitle}</h4>
          <div className="operational-formulas">
            {copy.operationalFormulas.map((formula) => (
              <code key={formula}>{formula}</code>
            ))}
          </div>
          <p>
            {copy.formulaStripNote}
          </p>
        </div>
        <ul className="operational-mapping-list" aria-label={copy.mappingAria}>
          {copy.mappingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ProductivityWaterfallChart assumptions={assumptions} language={language} className="calc-waterfall" />
      <SensitivityTornadoChart assumptions={assumptions} language={language} className="calc-tornado" />
    </div>
  );
}

function CalculationExplainer({
  title,
  items
}: {
  title: string;
  items: ReadonlyArray<{ heading: string; body: string; formula: string }>;
}) {
  return (
    <section className="span-12 panel calculation-explainer calc-guide">
      <h3>{title}</h3>
      <div className="calculation-list">
        {items.map((item, index) => (
          <article className="calculation-step" key={item.heading}>
            <b>{index + 1}. {item.heading}</b>
            <p>{item.body}</p>
            <code>{item.formula}</code>
          </article>
        ))}
      </div>
    </section>
  );
}

const calculatorHelp = {
  en: {
    coveredEmployees: {
      label: "Covered employees",
      help: "Employees included in the model per employer."
    },
    employers: {
      label: "Employers",
      help: "Number of companies in the rollout scenario."
    },
    gainPerEmployee: {
      label: "Verified net gain",
      help: "Annual verified productivity gain per employee."
    },
    dividendRate: {
      label: "Dividend rule",
      help: "Share of verified gain routed to retirement."
    },
    annualReturn: {
      label: "AUM tracking return",
      help: "Illustrative return on tracked retirement assets. Not a forecast."
    }
  },
  ja: {
    coveredEmployees: {
      label: "対象従業員数",
      help: "企業1社あたりのモデル対象従業員数。"
    },
    employers: {
      label: "参加企業数",
      help: "展開シナリオに含まれる企業数。"
    },
    gainPerEmployee: {
      label: "検証済み純効果",
      help: "従業員一人あたりの年間検証済み生産性効果。"
    },
    dividendRate: {
      label: "配当ルール",
      help: "検証済み効果のうち退職・年金拠出に回す割合。"
    },
    annualReturn: {
      label: "AUM追跡リターン",
      help: "積立資産に対する参考リターン。予測ではありません。"
    }
  }
} as const;

const calculationCopy = {
  en: {
    introTitle: "Verified ledger room",
    introBody:
      "Move from pilot evidence to CFO-reconciled gain, pension allocation, and investor scenario outputs.",
    title: "How the calculations work",
    quickInputsTitle: "Quick Scenario Mode: employer and dividend assumptions",
    quickInputsBody:
      "Illustrative shortcut for live investor Q&A. The Verified AI Gain Calculator above is the CFO-friendly source of truth for measured pilot economics.",
    quickOutputsTitle: "Quick Scenario Mode: calculated outputs",
    quickOutputsBody:
      "These values are derived from shortcut assumptions. They should reconcile back to verified process-level evidence before customer use.",
    outputKpis: [
      ["Annual retirement pool", "Value routed to retirement rails. Not platform revenue."],
      ["Annual per employee", "Contribution generated by the dividend rule."],
      ["Employer retained value", "Verified gain remaining after retirement allocation."],
      ["Recurring platform revenue", "SaaS plus contribution instruction and reconciliation fee plus verification fee."],
      ["Gross-profit LTV", "Retention-period gross profit after setup cost."],
      ["CAC payback", "Based on recurring gross profit per month."]
    ],
    monthSuffix: "mo",
    pricingTitle: "Platform pricing assumptions",
    pricingControls: [
      ["Setup fee", "JPY millions / new employer"],
      ["SaaS fee", "JPY / employee / month"],
      [
        "Contribution instruction fee",
        "0.5% of verified allocation value. Separately invoiced to the employer or rail partner. Not deducted from, held, pooled, transferred, or invested by PPD."
      ],
      ["Verification fee", "JPY millions / employer / year"],
      ["Gross margin", "% recurring revenue"],
      ["CAC", "JPY millions / employer"]
    ],
    operationalTitle: "How operational evidence supports the Verified AI Gain Ledger",
    operationalBody:
      "Use the first two sliders to describe time evidence: verified hours saved and fully loaded hourly cost. Use overtime, outsourcing, and quality sliders as possible evidence for O, S, and Q. Use AI costs as possible A to subtract. None of these sliders creates eligible financial value automatically; eligible value enters the Verified AI Gain Ledger only after documented reconciliation.",
    operationalControls: [
      ["Verified hours saved", "Operational evidence only. May support O, S, or M after documented financial reconciliation."],
      ["Fully loaded cost", "Context only. Hours saved × hourly cost is not automatically eligible financial value."],
      ["Overtime savings", "May support O - avoided overtime cost, when supported by payroll or time-record evidence."],
      ["Outsourcing savings", "May support S - avoided outsourcing or contractor cost, when supported by documented external-spend reduction."],
      ["Quality benefit", "May support Q - quality, rework, error, waste, or compliance savings, when financially evidenced."],
      ["AI costs", "Reconciles to A - incremental AI-related costs to subtract from eligible gain."]
    ],
    operationalCards: [
      [
        "How operational evidence enters the ledger",
        "Hours saved, cycle-time reduction, throughput, and workflow improvements are evidence. They enter the pension model only after they are reconciled to a documented financial outcome: O, S, Q, M, or A."
      ],
      [
        "What does not count automatically",
        "Salary cost, hours saved, throughput, or projected benefit do not automatically become eligible gain. Savings created directly by involuntary layoffs, hiring freezes, non-replacement of attrition, or direct workforce reductions are excluded."
      ]
    ],
    formulaStripTitle: "From evidence to pension allocation",
    operationalFormulas: [
      "Eligible Gross Gain = O + S + Q + M",
      "Net Verified AI Gain = max(0, Eligible Gross Gain × (1 - a) - A)",
      "Pension Allocation = Net Verified AI Gain × d"
    ],
    formulaStripNote:
      "Allocation is permitted only when the quality gate passes and the eligible employee population was agreed before measurement began.",
    mappingAria: "Operational evidence mapping examples",
    mappingItems: [
      "Hours saved / cycle-time reduction -> may support O, S, or M",
      "Reduced contractor or temporary labour -> S",
      "Fewer errors, defects, rework, or compliance events -> Q",
      "Additional throughput with evidenced margin -> M",
      "AI licences, cloud, integration, training, security, maintenance, and change management -> A"
    ],
    items: [
      {
        heading: "Verified gain base",
        body: "Quick Mode starts with covered employees and verified net gain per employee. It does not apply a second haircut.",
        formula: "Covered employees × Employers × Verified net gain per employee"
      },
      {
        heading: "Annual retirement pool",
        body: "A defined percentage of the verified gain base is routed to retirement contributions.",
        formula: "Verified gain base × Dividend rule"
      },
      {
        heading: "Annual per employee",
        body: "The retirement pool is divided by total covered employees.",
        formula: "Annual retirement pool ÷ Total covered employees"
      },
      {
        heading: "Employer retained value",
        body: "The employer keeps the remaining verified gain after the retirement allocation.",
        formula: "Verified gain base - Annual retirement pool"
      },
      {
        heading: "Recurring platform revenue",
        body: "Platform revenue combines SaaS fees, contribution instruction and reconciliation fees, and verification fees. It excludes setup revenue.",
        formula: "Annual SaaS revenue + Contribution instruction and reconciliation fee + Verification revenue"
      },
      {
        heading: "Operational evidence",
        body: "Hours saved, throughput, and cycle-time reductions are evidence only. They must reconcile to documented O, S, Q, or M outcomes.",
        formula: "Operational evidence → documented O/S/Q/M outcomes"
      }
    ]
  },
  ja: {
    introTitle: "検証台帳ルーム",
    introBody:
      "パイロットエビデンスから、CFO照合済み効果、年金配分、投資家向けシナリオ出力へ進みます。",
    title: "計算の仕組み",
    quickInputsTitle: "Quick Scenario Mode: 企業・配分前提",
    quickInputsBody:
      "投資家Q&A用の例示ショートカットです。上の検証済みAI効果計算が、測定済みパイロット経済性に対するCFO向けの基準です。",
    quickOutputsTitle: "Quick Scenario Mode: 計算結果",
    quickOutputsBody:
      "これらの値はショートカット前提から算出されます。顧客利用前には、検証済みプロセスレベルのエビデンスへ照合する必要があります。",
    outputKpis: [
      ["年間年金原資", "退職・年金レールへ送る価値。プラットフォーム収益ではありません。"],
      ["従業員1人あたり年間額", "配分ルールにより生じる拠出額。"],
      ["企業に残る価値", "年金配分後に残る検証済み効果。"],
      ["継続プラットフォーム収益", "SaaS、拠出指示・照合フィー、検証フィーの合計。"],
      ["粗利益LTV", "初期設定費控除後の継続期間粗利益。"],
      ["CAC回収期間", "月次継続粗利益に基づく。"]
    ],
    monthSuffix: "か月",
    pricingTitle: "プラットフォーム価格前提",
    pricingControls: [
      ["初期設定費", "百万円 / 新規雇用主"],
      ["SaaS料金", "円 / 従業員 / 月"],
      [
        "拠出指示・照合フィー",
        "検証済み配分額の0.5%。雇用主またはレールパートナーへ別請求。PPDが控除、保有、プール、移転、投資するものではありません。"
      ],
      ["検証フィー", "百万円 / 雇用主 / 年"],
      ["粗利率", "継続収益に対する割合"],
      ["CAC", "百万円 / 雇用主"]
    ],
    operationalTitle: "業務エビデンスが検証済みAI効果台帳を支える仕組み",
    operationalBody:
      "最初の2つのスライダーは、検証済み削減時間と総合時間単価という時間エビデンスを示します。残業、外部委託、品質のスライダーは、O、S、Qを支える可能性のあるエビデンスです。AIコストは控除対象Aの候補です。これらのスライダーだけで適格な金銭価値が自動的に生まれるわけではありません。適格価値は、文書化された照合後にのみ検証済みAI効果台帳へ入ります。",
    operationalControls: [
      ["検証済み削減時間", "業務エビデンスのみ。文書化された財務照合後にO、S、またはMを支える可能性があります。"],
      ["総合時間単価", "文脈情報のみ。削減時間 × 時間単価は自動的に適格な金銭価値にはなりません。"],
      ["残業削減", "Oを支える可能性 - 給与または勤怠記録で裏付けられた回避残業費。"],
      ["外部委託削減", "Sを支える可能性 - 文書化された外部支出削減に基づく回避委託・契約費。"],
      ["品質効果", "Qを支える可能性 - 品質、手戻り、エラー、廃棄、コンプライアンス関連の削減が財務的に証明される場合。"],
      ["AIコスト", "Aへ照合 - 適格効果から控除する増分AI関連コスト。"]
    ],
    operationalCards: [
      [
        "業務エビデンスが台帳へ入る流れ",
        "削減時間、サイクル時間短縮、処理量、業務改善はエビデンスです。O、S、Q、M、Aのいずれかの文書化された財務成果へ照合された後にのみ、年金モデルへ入ります。"
      ],
      [
        "自動的には算入しないもの",
        "給与コスト、削減時間、処理量、見込み効果は、自動的に適格利益にはなりません。非自発的な解雇、採用凍結、自然減の不補充、直接的な人員削減で生じた節減は除外されます。"
      ]
    ],
    formulaStripTitle: "エビデンスから年金配分へ",
    operationalFormulas: [
      "適格総効果 = O + S + Q + M",
      "検証済みAI純効果 = max(0, 適格総効果 × (1 - a) - A)",
      "年金配分 = 検証済みAI純効果 × d"
    ],
    formulaStripNote:
      "配分は、品質ゲートが通過し、測定開始前に対象従業員母集団が合意されている場合にのみ許可されます。",
    mappingAria: "業務エビデンスのマッピング例",
    mappingItems: [
      "削減時間 / サイクル時間短縮 -> O、S、またはMを支える可能性",
      "契約社員・一時労働の削減 -> S",
      "エラー、欠陥、手戻り、コンプライアンス事象の減少 -> Q",
      "証跡のある追加処理量と限界利益 -> M",
      "AIライセンス、クラウド、統合、研修、セキュリティ、保守、変更管理 -> A"
    ],
    items: [
      {
        heading: "検証済み効果ベース",
        body: "Quick Modeは対象従業員数と従業員一人あたりの検証済み純効果から始まります。二重のヘアカットは適用しません。",
        formula: "対象従業員数 × 参加企業数 × 従業員一人あたりの検証済み純効果"
      },
      {
        heading: "年間年金原資",
        body: "検証済み効果ベースの一定割合を、退職・年金拠出に回します。",
        formula: "検証済み効果ベース × 配当ルール"
      },
      {
        heading: "従業員一人あたり年間拠出額",
        body: "年間年金原資を、対象従業員総数で割ります。",
        formula: "年間年金原資 ÷ 対象従業員総数"
      },
      {
        heading: "企業に残る価値",
        body: "年金配分後に、企業側に残る検証済み効果です。",
        formula: "検証済み効果ベース - 年間年金原資"
      },
      {
        heading: "継続的プラットフォーム収益",
        body: "SaaS収益、拠出指示・照合フィー、検証収益を合計します。一回限りの初期設定収益は含みません。",
        formula: "年間SaaS収益 + 拠出指示・照合フィー + 検証収益"
      },
      {
        heading: "業務上の純効果",
        body: "業務証拠は、文書化されたO/S/Q/Mの結果に照合されて初めて適格な金銭価値になります。",
        formula: "業務証拠 → O/S/Q/Mへの照合 → 適格な検証済み純効果"
      }
    ]
  }
} as const;
