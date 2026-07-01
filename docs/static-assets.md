# Static Assets Manual

Prepared by Eyal Shahaf

## Purpose

The `public/` folder contains static files that are served directly by Next.js. These files support browser identity, investor sharing, customer pilot templates, and prototype legal boundaries.

## Included Static Files

```text
public/
  PPD_App_Icon_Teal_White.svg
  PPD_Icon_Only_Teal.svg
  PPD_Horizontal_Primary_Teal.svg
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

- `PPD_App_Icon_Teal_White.svg` - favicon, app icon, Apple touch icon, and manifest icon source.
- `PPD_Icon_Only_Teal.svg` - compact symbol for the app title and other small placements.
- `PPD_Horizontal_Primary_Teal.svg` - full horizontal logo for wide brand lockup placements only.
- `social-preview.svg` - static website/social-card preview image referenced from app metadata. It is not a Canva editing master.
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
