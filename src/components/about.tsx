import { education, experience } from "@/lib/data";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="section border-b border-[var(--rule)]">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="kicker">About</p>
          <h2 className="font-heading mt-3 text-3xl tracking-tight sm:text-5xl">
            Seller first. Then the systems.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Ten-plus years closing multi-stakeholder deals from $1M to $23M+ in
            quota. Most recently building and scaling a $160M+ GTV pipeline for
            a B2B procurement platform. The AI work is not adjacent — it is how
            the analytics and GTM systems actually run.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Based in {site.location} ({site.timezone}). Experienced selling fully
            remote across US time zones; open to travel. B.S. Business Management
            (IT), Western Governors University.
          </p>
          <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <ol className="space-y-0">
          {experience.map((job) => (
            <li
              key={job.org}
              className="border-t border-[var(--rule)] py-6 first:border-t-0 first:pt-0"
            >
              <p className="text-[0.68rem] tracking-[0.14em] text-[var(--brass)] uppercase">
                {job.dates}
              </p>
              <h3 className="mt-1.5 font-medium">
                {job.role}
                <span className="text-muted-foreground"> · {job.org}</span>
              </h3>
              {"href" in job && job.href ? (
                <a
                  href={job.href}
                  className="mt-1 inline-block text-sm text-[var(--brass)] underline-offset-4 hover:underline"
                >
                  {job.hrefLabel} →
                </a>
              ) : null}
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
