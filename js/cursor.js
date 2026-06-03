(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<span class="cursor-label">View →</span>';
  document.body.appendChild(cursor);

  let mx = -100, my = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.left = '-100px';
    cursor.style.top  = '-100px';
  });

  // Project card hover → expand to "View →" pill
  document.querySelectorAll('.project-card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-project'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-project'));
  });

  // Link / button hover → slight expand
  document.querySelectorAll('a:not(.project-card), button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!cursor.classList.contains('hover-project')) {
        cursor.classList.add('hover-link');
      }
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-link'));
  });
})();
