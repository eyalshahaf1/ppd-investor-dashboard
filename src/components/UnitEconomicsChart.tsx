import { calculateEmployerEconomics } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";

type UnitEconomicsChartProps = {
  assumptions: Assumptions;
};

export function UnitEconomicsChart({ assumptions }: UnitEconomicsChartProps) {
  const economics = calculateEmployerEconomics(assumptions);
  const rows = [
    { label: "SaaS ARR", value: economics.saas, tone: "teal" },
    { label: "Instruction / reconciliation fee", value: economics.take, tone: "amber" },
    { label: "Verification revenue", value: economics.audit, tone: "blue" },
    { label: "Recurring gross profit", value: economics.recurringGrossProfit, tone: "indigo" },
    { label: "CAC", value: assumptions.cacM * 1000000 * assumptions.employers, tone: "coral" }
  ];
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <section className="span-6 panel">
      <div className="chart-head">
        <h3>Unit economics pulse</h3>
        <span className="source-note">Rollout-wide calculator output</span>
      </div>
      <div className="unit-economics-list">
        {rows.map((row) => (
          <div className="unit-row" key={row.label}>
            <div>
              <b>{row.label}</b>
              <span>{formatYen(row.value)}</span>
            </div>
            <div className="unit-track">
              <div
                className={`unit-fill ${row.tone}`}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="unit-foot">
        <b>{formatYen(economics.ltv)}</b>
        <span>Gross-profit LTV over {assumptions.retentionYears} years</span>
      </div>
    </section>
  );
}
