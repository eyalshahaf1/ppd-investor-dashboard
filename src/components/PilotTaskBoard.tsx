import { defaultPilotTasks } from "@/lib/defaults";
import type { PilotTasks } from "@/lib/types";

type PilotTaskBoardProps = {
  tasks: PilotTasks;
  onTaskChange: (taskKey: string, completed: boolean) => void;
};

export function PilotTaskBoard({ tasks, onTaskChange }: PilotTaskBoardProps) {
  const taskEntries = defaultPilotTasks.flatMap((phase) => phase.tasks);
  const completed = taskEntries.filter(([key]) => tasks[key] === true).length;
  const percent = taskEntries.length ? Math.round((completed / taskEntries.length) * 100) : 0;

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>90-day pilot operating dashboard</h2>
          <p>What must be proven before scaling.</p>
        </div>
      </section>

      <section className="span-8 panel">
        <div className="task-toolbar">
          <div>
            <h3>Task checklist</h3>
            <p>Saved locally when backend is online.</p>
          </div>
          <div>
            <div className="kpi-label">{percent}% complete</div>
            <div className="progress-shell">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
        <div className="task-grid">
          {defaultPilotTasks.map((phase) => (
            <article className="task-card" key={phase.phase}>
              <h3>{phase.phase}</h3>
              {phase.tasks.map(([key, label]) => (
                <label className="checkline" key={key}>
                  <input
                    type="checkbox"
                    checked={Boolean(tasks[key])}
                    onChange={(event) => onTaskChange(key, event.target.checked)}
                  />
                  {label}
                </label>
              ))}
            </article>
          ))}
        </div>
      </section>

      <aside className="span-4 panel">
        <h3>Partner triangle</h3>
        <div className="partner-grid single">
          <PartnerCard title="Design employer" body="Measurable workflow data. HR and CFO sponsor." />
          <PartnerCard title="Regulated rail partner" body="Executes through existing infrastructure." />
          <PartnerCard title="Assurance partner" body="Validates method and evidence." />
        </div>
      </aside>

      <section className="span-6 panel">
        <h3>Risk board</h3>
        <div className="risk-list">
          <RiskRow title="Measurement trust" severity="High" body="Use rigorous method and third-party checks." />
          <RiskRow title="Regulatory overreach" severity="High" body="Instructions only. No custody or advice." />
          <RiskRow title="Employer resistance" severity="Med" body="Lead with retention and CFO reporting." />
          <RiskRow title="Copycat incumbents" severity="Med" body="Build benchmarks and partner trust." />
        </div>
      </section>

      <section className="span-6 panel">
        <h3>Candidate partner roles</h3>
        <div className="partner-grid">
          <PartnerCard title="Sompo-like insurer" body="Credibility and employer access." />
          <PartnerCard title="SoftBank-like sponsor" body="AI ecosystem and pilot channels." />
          <PartnerCard title="METI / MHLW observers" body="Observer first, sponsor later." />
        </div>
      </section>
    </div>
  );
}

function PartnerCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="partner-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function RiskRow({ title, severity, body }: { title: string; severity: string; body: string }) {
  return (
    <div className="risk-row">
      <b>{title}</b>
      <span className={`risk-badge ${severity === "High" ? "high" : "medium"}`}>{severity}</span>
      <p>{body}</p>
    </div>
  );
}
