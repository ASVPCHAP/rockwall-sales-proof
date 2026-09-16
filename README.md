# Anthony Chapman — Rockwall Partners portfolio

Public, single-URL portfolio for Upwork and outbound: enterprise sales track record (CoreTrust PE / top 1% in **2023 and 2024**), GTM built from zero, LLM / automation ops, and Rockwall Partners as the AI operating partner.

Primary CTA: a free 20-minute [AI Opportunity Assessment](https://calendar.app.google/DdKru8JjNFAetwiu7). Firm site: [rockwallpartners.com](https://rockwallpartners.com).

## What is on the page

- Hero + sourced proof metrics (résumé, Upwork case entries, 2025 CoreTrust Closed/Won reports)
- CoreTrust 2025 C/W rollups (92 opportunities; YTD projected spend **$81,101,018.60**, CT expected revenue **$888,030.35**, sales-comp expected revenue **$1,235,494.83**) with quarterly charts and the source screenshots
- Five case studies (AgeriteCRM, private-school ops, LLM cost routing, Valstone GTM, CoreTrust PE)
- Method, résumé highlights, contact

No testimonials, logos, or savings figures were invented. Top 1% is stated for 2023–2024 only; 2025 is presented as the Closed/Won proof pack.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:4321](http://127.0.0.1:4321)

```bash
npm run build
npm start -- --port 4321
```

Optional: set `NEXT_PUBLIC_SITE_URL` to the public origin (used for metadata, sitemap, and Open Graph). Defaults to `https://rockwallpartners.com`.

## Deploy (the public Upwork link)

This is a standard Next.js App Router app. Pick one host and paste the HTTPS URL into Upwork.

### Vercel

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: Next.js. Build command `next build`. Output: default.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain (e.g. `https://chapman.vercel.app` or a custom domain).
5. Deploy. Use the production URL on Upwork.

Custom domain: Project → Settings → Domains.

### Cloudflare Pages

1. Create a Pages project pointed at this repo.
2. Framework preset: Next.js, or use [@cloudflare/next-on-pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/) / OpenNext.
3. For a purely static export alternative, add `output: "export"` in `next.config.ts`, run `npm run build`, and publish the `out/` directory. Local images already live under `public/`.
4. Set `NEXT_PUBLIC_SITE_URL` to the `*.pages.dev` URL or custom domain.

### Any static host

If you enable `output: "export"` in `next.config.ts`:

```bash
npm run build
```

Upload `out/` to Cloudflare Pages, Netlify, S3, etc.

## Content sources (do not invent)

- Résumé PDF (roles: Rampart, Rockwall Partners, Valstone, CoreTrust, Horizon3.ai)
- Five Upwork markdown case entries
- CoreTrust Closed/Won screenshots in `public/proof/` (Q1–Q4 2025)

Confidential client line items are not restated beyond parent-account names and category labels already visible in those materials.
