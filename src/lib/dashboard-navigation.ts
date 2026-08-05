export type DashboardTab =
  | "overview"
  | "workflow"
  | "evidence"
  | "review"
  | "finance"
  | "policy"
  | "report"
  | "pilot"
  | "about"

export const dashboardNavigation: Array<{ key: DashboardTab }> = [
  { key: "overview" },
  { key: "workflow" },
  { key: "evidence" },
  { key: "review" },
  { key: "finance" },
  { key: "policy" },
  { key: "report" },
  { key: "pilot" },
  { key: "about" }
];
