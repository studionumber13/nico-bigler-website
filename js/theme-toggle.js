(function () {
  const btn = document.getElementById('themeToggle');
  const html = document.documentElement;
  const STORAGE_KEY = 'nb-theme';

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    html.classList.add('light');
  }

  if (!btn) return;

  btn.addEventListener('click', function () {
    const isLight = html.classList.toggle('light');
    localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
  });
})();
