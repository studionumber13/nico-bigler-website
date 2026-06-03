(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 80) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href*="index.html"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href && href.includes(entry.target.id));
      });
    });
  }, { threshold: 0.4 });

  sections.forEach((s) => sectionObserver.observe(s));

  // Mobile burger menu
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.nav-overlay');
  if (!burger || !overlay) return;

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();
