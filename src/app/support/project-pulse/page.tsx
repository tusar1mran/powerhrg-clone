import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import ImageCardPair from "@/components/ImageCardPair";
import Faq from "@/components/services/Faq";
import Testimonial from "@/components/services/Testimonial";
import TextColumns from "@/components/support/TextColumns";
import FeatureRows from "@/components/support/FeatureRows";
import { pulseCta, pulseFaqs, pulseFeatures, pulseHero, pulseIntro, pulseNews, pulseTestimonial } from "@/lib/project-pulse-content";

export const metadata: Metadata = {
  title: "Project Pulse (study clone)",
};

export default function ProjectPulsePage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...pulseHero} onDark size="short" buttonVariant="outline" overlay ctaHref="#content" ctaLabel="Learn More" />
        <TextColumns id="content" columns={pulseIntro} />
        <FeatureRows {...pulseFeatures} />
        <Testimonial {...pulseTestimonial} link={null} />
        <div className="hidden h-20 md:block" />
        <Faq faqs={pulseFaqs} />
        <CtaBand {...pulseCta} tone="navy" />
        <ImageCardPair heading="Project Pulse in the News" cards={pulseNews} verticalTitle={false} />
      </main>
      <Footer />
    </>
  );
}
