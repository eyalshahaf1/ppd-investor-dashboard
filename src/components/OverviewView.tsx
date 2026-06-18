import { scenarios } from "@/lib/defaults";
import { formatYen } from "@/lib/format";
import { getCopy, type Language } from "@/lib/i18n";
import type { Assumptions, JapanStatKey, JapanStatRecord, ProjectionRow } from "@/lib/types";
import { KpiCard } from "./KpiCard";
import { PartnerExecutionFlow } from "./PartnerExecutionFlow";
import { PilotEvidenceChart } from "./PilotEvidenceChart";
import { ProjectionChart } from "./ProjectionChart";
import { UnitEconomicsChart } from "./UnitEconomicsChart";

type OverviewViewProps = {
  assumptions: Assumptions;
  mediumProjection: ProjectionRow[];
  japanStats: Record<JapanStatKey, JapanStatRecord> | null;
  language: Language;
};

export function OverviewView({
  assumptions,
  mediumProjection,
  japanStats,
  language
}: OverviewViewProps) {
  const y5 = mediumProjection[mediumProjection.length - 1];
  const t = getCopy(language);
  const population65 = japanStats?.population_65_share;
  const births2024 = japanStats?.births_2024;
  const workingAgeShare = japanStats?.working_age_share;

  return (
    <div className="dashboard-grid">
      <section className="span-12 thesis-band">
        <div>
          <h2>{t.overview.thesisTitle}</h2>
          <p>{t.overview.thesisBody}</p>
        </div>
        <div className="ask-box">
          <div className="kpi-label">{t.overview.askTitle}</div>
          <ul>
            {t.overview.asks.map((ask) => (
              <li key={ask}>{ask}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="span-12">
        <div className="section-title">
          <div>
            <h2>{t.overview.dashboardTitle}</h2>
            <p>{t.overview.dashboardBody}</p>
          </div>
        </div>
        <div className="overview-kpi-groups">
          <div className="overview-kpi-group">
            <div className="kpi-group-head">
              <h3>{t.overview.macroContextTitle}</h3>
              <span>{t.overview.cachedOfficialSource}</span>
            </div>
            <div className="kpi-grid macro-kpi-grid">
              <KpiCard
                label={t.overview.population65}
                value={population65 ? `${population65.value.toFixed(1)}%` : "29.3%"}
                note={formatOfficialNote(population65, language, t.overview.officialEstimateNote)}
              />
              <KpiCard
                label={t.overview.births2024}
                value={births2024 ? `${Math.round(births2024.value / 1000).toLocaleString("en-US")}k` : "686k"}
                note={formatOfficialNote(births2024, language, t.overview.officialAnnualNote)}
                accent="coral"
              />
              <KpiCard
                label={t.overview.workingAgeShare}
                value={workingAgeShare ? `${workingAgeShare.value.toFixed(1)}%` : "59.6%"}
                note={formatOfficialNote(workingAgeShare, language, t.overview.officialEstimateNote)}
                accent="blue"
              />
            </div>
            <p className="source-note macro-note">
              <strong>{t.overview.macroSource}:</strong>{" "}
              {population65?.source_name ?? "Statistics Bureau of Japan"} ·{" "}
              {population65?.period ?? "Oct 1, 2024"}
            </p>
          </div>

          <div className="overview-kpi-group">
            <div className="kpi-group-head">
              <h3>{t.overview.modelOutputTitle}</h3>
              <span>{t.overview.modelOutputNote}</span>
            </div>
            <div className="kpi-grid model-kpi-grid">
              <KpiCard
                label={t.overview.defaultDividend}
                value={`${assumptions.dividendRate.toFixed(1)}%`}
                note={t.overview.dividendNote}
                accent="amber"
              />
              <KpiCard
                label={t.overview.y5RetirementFlow}
                value={formatYen(y5.annualContribution)}
                note={t.overview.y5Note}
                accent="indigo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="span-8 panel">
        <div className="section-title">
          <div>
            <h2>{t.overview.operatingFlowTitle}</h2>
            <p>{t.overview.operatingFlowBody}</p>
          </div>
        </div>
        <div className="flow">
          {t.overview.flowSteps.map(([title, body], index) => (
            <article className="flow-step" key={title}>
              <div className="flow-index">{index + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="span-4 panel">
        <h3>{t.overview.valueSplitTitle}</h3>
        <p>
          {t.overview.valueSplitBody.replace(
            "{amount}",
            scenarios.medium.contributionPerEmployee.toLocaleString("en-US")
          )}
        </p>
        <div className="mini-bars">
          <ValueBar label={t.overview.employerRetained} percent={66} value="60%-70%" />
          <ValueBar label={t.overview.employeePension} percent={25} value="20%-30%" tone="amber" />
          <ValueBar label={t.overview.socialResilience} percent={8} value={t.overview.futureLayer} tone="coral" />
        </div>
        <p className="source-note">
          <strong>{t.overview.positioning.split(":")[0]}:</strong>
          {t.overview.positioning.includes(":")
            ? t.overview.positioning.slice(t.overview.positioning.indexOf(":") + 1)
            : t.overview.positioning}
        </p>
      </aside>

      <PartnerExecutionFlow />
      <PilotEvidenceChart assumptions={assumptions} />
      <UnitEconomicsChart assumptions={assumptions} />

      <section className="span-6 panel">
        <h3>SaaS readiness path</h3>
        <div className="readiness-list">
          <ReadinessItem title="Workspace accounts" value="Next" body="Employer, assurance, and partner roles." />
          <ReadinessItem title="Cloud database" value="Next" body="Managed Postgres for multi-customer pilots." />
          <ReadinessItem title="Security controls" value="Next" body="Audit trail, role-based access, and upload retention rules." />
          <ReadinessItem title="Signup flow" value="Later" body="Invite-only pilot onboarding before public signup." />
        </div>
      </section>

      <section className="span-12 panel chart-frame">
        <div className="chart-head">
          <h3>{t.overview.chartTitle}</h3>
          <div className="legend">
            <span><i />{t.overview.contributionFlow}</span>
            <span className="aum"><i />{t.overview.aumTracked}</span>
            <span className="revenue"><i />{t.overview.platformRevenue}</span>
          </div>
        </div>
        <ProjectionChart rows={mediumProjection} />
      </section>
    </div>
  );
}

function ReadinessItem({ title, value, body }: { title: string; value: string; body: string }) {
  return (
    <div className="readiness-item">
      <div>
        <b>{title}</b>
        <p>{body}</p>
      </div>
      <span>{value}</span>
    </div>
  );
}

function formatOfficialNote(
  record: JapanStatRecord | undefined,
  language: Language,
  officialNote: string
) {
  if (!record) {
    return language === "ja"
      ? "バックエンド接続待ち。デモの初期値を表示中。"
      : "Waiting for backend connection. Showing demo seed value.";
  }

  return language === "ja"
    ? `${record.period}。${officialNote} キャッシュ済み出所。`
    : `${record.period}. ${officialNote} Cached source.`;
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
