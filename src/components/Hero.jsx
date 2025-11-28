import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'AI Developer',
        'NLP Specialist',
        'Web Designer',
        'Problem Solver',
        'Tech Enthusiast'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full">
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 order-1 md:order-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 border border-white/30">
              <img
                src="/assets/profile-pic-cropped.webp"
                alt="Sujal Sanjay Chhajed"
                className="w-full h-full object-cover"
                width="320"
                height="320"
                loading="eager"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 rotate-6 border border-white/20 animate-float-delayed">
              <span className="font-bold text-indigo-300">AI Developer</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 -rotate-6 border border-white/20 animate-float">
              <span className="font-bold text-indigo-300">ML Engineer</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 order-2 md:order-1">
          <h3 className="font-semibold mb-2 text-indigo-300 text-xl animate-fade-in-up">Hello, I'm</h3>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 animate-fade-in-up delay-100">
            Sujal Sanjay Chhajed
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-indigo-300 mb-4 min-h-[2.5rem] md:min-h-[3rem] animate-fade-in-up delay-200">
            <span ref={el}></span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed animate-fade-in-up delay-300">
            AI & software enthusiast passionate about crafting intelligent solutions — from NLP-powered systems to interactive web experiences. Skilled in blending deep learning with clean engineering to solve real-world challenges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-fade-in-up delay-400">
            <a href="#projects" className="w-full sm:w-1/2 py-3 px-6 rounded-lg font-semibold text-center bg-indigo-600 hover:bg-indigo-700 text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-500/25">
              View Projects
            </a>
            <a href="#contact" className="w-full sm:w-1/2 py-3 px-6 rounded-lg font-semibold text-center bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all transform hover:-translate-y-1">
              Contact Me
            </a>
          </div>

          <div className="mt-4 max-w-md animate-fade-in-up delay-500">
            <a href="/assets/Updated%20Resume.pdf" target="_blank" className="block w-full py-3 px-6 rounded-lg font-semibold text-center bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 backdrop-blur-sm transition-all">
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
