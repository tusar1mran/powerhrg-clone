import Link from "next/link";
import { sheetIndexLabels } from "@/lib/sheet-content";
import { sheetIndex, type SheetId } from "@/lib/sheets";
import { cn } from "@/lib/utils";

// Desktop navigation: the sheet index as a ruled strip of numbered cells under the top bar.
// The current sheet is filled in ink with a gold revision bar.
export default function SheetIndexNav({ current }: { current: SheetId }) {
  return (
    <nav aria-label={sheetIndexLabels.heading} className="hidden border-t border-charcoal/40 lg:flex">
      <p className="type-mono hidden w-[7.5rem] shrink-0 items-center border-r border-charcoal/40 px-4 text-[11px] text-charcoal/80 xl:flex">
        {sheetIndexLabels.heading}
      </p>
      <ol className="flex min-w-0 flex-1">
        {sheetIndex.map((sheet) => {
          const active = sheet.id === current;
          return (
            <li key={sheet.id} className="min-w-0 flex-1 border-r border-charcoal/40 last:border-r-0">
              <Link
                href={sheet.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-12 flex-col justify-center px-3 transition-colors focus-visible:outline-offset-[-3px]",
                  active ? "on-ink bg-charcoal text-paper" : "hover:bg-paper-deep",
                )}
              >
                {active ? <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gold" /> : null}
                <span className={cn("type-mono text-[10.5px] leading-tight", active ? "text-paper/80" : "text-charcoal/75")}>
                  {sheet.number}
                </span>
                <span className="type-sheet truncate text-[13px] leading-tight">{sheet.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
