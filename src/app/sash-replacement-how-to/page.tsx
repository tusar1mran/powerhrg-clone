import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import SplitRow from "@/components/SplitRow";
import Faq from "@/components/services/Faq";
import TextColumns from "@/components/support/TextColumns";
import SectionDivider from "@/components/support/SectionDivider";
import VideoBlock from "@/components/support/VideoBlock";
import { installSteps, removeSteps, sashBullets, sashFaqs, sashHelp, sashHero, sashVideo } from "@/lib/sash-content";

export const metadata: Metadata = {
  title: "Window Sash Installation Guide (study clone)",
};

export default function SashReplacementPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...sashHero} size="short" ctaHref="#content" ctaLabel="Explore" />
        <VideoBlock id="content" {...sashVideo} />
        <TextColumns columns={sashBullets} padTop padBottom centerFirst />
        <SectionDivider title="Removing the old sash" />
        {removeSteps.map((s) => (
          <SplitRow key={s.badge} variant="contained" imageSide="left" tone="white" {...s} />
        ))}
        <SectionDivider title="Installing the new sash" />
        {installSteps.map((s) => (
          <SplitRow key={s.badge} variant="contained" imageSide="left" tone="white" {...s} />
        ))}
        <Faq faqs={sashFaqs} heading="Frequently asked questions" variant="boxed" />
        <div className="h-[90px]" />
        <CtaBand {...sashHelp} variant="link" />
      </main>
      <Footer />
    </>
  );
}
