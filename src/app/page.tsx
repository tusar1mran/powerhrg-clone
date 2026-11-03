import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesCarousel from "@/components/ServicesCarousel";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import BillOfRights from "@/components/BillOfRights";
import Awards from "@/components/Awards";
import ImageCardPair from "@/components/ImageCardPair";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";
import { people } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero
          onDark
          title={["Our work shows"]}
          subtitle={["Over 30 years of experience improving everything we touch."]}
          image="/assets/home/hero.png"
          mobileImage="/assets/home/hero-mobile.jpg"
        />
        <ServicesCarousel />
        <Process />
        <Stats />
        <BillOfRights />
        <Awards />
        <ImageCardPair heading="Power is our people" cards={people} />
        <LatestNews />
      </main>
      <Footer />
    </>
  );
}
