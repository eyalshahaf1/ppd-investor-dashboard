# Pension from AI Productivity - Investor Dashboard

Prepared by Eyal Shahaf

This repository contains a Next.js SaaS MVP for demonstrating the **AI Pension Productivity Dividend in Japan** concept to investors, pilot employers, and regulated partners.

The current version is a local SaaS-style prototype. It uses Next.js components, typed calculation utilities, API routes, and a local SQLite database. It does not custody or move funds and does not connect to live pension systems.

## What Is In This Repo

- `src/app/` - Next.js app routes and API endpoints.
- `src/components/` - small readable dashboard components.
- `src/lib/` - typed assumptions, calculations, formatting, and SQLite helpers.
- `public/` - static icons, metadata, share preview, legal placeholders, and pilot templates.
- `postcss.config.mjs` - Tailwind CSS PostCSS integration.
- `index.html` - legacy static prototype kept for reference.
- `server.py` - legacy simple Python backend with SQLite.
- `docs/nextjs-run-manual.md` - how to run the main Next.js app.
- `docs/calculations-manual.md` - explanation of all model calculations.
- `docs/backend-run-manual.md` - how to run the earlier local Python backend.
- `docs/customer-integration-manual.md` - where the product connects at customer sites.
- `docs/security-data-handling.md` - secrets, upload safety, and pilot data rules.
- `docs/japan-statistics-connector.md` - server-side Japan macro statistics cache and API notes.
- `docs/static-assets.md` - explanation of static files served from `public/`.
- `docs/saas-model.md` - recommended SaaS model, modules, pricing, and roadmap.
- `docs/github-upload-instructions.md` - simple GitHub upload and hosting steps.

## Next.js Demo

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:3000
```

The Next.js app creates a local SQLite database at:

```text
data/ppd_next.sqlite3
```

The app saves calculator assumptions, pilot task status, calculation snapshots, and demo customer records through Next.js API routes.

The **Overview** tab reads Japan macro context from:

```text
GET /api/japan-stats
```

Those statistics are cached in SQLite with source metadata. The dashboard can refresh the Statistics Bureau 65+ population figure server-side while keeping seeded official values available for offline investor demos.

The **Data Connect** tab also supports local CSV/TXT pilot uploads. Uploaded files are stored under:

```text
data/uploads/
```

This folder is ignored by Git and should not be force-added.

Detailed run instructions:

```text
docs/nextjs-run-manual.md
```

## Legacy Static Demo

You can still open `index.html` directly in a browser. In that mode the dashboard works offline, but the Next.js API and SQLite persistence are not available.

## Legacy Python Backend

The earlier `server.py` remains available as a tiny standalone Python backend. It is useful for quick API demonstrations without Next.js, but the main SaaS MVP is now the Next.js app.

Run the legacy backend:

```bash
python3 server.py
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
6. Use the **Pilot evidence dashboard** on Overview to show what operating proof must exist before any dividend claim.
7. Open **Calculator** to show the productivity gain waterfall and sensitivity tornado.
8. Open **Pilot Tasks** to show the 90-day proof-of-concept plan.
9. Open **Data Connect** to show how customer evidence will enter the system safely.
10. Open **About** to explain the product boundary, Japan logic, and static pilot resources.
11. Use the top **Dark / Light** switch if the room lighting or projector needs a different contrast mode.
12. Use the top **English / 日本語** switch when presenting to Japanese employers or partners.
13. Close in **Investor Room** with the partner ask:
   - two pilot employers,
   - one regulated rail partner,
   - one assurance partner.

## Current Technical Status

This is a prototype app:

- Next.js App Router,
- React components,
- Tailwind CSS utility support for interface controls,
- TypeScript calculation utilities,
- local Next.js API routes,
- local SQLite database,
- local CSV/TXT pilot upload registry,
- investor visualizations: pilot evidence, data quality scorecard, partner execution flow, productivity waterfall, sensitivity tornado, and five-year SaaS vs pension impact,
- persistent light/dark mode toggle,
- persistent English/Japanese language switch,
- server-side Japan macro statistics endpoint with SQLite cache,
- global footer with contact, LinkedIn, copyright, and disclaimer,
- Japanese-version path documented in the About view,
- no production login,
- no production customer-data connector,
- no pension-fund movement,
- no production pension partner integration yet.

The included backend is intentionally lightweight and local. Production SaaS should be built as a separate secure platform, described in `docs/saas-model.md`.

## Production Principle

The company should not act as the pension operator, asset custodian, funds-transfer provider, or investment adviser. The clean architecture is:

```text
Customer workflow data -> PPD measurement engine -> dividend calculation -> contribution instruction file/API -> regulated partner rails -> reporting and assurance
```

## Compliance Warning

This demo is for discussion only. It is not financial, pension, legal, tax, or investment advice. Before piloting in Japan, use Japan-qualified legal, privacy, labor, pension, and financial-regulatory counsel.
