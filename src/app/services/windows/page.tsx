import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import ProductIntro from "@/components/services/ProductIntro";
import Guarantee from "@/components/services/Guarantee";
import Faq from "@/components/services/Faq";
import {
  windowsCta,
  windowsFaqs,
  windowsFeatures,
  windowsGuarantee,
  windowsHero,
  windowsIntro,
} from "@/lib/windows-content";

export const metadata: Metadata = {
  title: "Window Replacement",
  description:
    "Custom-measured replacement windows in vinyl or fiberglass, with insulated low-E glass, installed and sealed by a licensed, insured crew.",
};

export default function WindowsPage() {
  return (
    <>
      <main id="main">
        <Hero {...windowsHero} ctaHref="#product" ctaLabel="Explore windows" />
        <ProductIntro {...windowsIntro} features={windowsFeatures} />
        <Guarantee {...windowsGuarantee} />
        <CtaBand {...windowsCta} />
        <Faq faqs={windowsFaqs} />
      </main>
    </>
  );
}
