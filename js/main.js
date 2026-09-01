/**
 * main.js
 * Entry point — initializes all modules after DOM is ready
 */

$(document).ready(function () {

  // ---- Page Loader ----
  Loader.init();

  // ---- Custom Cursor ----
  Cursor.init();

  // ---- Sticky Header ----
  Navigation.init();

  // ---- Testimonials grid (testimonials.html) — must run before
  // Animations.init() below, since it builds the .masonry__item
  // elements that the scroll-reveal observer needs to already exist.
  if (typeof Testimonials !== 'undefined') {
    Testimonials.init();
  }

  // ---- Scroll animations ----
  Animations.init();

  // ---- Animated counters ----
  if (typeof Counters !== 'undefined') {
    Counters.init();
  }

  // ---- Marquee (pause on hover is handled in CSS) ----

  // ---- Scroll progress bar ----
  Utils.scrollProgress();

  // ---- Magnetic buttons ----
  Utils.magneticButtons();

  // ---- Lazy-load images (native) ----
  Utils.lazyImages();

  // ---- Project screenshot scroll preview (hover) ----
  if (typeof ProjectPreview !== 'undefined') {
    ProjectPreview.init();
  }

  // ---- Video showcase lightbox ----
  if (typeof VideoModal !== 'undefined') {
    VideoModal.init();
  }

  // ---- Video library category filter (videos.html) ----
  if (typeof VideoFilters !== 'undefined') {
    VideoFilters.init();
  }

});
