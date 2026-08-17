/**
 * project-preview.js
 * Premium hover interaction for full-page website screenshots.
 * Measures how much of the tall screenshot overflows its fixed-height
 * preview window, then exposes that as CSS custom properties so the
 * (CSS-driven) hover transform can glide slowly through the full page.
 */

const ProjectPreview = (function () {

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function measure($wrap) {
    const img = $wrap.find('img')[0];
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const wrapWidth  = $wrap.width();
    const wrapHeight = $wrap.height();
    const renderedH  = (img.naturalHeight / img.naturalWidth) * wrapWidth;
    const distance   = Math.max(0, Math.round(renderedH - wrapHeight));

    if (distance < 4) {
      $wrap.css('--scroll-distance', '0px');
      return;
    }

    // Longer travel gets a slower, more deliberate glide. Clamped so
    // very tall screenshots don't end up with an unreasonably long wait.
    const duration = Math.min(9, Math.max(2.5, distance / 140));

    $wrap.css('--scroll-distance', `-${distance}px`);
    $wrap.css('--scroll-duration', `${duration.toFixed(2)}s`);
  }

  function measureAll() {
    $('.masonry .project-card__img-wrap').each(function () {
      measure($(this));
    });
  }

  function init() {
    if (!canHover || reduceMotion) return;

    $('.masonry .project-card__img-wrap').each(function () {
      const $wrap = $(this);
      const img = $wrap.find('img')[0];
      if (!img) return;

      if (img.complete) {
        measure($wrap);
      } else {
        $(img).on('load', function () { measure($wrap); });
      }
    });

    $(window).on('resize', Utils.throttle(measureAll, 200));
  }

  return { init };

})();
