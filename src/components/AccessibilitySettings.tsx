"use client";

import { useRef } from "react";
import type {
  AccessibilityPreferences,
  AccessibilityTextSize
} from "@/lib/accessibility";
import type { Language } from "@/lib/i18n";

type AccessibilitySettingsProps = {
  language: Language;
  preferences: AccessibilityPreferences;
  presentation?: "popover" | "inline";
  onChange: (preferences: AccessibilityPreferences) => void;
};

const accessibilityCopy = {
  en: {
    summary: "Accessibility",
    title: "Accessibility settings",
    textSize: "Text size",
    textSizes: [
      ["default", "Default"],
      ["large", "Large"],
      ["extra", "Extra"]
    ] satisfies Array<[AccessibilityTextSize, string]>,
    highContrast: "High contrast",
    reducedMotion: "Reduced motion",
    underlineLinks: "Underline links",
    enhancedFocus: "Enhanced focus",
    reset: "Reset",
    close: "Close"
  },
  ja: {
    summary: "補助",
    title: "アクセシビリティ設定",
    textSize: "文字サイズ",
    textSizes: [
      ["default", "標準"],
      ["large", "大"],
      ["extra", "特大"]
    ] satisfies Array<[AccessibilityTextSize, string]>,
    highContrast: "高コントラスト",
    reducedMotion: "動きを減らす",
    underlineLinks: "リンクに下線",
    enhancedFocus: "フォーカス強調",
    reset: "リセット",
    close: "閉じる"
  }
} as const;

function AccessibilityIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="accessibility-summary-svg"
    >
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M5.5 8.8h13" />
      <path d="M12 7.8v5.1" />
      <path d="M8.3 20l2.1-6.3h3.2l2.1 6.3" />
      <path d="M8.9 13.7h6.2" />
    </svg>
  );
}

export function AccessibilitySettings({
  language,
  preferences,
  presentation = "popover",
  onChange
}: AccessibilitySettingsProps) {
  const copy = accessibilityCopy[language];
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  function updatePreference<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) {
    onChange({ ...preferences, [key]: value });
  }

  return (
    <details
      className={`accessibility-settings ${
        presentation === "inline" ? "accessibility-settings-inline" : ""
      }`}
      ref={detailsRef}
    >
      <summary aria-label={copy.title}>
        <span className="accessibility-summary-icon">
          <AccessibilityIcon />
        </span>
        <span className="accessibility-summary-label">{copy.summary}</span>
      </summary>
      <div className="accessibility-panel">
        <div className="accessibility-panel-head">
          <b>{copy.title}</b>
          <button
            type="button"
            onClick={() => {
              if (detailsRef.current) detailsRef.current.open = false;
            }}
          >
            {copy.close}
          </button>
        </div>

        <fieldset>
          <legend>{copy.textSize}</legend>
          <div className="accessibility-choice-row">
            {copy.textSizes.map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="accessibility-text-size"
                  checked={preferences.textSize === value}
                  onChange={() => updatePreference("textSize", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="accessibility-toggle-list" aria-label={copy.title}>
          <Toggle
            checked={preferences.highContrast}
            label={copy.highContrast}
            onChange={(checked) => updatePreference("highContrast", checked)}
          />
          <Toggle
            checked={preferences.reducedMotion}
            label={copy.reducedMotion}
            onChange={(checked) => updatePreference("reducedMotion", checked)}
          />
          <Toggle
            checked={preferences.underlineLinks}
            label={copy.underlineLinks}
            onChange={(checked) => updatePreference("underlineLinks", checked)}
          />
          <Toggle
            checked={preferences.enhancedFocus}
            label={copy.enhancedFocus}
            onChange={(checked) => updatePreference("enhancedFocus", checked)}
          />
        </div>

        <button
          className="accessibility-reset"
          type="button"
          onClick={() =>
            onChange({
              textSize: "default",
              highContrast: false,
              reducedMotion: false,
              underlineLinks: false,
              enhancedFocus: false
            })
          }
        >
          {copy.reset}
        </button>
      </div>
    </details>
  );
}

function Toggle({
  checked,
  label,
  onChange
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="accessibility-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
