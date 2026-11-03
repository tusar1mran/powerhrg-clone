import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/services/Faq";
import TextColumns from "@/components/support/TextColumns";
import { hereToHelp } from "@/lib/support-content";
import { laborWarranty, manufacturerWarranties, warrantiesFaqs, warrantiesHero } from "@/lib/warranties-content";

export const metadata: Metadata = {
  title: "Warranties and Labor Coverage (study clone)",
};

export default function WarrantiesPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...warrantiesHero} size="short" ctaHref="#content" ctaLabel="Explore warranties" />
        <TextColumns id="content" columns={laborWarranty} padTop />
        <TextColumns columns={manufacturerWarranties} padBottom />
        <CtaBand {...hereToHelp} />
        <Faq faqs={warrantiesFaqs} />
      </main>
      <Footer />
    </>
  );
}
