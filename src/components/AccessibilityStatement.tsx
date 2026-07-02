"use client";

import { useEffect, useRef } from "react";
import type { Language } from "@/lib/i18n";

type AccessibilityStatementProps = {
  language: Language;
  onClose: () => void;
};

const statementCopy = {
  en: {
    title: "Accessibility Statement",
    intro:
      "We are committed to making this application accessible, usable, and clear for as many people as possible.",
    features:
      "This prototype dashboard is designed to support keyboard navigation, visible focus states, readable contrast, adjustable text size, reduced motion preferences, underlined links, and semantic page structure.",
    status:
      "The product is currently a prototype investor dashboard. Accessibility improvements are ongoing as the product develops.",
    conformance:
      "This statement is not a formal WCAG conformance claim. A full conformance claim should only be made after a professional accessibility audit.",
    contactTitle: "Report an accessibility issue",
    contact:
      "If you experience an accessibility issue or have suggestions for improvement, please contact us at: [contact email].",
    updated: "Last updated: July 2026",
    close: "Close"
  },
  ja: {
    title: "アクセシビリティステートメント",
    intro:
      "私たちは、このアプリケーションをできるだけ多くの人にとって利用しやすく、分かりやすいものにすることを目指しています。",
    features:
      "このプロトタイプダッシュボードは、キーボード操作、見やすいフォーカス表示、読みやすいコントラスト、文字サイズ調整、動きを減らす設定、リンク下線、意味のあるページ構造を支援するよう設計されています。",
    status:
      "本製品は現在、投資家向けプロトタイプダッシュボードです。製品の発展に合わせてアクセシビリティ改善を継続します。",
    conformance:
      "このステートメントは正式なWCAG適合宣言ではありません。正式な適合宣言は、専門的なアクセシビリティ監査後にのみ行うべきです。",
    contactTitle: "アクセシビリティ問題の報告",
    contact:
      "アクセシビリティ上の問題や改善提案がある場合は、[contact email] までご連絡ください。",
    updated: "最終更新: 2026年7月",
    close: "閉じる"
  }
} as const;

export function AccessibilityStatement({
  language,
  onClose
}: AccessibilityStatementProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const copy = statementCopy[language];

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])"
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="accessibility-statement-title"
        aria-modal="true"
        className="accessibility-statement-modal"
        ref={dialogRef}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="accessibility-statement-title">{copy.title}</h2>
          <button
            className="action-btn"
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
          >
            {copy.close}
          </button>
        </div>
        <div className="statement-copy">
          <p>{copy.intro}</p>
          <p>{copy.features}</p>
          <p>{copy.status}</p>
          <p>{copy.conformance}</p>
          <h3>{copy.contactTitle}</h3>
          <p>{copy.contact}</p>
          <p className="source-note">{copy.updated}</p>
        </div>
      </section>
    </div>
  );
}
