import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TOMO PENSION",
    template: "%s | TOMO PENSION"
  },
  description:
    "A pilot dashboard for measuring verified AI productivity gains and preparing validated contribution instructions through partner-operated retirement rails.",
  applicationName: "TOMO PENSION Pilot Dashboard",
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
    icon: [
      { url: "/brand/tomo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/tomo/favicon-48.png", sizes: "48x48", type: "image/png" }
    ],
    shortcut: "/brand/tomo/favicon-32.png",
    apple: "/brand/tomo/apple-touch-icon.png"
  },
  openGraph: {
    title: "TOMO PENSION",
    description:
      "A pilot dashboard for measuring verified AI productivity gains and preparing validated contribution instructions through partner-operated retirement rails.",
    type: "website",
    images: [
      {
        url: "/brand/tomo/og-image.png",
        width: 1200,
        height: 630,
        alt: "TOMO PENSION investor dashboard preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TOMO PENSION",
    description:
      "A pilot dashboard for measuring verified AI productivity gains and preparing validated contribution instructions through partner-operated retirement rails.",
    images: ["/brand/tomo/og-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
