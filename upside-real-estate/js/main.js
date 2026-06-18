// ============================================================
// UPSIDE REAL ESTATE — shared interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');

  // Header scroll state
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      header.classList.toggle('menu-open');
      if (navOverlay) navOverlay.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        header.classList.remove('menu-open');
        if (navOverlay) navOverlay.classList.remove('open');
      });
    });
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('open');
        header.classList.remove('menu-open');
        navOverlay.classList.remove('open');
      });
    }
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Contact form (static demo — no backend)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.querySelector('#form-note');
      if (note) {
        note.textContent = 'Vielen Dank. Ihre Nachricht wurde erfasst — wir melden uns zeitnah zurück.';
        note.classList.add('visible');
      }
      form.reset();
    });
  }
});
