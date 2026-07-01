import type { DashboardTab } from "./Tabs";

const workflowTabs = [
  {
    title: "Pilot Evidence",
    body: "Baseline, post-AI workflow change, and evidence quality.",
    tab: "pilot"
  },
  {
    title: "Verified Ledger",
    body: "Reconcile evidence into O, S, Q, M, A and calculate net gain.",
    tab: "calculator"
  },
  {
    title: "Investor Scenario",
    body: "Translate the verified logic into adoption and revenue cases.",
    tab: "scenarios"
  },
  {
    title: "Partner Execution",
    body: "Generate instructions for regulated benefit or pension rails.",
    tab: "data"
  }
] as const satisfies ReadonlyArray<{ title: string; body: string; tab: DashboardTab }>;

type PilotWorkflowTabsProps = {
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
};

export function PilotWorkflowTabs({ activeTab, onChange }: PilotWorkflowTabsProps) {
  return (
    <section className="pilot-workflow-strip" aria-label="PPD pilot workflow">
      {workflowTabs.map((step, index) => (
        <button
          className={activeTab === step.tab ? "active" : ""}
          key={step.title}
          type="button"
          aria-current={activeTab === step.tab ? "step" : undefined}
          onClick={() => onChange(step.tab)}
        >
          <span>{index + 1}</span>
          <div>
            <b>{step.title}</b>
            <p>{step.body}</p>
          </div>
        </button>
      ))}
    </section>
  );
}
