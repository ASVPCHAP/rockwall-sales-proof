export const sources = {
  resume: "Anthony Chapman résumé (roles, quotas, ranking years, pipeline figures).",
  upwork: "Upwork portfolio case-study entries provided for this site.",
  coretrust2025:
    "CoreTrust report: Opportunities — Current Year — C/W by AE. Fiscal 2025 quarterly Closed/Won subtotals and Q4 YTD grand totals.",
  valcore:
    "Operating snapshot stated by Anthony Chapman for Valcore GPO (the public Valstone GPO): 20+ contracts, 33 members, still growing.",
  horizon3Press:
    "Horizon3 Series E press release, Aug 3, 2026: $250M at a $2B+ valuation, co-led by NightDragon and NEA; 7,000+ customers; 120% year-over-year ARR growth; Series D at a $650M valuation just over a year earlier.",
  craftThesis:
    "Craft Ventures, “Why we invested in Horizon3.ai” — Series C investor thesis for NodeZero / autonomous security.",
  fiveStar:
    "Anthony Chapman — 5 Star Nutrition, Regional Sales Manager (prior sales roles, 2018–2021): three locations opened (Sherman; Oklahoma; Cattle Mills, Texas); West Texas scaled to over $120,000 a month; around $690,000 in sales for the year. Motions: Facebook marketing, SEO, local outreach, heavy field work — not AI automation.",
} as const;

export const gtmTools = [
  "Outreach.io",
  "Salesforce",
  "Make.com",
  "Zapier",
  "n8n",
] as const;

export const proofMetrics = [
  {
    id: "pipeline160",
    value: "$160M+",
    label: "GTV pipeline in six months at Rampart",
    detail: "Head of BD, Jul 2026–present. IT, facilities, waste, food & beverage, and other indirect.",
    source: "resume" as const,
  },
  {
    id: "top1",
    value: "Top 1%",
    label: "of CoreTrust reps, company-wide",
    detail: "2023 and 2024. Ranking is from those years — not restated as a 2025 title.",
    source: "resume" as const,
  },
  {
    id: "quota23",
    value: "$23M",
    label: "quarterly GTV quota at CoreTrust",
    detail: "80%+ average attainment selling sourcing contracts into PE portfolios.",
    source: "resume" as const,
  },
  {
    id: "gtv15",
    value: "$1.5M",
    label: "monthly GTV from a zero GTM at Valstone",
    detail:
      "~30 new enterprise members per month. Public GPO: Valcore — 20+ contracts, 33 members, still growing.",
    source: "upwork" as const,
  },
  {
    id: "llm60",
    value: "~60%",
    label: "LLM token-cost reduction",
    detail: "OpenRouter / open-source routing vs. a single-provider setup. 10–20 analyses/day, 200,000+ SKUs.",
    source: "resume" as const,
  },
  {
    id: "cw81",
    value: "$81.1M",
    label: "2025 Closed/Won projected spend",
    detail: "92 C/W opportunities. YTD from the Q4 report footer: $81,101,018.60.",
    source: "coretrust2025" as const,
  },
  {
    id: "h389",
    value: "89%",
    label: "attainment vs a $1M quota at Horizon3.ai",
    detail: "One of the first sales hires. TOLA from scratch. RSA, Black Hat, DEF CON.",
    source: "resume" as const,
  },
  {
    id: "partners16",
    value: "16",
    label: "Rampart supplier partners",
    detail: "~$600B aggregate spend. Five-year partnership: exclusivity, revenue share, client ownership.",
    source: "resume" as const,
  },
] as const;

