import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility | TOMO PENSION",
  description: "Accessibility statement for the TOMO PENSION public website and interactive demo."
};

export default function AccessibilityPage() {
  return (
    <main className="public-accessibility-page">
      <article className="public-accessibility-content">
        <a href="/">TOMO PENSION</a>
        <h1>Accessibility</h1>
        <p>
          We are committed to making TOMO PENSION accessible, usable, and clear for as many people as possible.
        </p>
        <h2>Supported features</h2>
        <p>
          The website and interactive demo support keyboard navigation, visible focus states, readable contrast, adjustable text size, reduced motion, underlined links, and semantic page structure. Accessibility settings are available from the public site and are remembered on this device.
        </p>
        <h2>Ongoing work</h2>
        <p>
          TOMO PENSION is currently a public concept site and interactive prototype. Accessibility improvements continue as the product develops. This statement is not a formal WCAG conformance claim.
        </p>
        <h2>Contact</h2>
        <p>
          To report an accessibility issue or suggest an improvement, contact <a href="mailto:info@tomopension.com">info@tomopension.com</a>.
        </p>
        <p><small>Last updated: August 2026</small></p>
      </article>
    </main>
  );
}
