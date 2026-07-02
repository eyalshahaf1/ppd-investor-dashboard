import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";
import { AssumptionControl } from "./AssumptionControl";
import { KpiCard } from "./KpiCard";

type VerifiedAiGainCalculatorProps = {
  assumptions: Assumptions;
  language: Language;
  onAssumptionChange: <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;
};

const verifiedCopy = {
  en: {
    mode: "CFO-friendly verified calculation mode",
    title: "Verified AI Gain Calculator",
    body:
      "CFO-friendly source of truth for measured process-level AI gain. The default case is aligned to the Medium shortcut at roughly ¥60,000 per employee per year.",
    warningSuffix: "No pension allocation is routed.",
    inputsTitle: "Process-level inputs",
    controls: [
      ["Avoided overtime cost (O, JPY millions)", "Verified avoided overtime cost"],
      ["Avoided outsourcing / contractor cost (S, JPY millions)", "Verified avoided external labor cost"],
      ["Quality / rework / compliance savings (Q, JPY millions)", "Verified reduction in error-related cost"],
      ["Evidenced incremental contribution margin (M, JPY millions)", "Throughput margin only where evidenced"],
      ["Incremental AI-related costs (A, JPY millions)", "Licenses, cloud, integration, training, security, maintenance, change management"],
      ["Evidence adjustment rate (a)", "% conservative haircut"],
      ["Allocation rate", "% of verified gain to pension value"],
      ["Eligible employees (E)", "Pre-agreed allocation population"]
    ],
    gates: ["Quality gate passed", "Allocation population agreed before measurement"],
    outputsTitle: "Verified outputs",
    kpis: [
      ["Eligible gross gain", "O + S + Q + M."],
      ["Adjusted gross AI gain", "Eligible gross gain after evidence adjustment rate."],
      ["Net verified AI gain", "Adjusted gain after incremental AI-related costs."],
      ["Pension allocation", "Small pre-agreed share converted into pension value."],
      ["Company retained gain", "Verified gain retained by the company after pension allocation."],
      ["Pension value / employee", "Pension allocation divided by covered employees."]
    ],
    splitAria: "Company retained gain versus pension allocation",
    retained: "Company retained",
    pension: "Pension allocation",
    retentionNote:
      "The company keeps most of the verified AI gain. Only a small pre-agreed share is converted into pension value.",
    copyToQuick: "Copy to Quick Mode inputs",
    copyNote:
      "Copies verified per-employee gain, allocation rate, and employee count into the quick calculator only. Low / Medium / High remain illustrative adoption scenarios, not verified pilot results.",
    trustAria: "Trust boundary",
    trustTitle: "Trust boundary",
    trustChips: ["Not a donation", "Not a tax", "No existing-profit haircut", "Verified new AI gains only"],
    method: "View calculation method",
    formulas: [
      ["Eligible Gross Gain", "O + S + Q + M"],
      ["Adjusted Gross AI Gain", "Eligible Gross Gain × (1 - a)"],
      ["Net Verified AI Gain", "max(0, Eligible Gross Gain × (1 - a) - A)"],
      ["Pension Allocation", "Net Verified AI Gain × d, only when both gates pass"],
      ["Company Retained Gain", "Net Verified AI Gain - Pension Allocation"]
    ]
  },
  ja: {
    mode: "CFO向け検証計算モード",
    title: "検証済みAI効果計算",
    body:
      "測定済みプロセスレベルAI効果に対するCFO向けの基準計算です。初期ケースは中位ショートカットの従業員1人あたり年間約60,000円に整合しています。",
    warningSuffix: "年金配分は実行されません。",
    inputsTitle: "プロセスレベル入力",
    controls: [
      ["回避された残業費 (O, 百万円)", "検証済みの回避残業費"],
      ["回避された外部委託/契約費 (S, 百万円)", "検証済みの外部労務費削減"],
      ["品質/手戻り/コンプライアンス削減 (Q, 百万円)", "エラー関連コスト削減の検証値"],
      ["証跡のある追加限界利益 (M, 百万円)", "証跡がある場合のみ処理量由来の利益を含める"],
      ["増分AI関連コスト (A, 百万円)", "ライセンス、クラウド、統合、研修、セキュリティ、保守、変更管理"],
      ["エビデンス調整率 (a)", "保守的な控除率"],
      ["配分率", "検証済み効果のうち年金価値へ変換する割合"],
      ["対象従業員数 (E)", "事前合意された配分対象母集団"]
    ],
    gates: ["品質ゲート通過", "測定開始前に配分対象母集団を合意済み"],
    outputsTitle: "検証済み出力",
    kpis: [
      ["適格総効果", "O + S + Q + M。"],
      ["調整後AI総効果", "エビデンス調整率適用後の適格総効果。"],
      ["検証済みAI純効果", "増分AI関連コスト控除後の調整済み効果。"],
      ["年金配分", "事前合意された小さな割合を年金価値へ変換。"],
      ["企業に残る効果", "年金配分後に企業へ残る検証済み効果。"],
      ["従業員1人あたり年金価値", "年金配分を対象従業員数で割った値。"]
    ],
    splitAria: "企業に残る効果と年金配分",
    retained: "企業保持",
    pension: "年金配分",
    retentionNote:
      "企業は検証済みAI効果の大部分を保持します。事前合意された小さな割合のみが年金価値へ変換されます。",
    copyToQuick: "Quick Mode入力へコピー",
    copyNote:
      "検証済みの従業員あたり効果、配分率、従業員数のみをQuick calculatorへコピーします。Low / Medium / Highは検証済み結果ではなく例示導入シナリオです。",
    trustAria: "信頼境界",
    trustTitle: "信頼境界",
    trustChips: ["寄付ではない", "税ではない", "既存利益を削らない", "検証済みの新規AI効果のみ"],
    method: "計算方法を表示",
    formulas: [
      ["適格総効果", "O + S + Q + M"],
      ["調整後AI総効果", "適格総効果 × (1 - a)"],
      ["検証済みAI純効果", "max(0, 適格総効果 × (1 - a) - A)"],
      ["年金配分", "両方のゲート通過時のみ、検証済みAI純効果 × d"],
      ["企業に残る効果", "検証済みAI純効果 - 年金配分"]
    ]
  }
} as const;

