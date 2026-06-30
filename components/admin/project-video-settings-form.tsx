"use client";

import { saveProjectVideoAction } from "@/app/admin/actions";
import type { SiteConfig } from "@/lib/site-config";
import { AdminForm } from "./admin-form";

export function ProjectVideoSettingsForm({ video }: { video: SiteConfig["project"]["video"] }) {
  return (
    <AdminForm action={saveProjectVideoAction} submitLabel="Save project page video">
      <div className="admin-intro">
        <div><span className="status-dot" /> Start a Project</div>
        <p>Use a vertical 9:16 video. It loops silently beside the project brief.</p>
      </div>
      <fieldset className="video-fieldset">
        <legend>Vertical page video</legend>
        <div className="admin-field-grid">
          <label>Video source
            <select name="projectProvider" defaultValue={video.provider}>
              <option value="file">Direct video URL</option><option value="mux">Mux playback ID</option>
            </select>
          </label>
          <label>URL or playback ID<input name="projectValue" defaultValue={video.value} placeholder="/media/project-reel.mp4" /></label>
        </div>
        <label>Poster image URL <small>Optional</small><input name="projectPoster" defaultValue={video.poster} placeholder="https://…" /></label>
      </fieldset>
    </AdminForm>
  );
}
