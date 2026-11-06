import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import Process from "@/components/Process";
import TrustPoints from "@/components/TrustPoints";
import OurPromise from "@/components/OurPromise";
import ImageCardPair from "@/components/ImageCardPair";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { homeCards, homeCta, homeHero, processSection, promise, trust } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero {...homeHero} />
        <ServicesGrid />
        <Process {...processSection} />
        <TrustPoints {...trust} />
        <OurPromise {...promise} />
        <ImageCardPair eyebrow="Get to know us" heading="The people behind the work" cards={homeCards} />
        <CtaBand {...homeCta} />
      </main>
      <Footer />
    </>
  );
}
