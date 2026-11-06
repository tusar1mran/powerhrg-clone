"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { headerCta, isNavGroup, navMenu, searchIndex, serviceAreaBar, services, topSearches } from "@/lib/content";
import { site } from "@/lib/site";
import Logo from "./Logo";

type Props = {
  cta?: { label: string; href: string };
};

const serviceByHref = new Map(services.map((s) => [s.href as string, s]));

function useSearch(query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);
}

function SearchResults({ query, onPick }: { query: string; onPick: () => void }) {
  const results = useSearch(query);
  const list = query.trim() ? results : topSearches;
  const title = query.trim() ? "Search results" : "Popular";
  if (query.trim() && results.length === 0) {
    return <p className="px-3 py-4 text-[15px] text-muted">No matches. Try “roof” or “warranty”.</p>;
  }
  return (
    <div>
      <p className="px-3 pb-2 text-[12px] font-bold tracking-[0.14em] text-muted uppercase">{title}</p>
      <ul>
        {list.map((r) => (
          <li key={r.href + r.label}>
            <Link
              href={r.href}
              onClick={onPick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 text-[16px] text-ink transition-colors hover:bg-cream"
            >
              <span>{r.label}</span>
              <ArrowRight aria-hidden className="h-4 w-4 -translate-x-1 text-accent-ink opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header({ cta = headerCta }: Props) {
  const [barOpen, setBarOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [mobileQuery, setMobileQuery] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const navItem =
    "relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-cream aria-expanded:bg-cream";

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>

      {barOpen && (
        <div id="services-bar" className="relative bg-brand text-on-brand">
          <p className="container-page py-2.5 pr-12 text-center text-[14px] leading-snug">
            <span className="opacity-85">{serviceAreaBar.text}</span>{" "}
            <Link href={serviceAreaBar.link.href} className="font-semibold text-accent underline-offset-4 hover:underline">
              {serviceAreaBar.link.label}
            </Link>
          </p>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setBarOpen(false)}
            className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>
      )}

      <header
        ref={navRef}
        className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled ? "border-line bg-paper/85 shadow-[0_8px_24px_-18px_rgb(27_31_28/0.35)] backdrop-blur-xl" : "border-transparent bg-paper"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
          <Link href="/" onClick={goHome} aria-label="Return to homepage" className="shrink-0">
            <Logo className="hidden h-[44px] w-auto sm:block lg:h-[48px]" />
            <Logo iconOnly className="h-[40px] w-auto sm:hidden" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navMenu.map((entry) => {
              if (!isNavGroup(entry)) {
                const active = isActive(entry.href);
                return (
                  <Link key={entry.label} href={entry.href} aria-current={active ? "page" : undefined} className={navItem}>
                    {entry.label}
                    {active && <span aria-hidden className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />}
                  </Link>
                );
              }
              const group = entry;
              const isOpen = openMenu === group.label;
              const id = `dropdown-${group.label.toLowerCase()}`;
              const [overview, ...rest] = group.items;
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
                    className={navItem}
                  >
                    {group.label}
                    <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div
                      id={id}
                      className="absolute top-[calc(100%+14px)] left-1/2 w-[640px] -translate-x-1/2 animate-[dropdown-in_180ms_ease-out] rounded-[var(--radius-card)] border border-line bg-white p-3 shadow-[var(--shadow-float)]"
                    >
                      <ul className="grid grid-cols-2 gap-1">
                        {rest.map((item) => {
                          const s = serviceByHref.get(item.href);
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setOpenMenu(null)}
                                className="group flex items-center gap-4 rounded-xl p-2.5 transition-colors hover:bg-cream"
                              >
                                {s && (
                                  <span
                                    aria-hidden
                                    className="h-14 w-14 shrink-0 rounded-lg bg-sand bg-cover bg-center"
                                    style={{ backgroundImage: `url(${s.image})` }}
                                  />
                                )}
                                <span className="min-w-0">
                                  <span className="block text-[15px] font-bold text-ink">{item.label}</span>
                                  {s && <span className="mt-0.5 line-clamp-1 block text-[13px] text-muted">{s.text}</span>}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {overview && (
                        <Link
                          href={overview.href}
                          onClick={() => setOpenMenu(null)}
                          className="mt-2 flex items-center justify-between rounded-xl bg-cream px-4 py-3 text-[14px] font-bold text-ink transition-colors hover:bg-sand"
                        >
                          {overview.label}
                          <ArrowRight aria-hidden className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <button
                type="button"
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setOpenMenu(null);
                  setSearchOpen((v) => !v);
                  setTimeout(() => searchRef.current?.focus(), 0);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream aria-expanded:bg-cream"
              >
                <Search aria-hidden className="h-[18px] w-[18px]" />
              </button>
              {searchOpen && (
                <div className="absolute top-[calc(100%+14px)] right-0 w-[420px] animate-[dropdown-in_180ms_ease-out] rounded-[var(--radius-card)] border border-line bg-white p-3 shadow-[var(--shadow-float)]">
                  <div className="relative mb-3">
                    <Search aria-hidden className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      ref={searchRef}
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search the site"
                      autoComplete="off"
                      aria-label="Search"
                      className="h-12 w-full rounded-full border border-line bg-paper pr-4 pl-11 text-[15px] text-ink outline-none focus:border-accent"
                    />
                  </div>
                  <SearchResults query={query} onPick={() => setSearchOpen(false)} />
                </div>
              )}
            </div>
            <a href={site.phone.href} className="hidden items-center gap-2 px-3 text-[15px] font-semibold text-ink hover:text-accent-ink xl:inline-flex">
              <Phone aria-hidden className="h-4 w-4" />
              {site.phone.display}
            </a>
            <Link href={cta.href} className="btn btn-accent hidden min-h-11 px-5 sm:inline-flex">
              {cta.label}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink lg:hidden"
            >
              <Menu aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 animate-[fade-in_200ms_ease] bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-[420px] animate-[dropdown-in_200ms_ease-out] flex-col overflow-y-auto bg-paper">
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <Link href="/" onClick={goHome} aria-label="Return to homepage">
                <Logo className="h-[40px] w-auto" />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 px-5 py-6">
              <div className="relative">
                <Search aria-hidden className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value)}
                  placeholder="Search the site"
                  autoComplete="off"
                  aria-label="Search"
                  className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 text-[16px] text-ink outline-none focus:border-accent"
                />
              </div>
              {mobileQuery && (
                <div className="mt-3 rounded-[var(--radius-card)] bg-white p-2">
                  <SearchResults query={mobileQuery} onPick={() => setMobileOpen(false)} />
                </div>
              )}

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {navMenu.map((entry) => {
                  if (!isNavGroup(entry)) {
                    return (
                      <li key={entry.label}>
                        <Link href={entry.href} onClick={() => setMobileOpen(false)} className="block py-4 font-display text-[26px] text-ink">
                          {entry.label}
                        </Link>
                      </li>
                    );
                  }
                  const group = entry;
                  const isOpen = mobileGroup === group.label;
                  return (
                    <li key={group.label}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setMobileGroup(isOpen ? null : group.label)}
                        className="flex w-full items-center justify-between py-4 text-left font-display text-[26px] text-ink"
                      >
                        {group.label}
                        <ChevronDown aria-hidden className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                        inert={!isOpen}
                      >
                        <ul className="overflow-hidden">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-2.5 pl-1 text-[17px] text-muted hover:text-ink">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                          <li className="h-3" />
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-3 border-t border-line p-5">
              <Link href={cta.href} onClick={() => setMobileOpen(false)} className="btn btn-accent w-full">
                {cta.label}
              </Link>
              <a href={site.phone.href} className="btn btn-ghost w-full text-ink">
                <Phone aria-hidden className="h-4 w-4" />
                {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
