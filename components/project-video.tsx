"use client";

import MuxPlayer from "@mux/mux-player-react";
import type { VideoSource } from "@/lib/site-config";

export function ProjectVideo({ source }: { source: VideoSource }) {
  if (!source.value) {
    return (
      <div className="project-video-placeholder">
        <span>9:16</span>
        <p>Your next ad<br />starts here.</p>
      </div>
    );
  }

  if (source.provider === "mux") {
    return (
      <MuxPlayer
        className="project-video-player"
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
      className="project-video-player"
      src={source.value}
      poster={source.poster || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="HookCast project reel"
    />
  );
}
