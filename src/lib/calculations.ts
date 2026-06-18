import { scenarios, years } from "./defaults";
import type {
  Assumptions,
  CalculatorOutputs,
  OperationalOutputs,
  ProjectionRow,
  ScenarioKey
} from "./types";

export function calculateEmployerEconomics(assumptions: Assumptions): CalculatorOutputs {
  const totalCoveredEmployees = assumptions.coveredEmployees * assumptions.employers;
  const eligibleBase =
    totalCoveredEmployees *
    assumptions.gainPerEmployee *
    (assumptions.confidence / 100);

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
  const savingsFromHours = assumptions.hoursSaved * assumptions.costPerHour;
  const otherSavings =
    (assumptions.overtimeM +
      assumptions.outsourcingM +
      assumptions.qualityM -
      assumptions.aiCostM) *
    1000000;
  const netGain = Math.max(0, savingsFromHours + otherSavings);
  const perEmployee = assumptions.coveredEmployees ? netGain / assumptions.coveredEmployees : 0;

  return { savingsFromHours, netGain, perEmployee };
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
    scenarioY5: projection[projection.length - 1]
  };
}
