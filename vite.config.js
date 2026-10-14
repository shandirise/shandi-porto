import { defineConfig } from 'vite';
import { profile, education, skillGroups } from './src/data.js';
import { renderSections } from './src/templates.js';

// The public address of the site. On Vercel it is filled in automatically from the production domain;
// set SITE_URL (e.g. https://shandihimawan.com) to override. Without it, URL-based tags are left out
// rather than pointing somewhere wrong.
const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
const siteUrl = host && `https://${host.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
const ogImage = '/og-image.jpg';

function structuredData() {
  const [city, region] = profile.location.en.split(', ');
  const person = {
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role.en,
    description: profile.summary.en,
    url: siteUrl ? `${siteUrl}/` : undefined,
    image: siteUrl ? siteUrl + (profile.photo || ogImage) : undefined,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'ID' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.org },
    knowsAbout: skillGroups.slice(0, 2).flatMap((g) => g.items),
    knowsLanguage: ['id', 'en'],
    sameAs: [profile.linkedin, profile.github],
  };
  const page = { '@type': 'ProfilePage', url: person.url, mainEntity: person };
  // WebSite tells Google which name to show for the site in results
  const website = { '@type': 'WebSite', name: profile.name, alternateName: `${profile.name} Portfolio`, url: person.url };
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [website, page] }).replace(/</g, '\\u003c');
}

function seo() {
  return {
    name: 'seo',
    transformIndexHtml(html) {
      // Write the English content into the page so search engines and link previews see it without running JS
      for (const [id, markup] of Object.entries(renderSections('en'))) {
        html = html.replace(new RegExp(`(id="${id}"[^>]*>)(</)`), (_, open, close) => open + markup + close);
      }
      const tags = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: structuredData(), injectTo: 'head' },
      ];
      if (siteUrl) {
        const meta = (attrs) => tags.push({ tag: attrs.rel ? 'link' : 'meta', attrs, injectTo: 'head' });
        meta({ rel: 'canonical', href: `${siteUrl}/` });
        meta({ property: 'og:url', content: `${siteUrl}/` });
        meta({ property: 'og:image', content: siteUrl + ogImage });
        meta({ property: 'og:image:width', content: '1200' });
        meta({ property: 'og:image:height', content: '630' });
        meta({ property: 'og:image:alt', content: `${profile.name} — ${profile.role.en}` });
        meta({ name: 'twitter:image', content: siteUrl + ogImage });
      }
      return { html, tags };
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      });
      if (!siteUrl) {
        this.warn('No SITE_URL or VERCEL_PROJECT_PRODUCTION_URL: canonical, og:image and sitemap.xml were skipped.');
        return;
      }
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [seo()],
});
