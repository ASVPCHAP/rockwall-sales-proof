"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { coreTrustQuarters } from "@/lib/data";
import { usd } from "@/lib/format";

type Quarter = (typeof coreTrustQuarters)[number];

export function ProofGallery() {
  const [active, setActive] = useState<Quarter | null>(null);

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

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          className="max-h-[92svh] w-[min(96vw,72rem)] max-w-none overflow-hidden p-0 sm:max-w-none"
          showCloseButton
        >
          {active ? (
            <>
              <DialogHeader className="px-5 pt-5 pr-12">
                <DialogTitle>
                  CoreTrust {active.label} — Closed/Won by AE
                </DialogTitle>
                <DialogDescription>
                  Scroll horizontally on small screens. Subtotal projected spend{" "}
                  {usd(active.projectedSpend)}; CT expected revenue{" "}
                  {usd(active.ctExpected)}; sales-comp expected revenue{" "}
                  {usd(active.salesComp)}.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[75svh] overflow-auto bg-[#f7f7f7] p-3">
                <Image
                  src={active.image}
                  alt={`Full CoreTrust Closed/Won report screenshot for ${active.label}.`}
                  width={active.width}
                  height={active.height}
                  className="h-auto w-full min-w-[48rem]"
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
