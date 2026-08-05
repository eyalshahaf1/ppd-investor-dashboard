"use client";

import { formatYen } from "@/lib/format";
import { getCopy, type Language } from "@/lib/i18n";
import type {
  EmployerPolicy,
  EvidenceItem,
  EvidenceReview,
  FinanceDecision,
  QualityGate,
  QualityGateStatus,
  WorkflowDefinition
} from "@/lib/types";

export type EvidenceWorkflowStep =
  | "overview"
  | "workflow"
  | "evidence"
  | "review"
  | "finance"
  | "policy"
  | "report"
  | "pilot";

type EvidenceWorkflowViewProps = {
  activeTab: EvidenceWorkflowStep;
  workflow: WorkflowDefinition;
  evidenceItems: EvidenceItem[];
  qualityGates: QualityGate[];
  evidenceAdjustmentRate: number;
  review: EvidenceReview;
  financeDecision: FinanceDecision;
  employerPolicy: EmployerPolicy;
  language: Language;
  onWorkflowChange: <K extends keyof WorkflowDefinition>(key: K, value: WorkflowDefinition[K]) => void;
  onEvidenceAmountChange: (id: string, amountJpy: number) => void;
  onQualityGateChange: (id: string, status: QualityGateStatus) => void;
  onAdjustmentChange: (value: number) => void;
  onFinanceChange: <K extends keyof FinanceDecision>(key: K, value: FinanceDecision[K]) => void;
  onPolicyChange: <K extends keyof EmployerPolicy>(key: K, value: EmployerPolicy[K]) => void;
  onNavigate: (tab: EvidenceWorkflowStep) => void;
};

