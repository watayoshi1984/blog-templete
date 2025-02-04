import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://test.a2x2z.com';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap-index.xml

# Crawl-delay
Crawl-delay: 10

# Disallow
Disallow: /api/
Disallow: /.env
Disallow: /node_modules/
Disallow: /.git/`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}; 