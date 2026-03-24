(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getOrientation(width, height) {
    if (width === height) {
      return 'square';
    }
    return width > height ? 'landscape' : 'portrait';
  }

  function getShape(width, height) {
    var ratio = width / height;
    if (ratio >= 1.65) {
      return 'wide';
    }
    if (ratio <= 0.9) {
      return 'tall';
    }
    if (ratio >= 0.9 && ratio <= 1.15) {
      return 'balanced';
    }
    return 'standard';
  }

  function enrichImage(image) {
    var ratio = image.width / image.height;
    return {
      src: image.src,
      alt: image.alt,
      width: image.width,
      height: image.height,
      orientation: getOrientation(image.width, image.height),
      shape: getShape(image.width, image.height),
      ratio: ratio.toFixed(4),
      rotate: image.rotate || 0
    };
  }

  function enrichProject(project) {
    return {
      title: project.title,
      image: enrichImage(project.image)
    };
  }

  function enrichBeforeAfterProject(project) {
    return {
      title: project.title,
      before: enrichImage(project.before),
      after: enrichImage(project.after)
    };
  }

  var projects = [
    {
      title: 'Open commercial buildout',
      image: {
        src: 'static/img/Comer1.1.jpeg',
        alt: 'Commercial electrical buildout with clean lighting and conduit layout',
        width: 900,
        height: 506
      }
    },
    {
      title: 'Finished kitchen lighting',
      image: {
        src: 'static/img/Residential1.1.jpeg',
        alt: 'Residential kitchen with finished recessed lighting and under-cabinet lighting',
        width: 1344,
        height: 896
      }
    },
    {
      title: 'EV charger installation',
      image: {
        src: 'static/img/EV1.2.jpeg',
        alt: 'Installed EV charger equipment mounted on brick wall',
        width: 4032,
        height: 3024
      }
    },
    {
      title: 'Tenant improvement electrical work',
      image: {
        src: 'static/img/Comer1.2.jpeg',
        alt: 'Large commercial interior showing electrical work across an open floor area',
        width: 900,
        height: 506
      }
    },
    {
      title: 'Residential upgrade work',
      image: {
        src: 'static/img/Residential2.1.JPG',
        alt: 'Finished residential electrical work in a modern interior',
        width: 4032,
        height: 3024
      }
    },
    {
      title: 'Clean final finish',
      image: {
        src: 'static/img/Residential3.1.jpeg',
        alt: 'Residential electrical finish work with clean final presentation',
        width: 4032,
        height: 3024
      }
    }
  ].map(enrichProject);

  var commercialProjects = [
    projects[0],
    projects[2],
    projects[3]
  ];

  var residentialProjects = [
    projects[1],
    projects[4],
    projects[5]
  ];

  var beforeAfterProjects = [
    {
      title: 'The Pickle Place in West End, NC',
      before: {
        src: 'static/img/Tennis2-before.jpeg',
        alt: 'Before photo of commercial tennis court project area',
        width: 860,
        height: 623
      },
      after: {
        src: 'static/img/Tennis2-after.jpeg',
        alt: 'After photo of commercial tennis court project area',
        width: 1031,
        height: 654
      }
    },
    {
      title: 'Private residential in Park City, Utah',
      before: {
        src: 'static/img/Tennis3-before.jpeg',
        alt: 'Before photo of tennis court electrical work',
        width: 1033,
        height: 870
      },
      after: {
        src: 'static/img/Tennis3-after.jpeg',
        alt: 'After photo of tennis court electrical work',
        width: 1178,
        height: 877
      }
    },
    {
      title: 'Philadelphia Cricket Club',
      before: {
        src: 'static/img/Tennis4-before.jpeg',
        alt: 'Before photo of tennis court lighting area',
        width: 1178,
        height: 889
      },
      after: {
        src: 'static/img/Tennis4-after.jpeg',
        alt: 'After photo of tennis court lighting area',
        width: 1029,
        height: 857
      }
    },
    {
      title: 'Former St. Cornelius Church in Chicago',
      before: {
        src: 'static/img/Tennis5-before.jpeg',
        alt: 'Before photo of tennis court project',
        width: 1178,
        height: 769
      },
      after: {
        src: 'static/img/Tennis5-after.jpeg',
        alt: 'After photo of tennis court project',
        width: 1179,
        height: 765
      }
    },
    {
      title: 'Wild Wood Racquet and Wellness, Fort Wayne, IN',
      before: {
        src: 'static/img/Tennis6-before.jpeg',
        alt: 'Before photo of final commercial tennis court area',
        width: 1179,
        height: 887
      },
      after: {
        src: 'static/img/Tennis6-after.jpeg',
        alt: 'After photo of final commercial tennis court area',
        width: 1178,
        height: 654
      }
    }
  ].map(enrichBeforeAfterProject);

  var testimonials = [
    {
      quote: 'Great last minute honest, professional, friendly, and efficient service. Highly recommend',
      meta: '1061 Anderson Terrace, Des Plaines'
    },
    {
      quote: 'Great service and highly knowledgeable.',
      meta: 'Joseph Giunta Sr'
    },
    {
      quote: 'Fast and thorough! Would use again.',
      meta: '7917 Westwood Drive'
    },
    {
      quote: 'Fantastic service. Reasonable rates. Took time to explain the work. WILL use again.',
      meta: '4415 N Kenneth'
    }
  ];

  function createProjectGalleryMarkup(items) {
    return items.map(function (item, index) {
      var mediaClass = ' orientation-' + item.image.orientation + ' shape-' + item.image.shape;
      var loading = index < 2 ? 'eager' : 'lazy';
      return (
        '<article class="gallery-card' + mediaClass + '">' +
          '<figure class="gallery-media" style="--media-ratio:' + escapeHtml(item.image.ratio) + ';">' +
            '<img src="' + escapeHtml(item.image.src) + '" alt="' + escapeHtml(item.image.alt) + '" width="' + escapeHtml(item.image.width) + '" height="' + escapeHtml(item.image.height) + '" loading="' + loading + '">' +
          '</figure>' +
          '<div class="gallery-body">' +
            '<h3>' + escapeHtml(item.title) + '</h3>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function createBeforeAfterSlideMarkup(item, index) {
    var imageLoading = index === 0 ? 'eager' : 'lazy';

    function createMediaMarkup(image, label, loading, active) {
      var rotationClass = image.rotate ? ' is-rotated-' + String(image.rotate) : '';
      return (
        '<figure class="before-after-media orientation-' + escapeHtml(image.orientation) + ' shape-' + escapeHtml(image.shape) + (active ? ' is-active' : '') + '" style="--media-ratio:' + escapeHtml(image.ratio) + ';">' +
          '<img class="before-after-image' + rotationClass + '" src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.alt) + '" width="' + escapeHtml(image.width) + '" height="' + escapeHtml(image.height) + '" loading="' + loading + '">' +
          '<figcaption class="before-after-label">' + escapeHtml(label) + '</figcaption>' +
        '</figure>'
      );
    }

    return (
      '<article class="ba-slide before-after-slide" data-slide>' +
        '<div class="before-after-row-copy">' +
          '<h3>' + escapeHtml(item.title) + '</h3>' +
        '</div>' +
        '<div class="before-after-compare" data-compare>' +
          '<div class="before-after-viewport" aria-live="polite">' +
            createMediaMarkup(item.before, 'Before', imageLoading, true) +
            createMediaMarkup(item.after, 'After', imageLoading, false) +
          '</div>' +
          '<div class="before-after-toolbar">' +
            '<button class="btn btn-ghost before-after-toggle" type="button" data-compare-toggle aria-label="Show after image">View After</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function createTestimonialsMarkup(items) {
    return items.map(function (item) {
      return (
        '<article class="review-card">' +
          '<p class="review-rating" aria-label="5 out of 5 stars">★★★★★</p>' +
          '<p class="review-quote">"' + escapeHtml(item.quote) + '"</p>' +
          '<p class="review-meta">' + escapeHtml(item.meta) + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderHomePage() {
    var projectGallery = document.getElementById('project-gallery-grid');
    var beforeAfterSlides = document.getElementById('before-after-slides');
    var testimonialsGrid = document.getElementById('testimonials-grid');

    if (projectGallery) {
      projectGallery.innerHTML = createProjectGalleryMarkup(projects);
    }
    if (beforeAfterSlides) {
      beforeAfterSlides.innerHTML = beforeAfterProjects.map(createBeforeAfterSlideMarkup).join('');
    }
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = createTestimonialsMarkup(testimonials);
    }
  }

  function renderCommercialPage() {
    var gallery = document.getElementById('commercial-gallery-grid');
    var beforeAfterSlides = document.getElementById('commercial-before-after-slides');
    if (gallery) {
      gallery.innerHTML = createProjectGalleryMarkup(commercialProjects);
    }
    if (beforeAfterSlides) {
      beforeAfterSlides.innerHTML = beforeAfterProjects.map(createBeforeAfterSlideMarkup).join('');
    }
  }

  function renderResidentialPage() {
    var gallery = document.getElementById('residential-gallery-grid');
    var testimonialsGrid = document.getElementById('residential-testimonials-grid');
    if (gallery) {
      gallery.innerHTML = createProjectGalleryMarkup(residentialProjects);
    }
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = createTestimonialsMarkup(testimonials.slice(0, 2));
    }
  }

  renderHomePage();
  renderCommercialPage();
  renderResidentialPage();

  if (!prefersReducedMotion) {
    document.body.classList.add('js-enhanced');

    var targets = Array.prototype.slice.call(
      document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lead, .hero .hero-ctas, .hero .hero-points, .panel, .card, .gallery-card, .before-after-slide, .review-card, .footer')
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
    } else {
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
    }
  }

  var compareBlocks = Array.prototype.slice.call(document.querySelectorAll('[data-compare]'));
  compareBlocks.forEach(function (block) {
    var slides = Array.prototype.slice.call(block.querySelectorAll('.before-after-media'));
    var toggle = block.querySelector('[data-compare-toggle]');

    if (slides.length < 2 || !toggle) {
      return;
    }

    var showingAfter = false;

    function updateCompare() {
      slides[0].classList.toggle('is-active', !showingAfter);
      slides[1].classList.toggle('is-active', showingAfter);
      toggle.textContent = showingAfter ? 'View Before' : 'View After';
      toggle.setAttribute('aria-label', showingAfter ? 'Show before image' : 'Show after image');
    }

    toggle.addEventListener('click', function () {
      showingAfter = !showingAfter;
      updateCompare();
    });

    updateCompare();
  });

  var sliders = Array.prototype.slice.call(document.querySelectorAll('[data-ba-slider]'));
  sliders.forEach(function (slider) {
    var slidesWrap = Array.prototype.slice.call(slider.children).find(function (child) {
      return child.classList && child.classList.contains('ba-slides');
    });
    var slides = slidesWrap ? Array.prototype.slice.call(slidesWrap.children).filter(function (child) {
      return child.hasAttribute('data-slide');
    }) : [];
    var controls = Array.prototype.slice.call(slider.children).find(function (child) {
      return child.classList && child.classList.contains('ba-controls');
    });
    var dotsWrap = controls ? controls.querySelector('[data-dots]') : null;
    var prevBtn = controls ? controls.querySelector('[data-prev]') : null;
    var nextBtn = controls ? controls.querySelector('[data-next]') : null;

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
