/* ═══════════════════════════════════════════
   I-TRANS — main.js
   Hamburger menu · Scroll reveal · Counters · Active nav · Side contacts
   ═══════════════════════════════════════════ */

document.documentElement.classList.add('js-loaded');

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── HAMBURGER MENU ─── */
const navToggle   = document.getElementById('navToggle');
const mobileNav   = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

function openMenu() {
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMenu);
}

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
    closeMenu();
    navToggle && navToggle.focus();
  }
});

/* ─── SIDE CONTACTS: appear after scrolling ─── */
const sideContacts = document.querySelectorAll('.side-contact');

window.addEventListener('scroll', () => {
  const visible = window.scrollY > 240;
  sideContacts.forEach((el, i) => {
    el.style.transitionDelay = visible ? `${i * 55}ms` : '0ms';
    el.classList.toggle('visible', visible);
  });
}, { passive: true });

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── STAGGERED REVEAL (trust cards) ─── */
document.querySelectorAll('[data-stagger] .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 90}ms`;
});

/* ─── ANIMATED COUNTERS ─── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const raw    = el.dataset.counter;
    const target = parseInt(raw, 10);

    // Skip non-numeric counters (24/7, 20+)
    if (isNaN(target)) return;

    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 44));
    const isYear = target > 100; // e.g. 2004

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 28);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-counter]').forEach(el => {
  counterObserver.observe(el);
});

/* ─── ACTIVE NAV LINK ─── */
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-48% 0px -48% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── SECTION EYEBROW LINES: trigger when section enters view ─── */
const eyebroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const line = entry.target.querySelector('.section-eyebrow-line');
      if (line) line.classList.add('animate');
      eyebroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('messengerModal')?.classList.remove('open');
  }
});
document.querySelectorAll('.section-eyebrow').forEach(el => eyebroObserver.observe(el));