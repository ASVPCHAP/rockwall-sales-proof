import { Button } from "@/components/ui/button";
import { proofMetrics } from "@/lib/data";
import { site } from "@/lib/site";

export function Hero() {
  const lead = proofMetrics.slice(0, 3);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--rule)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_60%)]"
      />
      <div className="wrap relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 sm:py-20">
        <p className="text-[0.72rem] tracking-[0.22em] text-[var(--brass)] uppercase">
          {site.firm} · {site.location} · AI operating partner
        </p>
        <h1 className="font-heading mt-5 max-w-[18ch] text-[2.35rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance sm:text-6xl lg:text-[4.35rem]">
          AI that puts the right clients in front of you — and{" "}
          <em className="italic">closes faster</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          I&apos;m {site.name}, an enterprise AE who ranked{" "}
          <strong className="font-medium text-foreground">
            top 1% of reps at CoreTrust in 2023 and 2024
          </strong>
          . I now install GTM and ops automation for owner-operated companies as
          Rockwall Partners — the AI operating partner, not another slide deck.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

        <dl className="mt-14 grid gap-6 border-t border-[var(--rule)] pt-8 sm:grid-cols-3">
          {lead.map((metric) => (
            <div key={metric.value}>
              <dt className="font-heading text-4xl tracking-tight sm:text-5xl">
                {metric.value}
              </dt>
              <dd className="mt-2 max-w-[28ch] text-sm leading-snug text-muted-foreground">
                {metric.label}
                <span className="mt-1 block text-xs text-[var(--brass)]">
                  {metric.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
