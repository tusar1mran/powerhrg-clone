import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
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
    <>
      <Header />
      <main id="main">
        <Hero {...doorsHero} ctaHref="#product" ctaLabel="Explore doors" />
        <ProductIntro {...doorsIntro} features={doorsFeatures} />
        <Guarantee {...doorsGuarantee} />
        <CtaBand {...doorsCta} />
        <Faq faqs={doorsFaqs} />
      </main>
      <Footer />
    </>
  );
}
