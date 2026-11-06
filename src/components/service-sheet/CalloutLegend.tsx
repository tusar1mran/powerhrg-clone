import CalloutMark from "@/components/drawing/CalloutMark";
import type { ResolvedCallout } from "@/lib/service-sheet";

type Props<Part extends string> = {
  callouts: ResolvedCallout<Part>[];
};

// Keynote legend for a detail drawing: one entry per numbered callout, with the part name and the
// feature copy that explains it. Each entry is an anchor target for the specification schedule.
export default function CalloutLegend<Part extends string>({ callouts }: Props<Part>) {
  return (
    <ol className="grid border-t border-l border-charcoal/40 sm:grid-cols-2 xl:grid-cols-3">
      {callouts.map((c) => (
        <li
          key={c.mark}
          id={c.anchor}
          className="scroll-mt-32 border-r border-b border-charcoal/40 bg-paper p-4 target:bg-gold/15 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <CalloutMark>{c.mark}</CalloutMark>
            <p className="type-mono text-[11px] text-charcoal/75">{c.label}</p>
          </div>
          <h3 className="type-heading mt-3 text-[22px]">{c.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-charcoal/90">{c.text}</p>
        </li>
      ))}
    </ol>
  );
}
