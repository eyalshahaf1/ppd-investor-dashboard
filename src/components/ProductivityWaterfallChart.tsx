import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";

type ProductivityWaterfallChartProps = {
  assumptions: Assumptions;
  language: Language;
  className?: string;
};

type WaterfallStep = {
  label: string;
  value: number;
  kind: "positive" | "negative" | "total" | "allocation";
};

const waterfallCopy = {
  en: {
    title: "Productivity gain waterfall",
    body:
      "Shows how documented O/S/Q/M outcomes, conservative adjustment, and AI-related costs become net verified gain and pension allocation.",
    aria: "Productivity gain waterfall chart",
    adjustment: "Adjustment",
    aiCosts: "AI costs",
    netVerifiedGain: "Net verified gain",
    pensionAllocation: "Pension allocation"
  },
  ja: {
    title: "生産性効果ウォーターフォール",
    body:
      "文書化されたO/S/Q/M成果、保守的な調整、AI関連コストが、検証済み純効果と年金配分へ変わる流れを示します。",
    aria: "生産性効果ウォーターフォールチャート",
    adjustment: "調整",
    aiCosts: "AIコスト",
    netVerifiedGain: "検証済み純効果",
    pensionAllocation: "年金配分"
  }
} as const;

export function ProductivityWaterfallChart({
  assumptions,
  language,
  className = ""
}: ProductivityWaterfallChartProps) {
  const verified = calculateVerifiedAiGain(assumptions);
  const copy = waterfallCopy[language];
  const steps: WaterfallStep[] = [
    { label: "O", value: assumptions.avoidedOvertimeCostM * 1000000, kind: "positive" },
    { label: "S", value: assumptions.avoidedOutsourcingCostM * 1000000, kind: "positive" },
    { label: "Q", value: assumptions.qualitySavingsM * 1000000, kind: "positive" },
    { label: "M", value: assumptions.incrementalContributionMarginM * 1000000, kind: "positive" },
    { label: copy.adjustment, value: -(verified.eligibleGrossGain - verified.adjustedGrossAiGain), kind: "negative" },
    { label: copy.aiCosts, value: -assumptions.incrementalAiRelatedCostsM * 1000000, kind: "negative" },
    { label: copy.netVerifiedGain, value: verified.netVerifiedAiGain, kind: "total" },
    { label: copy.pensionAllocation, value: verified.pensionAllocation, kind: "allocation" }
  ];

  const maxValue = Math.max(1, ...steps.map((step) => Math.abs(step.value)));

  return (
    <section className={`span-6 panel chart-frame ${className}`}>
      <div className="chart-head">
        <div>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </div>
      </div>
      <div className="waterfall-chart" role="img" aria-label={copy.aria}>
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
