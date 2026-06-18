# Next.js Run Manual

This is the main application path for the SaaS MVP.

## Requirements

Use a recent Node.js version. The app was verified locally with:

```text
Node.js 22.19.0
npm 11.6.0
Next.js 15.5.19
Tailwind CSS 4.x
```

## Install

From the repository root:

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:3000
```

If port 3000 is busy:

```bash
npm run dev -- --port 3001
```

## Database

The Next.js API routes use local SQLite through `better-sqlite3`.

Default database path:

```text
data/ppd_next.sqlite3
```

Override with:

```bash
PPD_DB_PATH=./data/my_local_demo.sqlite3 npm run dev
```

The database is intentionally ignored by Git.

## Vercel Demo Note

Vercel serverless functions should not rely on persistent local files. When `VERCEL` is present, the app defaults the local SQLite database to:

```text
/tmp/ppd_next.sqlite3
```

and upload storage to:

```text
/tmp/ppd_uploads
```

This is acceptable for a demo, but it is not durable production storage. Production SaaS should use managed Postgres and object storage.

## Local Uploads

The Data Connect tab stores pilot CSV/TXT uploads under:

```text
data/uploads/
```

Override with:

```bash
PPD_UPLOAD_DIR=./data/my_local_uploads npm run dev
```

The upload folder is intentionally ignored by Git.

## Useful Checks

TypeScript:

```bash
npm run typecheck
```

Calculation tests:

```bash
npm test
```

Production build:

```bash
npm run build
```

Start production build:

```bash
npm run start
```

## API Endpoints

```text
GET  /api/health
GET  /api/assumptions
POST /api/assumptions
GET  /api/tasks
POST /api/tasks
GET  /api/customers
GET  /api/snapshots
POST /api/snapshots
GET  /api/uploads
POST /api/uploads
```

## Code Structure

```text
src/app/
  page.tsx
  layout.tsx
  globals.css
  api/

src/components/
  DashboardApp.tsx
  AppFooter.tsx
  OverviewView.tsx
  CalculatorView.tsx
  DataQualityScorecard.tsx
  PartnerExecutionFlow.tsx
  PilotEvidenceChart.tsx
  ProductivityWaterfallChart.tsx
  SensitivityTornadoChart.tsx
  ScenarioView.tsx
  PilotTaskBoard.tsx
  DataConnectionView.tsx
  AboutView.tsx
  InvestorRoom.tsx
  small reusable UI components

src/lib/
  calculations.ts
  defaults.ts
  db.ts
  format.ts
  types.ts

public/
  icons, manifest, robots.txt, share preview, legal placeholders, and pilot templates
```

## Visual Decision Charts

The investor dashboard includes four chart families:

```text
Overview:
  PilotEvidenceChart - before/after pilot proof metrics
  PartnerExecutionFlow - customer data to regulated partner to employee account
  ProjectionChart - five-year SaaS revenue vs pension impact

Calculator:
  ProductivityWaterfallChart - operating evidence to verified gain to pension pool
  SensitivityTornadoChart - which assumptions move the retirement pool most

Data Connect:
  DataQualityScorecard - completeness, baseline, AI-cost evidence, layoff exclusion, partner readiness
```

## Theme And Localization

The top bar includes a persistent Dark / Light switch. The switch uses Tailwind utility classes for the control and CSS variables for app-wide color changes.

The About view documents the recommended Japanese-version path:

```text
interface translation -> terminology review -> partner localization -> customer validation
```

Before a Japanese customer pilot, pension, labor, tax, privacy, and financial-regulatory wording should be reviewed by Japan-qualified experts.

## Development Rule

Keep calculations in `src/lib/calculations.ts`.

Keep display/UI in `src/components/`.

Keep persistence/API logic in `src/lib/db.ts` and `src/app/api/`.

This avoids spaghetti code and makes the model easy to audit.