const copy = {
  en: {
    overview: "One workflow. Credible evidence. A controlled employer decision.",
    demoCase: "Illustrative demo case",
    next: "Next step",
    workflow: "Define the workflow before reviewing value.",
    evidence: "Record organization-supplied evidence, costs, exclusions and quality gates.",
    review: "Review the evidence-supported AI value and its limitations.",
    finance: "Finance may approve a base from zero up to the supported value.",
    policy: "The employer decides whether to apply a voluntary rate and cap.",
    report: "Produce a decision-ready report. No money movement is required.",
    define: "Define Workflow",
    titleWorkflow: "Define one workflow",
    titleEvidence: "Evidence ledger",
    titleReview: "Evidence review",
    titleFinance: "Finance decision",
    titlePolicy: "Employer policy",
    titleReport: "Evidence and Allocation Decision Report",
    titlePilot: "Pilot plan",
    fields: ["Organization", "Workflow", "Department", "Process owner", "Finance owner", "HR sponsor", "Volume unit"],
    baseline: "Baseline period",
    postAi: "Post-AI period",
    implementation: "AI implementation date",
    qualityMeasures: "Quality measures",
    sourceSystems: "Source systems",
    parallelChanges: "Known parallel changes",
    benefits: "Operational benefit evidence",
    costs: "AI-related costs (A)",
    exclusions: "Exclusions and non-AI effects (X)",
    amount: "Amount (JPY)",
    source: "Source",
    owner: "Source owner",
    outcome: "Outcome",
    qualityGates: "Quality gates",
    adjustment: "Conservative evidence adjustment",
    gross: "Supported gross benefits",
    adjusted: "Adjusted benefits",
    aiCosts: "AI-related costs",
    excluded: "Exclusions",
    supported: "Conservative evidence-supported AI value",
    grade: "Evidence grade",
    limitations: "Material limitations",
    blockers: "Allocation blockers",
    baseRange: "Permitted Finance allocation-base range",
    status: "Approval status",
    approver: "Approver",
    rationale: "Rationale",
    acknowledge: "I acknowledge the material limitations",
    approvedBase: "Finance-approved allocation base (JPY)",
    rate: "Voluntary allocation rate (%)",
    cap: "Employer cap (JPY)",
    employees: "Eligible employees",
    policyPeriod: "Policy period",
    eligibility: "Eligibility rule",
    employerNote: "Employer policy decision. Not a TOMO recommendation.",
    potential: "Potential long-term employee value allocation",
    perEmployee: "Illustrative per-employee amount",
    noAllocation: "No allocation is calculated until Finance approves a base and the policy is complete.",
    limitationsText: "The report records the method, evidence, costs, exclusions, quality gates and unresolved questions.",
    pilotTitle: "Rail-free first pilot",
    pilotBody: "Start with one workflow, one decision owner and one evidence report. Pension or benefit execution is a later, separate feasibility question.",
    pilotSteps: ["Scope and readiness", "Evidence processing", "Finance and employer decision", "Later route feasibility"],
    continue: "Continue",
    reviewMethod: "V = max(0, (O + S + Q + M) × (1 - h) - C - X)",
    policyFormula: "A = min(cap, Finance-approved base × voluntary rate)",
    reportStatus: "Illustrative demonstration data only. No customer, employee, pension or payment data is processed."
  },
  ja: {
    overview: "一つの業務。信頼できるエビデンス。管理された雇用主の意思決定。",
    demoCase: "例示デモケース",
    next: "次のステップ",
    workflow: "価値を検討する前に業務を定義します。",
    evidence: "企業が提供するエビデンス、コスト、除外項目、品質ゲートを記録します。",
    review: "エビデンスに基づくAI価値と限界を確認します。",
    finance: "財務部門は、根拠のある価値の範囲内でゼロから承認できます。",
    policy: "雇用主が任意の配分率と上限を決定します。",
    report: "意思決定に利用できるレポートを作成します。資金移動は不要です。",
    define: "業務を定義",
    titleWorkflow: "一つの業務を定義",
    titleEvidence: "エビデンス台帳",
    titleReview: "エビデンスレビュー",
    titleFinance: "財務部門の意思決定",
    titlePolicy: "雇用主ポリシー",
    titleReport: "エビデンス・配分意思決定レポート",
    titlePilot: "パイロット計画",
    fields: ["組織", "業務", "部門", "プロセス責任者", "財務責任者", "HRスポンサー", "数量単位"],
    baseline: "ベースライン期間",
    postAi: "AI導入後の期間",
    implementation: "AI導入日",
    qualityMeasures: "品質指標",
    sourceSystems: "ソースシステム",
    parallelChanges: "既知の並行変更",
    benefits: "業務上の効果エビデンス",
    costs: "AI関連コスト (A)",
    exclusions: "除外項目・非AI要因 (X)",
    amount: "金額 (JPY)",
    source: "ソース",
    owner: "ソース責任者",
    outcome: "結果",
    qualityGates: "品質ゲート",
    adjustment: "保守的なエビデンス調整",
    gross: "根拠のある総効果",
    adjusted: "調整後効果",
    aiCosts: "AI関連コスト",
    excluded: "除外額",
    supported: "保守的なエビデンスに基づくAI価値",
    grade: "エビデンスグレード",
    limitations: "重要な限界",
    blockers: "配分ブロッカー",
    baseRange: "財務部門が承認できる配分基準額の範囲",
    status: "承認ステータス",
    approver: "承認者",
    rationale: "理由",
    acknowledge: "重要な限界を確認しました",
    approvedBase: "財務承認済み配分基準額 (JPY)",
    rate: "任意の配分率 (%)",
    cap: "雇用主の上限 (JPY)",
    employees: "対象従業員数",
    policyPeriod: "ポリシー期間",
    eligibility: "対象ルール",
    employerNote: "雇用主によるポリシー決定。TOMOの推奨ではありません。",
    potential: "長期的な従業員価値の潜在配分",
    perEmployee: "従業員一人あたりの参考額",
    noAllocation: "財務承認とポリシー設定が完了するまで配分は計算されません。",
    limitationsText: "レポートには方法、エビデンス、コスト、除外、品質ゲート、未解決事項を記録します。",
    pilotTitle: "レールを持たない最初のパイロット",
    pilotBody: "一つの業務、一人の意思決定責任者、一つのエビデンスレポートから始めます。年金・給付の執行は後段の別個の実現可能性検討です。",
    pilotSteps: ["範囲と準備", "エビデンス処理", "財務・雇用主の意思決定", "後段のルート検討"],
    continue: "続ける",
    reviewMethod: "V = max(0, (O + S + Q + M) × (1 - h) - C - X)",
    policyFormula: "A = min(上限, 財務承認基準額 × 任意率)",
    reportStatus: "例示データのみを使用するデモです。顧客、従業員、年金、支払データは処理しません。"
  }
} as const;

