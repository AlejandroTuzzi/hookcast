import { promises as fs } from "node:fs";
import path from "node:path";

export type VideoProvider = "file" | "mux";
export type MobileVideoMode = "same" | "separate";

export type VideoSource = {
  provider: VideoProvider;
  value: string;
  poster: string;
};

export type SiteConfig = {
  hero: {
    mobileMode: MobileVideoMode;
    desktop: VideoSource;
    mobile: VideoSource;
  };
};

const dataDirectory = process.env.HOOKCAST_DATA_DIR ?? path.join(process.cwd(), "data");
const configPath = path.join(dataDirectory, "site-config.json");

export const defaultSiteConfig: SiteConfig = {
  hero: {
    mobileMode: "same",
    desktop: { provider: "file", value: "", poster: "" },
    mobile: { provider: "file", value: "", poster: "" },
  },
};

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const contents = await fs.readFile(configPath, "utf8");
    return { ...defaultSiteConfig, ...JSON.parse(contents) } as SiteConfig;
  } catch {
    return defaultSiteConfig;
  }
}

export async function saveSiteConfig(config: SiteConfig) {
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}
