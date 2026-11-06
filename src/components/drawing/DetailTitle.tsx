import type { ReactNode } from "react";

type Props = {
  /** Detail number on the sheet, e.g. "1". */
  number: string;
  /** Sheet the detail is drawn on, e.g. "A-200". */
  sheet: string;
  /** Scale notation. Drawings on this site are diagrams, so this is "NTS" (not to scale). */
  scale: string;
  children: ReactNode;
};

// The title under a drawing, in the usual form: a split bubble (detail number over sheet number),
// the title on a heavy rule, and the scale underneath.
export default function DetailTitle({ number, sheet, scale, children }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className="flex size-14 shrink-0 flex-col items-center justify-center rounded-full border-[1.5px] border-charcoal bg-paper"
      >
        <span className="type-mono text-[15px] leading-none font-semibold">{number}</span>
        <span className="my-1 h-px w-9 bg-charcoal" />
        <span className="type-mono text-[9.5px] leading-none">{sheet}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="sr-only">{`Detail ${number} on sheet ${sheet}: `}</span>
        <span className="type-sheet block border-b-[2.5px] border-charcoal pb-1 text-[15px] leading-tight lg:text-[17px]">
          {children}
        </span>
        <span className="type-mono mt-1.5 block border-t border-charcoal/50 pt-1 text-[11px] text-charcoal/75">
          Scale: {scale === "NTS" ? <abbr title="Not to scale">NTS</abbr> : scale}
        </span>
      </span>
    </div>
  );
}
