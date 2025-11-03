// Handles contact form submission via Formspree with inline status messages
// 1) Create a form at https://formspree.io and replace FORM_ID in index.html action URL
// 2) Optionally customize messages below

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('contact-form');
    if(!form) return;

    const statusEl = document.getElementById('form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(text, type){
      if(!statusEl) return;
      statusEl.textContent = text || '';
      statusEl.classList.remove('success','error');
      if(type) statusEl.classList.add(type);
    }

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      setStatus('');

      // Basic client-side validation
      const name = form.elements['name']?.value?.trim();
      const email = form.elements['email']?.value?.trim();
      const message = form.elements['message']?.value?.trim();
      if(!name || !email || !message){
        setStatus('Please fill out all fields.', 'error');
        return;
      }

      // Disable button during send
      if(submitBtn){
        submitBtn.disabled = true; submitBtn.dataset.prevText = submitBtn.textContent; submitBtn.textContent = 'Sending…';
      }

      try{
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if(res.ok){
          form.reset();
          setStatus('Thanks! Your message was sent.', 'success');
        } else {
          let msg = 'Oops! Something went wrong. Please try again later.';
          try { const data = await res.json(); if(data && data.errors){ msg = data.errors.map(e=>e.message).join(', '); } } catch {}
          setStatus(msg, 'error');
        }
      } catch(err){
        setStatus('Network error. Please try again.', 'error');
      } finally {
        if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.prevText || 'Send Message'; }
      }
    });
  });
})();
