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

const fleetData = [
  {tractor:'МАН 18.463 TGA',year:'2003',trailers:[{name:'9487СТ 99393К/99393К',year:'2007',capacity:'5000 т'}]},
  {tractor:'МАН 19.414FLLC (301 kW)',year:'2000',trailers:[{name:'Шмитц SCHMITZ 45',year:'2007',capacity:'5600 т'}]},
  {tractor:'МАН TGA18.460 4X2 BLS',year:'2006',trailers:[{name:'9487СТ 99393К/99393К',year:'2007',capacity:'5000 т'}]},
  {tractor:'МАН TGA18.460 4X2 BLS',year:'2006',trailers:[{name:'SCHWERINER CS406',year:'2002',capacity:'5200 т'}]},
  {tractor:'МАН TGA18.460 4X2 BLS',year:'2006',trailers:[{name:'Автоприцеп 9453 0000010-01',year:'2008',capacity:'5650 т'}]},
  {tractor:'МАН TGA18.460 4X2 BLS',year:'2006',trailers:[{name:'Соммер SW24',year:'2002',capacity:'5920 т'}]},
  {tractor:'МАН TGA18.460 4X2 BLS',year:'2006',trailers:[{name:'Соммер SW24',year:'2002',capacity:'5920 т'}]},
  {tractor:'МАН TGA18.4604X2BLS',year:'2006',trailers:[{name:'Кроне KRONE -SD27',year:'1999',capacity:'5260 т'}]},
  {tractor:'МАН TGA18.4804X2BLS',year:'2007',trailers:[{name:'Schweriner scaweriner-DW',year:'2000',capacity:'4335 т'}]},
  {tractor:'МАН TGA18.4804X2BLS',year:'2007',trailers:[{name:'Автоприцеп 99393К/99393К',year:'2007',capacity:'5000 т'}]},
  {tractor:'МАН TGA18.4804X2BLS',year:'2007',trailers:[{name:'Соммер',year:'2002',capacity:'4800 т'}]},
  {tractor:'МАН TGA18.4804X2BLS',year:'2007',trailers:[{name:'9487СТ 99393K',year:'2007',capacity:'5000 т'}]},
  {tractor:'МАН TGA18.4804X2BLS',year:'2007',trailers:[{name:'SCHWERINER CS406',year:'2002',capacity:'5200 т'}]},
  {tractor:'МАН TGS 19.4004X2BLS',year:'2011',trailers:[{name:'Кроне KRONE SD',year:'2007',capacity:'5000 т'}]},
  {tractor:'МАН TGS19.4004X2BLS',year:'2014',trailers:[{name:'Автоприцеп KORTEN',year:'2000',capacity:'5400 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2014',trailers:[{name:'Велтон WIELTON NS-3',year:'2012',capacity:'5480 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2014',trailers:[{name:'Велтон WIELTON NS-3',year:'2012',capacity:'2480 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2012',trailers:[{name:'Автоприцеп SW-240GRKR',year:'2007',capacity:'6000 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2012',trailers:[{name:'Кроне KRONE SD',year:'2006',capacity:'5900 т'}, {name:'Велтон wielton ns4p',year:'2021',capacity:'5880 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2012',trailers:[{name:'Кроне WIELTONNS34',year:'2011',capacity:'5000 т'}, {name:'Велтон WIELTON NS4P',year:'2022',capacity:'5880 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2011',trailers:[{name:'Велтон WIELTON NS-34',year:'2011',capacity:'5990 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2011',trailers:[{name:'Велтон WIELTON NS-34',year:'2011',capacity:'5990 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2011',trailers:[{name:'Велтон WIELTON NS-3',year:'2012',capacity:'5480 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2011',trailers:[{name:'Велтон WIELTON NS-34',year:'2011',capacity:'5990 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2011',trailers:[{name:'Велтон WIELTON NS-34',year:'2011',capacity:'5990 т'}]},
  {tractor:'МАН TGX 18.4004X2BLS',year:'2011',trailers:[{name:'Велтон WIELTON NS-34',year:'2011',capacity:'5990 т'}]},
  {tractor:'МАН TGX 18.4404X2BLS',year:'2012',trailers:[{name:'Автоприцеп KRONE SD',year:'2007',capacity:'5000 т'}]},
  {tractor:'МАН TGX 26.4006X2/2BLS',year:'2018',trailers:[{name:'Велтон WIELTON NS-3',year:'2012',capacity:'5990 т'}]},
  {tractor:'МАН TGX 26.4006X2/2BLS',year:'2018',trailers:[{name:'SCHWERINER D&W',year:'1999',capacity:'4335 т'}]},
  {tractor:'МАН TGX 26.4006X2/2BLS',year:'2018',trailers:[{name:'Автоприцеп WIELTON NS-3',year:'2013',capacity:'5990 т'}]},
  {tractor:'МАН TGX 26.4006X2/2BLS',year:'2018',trailers:[{name:'Велтон WIELTON NS-3',year:'2012',capacity:'5990 т'}]},
  {tractor:'МАН TGX 26.4006X2/2BLSTG',year:'2018',trailers:[{name:'Автоприцеп SW-454',year:'2019',capacity:'4700 т'}]},
];

function renderFleetCards(filter) {
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;
  const q = (filter || '').trim().toLowerCase();

  const filtered = fleetData.filter(unit => {
    if (!q) return true;
    const haystack = unit.tractor.toLowerCase() + ' ' + unit.trailers.map(t => t.name).join(' ').toLowerCase();
    return haystack.includes(q);
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="fleet-empty">Ничего не найдено</div>';
    return;
  }

  grid.innerHTML = filtered.map(unit => {
    const trailersHtml = unit.trailers.map(t => `
      <div class="fleet-card-trailer">
        <i class="fas fa-box" style="color:#bbb;font-size:11px;margin-top:3px;"></i>
        <div>
          <span class="fleet-card-trailer-name">${t.name}</span>
          <span class="fleet-card-trailer-meta">${t.year} г. · <span class="fleet-card-trailer-capacity">${t.capacity}</span></span>
        </div>
      </div>
    `).join('');

    return `
      <div class="fleet-card">
        <div class="fleet-card-tractor">
          <i class="fas fa-truck"></i>
          <div>
            <div class="fleet-card-tractor-name">${unit.tractor}</div>
            <div class="fleet-card-tractor-year">${unit.year} г.</div>
          </div>
        </div>
        ${trailersHtml}
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderFleetCards();
  const search = document.getElementById('fleetSearch');
  if (search) {
    search.addEventListener('input', e => renderFleetCards(e.target.value));
  }
});