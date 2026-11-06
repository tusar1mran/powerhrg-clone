/* eslint-disable @next/next/no-img-element -- static SVG logo from /public */
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import MobileSheetIndex from "@/components/sheet/MobileSheetIndex";
import SheetIndexNav from "@/components/sheet/SheetIndexNav";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/links";
import { callAction, quoteAction, sheetSetLabel } from "@/lib/sheet-content";
import { sheets, type SheetId } from "@/lib/sheets";
import { site } from "@/lib/site";

type Props = {
  /** The sheet being viewed: shown in the bar and highlighted in the sheet index. */
  current: SheetId;
};

// Site header drawn as the top edge of a drawing set: a compact bar with the contractor, the current
// sheet, the phone number and the quote button, then the sheet index strip (desktop) or an index
// panel (mobile). Server component; only the mobile panel is a client component.
export default function Header({ current }: Props) {
  const sheet = sheets[current];

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal bg-paper text-charcoal">
      <div className="flex h-14 items-stretch">
        <Link
          href={links.home}
          aria-label={`${site.name}, cover sheet`}
          className="flex shrink-0 items-center border-r border-charcoal/40 px-4 focus-visible:outline-offset-[-3px] lg:px-5"
        >
          <img src="/assets/logo/shah-crew-icon-dark.svg" alt="" width={40} height={44} className="h-9 w-auto lg:hidden" />
          <img src="/assets/logo/shah-crew-dark.svg" alt="" width={118} height={44} className="hidden h-9 w-auto lg:block" />
        </Link>

        <p className="type-mono hidden items-center border-r border-charcoal/40 px-5 text-[11px] text-charcoal/80 xl:flex">
          {sheetSetLabel}
        </p>

        <p className="flex min-w-0 items-center gap-3 px-4 lg:px-5">
          <span className="type-mono shrink-0 border border-charcoal px-1.5 py-0.5 text-[11px] font-semibold">
            {sheet.number}
          </span>
          <span className="type-sheet truncate text-[15px]">{sheet.title}</span>
        </p>

        <div className="ml-auto flex items-center gap-2 pr-3 lg:hidden">
          <MobileSheetIndex current={current} />
        </div>

        <div className="ml-auto hidden items-stretch lg:flex">
          <a
            href={callAction.href}
            className="type-mono flex items-center gap-2 border-l border-charcoal/40 px-5 text-[13px] font-medium tracking-normal hover:bg-paper-deep focus-visible:outline-offset-[-3px]"
          >
            <Phone aria-hidden className="size-4" />
            <span className="sr-only">{`${callAction.label} `}</span>
            {callAction.display}
          </a>
          <Button asChild className="h-full border-y-0 border-r-0 px-6">
            <Link href={quoteAction.href}>
              {quoteAction.label}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>

      <SheetIndexNav current={current} />
    </header>
  );
}
