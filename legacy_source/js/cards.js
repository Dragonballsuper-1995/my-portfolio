document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const image = card.querySelector('.card-image');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const moveX = (x - 0.5) * -40;
      const moveY = (y - 0.5) * -40;
      image.style.setProperty('--move-x', `${moveX}px`);
      image.style.setProperty('--move-y', `${moveY}px`);
    });
    card.addEventListener('mouseleave', () => {
      image.style.setProperty('--move-x', '0px');
      image.style.setProperty('--move-y', '0px');
    });
  });
});
