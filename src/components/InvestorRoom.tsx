import type { DashboardTab } from "./Tabs";

type InvestorRoomProps = {
  reportText: string;
  onNavigate: (tab: DashboardTab) => void;
};

export function InvestorRoom({ reportText, onNavigate }: InvestorRoomProps) {
  const steps = [
    ["Open with the wedge", "We are not replacing Japan's pension system. Measurement is the product; pension value is the outcome."],
    ["Show the operating flow", "Walk left to right: AI workflow, verified gain, dividend rule, regulated rails, impact reporting."],
    ["Stress-test the ledger live", "Change O, S, Q, M, AI costs, or the evidence adjustment rate, then show that no verified gain means no pension allocation."],
    ["Separate value buckets", "Repeat that retirement value is worker value. Startup revenue is SaaS, verification, setup, and contribution-instruction reconciliation fees."],
    ["Make risk feel managed", "Show the risk board and emphasize measurement integrity, privacy, anti-layoff guardrails, and regulated partner execution."],
    ["Close with the partner triangle", "Ask for a 90-day measurement-only pilot: 1 operating employer, 1 benefits / pension rail partner, and 1 assurance partner. No pension contribution is routed during the measurement pilot."]
  ];

  const reportHref = `data:text/markdown;charset=utf-8,${encodeURIComponent(reportText)}`;

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>Best-practice investor demonstration</h2>
          <p>
            Run this app like a proof of operating discipline. The point is not
            to dazzle with big TAM; it is to show that the model survives scrutiny.
          </p>
        </div>
      </section>

      <section className="span-12 panel investor-console">
        <div>
          <h3>Investor demo mode</h3>
          <p>
            A guided path for live meetings: open the story, stress-test the math,
            show customer data discipline, then close with the partner execution room.
          </p>
        </div>
        <div className="investor-actions">
          <button className="action-btn" type="button" onClick={() => onNavigate("overview")}>
            1. Overview
          </button>
          <button className="action-btn" type="button" onClick={() => onNavigate("calculator")}>
            2. Calculator
          </button>
          <button className="action-btn" type="button" onClick={() => onNavigate("data")}>
            3. Data connect
          </button>
          <a className="action-btn primary" download="ppd-investor-demo-snapshot.md" href={reportHref}>
            Export report
          </a>
        </div>
      </section>

      <section className="span-7 panel">
        <h3>Recommended demo sequence</h3>
        <div className="demo-grid">
          {steps.map(([title, body], index) => (
            <article className="demo-step" key={title}>
              <div className="num">{index + 1}</div>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="span-5 panel">
        <h3>Do and avoid</h3>
        <div className="callout positive">
          <h3>Do</h3>
          <p>
            Use conservative assumptions, show formulas, invite challenge, name
            the regulated partners, and keep policy upside as optionality.
          </p>
        </div>
        <div className="callout">
          <h3>Avoid</h3>
          <p>
            Do not imply custody, guaranteed returns, investment advice, national
            legislation dependency, pension reform, a new tax, or that layoff savings count as eligible gains.
          </p>
        </div>
        <div className="plain-note">
          <h3>Investor close</h3>
          <p>
            Production begins only after verification, CFO reconciliation, quality
            review, and rail-partner confirmation.
          </p>
        </div>
      </aside>
    </div>
  );
}
