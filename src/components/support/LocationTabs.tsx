"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Photo from "../Photo";
import type { Location } from "@/lib/locations-content";

const exploreCta =
  "inline-flex h-16 w-full items-center justify-center border-4 border-navy px-8 text-center text-[14px] font-semibold tracking-[0.2em] text-navy uppercase transition-colors hover:bg-navy hover:text-lime";

function Contact({ loc }: { loc: Location }) {
  return (
    <>
      <p className="mt-[5px] inline-flex w-full items-center">
        <img src="/assets/support/locations/icons/phone.svg" alt="" className="h-[17px] w-5" />
        <a href={`tel:${loc.phone.replace(/\D/g, "")}`} className="px-[5px] underline">
          {loc.phone}
        </a>
      </p>
      <p className="mt-[5px] inline-flex w-full items-center">
        <img src="/assets/support/locations/icons/fax.svg" alt="" className="h-4 w-5" />
        <span className="px-[5px]">{loc.fax}</span>
      </p>
      <p className="mt-[5px] inline-flex w-full items-center">
        <img src="/assets/support/locations/icons/map.svg" alt="" className="h-4 w-5" />
        <a href={loc.map} target="_blank" rel="noopener noreferrer" className="px-[5px] underline">
          Map &amp; Directions
        </a>
      </p>
    </>
  );
}

function Address({ loc }: { loc: Location }) {
  return (
    <p>
      <strong>{loc.office}</strong>
      {loc.address.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
    </p>
  );
}

function Links({ loc, center = false }: { loc: Location; center?: boolean }) {
  return (
    <>
      <div className={`mt-6 ${center ? "text-center" : ""}`}>
        <a href="/careers/partner-with-power" className="link-underline lg:text-[14px] lg:tracking-[0.2em]">
          Become an Install Partner
        </a>
      </div>
      <div className={`mt-4 ${center ? "text-center" : ""}`}>
        <a href="/careers/openings" className="link-underline lg:text-[14px] lg:tracking-[0.2em]">
          View Jobs in {loc.name}
        </a>
      </div>
    </>
  );
}

export default function LocationTabs({ locations, map }: { locations: Location[]; map: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const loc = locations[active];

  return (
    <>
      <div className="mx-auto max-w-[1150px] px-6 pt-12 pb-10">
        <Photo src={map} label="Map of POWER locations" contain className="aspect-[100/56] w-full bg-sky-soft" />
      </div>

      <section className="mx-auto max-w-[1150px] px-2 text-navy xl:px-6 xl:pt-10 xl:pb-24">
        <div className="hidden min-h-[800px] grid-cols-[3fr_7fr] gap-x-12 xl:grid xl:h-[70vh]">
          <nav aria-label="Locations" className="min-h-0">
            <ul role="tablist" className="h-full space-y-1 overflow-y-auto overscroll-contain">
              {locations.map((l, i) => (
                <li key={l.name}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center justify-between px-4 py-2 text-left text-[14px] font-semibold tracking-[0.2em] uppercase ${
                      active === i ? "bg-lime" : ""
                    }`}
                  >
                    <span>{l.name}</span>
                    <span aria-hidden className={`ml-4 ${active === i ? "inline-block" : "hidden group-hover:inline-block group-focus-visible:inline-block"}`}>
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div role="tabpanel" className="flex min-h-0 flex-col overflow-hidden">
            <div className="mb-10 w-full">
              <img src={loc.image} alt={loc.imageAlt} className="h-[350px] w-full object-cover" />
            </div>
            <h3 className="text-[42px] leading-none font-black tracking-[0.28em] uppercase lg:text-[52px]">{loc.name}</h3>
            <div className="mt-10 flex items-start justify-between gap-x-12">
              <div className="min-w-0 flex-1">
                <Address loc={loc} />
                <Contact loc={loc} />
              </div>
              <div className="inline-flex shrink-0 flex-col items-stretch">
                <a href="#" className={exploreCta}>
                  Explore Services in {loc.name}
                </a>
                <Links loc={loc} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-10 pb-12 xl:hidden">
          {locations.map((l, i) => {
            const isOpen = open === i;
            return (
              <div key={l.name} className="border border-navy/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left text-[14px] font-semibold tracking-[0.2em] uppercase"
                >
                  <span>{l.name}</span>
                  {!isOpen && (
                    <span aria-hidden className="text-[22px] leading-none font-bold">
                      +
                    </span>
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-6">
                    <div className="mb-6 w-full">
                      <img src={l.image} alt={l.imageAlt} className="h-[260px] w-full object-cover" />
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-1">
                      <Address loc={l} />
                      <div>
                        <Contact loc={l} />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <a href="#" className={exploreCta}>
                          Explore Services in {l.name}
                        </a>
                        <Links loc={l} center />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
