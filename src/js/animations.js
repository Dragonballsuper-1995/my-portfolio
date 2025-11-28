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

  // 2) Project card no-tilt animated effect
  // Replace 3D tilt with a lightweight, theme-matching animation: lift + glow + subtle shimmer.
  // We toggle a class on pointerenter/leave and focus for accessibility; CSS handles the animation.
  const projectCards = document.querySelectorAll('#projects .glass-card');
  projectCards.forEach(card => {
    // Use pointer events to support touch/pointer types; reduced-motion users will see no animation via CSS media queries
    card.addEventListener('pointerenter', () => card.classList.add('project-animate'));
    card.addEventListener('pointerleave', () => card.classList.remove('project-animate'));
    card.addEventListener('focusin', () => card.classList.add('project-animate'));
    card.addEventListener('focusout', () => card.classList.remove('project-animate'));
  });
});