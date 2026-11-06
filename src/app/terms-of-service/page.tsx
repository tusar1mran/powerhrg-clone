import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsBlocks, termsTitle } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Shah & Crew website, request a quote or agree to be contacted about your home project.",
};

export default function TermsPage() {
  return (
    <>
      <main id="main">
        <LegalDocument title={termsTitle} blocks={termsBlocks} />
      </main>
    </>
  );
}