export function EvidenceWorkflowView({
  activeTab,
  workflow,
  evidenceItems,
  qualityGates,
  evidenceAdjustmentRate,
  review,
  financeDecision,
  employerPolicy,
  language,
  onWorkflowChange,
  onEvidenceAmountChange,
  onQualityGateChange,
  onAdjustmentChange,
  onFinanceChange,
  onPolicyChange,
  onNavigate
}: EvidenceWorkflowViewProps) {
  const t = copy[language];
  const appCopy = getCopy(language);

  if (activeTab === "overview") {
    return (
      <div className="dashboard-grid workflow-screen">
        <section className="span-12 thesis-band workflow-hero">
          <div>
            <p className="kpi-label">{t.demoCase}</p>
            <h2>{appCopy.topbar.title}</h2>
            <p>{t.overview}</p>
          </div>
          <div className="workflow-status-card">
            <strong>{t.reportStatus}</strong>
            <span>{t.next}</span>
            <b>{t.workflow}</b>
            <button className="action-btn primary" type="button" onClick={() => onNavigate("workflow")}>{t.define}</button>
          </div>
        </section>
        <WorkflowSummary title={t.titleWorkflow} body={t.workflow} step="1" onClick={() => onNavigate("workflow")} />
        <WorkflowSummary title={t.titleEvidence} body={t.evidence} step="2" onClick={() => onNavigate("evidence")} />
        <WorkflowSummary title={t.titleReview} body={t.review} step="3" onClick={() => onNavigate("review")} />
        <WorkflowSummary title={t.titleFinance} body={t.finance} step="4" onClick={() => onNavigate("finance")} />
        <WorkflowSummary title={t.titlePolicy} body={t.policy} step="5" onClick={() => onNavigate("policy")} />
        <WorkflowSummary title={t.titleReport} body={t.report} step="6" onClick={() => onNavigate("report")} />
      </div>
    );
  }

  if (activeTab === "workflow") return <WorkflowDefinitionPanel workflow={workflow} t={t} onChange={onWorkflowChange} />;
  if (activeTab === "evidence") {
    return (
      <EvidencePanel
        evidenceItems={evidenceItems}
        qualityGates={qualityGates}
        t={t}
        onEvidenceAmountChange={onEvidenceAmountChange}
        onQualityGateChange={onQualityGateChange}
        onAdjustmentChange={onAdjustmentChange}
        evidenceAdjustmentRate={evidenceAdjustmentRate}
      />
    );
  }
  if (activeTab === "review") return <ReviewPanel review={review} t={t} />;
  if (activeTab === "finance") {
    return <FinancePanel review={review} decision={financeDecision} t={t} onChange={onFinanceChange} />;
  }
  if (activeTab === "policy") {
    return <PolicyPanel review={review} decision={financeDecision} policy={employerPolicy} t={t} onChange={onPolicyChange} />;
  }
  if (activeTab === "report") {
    return <ReportPanel review={review} decision={financeDecision} policy={employerPolicy} t={t} />;
  }
  return <PilotPanel t={t} />;
}

function WorkflowSummary({ title, body, step, onClick }: { title: string; body: string; step: string; onClick: () => void }) {
  return (
    <button className="workflow-summary panel" type="button" onClick={onClick}>
      <span className="workflow-step-number">{step}</span>
      <span><strong>{title}</strong><small>{body}</small></span>
    </button>
  );
}

