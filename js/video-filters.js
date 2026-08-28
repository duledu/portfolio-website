/**
 * video-filters.js
 * Category filter for the videos.html library grid — shows/hides
 * .video-card items by their data-category attribute. Independent
 * of filters.js (which is hardwired to .masonry__item) so it can't
 * affect the websites.html filtering.
 */

const VideoFilters = (function () {

  function init() {
    const $bar = $('.videos-library .filter-bar');
    if (!$bar.length) return;

    const $items = $('.video-library [data-category]');

    $bar.on('click', '.filter-btn', function () {
      const $btn    = $(this);
      const filter  = $btn.data('filter');

      $bar.find('.filter-btn').removeClass('is-active');
      $btn.addClass('is-active');

      $items.each(function () {
        const $item = $(this);
        const match = filter === 'all' || $item.data('category') === filter;
        $item.toggleClass('is-filtered-out', !match);
      });
    });
  }

  return { init };

})();
