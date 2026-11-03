"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Photo from "../Photo";
import Reveal from "../Reveal";

export type Post = { category: string; date: string; title: string; image: string };

type Props = { featured: Post; posts: Post[]; categories: string[]; totalPages: number };

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();

// Lime-underlined dropdown used for "Filter by" and "Sort by".
function Dropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center gap-6">
      <span className="text-[11px] font-bold tracking-[2.8px] uppercase lg:text-[13px]">{label}</span>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className="flex w-[150px] items-center justify-between border-b-2 border-lime pb-1 text-[11px] font-bold tracking-[2.8px] uppercase lg:w-[170px] lg:text-[13px]"
      >
        {value}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={open ? "rotate-180" : ""}>
          <path d="m1 3 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" className="absolute top-full right-0 z-10 mt-1 w-[150px] bg-white shadow-md lg:w-[170px]">
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === value}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-[13px] hover:bg-lime"
                style={{ cursor: "default" }}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CategoryLabel({ children }: { children: string }) {
  return (
    <span
      className="absolute top-6 left-4 text-[26px] font-light tracking-card text-white uppercase lg:text-[36px]"
      style={{ writingMode: "vertical-rl" }}
    >
      {children}
    </span>
  );
}

export default function NewsIndex({ featured, posts, categories, totalPages }: Props) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Latest");

  const shown = useMemo(() => {
    const list = filter === "All" ? posts : posts.filter((p) => p.category === filter);
    return [...list].sort((a, b) => (sort === "Latest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [posts, filter, sort]);

  return (
    <section className="bg-white pb-20 text-navy">
      {/* Featured post: full-width photo with a pale card overlapping its bottom edge */}
      <a href="#" className="group relative block">
        <div className="relative h-[420px] overflow-hidden lg:h-[560px]">
          <Photo src={featured.image} label={featured.title} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110 group-focus:scale-110" />
          <CategoryLabel>{featured.category}</CategoryLabel>
        </div>
        <div className="relative mx-auto -mt-24 max-w-[700px] border-b-4 border-lime bg-[#edf3fd] px-8 py-8 lg:px-[30px]">
          <p className="text-[12px] font-bold tracking-[3px] lg:text-[14px] lg:tracking-[4.2px]">{fmt(featured.date)}</p>
          <h1 className="mt-3 group-hover:underline group-focus:underline text-[24px] leading-[1.3] font-bold tracking-[3px] uppercase lg:text-[35px] lg:tracking-card">{featured.title}</h1>
        </div>
      </a>

      <div className="mx-auto mt-12 flex max-w-[1150px] flex-wrap justify-center gap-x-14 gap-y-6 px-6">
        <Dropdown label="Filter by:" value={filter} options={["All", ...categories]} onChange={setFilter} />
        <Dropdown label="Sort by:" value={sort} options={["Latest", "Oldest"]} onChange={setSort} />
      </div>

      <ul className="mx-auto mt-12 grid max-w-[1150px] gap-x-4 gap-y-10 px-6 md:grid-cols-2">
        {shown.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 2) * 120} className="h-full">
              <a href="#" className="group flex h-full flex-col">
                <div className="relative aspect-[565/340] overflow-hidden">
                  <Photo src={p.image} label={p.title} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110 group-focus:scale-110" />
                  <CategoryLabel>{p.category}</CategoryLabel>
                </div>
                <div className="flex-1 border-b-4 border-lime bg-sky/20 px-6 py-8 lg:px-[30px]">
                  <p className="text-[12px] font-bold tracking-[3px] lg:text-[14px] lg:tracking-[4.2px]">{fmt(p.date)}</p>
                  <h3 className="mt-3 group-hover:underline group-focus:underline text-[22px] leading-[1.3] font-bold tracking-[3px] uppercase lg:text-[35px] lg:tracking-card">{p.title}</h3>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
        {shown.length === 0 && <li className="col-span-full py-10 text-center">No posts in this category on this page.</li>}
      </ul>

      {/* Static pagination, as a visual match - the clone only has page 1 */}
      <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-3 text-[12px] font-bold tracking-[2.8px] uppercase">
        {["1", "2", "3", "…", String(totalPages)].map((n) => (
          <a key={n} href="#" aria-current={n === "1" ? "page" : undefined} className={n === "…" ? "" : "border-b-2 border-lime pb-0.5"}>
            {n}
          </a>
        ))}
        <a href="#" className="border-b-2 border-lime pb-0.5">
          Older
        </a>
      </nav>
    </section>
  );
}
