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

  // ---- Scroll animations ----
  Animations.init();

  // ---- Animated counters ----
  Counters.init();

  // ---- Marquee (pause on hover is handled in CSS) ----

  // ---- Scroll progress bar ----
  Utils.scrollProgress();

  // ---- Magnetic buttons ----
  Utils.magneticButtons();

  // ---- Lazy-load images (native) ----
  Utils.lazyImages();

});
