import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ImageCardPair from "@/components/ImageCardPair";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import SameAddress from "@/components/services/SameAddress";
import Faq from "@/components/services/Faq";
import { faqs, reasons, servicesCta, servicesHero } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Exterior Renovation Services",
  description:
    "Replacement windows, roofing, siding, entry doors, attic insulation and exterior accessories, quoted in writing and installed by one licensed, insured crew.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero {...servicesHero} />
        <ServicesGrid />
        <SameAddress />
        <ImageCardPair eyebrow="Peace of mind" heading="Reasons to relax" cards={reasons} />
        <CtaBand {...servicesCta} />
        <Faq faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
