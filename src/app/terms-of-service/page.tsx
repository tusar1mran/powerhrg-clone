import type { Metadata } from "next";
import SheetFrame from "@/components/sheet/SheetFrame";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsBlocks, termsTitle } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Shah & Crew website, request a quote or agree to be contacted about your home project.",
};

export default function TermsPage() {
  return (
    <SheetFrame sheet="terms">
      <LegalDocument title={termsTitle} blocks={termsBlocks} />
    </SheetFrame>
  );
}
