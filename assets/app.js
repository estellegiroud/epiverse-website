(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Page scroll progress
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Mobile navigation
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
      document.body.classList.remove('menu-open');
    }));
  }

  // Intersection reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((element) => observer.observe(element));
  } else {
    revealEls.forEach((element) => element.classList.add('is-visible'));
  }

  // Accessible counter animation
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (element) => {
    const target = Number(element.dataset.counter || 0);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 900;
    const start = performance.now();
    const render = (time) => {
      const value = Math.round(Math.min((time - start) / duration, 1) * target);
      element.textContent = `${prefix}${value}${suffix}`;
      if (value < target) requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };
  if (!reduceMotion && counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .8 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => { counter.textContent = `${counter.dataset.prefix || ''}${counter.dataset.counter || '0'}${counter.dataset.suffix || ''}`; });
  }

  // Dashboard feature tabs
  const dashNav = document.querySelectorAll('[data-dashboard-tab]');
  const dashModules = document.querySelectorAll('[data-dashboard-module]');
  if (dashNav.length) {
    dashNav.forEach((button) => button.addEventListener('click', () => {
      const id = button.dataset.dashboardTab;
      dashNav.forEach((tab) => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-selected', String(tab === button)); });
      dashModules.forEach((module) => module.classList.toggle('active', module.dataset.dashboardModule === id));
    }));
  }

  // Product journey tabs
  const journeySteps = document.querySelectorAll('[data-journey-step]');
  const journeyContent = document.querySelectorAll('[data-journey-content]');
  if (journeySteps.length) {
    journeySteps.forEach((step) => step.addEventListener('click', () => {
      const id = step.dataset.journeyStep;
      journeySteps.forEach((item) => { item.classList.toggle('active', item === step); item.setAttribute('aria-selected', String(item === step)); });
      journeyContent.forEach((item) => item.classList.toggle('active', item.dataset.journeyContent === id));
    }));
  }

  // Campus hotspots
  const hotspots = document.querySelectorAll('[data-hotspot]');
  const detail = document.querySelector('[data-map-detail]');
  const detailKicker = document.querySelector('[data-detail-kicker]');
  const detailTitle = document.querySelector('[data-detail-title]');
  const detailText = document.querySelector('[data-detail-text]');
  const detailLink = document.querySelector('[data-detail-link]');
  if (hotspots.length && detail) {
    hotspots.forEach((spot) => spot.addEventListener('click', () => {
      hotspots.forEach((item) => item.classList.toggle('active', item === spot));
      if (detailKicker) detailKicker.textContent = spot.dataset.zoneId || 'ZONE';
      if (detailTitle) detailTitle.textContent = spot.dataset.zoneTitle || '';
      if (detailText) detailText.textContent = spot.dataset.zoneText || '';
      if (detailLink) detailLink.setAttribute('href', spot.dataset.zoneLink || 'produit.html');
      detail.classList.remove('is-updated');
      requestAnimationFrame(() => detail.classList.add('is-updated'));
    }));
  }

  // Small card tilt effect, disabled under motion reduction / touch device
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  // Ambient star canvas
  const canvas = document.getElementById('starfield');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0 };
    const stars = [];
    const count = Math.min(148, Math.floor(window.innerWidth / 11));

    const buildStars = () => {
      stars.length = 0;
      for (let index = 0; index < count; index += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + .22,
          a: Math.random() * .55 + .18,
          s: Math.random() * .15 + .02,
          hue: Math.random() > .78 ? 258 : 195,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = .72 + Math.sin(time * .0012 + star.phase) * .28;
        const px = star.x + (mouse.x - width / 2) * star.s * .04;
        const py = star.y + (mouse.y - height / 2) * star.s * .04;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${star.hue}, 100%, 82%, ${star.a * twinkle})`;
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', (event) => { mouse.x = event.clientX; mouse.y = event.clientY; }, { passive: true });
    resize();
    requestAnimationFrame(draw);
  }

  // Update copyright year
  document.querySelectorAll('[data-current-year]').forEach((element) => { element.textContent = String(new Date().getFullYear()); });
})();
