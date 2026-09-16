"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site";
import { BodyPortal } from "@/components/body-portal";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

        <nav
          className="hidden items-center gap-3 lg:flex xl:gap-5"
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
            className="rounded-sm lg:hidden"
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
        <BodyPortal>
          <div
            className="fixed inset-0 z-[100]"
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-[var(--rule)] bg-background p-6 shadow-lg">
              <p className="font-heading text-xl">{site.firm}</p>
              <nav className="mt-6 flex flex-col" aria-label="Mobile">
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
              </nav>
              <a
                href={site.calendarUrl}
                rel="noreferrer"
                target="_blank"
                className="bg-primary text-primary-foreground mt-8 inline-flex h-11 items-center justify-center rounded-sm px-4 text-[0.78rem] tracking-[0.08em] uppercase"
                onClick={() => setOpen(false)}
              >
                Book assessment
              </a>
            </div>
          </div>
        </BodyPortal>
      ) : null}
    </header>
  );
}
