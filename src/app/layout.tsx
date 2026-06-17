import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pension from AI Productivity",
  description: "Investor dashboard and SaaS MVP for the Pension Productivity Dividend model."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

