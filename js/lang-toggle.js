(function () {
  const STORAGE_KEY = 'nb-lang';
  const DEFAULT_LANG = 'de';

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    // Swap all [data-de] / [data-en] text nodes
    document.querySelectorAll('[data-de], [data-en]').forEach((el) => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        if (el.dataset.html === 'true' || /<[a-z][\s\S]*>/i.test(text)) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update toggle button active states
    document.querySelectorAll('[data-lang-opt]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.langOpt === lang);
    });
  }

  // Bind toggle buttons (elements with data-lang-opt="de" / "en")
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang-opt]');
    if (!btn) return;
    applyLang(btn.dataset.langOpt);
  });

  // Also support a single toggle element with class .lang-toggle-btn
  document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'de' ? 'en' : 'de');
    });
  });

  // Init on load
  applyLang(currentLang);
})();
