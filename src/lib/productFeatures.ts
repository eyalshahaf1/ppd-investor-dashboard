import {
  calculateEmployerEconomics,
  calculateVerifiedAiGain,
  projectScenario
} from "./calculations";
import { scenarios } from "./defaults";
import { formatEmployees, formatYen } from "./format";
import type { Assumptions, DataUpload, ProjectionRow, ScenarioKey } from "./types";

export type CsvPreview = {
  headers: string[];
  rows: number;
  mappedFields: Array<{ field: string; source: string | null }>;
  readinessScore: number;
  redFlags: string[];
};

export type ScenarioSummary = {
  key: ScenarioKey;
  label: string;
  y5Employees: number;
  y5AnnualContribution: number;
  y5Aum: number;
  y5PlatformRevenue: number;
};

export const customerDataFields = [
  { field: "Workflow ID", candidates: ["workflow_id", "workflow", "process", "use_case"] },
  { field: "Period start", candidates: ["period_start", "start_date", "baseline_start"] },
  { field: "Period end", candidates: ["period_end", "end_date", "post_ai_end"] },
  { field: "Baseline volume", candidates: ["baseline_volume", "before_volume", "baseline"] },
  { field: "Post-AI volume", candidates: ["post_ai_volume", "after_volume", "ai_volume"] },
  { field: "Cycle time", candidates: ["cycle_time", "avg_cycle_time", "handle_time"] },
  { field: "Error rate", candidates: ["error_rate", "rework_rate", "defect_rate"] },
  { field: "AI cost", candidates: ["ai_cost", "model_cost", "tool_cost"] }
] as const;

export function parseCsvPreview(text: string): CsvPreview {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const headers = lines[0] ? splitCsvLine(lines[0]) : [];
  const normalizedHeaders = headers.map(normalizeHeader);
  const mappedFields = customerDataFields.map(({ field, candidates }) => {
    const matchIndex = normalizedHeaders.findIndex((header) =>
      candidates.some((candidate) => header.includes(normalizeHeader(candidate)))
    );
    return { field, source: matchIndex >= 0 ? headers[matchIndex] : null };
  });
  const rows = Math.max(0, lines.length - 1);
  const mappedCount = mappedFields.filter((item) => item.source).length;
  const readinessScore = headers.length
    ? Math.min(100, Math.round((mappedCount / customerDataFields.length) * 80 + Math.min(rows, 20)))
    : 0;
  const redFlags = buildCsvRedFlags(headers, mappedFields, rows);

  return { headers, rows, mappedFields, readinessScore, redFlags };
}

export function buildScenarioSummaries(assumptions: Assumptions): ScenarioSummary[] {
  return (Object.keys(scenarios) as ScenarioKey[]).map((key) => {
    const rows = projectScenario(key, assumptions);
    const y5 = rows[rows.length - 1];
    return {
      key,
      label: scenarios[key].label,
      y5Employees: y5.employees,
      y5AnnualContribution: y5.annualContribution,
      y5Aum: y5.aum,
      y5PlatformRevenue: y5.platformRevenue
    };
  });
}

export function generateInvestorReport(
  assumptions: Assumptions,
  activeScenario: ScenarioKey,
  uploads: DataUpload[] = []
) {
  const economics = calculateEmployerEconomics(assumptions);
  const verified = calculateVerifiedAiGain(assumptions);
  const projection = projectScenario(activeScenario, assumptions);
  const y5 = projection[projection.length - 1];
  const uploadedTypes = uploads.length
    ? uploads.map((upload) => upload.upload_type.replace(/_/g, " ")).join(", ")
    : "No customer pilot uploads yet";

  return [
    "# Pension from AI Productivity - Investor Demo Snapshot",
    "",
    `Scenario: ${scenarios[activeScenario].label}`,
    `Covered employees in current calculator: ${formatEmployees(assumptions.coveredEmployees * assumptions.employers)}`,
    `Dividend rule: ${assumptions.dividendRate.toFixed(1)}%`,
    "Quick Scenario Mode is an illustrative shortcut. Verified AI Gain Ledger is the measurement source of truth.",
    "",
    "## Current Calculator Output",
    `Verified gain base: ${formatYen(economics.eligibleBase)}`,
    `Annual retirement pool: ${formatYen(economics.retirementPool)}`,
    `Annual per employee: ${formatYen(economics.perEmployee)}`,
    `Recurring platform revenue: ${formatYen(economics.recurringRevenue)}`,
    "",
    "## Verified AI Gain Calculation",
    `Eligible gross gain (O + S + Q + M): ${formatYen(verified.eligibleGrossGain)}`,
    `Adjusted gross AI gain: ${formatYen(verified.adjustedGrossAiGain)}`,
    `Net verified AI gain: ${formatYen(verified.netVerifiedAiGain)}`,
    `Pension allocation: ${formatYen(verified.pensionAllocation)}`,
    `Company retained gain: ${formatYen(verified.companyRetainedGain)}`,
    `Pension value per employee: ${formatYen(verified.pensionValuePerEmployee)}`,
    "",
    "## Five-Year Illustrative Scenario",
    `Y5 covered employees: ${formatEmployees(y5.employees)}`,
    `Y5 contribution flow: ${formatYen(y5.annualContribution)}`,
    `Y5 AUM influenced: ${formatYen(y5.aum)}`,
    `Y5 platform revenue: ${formatYen(y5.platformRevenue)}`,
    "",
    "## Evidence Status",
    `Uploaded pilot evidence: ${uploadedTypes}`,
    "",
    "Important: contribution flow is retirement value created, not platform revenue. The SaaS does not custody or manage pension assets."
  ].join("\n");
}

export function summarizeProjectionMomentum(rows: ProjectionRow[]) {
  const first = rows[0];
  const last = rows[rows.length - 1];
  return {
    employeeGrowthMultiple: first.employees ? last.employees / first.employees : 0,
    contributionGrowthMultiple: first.annualContribution
      ? last.annualContribution / first.annualContribution
      : 0,
    revenueGrowthMultiple: first.platformRevenue
      ? last.platformRevenue / first.platformRevenue
      : 0
  };
}

function splitCsvLine(line: string) {
  return line
    .split(",")
    .map((cell) => cell.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function buildCsvRedFlags(
  headers: string[],
  mappedFields: CsvPreview["mappedFields"],
  rows: number
) {
  const flags: string[] = [];
  const normalized = headers.map(normalizeHeader);

  if (rows === 0) flags.push("No data rows detected.");
  if (!mappedFields.some((item) => item.field === "AI cost" && item.source)) {
    flags.push("AI cost evidence is not mapped yet.");
  }
  if (!mappedFields.some((item) => item.field === "Baseline volume" && item.source)) {
    flags.push("Baseline evidence is missing or named differently.");
  }
  if (normalized.some((header) => header.includes("salary") || header.includes("national_id"))) {
    flags.push("Potential sensitive employee field detected. Remove before pilot upload.");
  }
  if (normalized.some((header) => header.includes("layoff") || header.includes("headcount_reduction"))) {
    flags.push("Layoff-related fields require exclusion from eligible gains.");
  }

  return flags.length ? flags : ["No obvious red flags in the header row."];
}
