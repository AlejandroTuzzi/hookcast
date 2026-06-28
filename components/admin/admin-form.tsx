"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";

const initialFormState: FormState = { status: "idle", message: "" };

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

export function AdminForm({
  action,
  children,
  submitLabel,
  className = "admin-form",
}: {
  action: Action;
  children: React.ReactNode;
  submitLabel: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialFormState);

  return (
    <form action={formAction} className={className}>
      {children}
      {state.message ? <p className={`form-message ${state.status}`} role="status">{state.message}</p> : null}
      <button className="admin-button" type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
