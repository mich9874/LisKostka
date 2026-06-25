/* ============================================================
   LisKostka – main.js
   Interactions: sticky nav, mobile menu, scroll reveal,
   cobblestone animation, contact form, cookies, back-to-top
   ============================================================ */

'use strict';

/* ── Header scroll behaviour ─────────────────────────────── */
const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 60);
  backTop.classList.toggle('visible', window.scrollY > 400);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile menu ─────────────────────────────────────────── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  burger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ── Scroll reveal ───────────────────────────────────────── */
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Cobblestone cell animation ──────────────────────────── */
const cells  = document.querySelectorAll('.cobble-cell');
const accentClasses = ['accent', 'accent2', 'light', ''];

function animateCobble() {
  if (!cells.length) return;
  const idx = Math.floor(Math.random() * cells.length);
  const cell = cells[idx];
  // Remove previous accent classes
  accentClasses.forEach(c => c && cell.classList.remove(c));
  const newClass = accentClasses[Math.floor(Math.random() * accentClasses.length)];
  if (newClass) cell.classList.add(newClass);
}

setInterval(animateCobble, 280);

/* ── Smooth counter animation ────────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur    = 1400;
  const start  = performance.now();
  function step(now) {
    const t   = Math.min((now - start) / dur, 1);
    const val = Math.round(t * target);
    el.textContent = val;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ── Contact form ────────────────────────────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn  = form.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.textContent = 'Wysyłanie…';
    btn.disabled = true;

    // Simulate async send (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1200));

    form.reset();
    btn.textContent = orig;
    btn.disabled = false;
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
  });
}

/* ── Cookie banner ───────────────────────────────────────── */
const cookieBanner = document.getElementById('cookieBanner');
const COOKIE_KEY   = 'lk_cookies_accepted';

if (!localStorage.getItem(COOKIE_KEY)) {
  setTimeout(() => cookieBanner.classList.add('visible'), 1200);
}

document.getElementById('acceptCookies')?.addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, '1');
  cookieBanner.classList.remove('visible');
});
document.getElementById('rejectCookies')?.addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, '0');
  cookieBanner.classList.remove('visible');
});

/* ── Back to top ─────────────────────────────────────────── */
const backTop = document.getElementById('backTop');
backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Active nav link on scroll ───────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle(
          'nav__link--active',
          a.getAttribute('href') === '#' + e.target.id
        ));
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObs.observe(s));

/* ── Smooth section links ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // sticky header height
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});
