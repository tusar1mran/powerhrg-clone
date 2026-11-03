"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { navMenu } from "@/lib/content";

type Props = {
  transparentAtTop?: boolean;
  cta?: { label: string; href: string };
};

const BAR_HEIGHT = 48;

const ctaClass =
  "absolute top-0 z-50 px-8 py-0 text-[14px] font-bold tracking-[0.3em] whitespace-nowrap text-navy uppercase antialiased transition-colors duration-150 bg-lime hover:bg-navy hover:text-lime focus:bg-navy focus:text-lime";

const topSearches = [
  { label: "Get a Free Quote", href: "#" },
  { label: "View All Services", href: "/services" },
  { label: "About Power", href: "/about" },
  { label: "Power Careers", href: "/careers" },
  { label: "Get Support", href: "/support" },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
      <path
        d="M9.65818 4.9875H0L8.85156e-08 7.0125L9.6635 7.0125L5.40532 11.4H8.25651L13.5 6.00274L8.25651 0.599998L5.4 0.599999L9.65818 4.9875Z"
        fill="#102F48"
      />
    </svg>
  );
}

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg className={`h-3 w-4 ${up ? "rotate-180" : ""}`} viewBox="0 0 12 9" fill="none" aria-hidden>
      <path d="M12 0V3.1739L5.99695 9L0 3.1739L0 0.00591481L5.99695 5.8261L12 0Z" fill="#102F48" />
    </svg>
  );
}

function useSearch(query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return navMenu
      .flatMap((g) => g.items.filter((i) => !i.hidden))
      .filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);
}

