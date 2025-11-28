// Fireflies Glow Effect - Add fireflies to interactive elements on hover
(function() {
    'use strict';

    // Elements to add fireflies effect to
    const selectors = [
        '.glass-card',
        '.glass-button',
        '.glass-button-primary',
        '.glass-effect',
        '.social-icon',
        '.dock-link',
        '.skill-badge'
    ];

    // Create firefly container HTML
    function createFireflyContainer(count = 6) {
        const container = document.createElement('div');
        container.className = 'firefly-container';
        
        for (let i = 0; i < count; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            container.appendChild(firefly);
        }
        
        return container;
    }

    // Add fireflies to all matching elements
    function initFireflies() {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                // Skip if already has fireflies
                if (element.querySelector('.firefly-container')) {
                    return;
                }
                
                // Ensure element has position relative or absolute
                const position = window.getComputedStyle(element).position;
                if (position === 'static') {
                    element.style.position = 'relative';
                }
                
                // Determine number of fireflies based on element size
                let fireflyCount = 4; // Reduced default
                const rect = element.getBoundingClientRect();
                const area = rect.width * rect.height;
                
                if (area < 10000) {
                    fireflyCount = 2; // Small elements
                } else if (area < 50000) {
                    fireflyCount = 3; // Medium elements
                } else if (area < 100000) {
                    fireflyCount = 4; // Large elements
                } else {
                    fireflyCount = 5; // Very large elements (reduced from 8)
                }
                
                // Add firefly container
                const container = createFireflyContainer(fireflyCount);
                element.appendChild(container);
                
                // Pause animations for off-screen elements
                pauseFirefliesWhenOffscreen(element, container);
            });
        });
    }

    // Pause firefly animations when element is off-screen
    function pauseFirefliesWhenOffscreen(element, container) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const fireflies = container.querySelectorAll('.firefly');
                if (entry.isIntersecting) {
                    // Resume animations
                    fireflies.forEach(firefly => {
                        firefly.style.animationPlayState = 'running';
                    });
                } else {
                    // Pause animations to save performance
                    fireflies.forEach(firefly => {
                        firefly.style.animationPlayState = 'paused';
                    });
                }
            });
        }, {
            rootMargin: '100px', // Start/stop slightly before entering viewport
            threshold: 0
        });
        
        observer.observe(element);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFireflies);
    } else {
        initFireflies();
    }

    // Re-initialize on dynamic content changes (optional)
    // Useful if you add elements dynamically
    const observer = new MutationObserver((mutations) => {
        let shouldReinit = false;
        
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    selectors.forEach(selector => {
                        if (node.matches && node.matches(selector)) {
                            shouldReinit = true;
                        }
                        if (node.querySelector && node.querySelector(selector)) {
                            shouldReinit = true;
                        }
                    });
                }
            });
        });
        
        if (shouldReinit) {
            setTimeout(initFireflies, 100);
        }
    });

    // Start observing after initial load
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

})();
