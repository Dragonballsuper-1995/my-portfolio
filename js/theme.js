// Sync navbar theme toggle with dock theme toggle and handle scroll/nav animations

document.addEventListener('DOMContentLoaded', () => {
  const navbarToggle = document.getElementById('navbar-theme-toggle');
  const dockToggle = document.getElementById('dock-theme-toggle');
  const mobileToggle = document.getElementById('mobile-theme-toggle');
  // Ensure Lucide icons render initially
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    try { lucide.createIcons(); } catch (e) {}
  }

  function updateThemeTooltips(isLight) {
    const tooltipText = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    const navbarTooltip = navbarToggle?.querySelector('.theme-tooltip');
    if (navbarTooltip) navbarTooltip.textContent = tooltipText;
    const dockTooltip = dockToggle?.querySelector('.theme-tooltip');
    if (dockTooltip) dockTooltip.textContent = tooltipText;
    const mobileTooltip = mobileToggle?.querySelector('.theme-tooltip');
    if (mobileTooltip) mobileTooltip.textContent = tooltipText;
  }

  function syncThemeToggles() {
    const isLight = document.documentElement.classList.contains('light-mode');
    [navbarToggle, dockToggle, mobileToggle].forEach(toggle => {
      if (!toggle) return;
      const sunIcon = toggle.querySelector('.theme-icon-sun');
      const moonIcon = toggle.querySelector('.theme-icon-moon');
      if (!sunIcon || !moonIcon) return;
      if (isLight) { sunIcon.style.display = 'none'; moonIcon.style.display = 'block'; }
      else { sunIcon.style.display = 'block'; moonIcon.style.display = 'none'; }
    });
    updateThemeTooltips(isLight);
  }

  // Apply theme with circular reveal animation
  function applyThemeWithAnimation(toggleElement) {
    const isLight = document.documentElement.classList.contains('light-mode');
    const willBeLight = !isLight;

    // Get click position from the toggle element
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    
    if (toggleElement) {
      const rect = toggleElement.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      document.documentElement.classList.toggle('light-mode');
      const theme = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
      try { localStorage.setItem('theme', theme); } catch (e) {}
      syncThemeToggles();
      if (typeof lucide !== 'undefined') { lucide.createIcons(); }
      return;
    }

    // Use View Transition API for smooth circular reveal
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('light-mode');
      const theme = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
      try { localStorage.setItem('theme', theme); } catch (e) {}
      syncThemeToggles();
    });

    transition.ready.then(() => {
      // Set the CSS variables for the circular reveal position
      document.documentElement.style.setProperty('--theme-x', `${x}px`);
      document.documentElement.style.setProperty('--theme-y', `${y}px`);
    }).catch(error => {
      console.error("Error during View Transition setup:", error);
    });

    transition.finished.then(() => {
      if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    }).catch(error => {
      console.error("Error during View Transition finish:", error);
    });
  }

  if (navbarToggle) {
    navbarToggle.addEventListener('click', (e) => {
      applyThemeWithAnimation(navbarToggle);
    });
  }

  // Dock toggle should also switch theme
  if (dockToggle) {
    dockToggle.addEventListener('click', (e) => {
      applyThemeWithAnimation(dockToggle);
    });
  }

  // Mobile toggle if it exists
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      applyThemeWithAnimation(mobileToggle);
    });
  }

  const observer = new MutationObserver(syncThemeToggles);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  syncThemeToggles();

  // Navbar & Dock Scroll Animation (Smooth)
  const header = document.querySelector('.header');
  const dock = document.getElementById('content-dock');
  const aboutSection = document.getElementById('about');
  let ticking = false;

  function handleNavbarDockScroll() {
    if (!aboutSection) return;
    const scrollY = window.scrollY;
    const aboutTop = aboutSection.offsetTop;
    const triggerPoint = aboutTop * 0.5; // 50% to About section
    const bufferZone = 50;
    if (scrollY >= triggerPoint - bufferZone) {
      header?.classList.add('is-visible');
      dock?.classList.add('is-hidden');
    } else {
      header?.classList.remove('is-visible');
      dock?.classList.remove('is-hidden');
    }
    ticking = false;
  }

  function requestTick() {
    if (window.rafScheduler) {
      window.rafScheduler.schedule('ui:navbarDock', () => { handleNavbarDockScroll(); });
    } else if (!ticking) {
      requestAnimationFrame(handleNavbarDockScroll);
      ticking = true;
    }
  }

  handleNavbarDockScroll();
  window.addEventListener('scroll', requestTick, { passive: true });

  // Section Scroll Animations
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'hero') return;
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.classList.remove('scroll-out');
        entry.target.style.opacity = '';
        entry.target.style.transform = '';
      } else {
        const rect = entry.target.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.bottom < windowHeight * 0.2) {
          entry.target.classList.remove('is-visible');
          entry.target.classList.add('scroll-out');
        } else if (rect.top > windowHeight * 0.8) {
          entry.target.classList.remove('is-visible');
          entry.target.classList.remove('scroll-out');
        }
      }
    });
  }, { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '0px' });
  sections.forEach(section => sectionObserver.observe(section));

  // Mobile menu
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
    });
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
    });
  }
});