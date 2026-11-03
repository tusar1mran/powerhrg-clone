"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  speed?: "normal" | "slow" | "slower";
  still?: boolean;
};

const durations = { normal: "1s", slow: "2s", slower: "3s" };

export default function Reveal({ children, className = "", speed = "slow", still = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.intersectionRatio > 0)) {
        setVisible(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  return (
    <div
      ref={ref}
      className={`${still ? "" : "reveal"} ${visible ? "is-visible" : ""} ${className}`}
      style={{ animationDuration: durations[speed] }}
    >
      {children}
    </div>
  );
}
