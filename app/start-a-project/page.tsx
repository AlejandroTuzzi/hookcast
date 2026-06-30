import type { Metadata } from "next";
import { ProjectForm } from "@/components/project-form";
import { ProjectVideo } from "@/components/project-video";
import { SiteHeader } from "@/components/site-header";
import { getSiteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell HookCast about your product, audience and paid social creative needs.",
};

export default async function StartProjectPage() {
  const { project } = await getSiteConfig();
  return (
    <main className="project-page">
      <SiteHeader />
      <section className="project-intro">
        <p className="eyebrow"><span /> Start a project</p>
        <h1>Give us the product.<br /><em>We&apos;ll find the performance.</em></h1>
        <p>Share what you&apos;re selling and what you&apos;ve tried. Alejandro will review the brief personally.</p>
      </section>
      <section className="project-builder">
        <div className="project-form-wrap"><ProjectForm /></div>
        <aside className="project-video-wrap">
          <ProjectVideo source={project.video} />
          <div className="project-video-caption"><span>Directed by HookCast</span><strong>Human detail.<br />Synthetic scale.</strong></div>
        </aside>
      </section>
      <footer className="project-footer">
        <span>Prefer email?</span>
        <a href="mailto:alejandro@hookcast.studio">alejandro@hookcast.studio</a>
      </footer>
    </main>
  );
}
