/**
 * Better Days Therapy & Wellness, PLLC
 * Main JavaScript — Vanilla JS only, no dependencies
 * Built by Kirauni Strategies | Where Strategy Meets Excellence
 */

(function () {
  'use strict';

  /* ─── Scroll-triggered fade-up animations ─────────────────────────────── */
  function initFadeUp() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-up').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── Sticky nav scroll effect ────────────────────────────────────────── */
  function initStickyNav() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;

    var onScroll = function () {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ─── Active nav link ──────────────────────────────────────────────────── */
  function initActiveNav() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var links = document.querySelectorAll('.nav-link');

    links.forEach(function (link) {
      var href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === path || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Mobile menu ──────────────────────────────────────────────────────── */
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    var closeBtn = document.getElementById('mobile-close');

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  /* ─── FAQ Accordion ────────────────────────────────────────────────────── */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      var trigger = item.querySelector('.faq-trigger');
      var answer = item.querySelector('.faq-answer');

      if (!trigger || !answer) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            var otherTrigger = other.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ─── Privacy Consent Banner ───────────────────────────────────────────── */
  function initConsent() {
    var banner = document.getElementById('consent-banner');
    if (!banner) return;

    // Check if already accepted
    if (localStorage.getItem('bd_privacy_accepted')) {
      banner.classList.add('dismissed');
      return;
    }

    // Show after short delay
    setTimeout(function () {
      banner.style.display = 'flex';
      // Force reflow then remove dismissed class
      banner.offsetHeight;
      banner.classList.remove('dismissed');
    }, 900);

    var acceptBtn = document.getElementById('consent-accept');
    var learnLink = document.getElementById('consent-learn');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('bd_privacy_accepted', 'true');
        banner.classList.add('dismissed');
      });
    }

    // Keyboard accessibility
    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        localStorage.setItem('bd_privacy_accepted', 'true');
        banner.classList.add('dismissed');
      }
    });
  }

  /* ─── Contact Form ─────────────────────────────────────────────────────── */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var message = form.querySelector('#message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Build mailto link as fallback (no backend)
      var subject = encodeURIComponent('New Consultation Request from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (phone || 'Not provided') + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:info@betterdaystherapy.com?subject=' + subject + '&body=' + body;

      showFormMessage(
        'Thank you, ' + name + '. Your message has been prepared. If your email client did not open automatically, please email us directly at info@betterdaystherapy.com.',
        'success'
      );

      form.reset();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(msg, type) {
    var existing = document.getElementById('form-message');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.id = 'form-message';
    el.setAttribute('role', 'alert');
    el.style.cssText = [
      'padding: 1rem 1.25rem',
      'border-radius: 0.375rem',
      'font-size: 0.9375rem',
      'margin-top: 1rem',
      'line-height: 1.6',
      type === 'success'
        ? 'background: rgba(26,107,114,0.1); color: #0f4a50; border: 1px solid rgba(26,107,114,0.3);'
        : 'background: #fff0f0; color: #8b0000; border: 1px solid rgba(139,0,0,0.3);'
    ].join('; ');
    el.textContent = msg;

    var form = document.getElementById('contact-form');
    if (form) form.after(el);

    // Auto-remove after 10s
    setTimeout(function () { el.remove(); }, 10000);
  }

  /* ─── Smooth scroll for anchor links ──────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── Init ─────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initFadeUp();
    initStickyNav();
    initActiveNav();
    initMobileMenu();
    initFAQ();
    initConsent();
    initContactForm();
    initSmoothScroll();
  });

})();
