import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import ProductIntro from "@/components/services/ProductIntro";
import Guarantee from "@/components/services/Guarantee";
import Faq from "@/components/services/Faq";
import {
  roofingCta,
  roofingFaqs,
  roofingFeatures,
  roofingGuarantee,
  roofingHero,
  roofingIntro,
} from "@/lib/roofing-content";

export const metadata: Metadata = {
  title: "Roof Replacement",
  description:
    "Full tear-off asphalt shingle roof replacement with deck repair, underlayment, flashing and ventilation, plus permits and daily cleanup.",
};

export default function RoofingPage() {
  return (
    <>
      <main id="main">
        <Hero {...roofingHero} ctaHref="#product" ctaLabel="Explore roofing" />
        <ProductIntro {...roofingIntro} features={roofingFeatures} />
        <Guarantee {...roofingGuarantee} />
        <CtaBand {...roofingCta} />
        <Faq faqs={roofingFaqs} />
      </main>
    </>
  );
}
