export const sources = {
  resume: "Anthony Chapman résumé (roles, quotas, ranking years, pipeline figures).",
  upwork: "Upwork portfolio case-study entries provided for this site.",
  coretrust2025:
    "CoreTrust report: Opportunities — Current Year — C/W by AE. Fiscal 2025 quarterly Closed/Won subtotals and Q4 YTD grand totals.",
  valcore:
    "Operating snapshot stated by Anthony Chapman for Valcore GPO (the public Valstone GPO): 20+ contracts, 33 members, still growing.",
} as const;

export const proofMetrics = [
  {
    value: "Top 1%",
    label: "of CoreTrust reps, company-wide",
    detail: "2023 and 2024. Ranking is from those years — not restated as a 2025 title.",
    source: "resume" as const,
  },
  {
    value: "$23M",
    label: "quarterly GTV quota at CoreTrust",
    detail: "80%+ average attainment selling sourcing contracts into PE portfolios.",
    source: "resume" as const,
  },
  {
    value: "$1.5M",
    label: "monthly GTV from a zero GTM at Valstone",
    detail:
      "Built pipeline, contracts, and ~30 new enterprise members per month. Public GPO: Valcore.",
    source: "upwork" as const,
  },
  {
    value: "~60%",
    label: "LLM token-cost reduction",
    detail: "OpenRouter / open-source routing vs. a single-provider setup, 200K+ SKUs.",
    source: "resume" as const,
  },
  {
    value: "$81.1M",
    label: "2025 Closed/Won projected spend",
    detail: "92 C/W opportunities. YTD from the Q4 report footer: $81,101,018.60.",
    source: "coretrust2025" as const,
  },
] as const;

export const coreTrustQuarters = [
  {
    id: "q1-2025",
    label: "Q1 2025",
    deals: 23,
    projectedSpend: 25_675_361.24,
    ctExpected: 343_672.74,
    salesComp: 483_992.65,
    image: "/proof/coretrust-q1-2025.png",
    width: 1509,
    height: 574,
  },
  {
    id: "q2-2025",
    label: "Q2 2025",
    deals: 24,
    projectedSpend: 27_471_009.89,
    ctExpected: 200_912.53,
    salesComp: 277_290.04,
    image: "/proof/coretrust-q2-2025.png",
    width: 1438,
    height: 634,
  },
  {
    id: "q3-2025",
    label: "Q3 2025",
    deals: 21,
    projectedSpend: 15_963_363.32,
    ctExpected: 137_047.52,
    salesComp: 177_205.16,
    image: "/proof/coretrust-q3-2025.png",
    width: 1485,
    height: 601,
  },
  {
    id: "q4-2025",
    label: "Q4 2025",
    deals: 24,
    projectedSpend: 11_991_284.15,
    ctExpected: 207_397.56,
    salesComp: 297_006.98,
    image: "/proof/coretrust-q4-2025.png",
    width: 1657,
    height: 717,
  },
] as const;

export const coreTrustYtd = {
  deals: 92,
  projectedSpend: 81_101_018.6,
  ctExpected: 888_030.35,
  salesComp: 1_235_494.83,
  note: "YTD grand totals taken from the Q4 2025 report footer (not rounded estimates). Quarterly subtotals are on each Closed/Won screenshot. Deal count matches the report’s “Anthony Chapman (92)” rollup (23 + 24 + 21 + 24).",
} as const;

export const coreTrustConference = {
  image: "/photos/coretrust-conference-meals.jpg",
  width: 1294,
  height: 1017,
  alt: "Group selfie at a CoreTrust conference meal-packing event: colleagues in blue hairnets and CoreTrust lanyards around packing bins and tables in a hotel ballroom.",
  kicker: "Conference · community",
  title: "30,000+ meals packed with the CoreTrust team",
  body: "This year’s CoreTrust conference included a meal-packing event — 30,000+ meals to send overseas for the global community. Next year: Orlando.",
} as const;

/** PE parent-account names visible on the 2025 C/W screenshots. Not invented logos. */
export const peParentsVisible = [
  "Hellman & Friedman",
  "General Atlantic",
  "Macquarie Asset Management",
  "Providence Equity Partners",
  "Sun Capital Advisors",
  "TSG Consumer Partners",
  "TA Associates",
  "AEA Investors",
  "Incline Management",
  "Centre Partners",
  "Wind Point Advisors",
  "Access Holdings",
  "Gridiron Capital",
  "Quad-C Management",
  "Crestview Advisors",
  "Caisse de dépôt et placement du Québec",
] as const;

/** Named in the résumé as closed/expanded PE relationships. */
export const peRelationshipsNamed = [
  "Hellman & Friedman",
  "General Atlantic",
  "Sun Capital",
  "Macquarie",
  "Providence",
] as const;

export const categoryBreadth = [
  "Office Supplies",
  "Laptops / Desktops",
  "Infrastructure / Servers / Storage",
  "Small Parcel — Domestic & Import/Export",
  "Payroll / HRIS",
  "Rental Car",
  "Rideshare",
  "Travel Marketplace",
  "Software",
  "Corporate Card & Expense",
  "PA-MRO",
  "IT Professional Services",
  "Commercial Truck",
  "JanSan",
  "Uniforms & Facility Rental",
  "Network Integration",
] as const;

