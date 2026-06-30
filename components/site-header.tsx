"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/public/brand/hookcast-horizontal.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${open ? "menu-open" : ""}`}>
      <Link className="brand" href="/" aria-label="HookCast home">
        <Image src={logo} alt="HookCast" priority />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span />
      </button>
      <nav aria-label="Main navigation">
        <Link href="/#work" onClick={() => setOpen(false)}>Work</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About me</Link>
        <Link href="/insights" onClick={() => setOpen(false)}>Insights</Link>
        <Link className="nav-cta" href="/start-a-project" onClick={() => setOpen(false)}>Start a project</Link>
      </nav>
    </header>
  );
}
