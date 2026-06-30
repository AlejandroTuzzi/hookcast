import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type WorkProvider = "youtube" | "local";
export type WorkOrientation = "vertical" | "horizontal";

export type WorkItem = {
  id: string;
  provider: WorkProvider;
  source: string;
  orientation: WorkOrientation;
  title: string;
  description: string;
  createdAt: string;
};

export type NewWorkItem = Omit<WorkItem, "id" | "createdAt">;

const dataDirectory = process.env.HOOKCAST_DATA_DIR ?? path.join(process.cwd(), "data");
const workPath = path.join(dataDirectory, "work.json");

export function getYouTubeId(source: string) {
  const trimmed = source.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    let candidate: string | null = null;
    if (host === "youtu.be") {
      candidate = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else {
      if (!["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) return null;
      if (url.pathname === "/watch") candidate = url.searchParams.get("v");
      if (!candidate) {
        const [kind, id] = url.pathname.split("/").filter(Boolean);
        candidate = ["embed", "shorts", "live"].includes(kind) ? id ?? null : null;
      }
    }
    return candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

export function isValidLocalVideoSource(source: string) {
  if (source.startsWith("/media/")) return true;
  try {
    const url = new URL(source);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function getWorkItems(): Promise<WorkItem[]> {
  try {
    const contents = await fs.readFile(workPath, "utf8");
    const parsed = JSON.parse(contents);
    return Array.isArray(parsed) ? (parsed as WorkItem[]) : [];
  } catch {
    return [];
  }
}

async function saveWorkItems(items: WorkItem[]) {
  await fs.mkdir(dataDirectory, { recursive: true });
  const temporaryPath = `${workPath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, workPath);
}

export async function addWorkItem(input: NewWorkItem) {
  const items = await getWorkItems();
  items.push({ ...input, id: randomUUID(), createdAt: new Date().toISOString() });
  await saveWorkItems(items);
}

export async function deleteWorkItem(id: string) {
  const items = await getWorkItems();
  await saveWorkItems(items.filter((item) => item.id !== id));
}

export async function moveWorkItem(id: string, direction: "up" | "down") {
  const items = await getWorkItems();
  const currentIndex = items.findIndex((item) => item.id === id);
  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= items.length) return;
  [items[currentIndex], items[targetIndex]] = [items[targetIndex], items[currentIndex]];
  await saveWorkItems(items);
}
