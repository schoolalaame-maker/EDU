/**
 * Main JavaScript File
 * Primary application logic and utilities
 */

// ========== CONFIGURATION ==========
const CONFIG = {
  apiBaseURL: 'http://localhost:5000/api',
  environment: 'development',
  appName: 'LinguaX',
  version: '1.0.0'
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Perform API requests
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data
 */
async function apiCall(endpoint, options = {}) {
  try {
    const url = `${CONFIG.apiBaseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error.message);
    showNotification(error.message, 'error');
    throw error;
  }
}

/**
 * Show notification toast
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {object} - Validation result
 */
function validatePassword(password) {
  const result = {
    isStrong: true,
    feedback: []
  };

  if (password.length < 8) {
    result.isStrong = false;
    result.feedback.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    result.isStrong = false;
    result.feedback.push('Password must contain at least one uppercase letter');
  }

  if (!/[0-9]/.test(password)) {
    result.isStrong = false;
    result.feedback.push('Password must contain at least one number');
  }

  return result;
}

/**
 * Debounce function
 * @param {function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function}
 */
function debounce(callback, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

/**
 * Throttle function
 * @param {function} callback - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {function}
 */
function throttle(callback, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      callback(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Get element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement}
 */
function getID(id) {
  return document.getElementById(id);
}

/**
 * Get elements by class
 * @param {string} className - Class name
 * @returns {NodeList}
 */
function getClass(className) {
  return document.querySelectorAll(`.${className}`);
}

/**
 * Get elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
function query(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Add event listeners to multiple elements
 * @param {NodeList} elements - Elements
 * @param {string} event - Event type
 * @param {function} callback - Event callback
 */
function addEventListeners(elements, event, callback) {
  elements.forEach(element => {
    element.addEventListener(event, callback);
  });
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string}
 */
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Save to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage Error:', error.message);
  }
}

/**
 * Get from localStorage
 * @param {string} key - Storage key
 * @returns {*}
 */
function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Storage Error:', error.message);
    return null;
  }
}

/**
 * Remove from localStorage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Storage Error:', error.message);
  }
}

/**
 * Clear localStorage
 */
function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Storage Error:', error.message);
  }
}

/**
 * Copy to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard!', 'success');
    });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Copied to clipboard!', 'success');
  }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 * @param {string} elementId - Element ID
 */
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ========== INITIALIZATION ==========

/**
 * Initialize app
 */
function initializeApp() {
  console.log(`%c${CONFIG.appName} v${CONFIG.appVersion} initialized`, 'color: #7c3aed; font-size: 16px; font-weight: bold;');
  
  // Setup event listeners
  setupEventListeners();
  
  // Check authentication
  checkAuthentication();
  
  // Load user preferences
  loadUserPreferences();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle window resize for responsive checks
  window.addEventListener('resize', throttle(() => {
    console.log('Window resized');
  }, 300));

  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('Page hidden');
    } else {
      console.log('Page visible');
    }
  });
}

/**
 * Check user authentication status
 */
function checkAuthentication() {
  const token = getFromStorage('authToken');
  const userEmail = getFromStorage('userEmail');

  if (token && userEmail) {
    console.log(`Logged in as: ${userEmail}`);
    // Update UI for logged-in state
  } else {
    console.log('Not authenticated');
  }
}

/**
 * Load user preferences
 */
function loadUserPreferences() {
  const theme = getFromStorage('theme') || 'dark';
  const language = getFromStorage('language') || 'en';
  
  // Apply theme
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('lang', language);
}

// ========== EXPORTS ==========

// Make utilities globally available
window.LinguaX = {
  apiCall,
  showNotification,
  isValidEmail,
  validatePassword,
  debounce,
  throttle,
  getID,
  getClass,
  query,
  addEventListeners,
  formatDate,
  saveToStorage,
  getFromStorage,
  removeFromStorage,
  clearStorage,
  copyToClipboard,
  isInViewport,
  smoothScrollTo,
  CONFIG
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
