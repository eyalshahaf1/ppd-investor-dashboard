import { calculateVerifiedAiGain } from "@/lib/calculations";
import { formatYen } from "@/lib/format";
import { getCopy, type Language } from "@/lib/i18n";
import type { Assumptions } from "@/lib/types";

type EnterprisePilotTab = "calculator" | "pilot" | "data";

type EnterprisePilotConsoleProps = {
  assumptions: Assumptions;
  language: Language;
  onNavigate: (tab: EnterprisePilotTab) => void;
};

const workflowTabs: EnterprisePilotTab[] = ["data", "calculator", "pilot", "data"];

const demoFileHrefs = [
  "/templates/demo-scenarios/conservative-pilot-workflow.csv",
  "/templates/demo-scenarios/medium-pilot-workflow.csv",
  "/templates/demo-scenarios/strong-pilot-workflow.csv",
  "/templates/contribution-instruction-template.json"
];

export function EnterprisePilotConsole({
  assumptions,
  language,
  onNavigate
}: EnterprisePilotConsoleProps) {
  const verified = calculateVerifiedAiGain(assumptions);
  const copy = getCopy(language).overview.enterprise;

  return (
    <section className="span-12 enterprise-console">
      <div className="enterprise-console-head">
        <div>
          <span className="mode-label">{copy.mode}</span>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        <div className="enterprise-outcome">
          <span>{copy.allocationLabel}</span>
          <strong>{formatYen(verified.pensionAllocation)}</strong>
          <small>{copy.allocationNote}</small>
        </div>
      </div>

      <div className="enterprise-workflow">
        {copy.steps.map((step, index) => (
          <button key={step.title} type="button" onClick={() => onNavigate(workflowTabs[index])}>
            <span>{step.status}</span>
            <b>{step.title}</b>
            <p>{step.body}</p>
          </button>
        ))}
      </div>

      <div className="enterprise-ledger-key">
        <b>{copy.ledgerKeyTitle}</b>
        <div>
          {copy.ledgerKeyItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <p>{copy.ledgerKeyNote}</p>
      </div>

      <div className="enterprise-demo-row">
        <div>
          <h3>{copy.demoFilesTitle}</h3>
          <p>{copy.demoFilesBody}</p>
        </div>
        <div className="enterprise-file-links">
          {copy.demoFiles.map((label, index) => (
            <a href={demoFileHrefs[index]} key={demoFileHrefs[index]}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
