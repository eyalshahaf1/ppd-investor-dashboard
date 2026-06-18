"use client";

import { useEffect, useState } from "react";
import { projectScenario } from "@/lib/calculations";
import { scenarios } from "@/lib/defaults";
import { formatEmployees, formatYen } from "@/lib/format";
import type { Assumptions, ScenarioKey } from "@/lib/types";
import { KpiCard } from "./KpiCard";
import { ProjectionChart } from "./ProjectionChart";
import { ScenarioComparisonPanel } from "./ScenarioComparisonPanel";

type ScenarioViewProps = {
  assumptions: Assumptions;
  activeScenario: ScenarioKey;
  onScenarioChange: (scenario: ScenarioKey) => void;
  onApplyAssumptions: (assumptions: Assumptions) => void;
};

type SavedScenario = {
  id: string;
  name: string;
  scenario: ScenarioKey;
  assumptions: Assumptions;
  createdAt: number;
};

const savedScenarioKey = "ppd-saved-scenarios";

export function ScenarioView({
  assumptions,
  activeScenario,
  onScenarioChange,
  onApplyAssumptions
}: ScenarioViewProps) {
  const rows = projectScenario(activeScenario, assumptions);
  const y5 = rows[rows.length - 1];
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(savedScenarioKey);
      if (stored) setSavedScenarios(JSON.parse(stored) as SavedScenario[]);
    } catch {
      setSavedScenarios([]);
    }
  }, []);

  function persistSavedScenarios(next: SavedScenario[]) {
    setSavedScenarios(next);
    window.localStorage.setItem(savedScenarioKey, JSON.stringify(next));
  }

  function saveCurrentScenario() {
    const next: SavedScenario = {
      id: `${Date.now()}`,
      name: `${scenarios[activeScenario].label} - ${new Date().toLocaleDateString("en-GB")}`,
      scenario: activeScenario,
      assumptions,
      createdAt: Date.now()
    };
    persistSavedScenarios([next, ...savedScenarios].slice(0, 6));
  }

  function applySavedScenario(saved: SavedScenario) {
    onScenarioChange(saved.scenario);
    onApplyAssumptions(saved.assumptions);
  }

  function deleteSavedScenario(id: string) {
    persistSavedScenarios(savedScenarios.filter((saved) => saved.id !== id));
  }

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
          <button className="scenario-btn" type="button" onClick={saveCurrentScenario}>
            Save scenario
          </button>
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

      <section className="span-12 panel">
        <div className="chart-head">
          <h3>Saved scenario workspace</h3>
          <span className="source-note">Local browser storage for investor demo prep</span>
        </div>
        {savedScenarios.length > 0 ? (
          <div className="saved-scenario-grid">
            {savedScenarios.map((saved) => (
              <article className="saved-scenario-card" key={saved.id}>
                <div>
                  <b>{saved.name}</b>
                  <span>{formatDate(saved.createdAt)}</span>
                </div>
                <p>
                  {saved.assumptions.coveredEmployees.toLocaleString("en-US")} employees per employer ·{" "}
                  {saved.assumptions.employers} employer(s) · {saved.assumptions.dividendRate.toFixed(1)}% rule
                </p>
                <div className="saved-scenario-actions">
                  <button className="action-btn" type="button" onClick={() => applySavedScenario(saved)}>
                    Apply
                  </button>
                  <button className="action-btn" type="button" onClick={() => deleteSavedScenario(saved.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="source-note">
            Save an assumption set before an investor meeting, then switch back to it during Q&A.
          </p>
        )}
      </section>

      <ScenarioComparisonPanel
        assumptions={assumptions}
        activeScenario={activeScenario}
        onScenarioChange={onScenarioChange}
      />

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

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(timestamp));
}
