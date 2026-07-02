import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import type { Assumptions } from "@/lib/types";

type EnterprisePilotTab = "calculator" | "pilot" | "data";

type EnterprisePilotConsoleProps = {
  assumptions: Assumptions;
  onNavigate: (tab: EnterprisePilotTab) => void;
};

const workflowSteps: Array<{
  title: string;
  body: string;
  status: string;
  tab: EnterprisePilotTab;
}> = [
  {
    title: "1. Upload evidence",
    body: "Workflow, finance, HR aggregate, and assurance files enter the pilot workspace.",
    status: "Pilot input",
    tab: "data"
  },
  {
    title: "2. Verify ledger",
    body: "Reconcile evidence into O, S, Q, M and A before any pension allocation.",
    status: "CFO source",
    tab: "calculator"
  },
  {
    title: "3. Review approval",
    body: "CFO, HR, compliance, assurance, and partner readiness are checked.",
    status: "Control gate",
    tab: "pilot"
  },
  {
    title: "4. Export instruction",
    body: "Generate a dry-run instruction for regulated partner rails. PPD does not custody funds.",
    status: "Partner rail",
    tab: "data"
  }
];

const demoFiles = [
  ["Conservative pilot CSV", "/templates/demo-scenarios/conservative-pilot-workflow.csv"],
  ["Medium pilot CSV", "/templates/demo-scenarios/medium-pilot-workflow.csv"],
  ["Strong pilot CSV", "/templates/demo-scenarios/strong-pilot-workflow.csv"],
  ["Partner instruction JSON", "/templates/contribution-instruction-template.json"]
];

export function EnterprisePilotConsole({
  assumptions,
  onNavigate
}: EnterprisePilotConsoleProps) {
  const verified = calculateVerifiedAiGain(assumptions);

  return (
    <section className="span-12 enterprise-console">
      <div className="enterprise-console-head">
        <div>
          <span className="mode-label">Enterprise pilot demo</span>
          <h2>Measurement workflow for a corporate customer</h2>
          <p>
            A customer can test the full flow with safe sample files: evidence upload,
            verified gain ledger, approval gate, and partner instruction export.
          </p>
        </div>
        <div className="enterprise-outcome">
          <span>Current verified allocation</span>
          <strong>{formatYen(verified.pensionAllocation)}</strong>
          <small>Instruction value only. No custody by PPD.</small>
        </div>
      </div>

      <div className="enterprise-workflow">
        {workflowSteps.map((step) => (
          <button key={step.title} type="button" onClick={() => onNavigate(step.tab)}>
            <span>{step.status}</span>
            <b>{step.title}</b>
            <p>{step.body}</p>
          </button>
        ))}
      </div>

      <div className="enterprise-demo-row">
        <div>
          <h3>Demo scenario files</h3>
          <p>
            Use these files in Partner Execution / Secure pilot upload to test
            conservative, medium, and strong pilot evidence.
          </p>
        </div>
        <div className="enterprise-file-links">
          {demoFiles.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
