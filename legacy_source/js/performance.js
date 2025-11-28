// Performance Monitor & Optimization Script
// Monitors FPS and dynamically adjusts quality settings

(function() {
    'use strict';

    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let lowFpsCount = 0;
    
    // FPS monitoring
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        const elapsed = currentTime - lastTime;
        if (elapsed >= 1000) {
            fps = Math.round((frameCount * 1000) / elapsed);
            frameCount = 0;
            lastTime = currentTime;
            if (fps < 50) {
                lowFpsCount++;
                if (lowFpsCount >= 3) reduceQuality();
            } else if (fps >= 55) {
                lowFpsCount = Math.max(0, lowFpsCount - 1);
            }
        }
    }
    
    // Reduce quality when performance is poor
    function reduceQuality() {
        console.log('Performance mode: Reducing animation complexity');
        
        // Reduce fireflies
        const fireflyContainers = document.querySelectorAll('.firefly-container');
        fireflyContainers.forEach(container => {
            const fireflies = container.querySelectorAll('.firefly');
            fireflies.forEach((firefly, index) => {
                if (index >= 3) {
                    firefly.style.display = 'none';
                }
            });
        });
        
        // Simplify 3D effects
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.style.willChange = 'auto';
        });
        
        // Mark as optimized
        document.body.dataset.performanceMode = 'reduced';
        lowFpsCount = 0; // Reset counter
    }
    
    // Debounced resize handler for performance
    let resizeTimeout;
    function optimizedResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any cached dimensions
            if (window.meteorShower && window.meteorShower.onWindowResize) {
                window.meteorShower.onWindowResize();
            }
        }, 150);
    }
    
    // Intersection Observer for lazy animations
    const lazyAnimateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    // Observe elements that should animate on scroll
    function setupLazyAnimations() {
        const animateElements = document.querySelectorAll('.glass-card, .glass-effect');
        animateElements.forEach(el => {
            lazyAnimateObserver.observe(el);
        });
    }
    
    // Scroll-based quality adjustment
    let lastScrollY = 0;
    let scrollTimeout;
    let isScrolling = false;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        // Detect if user is actively scrolling
        if (!isScrolling && scrollDelta > 5) {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
        }
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set timeout to detect scroll end
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            document.body.classList.remove('is-scrolling');
        }, 150);
        
        lastScrollY = currentScrollY;
    }
    
    // Passive event listeners for better scroll performance
    function setupPassiveListeners() {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', optimizedResize, { passive: true });
    }
    
    // Preload critical resources
    function preloadResources() {
        const criticalImages = document.querySelectorAll('img[loading="eager"]');
        criticalImages.forEach(img => {
            if (!img.complete) {
                img.loading = 'eager';
            }
        });
    }
    
    // Optimize meteor canvas visibility based on scroll position
    function optimizeMeteorCanvas() {
        const heroSection = document.getElementById('hero');
        const meteorCanvas = document.getElementById('meteor-canvas-container');
        
        if (!heroSection || !meteorCanvas) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > -100;
        
        // Reduce opacity when scrolled away from hero
        if (isHeroVisible) {
            meteorCanvas.style.opacity = '1';
        } else {
            meteorCanvas.style.opacity = '0.3';
        }
    }
    
    // Initialize optimizations
    function init() {
        // Start FPS monitoring (centralized)
        if (window.rafScheduler) {
            window.rafScheduler.subscribe('perf:fps', measureFPS);
        } else {
            // Fallback to its own loop if scheduler not available yet
            const loop = () => { measureFPS(); requestAnimationFrame(loop); };
            requestAnimationFrame(loop);
        }
        
        // Setup performance optimizations
        setupPassiveListeners();
        setupLazyAnimations();
        preloadResources();
        
        // Optimize meteor canvas on scroll
        window.addEventListener('scroll', () => {
            if (window.rafScheduler) {
                window.rafScheduler.schedule('perf:meteorCanvas', optimizeMeteorCanvas);
            } else {
                requestAnimationFrame(optimizeMeteorCanvas);
            }
        }, { passive: true });
        
        // Initial check
        optimizeMeteorCanvas();
        
        // Log initial performance
        console.log('Performance optimizations loaded');
        
        // Detect high refresh rate displays
        if (window.screen && window.screen.refreshRate) {
            if (window.screen.refreshRate >= 120) {
                document.documentElement.dataset.highRefreshRate = 'true';
                console.log(`High refresh rate detected: ${window.screen.refreshRate}Hz`);
            }
        }
    }
    
    // Wait for DOM and critical resources
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose FPS for debugging
    if (window.location.search.includes('debug=true')) {
        const fpsCounter = document.createElement('div');
        fpsCounter.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #0f0;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(fpsCounter);
        
        setInterval(() => {
            fpsCounter.textContent = `FPS: ${fps}`;
            fpsCounter.style.color = fps >= 55 ? '#0f0' : fps >= 30 ? '#ff0' : '#f00';
        }, 100);
    }
    
})();
