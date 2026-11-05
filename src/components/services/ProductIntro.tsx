"use client";

import { useState, type ReactNode } from "react";
import Photo from "../Photo";
import Reveal from "../Reveal";
import FeatureIconSvg, { type FeatureIcon } from "./FeatureIcons";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  /** Optional brand logo shown to the right of the heading (e.g. GAF on the roofing page). */
  logo?: { src: string; alt: string };
  /** Extra content between the heading and the feature grid (e.g. shingle swatches). */
  children?: ReactNode;
  features: { icon: FeatureIcon; title: string; text: string }[];
};

// Intro copy + 3-column grid of features. Each feature expands on its own (several can be open).
export default function ProductIntro({ eyebrow, title, text, logo, children, features }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="product" className="bg-white py-20 text-charcoal lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-[1150px] px-6">
        <Reveal className={logo ? "grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]" : ""}>
          <div>
            <p className="text-[12px] font-semibold tracking-label text-charcoal/60 uppercase">{eyebrow}</p>
            <h2 className="mt-3 max-w-[1000px] font-display text-[34px] leading-[1.1] font-medium tracking-display lg:text-[50px] xl:text-[60px]">
              {title}
            </h2>
            {text && <p className="mt-6 max-w-[560px] text-[16px] leading-[26px] text-charcoal/85 lg:text-[19px] lg:leading-[30px]">{text}</p>}
          </div>
          {logo && <Photo src={logo.src} contain label={logo.alt} className="mx-auto h-[200px] w-[200px] lg:h-[246px] lg:w-[246px]" />}
        </Reveal>

        {children}

        <ul className="mt-14 grid items-start gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
          {features.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <li key={f.title}>
                <Reveal delay={(i % 3) * 100} className="flex items-start gap-5">
                  {/* icon in a sand tile */}
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sand">
                    <FeatureIconSvg name={f.icon} className="h-8 w-8" />
                  </span>
                  <div className="flex-1 pt-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggle(i)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span className="text-[16px] leading-[22px] font-semibold lg:text-[17px]">{f.title}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                        className={`mt-1 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m2 5 5 5 5-5" />
                      </svg>
                    </button>
                    <div className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <p className="overflow-hidden pr-8 text-[14px] leading-[22px] lg:text-[16px] lg:leading-[24px]">{f.text}</p>
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
