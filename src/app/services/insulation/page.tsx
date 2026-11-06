import type { Metadata } from "next";
import SheetFrame from "@/components/sheet/SheetFrame";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import ProductIntro from "@/components/services/ProductIntro";
import Guarantee from "@/components/services/Guarantee";
import Faq from "@/components/services/Faq";
import {
  insulationCta,
  insulationFaqs,
  insulationFeatures,
  insulationGuarantee,
  insulationHero,
  insulationIntro,
} from "@/lib/insulation-content";

export const metadata: Metadata = {
  title: "Attic Insulation",
  description:
    "Attic air sealing and blown-in fiberglass or cellulose insulation, installed to the level recommended for your climate zone and local code.",
};

export default function InsulationPage() {
  return (
    <SheetFrame sheet="insulation">
      <Hero {...insulationHero} ctaHref="#product" ctaLabel="Explore insulation" />
      <ProductIntro {...insulationIntro} features={insulationFeatures} />
      <Guarantee {...insulationGuarantee} />
      <CtaBand {...insulationCta} />
      <Faq faqs={insulationFaqs} />
    </SheetFrame>
  );
}
