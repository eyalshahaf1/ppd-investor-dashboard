import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteDescription =
  "Tomo Pension is building the trusted measurement and reporting layer that helps organisations turn a small, verified share of AI productivity gains into long-term retirement value.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TOMO PENSION",
    template: "%s | TOMO PENSION"
  },
  description: siteDescription,
  applicationName: "TOMO PENSION",
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
    "retirement security"
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
    description: siteDescription,
    type: "website",
    images: [
      {
        url: "/brand/tomo/og-image.png",
        width: 1200,
        height: 630,
        alt: "TOMO PENSION"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TOMO PENSION",
    description: siteDescription,
    images: ["/brand/tomo/og-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
