"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { HeaderNav } from "@/lib/chrome-content";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Props = { nav: HeaderNav; className?: string };

// Top-level entries. The current section is underlined in gold.
const topLinkClass = cn(
  "inline-flex h-11 items-center rounded-md bg-transparent px-3 text-[15px] font-medium text-charcoal",
  "hover:bg-gold-100 focus:bg-gold-100 data-open:bg-gold-100",
  "data-active:bg-transparent data-active:underline data-active:decoration-gold-600 data-active:decoration-2 data-active:underline-offset-8 data-active:hover:bg-gold-100",
);

const panelLinkClass =
  "grid grid-cols-[2rem_1fr] items-start gap-x-2 gap-y-0 rounded-md p-3 hover:bg-gold-100 focus:bg-gold-100 data-active:bg-gold-100";

/** Desktop menu: a Services panel listing every part of the house, then the other top-level pages. */
export default function DesktopNav({ nav, className }: Props) {
  const pathname = usePathname();
  const servicesActive = isActivePath(pathname, nav.services.all.href);
  const allActive = pathname === nav.services.all.href;

  return (
    <NavigationMenu aria-label={nav.label} className={className}>
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger data-active={servicesActive || undefined} className={topLinkClass}>
            {nav.services.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[34rem] grid-cols-2 gap-1 p-1">
              {nav.services.items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <NavigationMenuLink asChild active={active} className={panelLinkClass}>
                      <Link href={item.href} aria-current={active ? "page" : undefined}>
                        <span aria-hidden className="annotation pt-0.5 text-gold-800">
                          {item.number}
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[15px] font-semibold text-charcoal">{item.label}</span>
                          <span className="annotation text-charcoal-700">{item.location}</span>
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
              <li className="col-span-2 border-t border-charcoal/15 pt-1">
                <NavigationMenuLink
                  asChild
                  active={allActive}
                  className="min-h-11 px-3 text-[15px] font-semibold text-charcoal hover:bg-gold-100 focus:bg-gold-100"
                >
                  <Link href={nav.services.all.href} aria-current={allActive ? "page" : undefined}>
                    {nav.services.all.label}
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {nav.links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild active={active} className={topLinkClass}>
                <Link href={link.href} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
