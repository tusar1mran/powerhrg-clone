"use client";

import { useState } from "react";
import Arrow from "./Arrow";
import Reveal from "./Reveal";
import { rights } from "@/lib/content";

// The speech-bubble/house panel is a clip-path polygon - no image needed.
const PANEL_SHAPE = "polygon(50% 0%, 100% 22%, 100% 66%, 51% 92%, 50% 100%, 49% 92%, 0% 66%, 0% 22%)";

type Props = { items?: { title: string; text: string }[] };

export default function BillOfRights({ items = rights }: Props) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const r = items[i];

  return (
    <section id="bill-of-rights" className="on-dark bg-navy-700 py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1150px] items-center gap-14 px-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[2.8px] uppercase opacity-80">Customer</p>
          <h2 className="mt-3 text-[40px] leading-[1.25] font-light tracking-[10px] uppercase lg:text-[63px] lg:tracking-[20px]">
            Bill of
            <br />
            rights
          </h2>
          <p className="mt-6 max-w-[450px] text-[16px] leading-6">
            “Homeowner” is a hard-earned title. One that deserves respect and professionalism. We believe that the
            investment you make in your home should be evident to anyone walking down the street.
          </p>
          <p className="mt-6 max-w-[450px] text-[16px] leading-6">
            At Power Home Remodeling, renovating your most valued asset is more than a project. It’s a privilege. We
            don’t cut corners on quality or service because we’re as proud of our work as you are of your home. And as
            a proud homeowner, we believe you’re entitled to the following inalienable rights:
          </p>
          <a href="/support/bill-of-rights" className="link-underline mt-8">
            View bill of rights
          </a>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div
            className="relative mx-auto flex aspect-[565/560] w-full max-w-[565px] flex-col items-center justify-start bg-[#93abd9] px-[12%] pt-[18%] text-center text-navy"
            style={{ clipPath: PANEL_SHAPE }}
          >
            {/* big faint index number behind the title */}
            <span className="pointer-events-none absolute top-[12%] text-[220px] leading-none font-light text-navy/10">{i + 1}</span>
            <h3 key={r.title} className="relative text-[30px] leading-tight font-light tracking-[10px] uppercase lg:text-[40px] lg:tracking-[14px]">
              {r.title}
            </h3>
            <p className="relative mt-6 max-w-[360px] text-[15px] leading-6">{r.text}</p>
            <p className="absolute bottom-[14%] text-[11px] font-bold tracking-[2.8px] uppercase">
              {i + 1} of {items.length}
            </p>
          </div>
          <Arrow dir="left" label="Previous right" onClick={() => go(-1)} className="absolute top-1/3 left-0 lg:-left-6" />
          <Arrow dir="right" label="Next right" onClick={() => go(1)} className="absolute top-1/3 right-0 lg:-right-6" />
        </Reveal>
      </div>
    </section>
  );
}
