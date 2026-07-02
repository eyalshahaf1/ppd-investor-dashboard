export type AccessibilityTextSize = "default" | "large" | "extra";

export type AccessibilityPreferences = {
  textSize: AccessibilityTextSize;
  highContrast: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
  enhancedFocus: boolean;
};

export const defaultAccessibilityPreferences: AccessibilityPreferences = {
  textSize: "default",
  highContrast: false,
  reducedMotion: false,
  underlineLinks: false,
  enhancedFocus: false
};

export const accessibilityStorageKey = "ppd-accessibility";

export function normalizeAccessibilityPreferences(
  value: unknown
): AccessibilityPreferences {
  if (!value || typeof value !== "object") return defaultAccessibilityPreferences;

  const candidate = value as Partial<AccessibilityPreferences>;
  const textSize =
    candidate.textSize === "large" || candidate.textSize === "extra"
      ? candidate.textSize
      : "default";

  return {
    textSize,
    highContrast: Boolean(candidate.highContrast),
    reducedMotion: Boolean(candidate.reducedMotion),
    underlineLinks: Boolean(candidate.underlineLinks),
    enhancedFocus: Boolean(candidate.enhancedFocus)
  };
}
