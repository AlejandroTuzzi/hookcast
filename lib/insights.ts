export type InsightStatus = "draft" | "scheduled" | "published";

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  topic: string;
  author: string;
  status: InsightStatus;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
};

// The editorial model lives separately from the UI so the local JSON repository
// can be replaced by Sanity without changing public pages or admin components.
