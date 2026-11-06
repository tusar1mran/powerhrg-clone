import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SplitRow from "@/components/SplitRow";
import CtaBand from "@/components/CtaBand";
import OurPromise from "@/components/OurPromise";
import Values from "@/components/about/Values";
import Faq from "@/components/services/Faq";
import { aboutCta, aboutFaqs, aboutHero, aboutStory, aboutValues, serviceArea } from "@/lib/about-content";
import { promise } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Shah & Crew: an exterior renovation company that quotes in writing, does its own installs, and stands behind the work with a written warranty.",
};

// One page for everything "About": story, values, our promise and where we work.
export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero {...aboutHero} size="short" ctaHref="#story" ctaLabel="How we work" />
        <SplitRow id="story" variant="contained" imageSide="left" tone="white" {...aboutStory} />
        <Values id="values" {...aboutValues} />
        <OurPromise {...promise} cta={undefined} />
        <CtaBand {...serviceArea} />
        <Faq faqs={aboutFaqs} />
        <CtaBand {...aboutCta} />
      </main>
    </>
  );
}
