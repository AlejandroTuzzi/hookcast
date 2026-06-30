"use server";

import { revalidatePath } from "next/cache";
import { addProjectLead } from "@/lib/leads";
import { notifyProjectLead } from "@/lib/lead-notification";

export type ProjectFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitProjectAction(_: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  const startedAt = Number(field(formData, "startedAt"));
  if (field(formData, "fax") || !startedAt || Date.now() - startedAt < 1500) {
    return { status: "success", message: "Thanks. Your project has been received." };
  }

  const name = field(formData, "name");
  const email = field(formData, "email").toLowerCase();
  const brand = field(formData, "brand");
  const website = field(formData, "website");
  const budget = field(formData, "budget");
  const timeline = field(formData, "timeline");
  const message = field(formData, "message");

  if (!name || name.length > 100 || !brand || brand.length > 120) {
    return { status: "error", message: "Please add your name and brand." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message || message.length < 20 || message.length > 3000) {
    return { status: "error", message: "Tell us a little more about the project (20–3,000 characters)." };
  }

  try {
    const lead = await addProjectLead({ name, email, brand, website, budget, timeline, message });
    revalidatePath("/admin/dashboard");
    try {
      await notifyProjectLead(lead);
    } catch (error) {
      console.error("Project notification could not be sent", error);
    }
    return { status: "success", message: "Thanks. Your project is in the studio. Alejandro will reply shortly." };
  } catch {
    return { status: "error", message: "We could not save your request. Please email alejandro@hookcast.studio." };
  }
}
