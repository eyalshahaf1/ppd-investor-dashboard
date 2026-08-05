import { scenarios, years } from "./defaults";
import type {
  Assumptions,
  CalculatorOutputs,
  AllocationOutput,
  EmployerPolicy,
  EvidenceItem,
  EvidenceReview,
  FinanceDecision,
  OperationalOutputs,
  ProjectionRow,
  QualityGate,
  ScenarioKey,
  VerifiedAiGainOutputs
} from "./types";

export function calculateEmployerEconomics(assumptions: Assumptions): CalculatorOutputs {
  const totalCoveredEmployees = assumptions.coveredEmployees * assumptions.employers;
  const eligibleBase =
    totalCoveredEmployees *
    assumptions.gainPerEmployee;

  const retirementPool = eligibleBase * (assumptions.dividendRate / 100);
  const perEmployee = totalCoveredEmployees
    ? retirementPool / totalCoveredEmployees
    : 0;
  const employerRetained = Math.max(0, eligibleBase - retirementPool);

  const saas =
    totalCoveredEmployees *
    assumptions.monthlySaas *
    12;
  const take = retirementPool * (assumptions.takeRate / 100);
  const audit = assumptions.auditFeeM * 1000000 * assumptions.employers;
  const recurringRevenue = saas + take + audit;

  const setupRevenue = assumptions.setupFeeM * 1000000 * assumptions.employers;
  const setupGrossProfit =
    setupRevenue - assumptions.implementationCostM * 1000000 * assumptions.employers;
  const recurringGrossProfit = recurringRevenue * (assumptions.grossMargin / 100);
  const ltv = setupGrossProfit + recurringGrossProfit * assumptions.retentionYears;
  const monthlyRecurringGrossProfit = recurringGrossProfit / 12;
  const cac = assumptions.cacM * 1000000 * assumptions.employers;
  const paybackMonths = monthlyRecurringGrossProfit > 0 ? cac / monthlyRecurringGrossProfit : 0;

  return {
    eligibleBase,
    retirementPool,
    perEmployee,
    employerRetained,
    saas,
    take,
    audit,
    recurringRevenue,
    setupRevenue,
    setupGrossProfit,
    recurringGrossProfit,
    ltv,
    paybackMonths
  };
}

export function calculateOperationalGain(assumptions: Assumptions): OperationalOutputs {
  void assumptions;
  return { savingsFromHours: 0, netGain: 0, perEmployee: 0 };
}

export function calculateVerifiedAiGain(assumptions: Assumptions): VerifiedAiGainOutputs {
  const eligibleGrossGain =
    (assumptions.avoidedOvertimeCostM +
      assumptions.avoidedOutsourcingCostM +
      assumptions.qualitySavingsM +
      assumptions.incrementalContributionMarginM) *
    1000000;
  const aiRelatedCosts = assumptions.incrementalAiRelatedCostsM * 1000000;
  const adjustedGrossAiGain =
    eligibleGrossGain * (1 - assumptions.evidenceAdjustmentRate / 100);
  const rawNetVerifiedAiGain = adjustedGrossAiGain - aiRelatedCosts;
  const hasVerifiedGain = rawNetVerifiedAiGain > 0;
  const netVerifiedAiGain = hasVerifiedGain ? rawNetVerifiedAiGain : 0;
  const allocationBlockers = [
    !hasVerifiedGain ? "No verified gain." : "",
    !assumptions.qualityGatePassed ? "Quality gate has not passed." : "",
    !assumptions.allocationPopulationAgreed
      ? "Allocation population was not agreed before measurement began."
      : ""
  ].filter(Boolean);
  const canAllocate = allocationBlockers.length === 0;
  const pensionAllocation = canAllocate
    ? netVerifiedAiGain * (assumptions.allocationRate / 100)
    : 0;
  const companyRetainedGain = hasVerifiedGain ? netVerifiedAiGain - pensionAllocation : 0;
  const pensionValuePerEmployee =
    canAllocate && assumptions.eligibleEmployees > 0
      ? pensionAllocation / assumptions.eligibleEmployees
      : 0;

  return {
    eligibleGrossGain,
    grossAiGain: eligibleGrossGain,
    adjustedGrossAiGain,
    netVerifiedAiGain,
    pensionAllocation,
    companyRetainedGain,
    pensionValuePerEmployee,
    hasVerifiedGain,
    canAllocate,
    allocationBlockers
  };
}

const supportedBenefitOutcomes = new Set(["O", "S", "Q", "M"]);

