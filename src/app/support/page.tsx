import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplitRow from "@/components/SplitRow";
import BillOfRights from "@/components/BillOfRights";
import Faq from "@/components/services/Faq";
import TrackProject from "@/components/services/TrackProject";
import PageIntro from "@/components/support/PageIntro";
import ContactForm from "@/components/support/ContactForm";
import { contactForm, fullRights, supportFaqs, supportIntro, supportLinks } from "@/lib/support-content";

export const metadata: Metadata = {
  title: "Customer Support and Service (study clone)",
};

export default function SupportPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <PageIntro {...supportIntro} />
        <div id="content">
          <Faq faqs={supportFaqs} />
        </div>
        <TrackProject />
        {supportLinks.map((row) => (
          <SplitRow key={row.title[0]} variant="contained" imageSide="left" {...row} />
        ))}
        <BillOfRights items={fullRights} />
        <ContactForm {...contactForm} />
      </main>
      <Footer />
    </>
  );
}
