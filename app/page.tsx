import Link from "next/link";
import { ResponsiveHeroVideo } from "@/components/responsive-hero-video";
import { SiteHeader } from "@/components/site-header";
import { SelectedWork } from "@/components/selected-work";
import { getSiteConfig } from "@/lib/site-config";
import { getWorkItems } from "@/lib/work";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ hero }, workItems] = await Promise.all([getSiteConfig(), getWorkItems()]);

  return (
    <main>
      <section className="hero">
        <SiteHeader />
        <ResponsiveHeroVideo hero={hero} />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Human-directed AI performance</p>
          <h1>AI ads that<br />don&apos;t look <em>AI.</em></h1>
          <p className="hero-subtitle">
            Hyperreal UGC avatars, handcrafted with every pause, blink and imperfection
            your audience expects from a real person.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/start-a-project">Start a project <span>↗</span></Link>
            <Link className="button button-ghost" href="#work"><span className="play">▶</span> Watch the work</Link>
          </div>
        </div>
        <p className="hero-note">Built for paid social · DTC · SaaS · Agencies</p>
      </section>

      <section className="manifesto" id="process">
        <p className="section-label">The HookCast difference</p>
        <h2>We put the human<br /><span>imperfections back in.</span></h2>
        <p>
          The stumbles. The asymmetric smile. The pause before the product claim.
          We direct every detail that fast AI generation edits out.
        </p>
      </section>

      <SelectedWork items={workItems} />

      <section className="contact" id="contact">
        <p className="section-label">Have a product to sell?</p>
        <h2>Let&apos;s make it<br /><em>feel real.</em></h2>
        <Link className="button button-primary" href="/start-a-project">Start a project <span>↗</span></Link>
        <a className="contact-email" href="mailto:alejandro@hookcast.studio">alejandro@hookcast.studio</a>
      </section>
    </main>
  );
}
