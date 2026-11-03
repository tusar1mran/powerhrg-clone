import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import TextColumns from "@/components/support/TextColumns";
import Notice from "@/components/support/Notice";
import { hereToHelp } from "@/lib/support-content";
import { taxCreditsColumns, taxCreditsHero, taxCreditsNotice } from "@/lib/tax-credits-content";

export const metadata: Metadata = {
  title: "Energy Tax Credits (study clone)",
};

export default function TaxCreditsPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...taxCreditsHero} size="short" ctaHref="#content" ctaLabel="Explore Tax Credits" />
        <TextColumns id="content" columns={taxCreditsColumns} padTop padBottom />
        <Notice {...taxCreditsNotice} />
        <CtaBand {...hereToHelp} />
      </main>
      <Footer />
    </>
  );
}
