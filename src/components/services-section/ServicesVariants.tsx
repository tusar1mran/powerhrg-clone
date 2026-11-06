import type { ReactNode } from "react";
import Link from "next/link";
import { AppWindow, ArrowUpRight, DoorOpen, House, Layers, PanelsTopLeft, Thermometer, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import { services, servicesIntro } from "@/lib/content";
import { links } from "@/lib/links";

const icons: Record<string, LucideIcon> = {
  Windows: AppWindow,
  Roofing: House,
  Siding: Layers,
  Doors: DoorOpen,
  Insulation: Thermometer,
  Accessories: PanelsTopLeft,
};

const num = (i: number) => String(i + 1).padStart(2, "0");

function Intro({ center = false }: { center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-[720px] text-center" : "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"}>
      <div className={center ? "" : "max-w-[640px]"}>
        <p className="eyebrow text-accent-ink">{servicesIntro.eyebrow}</p>
        <h2 className="display-2 mt-4 text-brand">{servicesIntro.title}</h2>
        <p className="lead mt-5 text-muted">{servicesIntro.text}</p>
      </div>
      {!center && (
        <Link href={links.services} className="link-underline shrink-0 text-ink">
          View all services
        </Link>
      )}
    </Reveal>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28">
      {children}
    </section>
  );
}

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12"];
const heights = ["lg:h-[440px]", "lg:h-[440px]", "lg:h-[380px]", "lg:h-[380px]", "lg:h-[380px]", "lg:h-[320px]"];

export function ServicesBento() {
  return (
    <Section>
      <div className="container-page">
        <Intro />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {services.map((s, i) => (
            <li key={s.name} className={spans[i % spans.length]}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <Link
                  href={s.href}
                  className={`group relative flex h-[340px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-brand p-6 text-on-brand ${heights[i % heights.length]}`}
                >
                  <span aria-hidden className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url(${s.image})` }} />
                  <span aria-hidden className="scrim-card absolute inset-0" />
                  <span className="relative flex items-start justify-between">
                    <span className="rounded-[var(--radius-btn)] bg-paper/90 px-3 py-1 text-[12px] font-bold tracking-[0.12em] text-ink">{num(i)}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink transition-colors duration-300 group-hover:bg-accent">
                      <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </span>
                  <span className="relative">
                    <h3 className="display-3">{s.name}</h3>
                    <span className="mt-2 block max-w-[440px] text-[15px] leading-relaxed text-on-brand/80">{s.text}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function ServicesCards() {
  return (
    <Section>
      <div className="container-page">
        <Intro center />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={(i % 3) * 90}>
                <Link href={s.href} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand">
                    <span aria-hidden className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url(${s.image})` }} />
                  </span>
                  <span className="mt-5 flex items-center justify-between gap-4">
                    <h3 className="display-3 text-brand">{s.name}</h3>
                    <ArrowUpRight aria-hidden className="h-6 w-6 shrink-0 text-accent-ink transition-transform group-hover:rotate-45" />
                  </span>
                  <span className="mt-2 block text-[15.5px] leading-relaxed text-muted">{s.text}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function ServicesList() {
  return (
    <Section>
      <div className="container-page">
        <Intro />
        <ul className="mt-12 border-b border-line">
          {services.map((s, i) => (
            <li key={s.name} className="border-t border-line">
              <Link href={s.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 transition-colors sm:gap-8 lg:grid-cols-[80px_1.1fr_1.4fr_160px_auto] lg:py-9">
                <span className="font-display text-[18px] text-accent-ink lg:text-[22px]">{num(i)}</span>
                <h3 className="display-2 text-brand transition-transform duration-300 group-hover:translate-x-2">{s.name}</h3>
                <span className="hidden text-[16px] leading-relaxed text-muted lg:block">{s.text}</span>
                <span
                  aria-hidden
                  className="hidden aspect-[4/3] w-[160px] rounded-[var(--radius-card)] bg-sand bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight aria-hidden className="h-5 w-5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function ServicesScroller() {
  return (
    <Section>
      <div className="container-page">
        <Intro />
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 sm:px-8 xl:px-[max(2rem,calc((100vw-1280px)/2+2rem))]">
        {services.map((s, i) => (
          <li key={s.name} className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[380px]">
            <Link href={s.href} className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-brand p-7 text-on-brand">
              <span aria-hidden className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url(${s.image})` }} />
              <span aria-hidden className="scrim-card absolute inset-0" />
              <span className="relative text-[13px] font-bold tracking-[0.14em] text-accent">{num(i)}</span>
              <h3 className="display-3 relative mt-2">{s.name}</h3>
              <span className="relative mt-2 block text-[15px] leading-relaxed text-on-brand/80">{s.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ServicesTiles() {
  return (
    <Section>
      <div className="container-page">
        <Intro center />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => {
            const Icon = icons[s.name] ?? House;
            return (
              <li key={s.name}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <Link
                    href={s.href}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-card)] lg:p-8"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink transition-colors group-hover:bg-accent group-hover:text-ink">
                      <Icon aria-hidden className="h-7 w-7" strokeWidth={1.75} />
                    </span>
                    <h3 className="display-3 mt-6 text-brand">{s.name}</h3>
                    <span className="mt-2 flex-1 text-[15.5px] leading-relaxed text-muted">{s.text}</span>
                    <span className="link-underline mt-6 self-start text-ink">Explore {s.name.toLowerCase()}</span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
