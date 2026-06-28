import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Insights",
  description: "Field notes on hyperreal AI UGC, creative testing and paid social performance.",
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <main className="insights-empty">
      <SiteHeader />
      <div>
        <p className="section-label">HookCast field notes</p>
        <h1>Insights are<br /><em>in production.</em></h1>
        <p>Practical thinking on synthetic performance, creative direction and ads that earn attention.</p>
        <Link className="button button-primary" href="/">Back to the studio</Link>
      </div>
    </main>
  );
}
