/**
 * contact-form.js
 * AJAX submission for the Contact page inquiry form, backed by Formspree.
 * The <form action> in contact.html points straight at the Formspree
 * endpoint, so even if this script never runs (blocked, errors out, JS
 * disabled), a plain native submit still reaches Formspree and the email
 * still sends — it just redirects the whole page instead of showing the
 * inline loading/success/error states this script adds.
 */

const ContactForm = (function () {

  let $form, $submit, $label, $status;
  let isSubmitting = false;

  function init() {
    $form = $('#inquiry-form');
    if (!$form.length) return;

    if (!isConfigured($form.attr('action'))) {
      // Formspree endpoint hasn't been set up yet — leave the native form
      // alone rather than silently swallowing submissions with a fetch()
      // call to a placeholder URL.
      console.warn('ContactForm: form action still points at the Formspree placeholder — see the FORM SETUP NOTE in contact.html.');
      return;
    }

    $submit = $form.find('button[type="submit"]');
    $label  = $submit.find('.btn__label');
    $status = $('#form-status');

    $form.on('submit', handleSubmit);
  }

  function isConfigured(action) {
    return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(action || '');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    const formEl = $form.get(0);
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    setStatus(null);
    setLoading(true);

    fetch($form.attr('action'), {
      method: 'POST',
      body: new FormData(formEl),
      headers: { 'Accept': 'application/json' },
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Submission failed');
        setLoading(false);
        setStatus('success', "Thanks, your message is on its way. I'll get back to you within 24 business hours.");
        formEl.reset();
      })
      .catch(function () {
        setLoading(false);
        setStatus('error', 'Something went wrong sending that. Please try again, or email me directly at dusan@builtbyaxiom.net.');
      });
  }

  function setLoading(loading) {
    isSubmitting = loading;
    $submit.prop('disabled', loading);
    if ($label.length) $label.text(loading ? 'Sending…' : 'Send Message');
  }

  function setStatus(type, message) {
    if (!type) {
      $status.attr('hidden', true).removeClass('is-success is-error').text('');
      return;
    }
    $status
      .removeAttr('hidden')
      .removeClass('is-success is-error')
      .addClass(type === 'success' ? 'is-success' : 'is-error')
      .text(message);
  }

  return { init };

})();
