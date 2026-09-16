export const sources = {
  resume: "Anthony Chapman résumé (roles, quotas, ranking years, pipeline figures).",
  upwork: "Upwork portfolio case-study entries provided for this site.",
  coretrust2025:
    "CoreTrust report: Opportunities — Current Year — C/W by AE. Fiscal 2025 quarterly Closed/Won subtotals and Q4 YTD grand totals.",
  valcore:
    "Operating snapshot stated by Anthony Chapman for Valcore GPO (the public Valstone GPO): 20+ contracts, 33 members, still growing. HubSpot Closed/Won by category: 131 Opted-In (Approved) deals during his Valstone/Valcore tenure, tied to signed-member activity. Deal counts only — no GTV inferred from that chart.",
  horizon3Press:
    "Horizon3 Series E press release, Aug 3, 2026: $250M at a $2B+ valuation, co-led by NightDragon and NEA; 7,000+ customers; 120% year-over-year ARR growth; Series D at a $650M valuation just over a year earlier.",
  craftThesis:
    "Craft Ventures, “Why we invested in Horizon3.ai” — Series C investor thesis for NodeZero / autonomous security.",
  fiveStar:
    "Anthony Chapman — 5 Star Nutrition, Regional Sales Manager (prior sales 2018–2021), plus overlay text on his field photos: three locations (Sherman; Oklahoma; Cattle Mills, Texas); West Texas monthly run-rate $30k → $120k in six months; year finish around $690,000. WTAMU opener: 500+ products, gym/university prospecting, YOY 25–50%. Tornado Alley CrossFit: 2-year deal, 150+ members signed, +50 members grown. Anytime Fitness: 2-year partnership, one of the largest gym chains in TX. Grand Opening #3 (Sherman, TX): construction buildout, hiring/training, local outreach. Motions: Facebook, SEO, local outreach, field work — not AI.",
  rampart:
    "Anthony Chapman — Rampart Corporation framing: white-label GPO; 56 contracts and over $100 million in spend; also present in Canada; Rampart helped launch Valcore at Valstone; after Valstone, a 1099 advisor partnership for sales and supplier sourcing. Rockwall Partners (separate) helps Rampart with LLMs and recruitment-platform partnerships. Not ownership; not W-2 Head of BD.",
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
    id: "contracts56",
    value: "56",
    label: "contracts on the Rampart white-label GPO",
    detail:
      "Current Rampart scale, in his words. Advisor (1099) on sales and supplier sourcing — not a W-2 Head of BD title, not ownership.",
    source: "rampart" as const,
  },
  {
    id: "spend100",
    value: "$100M+",
    label: "spend on the Rampart book",
    detail: "Over $100 million in spend. Rampart is also present in Canada.",
    source: "rampart" as const,
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
      "~30 new enterprise members per month. Public GPO: Valcore — 20+ contracts, 33 members, still growing. Rampart helped launch Valcore.",
    source: "upwork" as const,
  },
  {
    id: "llm60",
    value: "~60%",
    label: "LLM token-cost reduction",
    detail:
      "Rockwall Partners × Rampart — OpenRouter / open-source routing vs. a single-provider setup. 10–20 analyses/day, 200,000+ SKUs. Distinct from the 1099 advisor seat.",
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
] as const;

