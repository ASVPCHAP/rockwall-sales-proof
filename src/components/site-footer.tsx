import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)]">
      <div className="wrap py-16 sm:py-20">
        <p className="font-heading max-w-[22ch] text-3xl leading-tight tracking-tight sm:text-5xl">
          Rockwall Partners is the AI operating partner for companies that
          already know how to sell.
        </p>
        <div className="mt-10 flex flex-col justify-between gap-4 text-sm text-muted-foreground sm:flex-row sm:items-end">
          <p>
            {site.name} · {site.firm} · {site.location}
          </p>
          <p className="max-w-md sm:text-right">
            Figures on this site are taken from the résumé, Upwork case entries,
            and CoreTrust 2025 Closed/Won reports. Nothing else was invented for
            the page.
          </p>
        </div>
      </div>
    </footer>
  );
}
