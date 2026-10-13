// HTML for every content section, built from data.js.
// Pure functions of the language, so the same code runs in the browser (language switch)
// and at build time (vite.config.js writes the English version into index.html for search engines).
import {
  profile,
  education,
  experience,
  organizations,
  projects,
  skillGroups,
  softSkills,
  spokenLanguages,
  gallery,
  certificates,
  ui,
} from './data.js';

export const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const icons = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
};

const sortKey = ([year, month = 0]) => year * 100 + month;

export const timeline = [
  { ...education, type: 'education' },
  ...experience.map((item) => ({ ...item, type: 'work' })),
  ...organizations.map((item) => ({ ...item, type: 'org' })),
  ...projects.map((p) => ({ title: p.name, org: p.type, start: [p.year], points: p.points, type: 'project' })),
].sort((a, b) => sortKey(a.start) - sortKey(b.start));

const FILTERS = ['all', 'education', 'work', 'org', 'project'];

// Returns { elementId: innerHTML } for every content container in index.html
export function renderSections(lang) {
  const t = (v) => pick(v, lang);
  const list = (items) => items.map((p) => `<li>${esc(p)}</li>`).join('');

  const formatDate = ([year, month]) =>
    month
      ? new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' }).format(
          new Date(year, month - 1),
        )
      : String(year);
  const formatRange = (start, end) => (end ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(start));

  const stats = [
    [education.gpa, ui.stats.gpa],
    [projects.length, ui.stats.projects],
    [experience.length, ui.stats.work],
    [organizations.length, ui.stats.orgs],
  ]
    .map(([value, label]) => `<div class="stat"><dt>${esc(t(label))}</dt><dd>${esc(value)}</dd></div>`)
    .join('');

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('');
  const avatar = profile.photo
    ? `<img src="${esc(profile.photo)}" alt="${esc(`${profile.name}, ${t(profile.role)}`)}" width="112" height="112" />`
    : `<span>${esc(initials)}</span>`;
  const about = `
    <div class="about-intro card reveal">
      <div class="avatar">${avatar}</div>
      <p class="about-summary">${esc(t(profile.summary))}</p>
      <p class="about-location">${icons.pin}${esc(t(profile.location))}, Indonesia</p>
    </div>
    <div class="about-side">
      <article class="card reveal">
        <p class="card-label">${esc(t(ui.about.education))}</p>
        <h3>${esc(t(education.title))}</h3>
        <p class="muted">${esc(education.org)} · ${formatRange(education.start, education.end)}</p>
        <ul class="points">${list(t(education.points))}</ul>
      </article>
      <article class="card reveal">
        <p class="card-label">${esc(t(ui.about.languages))}</p>
        <ul class="points">${list(t(spokenLanguages))}</ul>
      </article>
    </div>`;

  const filters = FILTERS.map((f) => {
    const count = f === 'all' ? timeline.length : timeline.filter((i) => i.type === f).length;
    return `<button type="button" class="chip${f === 'all' ? ' active' : ''}" data-filter="${f}" aria-pressed="${f === 'all'}">${esc(t(ui.journey[f]))} <span>${count}</span></button>`;
  }).join('');

  const years = [...new Set(timeline.map((i) => i.start[0]))];
  const journey = years
    .map(
      (year) => `
      <div class="year-group" data-year="${year}">
        <div class="year-marker"><span>${year}</span></div>
        <ol class="year-items">
          ${timeline
            .filter((i) => i.start[0] === year)
            .map(
              (item) => `
            <li class="tl-item reveal" data-type="${item.type}">
              <article class="card tl-card">
                <div class="tl-meta">
                  <span class="badge badge-${item.type}">${esc(t(ui.journey[item.type]))}</span>
                  <time>${formatRange(item.start, item.end)}</time>
                </div>
                <h3>${esc(t(item.title))}</h3>
                <p class="muted">${esc(t(item.org))}${item.place ? ` · ${esc(item.place)}` : ''}</p>
                <ul class="points">${list(t(item.points))}</ul>
              </article>
            </li>`,
            )
            .join('')}
        </ol>
      </div>`,
    )
    .join('');

  const projectCards = projects
    .map((p, i) => {
      const name = t(p.name);
      const visual = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(`${name} — ${t(p.type)}`)}" loading="lazy" />`
        : `<span class="project-orb" style="--hue:${262 + i * 14}"></span>`;
      return `
      <article class="card project reveal">
        <div class="project-visual">${visual}<span class="project-year">${p.year}</span></div>
        <div class="project-body">
          <p class="card-label">${esc(t(p.type))}</p>
          <h3>${esc(name)}</h3>
          <ul class="points">${list(t(p.points))}</ul>
          <div class="tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join('')}</div>
          ${p.url ? `<a class="btn btn-ghost btn-sm" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(t(ui.projects.live))}${icons.arrow}</a>` : ''}
        </div>
      </article>`;
    })
    .join('');

  const skills =
    skillGroups
      .map(
        (group) => `
    <article class="card skill-card reveal">
      <p class="card-label">${esc(t(group.title))}</p>
      <ul class="skill-list">
        ${group.items
          .map((skill) => {
            const usedIn = projects.filter((p) => p.stack.includes(skill)).map((p) => t(p.name));
            return `<li>
              <span class="skill-name">${esc(skill)}</span>
              ${usedIn.length ? `<span class="skill-used"><small>${esc(t(ui.skills.usedIn))}</small>${usedIn.map(esc).join(' · ')}</span>` : ''}
            </li>`;
          })
          .join('')}
      </ul>
    </article>`,
      )
      .join('') +
    `
    <article class="card skill-card reveal">
      <p class="card-label">${esc(t(ui.skills.soft))}</p>
      <div class="tags">${t(softSkills).map((s) => `<span class="tag">${esc(s)}</span>`).join('')}</div>
    </article>`;

  const galleryItems = gallery
    .map((g, i) => {
      if (!g.src) {
        return `<div class="gallery-item placeholder reveal">${icons.image}<span>${esc(t(ui.gallery.soon))}</span></div>`;
      }
      const caption = t(g.caption) || '';
      return `<button type="button" class="gallery-item reveal" data-index="${i}">
        <img src="${esc(g.src)}" alt="${esc(caption || profile.name)}" loading="lazy" />
        ${caption ? `<span class="gallery-caption">${esc(caption)}</span>` : ''}
      </button>`;
    })
    .join('');

  const certCards = certificates
    .map((c) => {
      const filled = c.title;
      const visual = c.image
        ? `<img src="${esc(c.image)}" alt="${esc(t(c.title))}" loading="lazy" />`
        : `<span class="cert-icon">${icons.award}</span>`;
      return `
      <article class="card cert reveal${filled ? '' : ' placeholder'}">
        <div class="cert-visual">${visual}</div>
        <div class="cert-body">
          <h3>${esc(filled ? t(c.title) : t(ui.certificates.soon))}</h3>
          ${filled ? `<p class="muted">${esc([t(c.issuer), c.year].filter(Boolean).join(' · '))}</p>` : ''}
          ${c.url ? `<a class="btn btn-ghost btn-sm" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(t(ui.certificates.view))}${icons.arrow}</a>` : ''}
        </div>
      </article>`;
    })
    .join('');

  const contact = `
    <h2>${esc(t(ui.contact.title))}</h2>
    <p class="contact-sub">${esc(t(ui.contact.sub))}</p>
    <a class="btn btn-primary btn-lg" href="mailto:${esc(profile.email)}">${icons.mail}${esc(profile.email)}</a>
    <div class="contact-links">
      <a href="${esc(profile.linkedin)}" target="_blank" rel="noopener me">${icons.linkedin}LinkedIn</a>
      <a href="${esc(profile.github)}" target="_blank" rel="noopener me">${icons.github}GitHub</a>
      <span>${icons.pin}${esc(t(profile.location))}</span>
    </div>`;

  return {
    stats,
    'about-content': about,
    'journey-filters': filters,
    timeline: journey,
    'project-grid': projectCards,
    'skill-grid': skills,
    'gallery-grid': galleryItems,
    'cert-grid': certCards,
    'contact-card': contact,
  };
}
