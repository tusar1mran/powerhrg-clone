import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export type ImageCard = { title: string; image: string; text: string; cta: string; href?: string };

type Props = {
  eyebrow?: string;
  heading: string;
  cards: ImageCard[];
};

export default function ImageCardPair({ eyebrow, heading, cards }: Props) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-[640px]">
          {eyebrow && <p className="eyebrow text-accent-ink">{eyebrow}</p>}
          <h2 className="display-2 mt-4 text-brand">{heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120} className="h-full">
              <Link
                href={c.href ?? "#"}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-sand">
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${c.image})` }}
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-paper/95 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.12em] text-ink uppercase">
                    {c.title}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-7 lg:p-8">
                  <span className="flex-1 text-[16.5px] leading-relaxed whitespace-pre-line text-muted">{c.text}</span>
                  <span className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-[16px] font-bold text-ink">{c.cta}</span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-colors duration-300 group-hover:bg-accent">
                      <ArrowUpRight aria-hidden className="h-5 w-5" />
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