export const liveProperties = [
  {
    name: "AgeriteCRM",
    href: "https://ageritecrm.com",
    hrefLabel: "ageritecrm.com",
    note: "Field CRM for a scaling specialty-pharmacy sales force.",
  },
  {
    name: "Valcore GPO",
    href: "https://valcoregpo.com/",
    hrefLabel: "valcoregpo.com",
    note: "Public face of the Valstone GPO. 20+ contracts. 33 members. Still growing.",
  },
] as const;

export const supplierContractsNamed = [
  "FedEx",
  "CDW",
  "Dell",
  "Geodis",
  "American Express",
] as const;

export const caseStudies = [
  {
    slug: "ageritecrm",
    kicker: "GTM systems · specialty pharmacy",
    title: "AgeriteCRM: field CRM that took reps from $7K to $22K/month",
    href: "https://ageritecrm.com",
    hrefLabel: "ageritecrm.com",
    summary:
      "A specialty pharmacy expanding from 7 to 50 states — and from 11 toward 150 field reps — needed to train, certify, and equip the force without operations collapsing. I designed and built AgeriteCRM: onboarding, certification tracking, and day-to-day sales tooling, with automated outreach, prospecting, and real-time FDA updates so reps sell inside compliance.",
    results: [
      "Rep productivity up ~60%",
      "Average rep revenue from $7K–$10K/month to $16K–$22K/month",
      "Field team scaled from 11 to 22 reps (en route to 150) without dropping ramp quality or compliance oversight",
    ],
    tags: [
      "AI automation",
      "CRM",
      "Sales enablement",
      "n8n / Make / Zapier",
      "Regulatory tooling",
    ],
  },
  {
    slug: "valcore-gpo",
    kicker: "Valstone · group purchasing",
    title: "Valcore GPO: stood up an entire GPO in under a year",
    href: "https://valcoregpo.com/",
    hrefLabel: "valcoregpo.com",
    summary:
      "Under Valstone, I helped stand up an entire group purchasing organization in under a year — no existing GTM, pipeline, or contract book. Valcore is the public face of that GPO: group purchasing power for growing companies, from a spend file to GPO-negotiated pricing. It is the live member brand for the same from-zero motion that scaled to $1.5M monthly GTV.",
    results: ["20+ contracts", "33 members", "Still growing"],
    tags: ["GPO", "B2B procurement", "Go-to-market", "Valstone"],
  },
  {
    slug: "private-school-ops",
    kicker: "Operations rebuild · education",
    title: "Private-school ops redesign — 20–30% less admin overhead",
    href: null,
    hrefLabel: null,
    summary:
      "Not a single-point fix: an end-to-end rebuild of how the organization runs. Scope covered the public site and internal web app, a centralized knowledge base, SOPs for core administrative functions, and a student onboarding process stood up from scratch.",
    results: [
      "Cut operational task load by 20–30%",
      "Replaced tribal knowledge with a documented, repeatable SOP library",
      "New onboarding reduced friction for incoming students and staff",
    ],
    tags: [
      "Operations",
      "Process design",
      "Web app",
      "SOP / knowledge base",
      "Change management",
    ],
  },
  {
    slug: "llm-cost-routing",
    kicker: "LLM ops · production routing",
    title: "Cut LLM costs ~60% while analyzing 200,000+ SKUs daily",
    href: null,
    hrefLabel: null,
    summary:
      "As Head of Business Development at Rampart and AI Operator at Rockwall Partners, I run the model layer behind high-volume analytics — 10–20 analyses per day across 200,000+ SKUs. Traffic is routed through OpenRouter and related tools so open-source models are selected by cost and task fit, for internal tooling and client-facing systems.",
    results: [
      "~60% reduction in token costs vs. a single-provider setup",
      "Sustained 10–20 runs/day on 200K+ SKUs without cost scaling linearly",
      "Hands-on OpenRouter deployment in production — not a slide-deck architecture",
    ],
    tags: [
      "OpenRouter",
      "LLM routing",
      "Cost optimization",
      "Open-source models",
      "AI agents",
    ],
  },
  {
    slug: "valstone-gtm",
    kicker: "Build-from-zero GTM · B2B procurement",
    title: "Procurement GTM from nothing to $1.5M monthly GTV",
    href: "https://valcoregpo.com/",
    hrefLabel: "valcoregpo.com",
    summary:
      "As Head of Group Purchasing / Business Development at Valstone, I launched a B2B procurement platform with no GTM motion, pipeline, or contract portfolio — then built all three. That included a data-driven pass over 1,800+ target accounts representing $92M in addressable spend, and direct supplier agreements across MRO, logistics, IT, and indirect. The public-facing GPO from that build is Valcore.",
    results: [
      "Scaled to $1.5M in monthly GTV",
      "~30 new enterprise members added per month",
      "Supplier agreements delivering up to 40% savings (18% average) for enterprise clients",
    ],
    tags: [
      "Go-to-market",
      "Pipeline",
      "Account prioritization",
      "B2B procurement",
      "Negotiation",
    ],
  },
  {
    slug: "coretrust-pe",
    kicker: "Enterprise sales · private equity",
    title: "$23M quarterly quota, top 1% of reps — PE portfolio selling",
    href: null,
    hrefLabel: null,
    summary:
      "As Senior Account Executive, Private Equity at CoreTrust, I carried a $23M quarterly GTV quota selling enterprise sourcing contracts into PE portfolio companies, with consistent 80%+ attainment — ranking top 1% of reps company-wide in 2023 and 2024. Complex, multi-stakeholder deals ran across IT, Procurement, HR, and Supply Chain. Account analysis used self-hosted / local-cloud open-source LLMs so sensitive customer data never went through third-party model providers.",
    results: [
      "$23M quarterly quota, 80%+ average attainment",
      "Top 1% of reps company-wide, 2023 and 2024",
      "Contracts closed with FedEx, CDW, Dell, Geodis, and American Express, alongside named PE relationships",
      "Private AI deployment for large-scale analytics — no third-party data exposure",
    ],
    tags: [
      "Enterprise sales",
      "Private equity",
      "Secure AI",
      "Contract negotiation",
      "Data privacy",
    ],
  },
] as const;

