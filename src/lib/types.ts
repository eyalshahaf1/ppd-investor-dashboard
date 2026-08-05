export type ScenarioKey = "low" | "medium" | "high";

export type EvidenceType = "system" | "finance" | "management" | "external";
export type EvidenceApprovalStatus = "draft" | "submitted" | "approved" | "rejected";
export type EvidenceCategory = "benefit" | "cost" | "exclusion";
export type EvidenceOutcome = "O" | "S" | "Q" | "M" | "A" | "X" | "other";
export type QualityGateStatus = "pass" | "review" | "fail" | "not_evidenced";
export type EvidenceGrade = "A" | "B" | "C" | "D";
export type FinanceDecisionStatus = "not_started" | "under_review" | "approved" | "declined";

export type WorkflowDefinition = {
  id: string;
  organizationName: string;
  workflowName: string;
  department: string;
  processOwner: string;
  financeOwner: string;
  hrSponsor?: string;
  baselineStart: string;
  baselineEnd: string;
  postAiStart: string;
  postAiEnd: string;
  aiImplementationDate: string;
  volumeUnit: string;
  qualityMeasures: string[];
  sourceSystems: string[];
  knownParallelChanges: string[];
};

export type EvidenceItem = {
  id: string;
  category: EvidenceCategory;
  outcome: EvidenceOutcome;
  amountJpy: number;
  periodStart: string;
  periodEnd: string;
  sourceName: string;
  sourceOwner: string;
  evidenceType: EvidenceType;
  approvalStatus: EvidenceApprovalStatus;
  notes?: string;
  limitation?: string;
};

export type QualityGate = {
  id: string;
  name: string;
  status: QualityGateStatus;
  source?: string;
  notes?: string;
};

export type EvidenceReview = {
  grossSupportedBenefitsJpy: number;
  evidenceAdjustmentRate: number;
  adjustedBenefitsJpy: number;
  aiRelatedCostsJpy: number;
  exclusionsJpy: number;
  evidenceSupportedValueJpy: number;
  evidenceGrade: EvidenceGrade;
  materialLimitations: string[];
  blockers: string[];
  qualityGatePassed: boolean;
};

export type FinanceDecision = {
  evidenceSupportedValueJpy: number;
  approvedAllocationBaseJpy: number;
  status: FinanceDecisionStatus;
  approver?: string;
  approvedAt?: string;
  rationale?: string;
  limitationsAcknowledged: boolean;
};

export type EmployerPolicy = {
  allocationRate: number;
  capJpy: number;
  eligibleEmployees: number;
  policyPeriod: string;
  eligibilityRule: string;
  approver?: string;
  rationale?: string;
};

export type AllocationOutput = {
  potentialAllocationJpy: number;
  illustrativePerEmployeeJpy: number;
  canCalculate: boolean;
  blockers: string[];
};

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
  baselineAnnualProcessCostM: number;
  postAiAnnualProcessCostM: number;
  verifiedAnnualAiCostsM: number;
  adjustmentRate: number;
  allocationRate: number;
  verifiedEmployeesCovered: number;
  avoidedOvertimeCostM: number;
  avoidedOutsourcingCostM: number;
  qualitySavingsM: number;
  incrementalContributionMarginM: number;
  incrementalAiRelatedCostsM: number;
  evidenceAdjustmentRate: number;
  eligibleEmployees: number;
  qualityGatePassed: boolean;
  allocationPopulationAgreed: boolean;
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

export type VerifiedAiGainOutputs = {
  eligibleGrossGain: number;
  grossAiGain: number;
  adjustedGrossAiGain: number;
  netVerifiedAiGain: number;
  pensionAllocation: number;
  companyRetainedGain: number;
  pensionValuePerEmployee: number;
  hasVerifiedGain: boolean;
  canAllocate: boolean;
  allocationBlockers: string[];
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

export type JapanStatKey =
  | "population_65_share"
  | "population_65_count"
  | "working_age_share"
  | "births_2024";

export type JapanStatRecord = {
  metric_key: JapanStatKey;
  value: number;
  unit: string;
  period: string;
  source_name: string;
  source_url: string;
  source_date: string;
  fetched_at: number;
  status: "seeded" | "refreshed" | "stale";
};

export type SnapshotPayload = {
  name: string;
  assumptions: Assumptions;
  outputs: Record<string, unknown>;
};
