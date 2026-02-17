(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  document.body.classList.add('js-enhanced');

  var targets = Array.prototype.slice.call(
    document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lead, .hero .hero-ctas, .panel, .card, .footer')
  );

  targets.forEach(function (el, index) {
    el.classList.add('reveal');
    var delay = index % 3;
    if (delay > 0) {
      el.setAttribute('data-delay', String(delay));
    }
  });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -6% 0px'
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
