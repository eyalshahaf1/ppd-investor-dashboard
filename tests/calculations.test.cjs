const assert = require("node:assert/strict");
const { calculateEmployerEconomics } = require("../.test-build/calculations.js");
const { defaultAssumptions } = require("../.test-build/defaults.js");

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

console.log("calculation tests passed");
