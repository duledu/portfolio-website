/**
 * navigation.js
 * Sticky header scroll behavior + mobile menu toggle.
 */

const Navigation = (function () {

  let $header, $toggle, $overlay, isOpen = false;
  let lastScrollY = 0;

  function init() {
    $header  = $('.header');
    $toggle  = $('.header__toggle');
    $overlay = $('.nav-overlay');

    if (!$header.length) return;

    bindEvents();
    onScroll(); // run once on load
    setActiveLink();
  }

  function bindEvents() {

    // ---- Scroll: add bg + hide on scroll down ----
    $(window).on('scroll.nav', Utils.throttle(onScroll, 50));

    // ---- Toggle mobile menu ----
    $toggle.on('click', function () {
      isOpen ? closeMenu() : openMenu();
    });

    // ---- Close on overlay link click ----
    $overlay.find('.nav-overlay__link').on('click', function () {
      closeMenu();
    });

    // ---- Close on Escape ----
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  function onScroll() {
    const scrollY = window.scrollY;

    // Add bg blur after 60px
    if (scrollY > 60) {
      $header.addClass('is-scrolled');
    } else {
      $header.removeClass('is-scrolled');
    }

    lastScrollY = scrollY;
  }

  function openMenu() {
    isOpen = true;
    $overlay.addClass('is-open').attr('aria-hidden', 'false').prop('inert', false);
    $toggle.addClass('is-open').attr('aria-expanded', 'true');
    $('body').addClass('no-scroll');
    FocusTrap.activate($overlay);
    $overlay.find('.nav-overlay__link').first().trigger('focus');
  }

  function closeMenu() {
    isOpen = false;
    $overlay.removeClass('is-open').attr('aria-hidden', 'true').prop('inert', true);
    $toggle.removeClass('is-open').attr('aria-expanded', 'false');
    $('body').removeClass('no-scroll');
    FocusTrap.deactivate();
    $toggle.trigger('focus');
  }

  function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';

    $header.find('.header__nav-desktop a, .nav-overlay__link').each(function () {
      const href = $(this).attr('href');
      if (href === path || (path === '' && href === 'index.html')) {
        $(this).addClass('is-active');
      }
    });
  }

  return { init };

})();
