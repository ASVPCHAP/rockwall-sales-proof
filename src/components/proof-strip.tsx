import { liveProperties, proofMetrics, sources } from "@/lib/data";

export function ProofStrip() {
  return (
    <section id="proof" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">Proof, sourced</p>
            <h2 className="font-heading mt-3 max-w-[18ch] text-3xl tracking-tight sm:text-4xl">
              Numbers I will put on a page.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            No invented testimonials, logos, or savings percentages. Figures
            below are from the résumé, the Upwork case entries, the 2025
            CoreTrust Closed/Won reports, and Anthony&apos;s Valcore operating
            snapshot.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-5">
          {proofMetrics.map((metric, index) => (
            <li
              key={metric.value}
              className="flex flex-col bg-background p-6 sm:p-7"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-heading mt-4 text-3xl tracking-tight">
                {metric.value}
                <sup className="ml-1 font-sans text-[0.65rem] text-muted-foreground">
                  {index + 1}
                </sup>
              </p>
              <p className="mt-2 text-sm leading-snug text-foreground/90">
                {metric.label}
              </p>
              <p className="mt-auto pt-6 text-xs leading-relaxed text-muted-foreground">
                {metric.detail}
              </p>
            </li>
          ))}
        </ol>

        <ol className="mt-8 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
          {proofMetrics.map((metric, index) => (
            <li key={metric.value}>
              <span className="font-medium text-foreground/80">
                {index + 1}.
              </span>{" "}
              {sources[metric.source]}
            </li>
          ))}
          <li>
            <span className="font-medium text-foreground/80">Valcore.</span>{" "}
            {sources.valcore}
          </li>
        </ol>

        <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-[var(--rule)] sm:grid-cols-2">
          {liveProperties.map((property) => (
            <a
              key={property.href}
              href={property.href}
              rel="noreferrer"
              target="_blank"
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-muted/40 sm:p-7"
            >
              <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                Live property
              </p>
              <p className="font-heading mt-3 text-2xl tracking-tight">
                {property.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {property.note}
              </p>
              <span className="mt-4 text-sm text-[var(--brass)] underline-offset-4 group-hover:underline">
                {property.hrefLabel}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
