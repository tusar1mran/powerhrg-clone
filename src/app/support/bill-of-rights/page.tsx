import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ImageCardPair from "@/components/ImageCardPair";
import TextColumns from "@/components/support/TextColumns";
import NumberedList from "@/components/support/NumberedList";
import { billOfRightsCards, billOfRightsHero, billOfRightsIntro, billOfRightsList } from "@/lib/bill-of-rights-content";

export const metadata: Metadata = {
  title: "Homeowner Bill of Rights (study clone)",
};

export default function BillOfRightsPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...billOfRightsHero} size="short" ctaHref="#content" ctaLabel="Explore Customer Rights" />
        <TextColumns id="content" columns={billOfRightsIntro} padTop />
        <NumberedList items={billOfRightsList} />
        <ImageCardPair heading="Reasons to Relax" cards={billOfRightsCards} tone="sky" />
      </main>
      <Footer />
    </>
  );
}
