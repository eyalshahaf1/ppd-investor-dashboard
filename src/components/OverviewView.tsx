"use client";

import { useMemo, useState } from "react";
import { scenarios } from "@/lib/defaults";
import { formatYen } from "@/lib/format";
import { getCopy, type Language } from "@/lib/i18n";
import type { Assumptions, JapanStatKey, JapanStatRecord, ProjectionRow } from "@/lib/types";
import { ImpactHorizonChart, type ImpactHorizonRow } from "./ImpactHorizonChart";
import { KpiCard } from "./KpiCard";
import { PartnerExecutionFlow } from "./PartnerExecutionFlow";
import { PilotEvidenceChart } from "./PilotEvidenceChart";
import { UnitEconomicsChart } from "./UnitEconomicsChart";

type OverviewViewProps = {
  assumptions: Assumptions;
  mediumProjection: ProjectionRow[];
  japanStats: Record<JapanStatKey, JapanStatRecord> | null;
  language: Language;
};

type ImpactHorizon = "immediate" | "daily" | "monthly" | "annual" | "multiYear";

const impactHorizons: Array<{ key: ImpactHorizon; label: string }> = [
  { key: "immediate", label: "Immediate" },
  { key: "daily", label: "Daily" },
  { key: "monthly", label: "Monthly" },
  { key: "annual", label: "Annual" },
  { key: "multiYear", label: "Multi-year" }
];

export function OverviewView({
  assumptions,
  mediumProjection,
  japanStats,
  language
}: OverviewViewProps) {
  const y5 = mediumProjection[mediumProjection.length - 1];
  const [impactHorizon, setImpactHorizon] = useState<ImpactHorizon>("monthly");
  const impactRows = useMemo(
    () => buildImpactRows(impactHorizon, assumptions, mediumProjection),
    [impactHorizon, assumptions, mediumProjection]
  );
  const horizonSummary = getHorizonSummary(impactHorizon, impactRows);
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
          <div>
            <h3>{t.overview.chartTitle}</h3>
            <p className="source-note">{horizonSummary}</p>
          </div>
          <div className="impact-horizon-controls" aria-label="Impact horizon">
            {impactHorizons.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={impactHorizon === item.key}
                onClick={() => setImpactHorizon(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="legend impact-legend">
            <span><i />{t.overview.contributionFlow}</span>
            <span className="aum"><i />{t.overview.aumTracked}</span>
            <span className="revenue"><i />{t.overview.platformRevenue}</span>
          </div>
        </div>
        <ImpactHorizonChart rows={impactRows} />
      </section>
    </div>
  );
}

function buildImpactRows(
  horizon: ImpactHorizon,
  assumptions: Assumptions,
  projection: ProjectionRow[]
): ImpactHorizonRow[] {
  const y1 = projection[0];
  const perEmployeeContribution = scenarios.medium.contributionPerEmployee;
  const perEmployeePlatformRevenue =
    assumptions.monthlySaas * 12 +
    perEmployeeContribution * (assumptions.takeRate / 100);

  if (horizon === "immediate") {
    return [
      buildScaleRow("1 emp", 1, perEmployeeContribution, perEmployeePlatformRevenue),
      buildScaleRow("100", 100, perEmployeeContribution, perEmployeePlatformRevenue),
      buildScaleRow("1k", 1000, perEmployeeContribution, perEmployeePlatformRevenue),
      buildScaleRow("10k", assumptions.coveredEmployees, perEmployeeContribution, perEmployeePlatformRevenue)
    ];
  }

  if (horizon === "daily") {
    return [1, 7, 14, 30].map((days) => ({
      label: `${days}d`,
      contribution: (y1.annualContribution / 365) * days,
      platformRevenue: (y1.platformRevenue / 365) * days,
      trackedValue: (y1.annualContribution / 365) * days
    }));
  }

  if (horizon === "monthly") {
    return [1, 3, 6, 12].map((months) => ({
      label: `${months}m`,
      contribution: (y1.annualContribution / 12) * months,
      platformRevenue: (y1.platformRevenue / 12) * months,
      trackedValue: (y1.annualContribution / 12) * months
    }));
  }

  if (horizon === "annual") {
    return [1, 2, 3, 4].map((quarter) => ({
      label: `Q${quarter}`,
      contribution: (y1.annualContribution / 4) * quarter,
      platformRevenue: (y1.platformRevenue / 4) * quarter,
      trackedValue: (y1.annualContribution / 4) * quarter
    }));
  }

  let cumulativeContribution = 0;
  let cumulativeRevenue = 0;
  return projection.map((row) => {
    cumulativeContribution += row.annualContribution;
    cumulativeRevenue += row.platformRevenue;
    return {
      label: row.year,
      contribution: cumulativeContribution,
      platformRevenue: cumulativeRevenue,
      trackedValue: row.aum
    };
  });
}

function buildScaleRow(
  label: string,
  employees: number,
  perEmployeeContribution: number,
  perEmployeePlatformRevenue: number
) {
  const contribution = employees * perEmployeeContribution;
  return {
    label,
    contribution,
    platformRevenue: employees * perEmployeePlatformRevenue,
    trackedValue: contribution
  };
}

function getHorizonSummary(horizon: ImpactHorizon, rows: ImpactHorizonRow[]) {
  const last = rows[rows.length - 1];
  const prefix = {
    immediate: "Immediate view shows contribution and platform run-rate by covered employee scale.",
    daily: "Daily view shows cumulative first-month run-rate from the medium Year 1 adoption case.",
    monthly: "Monthly view shows how the medium Year 1 case becomes visible inside the first year.",
    annual: "Annual view shows quarterly build-up inside Year 1.",
    multiYear: "Multi-year view shows cumulative five-year contribution and platform scale."
  }[horizon];

  return `${prefix} Last point: ${formatYen(last.contribution)} retirement value and ${formatYen(last.platformRevenue)} platform revenue.`;
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
