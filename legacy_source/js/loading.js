// Loader script: waits for project images and fonts to be ready, then hides the overlay.
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('site-loader');
  if (!loader) return;
  // Progress elements
  const progressFill = loader.querySelector('.progress-fill');
  const progressPercent = loader.querySelector('.progress-percent');
  const statusEl = loader.querySelector('.loader-status');

  // Animation state (displayedPct is what the slider shows; targetPct is desired)
  let targetPct = 0;
  let displayedPct = 0;
  // speed so full range (0->100) takes about 1800ms when jumping all the way
  const speedPerMs = 100 / 1800; // percent per ms
  let rafId = null;
  let lastTs = null;

  function updateDisplay(dt) {
    if (displayedPct === targetPct) return;
    const diff = targetPct - displayedPct;
    const maxStep = speedPerMs * dt;
    if (Math.abs(diff) <= maxStep) {
      displayedPct = targetPct;
    } else {
      displayedPct += Math.sign(diff) * maxStep;
    }
    // clamp
    if (displayedPct < 0) displayedPct = 0;
    if (displayedPct > 100) displayedPct = 100;
    // apply to DOM
    if (progressFill) progressFill.style.height = displayedPct + 'vh';
    if (progressPercent) {
      progressPercent.textContent = Math.round(displayedPct) + '%';
      progressPercent.style.setProperty('--progress-pct', displayedPct);
    }
  }

  function tick(ts) {
    if (lastTs == null) lastTs = ts;
    const dt = ts - lastTs;
    lastTs = ts;
    updateDisplay(dt);
    if (displayedPct < targetPct) {
      rafId = requestAnimationFrame(tick);
    } else {
      // stop animation until next target change
      rafId = null;
      lastTs = null;
    }
  }

  function setTargetFromLoaded() {
    targetPct = Math.round((loaded / total) * 100);
    // start animation loop if not running
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // Collect images
  const imgs = Array.from(document.querySelectorAll('.project-card .card-image'));
  const totalFonts = (document.fonts && document.fonts.ready) ? 1 : 0;
  const total = Math.max(1, imgs.length + totalFonts); // avoid zero
  // Track images and fonts separately so we can surface better status messages
  let loadedImages = 0;
  let loadedFonts = 0;
  let loaded = 0; // convenience (derived from above)

  // legacy helper left but unused; kept for completeness
  function setProgress(n) {
    loaded = n;
    setTargetFromLoaded();
  }

  function setStatus(text) {
    if (!statusEl) return;
    statusEl.textContent = text;
  }

  function updateStatus() {
    // compute derived counts
    loaded = loadedImages + loadedFonts;
    // If fonts are expected and not yet loaded
    if (totalFonts > 0 && loadedFonts < totalFonts) {
      setStatus('Loading typefaces…');
      return;
    }
    // If there are images to load
    if (imgs.length > 0 && loadedImages < imgs.length) {
      setStatus(`Loading project images — ${loadedImages}/${imgs.length}`);
      return;
    }
    // If everything loaded but animation not yet finished
    if (loaded >= total && displayedPct < 100) {
      setStatus('Optimizing assets…');
      return;
    }
    // Completed
    if (loaded >= total && displayedPct >= 100) {
      setStatus('All set — enjoy the site!');
      return;
    }
    // Fallback
    setStatus('Preparing portfolio — loading assets');
  }

  // handle image loads
  imgs.forEach(img => {
    if (!img) { loadedImages++; setTargetFromLoaded(); updateStatus(); return; }
    if (img.complete && img.naturalWidth !== 0) {
      loadedImages++; setTargetFromLoaded(); updateStatus(); return;
    }
    const onFinish = () => {
      img.removeEventListener('load', onFinish);
      img.removeEventListener('error', onFinish);
      loadedImages++;
      setTargetFromLoaded();
      updateStatus();
    };
    img.addEventListener('load', onFinish);
    img.addEventListener('error', onFinish);
  });

  // fonts
  let fontsPromise = Promise.resolve();
  if (document.fonts && document.fonts.ready) {
    fontsPromise = document.fonts.ready.then(() => { loadedFonts++; setTargetFromLoaded(); updateStatus(); });
    // show fonts loading immediately
    updateStatus();
  }

  // Safety net: also wait for window load (optional)
  const windowLoad = new Promise(resolve => {
    if (document.readyState === 'complete') return resolve();
    window.addEventListener('load', () => resolve());
  });

  // Timeout fallback (longer) so loader doesn't hang
  const timeoutMs = 12000; // 12s

  // Start from initial progress (for cached images/fonts)
  // initialize counts from cached images
  imgs.forEach(img => { if (img && img.complete && img.naturalWidth !== 0) loadedImages++; });
  // if fonts already ready
  if (document.fonts && document.fonts.status === 'loaded') loadedFonts = totalFonts;
  setTargetFromLoaded();
  updateStatus();

  Promise.race([
    Promise.all([fontsPromise, windowLoad, new Promise(resolve => {
      // resolve when all images accounted for
      const check = setInterval(() => {
        if (loaded >= total) { clearInterval(check); resolve(); }
      }, 100);
    })]),
    new Promise(resolve => setTimeout(resolve, timeoutMs))
  ]).then(() => {
    // ensure target goes to 100
    targetPct = 100;
    // wait until displayedPct reaches targetPct (animated), then hold and fade
    const waitForFull = () => new Promise(resolve => {
      const check = () => {
        if (displayedPct >= 99.9) return resolve();
        requestAnimationFrame(check);
      };
      check();
    });
    waitForFull().then(() => {
      const holdMs = 2000; // show full progress for ~2 seconds
      // mark status done (after animation completes)
      setStatus('Done');
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => { loader.classList.add('removed'); loader.remove(); }, 900);
      }, holdMs);
    });
  }).catch(() => {
    // On timeout/error: still animate to 100 then hide after hold
    targetPct = 100;
    const waitForFull = () => new Promise(resolve => {
      const check = () => {
        if (displayedPct >= 99.9) return resolve();
        requestAnimationFrame(check);
      };
      check();
    });
    waitForFull().then(() => {
      const holdMs = 2000;
      setStatus('Done');
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => { loader.classList.add('removed'); loader.remove(); }, 900);
      }, holdMs);
    });
  });
});
