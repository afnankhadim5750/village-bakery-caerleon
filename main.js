// The Village Bakery & Cafe — Village market redesign:
// mobile menu (instant toggle), scroll-spy, menu tabs, lightbox, contact form (mailto).

// Mobile menu: toggle instantly (no transition), closes on link tap.
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-mobile-menu]');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('span').textContent = 'Menu';
  }));
}

// Scroll-spy
const links = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spy.observe(s));

// Menu tabs: one panel visible at a time.
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.remove('active');
      p.hidden = true;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(btn.getAttribute('data-tab'));
    if (panel) {
      panel.classList.add('active');
      panel.hidden = false;
    }
  });
});

// Lightbox
const items = [...document.querySelectorAll('.g-item')];
const box = document.getElementById('lightbox');
const img = document.getElementById('lb-img');
let idx = 0;
function show(i) {
  idx = (i + items.length) % items.length;
  img.src = items[idx].dataset.full;
  img.alt = items[idx].querySelector('img').alt;
  box.hidden = false;
}
function close() { box.hidden = true; img.src = ''; }
items.forEach((b, i) => b.addEventListener('click', () => show(i)));
box.querySelector('.lb-close').addEventListener('click', close);
box.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
box.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
box.addEventListener('click', e => { if (e.target === box) close(); });
document.addEventListener('keydown', e => {
  if (box.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') show(idx + 1);
  if (e.key === 'ArrowLeft') show(idx - 1);
});

// Contact form -> mailto
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const msg = document.getElementById('cf-msg').value.trim();
  const subject = encodeURIComponent('Website enquiry from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\n\n' + msg);
  window.location.href = 'mailto:thevillagecaerleon@gmail.com?subject=' + subject + '&body=' + body;
});
