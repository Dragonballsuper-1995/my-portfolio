// Enhancements: Typewriter subtitle + 3D tilt + Scroll Reveal

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

  // 2) Project card animation
  const projectCards = document.querySelectorAll('.project-card'); // Updated to target .project-card
  projectCards.forEach(card => {
    // Add holographic class on hover (CSS handles visuals, this is just legacy hook if needed)
    // Actually our new CSS handles :hover natively on .project-card, so no JS needed for hover state
    // but we might want focus support
    card.addEventListener('focusin', () => card.classList.add('hover-active'));
    card.addEventListener('focusout', () => card.classList.remove('hover-active'));
  });

  // 3) Scroll Reveal Animation (AOS style)
  const revealElements = document.querySelectorAll('.glass-card, .project-card, .section-title, .contact-card, .skill-badge');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: unobserve if we only want it to happen once
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';

    // Stagger delay based on index (rough heuristic) or data attribute if we had it
    // But since we observe individually, they naturally stagger as you scroll.
    // However, for items in the same view (like a grid), let's add a small random delay
    // to items that appear at the same time? No, simple intersection is usually fine.
    // Let's just rely on the class addition.

    revealObserver.observe(el);
  });

  // Add the CSS class dynamically for the reveal state
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

});