function WorkflowDefinitionPanel({ workflow, t, onChange }: { workflow: WorkflowDefinition; t: typeof copy.en | typeof copy.ja; onChange: EvidenceWorkflowViewProps["onWorkflowChange"] }) {
  const values: Array<[keyof WorkflowDefinition, string]> = [
    ["organizationName", workflow.organizationName], ["workflowName", workflow.workflowName], ["department", workflow.department],
    ["processOwner", workflow.processOwner], ["financeOwner", workflow.financeOwner], ["hrSponsor", workflow.hrSponsor ?? ""], ["volumeUnit", workflow.volumeUnit]
  ];
  return (
    <section className="panel workflow-form-panel">
      <PanelHeader eyebrow="1" title={t.titleWorkflow} body={t.workflow} />
      <div className="workflow-field-grid">
        {values.map(([key, value], index) => <label key={String(key)}><span>{t.fields[index]}</span><input value={value} onChange={(event) => onChange(key, event.target.value)} /></label>)}
        <DateField label={t.baseline} start={workflow.baselineStart} end={workflow.baselineEnd} onStart={(value) => onChange("baselineStart", value)} onEnd={(value) => onChange("baselineEnd", value)} />
        <DateField label={t.postAi} start={workflow.postAiStart} end={workflow.postAiEnd} onStart={(value) => onChange("postAiStart", value)} onEnd={(value) => onChange("postAiEnd", value)} />
        <label><span>{t.implementation}</span><input type="date" value={workflow.aiImplementationDate} onChange={(event) => onChange("aiImplementationDate", event.target.value)} /></label>
        <TextField label={t.qualityMeasures} value={workflow.qualityMeasures.join(", ")} onChange={(value) => onChange("qualityMeasures", value.split(",").map((item) => item.trim()).filter(Boolean))} />
        <TextField label={t.sourceSystems} value={workflow.sourceSystems.join(", ")} onChange={(value) => onChange("sourceSystems", value.split(",").map((item) => item.trim()).filter(Boolean))} />
        <TextField label={t.parallelChanges} value={workflow.knownParallelChanges.join(", ")} onChange={(value) => onChange("knownParallelChanges", value.split(",").map((item) => item.trim()).filter(Boolean))} />
      </div>
    </section>
  );
}

function EvidencePanel({ evidenceItems, qualityGates, t, evidenceAdjustmentRate, onEvidenceAmountChange, onQualityGateChange, onAdjustmentChange }: { evidenceItems: EvidenceItem[]; qualityGates: QualityGate[]; t: typeof copy.en | typeof copy.ja; evidenceAdjustmentRate: number; onEvidenceAmountChange: EvidenceWorkflowViewProps["onEvidenceAmountChange"]; onQualityGateChange: EvidenceWorkflowViewProps["onQualityGateChange"]; onAdjustmentChange: (value: number) => void }) {
  const groups: Array<[string, EvidenceItem[]]> = [[t.benefits, evidenceItems.filter((item) => item.category === "benefit")], [t.costs, evidenceItems.filter((item) => item.category === "cost")], [t.exclusions, evidenceItems.filter((item) => item.category === "exclusion")]];
  return <section className="panel workflow-form-panel"><PanelHeader eyebrow="2" title={t.titleEvidence} body={t.evidence} />{groups.map(([title, items]) => <div className="evidence-group" key={title}><h3>{title}</h3>{items.length ? items.map((item) => <div className="evidence-row" key={item.id}><div><strong>{item.outcome}</strong><span>{item.sourceName}</span><small>{item.limitation ?? item.notes}</small></div><label><span>{t.amount}</span><input type="number" min="0" value={item.amountJpy} onChange={(event) => onEvidenceAmountChange(item.id, Number(event.target.value))} /></label></div>) : <p className="source-note">No exclusions recorded in this demo case.</p>}</div>)}<div className="quality-gate-block"><h3>{t.qualityGates}</h3>{qualityGates.map((gate) => <label className="quality-gate-row" key={gate.id}><span>{gate.name}</span><select value={gate.status} onChange={(event) => onQualityGateChange(gate.id, event.target.value as QualityGateStatus)}><option value="pass">Pass</option><option value="review">Review required</option><option value="fail">Fail</option><option value="not_evidenced">Not evidenced</option></select></label>)}</div><label className="workflow-range"><span>{t.adjustment}: {evidenceAdjustmentRate}%</span><input type="range" min="0" max="50" step="1" value={evidenceAdjustmentRate} onChange={(event) => onAdjustmentChange(Number(event.target.value))} /></label></section>;
}

