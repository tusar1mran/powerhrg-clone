import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { services, servicesIntro } from "@/lib/content";
import { links } from "@/lib/links";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12"];
const heights = ["lg:h-[440px]", "lg:h-[440px]", "lg:h-[380px]", "lg:h-[380px]", "lg:h-[380px]", "lg:h-[320px]"];

export default function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <p className="eyebrow text-accent-ink">{servicesIntro.eyebrow}</p>
            <h2 className="display-2 mt-4 text-brand">{servicesIntro.title}</h2>
            <p className="lead mt-5 text-muted">{servicesIntro.text}</p>
          </div>
          <Link href={links.services} className="link-underline shrink-0 text-ink">
            View all services
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {services.map((s, i) => (
            <li key={s.name} className={`${spans[i % spans.length]}`}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <Link
                  href={s.href}
                  className={`group relative flex h-[340px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-brand p-6 text-on-brand ${heights[i % heights.length]}`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <span aria-hidden className="absolute inset-0 scrim-card" />
                  <span className="relative flex items-start justify-between">
                    <span className="rounded-full bg-paper/90 px-3 py-1 text-[12px] font-bold tracking-[0.12em] text-ink">{String(i + 1).padStart(2, "0")}</span>
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
    </section>
  );
}
