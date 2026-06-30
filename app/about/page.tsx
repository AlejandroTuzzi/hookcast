import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import portrait from "@/public/brand/alejandro-tuzzi.jpg";

export const metadata: Metadata = {
  title: "About Alejandro Tuzzi",
  description: "Meet Alejandro Tuzzi, the filmmaker and creative technologist behind HookCast Studio.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />
      <section className="about-hero">
        <div className="about-copy">
          <p className="eyebrow"><span /> The human behind the avatars</p>
          <h1>I&apos;m Alejandro.<br /><em>I direct what AI misses.</em></h1>
          <p className="about-lead">
            I&apos;m a filmmaker and creative technologist with more than 15 years in short-form video,
            digital animation and VFX. HookCast is where that craft meets generative AI—and where
            synthetic performance gets treated like real performance.
          </p>
          <div className="about-links">
            <Link className="button button-primary" href="/start-a-project">Work with me <span>↗</span></Link>
            <a href="https://tuzzi.ai" target="_blank" rel="noreferrer">Explore tuzzi.ai ↗</a>
          </div>
        </div>
        <figure className="about-portrait">
          <Image src={portrait} alt="Alejandro Tuzzi, founder and creative director of HookCast" priority sizes="(max-width: 800px) 100vw, 48vw" />
          <figcaption><span>Founder / Creative Director</span><strong>Alejandro Tuzzi</strong></figcaption>
        </figure>
      </section>
      <section className="about-statement">
        <p className="section-label">My point of view</p>
        <blockquote>Technology can generate a face.<br /><em>Direction makes you believe it.</em></blockquote>
        <div>
          <p>
            My work has always lived between art, storytelling and new tools—from animation and
            visual effects to fully generative productions for brands in Argentina and Spain.
          </p>
          <p>
            I built HookCast around a simple conviction: realism is not resolution. It&apos;s timing,
            restraint, asymmetry and all the tiny choices that make a person feel present.
          </p>
        </div>
      </section>
    </main>
  );
}
