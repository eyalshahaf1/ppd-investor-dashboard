"use client";

import { useEffect, useState } from "react";
import { projectScenario } from "@/lib/calculations";
import { scenarios } from "@/lib/defaults";
import { formatEmployees, formatYen } from "@/lib/format";
import { getCopy, type Language } from "@/lib/i18n";
import type { Assumptions, ScenarioKey } from "@/lib/types";
import { KpiCard } from "./KpiCard";
import { ProjectionChart } from "./ProjectionChart";
import { ScenarioComparisonPanel } from "./ScenarioComparisonPanel";

type ScenarioViewProps = {
  assumptions: Assumptions;
  activeScenario: ScenarioKey;
  language: Language;
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
  language,
  onScenarioChange,
  onApplyAssumptions
}: ScenarioViewProps) {
  const rows = projectScenario(activeScenario, assumptions);
  const y5 = rows[rows.length - 1];
  const copy = getCopy(language).scenario;
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
      name: `${copy.scenarioLabels[activeScenario]} - ${new Date().toLocaleDateString("en-GB")}`,
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
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        <div className="scenario-controls">
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              className={`scenario-btn ${activeScenario === key ? "active" : ""}`}
              type="button"
              onClick={() => onScenarioChange(key)}
            >
              {copy.scenarioLabels[key]}
            </button>
          ))}
        </div>
      </section>

      <section className="span-12 panel">
        <div className="chart-head">
          <div>
            <h3>{copy.savedWorkspaceTitle}</h3>
            <span className="source-note">{copy.savedWorkspaceNote}</span>
          </div>
          <button className="action-btn primary" type="button" onClick={saveCurrentScenario}>
            {copy.saveCurrent}
          </button>
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
                  {saved.assumptions.coveredEmployees.toLocaleString("en-US")} {copy.savedScenarioMeta.employeesPerEmployer} ·{" "}
                  {saved.assumptions.employers} {copy.savedScenarioMeta.employers} · {saved.assumptions.dividendRate.toFixed(1)}% {copy.savedScenarioMeta.rule}
                </p>
                <div className="saved-scenario-actions">
                  <button className="action-btn" type="button" onClick={() => applySavedScenario(saved)}>
                    {copy.apply}
                  </button>
                  <button className="action-btn" type="button" onClick={() => deleteSavedScenario(saved.id)}>
                    {copy.delete}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="source-note">
            {copy.emptySaved}
          </p>
        )}
      </section>

      <ScenarioComparisonPanel
        assumptions={assumptions}
        activeScenario={activeScenario}
        language={language}
        onScenarioChange={onScenarioChange}
      />

      <section className="span-8 panel chart-frame">
        <div className="chart-head">
          <h3>{copy.scenarioLabels[activeScenario]} {copy.projectionSuffix}</h3>
          <div className="legend">
            <span><i />{copy.annualContributions}</span>
            <span className="aum"><i />{copy.endYearAumTracked}</span>
            <span className="revenue"><i />{copy.platformRevenue}</span>
          </div>
        </div>
        <ProjectionChart rows={rows} />
      </section>

      <aside className="span-4 panel">
        <h3>{copy.snapshotTitle}</h3>
        <div className="metric-grid single">
          <KpiCard label={copy.snapshotKpis[0][0]} value={formatEmployees(y5.employees)} note={copy.snapshotKpis[0][1]} />
          <KpiCard label={copy.snapshotKpis[1][0]} value={formatYen(y5.annualContribution)} note={copy.snapshotKpis[1][1]} accent="amber" />
          <KpiCard label={copy.snapshotKpis[2][0]} value={formatYen(y5.platformRevenue)} note={copy.snapshotKpis[2][1]} accent="indigo" />
        </div>
        <div className="callout">
          <h3>{copy.investorSafeTitle}</h3>
          <p>{copy.investorSafeBody}</p>
        </div>
      </aside>

      <section className="span-12 panel">
        <h3>{copy.tableTitle}</h3>
        <table className="data-table">
          <thead>
            <tr>
              {copy.tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
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