function ReviewPanel({ review, t }: { review: EvidenceReview; t: typeof copy.en | typeof copy.ja }) {
  return <section className="panel workflow-form-panel"><PanelHeader eyebrow="3" title={t.titleReview} body={t.review} /><div className="workflow-metric-grid"><Metric label={t.gross} value={formatYen(review.grossSupportedBenefitsJpy)} /><Metric label={t.adjusted} value={formatYen(review.adjustedBenefitsJpy)} /><Metric label={t.aiCosts} value={formatYen(review.aiRelatedCostsJpy)} accent="coral" /><Metric label={t.excluded} value={formatYen(review.exclusionsJpy)} /><Metric label={t.supported} value={formatYen(review.evidenceSupportedValueJpy)} accent="indigo" /></div><div className="method-strip"><strong>Method</strong><code>{t.reviewMethod}</code></div><div className="workflow-review-grid"><InfoBlock title={t.grade} body={review.evidenceGrade} /><InfoBlock title={t.limitations} body={review.materialLimitations.length ? review.materialLimitations.join(" ") : "None recorded."} /><InfoBlock title={t.blockers} body={review.blockers.length ? review.blockers.join(" ") : "None."} /></div></section>;
}

function FinancePanel({ review, decision, t, onChange }: { review: EvidenceReview; decision: FinanceDecision; t: typeof copy.en | typeof copy.ja; onChange: EvidenceWorkflowViewProps["onFinanceChange"] }) {
  return <section className="panel workflow-form-panel"><PanelHeader eyebrow="4" title={t.titleFinance} body={t.finance} /><div className="finance-range"><span>{t.baseRange}</span><strong>¥0 - {formatYen(review.evidenceSupportedValueJpy)}</strong></div><div className="workflow-field-grid"><label><span>{t.approvedBase}</span><input type="number" min="0" value={decision.approvedAllocationBaseJpy} onChange={(event) => onChange("approvedAllocationBaseJpy", Number(event.target.value))} /></label><label><span>{t.status}</span><select value={decision.status} onChange={(event) => onChange("status", event.target.value as FinanceDecision["status"])}><option value="not_started">Not started</option><option value="under_review">Under review</option><option value="approved">Approved</option><option value="declined">Declined</option></select></label><label><span>{t.approver}</span><input value={decision.approver ?? ""} onChange={(event) => onChange("approver", event.target.value)} /></label><TextField label={t.rationale} value={decision.rationale ?? ""} onChange={(value) => onChange("rationale", value)} /></div><label className="check-row"><input type="checkbox" checked={decision.limitationsAcknowledged} onChange={(event) => onChange("limitationsAcknowledged", event.target.checked)} /><span>{t.acknowledge}</span></label></section>;
}

