# Accessibility Checklist

Latest review date: July 2, 2026

Baseline target: WCAG 2.2 Level AA as an internal product baseline. This is not a formal WCAG conformance claim. A full conformance claim should only be made after a professional accessibility audit.

## Features Implemented

- Built-in Accessibility Settings control near the language and theme controls.
- Text size preferences: default, large, and extra.
- High contrast mode using internal theme tokens.
- Reduced motion preference that disables animation and transition timing.
- Underline links preference.
- Enhanced focus mode with stronger focus outlines.
- Accessibility preferences persisted in `localStorage`.
- Preferences applied through `data-*` attributes on the document root.
- Skip-to-content link for keyboard and screen reader users.
- Footer link to an Accessibility Statement.
- Accessible modal dialog for the Accessibility Statement, including keyboard Escape close behavior, focus trapping, and focus restoration.
- Existing page language updates continue to set `lang="en"` or `lang="ja"` on the document root.

## WCAG 2.2 AA Areas Addressed

- 1.3.1 Info and Relationships: semantic headings, form labels, table headers, and structured sections are used across the dashboard.
- 1.4.3 Contrast Minimum: high contrast mode and targeted contrast fixes support readable text in light and dark themes.
- 1.4.4 Resize Text: built-in text size controls are available.
- 1.4.10 Reflow: existing responsive layouts remain in place for mobile and tablet views.
- 1.4.11 Non-text Contrast: focus outlines, active controls, and high contrast tokens improve visual control boundaries.
- 2.1.1 Keyboard: controls use native buttons, links, inputs, details, and form elements.
- 2.4.1 Bypass Blocks: skip-to-content link added.
- 2.4.3 Focus Order: the main navigation and dashboard controls follow DOM order.
- 2.4.7 Focus Visible: global `:focus-visible` styling and enhanced focus mode added.
- 2.4.11 Focus Not Obscured Minimum: sticky header remains present, and skip target is focusable.
- 2.5.3 Label in Name: visible labels are used for interactive controls.
- 3.1.1 Language of Page: document language is updated for English and Japanese modes.
- 3.2.3 Consistent Navigation: top navigation remains consistent across dashboard views.
- 3.3.2 Labels or Instructions: visible labels are used for sliders, upload controls, and accessibility settings.
- 4.1.2 Name, Role, Value: native controls are preferred; the Accessibility Statement uses `role="dialog"` and `aria-modal`.
- 4.1.3 Status Messages: existing save/upload status regions use `aria-live` where applicable.

## Checks Run

- Production build: `npm run build`
- Calculation/type tests: `npm test`
- Keyboard-only review: basic review of tab-accessible controls by implementation inspection.
- Color contrast review: targeted review of known dark-mode contrast issues and high contrast mode tokens.

## Checks Not Fully Completed

- Lighthouse Accessibility audit: not completed in this environment.
- axe automated audit: not completed because no axe dependency is installed.
- Basic screen reader review: not completed with a real screen reader in this environment.

## Remaining Improvements

- Run Lighthouse Accessibility on the deployed Vercel URL.
- Run axe DevTools or an equivalent automated scanner on each dashboard view.
- Complete a keyboard-only walkthrough in Chrome/Safari across desktop, tablet, and mobile widths.
- Complete a basic VoiceOver review on macOS/iOS and NVDA or JAWS review if Windows support becomes a requirement.
- Review chart semantics and consider adding richer text summaries for complex chart data.
- Replace placeholder Accessibility Statement contact email with the production support address.
- Conduct a professional accessibility audit before making any formal WCAG, EN 301 549, or JIS-related conformance claim.
