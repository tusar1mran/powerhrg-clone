"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../Reveal";
import RichText, { type Rich } from "../RichText";

export type FaqItem = { q: string; a: Rich; list?: string[]; more?: Rich[] };
export type FaqGroup = { tab: string; items: FaqItem[] };
type Props = { faqs: FaqGroup[]; heading?: string; intro?: string; variant?: "boxed" | "plain"; animate?: boolean };

export default function Faq({ faqs, heading = "Questions, answered", intro, variant, animate = true }: Props) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const current = faqs[tab];
  const plain = variant ? variant === "plain" : faqs.length === 1 && faqs[0].tab === "";
  const showTabs = !plain && faqs.some((f) => f.tab !== "");

  return (
    <section className="py-20 lg:py-28">
      <Reveal speed="normal" still={!animate} className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-accent-ink">FAQ</p>
          <h2 className="display-2 mt-4 text-brand">{heading}</h2>
          {intro && <p className="lead mt-5 text-muted">{intro}</p>}
          {showTabs && (
            <ul role="tablist" aria-label="FAQ categories" className="mt-8 flex flex-wrap gap-2">
              {faqs.map((f, i) => (
                <li key={f.tab}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === i}
                    onClick={() => {
                      setTab(i);
                      setOpen(0);
                    }}
                    className={`h-10 rounded-full px-4 text-[14px] font-bold transition-colors ${
                      tab === i ? "bg-brand text-on-brand" : "border border-line bg-white text-ink hover:border-ink"
                    }`}
                  >
                    {f.tab}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul role={showTabs ? "tabpanel" : undefined} className="space-y-3">
          {current.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`rounded-[var(--radius-card)] border transition-colors ${isOpen ? "border-transparent bg-cream" : "border-line bg-white"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left lg:px-7"
                >
                  <span className="text-[16.5px] font-bold text-ink lg:text-[17.5px]">{item.q}</span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-accent text-ink" : "bg-cream text-ink"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  inert={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 px-6 pb-6 text-[15.5px] leading-relaxed whitespace-pre-line text-muted lg:px-7">
                      <p>
                        <RichText value={item.a} linkClassName="font-semibold text-accent-ink underline underline-offset-2 hover:no-underline" />
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
                          <RichText value={m} linkClassName="font-semibold text-accent-ink underline underline-offset-2 hover:no-underline" />
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
