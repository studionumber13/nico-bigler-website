(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      if (delay) el.style.transitionDelay = delay + 'ms';
      el.classList.add('revealed');
      // Clear delay after animation so hover transitions aren't delayed
      if (delay) setTimeout(() => { el.style.transitionDelay = ''; }, 600 + Number(delay));
      observer.unobserve(el);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
})();
