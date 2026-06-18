const assert = require("node:assert/strict");
const {
  calculateEmployerEconomics,
  calculateOperationalGain,
  calculateVerifiedAiGain
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
  const outputs = calculateOperationalGain(withAssumptions({ employers: 3 }));
  assert.equal(outputs.savingsFromHours, 26_400_000_000);
  assert.equal(outputs.netGain, 36_000_000_000);
  assert.equal(outputs.perEmployee, 1_200_000);
}

{
  const outputs = calculateVerifiedAiGain(defaultAssumptions);
  assert.equal(outputs.grossAiGain, 15_000_000_000);
  assert.equal(outputs.adjustedGrossAiGain, 13_500_000_000);
  assert.equal(outputs.netVerifiedAiGain, 12_000_000_000);
  assert.equal(outputs.pensionAllocation, 600_000_000);
  assert.equal(outputs.companyRetainedGain, 11_400_000_000);
  assert.equal(outputs.pensionValuePerEmployee, 60_000);
  assert.equal(outputs.hasVerifiedGain, true);
}

{
  const outputs = calculateVerifiedAiGain(
    withAssumptions({
      baselineAnnualProcessCostM: 1000,
      postAiAnnualProcessCostM: 950,
      verifiedAnnualAiCostsM: 100,
      adjustmentRate: 0
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
