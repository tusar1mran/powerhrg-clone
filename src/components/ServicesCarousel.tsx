"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "./Arrow";
import Photo from "./Photo";
import { services } from "@/lib/content";

const CARD = 49;
const GAP = 1.6;
const COUNT = services.length;
const slides = [...services, ...services, ...services];

export default function ServicesCarousel() {
  const [pos, setPos] = useState(COUNT + 3);
  const [animate, setAnimate] = useState(true);
  const active = ((pos % COUNT) + COUNT) % COUNT;
  const offset = (100 - CARD) / 2 - pos * (CARD + GAP);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const go = (d: number) => {
    setAnimate(true);
    setPos((p) => p + d);
  };

  const settle = () => {
    if (pos < COUNT || pos >= COUNT * 2) {
      setAnimate(false);
      setPos(active + COUNT);
    }
  };

  return (
    <section id="services" className="relative overflow-hidden bg-white pt-[53px] pb-[80px]">
      <div
        className={`flex ${animate ? "transition-transform duration-300 ease-[ease]" : ""}`}
        style={{ gap: `${GAP}vw`, transform: `translateX(${offset}vw)` }}
        onTransitionEnd={(e) => e.target === e.currentTarget && settle()}
      >
        {slides.map((s, i) => {
          const isActive = i === pos;
          const clone = i < COUNT || i >= COUNT * 2;
          return (
            <div key={`${s.name}-${i}`} className="shrink-0" style={{ width: `${CARD}vw` }} aria-hidden={clone || undefined}>
              <button
                type="button"
                tabIndex={clone ? -1 : undefined}
                onClick={() => {
                  setAnimate(true);
                  setPos(i);
                }}
                className="group relative block aspect-[765/477] w-full overflow-hidden rounded-2xl text-left"
                aria-label={`Show ${s.name}`}
              >
                <Photo src={s.image} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-105" />
                {/* bottom scrim keeps the title readable on bright photos */}
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/75 to-transparent" />
                <span
                  className={`absolute inset-0 bg-white ${animate ? "transition-opacity duration-300" : ""} ${isActive ? "opacity-0" : "opacity-60"}`}
                />
                <h3 className="absolute bottom-5 left-6 font-display text-[26px] leading-none font-medium tracking-display text-white lg:bottom-8 lg:left-8 lg:text-[44px]">
                  {s.name}
                </h3>
              </button>
              <div className={`mt-5 ${animate ? "transition-opacity duration-300" : ""} ${isActive ? "opacity-100" : "opacity-30"}`}>
                <Link href={s.href} className="link-underline text-charcoal" tabIndex={clone ? -1 : undefined}>
                  Explore {s.name.toLowerCase()}
                </Link>
                <p className="mt-4 max-w-[560px] text-[16px] leading-[26px] text-charcoal/85">{s.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Arrow dir="left" label="Previous service" onClick={() => go(-1)} className="absolute top-[calc(53px+12vw)] left-4 lg:left-8" />
      <Arrow dir="right" label="Next service" onClick={() => go(1)} className="absolute top-[calc(53px+12vw)] right-4 lg:right-8" />
    </section>
  );
}
