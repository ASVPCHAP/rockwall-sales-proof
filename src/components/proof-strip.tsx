import { proofMetrics, sources } from "@/lib/data";

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
            No invented testimonials, logos, or savings percentages. Every
            figure below is from the résumé, the Upwork case entries, or the
            2025 CoreTrust Closed/Won reports.
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
        </ol>
      </div>
    </section>
  );
}
