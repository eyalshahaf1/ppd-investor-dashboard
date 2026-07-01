import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";

type ProductivityWaterfallChartProps = {
  assumptions: Assumptions;
  className?: string;
};

type WaterfallStep = {
  label: string;
  value: number;
  kind: "positive" | "negative" | "total" | "allocation";
};

export function ProductivityWaterfallChart({ assumptions, className = "" }: ProductivityWaterfallChartProps) {
  const verified = calculateVerifiedAiGain(assumptions);
  const steps: WaterfallStep[] = [
    { label: "O", value: assumptions.avoidedOvertimeCostM * 1000000, kind: "positive" },
    { label: "S", value: assumptions.avoidedOutsourcingCostM * 1000000, kind: "positive" },
    { label: "Q", value: assumptions.qualitySavingsM * 1000000, kind: "positive" },
    { label: "M", value: assumptions.incrementalContributionMarginM * 1000000, kind: "positive" },
    { label: "Adjustment", value: -(verified.eligibleGrossGain - verified.adjustedGrossAiGain), kind: "negative" },
    { label: "AI costs", value: -assumptions.incrementalAiRelatedCostsM * 1000000, kind: "negative" },
    { label: "Net verified gain", value: verified.netVerifiedAiGain, kind: "total" },
    { label: "Pension allocation", value: verified.pensionAllocation, kind: "allocation" }
  ];

  const maxValue = Math.max(1, ...steps.map((step) => Math.abs(step.value)));

  return (
    <section className={`span-6 panel chart-frame ${className}`}>
      <div className="chart-head">
        <div>
          <h3>Productivity gain waterfall</h3>
          <p>
            Shows how documented O/S/Q/M outcomes, conservative adjustment, and
            AI-related costs become net verified gain and pension allocation.
          </p>
        </div>
      </div>
      <div className="waterfall-chart" role="img" aria-label="Productivity gain waterfall chart">
        {steps.map((step) => (
          <div className="waterfall-step" key={step.label}>
            <div className="waterfall-bar-shell">
              <div
                className={`waterfall-bar ${step.kind}`}
                style={{ height: `${Math.max(7, (Math.abs(step.value) / maxValue) * 100)}%` }}
              />
            </div>
            <b>{formatYen(step.value)}</b>
            <span>{step.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
