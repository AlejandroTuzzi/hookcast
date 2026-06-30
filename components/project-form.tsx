"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitProjectAction, type ProjectFormState } from "@/app/start-a-project/actions";

const initialState: ProjectFormState = { status: "idle", message: "" };

export function ProjectForm() {
  const [state, action, pending] = useActionState(submitProjectAction, initialState);
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div className="project-success" role="status">
        <span>Received</span>
        <h2>It&apos;s in<br />the studio.</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="project-form" action={action}>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />
      <label className="honey-field" aria-hidden="true">Fax<input name="fax" tabIndex={-1} autoComplete="off" /></label>
      <div className="project-field-row">
        <label>Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="Jane Smith" /></label>
        <label>Work email<input type="email" name="email" required maxLength={180} autoComplete="email" placeholder="jane@brand.com" /></label>
      </div>
      <div className="project-field-row">
        <label>Brand / company<input name="brand" required maxLength={120} autoComplete="organization" placeholder="Your brand" /></label>
        <label>Website <small>Optional</small><input name="website" maxLength={250} inputMode="url" placeholder="https://" /></label>
      </div>
      <div className="project-field-row">
        <label>Test budget
          <select name="budget" defaultValue="$2k–$5k">
            <option>Under $2k</option><option>$2k–$5k</option><option>$5k–$10k</option><option>$10k+</option><option>Not sure yet</option>
          </select>
        </label>
        <label>Ideal timeline
          <select name="timeline" defaultValue="2–4 weeks">
            <option>ASAP</option><option>2–4 weeks</option><option>1–2 months</option><option>Just exploring</option>
          </select>
        </label>
      </div>
      <label>Tell me about the product and the ads you need
        <textarea name="message" required minLength={20} maxLength={3000} rows={7} placeholder="Product, audience, channels, current creative and what you want to test…" />
      </label>
      {state.message ? <p className="project-form-message error" role="alert">{state.message}</p> : null}
      <div className="project-submit-row">
        <button className="button button-primary" type="submit" disabled={pending}>{pending ? "Sending…" : "Send project brief"}<span>↗</span></button>
        <p>No pitch deck required.<br />A rough brief is enough.</p>
      </div>
    </form>
  );
}
