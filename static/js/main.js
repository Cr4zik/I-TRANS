/* ═══════════════════════════════════════════
   I-TRANS — main.js
   ═══════════════════════════════════════════ */

// ── Init ──
document.body.classList.add('js-loaded');

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Smooth scroll (with offset for fixed navbar) ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav link ──
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.navbar-nav a');

function updateActiveNav() {
  const y = window.scrollY + 90;
  let current = '';
  sections.forEach(s => {
    if (y >= s.offsetTop) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ── Side contacts entrance (staggered) ──
const sideContacts = document.querySelectorAll('.side-contact');
sideContacts.forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 900 + i * 110);
});

// ── Counter animation ──
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el) {
  if (el._animated) return;
  el._animated = true;

  const raw = el.dataset.counter;
  if (!raw) return;

  // Non-numeric (e.g. "24/7")
  if (!/^\d/.test(raw)) {
    el.textContent = raw;
    el.style.animation = 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both';
    return;
  }

  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) { el.textContent = raw; return; }

  const target   = parseInt(match[1], 10);
  const suffix   = match[2] || '';
  const duration = Math.min(1000 + target * 3, 1800);
  const startTs  = performance.now();

  el.textContent = '0' + suffix;

  function step(now) {
    const elapsed  = now - startTs;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutCubic(progress);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Scroll reveal with stagger support ──
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // Apply stagger delay based on sibling position
    const parent = el.parentElement;
    if (parent && parent.hasAttribute('data-stagger')) {
      const siblings = [...parent.querySelectorAll(':scope > .reveal')];
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 80}ms`;
    }

    el.classList.add('visible');

    // Animate any inline counters inside this element
    el.querySelectorAll('[data-counter]').forEach(animateCounter);

    // Animate eyebrow lines
    el.querySelectorAll('.section-eyebrow-line').forEach(line => {
      line.classList.add('animate');
    });

    revealObserver.unobserve(el);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ── Counters outside .reveal (direct observers) ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-counter]').forEach(el => {
  if (!el.closest('.reveal')) counterObserver.observe(el);
});