"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, PhoneIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { headerChrome } from "@/lib/chrome-content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const { menu, quote } = headerChrome;

const menuLinkClass =
  "flex min-h-11 items-center rounded-lg px-3 font-heading text-[22px] leading-tight font-medium tracking-tight text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring";

const headingClass = "px-3 text-[12px] font-semibold tracking-label text-primary uppercase";

// Mobile and tablet navigation in a shadcn Sheet. Every link closes the sheet before navigating.
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-lg" className="text-white hover:bg-white/10 hover:text-white lg:hidden" />
        }
      >
        <MenuIcon />
        <span className="sr-only">{menu.open}</span>
      </SheetTrigger>
      <SheetContent side="right" className="dark w-[88vw] max-w-sm overflow-y-auto bg-charcoal-900">
        <SheetHeader className="pt-6">
          <SheetTitle className="text-[13px] tracking-label text-muted-foreground uppercase">{menu.title}</SheetTitle>
          <SheetDescription className="sr-only">{menu.description}</SheetDescription>
        </SheetHeader>

        <nav aria-label={menu.servicesHeading} className="flex flex-col gap-1 px-2">
          <p className={headingClass}>{menu.servicesHeading}</p>
          <ul className="flex flex-col">
            {menu.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className={menuLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={menu.allServices.href} onClick={close} className={cn(menuLinkClass, "text-[17px] text-muted-foreground")}>
                {menu.allServices.label}
              </Link>
            </li>
          </ul>
        </nav>

        <Separator className="mx-4 w-auto" />

        <nav aria-label={menu.companyHeading} className="flex flex-col gap-1 px-2">
          <p className={headingClass}>{menu.companyHeading}</p>
          <ul className="flex flex-col">
            {menu.company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className={cn(menuLinkClass, "text-[19px]")}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-2 p-4">
          <a href={site.phone.href} className={cn(buttonVariants({ variant: "outline" }), "h-12 text-[15px]")}>
            <PhoneIcon data-icon="inline-start" />
            {site.phone.display}
          </a>
          <Link href={quote.href} onClick={close} className={cn(buttonVariants(), "h-12 text-[15px] font-semibold")}>
            {quote.label}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