function PolicyPanel({ review, decision, policy, t, onChange }: { review: EvidenceReview; decision: FinanceDecision; policy: EmployerPolicy; t: typeof copy.en | typeof copy.ja; onChange: EvidenceWorkflowViewProps["onPolicyChange"] }) {
  const available = decision.status === "approved" && decision.approvedAllocationBaseJpy <= review.evidenceSupportedValueJpy;
  return <section className="panel workflow-form-panel"><PanelHeader eyebrow="5" title={t.titlePolicy} body={t.policy} /><div className="workflow-field-grid"><label><span>{t.rate}</span><input type="number" min="0" max="100" value={policy.allocationRate} onChange={(event) => onChange("allocationRate", Number(event.target.value))} /></label><label><span>{t.cap}</span><input type="number" min="0" value={policy.capJpy} onChange={(event) => onChange("capJpy", Number(event.target.value))} /></label><label><span>{t.employees}</span><input type="number" min="0" value={policy.eligibleEmployees} onChange={(event) => onChange("eligibleEmployees", Number(event.target.value))} /></label><label><span>{t.policyPeriod}</span><input value={policy.policyPeriod} onChange={(event) => onChange("policyPeriod", event.target.value)} /></label><TextField label={t.eligibility} value={policy.eligibilityRule} onChange={(value) => onChange("eligibilityRule", value)} /></div><div className="policy-output"><div><span>{t.potential}</span><strong>{available ? formatYen(Math.min(policy.capJpy, decision.approvedAllocationBaseJpy * policy.allocationRate / 100)) : "¥0"}</strong></div><div><span>{t.perEmployee}</span><strong>{available && policy.eligibleEmployees > 0 ? formatYen(Math.min(policy.capJpy, decision.approvedAllocationBaseJpy * policy.allocationRate / 100) / policy.eligibleEmployees) : "¥0"}</strong></div></div><p className="source-note">{t.employerNote} {t.policyFormula}</p>{!available && <p className="workflow-warning">{t.noAllocation}</p>}</section>;
}

function ReportPanel({ review, decision, policy, t }: { review: EvidenceReview; decision: FinanceDecision; policy: EmployerPolicy; t: typeof copy.en | typeof copy.ja }) {
  const allocation = decision.status === "approved" ? Math.min(policy.capJpy, decision.approvedAllocationBaseJpy * policy.allocationRate / 100) : 0;
  return <section className="panel workflow-form-panel decision-report"><PanelHeader eyebrow="6" title={t.titleReport} body={t.report} /><p className="report-status">{t.reportStatus}</p><dl><dt>{t.supported}</dt><dd>{formatYen(review.evidenceSupportedValueJpy)}</dd><dt>{t.grade}</dt><dd>{review.evidenceGrade}</dd><dt>{t.approvedBase}</dt><dd>{formatYen(decision.approvedAllocationBaseJpy)}</dd><dt>{t.potential}</dt><dd>{formatYen(allocation)}</dd><dt>{t.perEmployee}</dt><dd>{formatYen(policy.eligibleEmployees > 0 ? allocation / policy.eligibleEmployees : 0)}</dd></dl><p className="source-note">{t.limitationsText}</p></section>;
}

function PilotPanel({ t }: { t: typeof copy.en | typeof copy.ja }) { return <section className="panel workflow-form-panel"><PanelHeader eyebrow="7" title={t.titlePilot} body={t.pilotBody} /><div className="pilot-plan-grid">{t.pilotSteps.map((step, index) => <article key={step}><span>{index + 1}</span><strong>{step}</strong><p>{index === 3 ? t.pilotBody : t.evidence}</p></article>)}</div></section>; }

function PanelHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) { return <div className="workflow-panel-header"><span className="workflow-step-number">{eyebrow}</span><div><h2>{title}</h2><p>{body}</p></div></div>; }
function Metric({ label, value, accent }: { label: string; value: string; accent?: string }) { return <div className={`workflow-metric ${accent ?? ""}`}><span>{label}</span><strong>{value}</strong></div>; }
function InfoBlock({ title, body }: { title: string; body: string }) { return <article className="workflow-info-block"><strong>{title}</strong><p>{body}</p></article>; }
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function DateField({ label, start, end, onStart, onEnd }: { label: string; start: string; end: string; onStart: (value: string) => void; onEnd: (value: string) => void }) { return <fieldset className="date-field"><legend>{label}</legend><input aria-label={`${label} start`} type="date" value={start} onChange={(event) => onStart(event.target.value)} /><input aria-label={`${label} end`} type="date" value={end} onChange={(event) => onEnd(event.target.value)} /></fieldset>; }
