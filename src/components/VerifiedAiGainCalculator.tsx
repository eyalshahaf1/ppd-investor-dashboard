import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";
import { AssumptionControl } from "./AssumptionControl";
import { KpiCard } from "./KpiCard";

type VerifiedAiGainCalculatorProps = {
  assumptions: Assumptions;
  onAssumptionChange: <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;
};

export function VerifiedAiGainCalculator({
  assumptions,
  onAssumptionChange
}: VerifiedAiGainCalculatorProps) {
  const outputs = calculateVerifiedAiGain(assumptions);
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
          <span className="mode-label">CFO-friendly verified calculation mode</span>
          <h3>Verified AI Gain Calculator</h3>
          <p>
            CFO-friendly source of truth for measured process-level AI gain.
            The default case is aligned to the Medium shortcut at roughly
            ¥60,000 per employee per year.
          </p>
        </div>
        {!outputs.canAllocate && (
          <div className="verified-warning">
            {outputs.allocationBlockers.join(" ")} No pension allocation is routed.
          </div>
        )}
      </div>

      <div className="verified-grid">
        <div className="verified-inputs">
          <h4>Process-level inputs</h4>
          <div className="control-grid">
            <AssumptionControl name="avoidedOvertimeCostM" label="Avoided overtime cost (O, JPY millions)" help="Verified avoided overtime cost" value={assumptions.avoidedOvertimeCostM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("avoidedOvertimeCostM", value)} />
            <AssumptionControl name="avoidedOutsourcingCostM" label="Avoided outsourcing / contractor cost (S, JPY millions)" help="Verified avoided external labor cost" value={assumptions.avoidedOutsourcingCostM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("avoidedOutsourcingCostM", value)} />
            <AssumptionControl name="qualitySavingsM" label="Quality / rework / compliance savings (Q, JPY millions)" help="Verified reduction in error-related cost" value={assumptions.qualitySavingsM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("qualitySavingsM", value)} />
            <AssumptionControl name="incrementalContributionMarginM" label="Evidenced incremental contribution margin (M, JPY millions)" help="Throughput margin only where evidenced" value={assumptions.incrementalContributionMarginM} min={0} max={20000} step={100} onChange={(value) => onAssumptionChange("incrementalContributionMarginM", value)} />
            <AssumptionControl name="incrementalAiRelatedCostsM" label="Incremental AI-related costs (A, JPY millions)" help="Licenses, cloud, integration, training, security, maintenance, change management" value={assumptions.incrementalAiRelatedCostsM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("incrementalAiRelatedCostsM", value)} />
            <AssumptionControl name="evidenceAdjustmentRate" label="Evidence adjustment rate (a)" help="% conservative haircut" value={assumptions.evidenceAdjustmentRate} min={0} max={60} step={1} onChange={(value) => onAssumptionChange("evidenceAdjustmentRate", value)} />
            <AssumptionControl name="allocationRate" label="Allocation rate" help="% of verified gain to pension value" value={assumptions.allocationRate} min={0} max={10} step={0.25} onChange={(value) => onAssumptionChange("allocationRate", value)} />
            <AssumptionControl name="eligibleEmployees" label="Eligible employees (E)" help="Pre-agreed allocation population" value={assumptions.eligibleEmployees} min={0} max={100000} step={1000} onChange={(value) => onAssumptionChange("eligibleEmployees", value)} />
          </div>
          <div className="gate-grid">
            <label className="gate-check">
              <input
                type="checkbox"
                checked={assumptions.qualityGatePassed}
                onChange={(event) => onAssumptionChange("qualityGatePassed", event.target.checked)}
              />
              <span>Quality gate passed</span>
            </label>
            <label className="gate-check">
              <input
                type="checkbox"
                checked={assumptions.allocationPopulationAgreed}
                onChange={(event) => onAssumptionChange("allocationPopulationAgreed", event.target.checked)}
              />
              <span>Allocation population agreed before measurement</span>
            </label>
          </div>
        </div>

        <div className="verified-results">
          <h4>Verified outputs</h4>
          <div className="metric-grid">
            <KpiCard label="Eligible gross gain" value={formatYen(outputs.eligibleGrossGain)} note="O + S + Q + M." />
            <KpiCard label="Adjusted gross AI gain" value={formatYen(outputs.adjustedGrossAiGain)} note="Eligible gross gain after evidence adjustment rate." accent="blue" />
            <KpiCard label="Net verified AI gain" value={formatYen(outputs.netVerifiedAiGain)} note="Adjusted gain after incremental AI-related costs." accent={outputs.hasVerifiedGain ? "teal" : "coral"} />
            <KpiCard label="Pension allocation" value={formatYen(outputs.pensionAllocation)} note="Small pre-agreed share converted into pension value." accent="amber" />
            <KpiCard label="Company retained gain" value={formatYen(outputs.companyRetainedGain)} note="Verified gain retained by the company after pension allocation." accent="indigo" />
            <KpiCard label="Pension value / employee" value={formatYen(outputs.pensionValuePerEmployee)} note="Pension allocation divided by covered employees." accent="blue" />
          </div>
          <div className="verified-split" aria-label="Company retained gain versus pension allocation">
            <div className="verified-split-bar">
              <span style={{ width: `${retainedPercent}%` }} />
              <i style={{ width: `${pensionPercent}%` }} />
            </div>
            <div className="verified-split-labels">
              <b>Company retained: {retainedPercent.toFixed(1)}%</b>
              <b>Pension allocation: {pensionPercent.toFixed(1)}%</b>
            </div>
          </div>
          <p className="verified-retention-note">
            The company keeps most of the verified AI gain. Only a small pre-agreed
            share is converted into pension value.
          </p>
          <button
            className="action-btn primary"
            type="button"
            disabled={!outputs.hasVerifiedGain}
            onClick={applyToQuickScenario}
          >
            Copy to Quick Mode inputs
          </button>
          <p className="source-note">
            Copies verified per-employee gain, allocation rate, and employee count
            into the quick calculator only. Low / Medium / High remain illustrative
            adoption scenarios, not verified pilot results.
          </p>
        </div>
      </div>

      <div className="verified-support">
        <div className="trust-boundary" aria-label="Trust boundary">
          <b>Trust boundary</b>
          <span>Not a donation</span>
          <span>Not a tax</span>
          <span>No existing-profit haircut</span>
          <span>Verified new AI gains only</span>
        </div>

        <details className="calculation-method">
          <summary>View calculation method</summary>
          <div>
            <FormulaLine label="Eligible Gross Gain" formula="O + S + Q + M" />
            <FormulaLine label="Adjusted Gross AI Gain" formula="Eligible Gross Gain × (1 - a)" />
            <FormulaLine label="Net Verified AI Gain" formula="max(0, Eligible Gross Gain × (1 - a) - A)" />
            <FormulaLine label="Pension Allocation" formula="Net Verified AI Gain × d, only when both gates pass" />
            <FormulaLine label="Company Retained Gain" formula="Net Verified AI Gain - Pension Allocation" />
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
