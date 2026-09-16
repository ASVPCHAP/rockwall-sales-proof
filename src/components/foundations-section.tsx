import Image from "next/image";

import { fiveStarNutrition, sources } from "@/lib/data";

export function FoundationsSection() {
  return (
    <section id="foundations" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <p className="kicker">{fiveStarNutrition.kicker}</p>
        <h2 className="font-heading mt-3 max-w-[22ch] text-3xl tracking-tight sm:text-5xl">
          {fiveStarNutrition.title}
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {fiveStarNutrition.lede}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/90 sm:text-base">
          {fiveStarNutrition.thesis}
        </p>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {fiveStarNutrition.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-[var(--rule)] p-5"
            >
              <dt className="font-heading text-4xl tracking-tight">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm">{stat.label}</dd>
              <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {stat.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {fiveStarNutrition.reconciliation}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {fiveStarNutrition.overlayStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-[var(--rule)] p-4"
            >
              <dt className="font-heading text-2xl tracking-tight">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {fiveStarNutrition.gallery.map((shot) => (
            <figure
              key={shot.id}
              className="overflow-hidden rounded-sm border border-[var(--rule)] bg-card"
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="h-auto w-full bg-[#111]"
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
              <figcaption className="p-5">
                <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                  Overlay
                </p>
                <h3 className="mt-2 font-heading text-xl tracking-tight">
                  {shot.kicker}
                </h3>
                <ul className="mt-3 space-y-2">
                  {shot.stats.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-[var(--brass)] pl-3 text-sm leading-snug"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fiveStarNutrition.extraProof.map((card) => (
            <div
              key={card.label}
              className="rounded-sm border border-[var(--rule)] p-5"
            >
              <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                {card.kicker}
              </p>
              <p className="font-heading mt-3 text-3xl tracking-tight">
                {card.value}
              </p>
              <p className="mt-2 text-sm">{card.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {card.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              What I actually did
            </p>
            <ul className="mt-4 space-y-3">
              {fiveStarNutrition.contribution.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[var(--brass)] pl-3 text-sm leading-snug sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] text-[var(--brass)] uppercase">
              The motion — not AI
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {fiveStarNutrition.motions.map((motion) => (
                <li
                  key={motion}
                  className="rounded-sm border border-[var(--rule)] px-3 py-2.5 text-sm"
                >
                  {motion}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {sources.fiveStar}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
