import { calculateEmployerEconomics } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";

type UnitEconomicsChartProps = {
  assumptions: Assumptions;
  language: Language;
};

const unitCopy = {
  en: {
    title: "Unit economics pulse",
    note: "Rollout-wide calculator output",
    rows: [
      "SaaS ARR",
      "Instruction / reconciliation fee",
      "Verification revenue",
      "Recurring gross profit",
      "CAC"
    ],
    ltv: "Gross-profit LTV over {years} years"
  },
  ja: {
    title: "ユニットエコノミクス",
    note: "展開全体の計算出力",
    rows: [
      "SaaS年間経常収益",
      "指示 / 照合フィー",
      "検証収益",
      "継続粗利益",
      "CAC"
    ],
    ltv: "{years}年間の粗利益LTV"
  }
} as const;

export function UnitEconomicsChart({ assumptions, language }: UnitEconomicsChartProps) {
  const economics = calculateEmployerEconomics(assumptions);
  const copy = unitCopy[language];
  const rows = [
    { label: copy.rows[0], value: economics.saas, tone: "teal" },
    { label: copy.rows[1], value: economics.take, tone: "amber" },
    { label: copy.rows[2], value: economics.audit, tone: "blue" },
    { label: copy.rows[3], value: economics.recurringGrossProfit, tone: "indigo" },
    { label: copy.rows[4], value: assumptions.cacM * 1000000 * assumptions.employers, tone: "coral" }
  ];
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <section className="span-6 panel">
      <div className="chart-head">
        <h3>{copy.title}</h3>
        <span className="source-note">{copy.note}</span>
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
        <span>{copy.ltv.replace("{years}", assumptions.retentionYears.toString())}</span>
      </div>
    </section>
  );
}
