import RichText from "@/components/RichText";
import type { FaqGroup } from "@/components/services/Faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Props = {
  groups: FaqGroup[];
  /** Prefix for group ids, so two FAQ blocks on one page never collide. */
  idPrefix: string;
};

const linkClass = "underline decoration-gold decoration-2 underline-offset-3 hover:decoration-charcoal";

// Questions grouped the way a sheet groups its notes: a labelled column per group, answers that open
// in place. Every group is rendered (no tabs), so all answers stay findable with the browser's search.
export default function SheetFaq({ groups, idPrefix }: Props) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group, g) => {
        const labelId = `${idPrefix}-group-${g + 1}`;
        return (
          <div key={group.tab || g} className="grid gap-4 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
            <p id={labelId} className="type-sheet flex items-baseline gap-3 text-[15px] lg:block">
              <span className="type-mono text-[11px] font-normal text-charcoal/75 lg:block">
                {`FAQ-${String(g + 1).padStart(2, "0")}`}
              </span>
              <span className="lg:mt-1 lg:block">{group.tab || "Questions"}</span>
            </p>
            <Accordion
              type="multiple"
              role="group"
              aria-labelledby={labelId}
              className="border-t border-b border-charcoal bg-paper/80"
            >
              {group.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${labelId}-q${i + 1}`} className="border-charcoal/30 px-4 sm:px-5">
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent className="flex max-w-[68ch] flex-col gap-3">
                    <p>
                      <RichText value={item.a} linkClassName={linkClass} />
                    </p>
                    {item.list ? (
                      <ul className="list-disc pl-5">
                        {item.list.map((entry) => (
                          <li key={entry}>{entry}</li>
                        ))}
                      </ul>
                    ) : null}
                    {item.more?.map((more, j) => (
                      <p key={j}>
                        <RichText value={more} linkClassName={linkClass} />
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
