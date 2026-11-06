import type { ReactNode } from "react";
import CropMarks from "@/components/drawing/CropMarks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/sheet/MobileActionBar";
import TitleBlock from "@/components/sheet/TitleBlock";
import { skipLinkLabel, titleBlockAriaLabel } from "@/lib/sheet-content";
import { sheets, type SheetId } from "@/lib/sheets";

type Props = {
  /** Which sheet of the set this page is. Sets the header, the index highlight and the title block. */
  sheet: SheetId;
  children: ReactNode;
};

// Every page is a sheet in the drawing set: header and sheet index on top, then the sheet itself
// (bordered, gridded, with crop marks in the plotter margin) holding the page content and the title
// block, then the footer. The title block is one element: a pinned right-hand column on desktop and
// the last block of the sheet on mobile.
export default function SheetFrame({ sheet, children }: Props) {
  const entry = sheets[sheet];

  return (
    <div className="pb-14 lg:pb-0">
      <a
        href="#main"
        className="type-mono sr-only z-50 bg-charcoal px-4 py-3 text-[12px] text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {skipLinkLabel}
      </a>

      <Header current={sheet} />

      <div className="lg:p-8">
        <div className="relative mx-auto max-w-[1680px] border-y border-charcoal bg-drawing-grid lg:border lg:outline lg:outline-1 lg:outline-offset-4 lg:outline-charcoal/50">
          <CropMarks />
          <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem]">
            <main id="main" tabIndex={-1} className="min-w-0 focus:outline-none">
              {children}
            </main>
            <aside
              aria-label={titleBlockAriaLabel}
              className="border-t-[1.5px] border-charcoal lg:border-t-0 lg:border-l-[1.5px]"
            >
              <div className="lg:tall:sticky lg:tall:top-[106px]">
                <TitleBlock sheet={entry} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
      <MobileActionBar />
    </div>
  );
}
