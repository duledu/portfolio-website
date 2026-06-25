/**
 * filters.js
 * Portfolio filter buttons — show/hide masonry items by category.
 */

const Filters = (function () {

  function init() {
    const $bar = $('.filter-bar');
    if (!$bar.length) return;

    $bar.on('click', '.filter-btn', function () {
      const $btn    = $(this);
      const filter  = $btn.data('filter');

      // ---- Update active button ----
      $bar.find('.filter-btn').removeClass('is-active');
      $btn.addClass('is-active');

      // ---- Filter items ----
      const $items = $('.masonry__item');

      if (filter === 'all') {
        $items.each(function (i) {
          showItem($(this), i);
        });
      } else {
        let visibleIdx = 0;
        $items.each(function () {
          const categories = ($(this).data('categories') || '').toLowerCase();
          if (categories.indexOf(filter.toLowerCase()) !== -1) {
            showItem($(this), visibleIdx);
            visibleIdx++;
          } else {
            hideItem($(this));
          }
        });
      }
    });
  }

  function showItem($el, idx) {
    $el.stop(true).css({ display: '' });
    setTimeout(function () {
      $el.addClass('is-visible');
    }, idx * 40);
  }

  function hideItem($el) {
    $el.removeClass('is-visible');
    setTimeout(function () {
      $el.css({ display: 'none' });
    }, 350);
  }

  return { init };

})();
