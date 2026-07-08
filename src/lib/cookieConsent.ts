export const cookieConsentStorageKey = "ppd-cookie-consent";
export const cookieConsentChangeEvent = "ppd-cookie-consent-change";

export type CookieChoice = "essential" | "analytics";

export type CookieConsentRecord = {
  choice: CookieChoice;
  acceptedAt: string;
};

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(cookieConsentStorageKey);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<CookieConsentRecord>;
    if (parsed.choice === "essential" || parsed.choice === "analytics") {
      return {
        choice: parsed.choice,
        acceptedAt: typeof parsed.acceptedAt === "string" ? parsed.acceptedAt : ""
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function analyticsConsentGranted() {
  return readCookieConsent()?.choice === "analytics";
}
