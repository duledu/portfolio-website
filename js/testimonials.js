/**
 * testimonials.js
 * Renders TestimonialsData (js/testimonials-data.js) into the masonry grid
 * on testimonials.html, and drives the "View original review" lightbox.
 * Screenshot images are never loaded until a visitor actually opens one —
 * the modal <img> has no src until click time.
 */

const Testimonials = (function () {

  let $modal, $frame, $img, $close, $backdrop;
  let $lastTrigger = null;
  let isOpen = false;

  function init() {
    const $grid = $('#testimonials-grid');
    if (!$grid.length || typeof TestimonialsData === 'undefined') return;

    renderCards($grid);

    $modal    = $('.image-modal');
    $frame    = $modal.find('.image-modal__frame');
    $img      = $modal.find('.image-modal__img');
    $close    = $modal.find('.image-modal__close');
    $backdrop = $modal.find('.image-modal__backdrop');

    bindEvents();
  }

  function renderCards($grid) {
    const $items = TestimonialsData.map(function (t, i) {
      const $item = $('<div class="masonry__item"></div>');

      const $article = $('<article class="testimonial-entry"></article>');

      $('<blockquote class="testimonial-entry__quote"></blockquote>')
        .text(t.quote)
        .appendTo($article);

      const $meta = $('<div class="testimonial-entry__meta"></div>');
      $('<span class="testimonial-entry__name"></span>').text(t.name).appendTo($meta);
      $('<span class="testimonial-entry__context"></span>')
        .text('AgentFire Client · ' + t.time + (t.excerpted ? ' · Excerpted' : ''))
        .appendTo($meta);
      $meta.appendTo($article);

      if (t.screenshot) {
        $('<button type="button" class="testimonial-entry__original"></button>')
          .attr('data-screenshot', 'assets/images/testimonials/' + t.screenshot)
          .attr('data-name', t.name)
          .attr('aria-label', 'View original review from ' + t.name)
          .append(
            $('<span></span>').text('View original review'),
            $('<svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5"/></svg>')
          )
          .appendTo($article);
      }

      $article.appendTo($item);
      return $item;
    });

    $grid.append($items);
  }

  function bindEvents() {
    $(document).on('click', '.testimonial-entry__original', function () {
      open($(this));
    });

    $close.on('click', close);
    $backdrop.on('click', close);

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) close();
    });
  }

  function open($trigger) {
    $lastTrigger = $trigger;
    isOpen = true;

    $img.attr('src', $trigger.data('screenshot'));
    $img.attr('alt', 'Original Google review from ' + $trigger.data('name'));

    $modal.attr('aria-hidden', 'false').addClass('is-open');
    $('body').addClass('no-scroll');
    $close.trigger('focus');
    FocusTrap.activate($modal);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    FocusTrap.deactivate();
    $modal.attr('aria-hidden', 'true').removeClass('is-open');
    $('body').removeClass('no-scroll');

    // Drop the src so the image isn't held in memory/decoded while hidden.
    $img.attr('src', '');

    if ($lastTrigger && $lastTrigger.length) {
      $lastTrigger.trigger('focus');
    }
    $lastTrigger = null;
  }

  return { init };

})();
