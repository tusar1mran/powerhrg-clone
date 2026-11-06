import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";
import { links } from "@/lib/links";

type Props = {
  title: string[];
  subtitle: string[];
  image: string;
  eyebrow?: string;
  size?: "full" | "short";
  ctaHref?: string;
  ctaLabel?: string;
  highlights?: string[];
};

export default function Hero({
  title,
  subtitle,
  image,
  eyebrow,
  size = "full",
  ctaHref = "#services",
  ctaLabel = "Explore services",
  highlights,
}: Props) {
  return (
    <section className="pt-2 pb-4 sm:pt-3">
      <div
        className={`on-dark inset-panel relative isolate flex overflow-hidden bg-brand bg-cover bg-center text-on-brand ${
          size === "full" ? "min-h-[600px] lg:min-h-[calc(100svh-150px)]" : "min-h-[520px] lg:min-h-[600px]"
        }`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 scrim-hero"
        />
        <div className="container-page flex flex-col justify-end py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-20">
          <div className="max-w-[760px]">
            {eyebrow && <p className="fade-in-up eyebrow mb-6 text-on-brand/90">{eyebrow}</p>}
            <h1 className={`fade-in-up ${size === "full" ? "display-1" : "display-1 lg:text-[4.5rem]"}`}>
              {title.map((line, i) => (
                <span key={line} className={`block ${i === title.length - 1 ? "text-accent italic" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="fade-in-up-delay lead mt-6 max-w-[560px] text-on-brand/85">{subtitle.join(" ")}</p>
            <div className="fade-in-up-delay mt-9 flex flex-wrap items-center gap-3">
              <Link href={links.quote} className="btn btn-accent">
                Get a free quote
              </Link>
              <a href={ctaHref} className="btn btn-ghost group text-on-brand">
                {ctaLabel}
                <ArrowDown aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          {highlights && highlights.length > 0 && (
            <ul className="fade-in-up-delay mt-10 hidden w-[320px] shrink-0 space-y-3 rounded-[var(--radius-card)] border border-white/15 bg-white/10 p-6 backdrop-blur-md lg:block">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[15px] font-semibold">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                    <Check aria-hidden className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
