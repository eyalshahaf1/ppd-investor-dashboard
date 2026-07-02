import type {
  AccessibilityPreferences,
  AccessibilityTextSize
} from "@/lib/accessibility";
import type { Language } from "@/lib/i18n";

type AccessibilitySettingsProps = {
  language: Language;
  preferences: AccessibilityPreferences;
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
    reset: "Reset"
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
    reset: "リセット"
  }
} as const;

export function AccessibilitySettings({
  language,
  preferences,
  onChange
}: AccessibilitySettingsProps) {
  const copy = accessibilityCopy[language];

  function updatePreference<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) {
    onChange({ ...preferences, [key]: value });
  }

  return (
    <details className="accessibility-settings">
      <summary>{copy.summary}</summary>
      <div className="accessibility-panel">
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
