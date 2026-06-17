# Static Assets Manual

Prepared by Eyal Shahaf

## Purpose

The `public/` folder contains static files that are served directly by Next.js. These files support browser identity, investor sharing, customer pilot templates, and prototype legal boundaries.

## Included Static Files

```text
public/
  favicon.svg
  apple-touch-icon.svg
  brand-mark.svg
  social-preview.svg
  manifest.webmanifest
  robots.txt
  humans.txt
  templates/
    pilot-workflow-metrics.csv
    assumptions-template.json
    contribution-instruction-template.json
  legal/
    privacy-notice.md
    terms-placeholder.md
```

## File Purposes

- `favicon.svg` - browser tab icon.
- `apple-touch-icon.svg` - app-style icon for mobile and saved shortcuts.
- `brand-mark.svg` - simple identity asset for decks, docs, and the About section.
- `social-preview.svg` - share preview image referenced from app metadata.
- `manifest.webmanifest` - installable web-app metadata and theme color.
- `robots.txt` - basic crawler guidance. Add a sitemap only after a real production domain exists.
- `humans.txt` - project credit and repository note.
- `templates/pilot-workflow-metrics.csv` - safe aggregated CSV structure for pilot upload tests.
- `templates/assumptions-template.json` - model assumptions template.
- `templates/contribution-instruction-template.json` - dry-run partner instruction payload.
- `legal/privacy-notice.md` - prototype privacy notice.
- `legal/terms-placeholder.md` - prototype terms and compliance boundary notice.

## Production Upgrade Notes

Before a public launch:

- replace SVG touch icons with PNG icon sizes for broader platform support,
- add a real production `sitemap.xml`,
- replace legal placeholders with counsel-reviewed documents,
- point metadata URLs to the production domain,
- set `NEXT_PUBLIC_SITE_URL` to the production domain,
- add security contact instructions after a security process exists.
