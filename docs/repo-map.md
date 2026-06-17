# Repository Map

```text
ppd-investor-dashboard-nextjs/
  package.json
  next.config.ts
  tsconfig.json
  src/
    app/
      api/
      globals.css
      layout.tsx
      page.tsx
    components/
      DataConnectionView.tsx
      AboutView.tsx
    lib/
  public/
    favicon.svg
    apple-touch-icon.svg
    brand-mark.svg
    social-preview.svg
    manifest.webmanifest
    robots.txt
    humans.txt
    templates/
    legal/
  index.html
  server.py
  README.md
  .gitignore
  docs/
    nextjs-run-manual.md
    calculations-manual.md
    backend-run-manual.md
    github-upload-instructions.md
    customer-integration-manual.md
    security-data-handling.md
    static-assets.md
    saas-model.md
    repo-map.md
  assets/
```

## What To Upload To GitHub

Upload the entire `ppd-investor-dashboard-nextjs` folder, excluding ignored local files such as `node_modules/`, `.next/`, `data/`, and real `.env` files.

The minimum required production demo files are the Next.js app files, `package.json`, `package-lock.json`, `README.md`, and `docs/`.

## What The Current App Is

The current app is a Next.js SaaS MVP. The old `index.html` remains as a browser-only investor demo for reference.

## What The Production App Should Become

The production SaaS should become:

```text
Next.js SaaS MVP
  + secure customer data ingestion
  + local pilot upload registry
  + measurement engine
  + dividend rules engine
  + partner export/API layer
  + reporting portal
  + assurance audit trail
```
