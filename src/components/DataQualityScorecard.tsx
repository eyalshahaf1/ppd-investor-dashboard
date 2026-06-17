import type { DataUpload } from "@/lib/types";

type DataQualityScorecardProps = {
  uploads: DataUpload[];
};

type QualityMetric = {
  label: string;
  score: number;
  note: string;
};

export function DataQualityScorecard({ uploads }: DataQualityScorecardProps) {
  const hasWorkflow = uploads.some((upload) => upload.upload_type === "workflow_metrics");
  const hasFinance = uploads.some((upload) => upload.upload_type === "finance_costs");
  const hasPartner = uploads.some((upload) => upload.upload_type === "partner_instruction_test");
  const hasAssurance = uploads.some((upload) => upload.upload_type === "assurance_evidence");

  const metrics: QualityMetric[] = [
    {
      label: "Data completeness",
      score: hasWorkflow ? 88 : 62,
      note: hasWorkflow ? "Workflow evidence uploaded." : "Waiting for workflow evidence."
    },
    {
      label: "Baseline reliability",
      score: hasAssurance ? 86 : 74,
      note: hasAssurance ? "Assurance evidence present." : "Needs baseline sampling."
    },
    {
      label: "AI-cost evidence",
      score: hasFinance ? 84 : 58,
      note: hasFinance ? "Finance-cost file present." : "Needs AI-cost support."
    },
    {
      label: "Layoff exclusion",
      score: 92,
      note: "Guardrail documented for pilot review."
    },
    {
      label: "Partner readiness",
      score: hasPartner ? 82 : 64,
      note: hasPartner ? "Partner test payload uploaded." : "Partner dry-run pending."
    }
  ];

  const overall = Math.round(
    metrics.reduce((total, metric) => total + metric.score, 0) / metrics.length
  );

  return (
    <section className="span-12 panel">
      <div className="scorecard-head">
        <div>
          <h3>Data quality / assurance score</h3>
          <p>
            A customer pilot should not become a pension claim until evidence
            quality, baseline reliability, and partner readiness are visible.
          </p>
        </div>
        <div className="overall-score">
          <span>Overall</span>
          <strong>{overall}</strong>
        </div>
      </div>

      <div className="quality-grid">
        {metrics.map((metric) => (
          <article className="quality-row" key={metric.label}>
            <div>
              <b>{metric.label}</b>
              <span>{metric.note}</span>
            </div>
            <div className="quality-meter">
              <div style={{ width: `${metric.score}%` }} />
            </div>
            <strong>{metric.score}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
