"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import RichText, { type Rich } from "../RichText";

export type FaqItem = { q: string; a: Rich; list?: string[]; more?: Rich[] };
export type FaqGroup = { tab: string; items: FaqItem[] };
type Props = { faqs: FaqGroup[]; heading?: string; intro?: string; variant?: "boxed" | "plain"; animate?: boolean };

/**
 * Tabbed FAQ in a sand-coloured box. Pass a single group with an empty `tab` to get the
 * plain variant used on the accessories page: white background, no tabs, no sub-heading.
 */
export default function Faq({ faqs, heading = "FAQs", intro, variant, animate = true }: Props) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const current = faqs[tab];
  const plain = variant ? variant === "plain" : faqs.length === 1 && faqs[0].tab === "";
  const showTabs = !plain && faqs.some((f) => f.tab !== "");

  return (
    <section className="bg-white px-0 pb-14 lg:px-6 lg:pt-14">
      <Reveal
        speed="normal"
        still={!animate}
        className={`mx-auto grid max-w-[1190px] gap-10 px-6 py-14 text-charcoal lg:grid-cols-[1fr_1.65fr] lg:px-[54px] lg:py-[74px] ${
          plain ? "" : "bg-sand lg:rounded-3xl"
        }`}
      >
        <div>
          <h2 className="font-display text-[34px] leading-tight font-medium tracking-display lg:text-[48px]">{heading}</h2>
          {intro && <p className="mt-6 text-[16px] leading-[1.55] xl:text-[19px]">{intro}</p>}
          {showTabs && (
            <ul role="tablist" aria-label="FAQ categories" className="mt-6 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {faqs.map((f, i) => (
                <li key={f.tab}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === i}
                    onClick={() => {
                      setTab(i);
                      setOpen(null);
                    }}
                    className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                      tab === i ? "bg-charcoal text-white" : "text-charcoal hover:bg-oat/60"
                    }`}
                  >
                    {f.tab}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div role={plain ? undefined : "tabpanel"}>
          {!plain && current.tab && <h3 className="mb-6 font-display text-[30px] leading-tight font-medium tracking-display lg:text-[40px]">{current.tab}</h3>}
          <ul className="border-b border-oat">
            {current.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-t border-oat">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-[18px] text-left"
                  >
                    <span className="text-[16px] leading-[24px] font-semibold lg:text-[17px]">{item.q}</span>
                    <span
                      aria-hidden
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[18px] leading-none transition-colors ${
                        isOpen ? "bg-gold text-charcoal" : "border border-charcoal/25 text-charcoal"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {/* grid-rows trick animates height without measuring */}
                  <div className={`grid transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
                    <div className="space-y-4 overflow-hidden text-[15px] leading-[25px] whitespace-pre-line text-charcoal/90">
                      <p>
                        <RichText value={item.a} />
                      </p>
                      {item.list && (
                        <ul className="list-disc space-y-1 pl-5">
                          {item.list.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                      )}
                      {item.more?.map((m, j) => (
                        <p key={j}>
                          <RichText value={m} />
                        </p>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
