import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type ProjectLead = {
  id: string;
  name: string;
  email: string;
  brand: string;
  website: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
};

export type NewProjectLead = Omit<ProjectLead, "id" | "createdAt">;

const dataDirectory = process.env.HOOKCAST_DATA_DIR ?? path.join(process.cwd(), "data");
const leadsPath = path.join(dataDirectory, "leads.json");

export async function getProjectLeads(): Promise<ProjectLead[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(leadsPath, "utf8"));
    return Array.isArray(parsed) ? (parsed as ProjectLead[]) : [];
  } catch {
    return [];
  }
}

export async function addProjectLead(input: NewProjectLead) {
  const leads = await getProjectLeads();
  const lead: ProjectLead = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
  leads.unshift(lead);
  await fs.mkdir(dataDirectory, { recursive: true });
  const temporaryPath = `${leadsPath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, leadsPath);
  return lead;
}
