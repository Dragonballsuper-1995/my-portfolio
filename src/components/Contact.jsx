import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/xqagjnpj", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setFormStatus("Thanks for your message! I'll get back to you soon.");
            form.reset();
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                 setFormStatus(result["errors"].map(error => error["message"]).join(", "));
            } else {
                 setFormStatus("Oops! There was a problem submitting your form");
            }
        }
    } catch (error) {
        setFormStatus("Oops! There was a problem submitting your form");
    }
  };

  return (
    <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
            <div className="contact-grid">
                <div className="contact-info">
                    <div className="contact-card glass-effect">
                        <Mail className="w-6 h-6" />
                        <h4>Email</h4>
                        <p>sujalchhajed925@gmail.com</p>
                        <a className="glass-button" href="https://mail.google.com/mail/?view=cm&fs=1&to=sujalchhajed925@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Open Gmail compose">Send an Email</a>
                    </div>
                    <div className="contact-card glass-effect">
                        <Phone className="w-6 h-6" />
                        <h4>Phone</h4>
                        <p>+91 9307346453</p>
                        <a className="glass-button" href="tel:+919307346453" aria-label="Call +91 9307346453">Call Me</a>
                    </div>
                </div>

                <form id="contact-form" onSubmit={handleSubmit} className="contact-form glass-effect" noValidate>
                    <input type="hidden" name="_subject" value="Portfolio contact message" />
                    <div aria-hidden="true" style={{position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden'}}>
                        <label>Do not fill this out if you're human: <input type="text" name="_gotcha" tabIndex="-1" /></label>
                    </div>
                    <div className="input-group">
                        <input type="text" name="name" placeholder="Full Name" required autoComplete="name" />
                        <input type="email" name="email" placeholder="Email Address" required autoComplete="email" />
                    </div>
                    <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
                    <button type="submit" className="btn">Send Message</button>
                    <p id="form-status" className="form-status" role="status" aria-live="polite">{formStatus}</p>
                </form>
            </div>
        </div>
    </section>
  );
};

export default Contact;
