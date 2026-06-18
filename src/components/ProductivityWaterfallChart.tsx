import { calculateEmployerEconomics } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";

type ProductivityWaterfallChartProps = {
  assumptions: Assumptions;
};

type WaterfallStep = {
  label: string;
  value: number;
  kind: "positive" | "negative" | "total" | "allocation";
};

export function ProductivityWaterfallChart({ assumptions }: ProductivityWaterfallChartProps) {
  const economics = calculateEmployerEconomics(assumptions);
  const rolloutMultiplier = assumptions.employers;
  const savingsFromHours = assumptions.hoursSaved * assumptions.costPerHour * rolloutMultiplier;
  const steps: WaterfallStep[] = [
    { label: "Hours saved", value: savingsFromHours, kind: "positive" },
    { label: "Overtime", value: assumptions.overtimeM * 1000000 * rolloutMultiplier, kind: "positive" },
    { label: "Outsourcing", value: assumptions.outsourcingM * 1000000 * rolloutMultiplier, kind: "positive" },
    { label: "Quality", value: assumptions.qualityM * 1000000 * rolloutMultiplier, kind: "positive" },
    { label: "AI costs", value: -assumptions.aiCostM * 1000000 * rolloutMultiplier, kind: "negative" },
    { label: "Verified gain", value: economics.eligibleBase, kind: "total" },
    { label: "Pension pool", value: economics.retirementPool, kind: "allocation" }
  ];

  const maxValue = Math.max(1, ...steps.map((step) => Math.abs(step.value)));

  return (
    <section className="span-6 panel chart-frame">
      <div className="chart-head">
        <div>
          <h3>Productivity gain waterfall</h3>
          <p>
            Shows how the current verified gain assumption becomes the retirement
            dividend pool. Use the operational calculator above to update the
            verified gain base after pilot evidence is reviewed.
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
