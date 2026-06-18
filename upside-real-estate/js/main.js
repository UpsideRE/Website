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

  // Contact form — Netlify Forms AJAX submission
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const note = document.querySelector('#form-note');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (note) {
          if (res.ok) {
            note.textContent = 'Vielen Dank. Ihre Nachricht wurde gesendet — wir melden uns zeitnah zurück.';
            note.style.borderLeftColor = 'var(--gold)';
            form.reset();
          } else {
            note.textContent = 'Beim Senden ist ein Fehler aufgetreten. Bitte schreiben Sie uns direkt an info@upsiderealestate.de.';
            note.style.borderLeftColor = '#c0392b';
          }
          note.classList.add('visible');
        }
      } catch {
        if (note) {
          note.textContent = 'Keine Verbindung. Bitte schreiben Sie uns direkt an info@upsiderealestate.de.';
          note.style.borderLeftColor = '#c0392b';
          note.classList.add('visible');
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }
});
