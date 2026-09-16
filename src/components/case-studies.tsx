import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CultureFigure } from "@/components/culture-figure";
import { caseStudies, valcoreOffsite } from "@/lib/data";

export function CaseStudies() {
  return (
    <section id="work" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <p className="kicker">Selected projects</p>
        <h2 className="font-heading mt-3 max-w-[20ch] text-3xl tracking-tight sm:text-5xl">
          Work in the operator&apos;s own numbers.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Live products first — AgeriteCRM and Valcore GPO — then the Rampart
          white-label GPO (advisor, 1099), ops rebuilds, LLM cost control
          (Rockwall × Rampart), the Valstone GTM behind Valcore, PE enterprise
          sales, and Horizon3.ai (TOLA / Series C GTM). Results are copied from
          those sources, not dressed up.
        </p>

        <div className="mt-12 grid gap-5">
          {caseStudies.map((study, index) => (
            <article key={study.slug} id={study.slug} className="grid gap-5">
              <Card className="rounded-sm bg-transparent py-0 ring-[var(--rule)]">
                <CardHeader className="border-b border-[var(--rule)] py-6">
                  <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                    {String(index + 1).padStart(2, "0")} · {study.kicker}
                  </p>
                  <CardTitle className="font-heading mt-2 max-w-[28ch] text-2xl font-normal tracking-tight sm:text-3xl">
                    {study.title}
                  </CardTitle>
                  {study.href ? (
                    <a
                      href={study.href}
                      className="text-sm text-[var(--brass)] underline-offset-4 hover:underline"
                      {...(study.href.startsWith("http")
                        ? { rel: "noreferrer", target: "_blank" }
                        : {})}
                    >
                      {study.hrefLabel} →
                    </a>
                  ) : null}
                </CardHeader>
                <CardContent className="grid gap-8 py-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                    {study.summary}
                  </p>
                  <div>
                    <p className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                      Results
                    </p>
                    <ul className="mt-3 space-y-3">
                      {study.results.map((result) => (
                        <li
                          key={result}
                          className="border-l-2 border-[var(--brass)] pl-3"
                        >
                          <p className="font-heading text-lg leading-snug tracking-tight sm:text-xl">
                            {result}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {study.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="h-auto rounded-sm px-2 py-0.5 text-[0.65rem]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {study.slug === "valcore-gpo" ? (
                <CultureFigure {...valcoreOffsite} />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
