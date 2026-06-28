"use client";

import { useState } from "react";
import { saveHeroAction } from "@/app/admin/actions";
import type { SiteConfig } from "@/lib/site-config";
import { AdminForm } from "./admin-form";

function VideoFields({
  prefix,
  label,
  source,
}: {
  prefix: "desktop" | "mobile";
  label: string;
  source: SiteConfig["hero"]["desktop"];
}) {
  return (
    <fieldset className="video-fieldset">
      <legend>{label}</legend>
      <div className="admin-field-grid">
        <label>
          Video source
          <select name={`${prefix}Provider`} defaultValue={source.provider}>
            <option value="file">Direct video URL</option>
            <option value="mux">Mux playback ID</option>
          </select>
        </label>
        <label>
          URL or playback ID
          <input name={`${prefix}Value`} defaultValue={source.value} placeholder="https://… or Mux ID" />
        </label>
      </div>
      <label>
        Poster image URL <small>Optional, shown while the video loads</small>
        <input name={`${prefix}Poster`} defaultValue={source.poster} placeholder="https://…" />
      </label>
    </fieldset>
  );
}

export function VideoSettingsForm({ hero }: { hero: SiteConfig["hero"] }) {
  const [mode, setMode] = useState(hero.mobileMode);

  return (
    <AdminForm action={saveHeroAction} submitLabel="Save video settings">
      <div className="admin-intro">
        <div><span className="status-dot" /> Live homepage</div>
        <p>Use a direct MP4/WebM URL now or a Mux playback ID when the video library is connected.</p>
      </div>
      <VideoFields prefix="desktop" label="Horizontal / desktop video" source={hero.desktop} />
      <fieldset className="video-fieldset">
        <legend>Mobile behavior</legend>
        <div className="radio-cards">
          <label className={mode === "same" ? "selected" : ""}>
            <input type="radio" name="mobileMode" value="same" checked={mode === "same"} onChange={() => setMode("same")} />
            <span><strong>Use the same video</strong><small>The horizontal asset is cropped to fill mobile.</small></span>
          </label>
          <label className={mode === "separate" ? "selected" : ""}>
            <input type="radio" name="mobileMode" value="separate" checked={mode === "separate"} onChange={() => setMode("separate")} />
            <span><strong>Use a vertical video</strong><small>Recommended for precise mobile composition.</small></span>
          </label>
        </div>
      </fieldset>
      <div className={mode === "separate" ? "mobile-fields" : "mobile-fields is-disabled"}>
        <VideoFields prefix="mobile" label="Vertical / mobile video" source={hero.mobile} />
      </div>
    </AdminForm>
  );
}
