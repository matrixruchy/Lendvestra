/* LENDVESTRA site helpers. The primary Supabase auth flow is embedded in index.html. */
(() => {
  'use strict';

  const menu = document.querySelector('#menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const contact = document.querySelector('#contactForm');
  if (contact) {
    contact.addEventListener('submit', (event) => {
      event.preventDefault();
      const feedback = document.querySelector('#feedback');
      if (feedback) {
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        feedback.textContent = 'Demo only: this form is not connected to a backend, so your message has not been sent.';
      }
    });
  }
})();
