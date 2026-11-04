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
                className="group relative block aspect-[765/477] w-full overflow-hidden text-left"
                aria-label={`Show ${s.name}`}
              >
                <Photo src={s.image} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110" />
                <span
                  className={`absolute inset-0 bg-white ${animate ? "transition-opacity duration-300" : ""} ${isActive ? "opacity-0" : "opacity-60"}`}
                />
                <h3
                  className="absolute top-6 left-6 text-[28px] font-light tracking-card text-white uppercase lg:text-[47px]"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {s.name}
                </h3>
              </button>
              <div className={`mt-4 ${animate ? "transition-opacity duration-300" : ""} ${isActive ? "opacity-100" : "opacity-30"}`}>
                <Link href={s.href} className="link-underline text-navy" tabIndex={clone ? -1 : undefined}>
                  Explore {s.name.toLowerCase()}
                </Link>
                <p className="mt-5 max-w-[560px] text-[16px] text-navy">{s.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Arrow dir="left" label="Previous service" onClick={() => go(-1)} className="absolute top-[calc(53px+12vw)] left-0" />
      <Arrow dir="right" label="Next service" onClick={() => go(1)} className="absolute top-[calc(53px+12vw)] right-0" />
    </section>
  );
}
