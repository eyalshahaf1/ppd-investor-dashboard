import { getCopy, type Language } from "@/lib/i18n";

type AppFooterProps = {
  language: Language;
  onAccessibilityOpen: () => void;
};

export function AppFooter({ language, onAccessibilityOpen }: AppFooterProps) {
  const t = getCopy(language);

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-identity">
          <b>Eyal Shahaf</b>
          <span>© 2026 · All rights reserved.</span>
        </div>

        <div className="footer-contact">
          <a href="mailto:eyal@eyalshahaf.com">eyal@eyalshahaf.com</a>
          <a
            className="linkedin-icon"
            href="https://www.linkedin.com/in/eyalshahaf/"
            rel="noreferrer"
            target="_blank"
            aria-label="LinkedIn profile: https://www.linkedin.com/in/eyalshahaf/"
            title="https://www.linkedin.com/in/eyalshahaf/"
          >
            in
          </a>
        </div>

        <div className="footer-disclaimer">
          <p>{t.footer.disclaimer}</p>
          <button type="button" onClick={onAccessibilityOpen}>
            Accessibility
          </button>
        </div>
      </div>
    </footer>
  );
}
