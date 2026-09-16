import { Button } from "@/components/ui/button";
import { horizon3, sources } from "@/lib/data";

export function Horizon3Section() {
  return (
    <section id="horizon3" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <p className="kicker">{horizon3.kicker}</p>
        <h2 className="font-heading mt-3 max-w-[22ch] text-3xl tracking-tight sm:text-5xl">
          {horizon3.title}
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {horizon3.lede}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              What I actually did
            </p>
            <ul className="mt-4 space-y-3">
              {horizon3.contribution.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[var(--brass)] pl-3 text-sm leading-snug sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {horizon3.bridge}
            </p>
          </div>

          <div>
            <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              Where the company is now
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Company figures from the Series E release — not personal
              production credits.
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {horizon3.today.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-sm border border-[var(--rule)] p-4"
                >
                  <dt className="font-heading text-2xl tracking-tight">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm">{stat.label}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    {stat.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {horizon3.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                rel="noreferrer"
                target="_blank"
                className="flex h-full flex-col rounded-sm border border-[var(--rule)] p-5 transition-colors hover:bg-muted/40"
              >
                <span className="text-sm font-medium text-[var(--brass)] underline-offset-4 hover:underline">
                  {link.label} →
                </span>
                <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {link.detail}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-sm px-5 text-[0.78rem] tracking-[0.08em] uppercase"
          >
            <a href="https://horizon3.ai" rel="noreferrer" target="_blank">
              horizon3.ai
            </a>
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {sources.horizon3Press} {sources.craftThesis}
          </p>
        </div>
      </div>
    </section>
  );
}
