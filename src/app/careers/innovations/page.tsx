import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import SplitRow from "@/components/SplitRow";
import VideoBlock from "@/components/community/VideoBlock";
import IconGrid from "@/components/careers/IconGrid";
import Accolades from "@/components/careers/Accolades";
import { applyCta } from "@/lib/careers-content";
import { innovationsAccolades, innovationsCta, innovationsHero, innovationsIntro, leader, nitro, nitroVideo } from "@/lib/innovations-content";

export const metadata: Metadata = {
  title: "Innovative Tech Careers (study clone)",
};

export default function InnovationsPage() {
  return (
    <>
      <Header transparentAtTop={false} cta={applyCta} />
      <main id="main">
        <Hero {...innovationsHero} onDark ctaHref="#innovations" ctaLabel="Explore innovations" />
        <IconGrid id="innovations" {...innovationsIntro} />
        <SplitRow variant="contained" {...nitro} imageAlt="Co-workers collaborating during Nitro Create" imageSide="right" tone="blue" />
        <div className="pt-16 lg:pt-20">
          <VideoBlock {...nitroVideo} />
        </div>
        <SplitRow variant="contained" {...leader} imageAlt="Timothy G. Wenhold at Nitro Create" imageSide="right" tone="white" />
        <Accolades {...innovationsAccolades} />
        <CtaBand {...innovationsCta} tone="white" variant="link" />
      </main>
      <Footer />
    </>
  );
}
