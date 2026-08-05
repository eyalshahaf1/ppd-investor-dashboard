export type DashboardTab =
  | "overview"
  | "calculator"
  | "ledger"
  | "scenarios"
  | "pilot"
  | "data"
  | "about"
  | "investor";

export const dashboardNavigation: Array<{ key: DashboardTab }> = [
  { key: "overview" },
  { key: "calculator" },
  { key: "ledger" },
  { key: "scenarios" },
  { key: "pilot" },
  { key: "data" },
  { key: "about" },
  { key: "investor" }
];