export function VerifiedAiGainCalculator({
  assumptions,
  language,
  onAssumptionChange
}: VerifiedAiGainCalculatorProps) {
  const outputs = calculateVerifiedAiGain(assumptions);
  const copy = verifiedCopy[language];
  const splitTotal = outputs.companyRetainedGain + outputs.pensionAllocation;
  const retainedPercent = splitTotal
    ? (outputs.companyRetainedGain / splitTotal) * 100
    : 0;
  const pensionPercent = splitTotal
    ? (outputs.pensionAllocation / splitTotal) * 100
    : 0;

  function applyToQuickScenario() {
    if (!outputs.hasVerifiedGain || assumptions.eligibleEmployees <= 0) return;
    onAssumptionChange("coveredEmployees", assumptions.eligibleEmployees);
    onAssumptionChange(
      "gainPerEmployee",
      Math.round(outputs.netVerifiedAiGain / assumptions.eligibleEmployees)
    );
    onAssumptionChange("dividendRate", assumptions.allocationRate);
  }

  return (
    <section className="span-12 panel verified-calculator calc-verified">
      <div className="verified-head">
        <div>
          <span className="mode-label">{copy.mode}</span>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </div>
        {!outputs.canAllocate && (
          <div className="verified-warning">
            {outputs.allocationBlockers.join(" ")} {copy.warningSuffix}
          </div>
        )}
      </div>

      <div className="verified-grid">
        <div className="verified-inputs">
          <h4>{copy.inputsTitle}</h4>
          <div className="control-grid">
            <AssumptionControl name="avoidedOvertimeCostM" label={copy.controls[0][0]} help={copy.controls[0][1]} value={assumptions.avoidedOvertimeCostM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("avoidedOvertimeCostM", value)} />
            <AssumptionControl name="avoidedOutsourcingCostM" label={copy.controls[1][0]} help={copy.controls[1][1]} value={assumptions.avoidedOutsourcingCostM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("avoidedOutsourcingCostM", value)} />
            <AssumptionControl name="qualitySavingsM" label={copy.controls[2][0]} help={copy.controls[2][1]} value={assumptions.qualitySavingsM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("qualitySavingsM", value)} />
            <AssumptionControl name="incrementalContributionMarginM" label={copy.controls[3][0]} help={copy.controls[3][1]} value={assumptions.incrementalContributionMarginM} min={0} max={20000} step={100} onChange={(value) => onAssumptionChange("incrementalContributionMarginM", value)} />
            <AssumptionControl name="incrementalAiRelatedCostsM" label={copy.controls[4][0]} help={copy.controls[4][1]} value={assumptions.incrementalAiRelatedCostsM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("incrementalAiRelatedCostsM", value)} />
            <AssumptionControl name="evidenceAdjustmentRate" label={copy.controls[5][0]} help={copy.controls[5][1]} value={assumptions.evidenceAdjustmentRate} min={0} max={60} step={1} onChange={(value) => onAssumptionChange("evidenceAdjustmentRate", value)} />
            <AssumptionControl name="allocationRate" label={copy.controls[6][0]} help={copy.controls[6][1]} value={assumptions.allocationRate} min={0} max={10} step={0.25} onChange={(value) => onAssumptionChange("allocationRate", value)} />
            <AssumptionControl name="eligibleEmployees" label={copy.controls[7][0]} help={copy.controls[7][1]} value={assumptions.eligibleEmployees} min={0} max={100000} step={1000} onChange={(value) => onAssumptionChange("eligibleEmployees", value)} />
          </div>
          <div className="gate-grid">
            <label className="gate-check">
              <input
                type="checkbox"
                checked={assumptions.qualityGatePassed}
                onChange={(event) => onAssumptionChange("qualityGatePassed", event.target.checked)}
              />
              <span>{copy.gates[0]}</span>
            </label>
            <label className="gate-check">
              <input
                type="checkbox"
                checked={assumptions.allocationPopulationAgreed}
                onChange={(event) => onAssumptionChange("allocationPopulationAgreed", event.target.checked)}
              />
              <span>{copy.gates[1]}</span>
            </label>
          </div>
        </div>

        <div className="verified-results">
          <h4>{copy.outputsTitle}</h4>
          <div className="metric-grid">
            <KpiCard label={copy.kpis[0][0]} value={formatYen(outputs.eligibleGrossGain)} note={copy.kpis[0][1]} />
            <KpiCard label={copy.kpis[1][0]} value={formatYen(outputs.adjustedGrossAiGain)} note={copy.kpis[1][1]} accent="blue" />
            <KpiCard label={copy.kpis[2][0]} value={formatYen(outputs.netVerifiedAiGain)} note={copy.kpis[2][1]} accent={outputs.hasVerifiedGain ? "teal" : "coral"} />
            <KpiCard label={copy.kpis[3][0]} value={formatYen(outputs.pensionAllocation)} note={copy.kpis[3][1]} accent="amber" />
            <KpiCard label={copy.kpis[4][0]} value={formatYen(outputs.companyRetainedGain)} note={copy.kpis[4][1]} accent="indigo" />
            <KpiCard label={copy.kpis[5][0]} value={formatYen(outputs.pensionValuePerEmployee)} note={copy.kpis[5][1]} accent="blue" />
          </div>
          <div className="verified-split" aria-label={copy.splitAria}>
            <div className="verified-split-bar">
              <span style={{ width: `${retainedPercent}%` }} />
              <i style={{ width: `${pensionPercent}%` }} />
            </div>
            <div className="verified-split-labels">
              <b>{copy.retained}: {retainedPercent.toFixed(1)}%</b>
              <b>{copy.pension}: {pensionPercent.toFixed(1)}%</b>
            </div>
          </div>
          <p className="verified-retention-note">
            {copy.retentionNote}
          </p>
          <button
            className="action-btn primary"
            type="button"
            disabled={!outputs.hasVerifiedGain}
            onClick={applyToQuickScenario}
          >
            {copy.copyToQuick}
          </button>
          <p className="source-note">
            {copy.copyNote}
          </p>
        </div>
      </div>

      <div className="verified-support">
        <div className="trust-boundary" aria-label={copy.trustAria}>
          <b>{copy.trustTitle}</b>
          {copy.trustChips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>

        <details className="calculation-method">
          <summary>{copy.method}</summary>
          <div>
            {copy.formulas.map(([label, formula]) => (
              <FormulaLine key={label} label={label} formula={formula} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

function FormulaLine({ label, formula }: { label: string; formula: string }) {
  return (
    <div>
      <b>{label}</b>
      <span>= {formula}</span>
    </div>
  );
}
