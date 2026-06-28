import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "@/public/brand/hookcast-horizontal.png";
import { setupAction } from "../actions";
import { AdminForm } from "@/components/admin/admin-form";
import { hasAdmin } from "@/lib/admin-auth";

export default async function SetupPage() {
  if (await hasAdmin()) redirect("/admin/login");
  const production = process.env.NODE_ENV === "production";

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Image className="admin-logo" src={logo} alt="HookCast" priority />
        <p className="admin-kicker">Private studio</p>
        <h1>Create the administrator</h1>
        <p className="auth-copy">This setup page disappears as soon as the administrator is created.</p>
        <AdminForm action={setupAction} submitLabel="Create administrator">
          {production ? <label>Production setup token<input type="password" name="setupToken" required autoComplete="off" /></label> : null}
          <label>Password<input type="password" name="password" required minLength={12} autoComplete="new-password" /></label>
          <label>Confirm password<input type="password" name="confirmation" required minLength={12} autoComplete="new-password" /></label>
        </AdminForm>
      </section>
    </main>
  );
}
