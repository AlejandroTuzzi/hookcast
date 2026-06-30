import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "@/public/brand/hookcast-horizontal.png";
import { AdminForm } from "@/components/admin/admin-form";
import { VideoSettingsForm } from "@/components/admin/video-settings-form";
import { WorkManager } from "@/components/admin/work-manager";
import { getSiteConfig } from "@/lib/site-config";
import { isAuthenticated } from "@/lib/admin-auth";
import { getWorkItems } from "@/lib/work";
import { changePasswordAction, logoutAction } from "../actions";

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const [{ hero }, workItems] = await Promise.all([getSiteConfig(), getWorkItems()]);

  return (
    <main className="dashboard-shell">
      <aside className="admin-sidebar">
        <Image className="admin-logo" src={logo} alt="HookCast" priority />
        <nav aria-label="Admin navigation">
          <a className="active" href="#hero"><span>01</span> Homepage</a>
          <a href="#work"><span>02</span> Selected Work</a>
          <a href="#insights"><span>03</span> Insights <small>Soon</small></a>
          <a href="#security"><span>04</span> Security</a>
        </nav>
        <div className="sidebar-bottom">
          <Link href="/" target="_blank">View live site ↗</Link>
          <form action={logoutAction}><button type="submit">Sign out</button></form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div><p className="admin-kicker">HookCast control room</p><h1>Homepage</h1></div>
          <span className="admin-badge">Dark mode · Native</span>
        </header>

        <section className="admin-panel" id="hero">
          <div className="panel-heading"><span>01</span><div><h2>Hero video</h2><p>Control the opening frame on desktop and mobile.</p></div></div>
          <VideoSettingsForm hero={hero} />
        </section>

        <section className="admin-panel" id="work">
          <div className="panel-heading"><span>02</span><div><h2>Selected Work</h2><p>Add unlimited videos and control their order on the homepage.</p></div></div>
          <WorkManager items={workItems} />
        </section>

        <section className="admin-panel future-panel" id="insights">
          <div className="panel-heading"><span>03</span><div><h2>Insights publishing</h2><p>The content model is reserved for articles, news and SEO landing pages.</p></div></div>
          <div className="future-content"><strong>Editorial workspace</strong><p>Drafts, authors, topics, metadata and scheduled publishing will live here without changing the public architecture.</p><span>Prepared for phase two</span></div>
        </section>

        <section className="admin-panel" id="security">
          <div className="panel-heading"><span>04</span><div><h2>Security</h2><p>Changing the password closes every other admin session.</p></div></div>
          <AdminForm action={changePasswordAction} submitLabel="Change password">
            <label>Current password<input type="password" name="currentPassword" required autoComplete="current-password" /></label>
            <div className="admin-field-grid">
              <label>New password<input type="password" name="newPassword" minLength={12} required autoComplete="new-password" /></label>
              <label>Confirm new password<input type="password" name="newPasswordConfirmation" minLength={12} required autoComplete="new-password" /></label>
            </div>
          </AdminForm>
        </section>
      </div>
    </main>
  );
}
