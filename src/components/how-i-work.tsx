import { gtmTools, method } from "@/lib/data";

export function HowIWork() {
  return (
    <section id="method" className="section border-b border-[var(--rule)]">
      <div className="wrap">
        <p className="kicker">How I work</p>
        <h2 className="font-heading mt-3 max-w-[16ch] text-3xl tracking-tight sm:text-5xl">
          Operator voice. Stack that ships.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Rockwall Partners is the AI operating partner: I sit in the motion,
          wire the system, and stay close to cost. The tools are ordinary. The
          judgment is from a decade of carrying quota.
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[var(--rule)] lg:grid-cols-3">
          {method.map((item, index) => (
            <li key={item.title} className="bg-background p-7 sm:p-8">
              <span className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--brass)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-4 text-2xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Automation
            </dt>
            <dd className="mt-2 text-sm">{gtmTools.join(" · ")}</dd>
          </div>
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Model ops
            </dt>
            <dd className="mt-2 text-sm">
              OpenRouter · open-source routing · self-hosted LLMs
            </dd>
          </div>
          <div>
            <dt className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Motion
            </dt>
            <dd className="mt-2 text-sm">
              Agents / bots · Outreach.io · Salesforce · GTM sequencing
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
