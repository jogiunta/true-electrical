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

  var sliders = Array.prototype.slice.call(document.querySelectorAll('[data-ba-slider]'));
  sliders.forEach(function (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('[data-slide]'));
    var dotsWrap = slider.querySelector('[data-dots]');
    var prevBtn = slider.querySelector('[data-prev]');
    var nextBtn = slider.querySelector('[data-next]');

    if (!slides.length || !dotsWrap || !prevBtn || !nextBtn) {
      return;
    }

    var index = 0;

    function renderDots() {
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, dotIndex) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'ba-dot';
        dot.setAttribute('aria-label', 'View project ' + String(dotIndex + 1));
        if (dotIndex === index) {
          dot.classList.add('is-active');
        }
        dot.addEventListener('click', function () {
          index = dotIndex;
          update();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('is-active', slideIndex === index);
      });
      var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.ba-dot'));
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === index);
      });
    }

    prevBtn.addEventListener('click', function () {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });

    nextBtn.addEventListener('click', function () {
      index = (index + 1) % slides.length;
      update();
    });

    slider.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        prevBtn.click();
      }
      if (event.key === 'ArrowRight') {
        nextBtn.click();
      }
    });

    slider.tabIndex = 0;
    renderDots();
    update();
  });
})();
