import type { DashboardTab } from "./Tabs";

const workflowTabs = [
  {
    title: "Pilot Evidence",
    tab: "pilot"
  },
  {
    title: "Verified Ledger",
    tab: "calculator"
  },
  {
    title: "Investor Scenario",
    tab: "scenarios"
  },
  {
    title: "Partner Execution",
    tab: "data"
  }
] as const satisfies ReadonlyArray<{ title: string; tab: DashboardTab }>;

type PilotWorkflowTabsProps = {
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
};

export function PilotWorkflowTabs({ activeTab, onChange }: PilotWorkflowTabsProps) {
  return (
    <section className="pilot-workflow-strip" aria-label="PPD pilot workflow">
      <b className="pilot-workflow-label">Pilot workflow</b>
      {workflowTabs.map((step, index) => (
        <button
          className={activeTab === step.tab ? "active" : ""}
          key={step.title}
          type="button"
          aria-current={activeTab === step.tab ? "step" : undefined}
          onClick={() => onChange(step.tab)}
        >
          <span>{index + 1}</span>
          <b>{step.title}</b>
        </button>
      ))}
    </section>
  );
}
