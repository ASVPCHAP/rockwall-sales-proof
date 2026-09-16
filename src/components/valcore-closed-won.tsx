"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { valcoreClosedWon } from "@/lib/data";

export function ValcoreClosedWon() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const chart = valcoreClosedWon;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <figure className="rounded-sm border border-[var(--rule)] bg-card">
        <figcaption className="flex flex-col gap-3 border-b border-[var(--rule)] px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
          <div>
            <p className="text-[0.7rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              Signed members · HubSpot
            </p>
            <p className="font-heading mt-1 text-xl tracking-tight sm:text-2xl">
              {chart.title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {chart.subtitle} during Anthony&apos;s Valstone/Valcore tenure —
              closed/won deals tied to signed-member activity.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit rounded-sm"
            onClick={() => setOpen(true)}
          >
            Enlarge
          </Button>
        </figcaption>
        <button
          type="button"
          className="block w-full cursor-zoom-in bg-white text-left"
          onClick={() => setOpen(true)}
          aria-label="Open Valcore Closed/Won category chart"
        >
          <Image
            src={chart.image}
            alt={chart.alt}
            width={chart.width}
            height={chart.height}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 56rem, 100vw"
          />
        </button>
        <div className="grid gap-4 border-t border-[var(--rule)] px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {chart.note}
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-3">
            {chart.categories.map((category) => (
              <li key={category.name} className="flex justify-between gap-2">
                <span className="text-muted-foreground">{category.name}</span>
                <span className="tabular-nums">
                  {category.deals} · {category.share}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </figure>

      <dialog
        ref={dialogRef}
        className="proof-lightbox"
        aria-labelledby="valcore-chart-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        {open ? (
          <div className="proof-lightbox-panel">
            <div className="flex justify-between gap-4 border-b border-[var(--rule)] p-5">
              <div>
                <h3 id="valcore-chart-title" className="font-heading text-xl">
                  Signed members — {chart.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {chart.subtitle}. {chart.note}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-sm"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X />
              </Button>
            </div>
            <div className="max-h-[75svh] overflow-auto bg-white p-3">
              <Image
                src={chart.image}
                alt={chart.alt}
                width={chart.width}
                height={chart.height}
                className="h-auto w-full"
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
