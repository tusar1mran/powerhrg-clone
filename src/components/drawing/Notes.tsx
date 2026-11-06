import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Numbered drawing notes ("GENERAL NOTES", "ROOFING NOTES"). An ordered list, so the numbers are
// real list numbers for screen readers; the printed mark is decorative.
//
//   <NoteList>
//     <NoteItem mark={1} title="Straight answers">We tell you what your house needs…</NoteItem>
//   </NoteList>

export function NoteList({ className, ...props }: ComponentProps<"ol">) {
  return <ol className={cn("grid gap-x-12 gap-y-8", className)} {...props} />;
}

type NoteItemProps = {
  mark: number;
  title: string;
  id?: string;
  children: ReactNode;
};

export function NoteItem({ mark, title, id, children }: NoteItemProps) {
  return (
    <li id={id} className="grid scroll-mt-32 grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2 border-t border-charcoal/30 pt-4">
      <span aria-hidden className="type-mono pt-0.5 text-[13px] font-semibold">
        {String(mark).padStart(2, "0")}
      </span>
      <div>
        <h3 className="type-sheet text-[15px] leading-snug">{title}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-charcoal/90">{children}</p>
      </div>
    </li>
  );
}
