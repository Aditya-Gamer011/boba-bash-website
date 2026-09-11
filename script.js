/**
 * Boba Bash Greater Noida - Interactive Scripts
 * Lightweight, accessible, zero-dependency.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});

// Mobile menu toggle with full keyboard, outside-click & accessibility support
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const backdrop = document.getElementById('menuBackdrop');

  if (toggle && navLinks) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'navLinks');

    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.classList.toggle('open', isOpen);
      if (backdrop) backdrop.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    };

    const closeMenu = () => {
      navLinks.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

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

    // Close on resize above mobile breakpoint (768px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }
}


