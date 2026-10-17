// Builds the downloadable CV (PDF) from src/data.js — one file per language.
// vite.config.js writes it to dist/cv/ on every build and serves it live in `npm run dev`.
//
// Kept ATS-friendly on purpose: one column, real selectable text (no images, tables or icons),
// standard section headings, a standard font (Helvetica), newest-first order, and no photo.
// No phone number either: the file is public on the website.
import PDFDocument from 'pdfkit';
import {
  profile,
  education,
  experience,
  organizations,
  projects,
  skillGroups,
  softSkills,
  spokenLanguages,
  certificates,
  publications,
  ui,
} from '../src/data.js';
import { pick, formatRange, sortKey, cvPath } from '../src/templates.js';

export const cvFiles = ['en', 'id'].map((lang) => ({ lang, fileName: cvPath(lang).slice(1) }));

// Helvetica is a built-in PDF font and only covers the WinAnsi character set; map anything else.
const WIN_ANSI_EXTRA = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ';
const REPLACE = { '→': '->', '←': '<-', '↗': '', '↓': '', '↑': '', '≥': '>=', '≤': '<=' };
const safe = (s) =>
  [...String(s ?? '')]
    .map((ch) => {
      if (ch.codePointAt(0) < 256 || WIN_ANSI_EXTRA.includes(ch)) return ch;
      if (!(ch in REPLACE)) console.warn(`[cv] unsupported character "${ch}" replaced`);
      return REPLACE[ch] ?? '?';
    })
    .join('');

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
const newestFirst = (a, b) => sortKey(b.end ?? b.start) - sortKey(a.end ?? a.start) || sortKey(b.start) - sortKey(a.start);
const mode = (item, fallback) => item.cv ?? fallback;

// "Dimara Kusuma Hakim" -> "Hakim, D. K." (single names stay as they are)
const citeName = (name) => {
  const parts = name.split(' ');
  if (parts.length === 1) return name;
  const last = parts.pop();
  return `${last}, ${parts.map((p) => `${p[0]}.`).join(' ')}`;
};

const PAGE = { width: 595.28, height: 841.89 }; // A4
const M = { top: 40, bottom: 44, left: 46, right: 46 };
const X = M.left;
const W = PAGE.width - M.left - M.right;
const C = { text: '#111111', muted: '#4d4d4d', rule: '#8c8c8c' };
const F = { reg: 'Helvetica', bold: 'Helvetica-Bold', italic: 'Helvetica-Oblique' };
const S = { body: 9.3, small: 8.8, title: 10.3, heading: 10.3 };
const GAP = 1.1;
const MAX_PAGES = 2;

