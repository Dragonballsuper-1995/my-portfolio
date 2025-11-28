// Hero-only custom cursor
// Appends a lightweight cursor to #hero and follows mouse with interpolation
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    if (typeof window === 'undefined') return;

    // Respect reduced motion and touch devices
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse), (hover: none)').matches) return;

    // Allow an escape hatch: if page sets body.use-system-cursor, do not run
    if (document.body && document.body.classList && document.body.classList.contains('use-system-cursor')) return;

    // Create a minimal container (for opt-out class) and a single instant-tracking dot
    var cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden','true');
    // keep container empty (we only render the instant dot)
    document.body.appendChild(cursor);

    // instant-tracking dot (fixed) to match system cursor speed
    var dotInstant = document.createElement('div');
    dotInstant.className = 'cursor-dot-instant';
    dotInstant.setAttribute('aria-hidden','true');
    document.body.appendChild(dotInstant);

    // instant-tracking ring (fixed) to recreate the orb+halo look
    var ringInstant = document.createElement('div');
    ringInstant.className = 'cursor-ring-instant';
    ringInstant.setAttribute('aria-hidden','true');
    document.body.appendChild(ringInstant);

    // coordinates in viewport space
    var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;

    function onMove(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
      // position instant dot and ring using left/top so centering via CSS transform works
      if (dotInstant){
        dotInstant.style.left = mouseX + 'px';
        dotInstant.style.top = mouseY + 'px';
        dotInstant.classList.remove('cursor-hidden');
      }
      if (ringInstant){
        ringInstant.style.left = mouseX + 'px';
        ringInstant.style.top = mouseY + 'px';
        ringInstant.classList.remove('cursor-hidden');
      }
      // ensure visible when moving
      cursor.classList.remove('cursor-hidden');
    }

    function onEnter(){ cursor.style.opacity = '1'; }
    function onLeave(){ cursor.classList.remove('cursor-hover'); if (dotInstant) dotInstant.classList.add('cursor-hidden'); if (ringInstant) ringInstant.classList.add('cursor-hidden'); }

    // Global pointer handlers
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', function(){ /* nothing needed; we use client coords */ });

    // click pulse (apply to instant dot)
    window.addEventListener('pointerdown', function(){
      if (dotInstant) dotInstant.classList.add('cursor-click');
      if (ringInstant) ringInstant.classList.add('cursor-click');
    });
    window.addEventListener('pointerup', function(){
      if (dotInstant) dotInstant.classList.remove('cursor-click');
      if (ringInstant) ringInstant.classList.remove('cursor-click');
    });

    // Selectors
    var hoverSelector = 'a, button, .glass-button, .glass-button-primary, .nav-link, .dock-link, [role="button"]';
    var inputSelector = 'input, textarea, select, [contenteditable="true"]';

    // Pointer over/out only drive hover states now; do not hide the custom cursor anywhere
    function onGlobalPointerOver(e){
      var t = e.target;
      if (!t || !t.closest) return;
      // input hover: add input-specific classes to cursor for clearer focus hint
      if (t.closest(inputSelector)){
        if (dotInstant) dotInstant.classList.add('cursor-input');
        if (ringInstant) ringInstant.classList.add('cursor-input');
      }
      if (t.closest(hoverSelector)){
        if (dotInstant) dotInstant.classList.add('cursor-hover');
        if (ringInstant) ringInstant.classList.add('cursor-hover');
        cursor.classList.add('cursor-hover');
      }
    }

    function onGlobalPointerOut(e){
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest(inputSelector)){
        if (dotInstant) dotInstant.classList.remove('cursor-input');
        if (ringInstant) ringInstant.classList.remove('cursor-input');
      }
      if (t.closest(hoverSelector)){
        if (dotInstant) dotInstant.classList.remove('cursor-hover');
        if (ringInstant) ringInstant.classList.remove('cursor-hover');
        cursor.classList.remove('cursor-hover');
      }
    }

    document.addEventListener('pointerover', onGlobalPointerOver, true);
    document.addEventListener('pointerout', onGlobalPointerOut, true);

    // Keyboard focus should also reflect hover/input state for accessibility
    document.addEventListener('focusin', function(e){
      if (e.target && e.target.matches && e.target.matches(inputSelector)){
        if (dotInstant) dotInstant.classList.add('cursor-input');
        if (ringInstant) ringInstant.classList.add('cursor-input');
      }
      if (e.target && e.target.matches && e.target.matches(hoverSelector)){
        if (dotInstant) dotInstant.classList.add('cursor-hover');
        if (ringInstant) ringInstant.classList.add('cursor-hover');
        cursor.classList.add('cursor-hover');
      }
    });
    document.addEventListener('focusout', function(e){
      if (e.target && e.target.matches && e.target.matches(inputSelector)){
        if (dotInstant) dotInstant.classList.remove('cursor-input');
        if (ringInstant) ringInstant.classList.remove('cursor-input');
      }
      if (e.target && e.target.matches && e.target.matches(hoverSelector)){
        if (dotInstant) dotInstant.classList.remove('cursor-hover');
        if (ringInstant) ringInstant.classList.remove('cursor-hover');
        cursor.classList.remove('cursor-hover');
      }
    });

    // Fade cursor when pointer leaves the page/window, re-show on re-enter
    function hideCursorTemporary(){
      if (dotInstant) dotInstant.classList.add('cursor-hidden');
      if (ringInstant) ringInstant.classList.add('cursor-hidden');
    }
    function showCursorTemporary(){
      if (dotInstant) dotInstant.classList.remove('cursor-hidden');
      if (ringInstant) ringInstant.classList.remove('cursor-hidden');
    }
    // Detect leaving the document window
    window.addEventListener('mouseout', function(e){
      if (!e.relatedTarget && !e.toElement){
        hideCursorTemporary();
      }
    });
    // Also respect page visibility and window blur
    document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'hidden') hideCursorTemporary(); else showCursorTemporary(); });
    window.addEventListener('blur', hideCursorTemporary);
    window.addEventListener('focus', showCursorTemporary);

    // initialize position of instant dot and ring using left/top
    mouseX = window.innerWidth/2;
    mouseY = window.innerHeight/2;
    if (dotInstant){
      dotInstant.style.left = mouseX + 'px';
      dotInstant.style.top = mouseY + 'px';
    }
    if (ringInstant){
      ringInstant.style.left = mouseX + 'px';
      ringInstant.style.top = mouseY + 'px';
    }

    // --- Transient input helper label ---
    // create once and reuse
    var helper = document.createElement('div');
    helper.className = 'cursor-helper-label';
    helper.setAttribute('aria-hidden','true');
    document.body.appendChild(helper);
    var helperTimeout = null;

    function showHelperFor(target){
      if (!target) return;
      var text = target.getAttribute('aria-label') || target.placeholder || target.getAttribute('name') || 'Type here';
      helper.textContent = text;
      // position helper above the target when possible
      var r = target.getBoundingClientRect();
      var x = Math.round(r.left + r.width/2);
      var y = Math.round(r.top);
      helper.style.left = x + 'px';
      helper.style.top = (y) + 'px';
      helper.classList.add('visible');
      // clear any existing timeout
      if (helperTimeout) { clearTimeout(helperTimeout); helperTimeout = null; }
      // hide after 3s if still visible
      helperTimeout = setTimeout(hideHelper, 3000);
    }

    function hideHelper(){
      helper.classList.remove('visible');
      if (helperTimeout) { clearTimeout(helperTimeout); helperTimeout = null; }
    }

    // Show helper on focus and pointerenter for inputs
    document.addEventListener('focusin', function(e){
      if (!e.target) return;
      if (e.target.matches && e.target.matches('input, textarea, [contenteditable]')){
        showHelperFor(e.target);
      }
    });
    document.addEventListener('focusout', function(e){ if (e.target && e.target.matches && e.target.matches('input, textarea, [contenteditable]')) hideHelper(); });
    document.addEventListener('pointerenter', function(e){ if (e.target && e.target.matches && e.target.matches('input, textarea, [contenteditable]')) showHelperFor(e.target); }, true);
    document.addEventListener('pointerleave', function(e){ if (e.target && e.target.matches && e.target.matches('input, textarea, [contenteditable]')) hideHelper(); }, true);

    // No rAF loop to cancel — nothing to clean up here for now
  });
})();
