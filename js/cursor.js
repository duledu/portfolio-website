/**
 * cursor.js
 * Premium custom cursor with ring + dot, link state, and label.
 */

const Cursor = (function () {

  let $cursor, $dot, $ring, $label;
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let labelX = 0, labelY = 0;
  let isTouch = false;

  function init() {
    // Don't run on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Build DOM
    $cursor = $('<div class="cursor"><div class="cursor__dot"></div><div class="cursor__ring"></div></div>');
    $label  = $('<div class="cursor-label"><span>View</span></div>');
    $('body').append($cursor).append($label);

    $dot  = $cursor.find('.cursor__dot');
    $ring = $cursor.find('.cursor__ring');

    bindEvents();
    tick();
  }

  function bindEvents() {

    // Track mouse position
    $(document).on('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update label
      $label.css({ left: mouseX, top: mouseY });
    });

    // Hide when leaving window
    $(document).on('mouseleave', function () {
      $cursor.addClass('is-hidden');
    }).on('mouseenter', function () {
      $cursor.removeClass('is-hidden');
    });

    // ---- Link hover ----
    $(document).on('mouseenter', 'a, button, [data-cursor="link"]', function () {
      $cursor.addClass('is-link');
    }).on('mouseleave', 'a, button, [data-cursor="link"]', function () {
      $cursor.removeClass('is-link');
    });

    // ---- Project card hover (large ring + label) ----
    $(document).on('mouseenter', '[data-cursor="view"]', function () {
      const label = $(this).data('cursor-label') || 'View';
      $label.find('span').text(label);
      $label.addClass('is-visible');
      $cursor.addClass('is-hover');
    }).on('mouseleave', '[data-cursor="view"]', function () {
      $label.removeClass('is-visible');
      $cursor.removeClass('is-hover');
    });

    // ---- Input hover ----
    $(document).on('mouseenter', 'input, textarea, select', function () {
      $cursor.addClass('is-hidden');
    }).on('mouseleave', 'input, textarea, select', function () {
      $cursor.removeClass('is-hidden');
    });

    // ---- Click flash ----
    $(document).on('mousedown', function () {
      $dot.css({ width: '10px', height: '10px' });
    }).on('mouseup', function () {
      $dot.css({ width: '', height: '' });
    });
  }

  function tick() {
    // Dot follows immediately
    dotX += (mouseX - dotX) * 0.85;
    dotY += (mouseY - dotY) * 0.85;

    // Ring lags behind for smooth feel
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    $dot.css({ transform:  `translate(calc(${dotX}px - 50%), calc(${dotY}px - 50%))` });
    $ring.css({ transform: `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))` });

    requestAnimationFrame(tick);
  }

  return { init };

})();
