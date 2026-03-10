/**
 * main.js — Card accordion logic for João Pedro Gershenson's portfolio
 */

(function () {
  'use strict';

  const OPEN_CLASS = 'open';

  /**
   * Toggle a card open/closed.
   * Only one card can be open at a time.
   */
  function toggleCard(card) {
    const isOpen = card.classList.contains(OPEN_CLASS);

    // Close all cards
    document.querySelectorAll('.card').forEach(function (c) {
      c.classList.remove(OPEN_CLASS);
      c.setAttribute('aria-expanded', 'false');
    });

    // If it was closed, open it
    if (!isOpen) {
      card.classList.add(OPEN_CLASS);
      card.setAttribute('aria-expanded', 'true');

      // Smooth scroll so the card is fully visible on mobile
      setTimeout(function () {
        const rect = card.getBoundingClientRect();
        const isPartiallyHidden = rect.bottom > window.innerHeight;
        if (isPartiallyHidden) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  }

  /**
   * Initialise all cards.
   */
  function init() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
      // Accessibility defaults
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');

      // Click
      card.addEventListener('click', function () {
        toggleCard(card);
      });

      // Keyboard: Enter or Space to toggle
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();