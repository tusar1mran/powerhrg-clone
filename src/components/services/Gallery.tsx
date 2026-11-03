"use client";

import { useState } from "react";
import Photo from "../Photo";
import Reveal from "../Reveal";

export type Slide = { image: string; alt: string; caption?: string };

// Full-width photo carousel: the active slide sits in the middle, neighbours peek in faded,
// thin arrows at the screen edges and an "N OF M" counter underneath.
// Used for insulation "Our work shows" and every accessories category.
const SLIDE = 76; // vw
const GAP = 1.6; // vw

export default function Gallery({ title, slides }: { title: string; slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const go = (d: number) => setActive((i) => (i + d + slides.length) % slides.length);
  const offset = (100 - SLIDE) / 2 - active * (SLIDE + GAP);

  return (
    <section className="overflow-hidden bg-white py-16 text-navy lg:py-20">
      <Reveal className="mx-auto max-w-[1150px] px-6">
        <h2 className="text-[28px] font-light tracking-[4px] uppercase lg:text-[47px] lg:tracking-card">{title}</h2>
      </Reveal>

      <div className="relative mt-8">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ gap: `${GAP}vw`, transform: `translateX(${offset}vw)` }}
        >
          {slides.map((s, i) => (
            <figure
              key={`${s.image}-${i}`}
              aria-hidden={i !== active}
              className="relative aspect-[1150/655] shrink-0 overflow-hidden"
              style={{ width: `${SLIDE}vw` }}
            >
              <Photo src={s.image} label={s.alt} className="absolute inset-0" />
              {s.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-navy/80 px-5 py-4 text-[14px] text-white lg:px-8 lg:py-[30px] lg:text-[17px]">
                  {s.caption}
                </figcaption>
              )}
              <span className={`absolute inset-0 bg-white transition-opacity duration-700 ${i === active ? "opacity-0" : "opacity-50"}`} />
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={`Previous ${title} photo`}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-navy lg:left-6"
        >
          <svg width="46" height="40" viewBox="0 0 46 40" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M45 20H2M20 1 1 20l19 19" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={`Next ${title} photo`}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-navy lg:right-6"
        >
          <svg width="46" height="40" viewBox="0 0 46 40" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M1 20h43M26 1l19 19-19 19" />
          </svg>
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] font-bold tracking-[2.8px] uppercase" aria-live="polite">
        {active + 1} of {slides.length}
      </p>
    </section>
  );
}
