import type { MetadataRoute } from "next";
import { LEGEND_SLUGS, SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL.toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...LEGEND_SLUGS.map((slug) => ({
      url: new URL(`/lendas/${slug}`, SITE_URL).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
