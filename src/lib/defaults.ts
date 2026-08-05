import type {
  Assumptions,
  EmployerPolicy,
  EvidenceItem,
  FinanceDecision,
  QualityGate,
  ScenarioDefinition,
  ScenarioKey,
  WorkflowDefinition
} from "./types";

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
  aiCostM: 1300,
  baselineAnnualProcessCostM: 25000,
  postAiAnnualProcessCostM: 10000,
  verifiedAnnualAiCostsM: 1500,
  adjustmentRate: 10,
  allocationRate: 5,
  verifiedEmployeesCovered: 10000,
  avoidedOvertimeCostM: 3000,
  avoidedOutsourcingCostM: 2000,
  qualitySavingsM: 1500,
  incrementalContributionMarginM: 8000,
  incrementalAiRelatedCostsM: 1050,
  evidenceAdjustmentRate: 10,
  eligibleEmployees: 10000,
  qualityGatePassed: true,
  allocationPopulationAgreed: true
};

export const defaultWorkflowDefinition: WorkflowDefinition = {
  id: "demo-claims-document-review",
  organizationName: "Demo Service Operations",
  workflowName: "Claims-document review",
  department: "Operations",
  processOwner: "Demo process owner",
  financeOwner: "Demo Finance owner",
  hrSponsor: "Demo HR sponsor",
  baselineStart: "2025-10-01",
  baselineEnd: "2025-12-31",
  postAiStart: "2026-01-01",
  postAiEnd: "2026-03-31",
  aiImplementationDate: "2026-01-01",
  volumeUnit: "documents reviewed",
  qualityMeasures: ["Error and rework rate", "Service-level adherence"],
  sourceSystems: ["Workflow system", "Finance records", "Quality log"],
  knownParallelChanges: ["No material parallel change recorded in the demo case"]
};

export const defaultEvidenceItems: EvidenceItem[] = [
  {
    id: "demo-overtime",
    category: "benefit",
    outcome: "O",
    amountJpy: 3_000_000_000,
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    sourceName: "Payroll and time records",
    sourceOwner: "Demo Finance owner",
    evidenceType: "finance",
    approvalStatus: "submitted",
    limitation: "Illustrative demo amount; employer reconciliation required."
  },
  {
    id: "demo-outsourcing",
    category: "benefit",
    outcome: "S",
    amountJpy: 2_000_000_000,
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    sourceName: "Contractor spend records",
    sourceOwner: "Demo Operations owner",
    evidenceType: "finance",
    approvalStatus: "submitted",
    limitation: "Illustrative demo amount; external-spend reduction must be evidenced."
  },
  {
    id: "demo-quality",
    category: "benefit",
    outcome: "Q",
    amountJpy: 1_500_000_000,
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    sourceName: "Quality and rework log",
    sourceOwner: "Demo Quality owner",
    evidenceType: "system",
    approvalStatus: "submitted",
    limitation: "Illustrative demo amount; quality gate remains subject to review."
  },
  {
    id: "demo-margin",
    category: "benefit",
    outcome: "M",
    amountJpy: 8_000_000_000,
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    sourceName: "Management contribution analysis",
    sourceOwner: "Demo Finance owner",
    evidenceType: "management",
    approvalStatus: "submitted",
    limitation: "Illustrative management-evidenced margin; causal attribution is not assumed."
  },
  {
    id: "demo-ai-costs",
    category: "cost",
    outcome: "A",
    amountJpy: 1_050_000_000,
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    sourceName: "AI invoices and implementation ledger",
    sourceOwner: "Demo Finance owner",
    evidenceType: "finance",
    approvalStatus: "submitted",
    notes: "Licences, cloud, integration, training, security and change management."
  }
];

export const defaultQualityGates: QualityGate[] = [
  { id: "service-quality", name: "Service quality", status: "pass", source: "Quality log" },
  { id: "safety", name: "Safety", status: "not_evidenced", notes: "Not applicable to the demo workflow." },
  { id: "compliance", name: "Compliance", status: "pass", source: "Compliance review" },
  { id: "customer-outcomes", name: "Customer outcomes", status: "pass", source: "Service review" },
  { id: "error-rework", name: "Error or rework rate", status: "pass", source: "Quality log" },
  { id: "employee-impact", name: "Employee-impact concern", status: "pass", source: "HR review" }
];

export const defaultFinanceDecision: FinanceDecision = {
  evidenceSupportedValueJpy: 0,
  approvedAllocationBaseJpy: 0,
  status: "not_started",
  limitationsAcknowledged: false
};

export const defaultEmployerPolicy: EmployerPolicy = {
  allocationRate: 0,
  capJpy: 0,
  eligibleEmployees: 10_000,
  policyPeriod: "Not set",
  eligibilityRule: "Not set"
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
      ["dividend-file", "Measurement-only pilot report prepared; no contribution is routed during the pilot."]
    ]
  },
  {
    phase: "Weeks 9-12: verification",
    tasks: [
      ["assurance-sampling", "Third-party evidence sampling completed."],
      ["ppd-report", "TOMO PENSION pilot report drafted for CFO, HR, and labor stakeholders."],
      ["board-readout", "Investor and partner readout scheduled."]
    ]
  }
];
