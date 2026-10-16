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
  publications,
  ui,
} from './data.js';

export const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const pad = (n) => String(n).padStart(2, '0');

// Last word in italics, e.g. "Let’s work <em>together</em>"
const italicLast = (text) => esc(text).replace(/(\S+)$/, '<em>$1</em>');

const sortKey = ([year, month = 0]) => year * 100 + month;

export const timeline = [
  { ...education, type: 'education' },
  ...experience.map((item) => ({ ...item, type: 'work' })),
  ...organizations.map((item) => ({ ...item, type: 'org' })),
  ...projects.map((p) => ({ title: p.name, org: p.type, start: [p.year], points: p.points, type: 'project' })),
  ...publications.map((pub) => ({
    title: pub.title,
    org: { en: `${pub.venue} · ${pub.status.en}`, id: `${pub.venue} · ${pub.status.id}` },
    start: [pub.year],
    points: { en: [pub.summary.en], id: [pub.summary.id] },
    type: 'research',
  })),
].sort((a, b) => sortKey(a.start) - sortKey(b.start));

const FILTERS = ['all', 'education', 'work', 'org', 'project', 'research'];

// Returns { elementId: innerHTML } for every content container in index.html
export function renderSections(lang) {
  const t = (v) => pick(v, lang);
  const list = (items) => items.map((p) => `<li>${esc(p)}</li>`).join('');
  const external = (href, label) => `<a class="link-arrow" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;

  const formatDate = ([year, month]) =>
    month
      ? new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' }).format(
          new Date(year, month - 1),
        )
      : String(year);
  const formatRange = (start, end) => (end ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(start));

  const stats = [
    [education.gpa, ui.stats.gpa],
    [pad(projects.length), ui.stats.projects],
    [pad(experience.length), ui.stats.work],
    [pad(organizations.length), ui.stats.orgs],
  ]
    .map(([value, label]) => `<div class="stat"><dt>${esc(t(label))}</dt><dd>${esc(value)}</dd></div>`)
    .join('');

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('');
  const portrait = profile.photo
    ? `<img src="${esc(profile.photo)}" alt="${esc(`${profile.name}, ${t(profile.role)}`)}" width="500" height="500" loading="lazy" />`
    : `<span class="portrait-initials">${esc(initials)}</span>`;
  const about = `
    <figure class="portrait reveal">
      <div class="portrait-frame">${portrait}</div>
      <figcaption>Fig. 01 — ${esc(profile.name)}</figcaption>
    </figure>
    <div class="about-body reveal">
      <p class="about-summary">${esc(t(profile.summary))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${esc(t(ui.about.education))}</dt>
          <dd>
            <strong>${esc(t(education.title))}</strong>
            <span>${esc(education.org)} · ${formatRange(education.start, education.end)}</span>
            ${t(education.points).map((p) => `<span>${esc(p)}</span>`).join('')}
          </dd>
        </div>
        <div class="fact">
          <dt>${esc(t(ui.about.languages))}</dt>
          <dd>${t(spokenLanguages).map((p) => `<span>${esc(p)}</span>`).join('')}</dd>
        </div>
        <div class="fact">
          <dt>${esc(t(ui.about.location))}</dt>
          <dd><span>${esc(t(profile.location))}</span></dd>
        </div>
      </dl>
    </div>`;

  const filters = FILTERS.map((f) => {
    const count = f === 'all' ? timeline.length : timeline.filter((i) => i.type === f).length;
    return `<button type="button" class="chip${f === 'all' ? ' active' : ''}" data-filter="${f}" aria-pressed="${f === 'all'}">${esc(t(ui.journey[f]))}<sup>${count}</sup></button>`;
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
              <div class="tl-when">
                <time>${formatRange(item.start, item.end)}</time>
                <span class="tl-type">${esc(t(ui.journey[item.type]))}</span>
              </div>
              <div class="tl-what">
                <h3>${esc(t(item.title))}</h3>
                <p class="tl-org">${esc(t(item.org))}${item.place ? ` · ${esc(item.place)}` : ''}</p>
                <ul class="points">${list(t(item.points))}</ul>
              </div>
            </li>`,
            )
            .join('')}
        </ol>
      </div>`,
    )
    .join('');

  const projectRows = projects
    .map((p, i) => {
      const name = t(p.name);
      const paper = publications.some((pub) => pub.project === p.name);
      return `
      <article class="project reveal${p.image ? ' has-thumb' : ''}">
        <span class="project-index">P.${pad(i + 1)}</span>
        <div class="project-main">
          <h3>${esc(name)}</h3>
          <ul class="points">${list(t(p.points))}</ul>
          <p class="project-stack">${p.stack.map(esc).join(' · ')}</p>
        </div>
        <div class="project-meta">
          <span>${esc(t(p.type))}</span>
          <span>${p.year}</span>
          ${p.url ? external(p.url, t(ui.projects.live)) : ''}
          ${paper ? `<a class="link-arrow" href="#research">${esc(t(ui.projects.research))} <span aria-hidden="true">↓</span></a>` : ''}
        </div>
        ${p.image ? `<img class="project-thumb" src="${esc(p.image)}" alt="${esc(`${name} — ${t(p.type)}`)}" loading="lazy" />` : ''}
      </article>`;
    })
    .join('');

  const research = publications
    .map((pub) => {
      const authors = pub.authors.map((a) => (a === profile.name ? `<strong>${esc(a)}</strong>` : esc(a))).join(', ');
      const links = [
        pub.url ? external(pub.url, t(ui.research.read)) : '',
        pub.pdf ? external(pub.pdf, t(ui.research.pdf)) : '',
        pub.project ? `<a class="link-arrow" href="#projects">${esc(t(ui.research.project))} ${esc(pub.project)} <span aria-hidden="true">↑</span></a>` : '',
      ].filter(Boolean);
      return `
      <article class="panel paper reveal">
        <p class="paper-meta">
          <span class="paper-status">${esc(t(pub.status))}</span>
          <span>${esc(pub.venue)}</span>
          <span>${esc(pub.issn)}</span>
        </p>
        <h3 class="paper-title">${esc(pub.title)}</h3>
        <p class="paper-authors">${authors}</p>
        <p class="paper-affil">${esc(t(pub.affiliation))} · ${esc(t(pub.note))}</p>
        <p class="paper-summary">${esc(t(pub.summary))}</p>
        <dl class="paper-findings">
          ${pub.findings.map((f) => `<div><dt>${esc(t(f.label))}</dt><dd>${esc(f.value)}</dd></div>`).join('')}
        </dl>
        <details class="paper-abstract">
          <summary>${esc(t(ui.research.abstract))}</summary>
          <p>${esc(t(pub.abstract))}</p>
          <p class="paper-keywords"><span>${esc(t(ui.research.keywords))}</span>${t(pub.keywords).map(esc).join(' · ')}</p>
        </details>
        ${links.length ? `<p class="paper-links">${links.join('')}</p>` : ''}
      </article>`;
    })
    .join('');

  const skills = `
    <div class="skill-columns">
      ${skillGroups
        .map(
          (group) => `
        <div class="skill-col reveal">
          <h3 class="skill-heading">${esc(t(group.title))}</h3>
          <ul class="skill-list">
            ${group.items
              .map((skill) => {
                const usedIn = projects.filter((p) => p.stack.includes(skill)).map((p) => t(p.name));
                return `<li><span class="skill-name">${esc(skill)}</span>${
                  usedIn.length ? `<span class="skill-used">${esc(t(ui.skills.usedIn))} ${usedIn.map(esc).join(', ')}</span>` : ''
                }</li>`;
              })
              .join('')}
          </ul>
        </div>`,
        )
        .join('')}
    </div>
    <p class="skill-soft reveal"><span>${esc(t(ui.skills.soft))}</span>${t(softSkills).map(esc).join(' · ')}</p>`;

  const galleryItems = gallery
    .map((g, i) => {
      if (!g.src) {
        return `<div class="gallery-item placeholder reveal"><span class="gallery-num">${pad(i + 1)}</span><span>${esc(t(ui.gallery.soon))}</span></div>`;
      }
      const caption = t(g.caption) || '';
      return `<button type="button" class="gallery-item reveal" data-index="${i}">
        <img src="${esc(g.src)}" alt="${esc(caption || profile.name)}" loading="lazy" />
        <span class="gallery-caption">${pad(i + 1)}${caption ? ` — ${esc(caption)}` : ''}</span>
      </button>`;
    })
    .join('');

  const certRows = certificates
    .map((c, i) => {
      const filled = c.title;
      const thumb = c.image ? `<img src="${esc(c.image)}" alt="${esc(`${t(c.title)} — ${profile.name}`)}" loading="lazy" />` : '';
      return `
      <article class="cert reveal${filled ? '' : ' placeholder'}${c.image ? ' has-thumb' : ''}">
        <span class="cert-index">C.${pad(i + 1)}</span>
        <div class="cert-main">
          <h3>${esc(filled ? t(c.title) : t(ui.certificates.soon))}</h3>
          ${filled ? `<p class="cert-meta">${esc([t(c.issuer), c.year].filter(Boolean).join(' · '))}</p>` : ''}
          ${c.points ? `<ul class="points">${list(t(c.points))}</ul>` : ''}
          ${c.url ? `<p class="cert-link">${external(c.url, t(ui.certificates.view))}</p>` : ''}
        </div>
        ${thumb ? (c.url ? `<a class="cert-thumb" href="${esc(c.url)}" target="_blank" rel="noopener">${thumb}</a>` : `<span class="cert-thumb">${thumb}</span>`) : ''}
      </article>`;
    })
    .join('');

  const contact = `
    <p class="section-label">08 — ${esc(t(ui.nav.contact))}</p>
    <h2>${italicLast(t(ui.contact.title))}</h2>
    <p class="contact-sub">${esc(t(ui.contact.sub))}</p>
    <a class="contact-email" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
    <ul class="contact-links">
      <li><a href="${esc(profile.linkedin)}" target="_blank" rel="noopener me">LinkedIn <span aria-hidden="true">↗</span></a></li>
      <li><a href="${esc(profile.github)}" target="_blank" rel="noopener me">GitHub <span aria-hidden="true">↗</span></a></li>
      <li>${esc(t(profile.location))}</li>
    </ul>`;

  return {
    stats,
    'about-content': about,
    'journey-filters': filters,
    timeline: journey,
    'project-grid': projectRows,
    'research-list': research,
    'skill-grid': skills,
    'gallery-grid': galleryItems,
    'cert-grid': certRows,
    'contact-card': contact,
  };
}
