"use client";

import { useState } from "react";
import Arrow from "./Arrow";
import Photo from "./Photo";
import { services } from "@/lib/content";

// Centre card is active; neighbours peek in from the sides, washed out with a white overlay.
// Card width is 49vw with a 1.6vw gap, so translating by (index * 50.6vw) keeps the active card centred.
const CARD = 49;
const GAP = 1.6;

export default function ServicesCarousel() {
  const [active, setActive] = useState(3); // Windows, as on the reference page
  const go = (d: number) => setActive((i) => (i + d + services.length) % services.length);
  const offset = (100 - CARD) / 2 - active * (CARD + GAP);

  return (
    <section id="services" className="relative overflow-hidden bg-white pt-[53px] pb-[80px]">
      <div
        className="flex transition-transform duration-300 ease-[ease]"
        style={{ gap: `${GAP}vw`, transform: `translateX(${offset}vw)` }}
      >
        {services.map((s, i) => {
          const isActive = i === active;
          return (
            <div key={s.name} className="shrink-0" style={{ width: `${CARD}vw` }}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block aspect-[765/477] w-full overflow-hidden text-left"
                aria-label={`Show ${s.name}`}
              >
                <Photo src={s.image} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110" />
                <span className={`absolute inset-0 bg-white transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-60"}`} />
                <h3
                  className="absolute top-6 left-6 text-[28px] font-light tracking-card text-white uppercase lg:text-[47px]"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {s.name}
                </h3>
              </button>
              <div className={`mt-4 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}>
                <a href="#" className="link-underline text-navy">
                  Explore {s.name}
                </a>
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
