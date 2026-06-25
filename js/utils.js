/**
 * utils.js
 * Shared utility functions: throttle, scroll progress,
 * magnetic buttons, lazy images, page loader.
 */

const Loader = (function () {

  function init() {
    const $loader = $('.loader');
    if (!$loader.length) return;

    // Hide loader after assets + small delay
    $(window).on('load', function () {
      setTimeout(function () {
        $loader.addClass('is-hidden');
        $('body').addClass('loaded');
      }, 900);
    });

    // Fallback: hide after 2.5s
    setTimeout(function () {
      $loader.addClass('is-hidden');
      $('body').addClass('loaded');
    }, 2500);
  }

  return { init };

})();

// ============================================================

const Utils = (function () {

  // ---- Throttle ----
  function throttle(fn, delay) {
    let last = 0;
    return function () {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(this, arguments);
      }
    };
  }

  // ---- Scroll progress bar ----
  function scrollProgress() {
    const $bar = $('.scroll-progress');
    if (!$bar.length) return;

    $(window).on('scroll.progress', throttle(function () {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      $bar.css('width', pct + '%');
    }, 16));
  }

  // ---- Magnetic buttons ----
  function magneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const $btns = $('[data-magnetic]');

    $btns.on('mousemove', function (e) {
      const rect   = this.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const strength = parseFloat($(this).data('magnetic')) || 0.3;

      $(this).css({
        transform: `translate(${dx * strength}px, ${dy * strength}px)`,
        transition: 'transform 0.15s ease'
      });
    }).on('mouseleave', function () {
      $(this).css({
        transform: 'translate(0, 0)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
      });
    });
  }

  // ---- Lazy images (native loading="lazy" + observer fallback) ----
  function lazyImages() {
    // If native lazy loading isn't supported, use IntersectionObserver
    if ('loading' in HTMLImageElement.prototype) return;

    const $imgs = $('img[data-src]');
    if (!$imgs.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const $img = $(entry.target);
          $img.attr('src', $img.data('src')).removeAttr('data-src');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    $imgs.each(function () { observer.observe(this); });
  }

  // ---- Smooth scroll for anchor links ----
  function smoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
      const target = $(this).attr('href');
      if (target === '#') return;
      const $target = $(target);
      if (!$target.length) return;
      e.preventDefault();
      $('html,body').animate({ scrollTop: $target.offset().top - 80 }, 700, 'swing');
    });
  }

  return { throttle, scrollProgress, magneticButtons, lazyImages, smoothScroll };

})();
