/**
 * animations.js
 * IntersectionObserver-based scroll reveal animations.
 */

const Animations = (function () {

  function init() {
    revealOnScroll();
    revealImages();
  }

  // ---- Generic [data-reveal] elements ----
  function revealOnScroll() {
    const $targets = $('[data-reveal]');
    if (!$targets.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    $targets.each(function () {
      observer.observe(this);
    });
  }

  // ---- Image reveal (.img-reveal wrappers) ----
  function revealImages() {
    const $imgs = $('.img-reveal, .masonry__item');
    if (!$imgs.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    $imgs.each(function () {
      observer.observe(this);
    });
  }

  return { init };

})();
