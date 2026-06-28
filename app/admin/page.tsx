import { redirect } from "next/navigation";
import { hasAdmin, isAuthenticated } from "@/lib/admin-auth";

export default async function AdminIndex() {
  if (!(await hasAdmin())) redirect("/admin/setup");
  redirect((await isAuthenticated()) ? "/admin/dashboard" : "/admin/login");
}
