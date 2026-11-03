import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCardPair from "@/components/ImageCardPair";
import Faq from "@/components/services/Faq";
import PageIntro from "@/components/support/PageIntro";
import LocationTabs from "@/components/support/LocationTabs";
import { locations, locationsCards, locationsFaqs, locationsIntro, locationsMap } from "@/lib/locations-content";

export const metadata: Metadata = {
  title: "Locations (study clone)",
};

export default function LocationsPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <PageIntro {...locationsIntro} />
        <div id="content">
          <LocationTabs locations={locations} map={locationsMap} />
        </div>
        <Faq faqs={locationsFaqs} variant="boxed" />
        <div className="h-[100px]" />
        <ImageCardPair heading="Learn more" cards={locationsCards} tone="sky" />
      </main>
      <Footer />
    </>
  );
}
