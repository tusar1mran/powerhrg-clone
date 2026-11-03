"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import RichText, { type Rich } from "../RichText";

export type FaqItem = { q: string; a: Rich; list?: string[]; more?: Rich[] };
export type FaqGroup = { tab: string; items: FaqItem[] };

/**
 * Tabbed FAQ in a light-blue box. Pass a single group with an empty `tab` to get the
 * plain variant used on the accessories page: white background, no tabs, no sub-heading.
 */
export default function Faq({ faqs }: { faqs: FaqGroup[] }) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const current = faqs[tab];
  const plain = faqs.length === 1 && faqs[0].tab === "";

  return (
    <section className="bg-white px-0 pb-14 lg:px-6">
      <Reveal
        className={`mx-auto grid max-w-[1190px] gap-10 px-6 py-14 text-navy lg:grid-cols-[1fr_1.65fr] lg:px-[54px] lg:py-[74px] ${
          plain ? "" : "bg-sky-soft"
        }`}
      >
        <div>
          <h2 className="text-[30px] font-light tracking-card uppercase lg:text-[47px]">FAQs</h2>
          {!plain && (
            <ul role="tablist" aria-label="FAQ categories" className="mt-6 flex flex-wrap gap-4 lg:block lg:space-y-[10px]">
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
                    className={`px-[2px] text-[12px] font-bold tracking-[2.8px] uppercase lg:text-[13px] ${tab === i ? "bg-lime" : "hover:bg-lime/50"}`}
                  >
                    {f.tab}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div role={plain ? undefined : "tabpanel"}>
          {!plain && <h3 className="mb-6 text-[30px] font-light tracking-card uppercase lg:text-[47px]">{current.tab}</h3>}
          <ul className="border-b border-[#8ea9dc]">
            {current.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-t border-[#8ea9dc]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-[14px] text-left"
                  >
                    <span className="text-[12px] leading-[20px] font-bold tracking-[3px] uppercase lg:text-[14px] lg:tracking-[4.2px]">{item.q}</span>
                    <span aria-hidden className="text-[18px] font-light">{isOpen ? "−" : "+"}</span>
                  </button>
                  {/* grid-rows trick animates height without measuring */}
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
                    <div className="space-y-4 overflow-hidden text-[14px] leading-[24px] whitespace-pre-line">
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
