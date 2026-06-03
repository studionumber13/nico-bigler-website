(function () {
  const overlay = document.getElementById('contactModal');
  const openBtn = document.getElementById('openContact');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!overlay) return;

  function openModal() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      const first = overlay.querySelector('input, textarea');
      if (first) first.focus();
    }, 300);
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  document.querySelectorAll('a[href="#contact"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.textContent = '...';
      submitBtn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          form.reset();
          if (successMsg) successMsg.style.display = 'block';
          submitBtn.style.display = 'none';
        } else {
          submitBtn.textContent = 'Fehler — nochmals versuchen';
          submitBtn.disabled = false;
        }
      } catch {
        submitBtn.textContent = 'Fehler — nochmals versuchen';
        submitBtn.disabled = false;
      }
    });
  }
})();
