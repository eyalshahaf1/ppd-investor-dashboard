export type DashboardTab =
  | "overview"
  | "calculator"
  | "scenarios"
  | "pilot"
  | "data"
  | "about"
  | "investor";

export const dashboardNavigation: Array<{ key: DashboardTab }> = [
  { key: "overview" },
  { key: "calculator" },
  { key: "scenarios" },
  { key: "pilot" },
  { key: "data" },
  { key: "about" },
  { key: "investor" }
];
