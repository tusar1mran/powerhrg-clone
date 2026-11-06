import Link from "next/link";
import CoverSheetIndex from "@/components/cover/CoverSheetIndex";
import ProjectData from "@/components/cover/ProjectData";
import SequenceOfWork from "@/components/cover/SequenceOfWork";
import TrustSchedule from "@/components/cover/TrustSchedule";
import HouseElevation from "@/components/drawing/HouseElevation";
import { NoteItem, NoteList } from "@/components/drawing/Notes";
import { SheetBlock } from "@/components/drawing/SheetSection";
import SitePhoto from "@/components/drawing/SitePhoto";
import DetailFigure from "@/components/service-sheet/DetailFigure";
import SheetIntro from "@/components/service-sheet/SheetIntro";
import SheetFrame from "@/components/sheet/SheetFrame";
import WorkOrder from "@/components/sheet/WorkOrder";
import {
  coverElevationCallouts,
  coverGeneralSheets,
  coverLabels,
  coverSections,
  coverServiceSheets,
  coverSheet,
  homeWorkOrder,
  processSection,
  promise,
  trust,
} from "@/lib/content";
import { sheets } from "@/lib/sheets";
import { trustPoints } from "@/lib/trust";

const sheet = sheets.cover;

// Sheet A-000, the cover of the drawing set: project title and data, a key plan of the house whose
// callouts open each service sheet, the sheet index, general notes (our promise), the sequence of
// work, the trust title block and the work order for a free estimate.
export default function Home() {
  return (
    <SheetFrame sheet="cover">
      <SheetIntro sheet={sheet} kicker={coverSheet.kicker} title={coverSheet.title} subtitle={coverSheet.subtitle}>
        <div className="flex flex-col gap-6">
          <SitePhoto {...coverSheet.photo} aspect="3 / 2" loading="eager" fetchPriority="high" />
          <ProjectData heading={coverLabels.projectData} rows={coverSheet.projectData} />
        </div>
      </SheetIntro>

      <div className="px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">
        <DetailFigure
          number="1"
          sheet={sheet.number}
          scale="NTS"
          title={coverSheet.elevation.title}
          hint={coverSheet.elevation.hint}
        >
          <HouseElevation
            callouts={coverElevationCallouts}
            title={coverSheet.elevation.title}
            description={coverSheet.elevation.description}
          />
        </DetailFigure>
      </div>

      <SheetBlock id="sheet-index" number="01" title={coverSections.index.label} reference={coverSections.index.ref}>
        <h3 className="type-heading mb-10 text-[30px] sm:text-[38px]">{coverSections.index.title}</h3>
        <CoverSheetIndex
          serviceHeading={coverLabels.serviceSheets}
          generalHeading={coverLabels.generalSheets}
          openLabel={coverLabels.openSheet}
          services={coverServiceSheets}
          general={coverGeneralSheets}
        />
      </SheetBlock>

      <SheetBlock id="general-notes" number="02" title={coverSections.notes.label} reference={coverSections.notes.ref}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="type-heading text-[30px] sm:text-[38px]">{coverSections.notes.title}</h3>
          <Link
            href={promise.cta.href}
            className="text-[15px] font-semibold underline decoration-gold decoration-2 underline-offset-[6px] hover:decoration-charcoal"
          >
            {promise.cta.label}
          </Link>
        </div>
        {promise.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-[60ch] text-[16px] leading-[1.65]">
            {paragraph}
          </p>
        ))}
        <NoteList className="mt-10 md:grid-cols-2 xl:grid-cols-4">
          {promise.items.map((item, i) => (
            <NoteItem key={item.title} mark={i + 1} title={item.title}>
              {item.text}
            </NoteItem>
          ))}
        </NoteList>
      </SheetBlock>

      <SheetBlock id="sequence" number="03" title={coverSections.sequence.label} reference={coverSections.sequence.ref}>
        <SequenceOfWork
          title={processSection.title}
          steps={processSection.steps}
          stepLabel={coverLabels.step}
          cta={processSection.cta}
        />
      </SheetBlock>

      <SheetBlock id="trust" number="04" title={coverSections.trust.label} reference={coverSections.trust.ref}>
        <TrustSchedule title={trust.title} text={trust.text} refPrefix={coverLabels.trustRef} points={trustPoints} />
      </SheetBlock>

      <SheetBlock id="work-order" number="05" title={coverSections.workOrder.label} reference={coverSections.workOrder.ref}>
        <WorkOrder
          headingId="home-work-order-title"
          title={homeWorkOrder.title}
          text={homeWorkOrder.text}
          action={homeWorkOrder.action}
          fields={homeWorkOrder.fields}
        />
      </SheetBlock>
    </SheetFrame>
  );
}
