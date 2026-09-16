import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <p className="kicker">Contact</p>
        <h2 className="font-heading mt-3 max-w-[18ch] text-3xl tracking-tight sm:text-5xl">
          A free 20-minute AI Opportunity Assessment.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          An operating audit, not a pitch deck: where GTM is leaking time, which
          workflows should be automated, and whether Rockwall Partners is the
          right install. If we are not a fit, you still leave with a map.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </Button>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-[var(--rule)] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Email
            </dt>
            <dd className="mt-2">
              <a className="hover:text-[var(--brass)]" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Phone
            </dt>
            <dd className="mt-2">
              <a className="hover:text-[var(--brass)]" href={site.phoneHref}>
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Location
            </dt>
            <dd className="mt-2">
              {site.location} · {site.timezone}
            </dd>
          </div>
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Firm
            </dt>
            <dd className="mt-2">
              <a
                className="hover:text-[var(--brass)]"
                href={site.website}
                rel="noreferrer"
                target="_blank"
              >
                {site.websiteLabel}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
