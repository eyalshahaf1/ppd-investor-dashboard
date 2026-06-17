# Local Backend Run Manual

## What This Backend Does

`server.py` is a simple local backend for the investor dashboard.

It uses only Python standard libraries:

- `http.server` for the local web server,
- `sqlite3` for the local database,
- `json` for API payloads.

No npm install, no pip install, and no cloud service are required.

## How To Run

From this repository folder:

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:8765
```

The server will create a local SQLite database here:

```text
data/ppd_demo.sqlite3
```

## What Gets Saved

The backend saves:

- calculator assumptions,
- pilot task checklist status,
- calculation snapshots,
- demo customer connection records.

## API Endpoints

Health check:

```text
GET /api/health
```

Load assumptions:

```text
GET /api/assumptions
```

Save assumptions:

```text
POST /api/assumptions
```

Load pilot task checklist:

```text
GET /api/tasks
```

Save pilot task checklist:

```text
POST /api/tasks
```

List demo customers:

```text
GET /api/customers
```

Save calculation snapshot:

```text
POST /api/snapshots
```

List calculation snapshots:

```text
GET /api/snapshots
```

## Example API Test

```bash
curl http://127.0.0.1:8765/api/health
```

Expected response:

```json
{
  "ok": true,
  "service": "ppd-local-backend"
}
```

## SQLite Tables

The backend creates these tables:

```text
settings
pilot_tasks
calculation_snapshots
customers
```

## Why This Is Good For The Current Stage

This is the right backend for an early investor or pilot prototype because it is:

- simple,
- local,
- auditable,
- easy to run on a laptop,
- easy to replace later with a production backend.

## What It Is Not

This local backend is not production SaaS.

It does not include:

- enterprise login,
- encryption at rest beyond local filesystem controls,
- customer tenant isolation,
- SSO,
- production audit policy,
- cloud hosting,
- regulated partner API security,
- pension compliance workflow.

For production, use the architecture in `docs/saas-model.md`.

## Production Upgrade Path

The natural upgrade path is:

```text
server.py + SQLite
  -> FastAPI / Django / Node backend
  -> PostgreSQL
  -> SSO and role-based access
  -> secure data ingestion
  -> partner API integrations
  -> production audit and compliance controls
```

