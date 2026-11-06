import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichText from "@/components/RichText";
import type { FaqGroup } from "@/components/services/Faq";

type Props = { heading?: string; faqs: FaqGroup[] };

// Roofing FAQs in the redesign: shadcn Tabs for the groups, an Accordion for the questions.
export default function RoofingFaq({ heading = "FAQs", faqs }: Props) {
  const first = faqs[0]?.tab ?? "";

  return (
    <section id="faqs" aria-labelledby="faqs-title" className="scroll-mt-20 bg-charcoal-900 px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <h2
          id="faqs-title"
          className="font-heading text-[48px] leading-[0.95] font-semibold tracking-tightest text-white sm:text-[72px] lg:sticky lg:top-28 lg:self-start lg:text-[96px]"
        >
          {heading}
        </h2>
        <Tabs defaultValue={first} className="gap-6">
          <TabsList variant="line" className="h-auto flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
            {faqs.map((group) => (
              <TabsTrigger
                key={group.tab}
                value={group.tab}
                className="h-10 flex-none rounded-full border border-white/12 px-4 text-[14px] text-white/70 data-active:border-gold/60 data-active:text-white"
              >
                {group.tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {faqs.map((group) => (
            <TabsContent key={group.tab} value={group.tab}>
              <Accordion className="border-t border-white/10">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="border-white/10">
                    <AccordionTrigger className="py-5 font-heading text-[18px] font-semibold text-white hover:no-underline lg:text-[21px]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-[16px] leading-relaxed text-white/75">
                      <p>
                        <RichText value={item.a} linkClassName="text-gold underline underline-offset-4 hover:text-white" />
                      </p>
                      {item.list ? (
                        <ul className="mt-3 list-disc pl-5">
                          {item.list.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      ) : null}
                      {item.more?.map((paragraph, index) => (
                        <p key={index} className="mt-3">
                          <RichText value={paragraph} linkClassName="text-gold underline underline-offset-4 hover:text-white" />
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
