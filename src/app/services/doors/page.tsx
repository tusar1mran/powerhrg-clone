import type { Metadata } from "next";
import SheetFrame from "@/components/sheet/SheetFrame";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import ProductIntro from "@/components/services/ProductIntro";
import Guarantee from "@/components/services/Guarantee";
import Faq from "@/components/services/Faq";
import {
  doorsCta,
  doorsFaqs,
  doorsFeatures,
  doorsGuarantee,
  doorsHero,
  doorsIntro,
} from "@/lib/doors-content";

export const metadata: Metadata = {
  title: "Entry & Patio Doors",
  description:
    "Fiberglass and steel entry doors, storm doors, and sliding or hinged patio doors, fitted, sealed and adjusted by a licensed, insured crew.",
};

export default function DoorsPage() {
  return (
    <SheetFrame sheet="doors">
      <Hero {...doorsHero} ctaHref="#product" ctaLabel="Explore doors" />
      <ProductIntro {...doorsIntro} features={doorsFeatures} />
      <Guarantee {...doorsGuarantee} />
      <CtaBand {...doorsCta} />
      <Faq faqs={doorsFaqs} />
    </SheetFrame>
  );
}
