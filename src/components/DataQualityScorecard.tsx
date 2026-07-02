import type { Language } from "@/lib/i18n";
import type { DataUpload } from "@/lib/types";

type DataQualityScorecardProps = {
  uploads: DataUpload[];
  language: Language;
};

type QualityMetric = {
  label: string;
  score: number;
  note: string;
};

const scorecardCopy = {
  en: {
    title: "Data quality / assurance score",
    body:
      "A customer pilot should not become a pension claim until evidence quality, baseline reliability, and partner readiness are visible.",
    overall: "Overall",
    metrics: {
      completeness: ["Data completeness", "Workflow evidence uploaded.", "Waiting for workflow evidence."],
      baseline: ["Baseline reliability", "Assurance evidence present.", "Needs baseline sampling."],
      aiCost: ["AI-cost evidence", "Finance-cost file present.", "Needs AI-cost support."],
      layoff: ["Layoff exclusion", "Guardrail documented for pilot review."],
      partner: ["Partner readiness", "Partner test payload uploaded.", "Partner dry-run pending."]
    }
  },
  ja: {
    title: "データ品質 / 保証スコア",
    body:
      "エビデンス品質、基準値の信頼性、パートナー準備状況が見えるまで、顧客パイロットを年金請求に進めません。",
    overall: "総合",
    metrics: {
      completeness: ["データ完全性", "業務エビデンスがアップロード済み。", "業務エビデンス待ち。"],
      baseline: ["基準値信頼性", "保証エビデンスがあります。", "基準値サンプリングが必要。"],
      aiCost: ["AIコストエビデンス", "財務コストファイルがあります。", "AIコスト証跡が必要。"],
      layoff: ["人員削減除外", "パイロットレビュー用のガードレールを記録済み。"],
      partner: ["パートナー準備", "パートナーテストペイロードがアップロード済み。", "パートナードライラン待ち。"]
    }
  }
} as const;

export function DataQualityScorecard({ uploads, language }: DataQualityScorecardProps) {
  const copy = scorecardCopy[language];
  const hasWorkflow = uploads.some((upload) => upload.upload_type === "workflow_metrics");
  const hasFinance = uploads.some((upload) => upload.upload_type === "finance_costs");
  const hasPartner = uploads.some((upload) => upload.upload_type === "partner_instruction_test");
  const hasAssurance = uploads.some((upload) => upload.upload_type === "assurance_evidence");

  const metrics: QualityMetric[] = [
    {
      label: copy.metrics.completeness[0],
      score: hasWorkflow ? 88 : 62,
      note: hasWorkflow ? copy.metrics.completeness[1] : copy.metrics.completeness[2]
    },
    {
      label: copy.metrics.baseline[0],
      score: hasAssurance ? 86 : 74,
      note: hasAssurance ? copy.metrics.baseline[1] : copy.metrics.baseline[2]
    },
    {
      label: copy.metrics.aiCost[0],
      score: hasFinance ? 84 : 58,
      note: hasFinance ? copy.metrics.aiCost[1] : copy.metrics.aiCost[2]
    },
    {
      label: copy.metrics.layoff[0],
      score: 92,
      note: copy.metrics.layoff[1]
    },
    {
      label: copy.metrics.partner[0],
      score: hasPartner ? 82 : 64,
      note: hasPartner ? copy.metrics.partner[1] : copy.metrics.partner[2]
    }
  ];

  const overall = Math.round(
    metrics.reduce((total, metric) => total + metric.score, 0) / metrics.length
  );

  return (
    <section className="span-12 panel">
      <div className="scorecard-head">
        <div>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </div>
        <div className="overall-score">
          <span>{copy.overall}</span>
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
