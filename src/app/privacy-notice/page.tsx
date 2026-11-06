import type { Metadata } from "next";
import SheetFrame from "@/components/sheet/SheetFrame";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyBlocks, privacyTitle } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Shah & Crew collects, uses, shares and protects the personal information you give us through this website and when you contact us.",
};

export default function PrivacyNoticePage() {
  return (
    <SheetFrame sheet="privacy">
      <LegalDocument title={privacyTitle} blocks={privacyBlocks} />
    </SheetFrame>
  );
}
