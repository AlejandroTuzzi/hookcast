"use client";

import MuxPlayer from "@mux/mux-player-react";
import type { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import { useEffect, useRef, useState, type Ref } from "react";
import type { VideoSource } from "@/lib/site-config";

export function ProjectVideo({ source }: { source: VideoSource }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement | MuxPlayerRefAttributes>(null);
  const attemptedRef = useRef(false);
  const [playBlocked, setPlayBlocked] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !source.value) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || attemptedRef.current || !mediaRef.current) return;
      attemptedRef.current = true;
      mediaRef.current.muted = false;
      mediaRef.current.currentTime = 0;
      void mediaRef.current.play().catch(() => setPlayBlocked(true));
    }, { threshold: 0.35 });

    observer.observe(stage);
    return () => observer.disconnect();
  }, [source.value]);

  const playWithSound = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.muted = false;
    void media.play().then(() => setPlayBlocked(false)).catch(() => setPlayBlocked(true));
  };

  if (!source.value) {
    return (
      <div className="project-video-placeholder">
        <span>9:16</span>
        <p>Your next ad<br />starts here.</p>
      </div>
    );
  }

  return (
    <div className="project-video-stage" ref={stageRef}>
      {source.provider === "mux" ? (
      <MuxPlayer
        ref={mediaRef as Ref<MuxPlayerRefAttributes>}
        className="project-video-player"
        playbackId={source.value}
        poster={source.poster || undefined}
        playsInline
        preload="metadata"
        nohotkeys
      />
      ) : (
        <video
          ref={mediaRef as Ref<HTMLVideoElement>}
          className="project-video-player"
          src={source.value}
          poster={source.poster || undefined}
          controls
          playsInline
          preload="metadata"
          aria-label="HookCast project reel"
        />
      )}
      {playBlocked ? (
        <button className="project-video-play" type="button" onClick={playWithSound}>
          <span>▶</span> Play with sound
        </button>
      ) : null}
    </div>
  );
}
