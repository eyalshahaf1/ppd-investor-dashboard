export type ScenarioKey = "low" | "medium" | "high";

export type Assumptions = {
  coveredEmployees: number;
  employers: number;
  gainPerEmployee: number;
  dividendRate: number;
  confidence: number;
  annualReturn: number;
  setupFeeM: number;
  monthlySaas: number;
  takeRate: number;
  auditFeeM: number;
  grossMargin: number;
  implementationCostM: number;
  cacM: number;
  retentionYears: number;
  hoursSaved: number;
  costPerHour: number;
  overtimeM: number;
  outsourcingM: number;
  qualityM: number;
  aiCostM: number;
};

export type ScenarioDefinition = {
  label: string;
  employees: number[];
  contributionPerEmployee: number;
  gainPerEmployee: number;
};

export type ProjectionRow = {
  year: string;
  employees: number;
  annualContribution: number;
  aum: number;
  platformRevenue: number;
  newEmployers: number;
};

export type CalculatorOutputs = {
  eligibleBase: number;
  retirementPool: number;
  perEmployee: number;
  employerRetained: number;
  saas: number;
  take: number;
  audit: number;
  recurringRevenue: number;
  setupRevenue: number;
  setupGrossProfit: number;
  recurringGrossProfit: number;
  ltv: number;
  paybackMonths: number;
};

export type OperationalOutputs = {
  savingsFromHours: number;
  netGain: number;
  perEmployee: number;
};

export type PilotTasks = Record<string, boolean>;

export type CustomerConnection = {
  customer_id: string;
  name: string;
  status: string;
  workflows: string;
  data_connection: string;
  rail_partner: string;
  updated_at: number;
};

export type DataUpload = {
  id: number;
  upload_type: string;
  original_name: string;
  stored_name: string;
  size_bytes: number;
  status: string;
  created_at: number;
};

export type SnapshotPayload = {
  name: string;
  assumptions: Assumptions;
  outputs: Record<string, unknown>;
};
