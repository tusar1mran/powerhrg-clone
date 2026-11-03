import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsBlocks, termsTitle } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service and Conditions (study clone)",
};

export default function TermsPage() {
  return (
    <>
      <Header transparentAtTop={false} />
      <main id="main">
        <LegalDocument title={termsTitle} blocks={termsBlocks} />
      </main>
      <Footer />
    </>
  );
}
