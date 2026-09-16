"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color-mix(in_oklch,var(--background)_88%,transparent)] backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4 sm:h-16">
        <a href="#top" className="group flex min-w-0 flex-col leading-none">
          <span className="font-heading text-[1.05rem] tracking-tight text-foreground">
            {site.name}
          </span>
          <span className="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
            {site.firm}
          </span>
        </a>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-7" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.72rem] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-foreground xl:text-[0.78rem] xl:tracking-[0.12em]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="hidden h-10 rounded-sm px-4 text-[0.78rem] tracking-[0.08em] uppercase sm:inline-flex"
          >
            <a href={site.calendarUrl} rel="noreferrer" target="_blank">
              Book assessment
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-sm lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="relative w-[min(100%,20rem)] p-6">
              <SheetHeader className="px-0">
                <SheetTitle className="font-heading text-left text-xl font-normal">
                  {site.firm}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="border-b border-[var(--rule)] py-3 text-sm tracking-[0.12em] uppercase"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button asChild className="mt-8 h-11 w-full rounded-sm uppercase">
                  <a href={site.calendarUrl} rel="noreferrer" target="_blank">
                    Book assessment
                  </a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
