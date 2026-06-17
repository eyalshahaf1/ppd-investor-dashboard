import type { Assumptions, ScenarioDefinition, ScenarioKey } from "./types";

export const years = ["Y1", "Y2", "Y3", "Y4", "Y5"];

export type PilotTaskPhase = {
  phase: string;
  tasks: Array<[string, string]>;
};

export const defaultAssumptions: Assumptions = {
  coveredEmployees: 10000,
  employers: 1,
  gainPerEmployee: 1200000,
  dividendRate: 5,
  confidence: 100,
  annualReturn: 3,
  setupFeeM: 20,
  monthlySaas: 500,
  takeRate: 0.5,
  auditFeeM: 2,
  grossMargin: 70,
  implementationCostM: 15,
  cacM: 25,
  retentionYears: 5,
  hoursSaved: 1600000,
  costPerHour: 5500,
  overtimeM: 2400,
  outsourcingM: 1200,
  qualityM: 900,
  aiCostM: 1300
};

export const scenarios: Record<ScenarioKey, ScenarioDefinition> = {
  low: {
    label: "Low adoption",
    employees: [20000, 75000, 200000, 350000, 500000],
    contributionPerEmployee: 30000,
    gainPerEmployee: 600000
  },
  medium: {
    label: "Medium adoption",
    employees: [30000, 150000, 500000, 1200000, 2000000],
    contributionPerEmployee: 60000,
    gainPerEmployee: 1200000
  },
  high: {
    label: "High adoption",
    employees: [30000, 300000, 1000000, 2500000, 5000000],
    contributionPerEmployee: 120000,
    gainPerEmployee: 2400000
  }
};

export const defaultPilotTasks: PilotTaskPhase[] = [
  {
    phase: "Weeks 1-3: baseline",
    tasks: [
      ["kpi-dictionary", "KPI dictionary for 3-5 measurable workflows."],
      ["privacy-pack", "Privacy and labor-management communication pack."],
      ["counterfactual", "Matched control or counterfactual design."]
    ]
  },
  {
    phase: "Weeks 4-8: deployment",
    tasks: [
      ["ai-use-cases", "One or two AI use cases deployed per employer."],
      ["net-costs", "AI costs captured and netted from gains."],
      ["dividend-file", "Contribution instruction file drafted for rail partner."]
    ]
  },
  {
    phase: "Weeks 9-12: verification",
    tasks: [
      ["assurance-sampling", "Third-party evidence sampling completed."],
      ["ppd-report", "PPD Pilot Report drafted for CFO, HR, and labor stakeholders."],
      ["board-readout", "Investor and partner readout scheduled."]
    ]
  }
];
