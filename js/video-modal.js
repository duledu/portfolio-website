/**
 * video-modal.js
 * Lightweight accessible lightbox for the homepage Video Showcase
 * section. Videos are hosted on Cloudflare R2 as direct public MP4
 * URLs — cards only carry a poster image + data-video-src. The
 * native <video> element is created here, and only once a card is
 * opened. Closing the modal releases and removes it again, so
 * nothing keeps loading or playing in the background.
 */

const VideoModal = (function () {

  let $modal, $frame, $close, $backdrop;
  let $lastTrigger = null;
  let isOpen = false;

  function init() {
    $modal = $('.video-modal');
    if (!$modal.length) return;

    $frame    = $modal.find('.video-modal__frame');
    $close    = $modal.find('.video-modal__close');
    $backdrop = $modal.find('.video-modal__backdrop');

    bindEvents();
  }

  function bindEvents() {
    $(document).on('click', '.video-card__media[data-video-src]', function (e) {
      e.preventDefault();
      open($(this));
    });

    $close.on('click', close);
    $backdrop.on('click', close);

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) close();
    });
  }

  // A configured R2 URL is an absolute http(s) link. Anything else
  // (empty, or an unreplaced "R2_VIDEO_URL_..." placeholder) is
  // treated as not-yet-configured — we never attempt to load it.
  function isPlayableSrc(src) {
    return !!src && /^https?:\/\//i.test(src);
  }

  // ---- Build the player for the clicked card ----
  function buildPlayer($trigger) {
    const src   = $trigger.data('video-src');
    const title = $trigger.data('video-title') || 'Video';

    if (!isPlayableSrc(src)) {
      return $('<div class="video-modal__empty"></div>').append(
        $('<p></p>').text('Video source not set yet — add an R2 video URL to this card’s data-video-src attribute.')
      );
    }

    return $('<video></video>', {
      class: 'video-modal__video',
      src: src,
      controls: true,
      playsinline: true,
      preload: 'metadata',
      title: title
    });
  }

  function open($trigger) {
    $lastTrigger = $trigger;
    isOpen = true;

    $frame.empty().append(buildPlayer($trigger));

    $modal.attr('aria-hidden', 'false').addClass('is-open');
    $('body').addClass('no-scroll');
    $close.trigger('focus');
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    $modal.attr('aria-hidden', 'true').removeClass('is-open');
    $('body').removeClass('no-scroll');

    // Fully release the video (stop playback and drop the network
    // connection to R2) before removing the element.
    const video = $frame.find('video').get(0);
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    $frame.empty();

    if ($lastTrigger && $lastTrigger.length) {
      $lastTrigger.trigger('focus');
    }
    $lastTrigger = null;
  }

  return { init };

})();