function SearchResults({ query, onPick, mobile = false }: { query: string; onPick: () => void; mobile?: boolean }) {
  const results = useSearch(query);
  const list = query.trim() ? results : topSearches;
  const title = query.trim() ? "Search results" : "Top searches";
  if (query.trim() && results.length === 0) return null;
  return (
    <div className="flex flex-col">
      <h3 className="m-0 pb-[10px] text-[14px] font-bold tracking-[0.2em] text-navy uppercase opacity-60">{title}</h3>
      <div className={`flex flex-col ${mobile ? "mt-3 ml-6" : ""}`}>
        {list.map((r) => (
          <Link
            key={r.href + r.label}
            href={r.href}
            onClick={onPick}
            className={`group flex items-center justify-between text-navy transition-all duration-200 ${mobile ? "py-3" : "p-6 hover:bg-lime"}`}
          >
            <span className="block text-[15.5px] leading-[1.4] font-normal">{r.label}</span>
            <Arrow className="h-3 w-[14px] shrink-0 -translate-x-[10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header({ transparentAtTop = true, cta = { label: "Get A Free Quote", href: "#" } }: Props) {
  const isHome = transparentAtTop;
  const [barOpen, setBarOpen] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [mobileQuery, setMobileQuery] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const threshold = barOpen ? BAR_HEIGHT : 0;

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < threshold || (threshold === 0 && window.scrollY <= 0));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  useEffect(() => {
    if (!openMenu && !searchOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu, searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setSearchOpen(false);
    setMobileOpen(false);
  }

  const transparent = isHome && atTop;
  const desktopClass = atTop
    ? transparent
      ? "absolute bg-transparent text-white"
      : "absolute bg-white/85 text-navy border-b border-lime"
    : "fixed top-0 bg-white/85 backdrop-blur-[20px] text-navy border-b border-lime";

  return (
    <>
      <a
        href="#main"
        className="absolute -m-1 h-0 w-0 overflow-hidden border-0 bg-black p-0 text-center text-white focus:relative focus:m-0 focus:block focus:h-auto focus:w-full focus:p-2"
      >
        <span>Skip to main content</span>
      </a>

      {barOpen && (
        <div id="services-bar" className="relative z-30 flex w-full items-center justify-center bg-navy py-3 text-center text-white lg:h-12 lg:py-0">
          <p className="m-0 pr-11 pl-1 text-[15px] leading-[1.5]">
            <span>Your zipcode (00000) is not in our coverage area.</span> Click{" "}
            <a href="/support/locations" className="underline">
              here
            </a>{" "}
            to view a different location.
          </p>
          <button type="button" aria-label="Close" onClick={() => setBarOpen(false)} className="absolute top-0 right-0 h-10 w-10 lg:h-12 lg:w-12">
            <svg
              className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 lg:h-4 lg:w-4"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.53033 6.59099L10 11.0607L11.0607 10L6.59099 5.53033L11.0607 1.06066L10 0L5.53033 4.46967L1.06066 0L0 1.06066L4.46967 5.53033L3.57628e-07 10L1.06066 11.0607L5.53033 6.59099Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}

      <header ref={navRef} className={`z-40 hidden h-[90px] w-full lg:block ${desktopClass}`}>
        <Link href="/" aria-label="Return to homepage" className={`absolute left-6 z-40 ${transparent ? "top-5" : "top-3"}`}>
          {transparent ? (
            <img src="/assets/logo/power-white.svg" alt="" className="h-[95px] w-[78px]" />
          ) : (
            <img src="/assets/logo/power-navy.svg" alt="" className="h-[67px] w-[56px] transition-all" />
          )}
        </Link>

        <div className="mx-auto w-full px-5 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 3xl:max-w-[1728px]">
          <nav aria-label="Main" className="flex h-[90px] items-center justify-center">
            {navMenu.map((group) => {
              const isOpen = openMenu === group.label;
              const id = `dropdown-${group.label.toLowerCase()}`;
              return (
                <div key={group.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => {
                      setSearchOpen(false);
                      setOpenMenu(isOpen ? null : group.label);
                    }}
                    className="group mb-0 flex h-full items-center px-6 text-[14px] leading-[18.2px] font-bold uppercase"
                  >
                    <span
                      className={`w-[calc(100%-0.3em)] border-b-2 tracking-[0.3rem] ${isOpen ? "border-b-lime" : "border-transparent group-hover:border-b-lime"}`}
                    >
                      {group.label}
                    </span>
                  </button>
                  {isOpen && (
                    <div id={id} className="absolute top-[50px] left-0 mt-[6px] min-w-[300px] origin-top-left animate-[dropdown-in_150ms_ease-out] bg-white text-navy shadow">
                      {group.items
                        .filter((item) => !item.hidden)
                        .map((item) => (
                          <div key={item.href} className="group relative">
                            <Link
                              href={item.href}
                              onClick={() => setOpenMenu(null)}
                              className="flex justify-between pt-[18px] pr-6 pb-[18px] pl-5 text-[20px] leading-[26px] font-normal whitespace-nowrap transition-[padding] group-hover:bg-lime"
                            >
                              <span className="inline-block">{item.label}</span>
                              <Arrow className="absolute top-6 right-8 opacity-0 transition-[right,opacity] duration-500 group-hover:right-6 group-hover:opacity-100" />
                            </Link>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="relative">
              <button
                type="button"
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setOpenMenu(null);
                  setSearchOpen((v) => !v);
                  setTimeout(() => searchRef.current?.focus(), 0);
                }}
                className="group mb-0 flex h-full items-center px-6 text-[14px] leading-[18.2px] font-bold uppercase"
              >
                <SearchIcon />
              </button>
            </div>
          </nav>
        </div>

        {searchOpen && (
          <div className="absolute top-[90px] right-0 left-0 z-[10001] flex max-h-[calc(100vh-90px)] w-full items-start justify-center overflow-y-auto border-b border-[#d4ff00] bg-white">
            <div className="relative flex h-[550px] w-full max-w-[640px] flex-col bg-white p-10">
              <div className="shrink-0 pb-10">
                <div className="relative flex items-center">
                  <SearchIcon className="mr-3 h-5 w-5 shrink-0 text-navy opacity-60" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    autoComplete="off"
                    aria-label="Search"
                    className="w-full border-none bg-white/80 py-3 pr-10 pl-4 align-middle text-[20px] leading-none font-normal text-navy shadow-none outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setQuery("")}
                      className="absolute top-1/2 right-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-white"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <SearchResults query={query} onPick={() => setSearchOpen(false)} />
            </div>
          </div>
        )}

        <Link href={cta.href} className={`${ctaClass} right-0 h-[90px] leading-[90px]`}>
          {cta.label}
        </Link>
      </header>

      <header className={`sticky top-0 z-[60] h-[60px] w-full lg:hidden ${isHome ? "bg-white" : "border-b border-lime bg-white/85"}`}>
        <Link href="/" aria-label="Return to homepage" className="absolute top-1 left-4 z-40">
          <img src="/assets/logo/power-navy.svg" alt="" className="h-[50px] w-[41px]" />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="absolute top-0 right-0 z-[60] h-[60px] w-[60px]"
        >
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden>
            <line x1="22" y1="1" x2="0" y2="1" stroke="#102F48" strokeWidth="2" />
            <line x1="22" y1="9" x2="0" y2="9" stroke="#102F48" strokeWidth="2" />
            <line x1="22" y1="17" x2="0" y2="17" stroke="#102F48" strokeWidth="2" />
          </svg>
        </button>
        <Link href={cta.href} className={`${ctaClass} right-[60px] h-[60px] leading-[60px]`}>
          {cta.label}
        </Link>

        {mobileOpen && (
          <div role="dialog" aria-modal="true" aria-label="Mobile Navigation" className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="relative h-screen w-full overflow-y-auto bg-white">
              <div className={`relative z-[60] h-[60px] w-full ${isHome ? "" : "border-b border-lime bg-white/85"}`}>
                <Link href="/" aria-label="Return to homepage" className="absolute top-1 left-4 z-[60]">
                  <img src="/assets/logo/power-navy.svg" alt="" className="h-[50px] w-[41px]" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-0 right-0 z-[60] h-[60px] w-[60px]"
                >
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                    <line x1="2" y1="2" x2="20" y2="20" stroke="#102F48" strokeWidth="2" />
                    <line x1="20" y1="2" x2="2" y2="20" stroke="#102F48" strokeWidth="2" />
                  </svg>
                </button>
                <Link href={cta.href} className={`${ctaClass} right-[60px] h-[60px] leading-[60px]`}>
                  {cta.label}
                </Link>
              </div>

              <div className="mx-auto w-full px-6 pt-7 sm:max-w-[640px] md:max-w-[768px]">
                <div className="mb-4">
                  <div className="relative flex h-[45px] w-full items-center border border-navy/20 bg-white">
                    <input
                      type="text"
                      value={mobileQuery}
                      onChange={(e) => setMobileQuery(e.target.value)}
                      placeholder="Search"
                      autoComplete="off"
                      aria-label="Search"
                      className="h-full w-full border-none bg-transparent pr-10 pl-4 text-[16px] leading-none font-normal text-navy outline-none"
                    />
                    <SearchIcon className="absolute right-3 h-[18px] w-[18px] text-navy opacity-60" />
                  </div>
                </div>
                {mobileQuery && (
                  <div className="mb-4">
                    <SearchResults query={mobileQuery} onPick={() => setMobileOpen(false)} mobile />
                  </div>
                )}

                <div>
                  {navMenu.map((group) => {
                    const isOpen = mobileGroup === group.label;
                    return (
                      <div key={group.label}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setMobileGroup(isOpen ? null : group.label)}
                          className="relative block w-full py-5 text-left text-[20px] leading-7 tracking-[0.2em] text-navy uppercase"
                        >
                          <span>{group.label}</span>
                          <span aria-hidden className="absolute top-1/2 right-0 -translate-y-1/2">
                            <Chevron up={isOpen} />
                          </span>
                        </button>
                        {isOpen && (
                          <div>
                            {group.items
                              .filter((item) => !item.hidden)
                              .map((item) => (
                                <Link key={item.href} href={item.href} className="mb-0 block py-2 text-navy">
                                  <span className="inline-block">{item.label}</span>
                                </Link>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
