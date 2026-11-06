import type { ReactNode } from "react";

// Numbered callout bubble used in legends and notes, matching the bubbles drawn on the SVG details.
export default function CalloutMark({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="type-mono flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-charcoal bg-paper text-[13px] font-semibold"
    >
      {children}
    </span>
  );
}
