"use client";

import Link from "next/link";
import { useState } from "react";
import Arrow from "./Arrow";
import Reveal from "./Reveal";

// The house-shaped panel (gable roof over a block, like the logo) is a clip-path polygon - no image needed.
const PANEL_SHAPE = "polygon(50% 0%, 100% 28%, 100% 100%, 0% 100%, 0% 28%)";

export type PromiseItem = { title: string; text: string };

type Props = {
  id?: string;
  eyebrow: string;
  title: string[];
  paragraphs: string[];
  cta?: { label: string; href: string };
  items: PromiseItem[];
};

// Intro copy on the left, one commitment at a time in the house panel on the right.
export default function OurPromise({ id = "promise", eyebrow, title, paragraphs, cta, items }: Props) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const item = items[i];

  return (
    <section id={id} className="on-dark scroll-mt-24 bg-navy-700 py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1150px] items-center gap-14 px-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[2.8px] uppercase opacity-80">{eyebrow}</p>
          <h2 className="mt-3 text-[40px] leading-[1.25] font-light tracking-[10px] uppercase lg:text-[63px] lg:tracking-[20px]">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-6 max-w-[450px] text-[16px] leading-6">
              {p}
            </p>
          ))}
          {cta && (
            <Link href={cta.href} className="link-underline mt-8">
              {cta.label}
            </Link>
          )}
        </Reveal>

        <Reveal delay={150} className="relative">
          <div
            key={i}
            aria-live="polite"
            className="relative mx-auto flex aspect-[565/560] w-full max-w-[565px] animate-[fade-in_700ms_ease] flex-col items-center justify-start bg-sky px-[12%] pt-[24%] text-center text-navy"
            style={{ clipPath: PANEL_SHAPE }}
          >
            {/* big faint index number behind the title */}
            <span aria-hidden className="pointer-events-none absolute top-[16%] text-[220px] leading-none font-light text-navy/10">
              {i + 1}
            </span>
            <h3 className="relative text-[28px] leading-tight font-light tracking-[8px] uppercase lg:text-[36px] lg:tracking-[12px]">{item.title}</h3>
            <p className="relative mt-6 max-w-[360px] text-[15px] leading-6">{item.text}</p>
            <p className="absolute bottom-[10%] text-[11px] font-bold tracking-[2.8px] uppercase">
              {i + 1} of {items.length}
            </p>
          </div>
          <Arrow dir="left" label="Previous commitment" onClick={() => go(-1)} className="absolute top-1/2 left-0 lg:-left-6" />
          <Arrow dir="right" label="Next commitment" onClick={() => go(1)} className="absolute top-1/2 right-0 lg:-right-6" />
        </Reveal>
      </div>
    </section>
  );
}
