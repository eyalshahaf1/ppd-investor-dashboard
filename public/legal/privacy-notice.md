# Prototype Privacy Notice

Prepared by Eyal Shahaf

This prototype is for investor and pilot discussion only.

## Data Scope

For demos and early pilots, upload only aggregated workflow, cost, and employee-group metrics.

Do not upload:

- national IDs,
- bank details,
- pension account numbers,
- individual salaries,
- medical information,
- personal employee performance records,
- passwords, tokens, or API keys.

## Local Storage

The browser may store local preferences such as language, theme, accessibility settings, scenario workspace choices, and cookie consent.

The local demo stores uploaded files under:

```text
data/uploads/
```

The local SQLite database is stored under:

```text
data/ppd_next.sqlite3
```

Both locations are ignored by Git.

## Cookies And Analytics

Essential local storage is used for the demo experience. Optional analytics should not be enabled unless the user has accepted analytics cookies.

## Security Boundary

The prototype should not receive live employee-level records, salary details, bank data, pension account data, national IDs, API keys, passwords, or regulated partner secrets.

TOMO PENSION prepares measurement outputs and partner-ready contribution instructions. Regulated partners are responsible for funds, custody, and pension account execution.

## Production Requirement

Before using real customer data, the product needs authentication, role-based access control, tenant isolation, encryption, audit logs, retention controls, legal review, security review, and a customer data-processing agreement.
