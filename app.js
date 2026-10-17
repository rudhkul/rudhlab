(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

$('#year')?.replaceChildren(String(new Date().getFullYear()));

// Header border once the page scrolls.
const header = $('.header');
const onScroll = () => header?.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, {passive: true}); onScroll();

// Mobile menu.
const menu = $('.menu-toggle'), nav = $('#navigation');
const setMenu = open => { menu?.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('open', open); };
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { setMenu(false); menu.focus(); } });

// Theme: theme.js sets the initial value before paint; this keeps the toggle in sync.
const themeButton = $('.theme-toggle'), systemTheme = matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  $('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0c0c0e' : '#ffffff');
}
applyTheme(document.documentElement.dataset.theme || 'light');
themeButton?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('rudhlab-theme', theme); } catch (_) {}
});
systemTheme.addEventListener('change', e => {
  let saved; try { saved = localStorage.getItem('rudhlab-theme'); } catch (_) {}
  if (saved !== 'dark' && saved !== 'light') applyTheme(e.matches ? 'dark' : 'light');
});

const LAB = window.LAB || {studies: []};
if (LAB.email) { const a = $('#contact-primary'); if (a) { a.href = 'mailto:' + LAB.email; a.textContent = LAB.email; } }
const cv = $('#download-cv'); if (cv && LAB.cv) { cv.href = LAB.cv; cv.parentElement.hidden = false; }
$('#print-profile')?.addEventListener('click', () => window.print());

// Click-to-play players: the poster stays still until a visitor asks for motion.
function activate(player) {
  const video = player.querySelector('video');
  player.classList.add('playing');
  video.controls = true;
  video.play().catch(() => {});
}
$$('[data-player] .play').forEach(b => b.addEventListener('click', () => activate(b.closest('[data-player]'))));

// Only one clip plays at a time.
document.addEventListener('play', e => {
  if (e.target instanceof HTMLVideoElement) $$('video').forEach(v => { if (v !== e.target) v.pause(); });
}, true);

const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
const featured = $('.featured video source')?.getAttribute('src');

// Simulation grid and code list, from content.js.
const sims = $('#sims');
if (sims) {
  LAB.studies.filter(s => s.type === 'simulation' && s.media && s.media.src !== featured).forEach(s => {
    const card = document.createElement('article');
    card.className = 'sim';
    card.innerHTML = `<button type="button" data-study="${s.id}"><div class="player"><img alt="" loading="lazy" decoding="async"><span class="play" aria-hidden="true"><span>${PLAY}</span></span></div><h3></h3><p></p></button>`;
    const img = card.querySelector('img');
    img.src = s.media.poster || s.media.src;
    card.querySelector('h3').textContent = s.title;
    card.querySelector('p').textContent = s.description;
    card.querySelector('button').setAttribute('aria-label', `${s.title}. Open video and notes`);
    sims.append(card);
  });
}
const codeList = $('#code-list');
if (codeList) {
  LAB.studies.filter(s => s.type === 'code').forEach(s => {
    const row = document.createElement('a');
    row.className = 'row';
    row.href = s.url; row.target = '_blank'; row.rel = 'noopener noreferrer';
    row.innerHTML = '<h3></h3><span class="meta"></span><p></p>';
    row.querySelector('h3').textContent = s.title;
    row.querySelector('.meta').textContent = (s.language || 'GitHub') + ' ↗';
    row.querySelector('p').textContent = s.description;
    codeList.append(row);
  });
}

