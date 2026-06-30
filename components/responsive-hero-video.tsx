"use client";

import MuxPlayer from "@mux/mux-player-react";
import type { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import { useEffect, useRef, useState, type Ref, type RefObject } from "react";
import type { SiteConfig, VideoSource } from "@/lib/site-config";

type Props = { hero: SiteConfig["hero"] };

function Video({
  source,
  muted,
  mediaRef,
}: {
  source: VideoSource;
  muted: boolean;
  mediaRef: RefObject<HTMLVideoElement | MuxPlayerRefAttributes | null>;
}) {
  if (!source.value) return <div className="hero-video-placeholder" aria-hidden="true" />;

  if (source.provider === "mux") {
    return (
      <MuxPlayer
        ref={mediaRef as Ref<MuxPlayerRefAttributes>}
        className="hero-video"
        playbackId={source.value}
        poster={source.poster || undefined}
        autoPlay={muted ? "muted" : true}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        nohotkeys
      />
    );
  }

  return (
    <video
      ref={mediaRef as Ref<HTMLVideoElement>}
      className="hero-video"
      src={source.value}
      poster={source.poster || undefined}
      autoPlay
      muted={muted}
      loop
      playsInline
      preload="metadata"
      aria-label="HookCast AI avatar ad showreel"
    />
  );
}

export function ResponsiveHeroVideo({ hero }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | MuxPlayerRefAttributes>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const source =
    isMobile && hero.mobileMode === "separate" ? hero.mobile : hero.desktop;

  const toggleAudio = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (soundOn) {
      media.muted = true;
      setSoundOn(false);
      return;
    }

    media.muted = false;
    media.volume = 1;
    void media.play()
      .then(() => setSoundOn(true))
      .catch(() => {
        media.muted = true;
        setSoundOn(false);
      });
  };

  return (
    <>
      <div className="hero-media" data-ready={isMobile !== null}>
        {isMobile === null ? (
          <div className="hero-video-placeholder" aria-hidden="true" />
        ) : (
          <Video source={source} muted={!soundOn} mediaRef={mediaRef} />
        )}
      </div>
      {isMobile !== null && source.value ? (
        <button
          className={`hero-audio-control ${soundOn ? "is-active" : ""}`}
          type="button"
          onClick={toggleAudio}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute hero video" : "Activate hero video audio"}
        >
          <span className="audio-bars" aria-hidden="true"><i /><i /><i /></span>
          <span>{soundOn ? "Mute audio" : "Activate audio"}</span>
        </button>
      ) : null}
    </>
  );
}
