import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "TOMO PENSION | Coming Soon",
  description:
    "TOMO PENSION is exploring a practical way to connect credible evidence of AI-enabled progress with long-term employee value."
};

export default function Home() {
  return <ComingSoonPage />;
}
