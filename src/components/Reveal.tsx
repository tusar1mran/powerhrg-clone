"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  speed?: "normal" | "slow" | "slower";
  still?: boolean;
};

const durations = { normal: "700ms", slow: "900ms", slower: "1200ms" };

export default function Reveal({ children, className = "", delay = 0, speed = "slow", still = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  return (
    <div
      ref={ref}
      className={`${still ? "" : "reveal"} ${visible ? "is-visible" : ""} ${className}`}
      style={{ animationDuration: durations[speed], animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
