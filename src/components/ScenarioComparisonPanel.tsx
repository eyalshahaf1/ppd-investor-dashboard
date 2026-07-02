import { buildScenarioSummaries } from "@/lib/productFeatures";
import { formatEmployees, formatYen } from "@/lib/format";
import { getCopy, type Language } from "@/lib/i18n";
import type { Assumptions, ScenarioKey } from "@/lib/types";

type ScenarioComparisonPanelProps = {
  assumptions: Assumptions;
  activeScenario: ScenarioKey;
  language: Language;
  onScenarioChange: (scenario: ScenarioKey) => void;
};

export function ScenarioComparisonPanel({
  assumptions,
  activeScenario,
  language,
  onScenarioChange
}: ScenarioComparisonPanelProps) {
  const summaries = buildScenarioSummaries(assumptions);
  const maxContribution = Math.max(...summaries.map((summary) => summary.y5AnnualContribution));
  const copy = getCopy(language).scenario;

  return (
    <section className="span-12 panel">
      <div className="chart-head">
        <div>
          <h3>{copy.comparisonTitle}</h3>
          <p className="source-note">
            {copy.comparisonBody}
          </p>
        </div>
        <div className="legend">
          <span><i />{copy.y5ContributionFlow}</span>
          <span className="aum"><i />{copy.y5AumInfluenced}</span>
          <span className="revenue"><i />{copy.y5PlatformRevenue}</span>
        </div>
      </div>

      <div className="scenario-compare-grid">
        {summaries.map((summary) => (
          <button
            className={`scenario-compare-card ${activeScenario === summary.key ? "active" : ""}`}
            key={summary.key}
            type="button"
            onClick={() => onScenarioChange(summary.key)}
          >
            <span>{copy.scenarioLabels[summary.key]}</span>
            <strong>{formatYen(summary.y5AnnualContribution)}</strong>
            <div className="compare-bar-track">
              <div
                className="compare-bar-fill"
                style={{ width: `${(summary.y5AnnualContribution / maxContribution) * 100}%` }}
              />
            </div>
            <dl>
              <div>
                <dt>{copy.metricLabels.employees}</dt>
                <dd>{formatEmployees(summary.y5Employees)}</dd>
              </div>
              <div>
                <dt>{copy.metricLabels.aum}</dt>
                <dd>{formatYen(summary.y5Aum)}</dd>
              </div>
              <div>
                <dt>{copy.metricLabels.revenue}</dt>
                <dd>{formatYen(summary.y5PlatformRevenue)}</dd>
              </div>
            </dl>
          </button>
        ))}
      </div>
    </section>
  );
}
