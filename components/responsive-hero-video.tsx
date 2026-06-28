"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import type { SiteConfig, VideoSource } from "@/lib/site-config";

type Props = { hero: SiteConfig["hero"] };

function Video({ source }: { source: VideoSource }) {
  if (!source.value) return <div className="hero-video-placeholder" aria-hidden="true" />;

  if (source.provider === "mux") {
    return (
      <MuxPlayer
        className="hero-video"
        playbackId={source.value}
        poster={source.poster || undefined}
        autoPlay="muted"
        muted
        loop
        playsInline
        preload="metadata"
        nohotkeys
      />
    );
  }

  return (
    <video
      className="hero-video"
      src={source.value}
      poster={source.poster || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="HookCast AI avatar ad showreel"
    />
  );
}

export function ResponsiveHeroVideo({ hero }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const source =
    isMobile && hero.mobileMode === "separate" ? hero.mobile : hero.desktop;

  return (
    <div className="hero-media" data-ready={isMobile !== null}>
      {isMobile === null ? (
        <div className="hero-video-placeholder" aria-hidden="true" />
      ) : (
        <Video source={source} />
      )}
    </div>
  );
}
