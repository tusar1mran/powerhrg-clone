"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/content";

type Props = { label: string; items: NavItem[] };

/** True when `href` is the current page or a parent section of it (e.g. /services for /services/roofing). */
function isCurrentSection(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Desktop header links. A client component only so the current section can be marked.
export default function HeaderNav({ label, items }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const current = isCurrentSection(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium text-white/75 transition-colors",
                  "hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                  current && "text-white after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-gold",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
