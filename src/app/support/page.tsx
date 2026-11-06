import type { Metadata } from "next";
import Process from "@/components/Process";
import SplitRow from "@/components/SplitRow";
import Faq from "@/components/services/Faq";
import PageIntro from "@/components/support/PageIntro";
import ContactOptions from "@/components/support/ContactOptions";
import ContactForm from "@/components/support/ContactForm";
import { processSection } from "@/lib/content";
import { contactForm, contactOptions, licenses, supportFaqs, supportIntro, warranty } from "@/lib/support-content";

export const metadata: Metadata = {
  title: "Support & Free Quotes",
  description:
    "Book a free estimate, see how a project works, and find warranty, license and insurance details for Shah & Crew.",
};

// One page for everything "Support": contact, FAQs, process, warranty, licenses and the quote form.
export default function SupportPage() {
  return (
    <>
      <main id="main">
        <PageIntro {...supportIntro} />
        <ContactOptions {...contactOptions} />
        <Faq faqs={supportFaqs} />
        <Process {...processSection} cta={{ label: "Get a free quote", href: "#quote" }} />
        <SplitRow variant="contained" {...warranty} />
        <SplitRow variant="contained" {...licenses} />
        <ContactForm {...contactForm} />
      </main>
    </>
  );
}
