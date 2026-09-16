# Anthony Chapman — Rockwall Partners portfolio

Public, single-URL portfolio for Upwork and outbound: enterprise sales track record (CoreTrust PE / top 1% in **2023 and 2024**), GTM built from zero, LLM / automation ops, and Rockwall Partners as the AI operating partner.

Primary CTA: a free 20-minute [AI Opportunity Assessment](https://calendar.app.google/DdKru8JjNFAetwiu7). Firm site: [rockwallpartners.com](https://rockwallpartners.com).

## What is on the page

- Hero + sourced proof strip and role-by-role ledger (56 Rampart contracts / $100M+ spend, Top 1%, $23M quota, $1.5M Valstone GTV, ~60% LLM via Rockwall × Rampart, $81.1M C/W, 89% Horizon3, Ashley 2× $1M, Health IQ 93%, 5 Star Nutrition 3 locations / $30k→$120k monthly run-rate / ~$690k year)
- GTM automation named throughout: Outreach.io, Salesforce, Make.com, Zapier, n8n
- CoreTrust 2025 C/W rollups (92 opportunities; YTD projected spend **$81,101,018.60**, CT expected revenue **$888,030.35**, sales-comp expected revenue **$1,235,494.83**) with quarterly charts, the source screenshots, and a conference meal-packing photo (30,000+ meals packed for overseas; next year Orlando)
- Case studies: AgeriteCRM, **Valcore GPO** (valcoregpo.com — 20+ contracts, 33 members, still growing; Montreal offsite photo at the Royal Montreal Curling Club), **Rampart** white-label GPO (advisor 1099; 56 contracts / $100M+ spend; present in Canada), private-school ops, LLM cost routing (Rockwall × Rampart), Valstone GTM, CoreTrust PE, **Horizon3.ai** (early sales hire / TOLA GTM; company Series E cited from public press)
- Dedicated **Rampart** chapter: Valstone → Valcore → Rampart lineage; 1099 advisor for sales and supplier sourcing (not W-2 Head of BD, not ownership); Rockwall = LLM analytics + recruitment-platform partnerships
- Dedicated Horizon3 chapter with team photo (Trust But Verify), Craft thesis, Series E links; equity held as early team, not co-founder
- Foundations chapter: **5 Star Nutrition** Regional Sales Manager (2018–2021) — Sherman / Oklahoma / Cattle Mills, Texas; monthly run-rate $30k → $120k in six months; year finish ~$690k; WTAMU opener / Tornado Alley CrossFit / Anytime Fitness field photos with overlay stats; Facebook, SEO, local outreach, field work (not AI)
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

- Résumé PDF (roles: Rockwall Partners, Valstone, CoreTrust, Horizon3.ai, plus prior sales 2018–2021). Rampart on the résumé as Head of BD is superseded on this site by Anthony’s later framing: 1099 advisor, sales & supplier sourcing.
- Rampart Corporation (his words): white-label GPO; 56 contracts and over $100 million in spend; present in Canada; helped launch Valcore at Valstone; Rockwall Partners separately provides LLM analytics and recruitment-platform partnerships. Not ownership.
- 5 Star Nutrition operating facts and field-photo overlays (three locations; monthly run-rate $30k → $120k in six months; ~$690k year finish; WTAMU / Tornado Alley / Anytime Fitness; Facebook / SEO / field work — not AI)
- Five Upwork markdown case entries, plus the Valcore GPO operating snapshot (20+ contracts, 33 members, still growing)
- CoreTrust Closed/Won screenshots in `public/proof/` (Q1–Q4 2025)

Confidential client line items are not restated beyond parent-account names and category labels already visible in those materials.
