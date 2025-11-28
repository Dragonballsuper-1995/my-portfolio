import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all">
              <Mail className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Email</h4>
              <p className="text-gray-300 mb-4">sujalchhajed925@gmail.com</p>
              <a
                className="py-2 px-6 rounded-lg bg-white/10 hover:bg-indigo-600 text-white font-medium border border-white/10 transition-all"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sujalchhajed925@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send an Email
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all">
              <Phone className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Phone</h4>
              <p className="text-gray-300 mb-4">+91 9307346453</p>
              <a
                className="py-2 px-6 rounded-lg bg-white/10 hover:bg-indigo-600 text-white font-medium border border-white/10 transition-all"
                href="tel:+919307346453"
              >
                Call Me
              </a>
            </div>
          </div>

          <form
            id="contact-form"
            action="https://formspree.io/f/xqagjnpj"
            method="POST"
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
          >
            <input type="hidden" name="_subject" value="Portfolio contact message" />
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>Do not fill this out if you're human: <input type="text" name="_gotcha" tabIndex="-1" /></label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                autoComplete="name"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                autoComplete="email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              required
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y"
            ></textarea>

            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all transform hover:scale-[1.02] mt-2 shadow-lg shadow-indigo-500/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
