/**
 * Saraswati Dining — Main JavaScript
 * Features:
 *  1. Sticky header with scroll state
 *  2. Mobile menu toggle
 *  3. Menu tabs
 *  4. Gallery lightbox with keyboard & swipe support
 *  5. Reservation form → WhatsApp redirect
 *  6. Smooth scroll for nav links
 *  7. Scroll reveal animation
 *  8. Back-to-top button
 *  9. Active nav link highlighting
 */

'use strict';

/* ────────────────────────────────────────────
   CONSTANTS
──────────────────────────────────────────── */
const WA_NUMBER = '6281234567890'; // Format internasional tanpa +

/* ────────────────────────────────────────────
   1. STICKY HEADER
──────────────────────────────────────────── */
(function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ────────────────────────────────────────────
   2. MOBILE MENU
──────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('nav-hamburger');
  const menu       = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-cta');

  if (!hamburger || !menu) return;

  const open  = () => { menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };

  hamburger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  mobileLinks.forEach(link => link.addEventListener('click', close));

  // Close on backdrop click
  menu.addEventListener('click', e => {
    if (e.target === menu) close();
  });
})();

/* ────────────────────────────────────────────
   3. MENU TABS
──────────────────────────────────────────── */
(function initMenuTabs() {
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      // Update panels with fade
      panels.forEach(panel => {
        if (panel.id === `panel-${target}`) {
          panel.style.display = 'block';
          panel.style.opacity = '0';
          panel.style.transform = 'translateY(12px)';
          panel.classList.add('active');

          // Trigger reflow then animate
          requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
          });
        } else {
          panel.classList.remove('active');
          panel.style.display = 'none';
          panel.style.opacity = '';
          panel.style.transform = '';
          panel.style.transition = '';
        }
      });
    });
  });
})();

