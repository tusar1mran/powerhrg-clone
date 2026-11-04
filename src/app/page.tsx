import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesCarousel from "@/components/ServicesCarousel";
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
        <Hero onDark {...homeHero} />
        <ServicesCarousel />
        <Process {...processSection} />
        <TrustPoints {...trust} />
        <OurPromise {...promise} />
        <ImageCardPair heading="Get to know us" cards={homeCards} />
        <CtaBand {...homeCta} />
      </main>
      <Footer />
    </>
  );
}