// News and talks, from content.js. Upcoming vs past is decided by today's date.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const day = iso => { const [y, m, d] = iso.split('-').map(Number); return {y, m, d, t: new Date(y, m - 1, d).getTime()}; };
function when(item) {
  const a = day(item.start), b = day(item.end || item.start);
  if (a.t === b.t) return `${a.d} ${MONTHS[a.m - 1]} ${a.y}`;
  if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${MONTHS[a.m - 1]} ${a.y}`;
  if (a.y === b.y) return `${a.d} ${MONTHS[a.m - 1]} – ${b.d} ${MONTHS[b.m - 1]} ${a.y}`;
  return `${a.d} ${MONTHS[a.m - 1]} ${a.y} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`;
}
const today = (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(); })();
const news = (LAB.news || []).map(n => ({...n, upcoming: day(n.end || n.start).t >= today}));
const upcoming = news.filter(n => n.upcoming).sort((a, b) => day(a.start).t - day(b.start).t);
const past = news.filter(n => !n.upcoming).sort((a, b) => day(b.start).t - day(a.start).t);
function newsEntry(n) {
  const row = document.createElement('article');
  row.className = 'entry';
  row.innerHTML = '<span class="when"></span><div><h3></h3><p class="news-meta"></p></div>';
  row.querySelector('.when').textContent = when(n);
  if (n.upcoming) { const s = document.createElement('span'); s.className = 'status'; s.textContent = 'Upcoming'; row.querySelector('.when').append(s); }
  row.querySelector('h3').textContent = (n.kind && n.kind !== 'Talk' ? n.kind + ': ' : '') + n.title;
  row.querySelector('.news-meta').textContent = [n.event, n.host, n.location].filter(Boolean).join(' · ');
  if (n.url) {
    const a = document.createElement('a');
    Object.assign(a, {className: 'link', href: n.url, target: '_blank', rel: 'noopener noreferrer'});
    a.textContent = (n.linkLabel || 'Details') + ' ↗';
    const p = document.createElement('p'); p.className = 'news-link'; p.append(a);
    row.lastElementChild.append(p);
  }
  return row;
}
function fill(host, items, emptyText) {
  if (!host) return;
  if (!items.length) { const p = document.createElement('p'); p.className = 'muted'; p.textContent = emptyText; host.replaceChildren(p); return; }
  host.replaceChildren(...items.map(newsEntry));
}
fill($('#news-upcoming'), upcoming, 'No upcoming talks at the moment.');
fill($('#news-past'), past, 'Nothing listed yet.');
fill($('#news-latest'), [...upcoming, ...past].slice(0, 3), 'Nothing listed yet.');

// Study dialog.
const dialog = $('#study-dialog');
let opener = null;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-study]');
  if (!b || !dialog) return;
  const s = LAB.studies.find(x => x.id === b.dataset.study);
  if (!s) return;
  $$('video').forEach(v => v.pause());
  opener = b;
  $('#dialog-title').textContent = s.title;
  $('#dialog-description').textContent = s.detail;
  $('#dialog-method').textContent = s.method;
  $('#dialog-label').textContent = s.label;
  const media = $('#dialog-media');
  media.replaceChildren();
  if (s.media) {
    const m = document.createElement(s.media.type === 'video' ? 'video' : 'img');
    if (s.media.type === 'video') {
      Object.assign(m, {controls: true, playsInline: true, preload: 'metadata', poster: s.media.poster || ''});
      m.setAttribute('aria-label', s.media.alt || s.title);
    } else m.alt = s.media.alt || s.title;
    m.src = s.media.src;
    media.append(m);
  }
  const link = $('#dialog-link');
  link.hidden = !s.url;
  if (s.url) { link.href = s.url; link.firstChild.textContent = (s.linkLabel || 'Source') + ' '; }
  dialog.showModal();
  dialog.querySelector('video')?.play().catch(() => {});
});
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
dialog?.addEventListener('close', () => { $('#dialog-media').replaceChildren(); opener?.focus(); });

// Publication search and filters run on the server-rendered list.
const list = $('#publication-list');
if (list) {
  let kind = 'all';
  const search = $('#publication-search'), entries = $$('.pub'), groups = $$('.year-group');
  function filter() {
    const q = search.value.trim().toLocaleLowerCase();
    let count = 0;
    entries.forEach(p => {
      const year = p.closest('.year-group')?.dataset.year || '';
      const show = (kind === 'all' || p.dataset.type === kind) && (year + ' ' + p.textContent).toLocaleLowerCase().includes(q);
      p.hidden = !show; if (show) count++;
    });
    groups.forEach(g => { g.hidden = !g.querySelector('.pub:not([hidden])'); });
    $('#publication-count').textContent = count + ' publication' + (count === 1 ? '' : 's');
    $('#publication-empty').hidden = count !== 0;
    list.hidden = count === 0;
  }
  search.addEventListener('input', filter);
  $$('[data-publication-filter]').forEach(button => button.addEventListener('click', () => {
    kind = button.dataset.publicationFilter;
    $$('[data-publication-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    filter();
  }));
}
})();
