import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ProofGallery } from "@/components/proof-gallery";
import {
  categoryBreadth,
  coreTrustConference,
  coreTrustQuarters,
  coreTrustYtd,
  peParentsVisible,
  peRelationshipsNamed,
  supplierContractsNamed,
} from "@/lib/data";
import { usd, usdCompact } from "@/lib/format";

const maxSpend = Math.max(
  ...coreTrustQuarters.map((quarter) => quarter.projectedSpend),
);

export function CoreTrustProof() {
  return (
    <section id="coretrust" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <p className="kicker">CoreTrust · Private Equity AE</p>
        <div className="mt-3 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
          <h2 className="font-heading max-w-[20ch] text-3xl tracking-tight sm:text-5xl">
            2025 Closed/Won book — performance, not a CRM dump.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Ranked top 1% of CoreTrust reps in <em>2023 and 2024</em>. The
            screenshots below are the 2025 Closed/Won opportunity reports
            (Current Year — C/W by AE). Figures are rollups from those reports.
            They are not a restatement of quota ranking, and they do not add
            confidential line-level economics beyond what the reports already
            show.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="C/W opportunities"
            value={String(coreTrustYtd.deals)}
            hint="23 + 24 + 21 + 24"
          />
          <Stat
            label="Projected spend (YTD)"
            value={usdCompact(coreTrustYtd.projectedSpend)}
            hint={usd(coreTrustYtd.projectedSpend)}
          />
          <Stat
            label="CT expected revenue (YTD)"
            value={usdCompact(coreTrustYtd.ctExpected)}
            hint={usd(coreTrustYtd.ctExpected)}
          />
          <Stat
            label="Sales-comp expected rev (YTD)"
            value={usdCompact(coreTrustYtd.salesComp)}
            hint={usd(coreTrustYtd.salesComp)}
          />
        </div>

        <div className="mt-12 rounded-sm border border-[var(--rule)] p-5 sm:p-8">
          <p className="text-[0.7rem] tracking-[0.16em] text-[var(--brass)] uppercase">
            Quarterly projected spend · Closed/Won
          </p>
          <ul className="mt-6 space-y-5">
            {coreTrustQuarters.map((quarter) => {
              const width = (quarter.projectedSpend / maxSpend) * 100;
              return (
                <li key={quarter.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{quarter.label}</span>
                    <span className="text-muted-foreground">
                      {quarter.deals} deals · {usdCompact(quarter.projectedSpend)}{" "}
                      spend · {usdCompact(quarter.ctExpected)} CT exp.
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[var(--brass)]"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            {coreTrustYtd.note} Column labels match the report: Projected Spend,
            CT Expected Revenue, Sales Comp Expected Rev.
          </p>
        </div>

        <figure className="mt-12 overflow-hidden rounded-sm border border-[var(--rule)] lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)]">
          <Image
            src={coreTrustConference.image}
            alt={coreTrustConference.alt}
            width={coreTrustConference.width}
            height={coreTrustConference.height}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 42rem, 100vw"
          />
          <figcaption className="flex flex-col justify-center border-t border-[var(--rule)] p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <p className="text-[0.7rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              {coreTrustConference.kicker}
            </p>
            <h3 className="font-heading mt-3 text-2xl tracking-tight sm:text-3xl">
              {coreTrustConference.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {coreTrustConference.body}
            </p>
          </figcaption>
        </figure>

        <div className="mt-12">
          <h3 className="font-heading text-2xl">PE parent accounts on the book</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Résumé-named relationships closed and expanded:{" "}
            {peRelationshipsNamed.join(", ")}. Additional PE parent-account
            names below appear on the 2025 Closed/Won screenshots — typographic
            list only, no invented logos.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {peParentsVisible.map((name) => (
              <li
                key={name}
                className="rounded-sm border border-[var(--rule)] px-3 py-2.5 text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Supplier contracts named on the résumé:{" "}
            {supplierContractsNamed.join(", ")}.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="font-heading text-2xl">Category breadth</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Opportunity names visible on the same Closed/Won reports — a
            cross-section of indirect spend, not a complete catalog.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categoryBreadth.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="h-auto rounded-sm px-2.5 py-1 text-[0.7rem] tracking-wide"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-heading text-2xl">Source reports</h3>
          <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
            Cropped to the AE Closed/Won view. On mobile, swipe the table
            horizontally or tap Enlarge.
          </p>
          <ProofGallery />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-sm border border-[var(--rule)] p-5">
      <p className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="font-heading mt-2 text-3xl tracking-tight">{value}</p>
      <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}
