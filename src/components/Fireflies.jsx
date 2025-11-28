import React, { useEffect } from 'react';
import './Fireflies.css';

const Fireflies = () => {
  useEffect(() => {
    // Generate fireflies dynamically
    const container = document.querySelector('.fireflies');
    const fireflyCount = 20;

    if (container && container.children.length === 0) {
      for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';

        // Random positioning properties
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // 10-20s
        const delay = Math.random() * 10;

        firefly.style.top = `${top}%`;
        firefly.style.left = `${left}%`;
        firefly.style.animationDuration = `${duration}s`;
        firefly.style.animationDelay = `-${delay}s`;

        container.appendChild(firefly);
      }
    }
  }, []);

  return <div className="fireflies fixed inset-0 pointer-events-none z-0"></div>;
};

export default Fireflies;
