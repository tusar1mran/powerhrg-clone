"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../Reveal";
import RichText, { type Rich } from "../RichText";
import { useLayout } from "../layout/useLayout";

export type FaqItem = { q: string; a: Rich; list?: string[]; more?: Rich[] };
export type FaqGroup = { tab: string; items: FaqItem[] };
type Props = { faqs: FaqGroup[]; heading?: string; intro?: string; variant?: "boxed" | "plain"; animate?: boolean };

const richLink = "font-semibold text-accent-ink underline underline-offset-2 hover:no-underline";

function Answer({ item }: { item: FaqItem }) {
  return (
    <>
      <p>
        <RichText value={item.a} linkClassName={richLink} />
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
          <RichText value={m} linkClassName={richLink} />
        </p>
      ))}
    </>
  );
}

export default function Faq({ faqs, heading = "Questions, answered", intro, variant, animate = true }: Props) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const style = useLayout().sections.faq;
  const current = faqs[tab];
  const plain = variant ? variant === "plain" : faqs.length === 1 && faqs[0].tab === "";
  const showTabs = !plain && faqs.some((f) => f.tab !== "");
  const stacked = style === "stacked";

  const tabs = showTabs && (
    <ul role="tablist" aria-label="FAQ categories" className={`mt-8 flex flex-wrap gap-2 ${stacked ? "justify-center" : ""}`}>
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
            className={`h-10 rounded-[var(--radius-btn)] px-4 text-[14px] font-bold transition-colors ${
              tab === i ? "bg-brand text-on-brand" : "border border-line bg-white text-ink hover:border-ink"
            }`}
          >
            {f.tab}
          </button>
        </li>
      ))}
    </ul>
  );

  const intro_ = (
    <div className={stacked ? "mx-auto max-w-[720px] text-center" : ""}>
      <p className="eyebrow text-accent-ink">FAQ</p>
      <h2 className="display-2 mt-4 text-brand">{heading}</h2>
      {intro && <p className="lead mt-5 text-muted">{intro}</p>}
      {tabs}
    </div>
  );

  const toggle = (i: number) => setOpen(open === i ? null : i);

  if (stacked) {
    return (
      <section className="py-20 lg:py-28">
        <Reveal speed="normal" still={!animate} className="container-page">
          {intro_}
          <ul role={showTabs ? "tabpanel" : undefined} className="mx-auto mt-12 max-w-[860px] border-b border-line">
            {current.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-t border-line">
                  <button type="button" aria-expanded={isOpen} onClick={() => toggle(i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className="text-[18px] font-bold text-ink lg:text-[20px]">{item.q}</span>
                    <Plus aria-hidden className={`h-6 w-6 shrink-0 text-accent-ink transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} inert={!isOpen}>
                    <div className="overflow-hidden">
                      <div className="max-w-[720px] space-y-4 pb-7 text-[16px] leading-relaxed whitespace-pre-line text-muted">
                        <Answer item={item} />
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

  return (
    <section className="py-20 lg:py-28">
      <Reveal speed="normal" still={!animate} className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {intro_}
        <ul role={showTabs ? "tabpanel" : undefined} className="space-y-3">
          {current.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`rounded-[var(--radius-card)] border transition-colors ${isOpen ? "border-transparent bg-cream" : "border-line bg-white"}`}>
                <button type="button" aria-expanded={isOpen} onClick={() => toggle(i)} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left lg:px-7">
                  <span className="text-[16.5px] font-bold text-ink lg:text-[17.5px]">{item.q}</span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-accent text-ink" : "bg-cream text-ink"}`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} inert={!isOpen}>
                  <div className="overflow-hidden">
                    <div className="space-y-4 px-6 pb-6 text-[15.5px] leading-relaxed whitespace-pre-line text-muted lg:px-7">
                      <Answer item={item} />
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
