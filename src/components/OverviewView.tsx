import { scenarios } from "@/lib/defaults";
import { formatYen } from "@/lib/format";
import type { Assumptions, ProjectionRow } from "@/lib/types";
import { KpiCard } from "./KpiCard";
import { PartnerExecutionFlow } from "./PartnerExecutionFlow";
import { PilotEvidenceChart } from "./PilotEvidenceChart";
import { ProjectionChart } from "./ProjectionChart";

type OverviewViewProps = {
  assumptions: Assumptions;
  mediumProjection: ProjectionRow[];
};

export function OverviewView({ assumptions, mediumProjection }: OverviewViewProps) {
  const y5 = mediumProjection[mediumProjection.length - 1];

  return (
    <div className="dashboard-grid">
      <section className="span-12 thesis-band">
        <div>
          <h2>Show investors the linking layer, not a new pension system.</h2>
          <p>
            The clean venture story is a B2B fintech infrastructure product:
            quantify verified AI productivity gains, apply a rules-based dividend,
            generate contribution instructions, and report impact for CFO, HR, ESG,
            and policy stakeholders.
          </p>
        </div>
        <div className="ask-box">
          <div className="kpi-label">90-day proof-of-concept ask</div>
          <ul>
            <li>Two pilot employers with measurable workflows.</li>
            <li>One regulated pension, insurer, payroll, or trust-bank rail partner.</li>
            <li>One assurance partner to validate the method.</li>
          </ul>
        </div>
      </section>

      <section className="span-12">
        <div className="section-title">
          <div>
            <h2>Investor opening dashboard</h2>
            <p>
              Lead with Japan&apos;s structural need, then immediately separate retirement
              value created from platform revenue earned.
            </p>
          </div>
        </div>
        <div className="kpi-grid">
          <KpiCard label="Japan population 65+" value="29.3%" note="As of Oct 2024 in the source deck." />
          <KpiCard
            label="2024 births"
            value="686k"
            note="Record low, reinforcing long-run contributor pressure."
            accent="coral"
          />
          <KpiCard
            label="Default dividend rule"
            value={`${assumptions.dividendRate.toFixed(1)}%`}
            note="Editable. Source one-pager frames 1% to 5%."
            accent="amber"
          />
          <KpiCard
            label="Medium Y5 retirement flow"
            value={formatYen(y5.annualContribution)}
            note="Retirement contributions created, not startup revenue."
            accent="indigo"
          />
        </div>
      </section>

      <section className="span-8 panel">
        <div className="section-title">
          <div>
            <h2>Operating flow</h2>
            <p>
              The demo should make regulatory restraint visible. The platform does not
              custody assets, recommend investments, or operate as the pension administrator.
            </p>
          </div>
        </div>
        <div className="flow">
          {[
            ["AI deployment inside employer", "Choose measurable workflows such as claims, invoices, HR admin, or call-center wrap-up time."],
            ["Measurement and audit trail", "Calculate verified net efficiency value after AI costs, baseline checks, and confidence haircut."],
            ["Dividend rule", "Allocate an editable share of eligible gains to retirement support while excluding layoff gains."],
            ["Regulated rails", "Contribution instructions flow through existing DC, iDeCo, insurer, trust-bank, payroll, or benefits partners."],
            ["Impact reporting", "Generate CFO, HR, employee, assurance, and policy reports under a consistent PPD methodology."]
          ].map(([title, body], index) => (
            <article className="flow-step" key={title}>
              <div className="flow-index">{index + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="span-4 panel">
        <h3>Holistic value split</h3>
        <p>
          Use this as a strategic frame, not the primary pilot pricing promise.
          The calculator keeps the source default at {scenarios.medium.contributionPerEmployee.toLocaleString("en-US")} yen per employee.
        </p>
        <div className="mini-bars">
          <ValueBar label="Employer retained" percent={66} value="60%-70%" />
          <ValueBar label="Employee pension" percent={25} value="20%-30%" tone="amber" />
          <ValueBar label="Social resilience" percent={8} value="future layer" tone="coral" />
        </div>
        <p className="source-note">
          <strong>Investor positioning:</strong> start with voluntary B2B pilots, then
          keep coalition and policy pathways as upside optionality.
        </p>
      </aside>

      <PartnerExecutionFlow />
      <PilotEvidenceChart assumptions={assumptions} />

      <section className="span-12 panel chart-frame">
        <div className="chart-head">
          <h3>5-year SaaS revenue vs pension impact</h3>
          <div className="legend">
            <span><i />Retirement contribution flow</span>
            <span className="aum"><i />End-year AUM tracked</span>
            <span className="revenue"><i />Platform revenue</span>
          </div>
        </div>
        <ProjectionChart rows={mediumProjection} />
      </section>
    </div>
  );
}

function ValueBar({
  label,
  percent,
  value,
  tone = "teal"
}: {
  label: string;
  percent: number;
  value: string;
  tone?: "teal" | "amber" | "coral";
}) {
  return (
    <div className="bar-row">
      <b>{label}</b>
      <div className="bar-track">
        <div className={`bar-fill ${tone}`} style={{ width: `${percent}%` }} />
      </div>
      <span>{value}</span>
    </div>
  );
}
