import type { Metadata } from "next";
import { ClosingPanel } from "@/components/house/ClosingPanel";
import HouseKeyPlan from "@/components/house/drawing/HouseKeyPlan";
import { SheetFaq } from "@/components/house/service/SheetFaq";
import { SheetHero } from "@/components/house/service/SheetHero";
import { SheetIncluded } from "@/components/house/service/SheetIncluded";
import { SheetSystem } from "@/components/house/service/SheetSystem";
import { SheetWarranty } from "@/components/house/service/SheetWarranty";
import { RoofCutaway } from "@/components/house/story/RoofLayers";
import { roofLayers } from "@/lib/house/layers";
import { roofingSheet } from "@/lib/house-content";

export const metadata: Metadata = {
  title: "Roof Replacement",
  description:
    "Full tear-off asphalt shingle roof replacement with deck repair, underlayment, flashing and ventilation, plus permits and daily cleanup.",
};

// Service-page template of the "Your House" concept: a close-up drawing of one part of the house
// with its layers numbered, the key to those layers, the rest of the included work, the warranty,
// FAQs and a last call to action.
export default function RoofingPage() {
  const sheet = roofingSheet;

  return (
    <main id="main">
      <SheetHero sheet={sheet} figure={<RoofCutaway />} />
      <SheetSystem sheet={sheet} order={roofLayers} />
      <SheetIncluded sheet={sheet} />
      <SheetWarranty sheet={sheet} />
      <SheetFaq sheet={sheet} />
      <ClosingPanel
        title={sheet.closing.title.join(" ")}
        text={sheet.closing.text}
        quote={sheet.actions.quote}
        callLabel={sheet.actions.callLabel}
        aside={<HouseKeyPlan highlight={sheet.service} className="mx-auto max-w-[420px]" />}
      />
    </main>
  );
}