export const method = [
  {
    title: "Audit the motion, not the tool",
    body: "I start with where revenue leaks: who you should be in front of, what the handoffs cost, and which steps a person is still doing because nobody wired the system. The 20-minute assessment is that pass — not a product demo.",
  },
  {
    title: "Install GTM automation that a seller would actually use",
    body: "n8n, Make, and Zapier for the pipes. CRM, inbox, enrichment, and follow-up sequenced so the next right account is in front of you. I have carried $23M quarterly quotas. I do not build busywork bots.",
  },
  {
    title: "Run models like an operator",
    body: "OpenRouter and open-source routing to pick the model by task and cost. Agents and bots where they earn their keep. Self-hosted LLMs when the data cannot leave the building — the same constraint PE and enterprise buyers already have.",
  },
] as const;

export const experience = [
  {
    org: "Rampart Corporation",
    role: "Head of Business Development",
    dates: "Jul 2026 — Present · Dallas",
    points: [
      "Built a $160M+ GTV pipeline in six months across IT, facilities, waste, food & beverage, and other indirect categories.",
      "Built a 16-partner supplier network representing ~$600B in aggregate spend; negotiated a five-year partnership covering exclusivity, revenue share, and client ownership.",
      "Runs live member savings analyses for C-suite and Procurement. LLM routing (OpenRouter and others) on 10–20 analyses/day across 200,000+ SKUs, cutting token costs ~60% vs. a single provider.",
    ],
  },
  {
    org: "Rockwall Partners",
    role: "Founder / AI Operator",
    dates: "Feb 2025 — Present (concurrent) · Dallas–Fort Worth",
    points: [
      "AI operating-partner consultancy for owner-operated small and mid-size businesses — GTM, operations, and back-office systems.",
      "Client automations in n8n / Make / Zapier, integrating field-service and back-office tools.",
      "Hands-on OpenRouter customer for internal tooling and client-facing AI systems.",
    ],
  },
  {
    org: "Valstone",
    role: "Head of Group Purchasing / Business Development",
    dates: "Dec 2025 — Jul 2026 · Dallas",
    points: [
      "Launched a B2B procurement platform from zero: GTM, pipeline, and contracts to $1.5M monthly GTV and ~30 new enterprise members per month.",
      "Helped stand up the public GPO — Valcore (valcoregpo.com) — in under a year: 20+ contracts, 33 members, still growing.",
      "Directed analysis of 1,800+ target accounts representing $92M in addressable spend.",
      "Negotiated supplier agreements delivering up to 40% savings and an 18% average across MRO, logistics, IT, and indirect.",
    ],
  },
  {
    org: "CoreTrust",
    role: "Senior Account Executive, Private Equity",
    dates: "Aug 2023 — Dec 2025 · Dallas",
    points: [
      "$23M quarterly GTV quota, 80%+ attainment; top 1% of reps company-wide in 2023 and 2024.",
      "Closed and expanded relationships with Hellman & Friedman, General Atlantic, Sun Capital, Macquarie, and Providence.",
      "Landed contracts with FedEx, CDW, Dell, Geodis, and American Express. Deployed self-hosted open-source LLMs so PE customer data never routed through third-party model providers.",
    ],
  },
  {
    org: "Horizon3.ai",
    role: "Senior Account Executive / New Business Development",
    dates: "Jan 2022 — Sep 2023 · Dallas",
    points: [
      "One of the first sales hires at a Series C cybersecurity company; evangelized NodeZero against entrenched incumbents.",
      "Built the TOLA territory from scratch and established VAR / MSSP partnerships.",
      "89% attainment against a $1M quota via cold outreach, LinkedIn, and presence at RSA, Black Hat, and DEF CON.",
    ],
  },
] as const;

export const education = [
  "Western Governors University — B.S., Business Management (Information Technology)",
  "Amarillo College — Business Administration and Management",
] as const;
