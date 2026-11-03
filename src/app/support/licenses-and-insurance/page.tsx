import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import SplitRow from "@/components/SplitRow";
import Faq from "@/components/services/Faq";
import { hereToHelp } from "@/lib/support-content";
import { insuranceCertificate, licenses, licensesHero, licensesIntro } from "@/lib/licenses-content";

export const metadata: Metadata = {
  title: "Licensed and Insured Installers (study clone)",
};

export default function LicensesPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <Hero {...licensesHero} size="short" ctaHref="#content" ctaLabel="explore insurance" />
        <div id="content">
          <Faq faqs={licenses} {...licensesIntro} variant="plain" />
        </div>
        <SplitRow variant="contained" imageSide="left" tone="pale" {...insuranceCertificate} />
        <CtaBand {...hereToHelp} variant="link" />
      </main>
      <Footer />
    </>
  );
}
