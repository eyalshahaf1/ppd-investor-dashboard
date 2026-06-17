# Pension from AI Productivity - Investor Dashboard

Prepared by Eyal Shahaf

This repository contains a working HTML dashboard for demonstrating the **AI Pension Productivity Dividend in Japan** concept to investors, pilot employers, and regulated partners.

The current version is a **standalone investor demo**. It does not send data anywhere, does not connect to pension systems, and does not custody or move funds. It is designed to show the product logic: measurement, allocation, reporting, and regulated partner execution.

## What Is In This Repo

- `index.html` - the complete working dashboard app.
- `server.py` - local Python backend with SQLite.
- `docs/backend-run-manual.md` - how to run the local backend.
- `docs/customer-integration-manual.md` - where the product connects at customer sites.
- `docs/saas-model.md` - recommended SaaS model, modules, pricing, and roadmap.
- `docs/github-upload-instructions.md` - simple GitHub upload and hosting steps.

## Fastest Demo

Open `index.html` in any modern browser.

## Local Backend Demo With SQLite

For the best laptop demo, run the included backend:

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:8765
```

This creates a local SQLite database at:

```text
data/ppd_demo.sqlite3
```

The backend saves calculator assumptions, pilot task status, calculation snapshots, and demo customer records.

See:

```text
docs/backend-run-manual.md
```

## Static-Only Demo

You can still open `index.html` directly in a browser. In that mode the dashboard works offline, but SQLite persistence is not available.

For a cleaner static local demo without the backend API:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765
```

## Investor Demo Flow

1. Start on **Overview**.
2. Say: "We are not replacing Japan's pension system. We are the measurement, allocation, and reporting layer for responsible AI gains."
3. Open **Calculator** and change the dividend rule from 5% to 3%.
4. Show how retirement value and platform revenue are separate.
5. Open **Scenarios** and switch Low / Medium / High.
6. Open **Pilot Tasks** to show the 90-day proof-of-concept plan.
7. Close in **Investor Room** with the partner ask:
   - two pilot employers,
   - one regulated rail partner,
   - one assurance partner.

## Current Technical Status

This is a prototype app:

- optional local Python backend,
- local SQLite database,
- simple local JSON API,
- no production login,
- no live customer data upload,
- no pension-fund movement,
- no third-party dependencies.

The included backend is intentionally lightweight and local. Production SaaS should be built as a separate secure platform, described in `docs/saas-model.md`.

## Production Principle

The company should not act as the pension operator, asset custodian, funds-transfer provider, or investment adviser. The clean architecture is:

```text
Customer workflow data -> PPD measurement engine -> dividend calculation -> contribution instruction file/API -> regulated partner rails -> reporting and assurance
```

## Compliance Warning

This demo is for discussion only. It is not financial, pension, legal, tax, or investment advice. Before piloting in Japan, use Japan-qualified legal, privacy, labor, pension, and financial-regulatory counsel.
