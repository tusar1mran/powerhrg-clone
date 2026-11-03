import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProcessTimeline from "@/components/support/ProcessTimeline";
import PulseBand from "@/components/support/PulseBand";
import { ourProcessHero, processLabels, processPulse, processSteps } from "@/lib/our-process-content";

export const metadata: Metadata = {
  title: "Our Process (study clone)",
};

export default function OurProcessPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...ourProcessHero} size="short" ink="dark" ctaHref="#content" ctaLabel="What to Expect" />
        <ProcessTimeline labels={processLabels} steps={processSteps} />
        <PulseBand {...processPulse} />
      </main>
      <Footer />
    </>
  );
}
