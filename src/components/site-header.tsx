"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color-mix(in_oklch,var(--background)_92%,transparent)] backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4 sm:h-16">
        <a href="#top" className="group flex min-w-0 flex-col leading-none">
          <span className="font-heading text-[1.05rem] tracking-tight text-foreground">
            {site.name}
          </span>
          <span className="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
            {site.firm}
          </span>
        </a>

        <nav
          className="hidden items-center gap-2.5 xl:flex xl:gap-4"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.72rem] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-foreground"
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

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-sm xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id={panelId}
          className="xl:hidden border-t border-[var(--rule)] bg-background"
        >
          <nav className="wrap flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-[var(--rule)] py-3 text-sm tracking-[0.12em] text-foreground uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.calendarUrl}
              rel="noreferrer"
              target="_blank"
              className="bg-primary text-primary-foreground mt-4 mb-4 inline-flex h-11 items-center justify-center rounded-sm px-4 text-[0.78rem] tracking-[0.08em] uppercase"
              onClick={() => setOpen(false)}
            >
              Book assessment
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
