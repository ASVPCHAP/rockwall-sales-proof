"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { coreTrustQuarters } from "@/lib/data";
import { usd } from "@/lib/format";

type Quarter = (typeof coreTrustQuarters)[number];

export function ProofGallery() {
  const [active, setActive] = useState<Quarter | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {coreTrustQuarters.map((quarter) => (
          <figure
            key={quarter.id}
            className="overflow-hidden rounded-sm border border-[var(--rule)] bg-card"
          >
            <figcaption className="flex items-end justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-[0.7rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                  Closed / Won · {quarter.deals} opportunities
                </p>
                <p className="mt-1 font-heading text-xl">{quarter.label}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-sm"
                onClick={() => setActive(quarter)}
              >
                Enlarge
              </Button>
            </figcaption>
            <button
              type="button"
              className="block w-full cursor-zoom-in overflow-x-auto bg-[#f7f7f7] text-left"
              onClick={() => setActive(quarter)}
              aria-label={`Open ${quarter.label} Closed/Won report`}
            >
              <div className="min-w-[40rem]">
                <Image
                  src={quarter.image}
                  alt={`CoreTrust Closed/Won opportunity report for ${quarter.label}. Subtotal projected spend ${usd(quarter.projectedSpend)}.`}
                  width={quarter.width}
                  height={quarter.height}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 34rem, 100vw"
                />
              </div>
            </button>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="proof-lightbox"
        aria-labelledby="proof-dialog-title"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
      >
        {active ? (
          <div className="proof-lightbox-panel">
            <div className="flex justify-between gap-4 border-b border-[var(--rule)] p-5">
              <div>
                <h3 id="proof-dialog-title" className="font-heading text-xl">
                  CoreTrust {active.label} — Closed/Won by AE
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Scroll horizontally on small screens. Subtotal projected spend{" "}
                  {usd(active.projectedSpend)}; CT expected revenue{" "}
                  {usd(active.ctExpected)}; sales-comp expected revenue{" "}
                  {usd(active.salesComp)}.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-sm"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                <X />
              </Button>
            </div>
            <div className="max-h-[75svh] overflow-auto bg-[#f7f7f7] p-3">
              <Image
                src={active.image}
                alt={`Full CoreTrust Closed/Won report screenshot for ${active.label}.`}
                width={active.width}
                height={active.height}
                className="h-auto w-full min-w-[48rem]"
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
