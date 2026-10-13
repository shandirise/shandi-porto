import './style.css';
import { profile, gallery, ui } from './data.js';
import { pick, renderSections } from './templates.js';

// ---------- Language: saved choice > Indonesian timezone > English ----------
const INDONESIA_TIMEZONES = ['Asia/Jakarta', 'Asia/Pontianak', 'Asia/Makassar', 'Asia/Jayapura'];

function detectLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'id') return saved;
  } catch {}
  try {
    if (INDONESIA_TIMEZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)) return 'id';
  } catch {}
  return 'en';
}

let lang = detectLang();

const t = (v) => pick(v, lang);
const $ = (id) => document.getElementById(id);

// ---------- Static text ----------
function applyStaticText() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = el.dataset.i18n.split('.').reduce((obj, key) => obj?.[key], ui);
    if (value) el.textContent = t(value);
  });
  const toggle = $('lang-toggle');
  toggle.setAttribute('aria-label', t(ui.langLabel));
  toggle.querySelectorAll('[data-lang]').forEach((el) => el.classList.toggle('active', el.dataset.lang === lang));
  $('hero-role').textContent = t(profile.role);
  $('hero-location').textContent = t(profile.location);
  $('year').textContent = new Date().getFullYear();
}

// ---------- Journey filter ----------
let activeFilter = 'all';

function applyFilter() {
  document.querySelectorAll('#journey-filters .chip').forEach((chip) => {
    const on = chip.dataset.filter === activeFilter;
    chip.classList.toggle('active', on);
    chip.setAttribute('aria-pressed', on);
  });
  document.querySelectorAll('.year-group').forEach((group) => {
    let visible = 0;
    group.querySelectorAll('.tl-item').forEach((item) => {
      const show = activeFilter === 'all' || item.dataset.type === activeFilter;
      item.hidden = !show;
      if (show) visible++;
    });
    group.hidden = visible === 0;
  });
}

// ---------- Reveal-on-scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -8% 0px' },
);

let firstRender = true;

function render() {
  applyStaticText();
  for (const [id, html] of Object.entries(renderSections(lang))) $(id).innerHTML = html;
  applyFilter();
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    // After a language switch, show re-rendered content right away instead of replaying the animation
    if (firstRender) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
  firstRender = false;
}

// ---------- Interactions ----------
$('lang-toggle').addEventListener('click', () => {
  lang = lang === 'en' ? 'id' : 'en';
  try {
    localStorage.setItem('lang', lang);
  } catch {}
  render();
});

$('journey-filters').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  activeFilter = chip.dataset.filter;
  applyFilter();
});

const header = $('site-header');
const menuToggle = $('menu-toggle');
menuToggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', open);
});
$('site-nav').addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    header.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

const lightbox = $('lightbox');
$('gallery-grid').addEventListener('click', (e) => {
  const item = e.target.closest('button.gallery-item');
  if (!item) return;
  const g = gallery[item.dataset.index];
  lightbox.querySelector('img').src = g.src;
  lightbox.querySelector('img').alt = t(g.caption) || '';
  lightbox.querySelector('p').textContent = t(g.caption) || '';
  lightbox.showModal();
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.closest('.lightbox-close')) lightbox.close();
});

// Header background + progress bar + active nav link
const bar = $('scroll-bar');
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  header.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });

const navLinks = [...document.querySelectorAll('#site-nav a')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

render();
onScroll();
// Three.js is loaded separately so the text appears before the 3D scene is ready
import('./cosmos.js').then(({ initCosmos }) => initCosmos($('cosmos')));
