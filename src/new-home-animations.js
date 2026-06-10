// =====================================================
// new-home-animations.js
// Consolidated GSAP animations for the new homepage.
// Each section's animations are in clearly commented blocks.
// =====================================================

gsap.registerPlugin(ScrollTrigger);

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // SECTION 1: HEADER
  // =========================================

  // 1a. Desktop Header Entrance Animation
  gsap.to(".gsap-header", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.1
  });

  // Header hide on scroll down, show on scroll up
  const headerElement = document.querySelector('.gsap-header');
  if (headerElement) {
    let lastScrollY = window.scrollY;
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (self.direction === 1) { // scrolling down
          gsap.to(headerElement, { yPercent: -100, duration: 0.3, ease: "power2.out" });
        } else if (self.direction === -1) { // scrolling up
          gsap.to(headerElement, { yPercent: 0, duration: 0.3, ease: "power2.out" });
        }
      }
    });
  }


  // 1b. Desktop Dropdown Logic
  const servicesTrigger = document.querySelector('.has-dropdown');
  const megaMenu = document.querySelector('.mega-menu');
  if (servicesTrigger && megaMenu) {
    let timeout;

    servicesTrigger.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      gsap.to(megaMenu, {
        opacity: 1,
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "auto"
      });
    });

    servicesTrigger.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        gsap.to(megaMenu, {
          opacity: 0,
          y: 15,
          autoAlpha: 0,
          duration: 0.2,
          pointerEvents: "none"
        });
      }, 100);
    });
  }

  // 1c. Mobile Menu Toggle Logic
  const menuToggleBtn = document.getElementById('menuToggle');
  const menuCloseBtn = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggleBtn && menuCloseBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    menuCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // =========================================
  // SECTION 2: HERO
  // =========================================

  // 2a. Build logo marquee (invented brands with inline SVG marks)
  var marks = {
    hex: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 21 7v10l-9 5-9-5V7z"/></svg>',
    circ: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 18 18z"/></svg>',
    tri: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 22 20H2z"/></svg>',
    sq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12h8"/></svg>',
    ring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    orbit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l8 3v7c0 5-8 10-8 10S4 17 4 12V5z"/></svg>'
  };

  var brands = [
    ['layer', marks.hex], ['kanba', marks.circ], ['Sisyphus', marks.bolt],
    ['aven.', marks.tri], ['cloudforce', marks.cloud], ['Nexora', marks.sq],
    ['Vertex', marks.ring], ['Lumina', marks.star], ['Pulse', marks.drop],
    ['Quanta', marks.grid], ['Orbital', marks.orbit], ['Fortis', marks.shield],
    ['Stack', marks.hex], ['Cobalt', marks.ring]
  ];

  function makeLogo(name, svg) {
    var d = document.createElement('div');
    d.className = 'logo';
    d.innerHTML = svg + '<span>' + name + '</span>';
    return d;
  }

  var heroMarquee = document.getElementById('heroMarquee');
  if (heroMarquee) {
    function fillHeroMarquee() {
      brands.forEach(function (b) { heroMarquee.appendChild(makeLogo(b[0], b[1])); });
    }
    fillHeroMarquee(); fillHeroMarquee();
  }

  // 2b. Marquee animation: right -> left, seamless
  function startHeroMarquee() {
    if (!heroMarquee) return;
    var oneSet = heroMarquee.scrollWidth / 2;
    gsap.killTweensOf(heroMarquee);
    gsap.set(heroMarquee, { x: 0 });
    gsap.to(heroMarquee, {
      x: -oneSet,
      duration: 28,
      ease: 'none',
      repeat: -1
    });
  }

  // 2c. Rotating slideshow
  function startSlideshow() {
    var slides = document.querySelectorAll('#slideshow .slide');
    if (slides.length < 2) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 3500);
  }

  // 2d. GSAP entrance: heading -> subheading -> buttons -> image
  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl.fromTo('.anim-l',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.18 }
  );
  heroTl.fromTo('.anim-r',
    { opacity: 0, x: 60, scale: 0.96 },
    { opacity: 1, x: 0, scale: 1, duration: 0.9 },
    '-=0.1'
  );
  heroTl.fromTo(['.badge-years', '.badge-roi'],
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.7)' },
    '-=0.4'
  );
  heroTl.add(startHeroMarquee, '-=0.3');
  startSlideshow();

  // Recompute marquee width on resize
  var heroResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(heroResizeTimer);
    heroResizeTimer = setTimeout(startHeroMarquee, 250);
  });

  // =========================================
  // SECTION 3: PROBLEMS & GROWTH
  // =========================================
  (function() {
    var pgSection = document.querySelector('.problems-growth');
    if (!pgSection) return;

    var pgTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.problems-growth',
        start: 'top 80%',
        once: true
      },
      defaults: { ease: 'power3.out' }
    });

    // 1. heading + subheading
    pgTl.fromTo('.problems-growth .pg-anim',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.18 }
    );

    // 2. the two cards fade/scale in
    pgTl.fromTo('.pg-anim-card',
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.18 },
      '-=0.2'
    );

    // 3. rows inside cards stagger subtly
    pgTl.fromTo('.problems-growth .row',
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.45, stagger: 0.05 },
      '-=0.5'
    );

    // 4. CTA button
    pgTl.fromTo('.problems-growth .cta-wrap',
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.15'
    );
  })();

  // =========================================
  // SECTION 4: ABOUT US
  // =========================================
  (function() {
    var aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    var aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    aboutTl.fromTo('.about-gsap-heading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.about-gsap-subheading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .to('.about-gsap-img', {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        from: 'random'
      },
      ease: 'back.out(1.2)'
    }, '-=0.2')
    .to('.about-gsap-btn', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2');

    // Mobile slider logic
    var aboutSliderTrack = document.getElementById('about-slider-track');
    var aboutPrevBtn = document.getElementById('aboutPrevBtn');
    var aboutNextBtn = document.getElementById('aboutNextBtn');
    var aboutItems = document.querySelectorAll('.about-section .bento-item');
    var aboutCurrentIndex = 0;

    function aboutGoToSlide(index) {
      if (!aboutItems[index]) return;
      aboutSliderTrack.scrollTo({
        left: aboutItems[index].offsetLeft,
        behavior: 'smooth'
      });
    }

    if (aboutNextBtn) {
      aboutNextBtn.addEventListener('click', function() {
        if (aboutCurrentIndex < aboutItems.length - 1) {
          aboutCurrentIndex++;
        } else {
          aboutCurrentIndex = 0;
        }
        aboutGoToSlide(aboutCurrentIndex);
      });
    }

    if (aboutPrevBtn) {
      aboutPrevBtn.addEventListener('click', function() {
        if (aboutCurrentIndex > 0) {
          aboutCurrentIndex--;
        } else {
          aboutCurrentIndex = aboutItems.length - 1;
        }
        aboutGoToSlide(aboutCurrentIndex);
      });
    }

    if (aboutSliderTrack) {
      aboutSliderTrack.addEventListener('scroll', function() {
        var scrollPosition = aboutSliderTrack.scrollLeft;
        var itemWidth = aboutItems[0].offsetWidth;
        aboutCurrentIndex = Math.round(scrollPosition / itemWidth);
      });
    }
  })();

  // =========================================
  // SECTION 5: SERVICES (sticky card stack)
  // =========================================
  (function() {
    var svcCards = document.querySelectorAll('.services-stack .svc-card');
    if (!svcCards.length) return;

    svcCards.forEach(function(card) {
      var items = card.querySelectorAll('.svc-anim');
      gsap.set(items, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 75%',
        once: true,
        onEnter: function() {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12
          });
        }
      });
    });

    ScrollTrigger.refresh();
  })();

  // =========================================
  // SECTION 6: TOOLS / PLATFORMS
  // =========================================
  (function() {
    var platformsSection = document.querySelector('.platforms-section');
    if (!platformsSection) return;

    var toolsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.platforms-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    toolsTl.from('.platforms-section .section-title', {
      y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
    })
    .from('.platforms-section .divider', {
      scaleX: 0, opacity: 0, duration: 0.5, ease: 'power2.out'
    }, '-=0.3')
    .from('.tools-gsap-card', {
      y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)'
    }, '-=0.2');
  })();

  // =========================================
  // SECTION 7: TRACKING & ANALYTICS
  // =========================================
  (function() {
    var trackSection = document.querySelector('.tracking-section');
    if (!trackSection) return;

    var trackTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.tracking-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    trackTl.from('.track-gsap-center', {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
    })
    .from('.tracking-section .ellipse-bg', {
      opacity: 0, duration: 0.8, ease: 'power2.inOut'
    }, '-=0.2')
    .from('.track-gsap-card', {
      scale: 0.5, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)'
    }, '-=0.6');
  })();

  // =========================================
  // SECTION 8: WHY CHOOSE US
  // =========================================
  (function() {
    var wcuSection = document.querySelector('.why-choose-us');
    if (!wcuSection) return;

    var MOBILE = window.matchMedia('(max-width: 760px)').matches;

    gsap.fromTo('.wcu-anim-head',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.why-choose-us', start: 'top 80%', once: true }
      }
    );

    gsap.utils.toArray('.wcu-row').forEach(function(row) {
      var media = row.querySelector('.wcu-media');
      var points = row.querySelectorAll('.wcu-point');
      var fromLeft = !row.classList.contains('reverse');

      var tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: 'top 78%', once: true }
      });

      if (media && !MOBILE) {
        tl.fromTo(media,
          { opacity: 0, x: fromLeft ? -50 : 50, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
        );
      }

      tl.fromTo(points,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
        media && !MOBILE ? '-=0.45' : 0
      );
    });
  })();

  // =========================================
  // SECTION 9: INDUSTRIES
  // =========================================
  (function() {
    var indSection = document.querySelector('.industries-section');
    if (!indSection) return;

    var indTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.industries-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    indTl.from('.ind-gsap-header', {
      y: 20, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out'
    })
    .from('.ind-gsap-subheading', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out'
    }, '-=0.3')
    .from('.ind-gsap-paragraph', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out'
    }, '-=0.4')
    .to('.ind-gsap-card', {
      scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)',
      stagger: { amount: 0.8, from: 'random' }
    }, '-=0.2');

    // Mobile slider
    var indSlider = document.getElementById('indCardSlider');
    var indPrev = document.getElementById('indPrevSlide');
    var indNext = document.getElementById('indNextSlide');

    function indScrollAmount() {
      var card = indSlider.querySelector('.industry-card');
      return card.offsetWidth + 16;
    }

    if (indNext) {
      indNext.addEventListener('click', function() {
        indSlider.scrollBy({ left: indScrollAmount(), behavior: 'smooth' });
      });
    }
    if (indPrev) {
      indPrev.addEventListener('click', function() {
        indSlider.scrollBy({ left: -indScrollAmount(), behavior: 'smooth' });
      });
    }
  })();

  // =========================================
  // SECTION 10: OUR PROCESS (pinned scroll)
  // =========================================
  (function() {
    var procSection = document.querySelector('.process-section');
    if (!procSection) return;

    var activeState = {
      '--card-bg': '#FACC15', '--card-text': '#FFFFFF',
      '--card-desc': '#FFEDD5', '--icon-color': '#FFFFFF',
      opacity: 1, y: 0, ease: 'power2.out', duration: 0.8
    };
    var inactiveState = {
      '--card-bg': '#F3F4F6', '--card-text': '#111111',
      '--card-desc': '#6B7280', '--icon-color': '#6B7280',
      opacity: 1, y: 0, ease: 'power2.out', duration: 0.8
    };
    var hiddenState = { opacity: 0, y: 30 };

    var procCards = gsap.utils.toArray('.proc-gsap-card');
    var mm = gsap.matchMedia();

    // DESKTOP
    mm.add('(min-width: 1024px)', function() {
      gsap.set(procCards[0], hiddenState);
      gsap.set(procCards.slice(1), hiddenState);

      var entranceTl = gsap.timeline({
        scrollTrigger: { trigger: '.process-section', start: 'top 70%' }
      });
      entranceTl.from('.proc-gsap-title', { opacity: 0, y: 30, duration: 0.6 })
        .from('.proc-gsap-sub', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
        .to(procCards[0], activeState, '-=0.2');

      var scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.process-section', start: 'center center',
          end: '+=400%', pin: true, scrub: 1
        }
      });

      for (var i = 1; i < procCards.length; i++) {
        scrubTl.to(procCards[i - 1], inactiveState, 'step' + i);
        scrubTl.to(procCards[i], activeState, 'step' + i);
        scrubTl.to({}, { duration: 0.4 });
      }
    });

    // MOBILE / TABLET
    mm.add('(max-width: 1023px)', function() {
      gsap.set(procCards, Object.assign({}, inactiveState, { opacity: 0, y: 30 }));

      gsap.timeline({
        scrollTrigger: { trigger: '.process-section', start: 'top 75%' }
      })
      .fromTo('.proc-gsap-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.proc-gsap-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(procCards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.2');
    });
  })();

  // =========================================
  // SECTION 11: PORTFOLIO
  // =========================================
  (function() {
    var pfSection = document.querySelector('.portfolio-section');
    if (!pfSection) return;

    // Entrance animation
    var pfTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    pfTl.fromTo('.pf-anim-h',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
    )
    .fromTo('.pf-list',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.pf-panel',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    // Click-to-reveal logic
    var pfProjs = document.querySelectorAll('.pf-proj');
    var pfShots = document.querySelectorAll('.pf-shot');
    var pfPlaceholder = document.getElementById('pfPlaceholder');
    var pfActiveIdx = -1;

    pfProjs.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(btn.getAttribute('data-shot'), 10);

        // Update active button
        pfProjs.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Hide placeholder
        if (pfPlaceholder) {
          gsap.to(pfPlaceholder, { opacity: 0, duration: 0.3, onComplete: function() {
            pfPlaceholder.style.display = 'none';
          }});
        }

        // Fade out old shot, fade in new
        if (pfActiveIdx >= 0 && pfActiveIdx !== idx) {
          var oldShot = pfShots[pfActiveIdx];
          gsap.to(oldShot, { opacity: 0, duration: 0.3, onComplete: function() {
            oldShot.classList.remove('show');
          }});
        }

        if (idx !== pfActiveIdx) {
          var newShot = pfShots[idx];
          newShot.classList.add('show');
          gsap.fromTo(newShot,
            { opacity: 0, scale: 1.02 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
          );
          pfActiveIdx = idx;
        }
      });
    });
  })();

  // =========================================
  // SECTION 12: TESTIMONIALS (marquee)
  // =========================================
  (function() {
    var tsSection = document.querySelector('.testimonials-section');
    if (!tsSection) return;

    var DESKTOP = window.matchMedia('(min-width: 1025px)');

    // Entrance animation
    var tsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    tsTl.fromTo('.ts-intro > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }
    );

    if (DESKTOP.matches) {
      tsTl.fromTo('.ts-review-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 },
        '-=0.2'
      );
    }

    // Desktop marquee loop
    function setupTsMarquee() {
      var marquee = document.getElementById('tsMarquee');
      var original = marquee.querySelector('.ts-original-set');
      var clone = marquee.querySelector('.ts-loop-clone');
      if (!original || !clone) return;

      if (DESKTOP.matches) {
        clone.innerHTML = original.innerHTML;
        clone.style.display = 'grid';
        var setHeight = original.offsetHeight + 18;

        gsap.killTweensOf(marquee);
        gsap.set(marquee, { y: 0 });
        gsap.to(marquee, {
          y: -setHeight,
          duration: 38,
          ease: 'none',
          repeat: -1
        });
      } else {
        gsap.killTweensOf(marquee);
        gsap.set(marquee, { clearProps: 'transform' });
        clone.style.display = 'none';
      }
    }

    tsTl.add(setupTsMarquee, '+=0.1');

    var tsResizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(tsResizeTimer);
      tsResizeTimer = setTimeout(setupTsMarquee, 250);
    });
  })();

  // =========================================
  // SECTION 13: TEAM (carousel)
  // =========================================
  (function() {
    var teamSection = document.querySelector('.team-section');
    if (!teamSection) return;

    // Entrance animation
    var teamTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.team-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    teamTl.fromTo('.tm-gsap-head',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    )
    .fromTo('.tm-gsap-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    // Carousel nav
    var tmTrack = document.getElementById('tmTrack');
    var tmPrev = document.getElementById('tmPrevBtn');
    var tmNext = document.getElementById('tmNextBtn');

    function tmScrollAmount() {
      var card = tmTrack.querySelector('.tm-card');
      if (!card) return 300;
      return card.offsetWidth + 24;
    }

    if (tmNext) {
      tmNext.addEventListener('click', function() {
        tmTrack.scrollBy({ left: tmScrollAmount(), behavior: 'smooth' });
      });
    }
    if (tmPrev) {
      tmPrev.addEventListener('click', function() {
        tmTrack.scrollBy({ left: -tmScrollAmount(), behavior: 'smooth' });
      });
    }
  })();

  // =========================================
  // SECTION 14: FAQs (accordion + categories)
  // =========================================
  (function() {
    var faqSection = document.querySelector('.faq-section');
    if (!faqSection) return;

    var faqData = {
      social: [
        { q: "What does your Social Media Management service include?", a: "Our service includes platform strategy, high-quality content creation, posting schedules, active community engagement, paid social ads management, performance tracking, and comprehensive monthly reporting." },
        { q: "Which platforms do you manage?", a: "We manage all major platforms including Facebook, Instagram, LinkedIn, X (Twitter), TikTok, and Pinterest. We tailor our approach to the platforms where your target audience is most active." },
        { q: "How do you measure success?", a: "We measure success through key performance indicators (KPIs) such as engagement rate, follower growth, website traffic originating from social media, and ultimately, lead generation and conversions." },
        { q: "How soon can we expect to see results?", a: "While organic growth takes time (typically 3-6 months for significant momentum), paid social strategies can yield immediate visibility and leads within the first few weeks." },
        { q: "Can I see content before it's posted?", a: "Absolutely. We provide a content calendar for your review and approval two weeks in advance. Nothing goes live without your explicit sign-off." }
      ],
      landing: [
        { q: "What is the difference between a landing page and a website?", a: "A landing page is a standalone web page created specifically for a marketing or advertising campaign, designed with a single focus or call to action (CTA)." },
        { q: "Do you provide copywriting for the landing pages?", a: "Yes, our team of conversion copywriters crafts compelling, benefit-driven text designed to guide visitors toward taking action." },
        { q: "Will the landing pages be mobile responsive?", a: "100%. Every landing page we build is strictly optimized to look and perform flawlessly on smartphones and tablets." },
        { q: "How do you optimize landing pages for conversions?", a: "We use high-converting structures, clear CTAs, trust signals, rapid load times, and A/B testing to continuously improve the conversion rate." },
        { q: "Can you integrate the landing page with my CRM?", a: "Yes, we can integrate with almost any CRM or email marketing software, including Mailchimp, HubSpot, Salesforce, and GoHighLevel." }
      ],
      custom: [
        { q: "How long does it take to build a custom website?", a: "A standard custom website typically takes 4-8 weeks. E-commerce or highly complex sites may take 10-14 weeks depending on the required functionality." },
        { q: "Do I own the website once it is completed?", a: "Yes. Once the final payment is cleared, you retain 100% ownership of the website, its design, and all associated assets." },
        { q: "Will my website be SEO-friendly?", a: "Yes, we build all our websites adhering to technical SEO best practices, including proper site architecture, meta tags, schema markup, and optimized page speed." },
        { q: "Do you offer website maintenance post-launch?", a: "We offer ongoing maintenance packages that include security updates, daily backups, uptime monitoring, and monthly content updates." },
        { q: "Can you help redesign an existing website?", a: "Certainly. We conduct a thorough audit, identify UX/UI flaws, and redesign from the ground up to align with modern web standards." }
      ],
      google: [
        { q: "What is the minimum budget required for Google Ads?", a: "We typically recommend a minimum ad spend of $1,000/month to generate enough data for proper optimization and meaningful ROI." },
        { q: "Do you handle Search, Display, and Video ads?", a: "Yes, we manage Search, Display, YouTube Video, Shopping, and Performance Max campaigns tailored to your specific objectives." },
        { q: "How do you ensure you are targeting the right audience?", a: "We conduct exhaustive keyword research, analyze search intent, utilize negative keyword lists, and leverage Google's advanced audience targeting parameters." },
        { q: "What is included in your monthly management?", a: "Monthly management includes bid adjustments, keyword optimization, ad copy A/B testing, landing page consultation, budget pacing, and detailed performance reporting." },
        { q: "Will I have access to my Google Ads account?", a: "Yes, you will always have Admin access to your Google Ads account. Transparency is a core value of our agency." }
      ],
      ghl: [
        { q: "What is Go High Level (GHL)?", a: "Go High Level is a comprehensive, all-in-one marketing and CRM platform. It replaces software for email marketing, SMS, funnel building, scheduling, and pipeline management." },
        { q: "Can you set up automated follow-up sequences in GHL?", a: "Yes, we excel at building complex, multi-channel workflows automating SMS, email, and ringless voicemail follow-ups." },
        { q: "Will GHL integrate with my current website?", a: "Yes, GHL forms, chat widgets, and booking calendars can be seamlessly embedded into WordPress, Shopify, or any modern web platform." },
        { q: "Do you provide white-label GHL setups?", a: "Yes, for agency owners, we provide complete white-label SaaS setups, custom branding, snapshot creation, and sub-account configuration." },
        { q: "Is training included when you set up my GHL account?", a: "Absolutely. After setup, we provide a thorough onboarding call and recorded training videos to ensure your team is confident." }
      ]
    };

    var faqContainer = document.getElementById('faqContainer');
    var categoryButtons = faqSection.querySelectorAll('.faq-cat-btn');

    function renderFAQs(categoryKey) {
      var questions = faqData[categoryKey];
      if (!questions) return;
      faqContainer.innerHTML = '';

      questions.forEach(function(item) {
        var faqEl = document.createElement('div');
        faqEl.className = 'faq-item faq-gsap-item';
        faqEl.innerHTML =
          '<button class="faq-question">' + item.q + '<div class="faq-toggle-icon"></div></button>' +
          '<div class="faq-answer"><div class="faq-answer-inner">' + item.a + '</div></div>';
        faqContainer.appendChild(faqEl);

        var questionBtn = faqEl.querySelector('.faq-question');
        questionBtn.addEventListener('click', function() { toggleFAQ(faqEl); });
      });

      gsap.fromTo('.faq-gsap-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }

    function toggleFAQ(clickedFaq) {
      var isActive = clickedFaq.classList.contains('active');
      var allFaqs = faqContainer.querySelectorAll('.faq-item');

      allFaqs.forEach(function(faq) {
        if (faq !== clickedFaq && faq.classList.contains('active')) {
          faq.classList.remove('active');
          gsap.to(faq.querySelector('.faq-answer'), { height: 0, duration: 0.3, ease: 'power2.out' });
        }
      });

      var answer = clickedFaq.querySelector('.faq-answer');
      var inner = clickedFaq.querySelector('.faq-answer-inner');

      if (isActive) {
        clickedFaq.classList.remove('active');
        gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.out' });
      } else {
        clickedFaq.classList.add('active');
        gsap.to(answer, { height: inner.offsetHeight, duration: 0.4, ease: 'power2.out' });
      }
    }

    categoryButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        categoryButtons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-category');

        gsap.to('.faq-gsap-item', {
          y: -15, opacity: 0, duration: 0.2, stagger: 0.03,
          onComplete: function() { renderFAQs(cat); }
        });
      });
    });

    // Initial render
    renderFAQs('social');

    // Entrance animation for header + sidebar
    var faqEntranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    faqEntranceTl.fromTo('.faq-gsap-heading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.faq-gsap-subheading',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.faq-gsap-btn',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      '-=0.3'
    );

    // Resize handler for active accordion
    window.addEventListener('resize', function() {
      var activeFaq = faqContainer.querySelector('.faq-item.active');
      if (activeFaq) {
        var answer = activeFaq.querySelector('.faq-answer');
        var inner = activeFaq.querySelector('.faq-answer-inner');
        gsap.set(answer, { height: inner.offsetHeight });
      }
    });
  })();

  // =========================================
  // SECTION 15: FINAL CTA
  // =========================================
  (function() {
    var ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;

    var ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    ctaTl.fromTo('.cta-gsap-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.cta-gsap-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.cta-gsap-btn',
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.4'
    );
  })();

  // =========================================
  // SECTION 16: FOOTER
  // =========================================
  (function() {
    var footer = document.querySelector('.new-footer');
    if (!footer) return;

    // Stagger entrance for columns
    gsap.to('.ft-gsap-col', {
      scrollTrigger: {
        trigger: '.new-footer',
        start: 'top 85%'
      },
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    });

    // Mobile accordion logic
    var ftIsMobile = function() { return window.innerWidth <= 768; };
    var ftCols = footer.querySelectorAll('.ft-col');

    ftCols.forEach(function(col, index) {
      var header = col.querySelector('.ft-col-header');
      var content = col.querySelector('.ft-col-content');

      if (index === 0 && ftIsMobile()) {
        col.classList.add('active');
        content.style.display = 'flex';
      }

      header.addEventListener('click', function() {
        if (!ftIsMobile()) return;
        var isActive = col.classList.contains('active');

        ftCols.forEach(function(c) {
          c.classList.remove('active');
          c.querySelector('.ft-col-content').style.display = 'none';
        });

        if (!isActive) {
          col.classList.add('active');
          content.style.display = 'flex';
          gsap.fromTo(content,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        }
      });
    });

    window.addEventListener('resize', function() {
      if (!ftIsMobile()) {
        ftCols.forEach(function(col) {
          col.querySelector('.ft-col-content').style.display = 'flex';
        });
      } else {
        ftCols.forEach(function(col) {
          if (!col.classList.contains('active')) {
            col.querySelector('.ft-col-content').style.display = 'none';
          }
        });
      }
    });
  })();

});
