import React, { useEffect, useState } from 'react';

const Loader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress or track actual assets if needed
    // For now, we simulate progress to match the original feel
    const startTime = performance.now();
    const duration = 2000; // 2 seconds fake load

    const updateProgress = (currentTime) => {
        const elapsed = currentTime - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);

        setProgress(newProgress);

        if (newProgress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            setTimeout(() => {
                onLoaded();
            }, 500); // Slight delay after 100% before hiding
        }
    };

    requestAnimationFrame(updateProgress);

  }, [onLoaded]);

  return (
    <div id="site-loader" role="status" aria-live="polite">
        <div className="loader-card">
            <div className="loader-brand">
                <div className="loader-logo">SC</div>
                <div className="loader-text">
                    <div className="loader-title">Sujal Chhajed</div>
                    <div className="loader-sub">Preparing portfolio — loading assets</div>
                </div>
            </div>
            <div className="loader-progress">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-percent">{Math.round(progress)}%</div>
                <div className="loader-status" aria-live="polite">Preparing portfolio — loading assets</div>
            </div>
            <div className="spinner" aria-hidden="true"></div>
        </div>
    </div>
  );
};

export default Loader;
