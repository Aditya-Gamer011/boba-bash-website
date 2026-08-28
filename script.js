/**
 * Boba Bash Greater Noida - Interactive Scripts
 * Lightweight, accessible, zero-dependency.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFloatingPearls();
});

// Mobile menu toggle with full keyboard, outside-click & accessibility support
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'navLinks');

    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.classList.toggle('open', isOpen);
    };

    const closeMenu = () => {
      navLinks.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('open');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        toggle.focus();
      }
    });
  }
}

// Gentle ambient floating boba pearls in background
function initFloatingPearls() {
  const container = document.getElementById('bobaCanvas');
  if (!container) return;

  // Respect user reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const pearlCount = 12;
  for (let i = 0; i < pearlCount; i++) {
    createPearl(container, true);
  }
}

function createPearl(container, initial = false) {
  const pearl = document.createElement('div');
  pearl.className = 'floating-pearl';
  
  const size = Math.floor(Math.random() * 16) + 12; // 12px to 28px
  const leftPos = Math.random() * 94 + 3; // 3% to 97% vw
  const duration = Math.random() * 14 + 18; // 18s to 32s
  const delay = initial ? -(Math.random() * duration) : Math.random() * 4;

  pearl.style.width = `${size}px`;
  pearl.style.height = `${size}px`;
  pearl.style.left = `${leftPos}vw`;
  pearl.style.animationDuration = `${duration}s`;
  pearl.style.animationDelay = `${delay}s`;

  container.appendChild(pearl);
}
