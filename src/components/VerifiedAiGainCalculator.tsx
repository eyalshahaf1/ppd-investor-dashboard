import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";
import { AssumptionControl } from "./AssumptionControl";
import { KpiCard } from "./KpiCard";

type VerifiedAiGainCalculatorProps = {
  assumptions: Assumptions;
  onAssumptionChange: (key: keyof Assumptions, value: number) => void;
};

export function VerifiedAiGainCalculator({
  assumptions,
  onAssumptionChange
}: VerifiedAiGainCalculatorProps) {
  const outputs = calculateVerifiedAiGain(assumptions);

  function applyToQuickScenario() {
    if (!outputs.hasVerifiedGain || assumptions.verifiedEmployeesCovered <= 0) return;
    onAssumptionChange("coveredEmployees", assumptions.verifiedEmployeesCovered);
    onAssumptionChange(
      "gainPerEmployee",
      Math.round(outputs.netVerifiedAiGain / assumptions.verifiedEmployeesCovered)
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
            CFO-friendly source of truth for measured process-level AI gain. The
            company keeps most of the verified AI gain; only a small pre-agreed
            share is converted into pension value. The default case is aligned
            to the Medium shortcut at roughly ¥60,000 per employee per year.
          </p>
        </div>
        {!outputs.hasVerifiedGain && (
          <div className="verified-warning">No verified gain, no pension allocation.</div>
        )}
      </div>

      <div className="verified-grid">
        <div className="verified-inputs">
          <h4>Inputs</h4>
          <div className="control-grid">
            <AssumptionControl name="baselineAnnualProcessCostM" label="Baseline annual process cost (JPY millions)" help="Example: 25000 = ¥25.0B" value={assumptions.baselineAnnualProcessCostM} min={0} max={50000} step={100} onChange={(value) => onAssumptionChange("baselineAnnualProcessCostM", value)} />
            <AssumptionControl name="postAiAnnualProcessCostM" label="Post-AI annual process cost (JPY millions)" help="Example: 10000 = ¥10.0B" value={assumptions.postAiAnnualProcessCostM} min={0} max={50000} step={100} onChange={(value) => onAssumptionChange("postAiAnnualProcessCostM", value)} />
            <AssumptionControl name="verifiedAnnualAiCostsM" label="Annual AI costs (JPY millions)" help="Example: 1500 = ¥1.5B" value={assumptions.verifiedAnnualAiCostsM} min={0} max={10000} step={50} onChange={(value) => onAssumptionChange("verifiedAnnualAiCostsM", value)} />
            <AssumptionControl name="adjustmentRate" label="Adjustment rate" help="% haircut for evidence quality" value={assumptions.adjustmentRate} min={0} max={60} step={1} onChange={(value) => onAssumptionChange("adjustmentRate", value)} />
            <AssumptionControl name="allocationRate" label="Allocation rate" help="% of verified gain to pension value" value={assumptions.allocationRate} min={0} max={10} step={0.25} onChange={(value) => onAssumptionChange("allocationRate", value)} />
            <AssumptionControl name="verifiedEmployeesCovered" label="Employees covered" help="employees eligible in this calculation" value={assumptions.verifiedEmployeesCovered} min={0} max={100000} step={1000} onChange={(value) => onAssumptionChange("verifiedEmployeesCovered", value)} />
          </div>
        </div>

        <div className="verified-results">
          <h4>Outputs</h4>
          <div className="metric-grid">
            <KpiCard label="Gross AI gain" value={formatYen(outputs.grossAiGain)} note="Baseline cost minus post-AI process cost." />
            <KpiCard label="Net verified AI gain" value={formatYen(outputs.netVerifiedAiGain)} note="Adjusted gain after AI costs." accent={outputs.hasVerifiedGain ? "teal" : "coral"} />
            <KpiCard label="Pension allocation" value={formatYen(outputs.pensionAllocation)} note="Small pre-agreed share converted into pension value." accent="amber" />
            <KpiCard label="Company retained gain" value={formatYen(outputs.companyRetainedGain)} note="Verified gain retained by the company after pension allocation." accent="indigo" />
            <KpiCard label="Pension value / employee" value={formatYen(outputs.pensionValuePerEmployee)} note="Pension allocation divided by covered employees." accent="blue" />
          </div>
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

      <div className="verified-formulas">
        <FormulaLine label="Gross AI Gain" formula="Baseline Annual Process Cost - Post-AI Annual Process Cost" />
        <FormulaLine label="Adjusted Gross AI Gain" formula="Gross AI Gain × (1 - Adjustment Rate)" />
        <FormulaLine label="Net Verified AI Gain" formula="Adjusted Gross AI Gain - Annual AI Costs" />
        <FormulaLine label="Pension Allocation" formula="Net Verified AI Gain × Allocation Rate" />
        <FormulaLine label="Company Retained Gain" formula="Net Verified AI Gain - Pension Allocation" />
      </div>

      <div className="verified-boundaries" aria-label="Verified gain boundaries">
        <span>This is not a donation.</span>
        <span>This is not a tax.</span>
        <span>It does not touch existing profit.</span>
        <span>Only newly created and verified AI productivity gains are eligible.</span>
      </div>
    </section>
  );
}

function FormulaLine({ label, formula }: { label: string; formula: string }) {
  return (
    <div>
      <b>{label}</b>
      <code>{formula}</code>
    </div>
  );
}
