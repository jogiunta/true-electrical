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

  function createProjectGalleryMarkup(items) {
    return items.map(function (item, index) {
      var featuredClass = item.featured ? ' is-featured' : '';
      var loading = index < 2 ? 'eager' : 'lazy';
      return (
        '<article class="gallery-card' + featuredClass + '">' +
          '<figure class="gallery-media">' +
            '<img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" width="' + escapeHtml(item.width) + '" height="' + escapeHtml(item.height) + '" loading="' + loading + '">' +
          '</figure>' +
          '<div class="gallery-body">' +
            '<span class="gallery-tag">' + escapeHtml(item.tag) + '</span>' +
            '<h3>' + escapeHtml(item.title) + '</h3>' +
            '<p>' + escapeHtml(item.copy) + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function createBeforeAfterPairMarkup(item, isSpotlight, index) {
    var imageLoading = index === 0 ? 'eager' : 'lazy';
    if (isSpotlight) {
      return (
        '<article class="before-after-spotlight-card">' +
          '<div class="before-after-images">' +
            '<figure class="before-after-media">' +
              '<img src="' + escapeHtml(item.before.src) + '" alt="' + escapeHtml(item.before.alt) + '" width="' + escapeHtml(item.before.width) + '" height="' + escapeHtml(item.before.height) + '" loading="eager">' +
              '<figcaption class="before-after-label">Before</figcaption>' +
            '</figure>' +
            '<figure class="before-after-media">' +
              '<img src="' + escapeHtml(item.after.src) + '" alt="' + escapeHtml(item.after.alt) + '" width="' + escapeHtml(item.after.width) + '" height="' + escapeHtml(item.after.height) + '" loading="eager">' +
              '<figcaption class="before-after-label">After</figcaption>' +
            '</figure>' +
          '</div>' +
          '<div class="before-after-spotlight-copy">' +
            '<div>' +
              '<h3>' + escapeHtml(item.title) + '</h3>' +
              '<p>' + escapeHtml(item.copy) + '</p>' +
            '</div>' +
            '<div class="before-after-detail">' +
              '<strong>What stands out</strong>' +
              '<span>' + escapeHtml(item.detail) + '</span>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    return (
      '<article class="before-after-card">' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.copy) + '</p>' +
        '<div class="before-after-images">' +
          '<figure class="before-after-media">' +
            '<img src="' + escapeHtml(item.before.src) + '" alt="' + escapeHtml(item.before.alt) + '" width="' + escapeHtml(item.before.width) + '" height="' + escapeHtml(item.before.height) + '" loading="' + imageLoading + '">' +
            '<figcaption class="before-after-label">Before</figcaption>' +
          '</figure>' +
          '<figure class="before-after-media">' +
            '<img src="' + escapeHtml(item.after.src) + '" alt="' + escapeHtml(item.after.alt) + '" width="' + escapeHtml(item.after.width) + '" height="' + escapeHtml(item.after.height) + '" loading="' + imageLoading + '">' +
            '<figcaption class="before-after-label">After</figcaption>' +
          '</figure>' +
        '</div>' +
      '</article>'
    );
  }

  function renderHomeGalleries() {
    var projectGallery = document.getElementById('project-gallery-grid');
    var beforeAfterSpotlight = document.getElementById('before-after-spotlight');
    var beforeAfterGrid = document.getElementById('before-after-grid');

    if (!projectGallery || !beforeAfterSpotlight || !beforeAfterGrid) {
      return;
    }

    var projects = [
      {
        src: 'static/img/Comer1.1.jpeg',
        alt: 'Commercial electrical buildout with clean lighting and conduit layout',
        width: 900,
        height: 506,
        tag: 'Commercial',
        title: 'Open commercial buildout',
        copy: 'Clean overhead routing, bright fixture layout, and a finished space ready for use.',
        featured: true
      },
      {
        src: 'static/img/Residential1.1.jpeg',
        alt: 'Residential kitchen with finished recessed lighting and under-cabinet lighting',
        width: 1344,
        height: 896,
        tag: 'Residential',
        title: 'Finished kitchen lighting',
        copy: 'Neat residential finish work with lighting that feels clean and intentional.',
        featured: true
      },
      {
        src: 'static/img/EV1.2.jpeg',
        alt: 'Installed EV charger equipment mounted on brick wall',
        width: 4032,
        height: 3024,
        tag: 'EV Charging',
        title: 'EV charger installation',
        copy: 'Dedicated EV charging work installed with a tidy finished appearance.'
      },
      {
        src: 'static/img/Comer1.2.jpeg',
        alt: 'Large commercial interior showing electrical work across an open floor area',
        width: 900,
        height: 506,
        tag: 'Commercial',
        title: 'Tenant improvement electrical work',
        copy: 'Straightforward commercial work for open spaces, lighting, and supporting power.'
      },
      {
        src: 'static/img/Residential2.1.JPG',
        alt: 'Finished residential electrical work in a modern interior',
        width: 4032,
        height: 3024,
        tag: 'Residential',
        title: 'Residential upgrade work',
        copy: 'Updated residential electrical service and finish work aligned with the remodeled space.'
      },
      {
        src: 'static/img/Residential3.1.jpeg',
        alt: 'Residential electrical finish work with clean final presentation',
        width: 4032,
        height: 3024,
        tag: 'Residential',
        title: 'Clean final finish',
        copy: 'Real project photo showing the kind of neat final result the brand is built around.'
      }
    ];

    var beforeAfterProjects = [
      {
        title: 'Court lighting and finish upgrade 1',
        copy: 'A detailed before-and-after pair from the indoor court project photos.',
        detail: 'Paired using the matching repo filenames: Tennis1-before.jpeg and Tennis1-after.jpeg.',
        before: {
          src: 'static/img/Tennis1-before.jpeg',
          alt: 'Before photo of indoor court lighting and electrical conditions',
          width: 1179,
          height: 793
        },
        after: {
          src: 'static/img/Tennis1-after.jpeg',
          alt: 'After photo of indoor court lighting and electrical improvements',
          width: 1029,
          height: 764
        }
      },
      {
        title: 'Court lighting and finish upgrade 2',
        copy: 'Another paired transformation from the same job sequence.',
        before: {
          src: 'static/img/Tennis2-before.jpeg',
          alt: 'Before photo of indoor court project area',
          width: 860,
          height: 623
        },
        after: {
          src: 'static/img/Tennis2-after.jpeg',
          alt: 'After photo of indoor court project area',
          width: 1031,
          height: 654
        }
      },
      {
        title: 'Court lighting and finish upgrade 3',
        copy: 'Visible improvement in overall finish and presentation.',
        before: {
          src: 'static/img/Tennis3-before.jpeg',
          alt: 'Before photo of indoor court electrical work',
          width: 1033,
          height: 870
        },
        after: {
          src: 'static/img/Tennis3-after.jpeg',
          alt: 'After photo of indoor court electrical work',
          width: 1178,
          height: 877
        }
      },
      {
        title: 'Court lighting and finish upgrade 4',
        copy: 'Paired images showing the job after the electrical improvements were completed.',
        before: {
          src: 'static/img/Tennis4-before.jpeg',
          alt: 'Before photo of court lighting area',
          width: 1178,
          height: 889
        },
        after: {
          src: 'static/img/Tennis4-after.jpeg',
          alt: 'After photo of court lighting area',
          width: 1029,
          height: 857
        }
      },
      {
        title: 'Court lighting and finish upgrade 5',
        copy: 'Another matched set for the transformation section.',
        before: {
          src: 'static/img/Tennis5-before.jpeg',
          alt: 'Before photo of tennis court project',
          width: 1179,
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
        title: 'Court lighting and finish upgrade 6',
        copy: 'Final paired project set from the before-and-after image group.',
        before: {
          src: 'static/img/Tennis6-before.jpeg',
          alt: 'Before photo of final indoor court area',
          width: 1179,
          height: 887
        },
        after: {
          src: 'static/img/Tennis6-after.jpeg',
          alt: 'After photo of final indoor court area',
          width: 1178,
          height: 654
        }
      }
    ];

    projectGallery.innerHTML = createProjectGalleryMarkup(projects);
    beforeAfterSpotlight.innerHTML = createBeforeAfterPairMarkup(beforeAfterProjects[0], true, 0);
    beforeAfterGrid.innerHTML = beforeAfterProjects.slice(1).map(function (item, index) {
      return createBeforeAfterPairMarkup(item, false, index + 1);
    }).join('');
  }

  renderHomeGalleries();

  if (!prefersReducedMotion) {
    document.body.classList.add('js-enhanced');

    var targets = Array.prototype.slice.call(
      document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lead, .hero .hero-ctas, .hero .hero-points, .panel, .card, .gallery-card, .before-after-card, .before-after-spotlight-card, .footer, .mobile-call-bar')
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