export function calculateEvidenceReview(
  evidenceItems: EvidenceItem[],
  qualityGates: QualityGate[],
  evidenceAdjustmentRate: number
): EvidenceReview {
  const grossSupportedBenefitsJpy = evidenceItems
    .filter((item) => item.category === "benefit" && supportedBenefitOutcomes.has(item.outcome))
    .reduce((total, item) => total + Math.max(0, item.amountJpy), 0);
  const aiRelatedCostsJpy = evidenceItems
    .filter((item) => item.category === "cost" || item.outcome === "A")
    .reduce((total, item) => total + Math.max(0, item.amountJpy), 0);
  const exclusionsJpy = evidenceItems
    .filter((item) => item.category === "exclusion" || item.outcome === "X")
    .reduce((total, item) => total + Math.max(0, item.amountJpy), 0);
  const adjustedBenefitsJpy = Math.max(
    0,
    grossSupportedBenefitsJpy * (1 - Math.max(0, evidenceAdjustmentRate) / 100)
  );
  const evidenceSupportedValueJpy = Math.max(
    0,
    adjustedBenefitsJpy - aiRelatedCostsJpy - exclusionsJpy
  );
  const materialLimitations = evidenceItems
    .map((item) => item.limitation)
    .filter((limitation): limitation is string => Boolean(limitation));
  const qualityGatePassed = qualityGates.every(
    (gate) => gate.status !== "fail" && gate.status !== "review"
  );
  const blockers = [
    grossSupportedBenefitsJpy <= 0 ? "No supported benefit evidence recorded." : "",
    evidenceSupportedValueJpy <= 0 ? "Evidence-supported value is zero." : "",
    !qualityGatePassed ? "A quality gate requires review or has failed." : "",
    evidenceItems.some((item) => item.approvalStatus === "rejected")
      ? "A submitted evidence item was rejected."
      : ""
  ].filter(Boolean);
  const evidenceGrade = evidenceItems.some((item) => item.evidenceType === "external")
    ? "A"
    : evidenceItems.some((item) => item.evidenceType === "finance")
      ? "B"
      : evidenceItems.some((item) => item.evidenceType === "system")
        ? "C"
        : "D";

  return {
    grossSupportedBenefitsJpy,
    evidenceAdjustmentRate,
    adjustedBenefitsJpy,
    aiRelatedCostsJpy,
    exclusionsJpy,
    evidenceSupportedValueJpy,
    evidenceGrade,
    materialLimitations,
    blockers,
    qualityGatePassed
  };
}

export function validateFinanceDecision(
  review: EvidenceReview,
  decision: FinanceDecision
): string[] {
  return [
    decision.approvedAllocationBaseJpy < 0
      ? "Finance-approved allocation base cannot be negative."
      : "",
    decision.approvedAllocationBaseJpy > review.evidenceSupportedValueJpy
      ? "Finance-approved allocation base cannot exceed the evidence-supported value."
      : "",
    decision.status === "approved" && !decision.limitationsAcknowledged
      ? "Finance must acknowledge the material limitations before approval."
      : ""
  ].filter(Boolean);
}

export function calculatePotentialAllocation(
  review: EvidenceReview,
  financeDecision: FinanceDecision,
  employerPolicy: EmployerPolicy
): AllocationOutput {
  const blockers = [
    ...review.blockers,
    ...validateFinanceDecision(review, financeDecision),
    financeDecision.status !== "approved" ? "Finance decision is not approved." : "",
    employerPolicy.allocationRate < 0 || employerPolicy.allocationRate > 100
      ? "Employer allocation rate must be between 0% and 100%."
      : "",
    employerPolicy.capJpy < 0 ? "Employer cap cannot be negative." : "",
    employerPolicy.eligibleEmployees <= 0 ? "Eligible employee population must be greater than zero." : ""
  ].filter(Boolean);
  const potentialAllocationJpy = blockers.length
    ? 0
    : Math.min(
        employerPolicy.capJpy,
        financeDecision.approvedAllocationBaseJpy * (employerPolicy.allocationRate / 100)
      );

  return {
    potentialAllocationJpy,
    illustrativePerEmployeeJpy:
      employerPolicy.eligibleEmployees > 0
        ? potentialAllocationJpy / employerPolicy.eligibleEmployees
        : 0,
    canCalculate: blockers.length === 0,
    blockers
  };
}

export function projectScenario(
  scenarioKey: ScenarioKey,
  assumptions: Assumptions
): ProjectionRow[] {
  const scenario = scenarios[scenarioKey];
  let previousAum = 0;
  let previousEmployers = 0;
  const returnRate = assumptions.annualReturn / 100;

  return scenario.employees.map((employees, index) => {
    const annualContribution = employees * scenario.contributionPerEmployee;
    const aum = previousAum * (1 + returnRate) + annualContribution * (1 + returnRate / 2);
    const employerCount = Math.ceil(employees / assumptions.coveredEmployees);
    const newEmployers = Math.max(0, employerCount - previousEmployers);
    const setup = newEmployers * assumptions.setupFeeM * 1000000;
    const saas = employees * assumptions.monthlySaas * 12;
    const take = annualContribution * (assumptions.takeRate / 100);
    const audit = employerCount * assumptions.auditFeeM * 1000000;
    const platformRevenue = setup + saas + take + audit;

    previousAum = aum;
    previousEmployers = employerCount;

    return {
      year: years[index],
      employees,
      annualContribution,
      aum,
      platformRevenue,
      newEmployers
    };
  });
}

export function getDashboardSnapshot(assumptions: Assumptions, scenarioKey: ScenarioKey) {
  const economics = calculateEmployerEconomics(assumptions);
  const operational = calculateOperationalGain(assumptions);
  const verifiedAiGain = calculateVerifiedAiGain(assumptions);
  const projection = projectScenario(scenarioKey, assumptions);

  return {
    scenarioKey,
    retirementPool: economics.retirementPool,
    contributionPerEmployee: economics.perEmployee,
    employerRetained: economics.employerRetained,
    recurringRevenue: economics.recurringRevenue,
    ltv: economics.ltv,
    paybackMonths: economics.paybackMonths,
    operationalNetGain: operational.netGain,
    operationalGainPerEmployee: operational.perEmployee,
    verifiedAiGain,
    scenarioY5: projection[projection.length - 1]
  };
}
