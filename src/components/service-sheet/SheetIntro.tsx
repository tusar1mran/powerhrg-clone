import type { ReactNode } from "react";
import SheetActions from "@/components/sheet/SheetActions";
import type { SheetEntry } from "@/lib/sheets";

type Props = {
  sheet: SheetEntry;
  kicker: string;
  title: string[];
  subtitle: string[];
  /** Media beside the title, usually a <SitePhoto>. */
  children?: ReactNode;
};

// Opening block of a sheet: sheet reference, drawing-style page title, one-paragraph summary and the
// two actions, with an optional site photo beside it.
export default function SheetIntro({ sheet, kicker, title, subtitle, children }: Props) {
  return (
    <div className="grid gap-10 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-12 lg:px-12 lg:pt-14 lg:pb-16">
      <div>
        <p className="type-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-charcoal/80">
          <span className="border border-charcoal px-2 py-0.5 font-semibold text-charcoal">{sheet.number}</span>
          <span>{sheet.title}</span>
          <span aria-hidden>·</span>
          <span>{kicker}</span>
        </p>
        <h1 className="type-display mt-6 text-[52px] sm:text-[72px] xl:text-[92px]">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] lg:text-[18px]">{subtitle.join(" ")}</p>
        <SheetActions className="mt-8" />
      </div>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
