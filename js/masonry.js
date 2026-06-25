/**
 * masonry.js
 * CSS column-count masonry with JS tilt on hover.
 */

const Masonry = (function () {

  function init() {
    initTilt();
  }

  // ---- Subtle mouse-tilt on project cards ----
  function initTilt() {
    $(document).on('mousemove', '.project-card', function (e) {
      const $card = $(this);
      const rect  = this.getBoundingClientRect();
      const cx    = rect.left + rect.width / 2;
      const cy    = rect.top  + rect.height / 2;

      const dx = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
      const dy = (e.clientY - cy) / (rect.height / 2); // -1 to 1

      const rotX =  dy * -3;  // max 3deg
      const rotY =  dx *  3;

      $card.css({
        transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`,
        transition: 'transform 0.1s ease'
      });
    });

    $(document).on('mouseleave', '.project-card', function () {
      $(this).css({
        transform: 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
      });
    });
  }

  return { init };

})();
