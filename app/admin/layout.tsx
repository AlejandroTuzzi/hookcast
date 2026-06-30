import type { Metadata } from "next";
import "./admin.css";

// Authentication and setup state live in persistent server storage and must be
// evaluated on every request, never captured during the production build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
