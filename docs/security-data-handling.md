# Security And Customer Data Handling

Prepared by Eyal Shahaf

## Purpose

This guide explains how the demo and future SaaS should handle secrets, uploaded pilot files, and customer employee-related data.

The current app is a local demo. It is not yet a production security architecture.

## Environment Files

The repository may include:

```text
.env.example
```

That file is safe to publish because it contains only example variable names and local demo paths.

Never commit:

```text
.env
.env.local
.env.production
.env.development
```

Those files can contain API keys, database credentials, OAuth secrets, storage credentials, or customer-specific connection details.

The `.gitignore` file now blocks real `.env` files while allowing `.env.example`.

## Local Upload Storage

Pilot uploads are stored locally under:

```text
data/uploads/
```

The SQLite database is stored under:

```text
data/ppd_next.sqlite3
```

The `data/` folder is ignored by Git. Do not force-add it.

## What Customer Data To Upload For Pilots

Use aggregated workflow and cost evidence. The safest first pilot schema is:

```text
workflow_id
department_id
employee_group_id
period_start
period_end
baseline_volume
post_ai_volume
baseline_cycle_time_minutes
post_ai_cycle_time_minutes
error_count
rework_count
overtime_cost_jpy
outsourcing_cost_jpy
ai_cost_jpy
covered_employee_count
```

Prefer data by workflow, team, department, or employee group.

## What Not To Upload

Do not upload:

- national IDs,
- bank account details,
- pension account numbers,
- individual salaries,
- medical records,
- personal employee performance records,
- secrets, tokens, or passwords,
- raw individual monitoring logs,
- files exported directly from HR/payroll systems without review.

The product should never look like employee surveillance. It should measure business workflow improvement and responsible allocation of verified gains.

## SaaS Connection Model

Recommended evolution:

1. Secure CSV upload for a 90-day pilot.
2. SFTP import/export for larger employers.
3. HRIS, payroll, ERP, workflow, and RPA APIs after security review.
4. Regulated partner API for contribution instructions only.

The SaaS should not custody funds, operate pension accounts, give investment advice, or move money directly.

## Production Requirements Before Live Customer Use

Before using real customer data, add:

- authentication and role-based access control,
- tenant isolation,
- encrypted object storage,
- audit logs,
- file virus scanning,
- data retention controls,
- customer data-processing agreement,
- Japan privacy, labor, pension, tax, and financial-regulatory legal review,
- external penetration test or security review.

## Investor Demo Positioning

Tell investors:

```text
We ingest aggregated operating evidence, verify the net AI productivity gain,
calculate a productivity dividend, and generate partner-ready contribution
instructions. Regulated partners execute pension rails.
```
