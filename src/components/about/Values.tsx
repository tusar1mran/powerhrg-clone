"use client";

import { useState } from "react";
import { Eye, HardHat, HeartHandshake, MessageSquare, Scale, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";

export type ValueIcon = "honesty" | "care" | "craft" | "communication" | "fairness";

const icons: Record<ValueIcon, LucideIcon> = {
  honesty: Eye,
  care: HeartHandshake,
  craft: HardHat,
  communication: MessageSquare,
  fairness: Scale,
};

export type Value = { title: string; text: string; icon: ValueIcon };
type Props = { id?: string; title: string[]; text: string; values: Value[] };

// Heading + copy, then a 3-column grid of values.
// Unlike the service feature grid, the chevron sits right after the label, and each value opens on its own.
export default function Values({ id, title, text, values }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id={id} className="scroll-mt-24 bg-white py-20 text-navy lg:py-24">
      <div className="mx-auto max-w-[1150px] px-6">
        <Reveal>
          <h2 className="text-[30px] leading-[1.3] font-light tracking-[4px] uppercase lg:text-[46px] lg:tracking-card">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[660px] text-[16px] leading-[24px]">{text}</p>
        </Reveal>

        <ul className="mt-14 grid items-start gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const isOpen = open.has(i);
            const Icon = icons[v.icon];
            return (
              <li key={v.title}>
                <Reveal delay={(i % 3) * 100} className="flex items-start gap-5">
                  <Icon aria-hidden strokeWidth={1.5} className="h-[40px] w-[40px] shrink-0" />
                  <div className="pt-[10px]">
                    <button type="button" aria-expanded={isOpen} onClick={() => toggle(i)} className="flex items-center gap-6 text-left">
                      <span className="text-[12px] font-bold tracking-[3px] uppercase lg:text-[14px] lg:tracking-[4.2px]">{v.title}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m2 5 5 5 5-5" />
                      </svg>
                    </button>
                    <div className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <p className="max-w-[300px] overflow-hidden text-[14px] leading-[22px] lg:text-[16px] lg:leading-[24px]">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
