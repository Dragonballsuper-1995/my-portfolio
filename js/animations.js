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
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentText = subtitles[currentIndex];
      if (isDeleting) {
        typewriterTextEl.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % subtitles.length;
          setTimeout(typeEffect, 500);
          return;
        }
        setTimeout(typeEffect, deleteSpeed);
      } else {
        typewriterTextEl.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, pauseTime);
          return;
        }
        setTimeout(typeEffect, typeSpeed);
      }
    };
    typeEffect();
  }

  // 2) 3D tilt only on PROJECT CARDS
  const interactive = document.querySelectorAll('#projects .glass-card');
  interactive.forEach(elem => {
    elem.style.transformStyle = 'preserve-3d';
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (x - centerX) / -20;
      elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
});