import Link from "next/link";
import { ArrowDown, Check, Phone, ShieldCheck } from "lucide-react";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

export type HeroProps = {
  title: string[];
  subtitle: string[];
  image: string;
  eyebrow?: string;
  size?: "full" | "short";
  ctaHref?: string;
  ctaLabel?: string;
  highlights?: string[];
};

function Title({ title, tone = "dark", className = "" }: { title: string[]; tone?: "dark" | "light"; className?: string }) {
  return (
    <h1 className={`fade-in-up display-1 ${className}`}>
      {title.map((line, i) => (
        <span
          key={line}
          className={`block ${i === title.length - 1 ? `display-em ${tone === "dark" ? "text-accent" : "text-accent-ink"}` : ""}`}
        >
          {line}
        </span>
      ))}
    </h1>
  );
}

function Actions({ ctaHref, ctaLabel, tone, center = false }: { ctaHref: string; ctaLabel: string; tone: "dark" | "light"; center?: boolean }) {
  return (
    <div className={`fade-in-up-delay mt-9 flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}>
      <Link href={links.quote} className="btn btn-accent">
        Get a free quote
      </Link>
      <a href={ctaHref} className={`btn btn-ghost group ${tone === "dark" ? "text-on-brand" : "text-ink"}`}>
        {ctaLabel}
        <ArrowDown aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
      </a>
    </div>
  );
}

function CheckList({ items, tone, className = "" }: { items: string[]; tone: "dark" | "light"; className?: string }) {
  return (
    <ul className={`fade-in-up-delay ${className}`}>
      {items.map((h) => (
        <li key={h} className={`flex items-center gap-3 text-[15px] font-semibold ${tone === "dark" ? "text-on-brand" : "text-ink"}`}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          {h}
        </li>
      ))}
    </ul>
  );
}

const fullHeight = (size: HeroProps["size"]) => (size === "full" ? "min-h-[600px] lg:min-h-[calc(100svh-150px)]" : "min-h-[520px] lg:min-h-[600px]");

export function HeroOverlay({ title, subtitle, image, eyebrow, size = "full", ctaHref = "#services", ctaLabel = "Explore services", highlights }: HeroProps) {
  return (
    <section className="panel-wrap">
      <div
        className={`on-dark inset-panel relative isolate flex overflow-hidden bg-brand bg-cover bg-center text-on-brand ${fullHeight(size)}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div aria-hidden className="scrim-hero absolute inset-0 -z-10" />
        <div className="container-page flex flex-col justify-end py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-20">
          <div className="max-w-[760px]">
            {eyebrow && <p className="fade-in-up eyebrow mb-6 text-on-brand/90">{eyebrow}</p>}
            <Title title={title} />
            <p className="fade-in-up-delay lead mt-6 max-w-[560px] text-on-brand/85">{subtitle.join(" ")}</p>
            <Actions ctaHref={ctaHref} ctaLabel={ctaLabel} tone="dark" />
          </div>
          {highlights && highlights.length > 0 && (
            <div className="mt-10 hidden w-[320px] shrink-0 rounded-[var(--radius-card)] border border-white/15 bg-white/10 p-6 backdrop-blur-md lg:block">
              <CheckList items={highlights} tone="dark" className="space-y-3" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HeroSplit({ title, subtitle, image, eyebrow, size = "full", ctaHref = "#services", ctaLabel = "Explore services", highlights }: HeroProps) {
  return (
    <section className="pt-8 pb-12 lg:pt-14 lg:pb-20">
      <div className={`container-page grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 ${size === "full" ? "lg:min-h-[calc(100svh-220px)]" : ""}`}>
        <div>
          {eyebrow && <p className="fade-in-up eyebrow mb-6 text-accent-ink">{eyebrow}</p>}
          <Title title={title} tone="light" className="text-brand" />
          <p className="fade-in-up-delay lead mt-6 max-w-[540px] text-muted">{subtitle.join(" ")}</p>
          <Actions ctaHref={ctaHref} ctaLabel={ctaLabel} tone="light" />
          {highlights && <CheckList items={highlights} tone="light" className="mt-10 grid gap-3 sm:grid-cols-2" />}
        </div>
        <div className="fade-in-up-delay relative">
          <div
            aria-hidden
            className={`w-full rounded-[var(--radius-card)] bg-sand bg-cover bg-center ${size === "full" ? "aspect-[4/5] max-h-[680px]" : "aspect-[4/3]"}`}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-[var(--radius-card)] bg-brand px-5 py-4 text-on-brand shadow-[var(--shadow-float)]">
            <ShieldCheck aria-hidden className="h-7 w-7 text-accent" strokeWidth={1.75} />
            <span className="text-[14px] leading-tight font-bold">
              Licensed, insured
              <br />
              and warranted
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroCentered({ title, subtitle, image, eyebrow, size = "full", ctaHref = "#services", ctaLabel = "Explore services", highlights }: HeroProps) {
  return (
    <section className="panel-wrap">
      <div
        className={`on-dark inset-panel relative isolate flex items-center overflow-hidden bg-brand bg-cover bg-center text-center text-on-brand ${fullHeight(size)}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-brand-deep/65" />
        <div className="container-page flex flex-col items-center py-20">
          {eyebrow && <p className="fade-in-up eyebrow mb-6 text-on-brand/90">{eyebrow}</p>}
          <Title title={title} className="max-w-[1000px]" />
          <p className="fade-in-up-delay lead mx-auto mt-6 max-w-[620px] text-on-brand/85">{subtitle.join(" ")}</p>
          <Actions ctaHref={ctaHref} ctaLabel={ctaLabel} tone="dark" center />
          {highlights && (
            <ul className="fade-in-up-delay mt-12 hidden flex-wrap justify-center gap-3 md:flex">
              {highlights.map((h) => (
                <li key={h} className="rounded-[var(--radius-btn)] border border-white/20 bg-white/10 px-4 py-2 text-[14px] font-semibold backdrop-blur-md">
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

export function HeroEditorial({ title, subtitle, image, eyebrow, size = "full", ctaHref = "#services", ctaLabel = "Explore services", highlights }: HeroProps) {
  return (
    <section className="pt-10 lg:pt-16">
      <div className="container-page">
        {eyebrow && <p className="fade-in-up eyebrow mb-6 text-accent-ink">{eyebrow}</p>}
        <Title title={title} tone="light" className="text-brand lg:text-[calc(7rem*var(--display-scale))]" />
        <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="fade-in-up-delay lead max-w-[560px] text-muted">{subtitle.join(" ")}</p>
            <Actions ctaHref={ctaHref} ctaLabel={ctaLabel} tone="light" />
          </div>
          {highlights && <CheckList items={highlights} tone="light" className="grid content-start gap-3 sm:grid-cols-2 lg:pt-1" />}
        </div>
      </div>
      <div className="panel-wrap mt-10 lg:mt-14">
        <div
          aria-hidden
          className={`inset-panel fade-in-up-delay bg-sand bg-cover bg-center ${size === "full" ? "aspect-[16/9] lg:aspect-[21/8]" : "aspect-[16/9] lg:aspect-[21/7]"}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    </section>
  );
}

export function HeroCard({ title, subtitle, image, eyebrow, size = "full", ctaHref = "#services", ctaLabel = "Explore services", highlights }: HeroProps) {
  const items = highlights ?? ["Free on-site estimate", "Itemized written quote", "No pressure to sign"];
  return (
    <section className="panel-wrap">
      <div
        className={`on-dark inset-panel relative isolate flex overflow-hidden bg-brand bg-cover bg-center text-on-brand ${fullHeight(size)}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div aria-hidden className="scrim-hero absolute inset-0 -z-10" />
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-20">
          <div>
            {eyebrow && <p className="fade-in-up eyebrow mb-6 text-on-brand/90">{eyebrow}</p>}
            <Title title={title} />
            <p className="fade-in-up-delay lead mt-6 max-w-[540px] text-on-brand/85">{subtitle.join(" ")}</p>
            <a href={ctaHref} className="fade-in-up-delay link-underline mt-8 text-on-brand">
              {ctaLabel}
            </a>
          </div>
          <div className="fade-in-up-delay rounded-[var(--radius-card)] bg-white p-7 text-ink shadow-[var(--shadow-float)] sm:p-9">
            <p className="eyebrow text-accent-ink">Free estimate</p>
            <p className="display-3 mt-3 text-brand">Get your written quote</p>
            <CheckList items={items} tone="light" className="mt-6 space-y-3" />
            <Link href={links.quote} className="btn btn-accent mt-8 w-full">
              Get a free quote
            </Link>
            <a href={site.phone.href} className="mt-4 flex items-center justify-center gap-2 text-[15px] font-semibold text-ink hover:text-accent-ink">
              <Phone aria-hidden className="h-4 w-4" />
              Or call {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroFullSplit({ title, subtitle, image, eyebrow, size = "full", ctaHref = "#services", ctaLabel = "Explore services", highlights }: HeroProps) {
  return (
    <section className="panel-wrap">
      <div className={`on-dark inset-panel grid overflow-hidden bg-brand text-on-brand lg:grid-cols-2 ${size === "full" ? "lg:min-h-[calc(100svh-150px)]" : "lg:min-h-[600px]"}`}>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:px-16 lg:py-20 xl:px-24">
          {eyebrow && <p className="fade-in-up eyebrow mb-6 text-on-brand/85">{eyebrow}</p>}
          <Title title={title} />
          <p className="fade-in-up-delay lead mt-6 max-w-[520px] text-on-brand/80">{subtitle.join(" ")}</p>
          <Actions ctaHref={ctaHref} ctaLabel={ctaLabel} tone="dark" />
          {highlights && <CheckList items={highlights} tone="dark" className="mt-10 grid gap-3 sm:grid-cols-2" />}
        </div>
        <div
          aria-hidden
          className="order-first min-h-[300px] bg-brand-soft bg-cover bg-center lg:order-2 lg:min-h-0"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    </section>
  );
}
