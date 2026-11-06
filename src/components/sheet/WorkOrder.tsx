import SheetActions from "@/components/sheet/SheetActions";
import { site } from "@/lib/site";

export type WorkOrderField = { label: string; value: string };

type Props = {
  title: string;
  text: string;
  action: { label: string; href: string };
  fields: WorkOrderField[];
  /** Id for the heading, so the ticket can be labelled by it. */
  headingId: string;
};

function WorkOrderRow({ index, label, children }: { index: number; label: string; children: string }) {
  return (
    <div className="grid grid-cols-[9rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-charcoal/40 py-3">
      <dt className="type-mono flex gap-3 text-[11px] text-charcoal/80">
        <span aria-hidden className="text-charcoal/60">
          {String(index).padStart(2, "0")}
        </span>
        {label}
      </dt>
      <dd className="text-[15px] font-semibold">{children}</dd>
    </div>
  );
}

// The quote call to action, printed as a work order ticket: tear-off edge, numbered fields and the
// two actions. It describes the free estimate; the form itself is on /support#quote.
export default function WorkOrder({ title, text, action, fields, headingId }: Props) {
  return (
    <article aria-labelledby={headingId} className="relative mx-auto max-w-[920px] border-[1.5px] border-charcoal bg-paper">
      {/* tear-off edge */}
      <div aria-hidden className="h-3 border-b border-dashed border-charcoal bg-paper-deep" />
      <header className="flex flex-wrap items-stretch border-b border-charcoal">
        <p aria-hidden className="type-display flex items-center px-5 py-4 text-[30px] sm:px-6 sm:text-[38px]">
          Work order
        </p>
        <p className="type-mono ml-auto flex items-center border-l border-charcoal bg-gold px-5 text-[12px] font-semibold text-charcoal">
          Free estimate
        </p>
      </header>

      <div className="grid gap-8 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:p-8">
        <div>
          <h3 id={headingId} className="type-heading text-[32px] sm:text-[40px]">
            {title}
          </h3>
          <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.6]">{text}</p>
        </div>

        <dl className="border-t border-charcoal/40">
          {fields.map((field, i) => (
            <WorkOrderRow key={field.label} index={i + 1} label={field.label}>
              {field.value}
            </WorkOrderRow>
          ))}
          <WorkOrderRow index={fields.length + 1} label="Issued by">
            {site.name}
          </WorkOrderRow>
        </dl>
      </div>

      <footer className="border-t border-charcoal bg-paper-deep/60 p-5 sm:p-6">
        <SheetActions quote={action} />
      </footer>
    </article>
  );
}
