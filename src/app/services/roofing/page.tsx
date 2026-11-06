import type { Metadata } from "next";
import QuoteCta from "@/components/home/QuoteCta";
import RoofExplorerSection from "@/components/roofing/RoofExplorerSection";
import RoofingFaq from "@/components/roofing/RoofingFaq";
import RoofingFeatures from "@/components/roofing/RoofingFeatures";
import RoofingGuarantee from "@/components/roofing/RoofingGuarantee";
import RoofingHero from "@/components/roofing/RoofingHero";
import {
  roofingCta,
  roofingFaqs,
  roofingFeatures,
  roofingFeaturesTitle,
  roofingGuarantee,
} from "@/lib/roofing-content";

export const metadata: Metadata = {
  title: "Roof Replacement",
  description:
    "Full tear-off asphalt shingle roof replacement with deck repair, underlayment, flashing and ventilation, plus permits and daily cleanup.",
};

// Roofing in the redesign: the title, then an interactive 3D roof section beside the intro, what's
// included, the warranty, FAQs and a quote CTA. Static HTML; only the roof explorer hydrates, and
// three.js loads only when the explorer comes into view.
export default function RoofingPage() {
  return (
    <main id="main" className="dark bg-charcoal-950 text-foreground">
      <RoofingHero />
      <RoofExplorerSection />
      <RoofingFeatures title={roofingFeaturesTitle} features={roofingFeatures} />
      <RoofingGuarantee {...roofingGuarantee} />
      <RoofingFaq faqs={roofingFaqs} />
      <QuoteCta id="roofing-quote" {...roofingCta} />
    </main>
  );
}
