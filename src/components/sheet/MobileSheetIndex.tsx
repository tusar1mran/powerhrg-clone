"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { callAction, quoteAction, sheetIndexLabels } from "@/lib/sheet-content";
import { sheetIndex, type SheetId } from "@/lib/sheets";
import { cn } from "@/lib/utils";

// Mobile navigation: the sheet index in a side panel (shadcn Sheet, so focus is trapped, Escape
// closes it and focus returns to the trigger). Picking a sheet closes the panel.
export default function MobileSheetIndex({ current }: { current: SheetId }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 px-3">
          <Menu data-icon="inline-start" aria-hidden />
          <span className="type-mono text-[12px]">Index</span>
          <span className="sr-only">{`: ${sheetIndexLabels.menuOpen}`}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto bg-drawing-grid sm:max-w-sm">
        <SheetHeader className="border-b border-charcoal px-4 py-4 pr-14">
          <SheetTitle className="text-[20px]">{sheetIndexLabels.heading}</SheetTitle>
          <SheetDescription className="text-[13px] text-charcoal/80">{sheetIndexLabels.menuDescription}</SheetDescription>
        </SheetHeader>

        <nav aria-label={sheetIndexLabels.heading}>
          <ol>
            {sheetIndex.map((sheet) => {
              const active = sheet.id === current;
              return (
                <li key={sheet.id} className="border-b border-charcoal/30">
                  <SheetClose asChild>
                    <Link
                      href={sheet.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "grid min-h-14 grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-2 px-4 focus-visible:outline-offset-[-3px]",
                        active ? "on-ink border-l-4 border-gold bg-charcoal pl-3 text-paper" : "bg-paper/80 hover:bg-paper-deep",
                      )}
                    >
                      <span className={cn("type-mono text-[12px]", active ? "text-paper/85" : "text-charcoal/80")}>
                        {sheet.number}
                      </span>
                      <span className="type-sheet text-[16px]">{sheet.title}</span>
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ol>
        </nav>

        <SheetFooter className="mt-auto border-t border-charcoal bg-paper p-4">
          <Button asChild size="lg" className="w-full justify-between">
            <Link href={quoteAction.href}>
              {quoteAction.label}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <a href={callAction.href}>{`${callAction.label} ${callAction.display}`}</a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
