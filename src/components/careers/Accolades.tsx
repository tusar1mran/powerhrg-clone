"use client";

import { useState } from "react";
import Arrow from "../Arrow";
import Reveal from "../Reveal";

type Accolade = { image: string; alt: string };
type Props = {
  eyebrow: string;
  title: string[];
  text: string;
  cta?: { label: string; href: string };
  items: Accolade[];
};

const HOUSE_SHAPE = "polygon(50% 0%, 100% 30%, 100% 78%, 50% 100%, 0% 78%, 0% 30%)";

export default function Accolades({ eyebrow, title, text, cta, items }: Props) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const current = items[i];

  return (
    <section className="bg-sky py-20 text-navy lg:py-28">
      <div className="mx-auto grid max-w-[1150px] items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal className="relative lg:order-1">
          <div
            className="relative mx-auto flex aspect-[565/640] w-full max-w-[565px] items-center justify-center bg-[#eaf1fd]"
            style={{ clipPath: HOUSE_SHAPE }}
          >
            <span
              key={current.image}
              role="img"
              aria-label={current.alt}
              className="absolute inset-x-[22%] inset-y-[26%] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${current.image})` }}
            />
            <p className="absolute bottom-[9%] text-[11px] font-bold tracking-[2.8px] uppercase" aria-live="polite">
              {i + 1} of {items.length}
            </p>
          </div>
          <Arrow dir="left" tone="dark" label="Previous accolade" onClick={() => go(-1)} className="absolute top-[38%] left-0 lg:-left-4" />
          <Arrow dir="right" tone="dark" label="Next accolade" onClick={() => go(1)} className="absolute top-[38%] right-0 lg:right-[-16px]" />
        </Reveal>

        <Reveal delay={150} className="lg:order-2">
          <p className="text-[11px] font-bold tracking-[2.8px] text-[#3b6fd4] uppercase">{eyebrow}</p>
          <h2 className="mt-4 text-[29px] leading-[1.25] font-light tracking-[2px] uppercase lg:text-[46px] lg:tracking-[5px] xl:text-[63px] xl:tracking-[10px]">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[460px] text-[16px] leading-6">{text}</p>
          {cta && (
            <a href={cta.href} className="link-underline mt-8 !border-navy">
              {cta.label}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
