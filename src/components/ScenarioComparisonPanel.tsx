import { buildScenarioSummaries } from "@/lib/productFeatures";
import { formatEmployees, formatYen } from "@/lib/format";
import type { Assumptions, ScenarioKey } from "@/lib/types";

type ScenarioComparisonPanelProps = {
  assumptions: Assumptions;
  activeScenario: ScenarioKey;
  onScenarioChange: (scenario: ScenarioKey) => void;
};

export function ScenarioComparisonPanel({
  assumptions,
  activeScenario,
  onScenarioChange
}: ScenarioComparisonPanelProps) {
  const summaries = buildScenarioSummaries(assumptions);
  const maxContribution = Math.max(...summaries.map((summary) => summary.y5AnnualContribution));

  return (
    <section className="span-12 panel">
      <div className="chart-head">
        <h3>Scenario comparison cockpit</h3>
        <div className="legend">
          <span><i />Y5 contribution flow</span>
          <span className="aum"><i />Y5 AUM influenced</span>
          <span className="revenue"><i />Y5 platform revenue</span>
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
            <span>{summary.label}</span>
            <strong>{formatYen(summary.y5AnnualContribution)}</strong>
            <div className="compare-bar-track">
              <div
                className="compare-bar-fill"
                style={{ width: `${(summary.y5AnnualContribution / maxContribution) * 100}%` }}
              />
            </div>
            <dl>
              <div>
                <dt>Employees</dt>
                <dd>{formatEmployees(summary.y5Employees)}</dd>
              </div>
              <div>
                <dt>AUM</dt>
                <dd>{formatYen(summary.y5Aum)}</dd>
              </div>
              <div>
                <dt>Revenue</dt>
                <dd>{formatYen(summary.y5PlatformRevenue)}</dd>
              </div>
            </dl>
          </button>
        ))}
      </div>
    </section>
  );
}
