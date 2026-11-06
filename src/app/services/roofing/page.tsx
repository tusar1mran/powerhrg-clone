import type { Metadata } from "next";
import { NoteItem, NoteList } from "@/components/drawing/Notes";
import { SheetBlock } from "@/components/drawing/SheetSection";
import SitePhoto from "@/components/drawing/SitePhoto";
import CalloutLegend from "@/components/service-sheet/CalloutLegend";
import DetailFigure from "@/components/service-sheet/DetailFigure";
import RoofSection from "@/components/service-sheet/drawings/RoofSection";
import ScopeSchedule from "@/components/service-sheet/ScopeSchedule";
import SheetFaq from "@/components/service-sheet/SheetFaq";
import SheetIntro from "@/components/service-sheet/SheetIntro";
import WarrantyBlock from "@/components/service-sheet/WarrantyBlock";
import SheetFrame from "@/components/sheet/SheetFrame";
import WorkOrder from "@/components/sheet/WorkOrder";
import {
  roofingDetail,
  roofingFaqs,
  roofingNotes,
  roofingSchedule,
  roofingSections,
  roofingSheet,
  roofingSheetIntro,
  roofingWarranty,
  roofingWorkOrder,
} from "@/lib/roofing-content";
import { sheets } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Roof Replacement",
  description:
    "Full tear-off asphalt shingle roof replacement with deck repair, underlayment, flashing and ventilation, plus permits and daily cleanup.",
};

const sheet = sheets.roofing;

// Sheet A-200: the roof drawn as a section, eave to ridge, with each layer called out, then the
// written notes, the specification schedule, the warranty, questions and the work order.
export default function RoofingPage() {
  return (
    <SheetFrame sheet="roofing">
      <SheetIntro
        sheet={sheet}
        kicker={roofingSheetIntro.kicker}
        title={roofingSheetIntro.title}
        subtitle={roofingSheetIntro.subtitle}
      >
        <SitePhoto {...roofingSheetIntro.photo} aspect="4 / 3" loading="eager" fetchPriority="high" />
      </SheetIntro>

      <SheetBlock
        id="detail"
        number={roofingSections.detail.number}
        title={roofingSections.detail.label}
        reference={roofingSections.detail.ref}
        bodyClassName="flex flex-col gap-10"
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <h3 className="type-heading text-[30px] sm:text-[38px]">{roofingDetail.heading}</h3>
          <p className="max-w-[60ch] text-[16px] leading-[1.65] lg:pt-1">{roofingDetail.text}</p>
        </div>
        <DetailFigure
          number={roofingDetail.number}
          sheet={sheet.number}
          scale={roofingDetail.scale}
          title={roofingDetail.title}
          hint={roofingDetail.hint}
        >
          <RoofSection
            callouts={roofingSheet.callouts}
            title={roofingDetail.title}
            description={roofingDetail.description}
          />
        </DetailFigure>
        <CalloutLegend callouts={roofingSheet.callouts} />
      </SheetBlock>

      <SheetBlock
        id="notes"
        number={roofingSections.notes.number}
        title={roofingSections.notes.label}
        reference={roofingSections.notes.ref}
      >
        <p className="max-w-[60ch] text-[16px] leading-[1.65]">{roofingNotes.intro}</p>
        <NoteList className="mt-10 md:grid-cols-3">
          {roofingSheet.notes.map((note) => (
            <NoteItem key={note.anchor} id={note.anchor} mark={note.mark} title={note.title}>
              {note.text}
            </NoteItem>
          ))}
        </NoteList>
      </SheetBlock>

      <SheetBlock
        id="specification"
        number={roofingSections.schedule.number}
        title={roofingSections.schedule.label}
        reference={roofingSections.schedule.ref}
      >
        <h3 className="type-heading text-[30px] sm:text-[38px]">{roofingSchedule.heading}</h3>
        <div className="mt-8">
          <ScopeSchedule caption={roofingSchedule.caption} rows={roofingSheet.schedule} />
        </div>
      </SheetBlock>

      <SheetBlock
        id="warranty"
        number={roofingSections.warranty.number}
        title={roofingSections.warranty.label}
        reference={roofingSections.warranty.ref}
      >
        <WarrantyBlock
          eyebrow={roofingWarranty.eyebrow}
          title={roofingWarranty.title}
          text={roofingWarranty.text}
          cta={roofingWarranty.cta}
          href={roofingWarranty.href}
          photo={roofingWarranty.photo}
        />
      </SheetBlock>

      <SheetBlock
        id="faq"
        number={roofingSections.faq.number}
        title={roofingSections.faq.label}
        reference={roofingSections.faq.ref}
      >
        <SheetFaq groups={roofingFaqs} idPrefix="roofing-faq" />
      </SheetBlock>

      <SheetBlock
        id="work-order"
        number={roofingSections.workOrder.number}
        title={roofingSections.workOrder.label}
        reference={roofingSections.workOrder.ref}
      >
        <WorkOrder
          headingId="roofing-work-order-title"
          title={roofingWorkOrder.title}
          text={roofingWorkOrder.text}
          action={roofingWorkOrder.action}
          fields={roofingWorkOrder.fields}
        />
      </SheetBlock>
    </SheetFrame>
  );
}
