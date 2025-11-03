// Prevent theme FOUC: set light mode early if chosen previously
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    }
  } catch (e) {
    // If localStorage is blocked, fail gracefully
  }
})();