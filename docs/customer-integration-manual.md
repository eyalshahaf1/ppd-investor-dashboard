# Customer Integration Manual

## Purpose

This manual explains how the future SaaS product should connect at a customer site. The investor dashboard is only a demo. The production system should connect to customer systems in a controlled, auditable, privacy-safe way.

## The Customer

Best first customers are large employers in Japan with measurable workflows:

- insurance operations,
- banking operations,
- healthcare administration,
- logistics administration,
- manufacturing procurement,
- call centers,
- invoice processing,
- claims processing,
- HR administration.

Avoid early pilots in vague knowledge-work areas where productivity value is hard to prove.

## What The SaaS Connects To

The product should connect to four customer-side data areas.

### 1. Workflow And Productivity Systems

Examples:

- ticketing systems,
- claims systems,
- invoice platforms,
- CRM or service systems,
- call-center systems,
- case-management systems,
- process-mining tools,
- RPA logs,
- AI-tool usage logs.

Purpose:

- baseline productivity,
- post-AI productivity,
- error/rework reduction,
- throughput,
- queue time,
- cycle time,
- customer-service proxy metrics.

### 2. HR And Workforce Systems

Examples:

- HRIS,
- payroll,
- time and attendance,
- overtime records,
- contractor/vendor spend records.

Purpose:

- covered employee count,
- eligible employee groups,
- overtime cost savings,
- labor-cost proxy,
- workforce stability checks,
- exclusion of involuntary-layoff gains.

### 3. Finance And Cost Systems

Examples:

- ERP,
- procurement,
- AI vendor invoices,
- cloud invoices,
- implementation costs,
- training costs.

Purpose:

- net out AI costs,
- prove real yen savings,
- avoid inflated dividend bases,
- support CFO review.

### 4. Regulated Execution Partners

Examples:

- corporate DC provider,
- iDeCo-compatible partner,
- trust bank,
- insurer,
- payroll/benefits provider.

Purpose:

- execute contributions,
- respect contribution caps,
- maintain regulated custody and administration,
- keep the SaaS out of direct pension operation.

## What Data Should Flow Into The SaaS

Use the minimum data needed:

```text
workflow_id
department_id
employee_group_id
period_start
period_end
baseline_metric
post_ai_metric
volume
error_count
rework_count
overtime_cost
outsourcing_cost
ai_cost
covered_employee_count
```

Avoid individual employee surveillance where possible. Prefer aggregated team, process, or department-level data.

## What The SaaS Calculates

Core formula:

```text
N = (H * C) + O + S + Q - A
```

Where:

- `H` = verified hours saved,
- `C` = fully loaded cost per hour,
- `O` = overtime savings,
- `S` = outsourcing savings,
- `Q` = monetized quality or error-reduction benefit,
- `A` = AI software, cloud, integration, training, and change-management cost,
- `N` = verified net efficiency value.

Dividend formula:

```text
retirement_pool = verified_net_efficiency_value * dividend_rate * confidence_haircut
```

Per employee:

```text
contribution_per_employee = retirement_pool / covered_employees
```

## What The SaaS Sends Out

The SaaS should generate outputs, not move money directly.

Recommended outputs:

- contribution instruction file,
- API payload to regulated partner,
- CFO report,
- HR report,
- employee communication summary,
- assurance evidence package,
- PPD certification report.

Example contribution instruction payload:

```json
{
  "customer_id": "example-employer",
  "period": "2026-Q3",
  "covered_employees": 10000,
  "verified_net_efficiency_value_jpy": 12000000000,
  "dividend_rate": 0.05,
  "confidence_haircut": 1.0,
  "retirement_pool_jpy": 600000000,
  "contribution_per_employee_jpy": 60000,
  "execution_partner": "regulated-partner-name",
  "status": "ready_for_partner_execution"
}
```

## Recommended Production Connection Methods

Start simple:

1. Secure CSV upload for pilot data.
2. SFTP import/export for large employers.
3. API integrations after pilot validation.
4. Direct partner APIs only after legal and security review.

## What Not To Do

Do not:

- custody customer funds,
- pool funds,
- transfer money between parties,
- recommend investment products,
- operate as a pension administrator,
- count involuntary layoff savings as eligible gains,
- collect individual employee-level data unless absolutely necessary,
- create dashboards that look like employee surveillance.

## Pilot Architecture

For a 90-day pilot:

```text
Customer systems
  -> secure pilot data export
  -> PPD measurement workspace
  -> verification review
  -> dividend calculation
  -> rail partner instruction file
  -> pilot report
```

## Production Architecture

For SaaS:

```text
Customer connectors
  -> ingestion layer
  -> data validation
  -> measurement engine
  -> dividend rules engine
  -> compliance and cap checks
  -> partner instruction API
  -> reporting portal
  -> assurance audit trail
```

## Security Requirements

Minimum production requirements:

- SSO/SAML for enterprise login,
- role-based access control,
- audit logs,
- encryption at rest,
- encryption in transit,
- data retention controls,
- customer-specific data isolation,
- approval workflow before partner files are generated,
- export logs,
- privacy review,
- incident-response plan.

## Customer Roles

Recommended customer users:

- CFO sponsor,
- HR sponsor,
- data/process owner,
- legal/privacy reviewer,
- labor-management communication owner,
- benefits/payroll owner,
- executive approver.

## Partner Roles

Recommended external users:

- regulated pension/rail partner,
- assurance partner,
- legal/regulatory counsel,
- optional government observer after pilot credibility is proven.

