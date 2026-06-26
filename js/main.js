/* =========================================================
   [Nama Restoran] — Main JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initMenuTabs();
  initScrollReveal();
  initLightbox();
  initReservationForm();
  initSmoothScroll();
  initActiveNavLinks();
});

/**
 * Header: transparent to solid + blur on scroll
 */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  
  const toggleHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  
  window.addEventListener('scroll', toggleHeader, { passive: true });
  toggleHeader();
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  
  const links = menu.querySelectorAll('a');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });
  
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Menu tabs: switch between categories
 */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  if (!tabs.length || !panels.length) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === target) {
          panel.classList.add('active');
        }
      });
    });
  });
}

/**
 * Scroll reveal: fade + translate elements when entering viewport
 * Respects prefers-reduced-motion
 */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  
  revealElements.forEach(el => observer.observe(el));
}

/**
 * Lightbox: zoom gallery images with navigation
 */
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (!lightbox || !lightboxImg || !items.length) return;
  
  let currentIndex = 0;
  const galleryData = Array.from(items).map(item => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-item__caption');
    return {
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      caption: caption ? caption.textContent : ''
    };
  });
  
  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  
  const updateLightbox = () => {
    const data = galleryData[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    lightboxCaption.textContent = data.caption;
  };
  
  const showNext = () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox();
  };
  
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
  };
  
  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Buka gambar di lightbox');
  });
  
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case 'ArrowLeft':
        showPrev();
        break;
    }
  });
}

/**
 * Reservation form: validate and open WhatsApp with pre-filled message
 */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  
  const namaInput = document.getElementById('nama');
  const jumlahInput = document.getElementById('jumlah');
  const tanggalInput = document.getElementById('tanggal');
  const jamInput = document.getElementById('jam');
  const catatanInput = document.getElementById('catatan');
  
  const restaurantName = '[Nama Restoran]';
  const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp restoran (format 62)
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    const nama = namaInput.value.trim();
    const jumlah = jumlahInput.value.trim();
    const tanggal = tanggalInput.value;
    const jam = jamInput.value;
    const catatan = catatanInput.value.trim() || '-';
    
    const message = `Halo ${restaurantName}, saya ingin reservasi meja.\nNama: ${nama}\nJumlah Orang: ${jumlah}\nTanggal: ${tanggal}\nJam: ${jam}\nCatatan: ${catatan}`;
    
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      const headerHeight = document.getElementById('header').offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      
      window.scrollTo({
        top: targetPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  });
}

/**
 * Active nav links based on scroll position
 */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;
  
  const setActiveLink = () => {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
}
