// Enhancements: Typewriter subtitle + 3D tilt

document.addEventListener('DOMContentLoaded', () => {
  // 1) Infinite Typewriter for the subtitle under the name
  const typewriterTextEl = document.getElementById('typewriter-text');
  const subtitles = [
    'Tech Enthusiast',
    'AI Developer',
    'Software Engineer',
    'NLP Enthusiast'
  ];
  const typeSpeed = 80; // ms per char
  const deleteSpeed = 50; // ms per char when deleting
  const pauseTime = 2000; // pause at end before deleting

  if (typewriterTextEl) {
    let currentIndex = 0;
    let charIndex = 0; // number of characters currently visible
    let isDeleting = false;

    // Create a span for a single character with stable per-char delay
    const createCharSpan = (char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // keep spacing
      // Staggered delay based on index, capped to avoid long offsets
      const delay = Math.min(index * 0.05, 0.8);
      span.style.animationDelay = `${delay}s`;
      if (char === ' ') {
        span.style.display = 'inline-block';
        span.style.width = '0.35em';
      }
      return span;
    };

    // Remove the last character span if present
    const removeLastChar = () => {
      const last = typewriterTextEl.lastElementChild;
      if (last) typewriterTextEl.removeChild(last);
    };

    const typeEffect = () => {
      const currentText = subtitles[currentIndex];
      if (isDeleting) {
        // Remove one character without touching others (animations keep running)
        if (charIndex > 0) {
          removeLastChar();
          charIndex--;
          setTimeout(typeEffect, deleteSpeed);
        } else {
          // Move to next string
          isDeleting = false;
          currentIndex = (currentIndex + 1) % subtitles.length;
          setTimeout(typeEffect, 500);
        }
      } else {
        // Append the next character as a new span
        if (charIndex < currentText.length) {
          const nextChar = currentText.charAt(charIndex);
          typewriterTextEl.appendChild(createCharSpan(nextChar, charIndex));
          charIndex++;
          setTimeout(typeEffect, typeSpeed);
        } else {
          // All characters shown — pause then start deleting
          isDeleting = true;
          setTimeout(typeEffect, pauseTime);
        }
      }
    };
    // Start typing
    typeEffect();
  }

  // 2) 3D tilt only on PROJECT CARDS (Performance optimized with requestAnimationFrame)
  const interactive = document.querySelectorAll('#projects .glass-card');
  interactive.forEach(elem => {
    elem.style.transformStyle = 'preserve-3d';
    elem.style.willChange = 'transform'; // GPU acceleration hint
    
    let ticking = false;
    let mouseX = 0;
    let mouseY = 0;
    let rect = null;
    
    const updateTransform = () => {
      if (!rect) return;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (mouseY - centerY) / 20;
      const rotateY = (mouseX - centerX) / -20;
      elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      ticking = false;
    };
    
    elem.addEventListener('mouseenter', () => {
      rect = elem.getBoundingClientRect();
    });
    
    elem.addEventListener('mousemove', (e) => {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      if (!ticking) {
        requestAnimationFrame(updateTransform);
        ticking = true;
      }
    });
    
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      elem.style.willChange = 'auto'; // Release GPU resources
      rect = null;
    });
  });
});