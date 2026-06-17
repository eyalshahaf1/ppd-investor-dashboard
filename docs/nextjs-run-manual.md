# Next.js Run Manual

This is the main application path for the SaaS MVP.

## Requirements

Use a recent Node.js version. The app was verified locally with:

```text
Node.js 22.19.0
npm 11.6.0
Next.js 15.5.19
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
  OverviewView.tsx
  CalculatorView.tsx
  ScenarioView.tsx
  PilotTaskBoard.tsx
  DataConnectionView.tsx
  InvestorRoom.tsx
  small reusable UI components

src/lib/
  calculations.ts
  defaults.ts
  db.ts
  format.ts
  types.ts
```

## Development Rule

Keep calculations in `src/lib/calculations.ts`.

Keep display/UI in `src/components/`.

Keep persistence/API logic in `src/lib/db.ts` and `src/app/api/`.

This avoids spaghetti code and makes the model easy to audit.
