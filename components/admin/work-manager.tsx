"use client";

import { useState } from "react";
import { addWorkAction, deleteWorkAction, moveWorkAction } from "@/app/admin/actions";
import type { WorkItem, WorkProvider } from "@/lib/work";
import { AdminForm } from "./admin-form";

export function WorkManager({ items }: { items: WorkItem[] }) {
  const [provider, setProvider] = useState<WorkProvider>("youtube");

  return (
    <div className="work-manager">
      <AdminForm action={addWorkAction} submitLabel="Add video to Selected Work">
        <div className="admin-field-grid equal-columns">
          <label>
            Video source
            <select name="provider" value={provider} onChange={(event) => setProvider(event.target.value as WorkProvider)}>
              <option value="youtube">YouTube link</option>
              <option value="local">Local or direct video</option>
            </select>
          </label>
          <label>
            Format
            <select name="orientation" defaultValue="vertical">
              <option value="vertical">Vertical · 9:16</option>
              <option value="horizontal">Horizontal · 16:9</option>
            </select>
          </label>
        </div>
        <label>
          {provider === "youtube" ? "YouTube link" : "Local video URL"}
          <input
            name="source"
            required
            placeholder={provider === "youtube" ? "https://youtube.com/shorts/…" : "/media/campaign-name.mp4"}
          />
          <small>{provider === "local" ? "Files uploaded through SFTP are available under /media/." : "Regular videos, Shorts and youtu.be links are supported."}</small>
        </label>
        <label>
          Project title
          <input name="title" required maxLength={120} placeholder="A sharper hook for paid social" />
        </label>
        <label>
          Description
          <textarea name="description" maxLength={500} rows={4} placeholder="Avatar direction, creative angle and campaign context." />
        </label>
      </AdminForm>

      <div className="work-admin-list">
        <div className="work-list-heading">
          <strong>Homepage order</strong>
          <span>{items.length} {items.length === 1 ? "video" : "videos"}</span>
        </div>
        {items.length === 0 ? (
          <p className="work-empty">No work has been published yet.</p>
        ) : items.map((item, index) => (
          <article className="work-admin-item" key={item.id}>
            <span className={`work-format ${item.orientation}`}>{item.orientation === "vertical" ? "9:16" : "16:9"}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.provider === "youtube" ? "YouTube" : "Local video"} · {item.description || "No description"}</p>
            </div>
            <div className="work-item-actions">
              <form action={moveWorkAction}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="direction" value="up" />
                <button type="submit" disabled={index === 0} aria-label={`Move ${item.title} up`}>↑</button>
              </form>
              <form action={moveWorkAction}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="direction" value="down" />
                <button type="submit" disabled={index === items.length - 1} aria-label={`Move ${item.title} down`}>↓</button>
              </form>
              <form action={deleteWorkAction} onSubmit={(event) => { if (!window.confirm(`Remove “${item.title}” from Selected Work?`)) event.preventDefault(); }}>
                <input type="hidden" name="id" value={item.id} />
                <button className="delete" type="submit">Remove</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
