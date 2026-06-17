import { projectScenario } from "@/lib/calculations";
import { scenarios } from "@/lib/defaults";
import { formatEmployees, formatYen } from "@/lib/format";
import type { Assumptions, ScenarioKey } from "@/lib/types";
import { KpiCard } from "./KpiCard";
import { ProjectionChart } from "./ProjectionChart";

type ScenarioViewProps = {
  assumptions: Assumptions;
  activeScenario: ScenarioKey;
  onScenarioChange: (scenario: ScenarioKey) => void;
};

export function ScenarioView({
  assumptions,
  activeScenario,
  onScenarioChange
}: ScenarioViewProps) {
  const rows = projectScenario(activeScenario, assumptions);
  const y5 = rows[rows.length - 1];

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>Adoption scenarios and five-year projection</h2>
          <p>
            Switch between source scenarios. Medium uses the full source trajectory:
            30k, 150k, 500k, 1.2M, and 2.0M covered employees.
          </p>
        </div>
        <div className="scenario-controls">
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              className={`scenario-btn ${activeScenario === key ? "active" : ""}`}
              type="button"
              onClick={() => onScenarioChange(key)}
            >
              {scenarios[key].label.replace(" adoption", "")}
            </button>
          ))}
        </div>
      </section>

      <section className="span-8 panel chart-frame">
        <div className="chart-head">
          <h3>{scenarios[activeScenario].label} projection</h3>
          <div className="legend">
            <span><i />Annual contributions</span>
            <span className="aum"><i />End-year AUM tracked</span>
            <span className="revenue"><i />Platform revenue</span>
          </div>
        </div>
        <ProjectionChart rows={rows} />
      </section>

      <aside className="span-4 panel">
        <h3>Scenario snapshot</h3>
        <div className="metric-grid single">
          <KpiCard label="Y5 covered employees" value={formatEmployees(y5.employees)} note="Scale assumption at year five." />
          <KpiCard label="Y5 annual contributions" value={formatYen(y5.annualContribution)} note="Retirement value created in year five." accent="amber" />
          <KpiCard label="Y5 platform revenue" value={formatYen(y5.platformRevenue)} note="Startup revenue earned from the platform model." accent="indigo" />
        </div>
        <div className="callout">
          <h3>Investor-safe phrasing</h3>
          <p>
            AUM tracked means assets verified through the program. The startup should
            not imply that it legally manages pension assets.
          </p>
        </div>
      </aside>

      <section className="span-12 panel">
        <h3>Projection table</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Employees</th>
              <th>Annual contribution</th>
              <th>End-year AUM tracked</th>
              <th>Platform revenue</th>
              <th>New employers</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{formatEmployees(row.employees)}</td>
                <td>{formatYen(row.annualContribution)}</td>
                <td>{formatYen(row.aum)}</td>
                <td>{formatYen(row.platformRevenue)}</td>
                <td>{row.newEmployers.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

