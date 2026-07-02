import { calculateEmployerEconomics } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";

type SensitivityTornadoChartProps = {
  assumptions: Assumptions;
  language: Language;
  className?: string;
};

type NumericAssumptionKey = {
  [Key in keyof Assumptions]: Assumptions[Key] extends number ? Key : never;
}[keyof Assumptions];

type SensitivityInput = {
  key: NumericAssumptionKey;
  labelKey: keyof typeof tornadoLabels.en;
  swing: number;
  floor?: number;
};

const tornadoLabels = {
  en: {
    gainPerEmployee: "Gain / employee",
    dividendRate: "Dividend rule",
    coveredEmployees: "Covered employees",
    monthlySaas: "SaaS fee",
    takeRate: "Instruction fee"
  },
  ja: {
    gainPerEmployee: "従業員あたり効果",
    dividendRate: "配分ルール",
    coveredEmployees: "対象従業員数",
    monthlySaas: "SaaS料金",
    takeRate: "指示フィー"
  }
} as const;

const tornadoCopy = {
  en: {
    title: "Sensitivity tornado",
    body: "Impact on annual retirement pool when each assumption moves.",
    aria: "Sensitivity tornado chart"
  },
  ja: {
    title: "感応度トルネード",
    body: "各前提が変動した場合の年間年金原資への影響。",
    aria: "感応度トルネードチャート"
  }
} as const;

const sensitivityInputs: SensitivityInput[] = [
  { key: "gainPerEmployee", labelKey: "gainPerEmployee", swing: 0.2, floor: 0 },
  { key: "dividendRate", labelKey: "dividendRate", swing: 0.2, floor: 0 },
  { key: "coveredEmployees", labelKey: "coveredEmployees", swing: 0.2, floor: 1 },
  { key: "monthlySaas", labelKey: "monthlySaas", swing: 0.2, floor: 0 },
  { key: "takeRate", labelKey: "takeRate", swing: 0.2, floor: 0 }
];

export function SensitivityTornadoChart({
  assumptions,
  language,
  className = ""
}: SensitivityTornadoChartProps) {
  const base = calculateEmployerEconomics(assumptions).retirementPool;
  const copy = tornadoCopy[language];
  const labels = tornadoLabels[language];
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
        label: labels[input.labelKey],
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
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </div>
      </div>
      <div className="tornado-chart" role="img" aria-label={copy.aria}>
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
