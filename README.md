# Shandi Himawan — Portfolio

Single-page portfolio with a 3D planet (Three.js) that rotates as you scroll. English / Indonesian, picked automatically from the visitor's timezone (Indonesian timezones → Bahasa Indonesia), with a switch button.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

All text lives in `src/data.js` (each text has `en` and `id`).

- **Gallery** — put photos in `public/images/gallery/`, then set `src: '/images/gallery/your-photo.jpg'` and a caption in the `gallery` list.
- **Certificates** — put images in `public/images/certificates/`, then fill `title`, `issuer`, `year`, `image` (and `url` if it can be verified online).
- **Profile photo** — set `profile.photo`.
- **Projects** — add screenshots via `image`; the `stack` names drive the "Used in" lines in Code Mastery.

## Deploy to Vercel

Push to GitHub and import the repo in Vercel (framework preset: **Vite**, it is detected automatically), or run `npx vercel` from this folder.

## SEO

Handled at build time by `vite.config.js`:

- All content is written into the HTML (English), so search engines and link previews read it without running JavaScript.
- Structured data (schema.org `ProfilePage` + `Person`) tells Google who the page is about, linked to LinkedIn and GitHub.
- `canonical`, `og:url`, `og:image`, `sitemap.xml` and `robots.txt` use the production domain from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. Keep **Settings → Environment Variables → "Automatically expose System Environment Variables"** enabled, or set `SITE_URL` yourself (e.g. a custom domain).
- `public/og-image.jpg` is the 1200×630 preview shown when the link is shared.

After the first deploy, to get found for "Shandi Himawan":

1. Add the site to [Google Search Console](https://search.google.com/search-console), verify it, and submit `/sitemap.xml`.
2. Put the site link on your LinkedIn profile (Contact info → Website) and GitHub profile (Website field). Links from your own profiles are what connect the name to this page.
3. Check the structured data with [Rich Results Test](https://search.google.com/test/rich-results).