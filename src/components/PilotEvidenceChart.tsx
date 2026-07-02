import { formatYen } from "@/lib/format";
import type { Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";

type PilotEvidenceChartProps = {
  assumptions: Assumptions;
  language: Language;
};

type EvidenceMetric = {
  label: string;
  before: number;
  after: number;
  unit: string;
  direction: "up" | "down";
};

const evidenceCopy = {
  en: {
    title: "Pilot evidence dashboard",
    body:
      "A customer pilot should show operational proof before pension impact: faster cycles, higher throughput, lower rework, and explicit AI cost.",
    improved: "Improved",
    review: "Review",
    before: "Before",
    afterAi: "After AI",
    metrics: ["Cycle time", "Volume handled", "Error / rework", "Overtime cost", "AI cost"]
  },
  ja: {
    title: "パイロットエビデンスダッシュボード",
    body:
      "顧客パイロットでは、年金インパクトの前に業務上の証拠を示します。サイクル短縮、処理量増加、手戻り削減、明示的なAIコストです。",
    improved: "改善",
    review: "要確認",
    before: "導入前",
    afterAi: "AI導入後",
    metrics: ["サイクル時間", "処理量", "エラー / 手戻り", "残業コスト", "AIコスト"]
  }
} as const;

export function PilotEvidenceChart({ assumptions, language }: PilotEvidenceChartProps) {
  const costSavingsM = Math.max(
    1,
    assumptions.overtimeM + assumptions.outsourcingM + assumptions.qualityM
  );
  const aiCostShare = Math.min(100, (assumptions.aiCostM / costSavingsM) * 100);
  const copy = evidenceCopy[language];

  const metrics: EvidenceMetric[] = [
    { label: copy.metrics[0], before: 100, after: 82, unit: "index", direction: "down" },
    { label: copy.metrics[1], before: 100, after: 118, unit: "index", direction: "up" },
    { label: copy.metrics[2], before: 100, after: 71, unit: "index", direction: "down" },
    {
      label: copy.metrics[3],
      before: assumptions.overtimeM,
      after: Math.max(0, assumptions.overtimeM * 0.72),
      unit: "yen",
      direction: "down"
    },
    { label: copy.metrics[4], before: 0, after: aiCostShare, unit: "%", direction: "down" }
  ];

  return (
    <section className="span-12 panel">
      <div className="section-title">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
      </div>
      <div className="evidence-grid">
        {metrics.map((metric) => (
          <EvidenceBar
            metric={metric}
            labels={{ improved: copy.improved, review: copy.review, before: copy.before, afterAi: copy.afterAi }}
            key={metric.label}
          />
        ))}
      </div>
    </section>
  );
}

function EvidenceBar({
  metric,
  labels
}: {
  metric: EvidenceMetric;
  labels: { improved: string; review: string; before: string; afterAi: string };
}) {
  const max = Math.max(1, metric.before, metric.after);
  const improved =
    metric.direction === "up" ? metric.after >= metric.before : metric.after <= metric.before;

  return (
    <article className="evidence-card">
      <div>
        <h3>{metric.label}</h3>
        <span className={improved ? "evidence-badge good" : "evidence-badge warn"}>
          {improved ? labels.improved : labels.review}
        </span>
      </div>
      <div className="evidence-bars">
        <EvidenceBarRow label={labels.before} value={metric.before} max={max} unit={metric.unit} />
        <EvidenceBarRow label={labels.afterAi} value={metric.after} max={max} unit={metric.unit} strong />
      </div>
    </article>
  );
}

function EvidenceBarRow({
  label,
  value,
  max,
  unit,
  strong = false
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  strong?: boolean;
}) {
  const display = unit === "yen" ? formatYen(value * 1000000) : `${Math.round(value)}${unit === "%" ? "%" : ""}`;

  return (
    <div className="evidence-row">
      <span>{label}</span>
      <div className="evidence-track">
        <div
          className={`evidence-fill ${strong ? "strong" : ""}`}
          style={{ width: `${Math.max(4, (value / max) * 100)}%` }}
        />
      </div>
      <b>{display}</b>
    </div>
  );
}
