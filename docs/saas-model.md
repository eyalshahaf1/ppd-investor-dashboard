# SaaS Model

## Product Category

The investable company is a B2B SaaS and enterprise fintech infrastructure layer.

It should not be positioned as:

- a pension operator,
- a pension fund,
- an asset manager,
- an investment adviser,
- a payroll replacement,
- a government reform campaign.

Best positioning:

```text
Responsible AI dividend infrastructure for employers in aging economies.
```

## Core SaaS Modules

### 1. Measurement Engine

Measures verified net productivity gains from AI and automation.

Features:

- baseline definition,
- post-AI comparison,
- control-group support,
- AI cost netting,
- confidence haircut,
- eligible-gain rules,
- exclusion of layoff gains.

### 2. Dividend Rules Engine

Turns verified net gains into retirement-support allocations.

Features:

- dividend rate configuration,
- employee group configuration,
- contribution cap awareness,
- per-employee contribution calculation,
- employer-retained-value calculation,
- scenario modeling.

### 3. Partner Rail Interface

Generates files or API payloads for regulated partners.

Features:

- contribution instruction export,
- partner status tracking,
- approval workflow,
- execution confirmation import.

The SaaS should provide instructions and validation. Regulated partners should execute money movement and pension administration.

### 4. Reporting Portal

Creates stakeholder reports.

Reports:

- CFO value report,
- HR retention and responsible-AI report,
- employee summary,
- assurance report,
- policy/coalition impact report.

### 5. Assurance And Audit Trail

Preserves evidence behind the dividend calculation.

Features:

- data lineage,
- calculation logs,
- method versioning,
- evidence attachments,
- third-party verifier access,
- certification status.

## SaaS Customer Journey

### Stage 1: Pilot

Duration:

```text
90 days
```

Customer ask:

- select 3-5 measurable workflows,
- provide baseline data,
- deploy 1-2 AI use cases,
- agree to assurance sampling,
- validate rail-partner execution.

Output:

- verified PPD pilot report,
- contribution instruction demo,
- partner execution design,
- scale decision.

### Stage 2: Enterprise Deployment

Duration:

```text
6-12 months
```

Scope:

- more workflows,
- SSO,
- recurring data imports,
- HR/payroll/finance integrations,
- recurring reporting,
- partner execution.

### Stage 3: Coalition Standard

Duration:

```text
12-36 months
```

Scope:

- industry benchmark dataset,
- PPD Certified mark,
- third-party assurance standard,
- insurer/trust-bank/payroll coalition,
- policy observer pathway.

## Pricing Model

Use clear yen pricing and separate retirement value from platform revenue.

### Pilot Package

Recommended early pilot price:

```text
JPY 5M-15M for 90 days
```

Why lower than full enterprise pricing:

- reduces friction,
- proves measurement first,
- avoids sounding like a consulting-heavy sale,
- creates case evidence.

### Enterprise Setup Fee

Source model:

```text
JPY 20M per employer
```

Purpose:

- workflow mapping,
- baseline instrumentation,
- security review,
- implementation support.

### SaaS Fee

Source model:

```text
JPY 500 per covered employee per month
```

Purpose:

- measurement engine,
- dashboards,
- reporting,
- workflow administration.

### Verification Fee

Source model:

```text
JPY 2M per employer per year
```

Purpose:

- audit-lite review,
- evidence sampling,
- method consistency,
- reporting integrity.

### Flow Fee

Source model:

```text
0.5% of contributions routed
```

Important:

This is a platform fee on the retirement pool created. It is not a fee on assets under management and should not imply the company manages pension assets.

## Example Unit Economics

For one employer with 10,000 covered employees:

```text
Verified net productivity gain per employee: JPY 1.2M
Dividend rule: 5%
Retirement contribution per employee: JPY 60,000
Annual retirement pool created: JPY 600M
```

Platform revenue:

```text
SaaS: 10,000 * JPY 500 * 12 = JPY 60M
Flow fee: 0.5% * JPY 600M = JPY 3M
Verification: JPY 2M
Recurring platform revenue: JPY 65M
Setup: JPY 20M one-time
```

## Production Stack Recommendation

The current app is standalone HTML. Production SaaS should be rebuilt with:

- frontend: React, Next.js, or similar,
- backend: Node.js, Python, or Go,
- database: PostgreSQL,
- analytics warehouse: BigQuery, Snowflake, or Redshift,
- file ingestion: secure CSV/SFTP first,
- authentication: SSO/SAML/OIDC,
- hosting: AWS, GCP, Azure, or Japan-region compliant cloud,
- audit logs: append-only event store,
- reporting: PDF/Excel export,
- partner integration: secure API and file exchange.

## Suggested Data Model

Main entities:

```text
customers
users
roles
workflows
baseline_periods
measurement_periods
ai_costs
productivity_metrics
eligible_gain_calculations
dividend_rules
contribution_batches
partner_exports
verification_reviews
audit_events
reports
```

## Production API Sketch

Example endpoints:

```text
POST /api/customers
POST /api/workflows
POST /api/baselines/import
POST /api/measurements/import
POST /api/calculations/run
POST /api/contribution-batches
POST /api/partner-exports
GET  /api/reports/:id
GET  /api/audit-events
```

## Defensibility

The moat should come from:

- trusted measurement method,
- benchmark dataset,
- certification mark,
- regulated partner coalition,
- assurance workflow,
- employer adoption evidence,
- privacy-safe task-level productivity data.

## Investor Milestones

### Pre-seed

- working demo,
- measurement spec,
- pilot employer LOIs,
- rail partner conversations,
- legal/regulatory memo.

### Seed

- two paid pilots,
- one regulated rail partner,
- third-party verifier,
- first verified PPD report,
- repeatable integration pattern.

### Series A

- 10+ enterprise deployments,
- partner API integrations,
- certification mark,
- benchmark dataset,
- clear retention and expansion evidence.

## Biggest SaaS Risks

### Measurement Credibility

If employers can game the baseline, the product becomes theater. Build for adversarial scrutiny.

### Regulatory Boundary

If the company touches money movement or pension administration, the model becomes much heavier. Keep execution with regulated partners.

### Employee Trust

If employees see the system as surveillance or layoff justification, adoption will suffer. Use aggregated data and clear communication.

### Incumbent Copying

Insurers, payroll vendors, and consultancies can copy the story. Move fast on method, data, and coalition trust.

