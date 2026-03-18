(function () {

  /* ── NAVBAR SCROLL SHADOW ── */
  const nav = document.getElementById('navbar');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', onScroll);

  /* ── HAMBURGER MENU ── */
  window.toggleMenu = function () {
    const links = document.getElementById('navLinks');
    if (links) links.classList.toggle('open');
  };

  /* ── HERO CAROUSEL ── */
  function initCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dotsWrap = document.getElementById('carouselDots');
    if (!slides.length || !dotsWrap) return;

    let current = 0;
    let timer = null;

    // build pill dots
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => {
        goTo(i);
        resetTimer();
      });
      dotsWrap.appendChild(btn);
    });

    const dotBtns = Array.from(dotsWrap.children);

    function update() {
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dotBtns.forEach((b, i) => b.classList.toggle('active', i === current));
    }

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      update();
    }

    function next() { goTo(current + 1); }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 4000); // change every 4 seconds
    }

    // pause on hover, resume on leave
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', resetTimer);

    update();
    resetTimer();
  }

  /* ── FADE IN ON SCROLL ── */
  function initFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initFadeIn();
  });

})();
