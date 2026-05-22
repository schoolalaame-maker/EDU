/**
 * Animation & Interaction Scripts
 * Advanced animations and interactive features
 */

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========

/**
 * Intersection Observer for fade-in animations
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach(element => observer.observe(element));
});

// ========== NAVBAR INTERACTIONS ==========

const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navButtons = document.querySelector('.nav-buttons');

/**
 * Toggle hamburger menu
 */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });
}

/**
 * Close menu on link click
 */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

/**
 * Navbar scroll effect
 */
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add shadow on scroll
  if (scrollTop > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== BUTTON RIPPLE EFFECT ==========

/**
 * Add ripple effect to buttons
 */
function addRippleEffect() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.className.includes('btn')) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        const rippleEl = this.querySelector('.ripple');
        if (rippleEl) {
          rippleEl.remove();
        }

        this.appendChild(ripple);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', addRippleEffect);

// ========== FORM INTERACTIONS ==========

/**
 * Form validation and submission
 */
function setupForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn?.textContent;
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner spinner-sm"></span> Processing...';
      }

      try {
        // Simulate form submission
        await fetch(form.action || '#', {
          method: form.method || 'POST',
          body: new FormData(form)
        });

        LinguaX.showNotification('Form submitted successfully!', 'success');
        form.reset();
      } catch (error) {
        LinguaX.showNotification('Form submission failed', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupForms);

// ========== PARALLAX EFFECT ==========

/**
 * Parallax scrolling effect
 */
function setupParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', setupParallax);

// ========== CARD HOVER EFFECTS ==========

/**
 * Add 3D hover effects to cards
 */
function setup3DCards() {
  const cards = document.querySelectorAll('.feature-card, .language-card, .testimonial-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

document.addEventListener('DOMContentLoaded', setup3DCards);

// ========== TYPING ANIMATION ==========

/**
 * Typing animation for text elements
 * @param {HTMLElement} element - Element to animate
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in ms
 */
function typeAnimation(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ========== COUNTER ANIMATION ==========

/**
 * Animate counter numbers
 * @param {HTMLElement} element - Counter element
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  // Animate hero stats
  const stats = document.querySelectorAll('.stat h3');
  stats.forEach(stat => {
    const rect = stat.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const target = parseInt(stat.textContent);
      if (!isNaN(target)) {
        animateCounter(stat, target);
      }
    }
  });
});

// ========== SCROLL-TO-TOP BUTTON ==========

/**
 * Create and setup scroll to top button
 */
function setupScrollTopButton() {
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute('title', 'Scroll to top');
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', setupScrollTopButton);

// ========== MODAL INTERACTIONS ==========

/**
 * Setup modal interactions
 */
function setupModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn?.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupModals);

/**
 * Show modal
 * @param {string} modalId - Modal element ID
 */
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Close modal
 * @param {string} modalId - Modal element ID
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// ========== DROPDOWN INTERACTIONS ==========

/**
 * Setup dropdown interactions
 */
function setupDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle?.addEventListener('click', () => {
      dropdown.classList.toggle('active');
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', setupDropdowns);

// ========== NOTIFICATION STYLES ==========

/**
 * Add notification styles dynamically
 */
function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      z-index: 10000;
      min-width: 300px;
      animation: slideInRight 0.3s ease-out;
    }

    .notification-success {
      border-color: var(--color-secondary);
      background: rgba(34, 197, 94, 0.1);
    }

    .notification-error {
      border-color: var(--color-error);
      background: rgba(239, 68, 68, 0.1);
    }

    .notification-warning {
      border-color: var(--color-warning);
      background: rgba(245, 158, 11, 0.1);
    }

    .notification-info {
      border-color: var(--color-primary);
      background: rgba(124, 58, 237, 0.1);
    }

    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-md);
    }

    .notification-close {
      background: none;
      border: none;
      color: inherit;
      font-size: var(--font-size-lg);
      cursor: pointer;
    }

    .fade-out {
      animation: fadeOut 0.3s ease-out forwards;
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: translateX(20px);
      }
    }

    .scroll-top-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: var(--gradient-primary);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: var(--font-size-lg);
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: all var(--transition-base);
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
    }

    .scroll-top-btn.visible {
      opacity: 1;
      pointer-events: all;
    }

    .scroll-top-btn:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', addNotificationStyles);

// ========== SCROLL ANIMATION FOR ELEMENTS ==========

/**
 * Refresh observer on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Re-trigger intersection observer for visible elements
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
});

// Make animation functions globally available
window.LinguaXAnimations = {
  typeAnimation,
  animateCounter,
  showModal,
  closeModal,
  addRippleEffect,
  setupForms,
  setupParallax,
  setup3DCards,
  setupScrollTopButton,
  setupModals,
  setupDropdowns
};

console.log('✨ Animations & Interactions loaded successfully');
