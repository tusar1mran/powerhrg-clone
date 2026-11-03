"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { stats } from "@/lib/content";

// Counts each number up from 0 the first time the section is visible.
function useCountUp(target: number, start: boolean, ms = 2000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      setN(p === 1 ? target : Math.round((target * (1 - Math.pow(2, -10 * p)) * 1024) / 1023));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, ms]);
  return n;
}

function Stat({ value, label, start }: { value: number; label: string; start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div>
      <p className="text-[40px] font-light tracking-[4px] text-navy lg:text-[54px]">{n.toLocaleString("en-US")}+</p>
      <p className="mt-2 text-[11px] font-bold tracking-[2.8px] text-navy uppercase">{label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { rootMargin: "0px 0px -50% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white py-16">
      <Reveal className="mx-auto max-w-[1150px] px-6">
        <h3 className="border-b border-navy/40 pb-8 text-[26px] font-light tracking-[3px] text-navy uppercase lg:text-[37px] lg:tracking-[4px]">
          Every project is a chance to prove ourselves
        </h3>
        <div ref={ref} className="mt-10 grid gap-10 md:grid-cols-3">
          {stats.map((s) => (
            <Stat key={s.label} {...s} start={start} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