export const resumeLedger = [
  {
    org: "Rampart",
    role: "Head of BD · Jul 2026–present",
    stats: [
      { value: "$160M+", label: "GTV pipeline, six months" },
      { value: "16", label: "supplier partners" },
      { value: "~$600B", label: "aggregate partner spend" },
      { value: "5-yr", label: "partnership (excl. / rev share)" },
      { value: "~60%", label: "LLM token-cost cut" },
    ],
  },
  {
    org: "Rockwall Partners",
    role: "Founder / AI Operator · Feb 2025–present",
    stats: [
      { value: "n8n / Make / Zapier", label: "SMB automation installs" },
      { value: "OpenRouter", label: "model-cost management" },
    ],
  },
  {
    org: "Valstone / Valcore",
    role: "Head of Group Purchasing / BD · Dec 2025–Jul 2026",
    stats: [
      { value: "$1.5M", label: "monthly GTV from zero" },
      { value: "~30", label: "new members / month" },
      { value: "1,800+", label: "accounts · $92M spend mapped" },
      { value: "40% / 18%", label: "max / avg supplier savings" },
      { value: "20+", label: "Valcore contracts" },
      { value: "33", label: "Valcore members, still growing" },
    ],
  },
  {
    org: "CoreTrust",
    role: "Sr AE, Private Equity · Aug 2023–Dec 2025",
    stats: [
      { value: "$23M", label: "quarterly GTV quota" },
      { value: "80%+", label: "average attainment" },
      { value: "Top 1%", label: "reps, 2023 and 2024" },
      { value: "$81.1M", label: "2025 C/W projected spend" },
    ],
  },
  {
    org: "Horizon3.ai",
    role: "Sr AE / New Business · Jan 2022–Sep 2023",
    stats: [
      { value: "89%", label: "vs $1M quota" },
      { value: "TOLA", label: "territory from scratch" },
      { value: "$250M", label: "company Series E, Aug 2026" },
      { value: "$2B+", label: "company valuation (press)" },
    ],
  },
  {
    org: "Earlier",
    role: "5 Star Nutrition · Ashley Furniture · Health IQ · 2018–2021",
    stats: [
      { value: "3", label: "5 Star locations opened" },
      { value: "$120k+", label: "5 Star West Texas / month" },
      { value: "~$690k", label: "5 Star year in sales" },
      { value: "2× $1M", label: "writer at Ashley Furniture" },
      { value: "93%", label: "quota at Health IQ" },
      { value: "100+", label: "accounts / day at Health IQ" },
    ],
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

export const valcoreOffsite = {
  image: "/photos/valcore-montreal-curling.jpg",
  width: 1281,
  height: 912,
  alt: "Valstone/Valcore team at Royal Montreal Curling Club: operators and Valstone colleagues on the ice with curling stones and brooms, club crest (founded 1807) in the foreground.",
  kicker: "Valstone DBA Valcore · Montreal",
  title: "Operators and Valstone, on the ice",
  body: "We brought operators and the Valstone team together in Montreal to review last year’s results and kick off the year ahead — then a friendly competition (questionable technique included) at the Royal Montreal Curling Club, founded 1807.",
} as const;

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
      "A specialty pharmacy expanding from 7 to 50 states — and from 11 toward 150 field reps — needed to train, certify, and equip the force without operations collapsing. I designed and built AgeriteCRM: onboarding, certification tracking, and day-to-day sales tooling, with automated workflows in n8n, Make.com, and Zapier for email outreach, prospecting, and real-time FDA updates so reps sell inside compliance.",
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
  {
    slug: "horizon3-tola",
    kicker: "Cybersecurity · Series C GTM",
    title: "Horizon3.ai — early sales hire, TOLA from zero",
    href: "#horizon3",
    hrefLabel: "Horizon3 chapter",
    summary:
      "Senior Account Executive / New Business Development, Jan 2022–Sep 2023. One of the first sales hires at a Series C cybersecurity company selling NodeZero. I played a foundational role building the TOLA region, established go-to-market strategy, automated GTM in Outreach.io, Salesforce, Make.com, Zapier, and n8n, and built VAR / MSSP partnerships — 89% attainment against a $1M quota. Early-team equity, still held. Not a co-founder.",
    results: [
      "89% attainment against a $1M quota",
      "TOLA from scratch; GTM strategy; VAR / MSSP partnerships",
      "GTM automation: Outreach.io, Salesforce, Make.com, Zapier, n8n",
      "RSA, Black Hat, and DEF CON",
      "Early-team shares still held — remains invested in the company’s success",
    ],
    tags: [
      "New business",
      "Cybersecurity",
      "NodeZero",
      "Outreach.io",
      "Salesforce",
      "Make.com",
      "Zapier",
      "n8n",
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
    body: "Outreach.io, Salesforce, Make.com, Zapier, and n8n for the pipes. CRM, inbox, enrichment, and follow-up sequenced so the next right account is in front of you. I have carried $23M quarterly quotas. I do not build busywork bots.",
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
    stats: [
      { value: "$160M+", label: "GTV pipeline, six months" },
      { value: "16", label: "partners · ~$600B spend" },
      { value: "5-yr", label: "excl. / rev share / ownership" },
      { value: "~60%", label: "LLM token-cost cut" },
    ],
  },
  {
    org: "Rockwall Partners",
    role: "Founder / AI Operator",
    dates: "Feb 2025 — Present (concurrent) · Dallas–Fort Worth",
    points: [
      "AI operating-partner consultancy for owner-operated small and mid-size businesses — GTM, operations, and back-office systems.",
      "Client automations in n8n, Make.com, and Zapier, integrating field-service and back-office tools. GTM stack also includes Outreach.io and Salesforce.",
      "Hands-on OpenRouter customer for internal tooling and client-facing AI systems — model-cost management, not slideware.",
    ],
    stats: [
      { value: "n8n / Make / Zapier", label: "SMB automation installs" },
      { value: "OpenRouter", label: "model-cost management" },
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
    stats: [
      { value: "$1.5M", label: "monthly GTV from zero" },
      { value: "~30", label: "new members / month" },
      { value: "1,800+", label: "accounts · $92M spend" },
      { value: "40% / 18%", label: "max / avg savings" },
      { value: "20+ / 33", label: "Valcore contracts / members" },
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
    stats: [
      { value: "$23M", label: "quarterly GTV quota" },
      { value: "80%+", label: "average attainment" },
      { value: "Top 1%", label: "2023 and 2024" },
      { value: "$81.1M", label: "2025 C/W projected spend" },
    ],
  },
  {
    org: "Horizon3.ai",
    role: "Senior Account Executive / New Business Development",
    dates: "Jan 2022 — Sep 2023 · Dallas",
    href: "#horizon3",
    hrefLabel: "Horizon3 chapter",
    points: [
      "One of the first sales hires at a Series C cybersecurity company; evangelized NodeZero into a market of entrenched incumbents.",
      "Foundational TOLA build-out from scratch: GTM strategy, VAR / MSSP partnerships, and GTM automation in Outreach.io, Salesforce, Make.com, Zapier, and n8n.",
      "89% attainment against a $1M quota via cold outreach, LinkedIn, and presence at RSA, Black Hat, and DEF CON.",
      "Received shares as an early team member; still holds that equity and remains invested in the company’s success — not a co-founder.",
    ],
    stats: [
      { value: "89%", label: "vs $1M quota" },
      { value: "TOLA", label: "from scratch" },
      { value: "GTM", label: "Outreach.io · Salesforce · Make · Zapier · n8n" },
    ],
  },
  {
    org: "5 Star Nutrition",
    role: "Regional Sales Manager",
    dates: "2018 — 2021",
    href: "#foundations",
    hrefLabel: "Foundations chapter",
    points: [
      "Helped open three new locations: Sherman; Oklahoma; Cattle Mills, Texas.",
      "Scaled the West Texas region to over $120,000 a month. Finished the year with around $690,000 in sales.",
      "Facebook marketing, SEO, local outreach, and heavy field work — not AI automation.",
    ],
    stats: [
      { value: "3", label: "locations opened" },
      { value: "$120k+", label: "West Texas / month" },
      { value: "~$690k", label: "year in sales" },
    ],
  },
  {
    org: "Ashley Furniture · Health IQ",
    role: "Prior sales and account management",
    dates: "2018 — 2021",
    points: [
      "Full-cycle B2B and B2C across healthcare, insurance, retail, and commercial furnishings.",
      "Two-time $1M writer at Ashley Furniture HomeStores.",
      "93% quota attainment at Health IQ, prospecting 100+ accounts daily.",
    ],
    stats: [
      { value: "2× $1M", label: "Ashley Furniture" },
      { value: "93%", label: "Health IQ quota" },
      { value: "100+", label: "accounts / day" },
    ],
  },
] as const;

export const education = [
  "Western Governors University — B.S., Business Management (Information Technology)",
  "Amarillo College — Business Administration and Management",
] as const;

export const horizon3 = {
  kicker: "Horizon3.ai · Jan 2022 – Sep 2023",
  title: "Early sales hire. TOLA from zero. Still on the cap table.",
  lede: "Senior Account Executive / New Business Development — one of the first sales hires at a Series C cybersecurity company selling NodeZero. I was not a co-founder. I received shares as an early team member, still hold them, and remain invested in the company’s success.",
  contribution: [
    "Foundational role building out the TOLA region from scratch.",
    "Established go-to-market strategy and VAR / MSSP partnerships.",
    "Automated GTM in Outreach.io, Salesforce, Make.com, Zapier, and n8n.",
    "89% attainment against a $1M quota; RSA, Black Hat, and DEF CON.",
  ],
  bridge:
    "That was the groundwork I was hired to do. Since then the company has scaled NodeZero into the AI-native proactive security story in its own Series E — a trajectory I did not lead, and do not claim as a personal round.",
  today: [
    {
      value: "$250M",
      label: "Series E, Aug 3, 2026",
      detail: "Co-led by NightDragon and NEA. Company press.",
    },
    {
      value: "$2B+",
      label: "post-money valuation",
      detail: "Tripled from a $650M Series D valuation just over a year earlier.",
    },
    {
      value: "7,000+",
      label: "organizations",
      detail: "Company-reported in the Series E release, with 120% YoY ARR growth.",
    },
  ],
  links: [
    {
      href: "https://medium.com/craft-ventures/why-we-invested-in-horizon3-ai-8686e18d3613",
      label: "Craft Ventures — Why we invested in Horizon3.ai",
      detail: "Series C investor thesis for NodeZero / autonomous security, from the period I was on the team.",
    },
    {
      href: "https://horizon3.ai/news/press-release/horizon3-raises-250m-series-e-at-2b-valuation-to-lead-the-ai-vs-ai-cybersecurity-era/",
      label: "Horizon3 Series E press — Aug 3, 2026",
      detail: "$250M at a $2B+ valuation; 7,000+ customers; 120% ARR growth.",
    },
    {
      href: "https://techcrunch.com/2026/08/03/horizon3-hits-2-billion-valuation-with-250m-series-e-as-ai-threats-escalate/",
      label: "TechCrunch coverage of the Series E",
      detail: "Independent write-up of the same round. Figures on this page follow the company release.",
    },
  ],
  photo: {
    image: "/photos/horizon3-team.webp",
    width: 1100,
    height: 619,
    alt: "Horizon3.ai team photo.",
    kicker: "Team · Trust but verify",
    title: "The Horizon3.ai team",
    body: "Early sales hire on a Series C NodeZero team — not a co-founder. TOLA GTM was automated in Outreach.io, Salesforce, Make.com, Zapier, and n8n. Still holds early-team shares.",
  },
} as const;

export const fiveStarNutrition = {
  kicker: "Foundations · 5 Star Nutrition",
  title: "Regional sales before the enterprise book.",
  lede: "Regional Sales Manager at 5 Star Nutrition — listed under prior sales roles, 2018–2021. The motion was Facebook marketing, SEO, local outreach, and heavy field work. Not AI automation.",
  thesis:
    "This is where the seller DNA was built: connecting with anyone, getting past gatekeepers, and getting energy and operations in motion to scale go-to-market. That same motion later shows up in enterprise PE, cybersecurity, and Rockwall.",
  contribution: [
    "Helped open three new locations: Sherman; Oklahoma; Cattle Mills, Texas.",
    "Scaled the West Texas region to over $120,000 a month.",
    "Finished the year with around $690,000 in sales.",
  ],
  motions: [
    "Facebook marketing",
    "SEO",
    "Local outreach",
    "Heavy field work",
  ],
  stats: [
    {
      value: "3",
      label: "new locations opened",
      detail: "Sherman; Oklahoma; Cattle Mills, Texas.",
    },
    {
      value: "$120k+",
      label: "West Texas / month",
      detail: "Region scaled to over $120,000 a month.",
    },
    {
      value: "~$690k",
      label: "year in sales",
      detail: "Finished the year with around $690,000 in sales.",
    },
  ],
  photo: {
    image: null,
    width: 1600,
    height: 900,
    alt: "5 Star Nutrition photo forthcoming.",
    kicker: "Field · West Texas",
    title: "Photo forthcoming",
    body: "Store and field photos will sit here. No stock imagery, no invented storefronts.",
  },
} as const;
