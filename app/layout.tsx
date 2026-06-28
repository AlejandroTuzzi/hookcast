import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hookcast.studio"),
  title: { default: "HookCast Studio — Hyperreal AI UGC Ads", template: "%s | HookCast" },
  description:
    "Handcrafted UGC ads with hyperreal AI avatars, directed for paid performance.",
  openGraph: {
    title: "HookCast Studio — AI ads that don't look like AI ads",
    description: "Hyperreal AI UGC, handcrafted for paid performance.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
