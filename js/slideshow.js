(function () {
  var slides     = document.querySelectorAll('.slide');
  var dots       = document.querySelectorAll('.slide-dot');
  var prevBtn    = document.getElementById('slidePrev');
  var nextBtn    = document.getElementById('slideNext');
  var counterEl  = document.getElementById('slideCurrentNum');
  var current    = 0;
  var total      = slides.length;
  var autoTimer  = null;

  if (!slides.length) return;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + total) % total;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');

    if (counterEl) {
      counterEl.textContent = (current + 1).toString().padStart(2, '0');
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () { next(); resetAuto(); });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = parseInt(dot.getAttribute('data-goto'), 10);
      goTo(target);
      resetAuto();
    });
  });

  document.addEventListener('keydown', function (e) {
    var slideshow = document.getElementById('projectSlideshow');
    if (!slideshow) return;
    var rect = slideshow.getBoundingClientRect();
    var inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
  });

  var touchStartX = 0;
  var slideshow = document.getElementById('projectSlideshow');

  if (slideshow) {
    slideshow.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    slideshow.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { next(); } else { prev(); }
        resetAuto();
      }
    }, { passive: true });

    slideshow.addEventListener('mouseenter', stopAuto);
    slideshow.addEventListener('mouseleave', startAuto);
  }

  startAuto();
})();
