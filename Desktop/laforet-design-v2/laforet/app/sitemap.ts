import { MetadataRoute } from "next"

const SITE_URL = "https://laforetdesign.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
