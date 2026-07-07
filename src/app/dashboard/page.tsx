import type { Metadata } from "next";
import { DashboardApp } from "@/components/DashboardApp";

export const metadata: Metadata = {
  title: "Interactive Demo | TOMO PENSION",
  description:
    "TOMO PENSION interactive demo for measured AI productivity gains, verified value, and partner-operated retirement contribution routes."
};

export default function DashboardPage() {
  return <DashboardApp />;
}