export function buildCv(lang, siteUrl = '') {
  const t = (v) => safe(pick(v, lang));
  const tl = (v) => (pick(v, lang) ?? []).map(safe);
  const range = (start, end) => safe(formatRange(start, end, lang));

  const doc = new PDFDocument({
    size: 'A4',
    margins: M,
    bufferPages: true,
    lang: lang === 'id' ? 'id-ID' : 'en-US',
    displayTitle: true,
    info: {
      Title: `${profile.name} — CV`,
      Author: profile.name,
      Subject: `${profile.name} — ${pick(profile.role, lang)}`,
      Keywords: skillGroups.slice(0, 2).flatMap((g) => g.items).join(', '),
    },
  });
  const chunks = [];
  doc.on('data', (c) => chunks.push(c));
  const done = new Promise((resolve) => doc.on('end', () => resolve(Buffer.concat(chunks))));

  // ---------- Layout helpers ----------
  const use = (font, size, color = C.text) => doc.font(font).fontSize(size).fillColor(color);
  const ensure = (h) => {
    if (doc.y + h > PAGE.height - M.bottom) doc.addPage();
  };

  const heading = (label) => {
    doc.y += 7;
    ensure(48); // keep the heading with the start of its first entry
    use(F.bold, S.heading).text(safe(label).toUpperCase(), X, doc.y, { width: W });
    const y = doc.y + 1;
    doc.moveTo(X, y).lineTo(X + W, y).lineWidth(0.6).strokeColor(C.rule).stroke();
    doc.y = y + 5;
  };

  // Text on the left, date on the right of the same line
  const row = (left, right, { font = F.bold, size = S.title, link } = {}) => {
    const y = doc.y;
    use(F.reg, S.small);
    const rightWidth = right ? doc.widthOfString(right) + 16 : 0;
    use(font, size).text(left, X, y, { width: W - rightWidth, lineGap: GAP, link });
    const after = doc.y;
    if (right) use(F.reg, S.small, C.muted).text(right, X, y + (size - S.small) * 0.7, { width: W, align: 'right' });
    doc.x = X;
    doc.y = Math.max(after, doc.y);
  };

  const meta = (text) => use(F.italic, S.small, C.muted).text(text, X, doc.y, { width: W, lineGap: GAP });
  const para = (text) => use(F.reg, S.body).text(text, X, doc.y, { width: W, lineGap: GAP });

  // The bullet is drawn, not typed, so ATS parsers read only the sentence
  const bullet = (text) => {
    use(F.reg, S.body);
    ensure(doc.heightOfString(text, { width: W - 13, lineGap: GAP }));
    const y = doc.y;
    doc.circle(X + 4.5, y + S.body * 0.48, 1.15).fill(C.text);
    doc.text(text, X + 13, y, { width: W - 13, lineGap: GAP });
    doc.x = X;
  };

  const labelled = (label, value) => {
    use(F.reg, S.body);
    ensure(doc.heightOfString(`${label}: ${value}`, { width: W, lineGap: GAP }));
    use(F.bold, S.body).text(`${label}: `, X, doc.y, { width: W, lineGap: GAP, continued: true });
    use(F.reg, S.body).text(value, { lineGap: GAP });
    doc.x = X;
  };

  const entry = ({ title, right, sub, points = [], link }) => {
    use(F.bold, S.title);
    ensure(doc.heightOfString(title, { width: W - 110 }) + (sub ? 13 : 0) + (points.length ? 14 : 0));
    row(title, right, { link });
    if (sub) meta(sub);
    points.forEach(bullet);
    doc.y += 4.5;
  };

  const brief = (left, right) => {
    ensure(13);
    row(left, right, { font: F.reg, size: S.body });
    doc.y += 1;
  };

  // A line of contact details; each item can be a link
  const contactLine = (items) => {
    use(F.reg, S.small, C.muted);
    items.forEach(([label, href], i) => {
      const last = i === items.length - 1;
      const opts = { continued: !last, link: href || null, width: W };
      if (i === 0) doc.text(label, X, doc.y, opts);
      else doc.text(label, opts);
      if (!last) doc.text('   |   ', { continued: true, link: null });
    });
    doc.x = X;
  };

  // ---------- Header ----------
  use(F.bold, 22).text(profile.name, X, M.top, { width: W });
  use(F.reg, 11.5).text(t(profile.role), X, doc.y + 1, { width: W });
  doc.y += 5;
  const location = t(profile.location);
  contactLine(
    [
      [/indonesia/i.test(location) ? location : `${location}, Indonesia`],
      [profile.email, `mailto:${profile.email}`],
      siteUrl ? [host(siteUrl), siteUrl] : null,
    ].filter(Boolean),
  );
  doc.y += 1;
  contactLine([
    [host(profile.linkedin), profile.linkedin],
    [host(profile.github), profile.github],
  ]);

  // ---------- Summary & skills ----------
  heading(t(ui.cv.summary));
  para(t(profile.summary));

  heading(t(ui.cv.skills));
  skillGroups.forEach((g) => labelled(t(g.title), g.items.map(safe).join(', ')));
  labelled(t(ui.skills.soft), tl(softSkills).join(', '));
  labelled(t(ui.cv.languages), tl(spokenLanguages).join(', '));

  // ---------- Experience ----------
  const work = [...experience].sort(newestFirst);
  const fullWork = work.filter((e) => mode(e, 'full') === 'full');
  if (fullWork.length) {
    heading(t(ui.cv.experience));
    fullWork.forEach((e) =>
      entry({
        title: t(e.title),
        right: range(e.start, e.end),
        sub: [t(e.org), t(e.place)].filter(Boolean).join(' · '),
        points: tl(e.points),
      }),
    );
  }

  // ---------- Projects (newest first) ----------
  const projectList = projects
    .map((p, i) => ({ ...p, i }))
    .filter((p) => mode(p, 'full') !== false)
    .sort((a, b) => b.year - a.year || b.i - a.i);
  if (projectList.length) {
    heading(t(ui.cv.projects));
    projectList.forEach((p) => {
      const link = p.url || p.repo || undefined;
      if (mode(p, 'full') === 'brief') {
        brief(`${t(p.name)} — ${p.stack.map(safe).join(', ')}`, String(p.year));
        return;
      }
      entry({
        title: t(p.name),
        right: String(p.year),
        sub: [t(p.type), p.stack.map(safe).join(', '), link && host(link)].filter(Boolean).join('  |  '),
        points: tl(p.points),
        link,
      });
    });
  }

  // ---------- Education, certifications, publications ----------
  heading(t(ui.cv.education));
  entry({
    title: t(education.title),
    right: range(education.start, education.end),
    sub: safe(education.org),
    points: tl(education.points),
  });

  const certs = certificates.filter((c) => c.title);
  if (certs.length) {
    heading(t(ui.cv.certifications));
    certs.forEach((c) =>
      entry({
        title: t(c.title),
        right: safe(c.year),
        sub: t(c.issuer),
        points: tl(c.points),
        link: siteUrl && c.url ? siteUrl + c.url : undefined,
      }),
    );
  }

  if (publications.length) {
    heading(t(ui.cv.publications));
    publications.forEach((pub) => {
      const names = pub.authors.map(citeName);
      const authors = names.length > 1 ? `${names.slice(0, -1).join(', ')}, & ${names.at(-1)}` : names[0];
      entry({
        title: safe(pub.title),
        right: String(pub.year),
        sub: safe(`${authors} — ${pub.venue} (${pick(pub.status, lang)})${pub.url ? ` · ${host(pub.url)}` : ''}`),
        points: [t(pub.summary)],
        link: pub.url || undefined,
      });
    });
  }

  // ---------- Leadership & other experience ----------
  heading(t(ui.cv.leadership));
  [...organizations].sort(newestFirst).forEach((o) => {
    if (mode(o, 'brief') === false) return;
    if (mode(o, 'brief') === 'full') {
      entry({ title: `${t(o.title)}, ${t(o.org)}`, right: range(o.start, o.end), points: tl(o.points) });
    } else {
      brief(`${t(o.title)}, ${t(o.org)}`, range(o.start, o.end));
    }
  });

  const otherWork = work.filter((e) => mode(e, 'full') === 'brief');
  if (otherWork.length) {
    heading(t(ui.cv.other));
    otherWork.forEach((e) => brief(`${t(e.title)}, ${t(e.org)}`, range(e.start, e.end)));
  }

  // ---------- Page numbers ----------
  const pages = doc.bufferedPageRange();
  if (pages.count > MAX_PAGES) {
    console.warn(`[cv] ${lang.toUpperCase()} CV is ${pages.count} pages; recruiters expect ${MAX_PAGES} at most. Mark less relevant items cv: 'brief' or false in src/data.js.`);
  }
  if (pages.count > 1) {
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.page.margins.bottom = 0; // writing inside the margin must not trigger a new page
      use(F.reg, 8, C.muted).text(`${profile.name} — CV · ${i + 1} / ${pages.count}`, X, PAGE.height - 30, {
        width: W,
        align: 'right',
        lineBreak: false,
      });
      doc.page.margins.bottom = M.bottom;
    }
  }

  doc.end();
  return done;
}
