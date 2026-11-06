import type { LayerNote } from "@/lib/house/layers";
import { cn } from "@/lib/utils";

type Props<K extends string> = {
  /** Layer keys in installation order; the position gives each note its callout number. */
  order: readonly K[];
  notes: Record<K, LayerNote>;
  className?: string;
};

/** Numbered layer notes that match the callout bubbles on a layer diagram. */
export function LayerNotes<K extends string>({ order, notes, className }: Props<K>) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {order.map((key, index) => {
        const note = notes[key];
        return (
          <li key={key} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-charcoal/20 py-5 first:border-t-charcoal">
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-full border border-charcoal bg-gold font-mono text-[13px] font-medium"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <h4 className="text-[17px] leading-6 font-semibold">{note.title}</h4>
              <p className="max-w-[56ch] text-[15px] leading-6 text-charcoal-700">{note.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
