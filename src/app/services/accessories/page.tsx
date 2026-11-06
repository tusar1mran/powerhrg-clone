import type { Metadata } from "next";
import SheetFrame from "@/components/sheet/SheetFrame";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import ProductIntro from "@/components/services/ProductIntro";
import Guarantee from "@/components/services/Guarantee";
import Faq from "@/components/services/Faq";
import {
  accessoriesCta,
  accessoriesFaqs,
  accessoriesFeatures,
  accessoriesGuarantee,
  accessoriesHero,
  accessoriesIntro,
} from "@/lib/accessories-content";

export const metadata: Metadata = {
  title: "Exterior Accessories",
  description:
    "Gutters, gutter guards, soffit and fascia, trim capping, shutters, storm doors, screens and attic vents, installed alone or with a larger project.",
};

export default function AccessoriesPage() {
  return (
    <SheetFrame sheet="accessories">
      <Hero {...accessoriesHero} ctaHref="#product" ctaLabel="Explore accessories" />
      <ProductIntro {...accessoriesIntro} features={accessoriesFeatures} />
      <Guarantee {...accessoriesGuarantee} />
      <CtaBand {...accessoriesCta} />
      <Faq faqs={accessoriesFaqs} />
    </SheetFrame>
  );
}
