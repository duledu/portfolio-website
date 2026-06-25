/**
 * counters.js
 * Animated number counters triggered on scroll into view.
 */

const Counters = (function () {

  function init() {
    const $counters = $('[data-counter]');
    if (!$counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter($(entry.target));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    $counters.each(function () {
      observer.observe(this);
    });
  }

  function animateCounter($el) {
    const target   = parseInt($el.data('counter'), 10);
    const duration = 1800;
    const suffix   = $el.data('suffix') || '';
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.round(eased * target);

      $el.text(value + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        $el.text(target + suffix);
      }
    }

    requestAnimationFrame(step);
  }

  return { init };

})();
