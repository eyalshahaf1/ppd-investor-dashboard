import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";

type PilotEvidenceChartProps = {
  assumptions: Assumptions;
};

type EvidenceMetric = {
  label: string;
  before: number;
  after: number;
  unit: string;
  direction: "up" | "down";
};

export function PilotEvidenceChart({ assumptions }: PilotEvidenceChartProps) {
  const costSavingsM = Math.max(
    1,
    assumptions.overtimeM + assumptions.outsourcingM + assumptions.qualityM
  );
  const aiCostShare = Math.min(100, (assumptions.aiCostM / costSavingsM) * 100);

  const metrics: EvidenceMetric[] = [
    { label: "Cycle time", before: 100, after: 82, unit: "index", direction: "down" },
    { label: "Volume handled", before: 100, after: 118, unit: "index", direction: "up" },
    { label: "Error / rework", before: 100, after: 71, unit: "index", direction: "down" },
    {
      label: "Overtime cost",
      before: assumptions.overtimeM,
      after: Math.max(0, assumptions.overtimeM * 0.72),
      unit: "yen",
      direction: "down"
    },
    { label: "AI cost", before: 0, after: aiCostShare, unit: "%", direction: "down" }
  ];

  return (
    <section className="span-12 panel">
      <div className="section-title">
        <div>
          <h2>Pilot evidence dashboard</h2>
          <p>
            A customer pilot should show operational proof before pension impact:
            faster cycles, higher throughput, lower rework, and explicit AI cost.
          </p>
        </div>
      </div>
      <div className="evidence-grid">
        {metrics.map((metric) => (
          <EvidenceBar metric={metric} key={metric.label} />
        ))}
      </div>
    </section>
  );
}

function EvidenceBar({ metric }: { metric: EvidenceMetric }) {
  const max = Math.max(1, metric.before, metric.after);
  const improved =
    metric.direction === "up" ? metric.after >= metric.before : metric.after <= metric.before;

  return (
    <article className="evidence-card">
      <div>
        <h3>{metric.label}</h3>
        <span className={improved ? "evidence-badge good" : "evidence-badge warn"}>
          {improved ? "Improved" : "Review"}
        </span>
      </div>
      <div className="evidence-bars">
        <EvidenceBarRow label="Before" value={metric.before} max={max} unit={metric.unit} />
        <EvidenceBarRow label="After AI" value={metric.after} max={max} unit={metric.unit} strong />
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
