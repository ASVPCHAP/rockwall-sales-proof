import { About } from "@/components/about";
import { CaseStudies } from "@/components/case-studies";
import { Contact } from "@/components/contact";
import { CoreTrustProof } from "@/components/coretrust-proof";
import { Hero } from "@/components/hero";
import { HowIWork } from "@/components/how-i-work";
import { ProofStrip } from "@/components/proof-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofStrip />
        <CoreTrustProof />
        <CaseStudies />
        <HowIWork />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
