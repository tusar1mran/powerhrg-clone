import type { ReactNode } from "react";
import DetailTitle from "@/components/drawing/DetailTitle";

type Props = {
  number: string;
  sheet: string;
  scale: string;
  title: string;
  /** Short reading hint shown under the drawing title. */
  hint?: string;
  /** The drawing itself (an SVG with its own title and description). */
  children: ReactNode;
};

// Frames a detail drawing on the sheet. Below the md breakpoint the drawing keeps a readable width
// and pans sideways inside a keyboard-focusable region instead of shrinking its labels.
export default function DetailFigure({ number, sheet, scale, title, hint, children }: Props) {
  return (
    <figure className="border border-charcoal bg-paper">
      <div
        role="region"
        aria-label={`${title}, drawing`}
        tabIndex={0}
        className="overflow-x-auto overscroll-x-contain focus-visible:outline-offset-[-4px]"
      >
        <div className="min-w-[720px] p-2 md:min-w-0 md:p-4">{children}</div>
      </div>
      <figcaption className="border-t border-charcoal/40 px-4 py-4 sm:px-6">
        <DetailTitle number={number} sheet={sheet} scale={scale}>
          {title}
        </DetailTitle>
        {hint ? <p className="mt-3 text-[14px] leading-[1.5] text-charcoal/80">{hint}</p> : null}
        <p className="type-mono mt-2 text-[11px] text-charcoal/75 md:hidden">Swipe sideways to see the whole drawing.</p>
      </figcaption>
    </figure>
  );
}
