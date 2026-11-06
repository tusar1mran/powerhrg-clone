import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ScheduleRow } from "@/lib/service-sheet";

type Props = {
  caption: string;
  rows: ScheduleRow[];
};

// Specification schedule: every item in the service's scope, its category, and where it is drawn
// or noted on the sheet. The cross-reference links jump to the callout or note.
export default function ScopeSchedule({ caption, rows }: Props) {
  return (
    <div className="border border-charcoal bg-paper">
      <Table className="text-[15px]">
        <TableCaption className="type-mono mt-0 border-t border-charcoal/40 px-4 py-3 text-left text-[11px] text-charcoal/75">
          {caption}
        </TableCaption>
        <TableHeader className="[&_tr]:border-charcoal">
          <TableRow className="hover:bg-transparent">
            <TableHead className="type-mono h-10 w-16 px-4 text-[11px] font-medium">Mark</TableHead>
            <TableHead className="type-mono h-10 px-4 text-[11px] font-medium">Item</TableHead>
            <TableHead className="type-mono hidden h-10 px-4 text-[11px] font-medium sm:table-cell">Category</TableHead>
            <TableHead className="type-mono h-10 px-4 text-[11px] font-medium">See</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.mark} className="border-charcoal/25 hover:bg-paper-deep/60">
              <TableCell className="type-mono px-4 py-3 align-top text-[12px]">{row.mark}</TableCell>
              <TableCell className="px-4 py-3 align-top font-semibold whitespace-normal">
                {row.item}
                <span className="mt-0.5 block text-[13px] font-normal text-charcoal/75 sm:hidden">{row.kind}</span>
              </TableCell>
              <TableCell className="hidden px-4 py-3 align-top text-charcoal/85 sm:table-cell">{row.kind}</TableCell>
              <TableCell className="px-4 py-3 align-top whitespace-normal">
                <a
                  href={row.ref.href}
                  className="type-mono text-[12px] underline decoration-gold decoration-2 underline-offset-4 hover:decoration-charcoal"
                >
                  <span className="sm:hidden">{row.ref.short}</span>
                  <span className="hidden sm:inline">{row.ref.label}</span>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