export const resumeLedger = [
  {
    org: "Rampart",
    role: "Advisor (1099) · sales & supplier sourcing · Jul 2026–present",
    stats: [
      { value: "56", label: "contracts" },
      { value: "$100M+", label: "in spend" },
      { value: "Canada", label: "also present" },
    ],
  },
  {
    org: "Rockwall Partners",
    role: "Founder / AI Operator · Feb 2025–present",
    stats: [
      { value: "n8n / Make / Zapier", label: "SMB automation installs" },
      { value: "OpenRouter", label: "model-cost management" },
      { value: "LLMs", label: "Rampart analytics (Rockwall seat)" },
      { value: "Recruiting", label: "platform partnerships for Rampart" },
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
      { value: "131", label: "Closed/Won Opted-In deals (signed members)" },
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
      { value: "$30k→$120k", label: "5 Star monthly run-rate, 6 months" },
      { value: "~$690k", label: "5 Star year finish" },
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
    note: "Public face of the Valstone GPO. Rampart helped launch Valcore. 20+ contracts. 33 members. Still growing. 131 Closed/Won Opted-In deals (signed members) during tenure.",
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

export const valcoreClosedWon = {
  image: "/proof/valcore-closed-won-by-category.png",
  width: 1801,
  height: 1422,
  deals: 131,
  title: "Closed/Won opportunities by category",
  subtitle: "131 HubSpot deals in Opted-In (Approved)",
  alt: "HubSpot pie chart: Closed/Won opportunities by category for 131 Opted-In (Approved) deals during Anthony Chapman’s Valstone/Valcore tenure. Office Supplies 40 (30.5%), MRO 34 (26.0%), Packaging 29 (22.1%), Paint 9 (6.9%), Uniform Rental 9 (6.9%), Car Rental 7 (5.3%), Batteries 1 (0.8%), Small Parcels 1 (0.8%), Uncategorized 1 (0.8%).",
  note: "Closed/Won Opted-In deals from Anthony’s tenure at Valstone/Valcore, tied to signed-member activity. Counts are HubSpot deal volume — not GTV or spend.",
  categories: [
    { name: "Office Supplies", deals: 40, share: "30.5%" },
    { name: "MRO", deals: 34, share: "26.0%" },
    { name: "Packaging", deals: 29, share: "22.1%" },
    { name: "Paint", deals: 9, share: "6.9%" },
    { name: "Uniform Rental", deals: 9, share: "6.9%" },
    { name: "Car Rental", deals: 7, share: "5.3%" },
    { name: "Batteries", deals: 1, share: "0.8%" },
    { name: "Small Parcels", deals: 1, share: "0.8%" },
    { name: "Uncategorized", deals: 1, share: "0.8%" },
  ],
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
      "Under Valstone, I helped stand up an entire group purchasing organization in under a year — no existing GTM, pipeline, or contract book. Valcore is the public face of that GPO: group purchasing power for growing companies, from a spend file to GPO-negotiated pricing. It is the live member brand for the same from-zero motion that scaled to $1.5M monthly GTV. Rampart helped launch the Valcore initiative at Valstone; the white-label GPO lineage continues on the Rampart chapter.",
    results: [
      "20+ contracts",
      "33 members",
      "Still growing",
      "131 Closed/Won Opted-In deals (signed members)",
    ],
    tags: ["GPO", "B2B procurement", "Go-to-market", "Valstone", "Rampart"],
  },
  {
    slug: "rampart-gpo",
    kicker: "White-label GPO · advisor (1099)",
    title: "Rampart Corporation — 56 contracts, $100M+ spend",
    href: "#rampart",
    hrefLabel: "Rampart chapter",
    summary:
      "Rampart is building a new type of GPO: a white-label GPO, also present in Canada. After Valstone, we formed a partnership early for Rampart to take over sales and supplier sourcing. I serve as an advisor in that role (1099) — not an employee, and I do not claim to own Rampart. Rockwall Partners, separately, helps Rampart sharpen analytics through large language models and new partnerships with recruitment platforms.",
    results: [
      "56 contracts",
      "Over $100 million in spend",
      "Present in Canada",
      "Helped launch Valcore at Valstone",
    ],
    tags: [
      "White-label GPO",
      "Advisor (1099)",
      "Supplier sourcing",
      "Canada",
      "Valcore",
    ],
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
    kicker: "Rockwall × Rampart · LLM ops",
    title: "Cut LLM costs ~60% while analyzing 200,000+ SKUs daily",
    href: "#rampart",
    hrefLabel: "Rampart chapter",
    summary:
      "Through Rockwall Partners — not the 1099 advisor seat — I help Rampart sharpen analytical capabilities with large language models. The model layer behind high-volume analytics runs 10–20 analyses per day across 200,000+ SKUs. Traffic is routed through OpenRouter and related tools so open-source models are selected by cost and task fit. Rockwall also helps create new partnerships with recruitment platforms.",
    results: [
      "~60% reduction in token costs vs. a single-provider setup",
      "Sustained 10–20 runs/day on 200K+ SKUs without cost scaling linearly",
      "Hands-on OpenRouter deployment in production — not a slide-deck architecture",
      "Recruitment-platform partnerships for Rampart, distinct from the advisor role",
    ],
    tags: [
      "OpenRouter",
      "LLM routing",
      "Cost optimization",
      "Open-source models",
      "Rockwall Partners",
      "Rampart",
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
    role: "Advisor — sales & supplier sourcing (1099)",
    dates: "Jul 2026 — Present · Dallas",
    href: "#rampart",
    hrefLabel: "Rampart chapter",
    points: [
      "White-label GPO. After Valstone, a partnership for Rampart to take over sales and supplier sourcing. Advisor (1099) — not an employee, and not a claim of ownership.",
      "Current Rampart scale: 56 contracts and over $100 million in spend. Also present in Canada.",
      "Rampart helped launch the Valcore initiative at Valstone (valcoregpo.com).",
    ],
    stats: [
      { value: "56", label: "contracts" },
      { value: "$100M+", label: "in spend" },
      { value: "1099", label: "advisor, not W-2" },
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
      "Helps Rampart sharpen analytics through large language models and by creating new partnerships with recruitment platforms — distinct from the 1099 advisor seat.",
    ],
    stats: [
      { value: "n8n / Make / Zapier", label: "SMB automation installs" },
      { value: "OpenRouter", label: "model-cost management" },
      { value: "LLMs", label: "Rampart analytics" },
    ],
  },
  {
    org: "Valstone",
    role: "Head of Group Purchasing / Business Development",
    dates: "Dec 2025 — Jul 2026 · Dallas",
    points: [
      "Launched a B2B procurement platform from zero: GTM, pipeline, and contracts to $1.5M monthly GTV and ~30 new enterprise members per month.",
      "Helped stand up the public GPO — Valcore (valcoregpo.com) — in under a year: 20+ contracts, 33 members, still growing. Rampart helped launch that Valcore initiative. HubSpot Closed/Won during tenure: 131 Opted-In (Approved) deals tied to signed-member activity (deal counts, not GTV).",
      "Directed analysis of 1,800+ target accounts representing $92M in addressable spend.",
      "Negotiated supplier agreements delivering up to 40% savings and an 18% average across MRO, logistics, IT, and indirect.",
    ],
    stats: [
      { value: "$1.5M", label: "monthly GTV from zero" },
      { value: "~30", label: "new members / month" },
      { value: "1,800+", label: "accounts · $92M spend" },
      { value: "40% / 18%", label: "max / avg savings" },
      { value: "20+ / 33", label: "Valcore contracts / members" },
      { value: "131", label: "Closed/Won Opted-In (signed members)" },
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
      "Helped open three new locations: Sherman; Oklahoma; Cattle Mills, Texas. Grand Opening #3 (Sherman, TX): assisted full construction buildout, hiring/training of the team, and local outreach marketing.",
      "Grew the West Texas region from $30k to $120k monthly revenue in six months (run-rate). Finished the year around $690k — not a $120k×12 annualization.",
      "Field partnerships: WTAMU Women’s Basketball Opener (500+ products; gyms/universities; YOY 25–50%); Tornado Alley CrossFit (2-year deal, 150+ members signed, +50 grown); Anytime Fitness (2-year partnership, one of the largest gym chains in TX).",
      "Facebook marketing, SEO, local outreach, and heavy field work — not AI automation.",
    ],
    stats: [
      { value: "3", label: "locations opened" },
      { value: "$30k→$120k", label: "monthly run-rate, 6 months" },
      { value: "~$690k", label: "year finish" },
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
  reconciliation:
    "$30k → $120k in six months is West Texas monthly run-rate. Around $690k is the year finish — ramp, not $120k × 12.",
  contribution: [
    "Helped open three new locations: Sherman; Oklahoma; Cattle Mills, Texas.",
    "Grand Opening #3 (Sherman, TX): assisted full construction buildout, hiring/training of the team, and local outreach marketing.",
    "Regional Sales Manager, West Texas: grew the region from $30k to $120k monthly revenue in six months.",
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
      value: "$30k→$120k",
      label: "monthly run-rate in 6 months",
      detail: "West Texas region. Overlay: Regional Sales Manager.",
    },
    {
      value: "~$690k",
      label: "year finish",
      detail: "Around $690,000 in sales for the year — not the monthly peak annualized.",
    },
  ],
  extraProof: [
    {
      kicker: "Grand Opening #3 · Sherman, TX",
      value: "Buildout",
      label: "Construction, hiring, local outreach",
      detail:
        "Assisted full construction buildout, hiring/training of the team, and local outreach marketing. Overlay text from Anthony’s field set; photo not in this gallery.",
    },
    {
      kicker: "WTAMU opener overlay",
      value: "25–50%",
      label: "YOY growth",
      detail: "Grow YOY 25–50%, as written on the West Texas A&M Women’s Basketball Opener photo.",
    },
  ],
  overlayStats: [
    { value: "500+", label: "products sold at the WTAMU opener" },
    { value: "2yr", label: "Tornado Alley CrossFit deal" },
    { value: "150+", label: "members signed up" },
    { value: "50+", label: "members the gym grew" },
    { value: "2yr", label: "Anytime Fitness partnership" },
  ],
  gallery: [
    {
      id: "wtamu-opener",
      image: "/photos/fivestar-wtamu-opener.jpg",
      width: 1249,
      height: 1717,
      alt: "5 Star Nutrition table at the West Texas A&M Women’s Basketball Opener: Anthony Chapman with a mascot in buffalo horns. Overlay: sold over 500 supplement products; prospected gyms and universities for supplement services; YOY growth 25–50%.",
      kicker: "West Texas A&M Women’s Basketball Opener",
      stats: [
        "Sold over 500 supplement products at this event",
        "Prospect gyms, universities, etc. for supplement services",
        "Grow YOY 25–50%",
      ],
    },
    {
      id: "tornado-alley",
      image: "/photos/fivestar-tornado-alley.jpg",
      width: 1320,
      height: 1748,
      alt: "Group photo on the Tornado Alley CrossFit floor with Anthony Chapman in a blue 5 Star Nutrition polo. Overlay: secured a 2-year deal; over 150 members signed up; helped grow their business by 50+ members.",
      kicker: "Partnership w/ Tornado Alley CrossFit",
      stats: [
        "Secured a 2yr deal",
        "Over 150 members signed up",
        "Helped grow their business by 50+ members",
      ],
    },
    {
      id: "anytime-fitness",
      image: "/photos/fivestar-anytime-fitness.jpg",
      width: 1268,
      height: 2070,
      alt: "Anthony Chapman at a 5 Star Nutrition sampling table inside Anytime Fitness, with members at the booth. Overlay: secured a 2-year partnership with one of the largest gym chains in Texas.",
      kicker: "Partnership w/ Anytime Fitness",
      stats: [
        "Secured 2yr partnership with one of the largest gym chains in TX.",
      ],
    },
  ],
} as const;

export const rampart = {
  kicker: "Rampart Corporation · Advisor (1099)",
  title: "A white-label GPO. Sales and sourcing — not a W-2 seat.",
  lede: "Rampart Corporation is building a new type of GPO: a white-label GPO, also present in Canada. After Valstone, we formed a partnership early for Rampart to take over sales and supplier sourcing. I serve as an advisor in this role (1099). I do not claim to own Rampart.",
  lineage: [
    {
      org: "Valstone",
      note: "Head of Group Purchasing / BD, Dec 2025–Jul 2026. From-zero GTM to $1.5M monthly GTV.",
      href: "#work",
    },
    {
      org: "Valcore",
      note: "Public Valstone GPO. Rampart helped launch this initiative.",
      href: "https://valcoregpo.com/",
    },
    {
      org: "Rampart",
      note: "White-label GPO. Advisor, 1099. Sales and supplier sourcing. Present in Canada.",
      href: "#rampart",
    },
  ],
  stats: [
    {
      value: "56",
      label: "contracts",
      detail: "Current Rampart scale, in his words.",
    },
    {
      value: "$100M+",
      label: "in spend",
      detail: "Over $100 million in spend on the book.",
    },
    {
      value: "Canada",
      label: "also present",
      detail: "Operating / present in Canada. No office details beyond that.",
    },
  ],
  contribution: [
    "After Valstone ended, a partnership for Rampart to take over sales and supplier sourcing.",
    "Advisor (1099) — hands-on GTM and supplier work under that umbrella, not employment.",
    "Rampart helped launch the Valcore initiative at Valstone.",
  ],
  rockwall: {
    kicker: "Rockwall × Rampart — separate from the 1099 seat",
    title: "LLM analytics and recruitment-platform partnerships.",
    body: "Rockwall Partners helps Rampart sharpen analytical capabilities through large language models, and by creating new partnerships with recruitment platforms. That is AI operating-partner work — distinct from the 1099 advisor role.",
    stats: [
      { value: "~60%", label: "token-cost cut vs a single provider" },
      { value: "200k+", label: "SKUs · 10–20 analyses/day" },
    ],
  },
  resumeNote:
    "The résumé also listed a $160M+ GTV pipeline in six months, a 16-partner supplier network (~$600B aggregate spend), and a five-year supplier partnership covering exclusivity, revenue share, and client ownership. Those are partnership outcomes on sales and sourcing — not a restatement of W-2 Head of BD, and not a claim of owning Rampart. Primary Rampart proof on this page is 56 contracts and over $100 million in spend.",
} as const;
