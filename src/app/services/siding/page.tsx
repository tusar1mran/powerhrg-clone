import type { Metadata } from "next";
import SheetFrame from "@/components/sheet/SheetFrame";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import ProductIntro from "@/components/services/ProductIntro";
import Guarantee from "@/components/services/Guarantee";
import Faq from "@/components/services/Faq";
import {
  sidingCta,
  sidingFaqs,
  sidingFeatures,
  sidingGuarantee,
  sidingHero,
  sidingIntro,
} from "@/lib/siding-content";

export const metadata: Metadata = {
  title: "Siding Replacement",
  description:
    "Vinyl, insulated vinyl and fiber cement siding installed over new house wrap, with flashed openings and new trim, soffit and fascia.",
};

export default function SidingPage() {
  return (
    <SheetFrame sheet="siding">
      <Hero {...sidingHero} ctaHref="#product" ctaLabel="Explore siding" />
      <ProductIntro {...sidingIntro} features={sidingFeatures} />
      <Guarantee {...sidingGuarantee} />
      <CtaBand {...sidingCta} />
      <Faq faqs={sidingFaqs} />
    </SheetFrame>
  );
}
