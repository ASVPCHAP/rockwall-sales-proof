import { Button } from "@/components/ui/button";
import { gtmTools, proofMetrics } from "@/lib/data";
import { site } from "@/lib/site";

export function Hero() {
  const lead = proofMetrics.slice(0, 4);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--rule)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_60%)]"
      />
      <div className="wrap relative flex flex-col justify-center py-14 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:py-12">
        <p className="text-[0.72rem] tracking-[0.22em] text-[var(--brass)] uppercase">
          {site.firm} · {site.location} · AI operating partner
        </p>
        <h1 className="font-heading mt-5 max-w-[18ch] text-[2.35rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance sm:text-6xl lg:text-[4.1rem]">
          AI that puts the right clients in front of you — and{" "}
          <em className="italic">closes faster</em>.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {site.name}: 10+ years closing{" "}
          <strong className="font-medium text-foreground">
            $1M to $23M+ quota
          </strong>
          . Advisor to Rampart Corporation, a white-label GPO —{" "}
          <strong className="font-medium text-foreground">56 contracts</strong>{" "}
          and{" "}
          <strong className="font-medium text-foreground">
            over $100 million in spend
          </strong>
          , including Canada. Top 1% of CoreTrust reps in 2023 and 2024. I
          automate GTM in {gtmTools.join(", ")} — and install the same motion at
          Rockwall Partners.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-sm px-6 text-[0.8rem] tracking-[0.1em] uppercase"
          >
            <a href={site.calendarUrl} rel="noreferrer" target="_blank">
              {site.calendarLabel}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-sm px-6 text-[0.8rem] tracking-[0.1em] uppercase"
          >
            <a href={site.website} rel="noreferrer" target="_blank">
              {site.websiteLabel}
            </a>
          </Button>
        </div>

        <dl className="mt-10 grid gap-5 border-t border-[var(--rule)] pt-7 sm:grid-cols-2 lg:grid-cols-4">
          {lead.map((metric) => (
            <div key={metric.id}>
              <dt className="font-heading text-4xl tracking-tight sm:text-[2.6rem]">
                {metric.value}
              </dt>
              <dd className="mt-2 max-w-[28ch] text-sm leading-snug text-muted-foreground">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
