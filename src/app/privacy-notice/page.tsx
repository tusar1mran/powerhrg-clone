import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyBlocks, privacyTitle } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Notice (study clone)",
};

export default function PrivacyNoticePage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <LegalDocument title={privacyTitle} blocks={privacyBlocks} />
      </main>
      <Footer />
    </>
  );
}
