/* ══════════════════════════════════════
   EduVerse College – Shared JavaScript
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Dark Mode Toggle ── */
  const darkToggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('ev-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  if (darkToggle) darkToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      const cur = html.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ev-theme', next);
      darkToggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  /* ── Scroll Reveal Observer ── */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters inside revealed elements
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.ev-reveal, .ev-reveal-zoom, .ev-reveal-left, .ev-reveal-right'
  ).forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Counter Animation ── */
  function animateCount(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = true;
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString('en-IN');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('en-IN');
      }
    }, 16);
  }

  // Also observe standalone counter elements
  document.querySelectorAll('[data-count]').forEach(function (el) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(el);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(el);
  });

  /* ── Back to Top ── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('show', window.scrollY > 400);
    });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Active Nav Link (based on current page) ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ev-navbar .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ── Navbar scroll shadow ── */
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.ev-navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
  });

  /* ── Rating Bar Animations (testimonials page) ── */
  document.querySelectorAll('.ev-rating-bar-fill').forEach(function (bar) {
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () { bar.style.width = targetWidth; }, 200);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    barObserver.observe(bar);
  });

});
