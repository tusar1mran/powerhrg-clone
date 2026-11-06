import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// A numbered block on a sheet: a ruled header strip (block number, title, drawing reference)
// followed by the block's content on the drafting grid. Compose the parts:
//
//   <SheetSection id="notes" aria-labelledby="notes-title">
//     <SheetSectionHeader>
//       <SheetSectionNumber>02</SheetSectionNumber>
//       <SheetSectionTitle id="notes-title">General notes</SheetSectionTitle>
//       <SheetSectionRef>A-000 / 02</SheetSectionRef>
//     </SheetSectionHeader>
//     <SheetSectionBody>…</SheetSectionBody>
//   </SheetSection>

export function SheetSection({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("border-t border-charcoal first:border-t-0", className)} {...props} />;
}

export function SheetSectionHeader({ className, ...props }: ComponentProps<"header">) {
  return <header className={cn("flex h-12 items-stretch border-b border-charcoal/40 bg-paper", className)} {...props} />;
}

export function SheetSectionNumber({ children }: { children: ReactNode }) {
  return (
    <span className="type-mono flex w-12 shrink-0 items-center justify-center border-r border-charcoal/40 text-[12px] font-medium">
      {children}
    </span>
  );
}

export function SheetSectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn("type-sheet flex min-w-0 items-center truncate px-4 text-[15px] lg:text-base", className)} {...props} />;
}

export function SheetSectionRef({ children }: { children: ReactNode }) {
  return (
    <span className="type-mono ml-auto hidden items-center border-l border-charcoal/40 px-4 text-[11px] text-charcoal/75 sm:flex">
      {children}
    </span>
  );
}

export function SheetSectionBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-4 py-12 sm:px-6 lg:px-12 lg:py-16", className)} {...props} />;
}
