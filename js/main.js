'use strict';

/* ── Elements ────────────────────────────────────────────── */
const header = document.getElementById('header');
const backTop = document.getElementById('backTop');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

/* ── Header scroll behaviour ─────────────────────────────── */
function onScroll() {
  header?.classList.toggle('scrolled', window.scrollY > 60);
  backTop?.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile menu ─────────────────────────────────────────── */
if (burger && mobileMenu) {
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
}

/* ── Scroll reveal ───────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => revealObs.observe(el));
}

/* ── Cobblestone animation ───────────────────────────────── */
const cells = document.querySelectorAll('.cobble-cell');
const accentClasses = ['accent', 'accent2', 'light'];

function animateCobble() {
  if (!cells.length) return;

  const idx = Math.floor(Math.random() * cells.length);
  const cell = cells[idx];

  cell.classList.remove('accent', 'accent2', 'light');

  const newClass =
    accentClasses[Math.floor(Math.random() * accentClasses.length)];

  cell.classList.add(newClass);
}

if (cells.length) {
  setInterval(animateCobble, 280);
}

/* ── Counter animation ───────────────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);

  if (isNaN(target)) return;

  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);

    el.textContent = Math.round(progress * target);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

const counterElements = document.querySelectorAll('[data-target]');

if (counterElements.length) {
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(el => counterObs.observe(el));
}

/* ── Contact form ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');

    if (!btn) return;

    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Wysyłanie...';

    await new Promise(resolve => setTimeout(resolve, 1200));

    form.reset();

    btn.disabled = false;
    btn.textContent = originalText;

    if (formSuccess) {
      formSuccess.style.display = 'block';

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 6000);
    }
  });
}

/* ── Cookie banner ───────────────────────────────────────── */
const cookieBanner = document.getElementById('cookieBanner');
const COOKIE_KEY = 'lk_cookies_accepted';

if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
  setTimeout(() => {
    cookieBanner.classList.add('visible');
  }, 1200);
}

document.getElementById('acceptCookies')?.addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, '1');
  cookieBanner?.classList.remove('visible');
});

document.getElementById('rejectCookies')?.addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, '0');
  cookieBanner?.classList.remove('visible');
});

/* ── Back to top ─────────────────────────────────────────── */
backTop?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ── Active nav link ─────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

if (sections.length && navLinks.length) {
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'nav__link--active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px'
    }
  );

  sections.forEach(section => sectionObs.observe(section));
}

/* ── Smooth scrolling ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
});