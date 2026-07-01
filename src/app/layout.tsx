import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pension from AI Productivity",
    template: "%s | Pension Productivity Dividend"
  },
  description:
    "A pilot dashboard for measuring verified AI productivity gains and preparing validated contribution instructions through partner-operated retirement rails.",
  applicationName: "Pension Productivity Dividend Dashboard",
  authors: [{ name: "Eyal Shahaf" }],
  creator: "Eyal Shahaf",
  publisher: "Eyal Shahaf",
  keywords: [
    "AI productivity",
    "pension",
    "Japan",
    "retirement",
    "SaaS",
    "productivity dividend",
    "investor dashboard"
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/PPD_App_Icon_Teal_White.svg", type: "image/svg+xml" }],
    shortcut: "/PPD_App_Icon_Teal_White.svg",
    apple: "/PPD_App_Icon_Teal_White.svg"
  },
  openGraph: {
    title: "Pension from AI Productivity",
    description:
      "A pilot dashboard for measuring verified AI productivity gains and preparing validated contribution instructions through partner-operated retirement rails.",
    type: "website",
    images: [
      {
        url: "/social-preview.svg",
        width: 1200,
        height: 630,
        alt: "Pension from AI Productivity investor dashboard preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pension from AI Productivity",
    description:
      "A pilot dashboard for measuring verified AI productivity gains and preparing validated contribution instructions through partner-operated retirement rails.",
    images: ["/social-preview.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
