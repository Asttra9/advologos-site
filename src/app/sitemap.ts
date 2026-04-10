import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

// Static sitemap — no dynamic date to avoid triggering serverless function
const LAST_MODIFIED = '2025-04-09';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
