import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "@/public/brand/hookcast-horizontal.png";
import { AdminForm } from "@/components/admin/admin-form";
import { hasAdmin, isAuthenticated } from "@/lib/admin-auth";
import { loginAction } from "../actions";

export default async function LoginPage() {
  if (!(await hasAdmin())) redirect("/admin/setup");
  if (await isAuthenticated()) redirect("/admin/dashboard");

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Image className="admin-logo" src={logo} alt="HookCast" priority />
        <p className="admin-kicker">Private studio</p>
        <h1>Welcome back.</h1>
        <p className="auth-copy">Sign in to direct what appears on HookCast.</p>
        <AdminForm action={loginAction} submitLabel="Enter studio">
          <label>Password<input type="password" name="password" required autoComplete="current-password" autoFocus /></label>
        </AdminForm>
      </section>
    </main>
  );
}
