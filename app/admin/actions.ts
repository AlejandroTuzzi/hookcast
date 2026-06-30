"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  changePassword,
  createAdmin,
  createSession,
  destroySession,
  hasAdmin,
  isAuthenticated,
  verifyPassword,
} from "@/lib/admin-auth";
import { saveSiteConfig, type SiteConfig, type VideoProvider } from "@/lib/site-config";
import {
  addWorkItem,
  deleteWorkItem,
  getYouTubeId,
  isValidLocalVideoSource,
  moveWorkItem,
  type WorkOrientation,
  type WorkProvider,
} from "@/lib/work";

export type FormState = { status: "idle" | "success" | "error"; message: string };

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function validPassword(password: string) {
  return password.length >= 12;
}

export async function setupAction(_: FormState, formData: FormData): Promise<FormState> {
  if (await hasAdmin()) redirect("/admin/login");

  const password = text(formData, "password");
  const confirmation = text(formData, "confirmation");
  const setupToken = text(formData, "setupToken");

  if (process.env.NODE_ENV === "production") {
    const expected = process.env.ADMIN_SETUP_TOKEN;
    if (!expected || setupToken !== expected) {
      return { status: "error", message: "The production setup token is incorrect." };
    }
  }
  if (!validPassword(password)) {
    return { status: "error", message: "Use at least 12 characters for the password." };
  }
  if (password !== confirmation) {
    return { status: "error", message: "The passwords do not match." };
  }

  try {
    await createAdmin(password);
    await createSession();
  } catch {
    return { status: "error", message: "The administrator could not be created." };
  }
  redirect("/admin/dashboard");
}

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const password = text(formData, "password");
  if (!(await verifyPassword(password))) {
    return { status: "error", message: "Incorrect password." };
  }
  await createSession();
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function provider(value: string): VideoProvider {
  return value === "mux" ? "mux" : "file";
}

function isValidSource(sourceProvider: VideoProvider, value: string) {
  if (!value) return true;
  if (sourceProvider === "mux") return /^[a-zA-Z0-9_-]+$/.test(value);
  try {
    const url = new URL(value, "http://localhost");
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return value.startsWith("/");
  }
}

export async function saveHeroAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAuthenticated())) return { status: "error", message: "Your session expired. Sign in again." };

  const desktopProvider = provider(text(formData, "desktopProvider"));
  const mobileProvider = provider(text(formData, "mobileProvider"));
  const desktopValue = text(formData, "desktopValue");
  const mobileValue = text(formData, "mobileValue");
  const mobileMode = text(formData, "mobileMode") === "separate" ? "separate" : "same";

  if (!isValidSource(desktopProvider, desktopValue)) {
    return { status: "error", message: "The desktop video URL or Mux playback ID is invalid." };
  }
  if (mobileMode === "separate" && !mobileValue) {
    return { status: "error", message: "Add a vertical video or choose the same video for both screens." };
  }
  if (!isValidSource(mobileProvider, mobileValue)) {
    return { status: "error", message: "The mobile video URL or Mux playback ID is invalid." };
  }

  const config: SiteConfig = {
    hero: {
      mobileMode,
      desktop: {
        provider: desktopProvider,
        value: desktopValue,
        poster: text(formData, "desktopPoster"),
      },
      mobile: {
        provider: mobileProvider,
        value: mobileValue,
        poster: text(formData, "mobilePoster"),
      },
    },
  };

  try {
    await saveSiteConfig(config);
    revalidatePath("/");
    return { status: "success", message: "Hero video settings saved." };
  } catch {
    return { status: "error", message: "Settings could not be written to storage." };
  }
}

export async function changePasswordAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAuthenticated())) return { status: "error", message: "Your session expired. Sign in again." };
  const current = text(formData, "currentPassword");
  const next = text(formData, "newPassword");
  const confirmation = text(formData, "newPasswordConfirmation");

  if (!validPassword(next)) return { status: "error", message: "Use at least 12 characters for the new password." };
  if (next !== confirmation) return { status: "error", message: "The new passwords do not match." };
  if (!(await changePassword(current, next))) return { status: "error", message: "The current password is incorrect." };

  await createSession();
  return { status: "success", message: "Password changed. Other sessions have been closed." };
}

export async function addWorkAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAuthenticated())) return { status: "error", message: "Your session expired. Sign in again." };

  const workProvider: WorkProvider = text(formData, "provider") === "youtube" ? "youtube" : "local";
  const orientation: WorkOrientation = text(formData, "orientation") === "vertical" ? "vertical" : "horizontal";
  const source = text(formData, "source");
  const title = text(formData, "title");
  const description = text(formData, "description");

  if (!title || title.length > 120) {
    return { status: "error", message: "Add a title of no more than 120 characters." };
  }
  if (description.length > 500) {
    return { status: "error", message: "Keep the description under 500 characters." };
  }
  if (workProvider === "youtube" && !getYouTubeId(source)) {
    return { status: "error", message: "Add a valid YouTube, Shorts or youtu.be link." };
  }
  if (workProvider === "local" && !isValidLocalVideoSource(source)) {
    return { status: "error", message: "Use a /media/ path or a valid HTTP video URL." };
  }

  try {
    await addWorkItem({ provider: workProvider, orientation, source, title, description });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { status: "success", message: "Video added to Selected Work." };
  } catch {
    return { status: "error", message: "The video could not be saved." };
  }
}

export async function deleteWorkAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  await deleteWorkItem(text(formData, "id"));
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function moveWorkAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const direction = text(formData, "direction") === "up" ? "up" : "down";
  await moveWorkItem(text(formData, "id"), direction);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}
