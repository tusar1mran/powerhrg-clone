import RichText from "@/components/RichText";
import type { FaqGroup } from "@/components/services/Faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ServiceSheet } from "@/lib/house-content";
import { Container, SectionHeader } from "../section";

const answerLinkClass = "font-semibold underline decoration-gold-600 decoration-2 underline-offset-4 hover:decoration-charcoal";

/** One tab's questions as an accordion. Several answers can be open at once. */
function FaqList({ group }: { group: FaqGroup }) {
  return (
    <Accordion type="multiple" className="border-t border-charcoal">
      {group.items.map((item) => (
        <AccordionItem key={item.q} value={item.q} className="border-b border-charcoal/20">
          <AccordionTrigger className="min-h-14 items-center py-4 text-[17px] leading-6 font-semibold hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 pb-6 text-[15px] leading-6 text-charcoal-700">
            <p>
              <RichText value={item.a} linkClassName={answerLinkClass} />
            </p>
            {item.list ? (
              <ul className="list-disc pl-5">
                {item.list.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            ) : null}
            {item.more?.map((paragraph, index) => (
              <p key={index}>
                <RichText value={paragraph} linkClassName={answerLinkClass} />
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Service FAQs, grouped into tabs when the content has more than one group. */
export function SheetFaq<K extends string>({ sheet }: { sheet: ServiceSheet<K> }) {
  const { faqs } = sheet;
  const [first] = faqs.groups;

  if (!first) {
    return null;
  }

  return (
    <section aria-labelledby="sheet-faq-title" className="border-t border-charcoal py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeader eyebrow={faqs.eyebrow} title={faqs.title} titleId="sheet-faq-title" className="lg:sticky lg:top-24 lg:self-start" />

        {faqs.groups.length > 1 ? (
          <Tabs defaultValue={first.tab} className="gap-6">
            <TabsList aria-label={faqs.title} className="h-auto flex-wrap gap-1 bg-paper-2 p-1 group-data-horizontal/tabs:h-auto">
              {faqs.groups.map((group) => (
                <TabsTrigger key={group.tab} value={group.tab} className="h-11 flex-none px-4 text-[15px] text-charcoal-700 data-active:text-charcoal">
                  {group.tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {faqs.groups.map((group) => (
              <TabsContent key={group.tab} value={group.tab}>
                <FaqList group={group} />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <FaqList group={first} />
        )}
      </Container>
    </section>
  );
}
