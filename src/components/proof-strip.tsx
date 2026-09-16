import { liveProperties, proofMetrics, resumeLedger, sources } from "@/lib/data";

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
            CoreTrust Closed/Won reports, and Anthony&apos;s Valcore snapshot.
            Horizon3 Series E figures are the company&apos;s, not personal
            production.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map((metric, index) => (
            <li
              key={metric.id}
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

        <div className="mt-12 grid gap-6">
          {resumeLedger.map((group) => (
            <div
              key={group.org}
              className="rounded-sm border border-[var(--rule)] p-5 sm:p-6"
            >
              <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                {group.role}
              </p>
              <h3 className="font-heading mt-2 text-2xl tracking-tight">
                {group.org}
              </h3>
              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {group.stats.map((stat) => (
                  <div key={`${group.org}-${stat.label}`}>
                    <dt className="font-heading text-2xl tracking-tight">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <ol className="mt-8 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
          {proofMetrics.map((metric, index) => (
            <li key={metric.id}>
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
          <li>
            <span className="font-medium text-foreground/80">Horizon3 today.</span>{" "}
            {sources.horizon3Press}
          </li>
          <li>
            <span className="font-medium text-foreground/80">5 Star Nutrition.</span>{" "}
            {sources.fiveStar}
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
