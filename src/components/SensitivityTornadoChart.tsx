import { calculateEmployerEconomics } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";

type SensitivityTornadoChartProps = {
  assumptions: Assumptions;
  className?: string;
};

type NumericAssumptionKey = {
  [Key in keyof Assumptions]: Assumptions[Key] extends number ? Key : never;
}[keyof Assumptions];

type SensitivityInput = {
  key: NumericAssumptionKey;
  label: string;
  swing: number;
  floor?: number;
};

const sensitivityInputs: SensitivityInput[] = [
  { key: "gainPerEmployee", label: "Gain / employee", swing: 0.2, floor: 0 },
  { key: "dividendRate", label: "Dividend rule", swing: 0.2, floor: 0 },
  { key: "coveredEmployees", label: "Covered employees", swing: 0.2, floor: 1 },
  { key: "monthlySaas", label: "SaaS fee", swing: 0.2, floor: 0 },
  { key: "takeRate", label: "Instruction fee", swing: 0.2, floor: 0 }
];

export function SensitivityTornadoChart({ assumptions, className = "" }: SensitivityTornadoChartProps) {
  const base = calculateEmployerEconomics(assumptions).retirementPool;
  const rows = sensitivityInputs
    .map((input) => {
      const lowAssumptions = {
        ...assumptions,
        [input.key]: Math.max(input.floor ?? 0, assumptions[input.key] * (1 - input.swing))
      };
      const highAssumptions = {
        ...assumptions,
        [input.key]: assumptions[input.key] * (1 + input.swing)
      };
      const low = calculateEmployerEconomics(lowAssumptions).retirementPool - base;
      const high = calculateEmployerEconomics(highAssumptions).retirementPool - base;
      const impact = Math.max(Math.abs(low), Math.abs(high));

      return {
        label: input.label,
        low,
        high,
        impact
      };
    })
    .sort((a, b) => b.impact - a.impact);

  const maxImpact = Math.max(1, ...rows.map((row) => row.impact));

  return (
    <section className={`span-6 panel chart-frame ${className}`}>
      <div className="chart-head">
        <div>
          <h3>Sensitivity tornado</h3>
          <p>Impact on annual retirement pool when each assumption moves.</p>
        </div>
      </div>
      <div className="tornado-chart" role="img" aria-label="Sensitivity tornado chart">
        {rows.map((row) => (
          <div className="tornado-row" key={row.label}>
            <span>{row.label}</span>
            <div className="tornado-track">
              <div
                className="tornado-bar low"
                style={{ width: `${(Math.abs(row.low) / maxImpact) * 50}%` }}
              />
              <i />
              <div
                className="tornado-bar high"
                style={{ width: `${(Math.abs(row.high) / maxImpact) * 50}%` }}
              />
            </div>
            <b>{formatYen(row.impact)}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
