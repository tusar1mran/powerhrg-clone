"use client";

import { useState, type FormEvent } from "react";
import Reveal from "../Reveal";

export type OpeningGroup = { city: string; region: string; jobs: string[] };
type Props = { id?: string; regions: string[]; titles: string[]; groups: OpeningGroup[] };

const selectClass =
  "w-full appearance-none border-0 border-b-4 border-b-sky bg-white bg-[length:12px] bg-[right_14px_center] bg-no-repeat px-3 py-3 text-[13px] text-navy lg:w-[290px]";
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' fill='none' stroke='%23102f48' stroke-width='2'%3E%3Cpath d='m2 5 5 5 5-5'/%3E%3C/svg%3E")`;

export default function OpeningsList({ id, regions, titles, groups }: Props) {
  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState({ region: "", title: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFilter({ region, title });
  };

  const shown = groups
    .filter((g) => !filter.region || g.region === filter.region)
    .map((g) => ({ ...g, jobs: g.jobs.filter((j) => !filter.title || j === filter.title) }))
    .filter((g) => g.jobs.length > 0);

  return (
    <>
      <section id={id} className="bg-sky-soft px-6 py-8">
        <form onSubmit={submit} className="mx-auto flex max-w-[790px] flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <select aria-label="Location" value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass} style={{ backgroundImage: chevron }}>
            <option value="">Location</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select aria-label="All Titles" value={title} onChange={(e) => setTitle(e.target.value)} className={selectClass} style={{ backgroundImage: chevron }}>
            <option value="">All Titles</option>
            {titles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="border-b-4 border-l-4 border-sky bg-lime px-8 py-4 text-[12px] font-bold tracking-[3px] whitespace-nowrap text-navy uppercase transition-colors duration-150 hover:border-lime hover:bg-navy hover:text-lime focus:border-lime focus:bg-navy focus:text-lime"
          >
            Find jobs
          </button>
        </form>
      </section>

      <section className="bg-white px-6 pt-14 pb-16 text-navy lg:pt-20">
        <div className="mx-auto max-w-[790px]">
          <Reveal>
            <h2 className="text-[34px] font-light tracking-[5px] uppercase lg:text-[47px] lg:tracking-[6px]">Openings</h2>
          </Reveal>
          {shown.length === 0 ? (
            <p className="mt-10 text-[16px]">No openings match your search. Try another location or title.</p>
          ) : (
            <ul className="mt-10 space-y-8">
              {shown.map((g) => (
                <li key={g.city}>
                  <h3 className="text-[12px] font-bold tracking-[3px] uppercase lg:text-[13px]">{g.city}</h3>
                  <ul className="mt-3 space-y-[6px]">
                    {g.jobs.map((j, i) => (
                      <li key={`${j}-${i}`}>
                        <a href="#" className="text-[15px] underline underline-offset-2">
                          {j}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
