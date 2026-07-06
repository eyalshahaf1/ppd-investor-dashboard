import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "TOMO PENSION | Coming Soon",
  description:
    "TOMO PENSION is building a trusted measurement and reporting layer for shared long-term retirement value."
};

export default function Home() {
  return <ComingSoonPage />;
}
