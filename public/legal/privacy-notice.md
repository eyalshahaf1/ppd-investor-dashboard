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

The local demo stores uploaded files under:

```text
data/uploads/
```

The local SQLite database is stored under:

```text
data/ppd_next.sqlite3
```

Both locations are ignored by Git.

## Production Requirement

Before using real customer data, the product needs authentication, tenant isolation, encryption, audit logs, retention controls, legal review, and a customer data-processing agreement.
