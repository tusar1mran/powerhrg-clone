"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { HeaderActions, HeaderNav } from "@/lib/chrome-content";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Props = {
  nav: HeaderNav;
  actions: HeaderActions;
  className?: string;
};

const rowClass = cn(
  "grid min-h-12 grid-cols-[2.25rem_1fr] items-center rounded-md px-2 text-[17px] font-medium text-charcoal",
  "hover:bg-gold-100 focus-visible:bg-gold-100 aria-[current=page]:bg-gold-100",
);

/** Phone and tablet menu in a side sheet. Every link closes the sheet as it navigates. */
export default function MobileNav({ nav, actions, className }: Props) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-touch" className={className} aria-label={actions.menu.open}>
          <Menu aria-hidden strokeWidth={1.75} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-[min(22rem,88vw)] gap-0 bg-paper">
        <SheetHeader className="flex-row items-start justify-between gap-4 border-b border-charcoal/15 px-5 py-4">
          <div className="flex flex-col gap-1">
            <SheetTitle className="font-display text-[28px] leading-8 font-normal">{actions.menu.title}</SheetTitle>
            <SheetDescription className="text-[14px] text-charcoal-700">{actions.menu.description}</SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon-touch" aria-label={actions.menu.close}>
              <X aria-hidden strokeWidth={1.75} />
            </Button>
          </SheetClose>
        </SheetHeader>

        <nav aria-label={nav.label} className="flex-1 overflow-y-auto px-3 py-4">
          <p className="annotation px-2 pb-2 text-charcoal-700">{nav.services.label}</p>
          <ul className="flex flex-col">
            {nav.services.items.map((item, index) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                    className={rowClass}
                  >
                    <span aria-hidden className="annotation text-gold-800">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
            <li>
              <SheetClose asChild>
                <Link
                  href={nav.services.all.href}
                  aria-current={pathname === nav.services.all.href ? "page" : undefined}
                  className={rowClass}
                >
                  <span aria-hidden />
                  {nav.services.all.label}
                </Link>
              </SheetClose>
            </li>
          </ul>

          <ul className="mt-4 flex flex-col border-t border-charcoal/15 pt-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                    className={cn(rowClass, "grid-cols-1 px-4 font-display text-[24px] font-normal")}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="border-t border-charcoal/15 px-5 py-4">
          <SheetClose asChild>
            <Button asChild size="touch-lg">
              <Link href={actions.quote.href}>
                {actions.quote.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </SheetClose>
          <Button asChild variant="outline" size="touch-lg">
            <a href={actions.call.href}>
              <Phone data-icon="inline-start" aria-hidden strokeWidth={1.75} />
              {actions.call.label}
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
