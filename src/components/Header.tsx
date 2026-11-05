"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { headerCta, isNavGroup, navMenu, searchIndex, serviceAreaBar, topSearches } from "@/lib/content";

type Props = {
  transparentAtTop?: boolean;
  cta?: { label: string; href: string };
};

const BAR_HEIGHT = 48;

// Rounded gold "Get a free quote" button, vertically centred in the header bar.
const ctaClass =
  "btn-pill absolute top-1/2 z-50 -translate-y-1/2 whitespace-nowrap bg-gold text-charcoal antialiased hover:bg-charcoal hover:text-white focus-visible:bg-charcoal focus-visible:text-white";

const navLabelClass = "group mb-0 flex h-full items-center px-5 text-[15px] leading-[18.2px] font-semibold";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
      <path
        d="M9.65818 4.9875H0L8.85156e-08 7.0125L9.6635 7.0125L5.40532 11.4H8.25651L13.5 6.00274L8.25651 0.599998L5.4 0.599999L9.65818 4.9875Z"
        fill="currentColor"
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
      <path d="M12 0V3.1739L5.99695 9L0 3.1739L0 0.00591481L5.99695 5.8261L12 0Z" fill="currentColor" />
    </svg>
  );
}

function useSearch(query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);
}

function SearchResults({ query, onPick, mobile = false }: { query: string; onPick: () => void; mobile?: boolean }) {
  const results = useSearch(query);
  const list = query.trim() ? results : topSearches;
  const title = query.trim() ? "Search results" : "Top searches";
  if (query.trim() && results.length === 0) return null;
  return (
    <div className="flex flex-col">
      <h3 className="m-0 pb-[10px] text-[12px] font-semibold tracking-label text-charcoal uppercase opacity-60">{title}</h3>
      <div className={`flex flex-col ${mobile ? "mt-3 ml-6" : ""}`}>
        {list.map((r) => (
          <Link
            key={r.href + r.label}
            href={r.href}
            onClick={onPick}
            className={`group flex items-center justify-between text-charcoal transition-all duration-200 ${mobile ? "py-3" : "rounded-xl p-6 hover:bg-sand"}`}
          >
            <span className="block text-[15.5px] leading-[1.4] font-normal">{r.label}</span>
            <Arrow className="h-3 w-[14px] shrink-0 -translate-x-[10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header({ transparentAtTop = true, cta = headerCta }: Props) {
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

  const goHome = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const transparent = isHome && atTop;
  const desktopClass = atTop
    ? transparent
      ? "absolute bg-transparent text-white"
      : "absolute bg-white/85 text-charcoal border-b border-charcoal/10"
    : "fixed top-0 bg-white/85 backdrop-blur-[20px] text-charcoal border-b border-charcoal/10 shadow-[0_4px_24px_rgba(30,43,49,0.06)]";

  return (
    <>
      <a
        href="#main"
        className="absolute -m-1 h-0 w-0 overflow-hidden border-0 bg-black p-0 text-center text-white focus:relative focus:m-0 focus:block focus:h-auto focus:w-full focus:p-2"
      >
        <span>Skip to main content</span>
      </a>

      {barOpen && (
        <div id="services-bar" className="relative z-30 flex w-full items-center justify-center bg-charcoal py-3 text-center text-white lg:h-12 lg:py-0">
          <p className="m-0 pr-11 pl-1 text-[14px] leading-[1.5]">
            <span>{serviceAreaBar.text}</span>{" "}
            <Link href={serviceAreaBar.link.href} className="font-semibold text-gold underline underline-offset-2">
              {serviceAreaBar.link.label}
            </Link>
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
        <Link
          href="/"
          onClick={goHome}
          aria-label="Return to homepage"
          className={`absolute left-6 z-40 ${transparent ? "top-[17px]" : "top-[21px]"}`}
        >
          {transparent ? (
            <img src="/assets/logo/shah-crew-white.svg" alt="" width={150} height={56} className="h-[56px] w-[150px]" />
          ) : (
            <img src="/assets/logo/shah-crew-dark.svg" alt="" width={128} height={48} className="h-[48px] w-[128px] transition-all" />
          )}
        </Link>

        <div className="mx-auto w-full px-5 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 3xl:max-w-[1728px]">
          <nav aria-label="Main" className="flex h-[90px] items-center justify-center">
            {navMenu.map((entry) => {
              if (!isNavGroup(entry)) {
                const active = pathname === entry.href || pathname.startsWith(`${entry.href}/`);
                return (
                  <div key={entry.label} className="relative h-full">
                    <Link href={entry.href} aria-current={active ? "page" : undefined} className={navLabelClass}>
                      <span
                        className={`border-b-2 py-1 ${active ? "border-b-gold" : "border-transparent group-hover:border-b-gold"}`}
                      >
                        {entry.label}
                      </span>
                    </Link>
                  </div>
                );
              }
              const group = entry;
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
                    className={navLabelClass}
                  >
                    <span
                      className={`border-b-2 py-1 ${isOpen ? "border-b-gold" : "border-transparent group-hover:border-b-gold"}`}
                    >
                      {group.label}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={id}
                      className="absolute top-[50px] left-0 mt-[6px] min-w-[300px] origin-top-left animate-[dropdown-in_150ms_ease-out] overflow-hidden rounded-2xl bg-white p-2 text-charcoal shadow-[0_12px_40px_rgba(30,43,49,0.16)]"
                    >
                      {group.items.map((item) => (
                        <div key={item.href} className="group relative">
                          <Link
                            href={item.href}
                            onClick={() => setOpenMenu(null)}
                            className="flex justify-between rounded-xl pt-[14px] pr-6 pb-[14px] pl-4 text-[17px] leading-[26px] font-medium whitespace-nowrap transition-[padding] group-hover:bg-sand"
                          >
                            <span className="inline-block">{item.label}</span>
                            <Arrow className="absolute top-[21px] right-8 opacity-0 transition-[right,opacity] duration-500 group-hover:right-6 group-hover:opacity-100" />
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
                className={navLabelClass}
              >
                <SearchIcon />
              </button>
            </div>
          </nav>
        </div>

        {searchOpen && (
          <div className="absolute top-[90px] right-0 left-0 z-[10001] flex max-h-[calc(100vh-90px)] w-full items-start justify-center overflow-y-auto border-b border-charcoal/10 bg-white shadow-[0_12px_40px_rgba(30,43,49,0.12)]">
            <div className="relative flex h-[550px] w-full max-w-[640px] flex-col bg-white p-10">
              <div className="shrink-0 pb-10">
                <div className="relative flex items-center">
                  <SearchIcon className="mr-3 h-5 w-5 shrink-0 text-charcoal opacity-60" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    autoComplete="off"
                    aria-label="Search"
                    className="w-full border-none bg-white/80 py-3 pr-10 pl-4 align-middle text-[20px] leading-none font-normal text-charcoal shadow-none outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setQuery("")}
                      className="absolute top-1/2 right-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal text-white"
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

        <Link href={cta.href} className={`${ctaClass} right-6`}>
          {cta.label}
        </Link>
      </header>

      <header className={`sticky top-0 z-[60] h-[60px] w-full lg:hidden ${isHome ? "bg-white" : "border-b border-charcoal/10 bg-white/85"}`}>
        <Link href="/" onClick={goHome} aria-label="Return to homepage" className="absolute top-2 left-4 z-40">
          <img src="/assets/logo/shah-crew-icon-dark.svg" alt="" width={40} height={44} className="h-[44px] w-[40px]" />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="absolute top-0 right-0 z-[60] h-[60px] w-[60px]"
        >
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-charcoal" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden>
            <line x1="22" y1="1" x2="0" y2="1" stroke="currentColor" strokeWidth="2" />
            <line x1="22" y1="9" x2="0" y2="9" stroke="currentColor" strokeWidth="2" />
            <line x1="22" y1="17" x2="0" y2="17" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <Link href={cta.href} className={`${ctaClass} right-[60px] px-4 py-2 text-[14px]`}>
          {cta.label}
        </Link>

        {mobileOpen && (
          <div role="dialog" aria-modal="true" aria-label="Mobile Navigation" className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="relative h-screen w-full origin-center animate-[dropdown-in_150ms_ease-out] overflow-y-auto bg-white">
              <div className={`relative z-[60] h-[60px] w-full ${isHome ? "" : "border-b border-charcoal/10 bg-white/85"}`}>
                <Link href="/" onClick={goHome} aria-label="Return to homepage" className="absolute top-2 left-4 z-[60]">
                  <img src="/assets/logo/shah-crew-icon-dark.svg" alt="" width={40} height={44} className="h-[44px] w-[40px]" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-0 right-0 z-[60] h-[60px] w-[60px]"
                >
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-charcoal" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                    <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
                    <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                <Link href={cta.href} className={`${ctaClass} right-[60px] px-4 py-2 text-[14px]`}>
                  {cta.label}
                </Link>
              </div>

              <div className="mx-auto w-full px-6 pt-7 sm:max-w-[640px] md:max-w-[768px]">
                <div className="mb-4">
                  <div className="relative flex h-[45px] w-full items-center rounded-full border border-charcoal/20 bg-white">
                    <input
                      type="text"
                      value={mobileQuery}
                      onChange={(e) => setMobileQuery(e.target.value)}
                      placeholder="Search"
                      autoComplete="off"
                      aria-label="Search"
                      className="h-full w-full border-none bg-transparent pr-10 pl-4 text-[16px] leading-none font-normal text-charcoal outline-none"
                    />
                    <SearchIcon className="absolute right-3 h-[18px] w-[18px] text-charcoal opacity-60" />
                  </div>
                </div>
                {mobileQuery && (
                  <div className="mb-4">
                    <SearchResults query={mobileQuery} onPick={() => setMobileOpen(false)} mobile />
                  </div>
                )}

                <div>
                  {navMenu.map((entry) => {
                    if (!isNavGroup(entry)) {
                      return (
                        <Link
                          key={entry.label}
                          href={entry.href}
                          onClick={() => setMobileOpen(false)}
                          className="relative block w-full py-4 text-left font-display text-[26px] leading-8 font-medium tracking-display text-charcoal"
                        >
                          {entry.label}
                        </Link>
                      );
                    }
                    const group = entry;
                    const isOpen = mobileGroup === group.label;
                    return (
                      <div key={group.label}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setMobileGroup(isOpen ? null : group.label)}
                          className="relative block w-full py-4 text-left font-display text-[26px] leading-8 font-medium tracking-display text-charcoal"
                        >
                          <span>{group.label}</span>
                          <span aria-hidden className="absolute top-1/2 right-0 -translate-y-1/2">
                            <Chevron up={isOpen} />
                          </span>
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                          inert={!isOpen}
                        >
                          <div className="overflow-hidden">
                            {group.items.map((item) => (
                              <Link key={item.href} href={item.href} className="mb-0 block py-2 text-charcoal">
                                <span className="inline-block">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
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
