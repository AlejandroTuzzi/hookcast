import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/hookcast-horizontal.png";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="HookCast home">
        <Image src={logo} alt="HookCast" priority />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="#work">Work</Link>
        <Link href="#process">Process</Link>
        <Link href="/insights">Insights</Link>
        <Link className="nav-cta" href="#contact">Start a project</Link>
      </nav>
    </header>
  );
}
