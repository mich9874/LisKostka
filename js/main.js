'use strict';

/* ============================================================
   INIT DOM SAFELY (GitHub Pages SAFE)
============================================================ */

window.addEventListener('DOMContentLoaded', () => {

  /* ── ELEMENTY ─────────────────────────────────────────── */
  const header = document.getElementById('header');
  const backTop = document.getElementById('backTop');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const cookieBanner = document.getElementById('cookieBanner');
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  /* ============================================================
     SCROLL (HEADER + BACK TO TOP)
  ============================================================ */

  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }

    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================================
     MOBILE MENU
  ============================================================ */

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

  /* ============================================================
     REVEAL ANIMATION (SEKCJE)
  ============================================================ */

  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealEls.forEach(el => revealObs.observe(el));

  /* ============================================================
     COBBLESTONE ANIMATION
  ============================================================ */

  const cells = document.querySelectorAll('.cobble-cell');
  const accentClasses = ['accent', 'accent2', 'light', ''];

  function animateCobble() {
    if (!cells.length) return;

    const idx = Math.floor(Math.random() * cells.length);
    const cell = cells[idx];

    accentClasses.forEach(c => {
      if (c) cell.classList.remove(c);
    });

    const newClass = accentClasses[Math.floor(Math.random() * accentClasses.length)];
    if (newClass) cell.classList.add(newClass);
  }

  setInterval(animateCobble, 300);

  /* ============================================================
     COUNTERS
  ============================================================ */

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(t * target);

      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('[data-target]').forEach(el => {
    counterObs.observe(el);
  });

  /* ============================================================
     CONTACT FORM
  ============================================================ */

  if (form && formSuccess) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      if (!btn) return;

      const original = btn.textContent;

      btn.textContent = 'Wysyłanie...';
      btn.disabled = true;

      await new Promise(r => setTimeout(r, 1000));

      form.reset();
      btn.textContent = original;
      btn.disabled = false;

      formSuccess.style.display = 'block';

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    });
  }

  /* ============================================================
     COOKIE BANNER
  ============================================================ */

  const COOKIE_KEY = 'lk_cookies';

  if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 1000);
  }

  document.getElementById('acceptCookies')?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    cookieBanner?.classList.remove('visible');
  });

  document.getElementById('rejectCookies')?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    cookieBanner?.classList.remove('visible');
  });

  /* ============================================================
     ACTIVE NAV ON SCROLL
  ============================================================ */

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === '#' + e.target.id
          );
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px'
  });

  sections.forEach(sec => sectionObs.observe(sec));

  /* ============================================================
     SMOOTH SCROLL
  ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));

      if (!target) return;

      e.preventDefault();

      const offset = 80;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  /* ============================================================
     BACK TO TOP
  ============================================================ */

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});