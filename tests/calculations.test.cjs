const assert = require("node:assert/strict");
const {
  calculateEmployerEconomics,
  calculateOperationalGain,
  calculateVerifiedAiGain,
  calculateEvidenceReview,
  validateFinanceDecision,
  calculatePotentialAllocation
} = require("../.test-build/calculations.js");
const { defaultAssumptions } = require("../.test-build/defaults.js");
const {
  buildScenarioSummaries,
  generateInvestorReport,
  parseCsvPreview
} = require("../.test-build/productFeatures.js");

function withAssumptions(overrides) {
  return { ...defaultAssumptions, ...overrides };
}

{
  const evidence = [
    { category: "benefit", outcome: "O", amountJpy: 300, approvalStatus: "submitted" },
    { category: "benefit", outcome: "S", amountJpy: 200, approvalStatus: "submitted" },
    { category: "benefit", outcome: "Q", amountJpy: 100, approvalStatus: "submitted" },
    { category: "benefit", outcome: "M", amountJpy: 800, approvalStatus: "submitted" },
    { category: "cost", outcome: "A", amountJpy: 105, approvalStatus: "submitted" }
  ];
  const review = calculateEvidenceReview(evidence, [{ status: "pass" }], 10);
  assert.equal(review.grossSupportedBenefitsJpy, 1400);
  assert.equal(review.adjustedBenefitsJpy, 1260);
  assert.equal(review.aiRelatedCostsJpy, 105);
  assert.equal(review.evidenceSupportedValueJpy, 1155);
  assert.equal(review.qualityGatePassed, true);

  const finance = {
    evidenceSupportedValueJpy: review.evidenceSupportedValueJpy,
    approvedAllocationBaseJpy: 500,
    status: "approved",
    limitationsAcknowledged: true
  };
  assert.deepEqual(validateFinanceDecision(review, finance), []);
  const allocation = calculatePotentialAllocation(review, finance, {
    allocationRate: 5,
    capJpy: 40,
    eligibleEmployees: 10,
    policyPeriod: "2026",
    eligibilityRule: "Demo"
  });
  assert.equal(allocation.potentialAllocationJpy, 25);
  assert.equal(allocation.illustrativePerEmployeeJpy, 2.5);
}

{
  const review = calculateEvidenceReview(
    [{ category: "benefit", outcome: "M", amountJpy: 100, approvalStatus: "submitted" }],
    [{ status: "pass" }],
    0
  );
  const invalidFinance = {
    evidenceSupportedValueJpy: review.evidenceSupportedValueJpy,
    approvedAllocationBaseJpy: 101,
    status: "approved",
    limitationsAcknowledged: true
  };
  assert.equal(validateFinanceDecision(review, invalidFinance).length, 1);
  const blocked = calculatePotentialAllocation(review, invalidFinance, {
    allocationRate: 5,
    capJpy: 100,
    eligibleEmployees: 10,
    policyPeriod: "2026",
    eligibilityRule: "Demo"
  });
  assert.equal(blocked.canCalculate, false);
  assert.equal(blocked.potentialAllocationJpy, 0);
}

{
  const outputs = calculateEmployerEconomics(defaultAssumptions);
  assert.equal(outputs.eligibleBase, 12_000_000_000);
  assert.equal(outputs.retirementPool, 600_000_000);
  assert.equal(outputs.perEmployee, 60_000);
  assert.equal(outputs.employerRetained, 11_400_000_000);
}

{
  const outputs = calculateEmployerEconomics(withAssumptions({ employers: 3 }));
  assert.equal(outputs.eligibleBase, 36_000_000_000);
  assert.equal(outputs.retirementPool, 1_800_000_000);
  assert.equal(outputs.perEmployee, 60_000);
  assert.equal(outputs.employerRetained, 34_200_000_000);
  assert.equal(outputs.saas, 180_000_000);
  assert.equal(outputs.take, 9_000_000);
  assert.equal(outputs.audit, 6_000_000);
  assert.equal(outputs.recurringRevenue, 195_000_000);
}

{
  const outputs = calculateEmployerEconomics(withAssumptions({ coveredEmployees: 0 }));
  assert.equal(outputs.perEmployee, 0);
}

{
  const outputs = calculateEmployerEconomics(withAssumptions({ confidence: 50 }));
  assert.equal(outputs.eligibleBase, 12_000_000_000);
  assert.equal(outputs.retirementPool, 600_000_000);
}

{
  const outputs = calculateOperationalGain(withAssumptions({ employers: 3 }));
  assert.equal(outputs.savingsFromHours, 0);
  assert.equal(outputs.netGain, 0);
  assert.equal(outputs.perEmployee, 0);
}

{
  const outputs = calculateVerifiedAiGain(defaultAssumptions);
  assert.equal(outputs.eligibleGrossGain, 14_500_000_000);
  assert.equal(outputs.grossAiGain, 14_500_000_000);
  assert.equal(outputs.adjustedGrossAiGain, 13_050_000_000);
  assert.equal(outputs.netVerifiedAiGain, 12_000_000_000);
  assert.equal(outputs.pensionAllocation, 600_000_000);
  assert.equal(outputs.companyRetainedGain, 11_400_000_000);
  assert.equal(outputs.pensionValuePerEmployee, 60_000);
  assert.equal(outputs.hasVerifiedGain, true);
}

{
  const outputs = calculateVerifiedAiGain(withAssumptions({ qualityGatePassed: false }));
  assert.equal(outputs.netVerifiedAiGain, 12_000_000_000);
  assert.equal(outputs.pensionAllocation, 0);
  assert.equal(outputs.pensionValuePerEmployee, 0);
  assert.equal(outputs.canAllocate, false);
}

{
  const outputs = calculateVerifiedAiGain(
    withAssumptions({
      avoidedOvertimeCostM: 0,
      avoidedOutsourcingCostM: 0,
      qualitySavingsM: 0,
      incrementalContributionMarginM: 50,
      incrementalAiRelatedCostsM: 100,
      evidenceAdjustmentRate: 0
    })
  );
  assert.equal(outputs.netVerifiedAiGain, 0);
  assert.equal(outputs.pensionAllocation, 0);
  assert.equal(outputs.pensionValuePerEmployee, 0);
  assert.equal(outputs.hasVerifiedGain, false);
}

{
  const preview = parseCsvPreview(
    "workflow_id,period_start,period_end,baseline_volume,post_ai_volume,ai_cost\nclaims,2026-01-01,2026-03-31,1000,1240,1200000\n"
  );
  assert.equal(preview.rows, 1);
  assert.equal(preview.mappedFields.filter((field) => field.source).length >= 6, true);
  assert.equal(preview.redFlags.includes("AI cost evidence is not mapped yet."), false);
}

{
  const summaries = buildScenarioSummaries(defaultAssumptions);
  assert.equal(summaries.length, 3);
  assert.equal(summaries.find((item) => item.key === "medium").y5AnnualContribution, 120_000_000_000);
}

{
  const report = generateInvestorReport(defaultAssumptions, "medium");
  assert.match(report, /Investor Demo Snapshot/);
  assert.match(report, /Y5 contribution flow/);
  assert.match(report, /not platform revenue/);
}

console.log("calculation tests passed");