/* ────────────────────────────────────────────
   4. GALLERY LIGHTBOX
──────────────────────────────────────────── */
(function initLightbox() {
  const gallery   = document.getElementById('gallery-grid');
  const lightbox  = document.getElementById('lightbox');
  const imgEl     = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn  = document.getElementById('lightbox-close');
  const prevBtn   = document.getElementById('lightbox-prev');
  const nextBtn   = document.getElementById('lightbox-next');

  if (!gallery || !lightbox) return;

  const items     = Array.from(gallery.querySelectorAll('.gallery-item'));
  let currentIdx  = 0;
  let touchStartX = 0;

  const getItemData = idx => {
    const item = items[idx];
    if (!item) return null;
    const img = item.querySelector('img');
    const cap = item.querySelector('figcaption');
    return {
      src: img?.src || '',
      alt: img?.alt || '',
      caption: cap?.textContent || ''
    };
  };

  const show = idx => {
    const data = getItemData(idx);
    if (!data) return;
    currentIdx = idx;
    imgEl.src = data.src;
    imgEl.alt = data.alt;
    captionEl.textContent = data.caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    prevBtn.style.display = currentIdx === 0 ? 'none' : '';
    nextBtn.style.display = currentIdx === items.length - 1 ? 'none' : '';
  };

  const hide = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
  };

  const prev = () => { if (currentIdx > 0) show(currentIdx - 1); };
  const next = () => { if (currentIdx < items.length - 1) show(currentIdx + 1); };

  // Attach click to gallery items
  items.forEach((item, idx) => {
    item.addEventListener('click', () => show(idx));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Lihat foto ${idx + 1}`);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(idx); }
    });
  });

  closeBtn.addEventListener('click', hide);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Backdrop close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) hide();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     hide();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch/swipe support
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  });
})();

/* ────────────────────────────────────────────
   5. RESERVATION FORM → WHATSAPP
──────────────────────────────────────────── */
(function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Validation helpers
  const fields = {
    name   : { el: document.getElementById('res-name'),   err: document.getElementById('err-name'),   msg: 'Nama lengkap wajib diisi.' },
    phone  : { el: document.getElementById('res-phone'),  err: document.getElementById('err-phone'),  msg: 'Nomor HP wajib diisi.' },
    date   : { el: document.getElementById('res-date'),   err: document.getElementById('err-date'),   msg: 'Pilih tanggal reservasi.' },
    time   : { el: document.getElementById('res-time'),   err: document.getElementById('err-time'),   msg: 'Pilih jam reservasi.' },
    guests : { el: document.getElementById('res-guests'), err: document.getElementById('err-guests'), msg: 'Pilih jumlah orang.' },
    type   : { el: document.getElementById('res-type'),   err: document.getElementById('err-type'),   msg: 'Pilih jenis acara.' },
  };

  const showError = (field, msg) => {
    field.err.textContent = msg;
    field.err.classList.add('show');
    field.el.style.borderColor = '#C62828';
  };

  const clearError = field => {
    field.err.classList.remove('show');
    field.el.style.borderColor = '';
  };

  // Live validation
  Object.values(fields).forEach(f => {
    f.el?.addEventListener('input', () => clearError(f));
    f.el?.addEventListener('change', () => clearError(f));
  });

  const validate = () => {
    let valid = true;
    Object.values(fields).forEach(f => {
      const val = f.el?.value?.trim();
      if (!val) {
        showError(f, f.msg);
        valid = false;
      } else {
        clearError(f);
      }
    });

    // Phone number basic check
    const phoneVal = fields.phone.el?.value?.trim();
    if (phoneVal && !/^[0-9+\-\s()]{7,15}$/.test(phoneVal)) {
      showError(fields.phone, 'Masukkan nomor HP yang valid.');
      valid = false;
    }

    return valid;
  };

  const formatDate = raw => {
    if (!raw) return '';
    const d = new Date(raw + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstErr = form.querySelector('.field-error.show');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const nama     = document.getElementById('res-name').value.trim();
    const no_hp    = document.getElementById('res-phone').value.trim();
    const tanggal  = formatDate(document.getElementById('res-date').value);
    const jam      = document.getElementById('res-time').value;
    const orang    = document.getElementById('res-guests').value;
    const jenis    = document.getElementById('res-type').value;
    const catatan  = document.getElementById('res-notes').value.trim() || '-';

    const message =
`Halo Saraswati Dining, saya ingin reservasi:

Nama: ${nama}
No. HP: ${no_hp}
Tanggal: ${tanggal}
Jam: ${jam}
Jumlah orang: ${orang}
Jenis: ${jenis}
Catatan: ${catatan}

Mohon konfirmasi ketersediaan meja. Terima kasih.`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

    // Button loading state
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menghubungkan…';

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      btn.disabled = false;
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Reservasi via WhatsApp';
    }, 600);
  });
})();

/* ────────────────────────────────────────────
   6. SMOOTH SCROLL FOR NAV LINKS
──────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const headerH = document.getElementById('site-header')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ────────────────────────────────────────────
   7. SCROLL REVEAL
──────────────────────────────────────────── */
(function initReveal() {
  // Add reveal class to sections/elements
  const targets = [
    '.about-images',
    '.about-content',
    '.menu-tabs',
    '.menu-card',
    '.gallery-item',
    '.reservation-info',
    '.reservation-form-wrap',
    '.contact-map',
    '.contact-info-card',
    '.private-content',
    '.section-header',
    '.highlight-item',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (i > 0 && i <= 3) el.classList.add(`reveal-delay-${i}`);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ────────────────────────────────────────────
   8. BACK TO TOP
──────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ────────────────────────────────────────────
   9. ACTIVE NAV LINK (Intersection Observer)
──────────────────────────────────────────── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ────────────────────────────────────────────
   10. LAZY LOAD POLYFILL (for older browsers)
──────────────────────────────────────────── */
(function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // Native support

  const images = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
})();
