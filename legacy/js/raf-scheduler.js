(function() {
  'use strict';

  if (window.rafScheduler) return; // Singleton guard

  const scheduled = new Map(); // one-off tasks keyed by id
  const subscribers = new Map(); // persistent per-frame tasks keyed by id
  let ticking = false;

  function tick(ts) {
    // Copy current one-off tasks and clear before execution to allow re-scheduling
    const tasks = Array.from(scheduled.values());
    scheduled.clear();

    // Run one-off tasks
    for (let i = 0; i < tasks.length; i++) {
      try { tasks[i](ts); } catch (e) { /* swallow to keep loop alive */ }
    }

    // Run persistent subscribers
    if (subscribers.size > 0) {
      for (const fn of subscribers.values()) {
        try { fn(ts); } catch (_) {}
      }
    }

    // Continue ticking only if there is work
    if (scheduled.size > 0 || subscribers.size > 0) {
      requestAnimationFrame(tick);
    } else {
      ticking = false;
    }
  }

  function ensureTicking() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  }

  const api = {
    // Schedule a one-off task to run on the next frame (deduped by id)
    schedule(id, fn) {
      if (typeof fn !== 'function') return;
      scheduled.set(id, fn);
      ensureTicking();
    },
    // Subscribe a persistent task that runs every frame until unsubscribed
    subscribe(id, fn) {
      if (typeof fn !== 'function') return;
      subscribers.set(id, fn);
      ensureTicking();
    },
    unsubscribe(id) {
      subscribers.delete(id);
    },
    clear() {
      scheduled.clear();
      subscribers.clear();
      // Let the current frame finish; the loop will stop automatically
    }
  };

  window.rafScheduler = api;
})();
