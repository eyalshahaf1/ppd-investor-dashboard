# Static Assets Manual

Prepared by Eyal Shahaf

## Purpose

The `public/` folder contains static files that are served directly by Next.js. These files support browser identity, investor sharing, customer pilot templates, and prototype legal boundaries.

## Included Static Files

```text
public/
  brand/
    tomo/
      logo-horizontal.svg
      logo-vertical.svg
      icon.svg
      logo-navy.svg
      favicon-32.png
      favicon-48.png
      apple-touch-icon.png
      og-image.png
      jp-icons/
        measure.svg
        verify.svg
        share.svg
        future.svg
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

- `brand/tomo/logo-horizontal.svg` - TOMO PENSION full horizontal lockup for wide header and identity placements.
- `brand/tomo/icon.svg` - compact TOMO PENSION icon for narrow mobile identity placement.
- `brand/tomo/favicon-32.png` and `brand/tomo/favicon-48.png` - browser favicon sources.
- `brand/tomo/apple-touch-icon.png` - Apple touch icon and manifest icon source.
- `brand/tomo/og-image.png` - static website/social-card preview image referenced from app metadata.
- `brand/tomo/jp-icons/*.svg` - concept-strip icons for Measure, Verify, Share, and Future.
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

- confirm all TOMO PENSION artwork has final legal and brand approval,
- add a real production `sitemap.xml`,
- replace legal placeholders with counsel-reviewed documents,
- point metadata URLs to the production domain,
- set `NEXT_PUBLIC_SITE_URL` to the production domain,
- add security contact instructions after a security process exists.
