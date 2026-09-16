import { Button } from "@/components/ui/button";
import { rampart, sources } from "@/lib/data";

export function RampartSection() {
  return (
    <section id="rampart" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <p className="kicker">{rampart.kicker}</p>
        <h2 className="font-heading mt-3 max-w-[22ch] text-3xl tracking-tight sm:text-5xl">
          {rampart.title}
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {rampart.lede}
        </p>

        <ol className="mt-10 grid gap-px overflow-hidden rounded-sm bg-[var(--rule)] sm:grid-cols-3">
          {rampart.lineage.map((step, index) => (
            <li key={step.org} className="bg-background p-5 sm:p-6">
              <p className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                {String(index + 1).padStart(2, "0")} · lineage
              </p>
              <h3 className="font-heading mt-3 text-2xl tracking-tight">
                {step.org}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.note}
              </p>
              {step.href.startsWith("http") ? (
                <a
                  href={step.href}
                  rel="noreferrer"
                  target="_blank"
                  className="mt-3 inline-block text-sm text-[var(--brass)] underline-offset-4 hover:underline"
                >
                  {step.href.replace(/^https?:\/\//, "")} →
                </a>
              ) : step.href !== "#rampart" ? (
                <a
                  href={step.href}
                  className="mt-3 inline-block text-sm text-[var(--brass)] underline-offset-4 hover:underline"
                >
                  On this page →
                </a>
              ) : null}
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {rampart.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-[var(--rule)] p-5"
            >
              <dt className="font-heading text-4xl tracking-tight">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm">{stat.label}</dd>
              <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {stat.detail}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              The advisor seat
            </p>
            <ul className="mt-4 space-y-3">
              {rampart.contribution.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[var(--brass)] pl-3 text-sm leading-snug sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[var(--rule)] p-6">
            <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              {rampart.rockwall.kicker}
            </p>
            <h3 className="font-heading mt-3 text-2xl tracking-tight">
              {rampart.rockwall.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {rampart.rockwall.body}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {rampart.rockwall.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-3xl tracking-tight">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {rampart.resumeNote}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-sm px-5 text-[0.78rem] tracking-[0.08em] uppercase"
          >
            <a href="https://valcoregpo.com/" rel="noreferrer" target="_blank">
              valcoregpo.com
            </a>
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {sources.rampart}
          </p>
        </div>
      </div>
    </section>
  );
}
