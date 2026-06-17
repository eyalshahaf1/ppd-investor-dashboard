# Calculations Manual

This manual explains the calculations used by the Pension Productivity Dividend dashboard.

The source code lives mainly in:

```text
src/lib/calculations.ts
src/lib/defaults.ts
src/lib/types.ts
```

The goal is to keep the financial logic out of UI components. React components should display results; the calculation files should produce them.

## 1. Verified Net Efficiency Value

The core operating formula is:

```text
N = (H * C) + O + S + Q - A
```

Where:

```text
N = verified net efficiency value
H = verified hours saved
C = fully loaded cost per hour
O = overtime savings
S = outsourcing savings
Q = monetized quality or error-reduction benefit
A = AI cost
```

In code:

```ts
calculateOperationalGain(assumptions)
```

The dashboard converts the million-yen inputs into yen:

```text
overtimeM * 1,000,000
outsourcingM * 1,000,000
qualityM * 1,000,000
aiCostM * 1,000,000
```

Important principle:

```text
Do not count involuntary layoff savings as eligible gains.
```

The model should reward operating productivity, not workforce reduction.

## 2. Eligible Base

The current model also supports a top-down per-employee productivity assumption.

Formula:

```text
eligible_base = covered_employees * verified_gain_per_employee * confidence_haircut
```

In code:

```ts
const eligibleBase =
  coveredEmployees *
  gainPerEmployee *
  (confidence / 100)
```

The confidence haircut is a conservative control. In early pilots, it is better to pay dividends on a lower-bound estimate than to overstate the productivity gain.

## 3. Retirement Pool

Formula:

```text
retirement_pool = eligible_base * dividend_rate
```

In code:

```ts
const retirementPool = eligibleBase * (dividendRate / 100)
```

Example:

```text
covered employees = 10,000
verified gain per employee = JPY 1.2M
confidence = 100%
dividend rate = 5%

eligible base = 10,000 * 1,200,000 = JPY 12.0B
retirement pool = 12.0B * 5% = JPY 600M
```

This is worker retirement value created. It is not startup revenue.

## 4. Contribution Per Employee

Formula:

```text
contribution_per_employee = retirement_pool / covered_employees
```

Example:

```text
JPY 600M / 10,000 = JPY 60,000 per employee per year
```

This figure is useful for employer and employee communication.

## 5. Employer Retained Value

Formula:

```text
employer_retained_value = eligible_base - retirement_pool
```

This is the productivity value the employer keeps after the dividend allocation.

This number matters because the program must be commercially attractive to employers. If the employer keeps a meaningful majority of productivity value, the dividend has a stronger chance of voluntary adoption.

## 6. Platform Revenue

The dashboard keeps platform revenue separate from retirement value.

Formula:

```text
recurring_revenue =
  SaaS revenue
  + take-rate revenue
  + verification revenue
```

Where:

```text
SaaS revenue = covered_employees * monthly_saas_fee * 12 * employers
take-rate revenue = retirement_pool * take_rate * employers
verification revenue = verification_fee * employers
```

Example:

```text
covered employees = 10,000
monthly SaaS fee = JPY 500
retirement pool = JPY 600M
take rate = 0.5%
verification fee = JPY 2M

SaaS = 10,000 * 500 * 12 = JPY 60M
take rate = 600M * 0.5% = JPY 3M
verification = JPY 2M
recurring revenue = JPY 65M
```

Important:

```text
The take rate is a platform fee on contribution flow. It should not be described as an AUM management fee.
```

## 7. Gross-Profit LTV

Formula:

```text
setup_gross_profit = setup_revenue - implementation_cost
recurring_gross_profit = recurring_revenue * gross_margin
gross_profit_ltv = setup_gross_profit + recurring_gross_profit * retention_years
```

Example source assumptions:

```text
setup fee = JPY 20M
implementation cost = JPY 15M
recurring revenue = JPY 65M
gross margin = 70%
retention = 5 years

setup gross profit = JPY 5M
recurring gross profit = JPY 45.5M
LTV = 5M + 45.5M * 5 = JPY 232.5M
```

## 8. CAC Payback

Formula:

```text
payback_months = CAC / (recurring_gross_profit / 12)
```

Example:

```text
CAC = JPY 25M
monthly recurring gross profit = 45.5M / 12 = JPY 3.79M
payback = 25M / 3.79M = 6.6 months
```

## 9. Five-Year Scenario Projection

The scenario projection uses the adoption scenario definitions in:

```text
src/lib/defaults.ts
```

Medium source trajectory:

```text
Y1 30k employees
Y2 150k employees
Y3 500k employees
Y4 1.2M employees
Y5 2.0M employees
```

Annual contribution:

```text
annual_contribution = employees * contribution_per_employee
```

End-year AUM tracked:

```text
aum =
  prior_year_aum * (1 + return_rate)
  + annual_contribution * (1 + return_rate / 2)
```

The half-year return on current-year contributions is only an illustrative timing assumption.

Important phrasing:

```text
AUM tracked means assets verified through the program.
It does not mean the startup legally manages pension assets.
```

## 10. New Employer Count

The projection estimates employer count from covered employees:

```text
employer_count = ceil(employees / covered_employees_per_employer)
new_employers = max(0, employer_count - prior_year_employer_count)
```

This helps estimate setup revenue in each year.

## 11. Regulatory Guardrails

Calculations must preserve these boundaries:

```text
No custody
No funds transfer
No investment advice
No pension administration
No layoff-gain dividend base
```

The SaaS should produce measurement, reporting, and partner instructions. Regulated partners should execute pension contributions.

