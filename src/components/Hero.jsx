import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["AI Developer", "ML Engineer", "Web Developer"];
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    let ticker = setInterval(() => {
        tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [displayText, delta]);

  const tick = () => {
    let i = textIndex % texts.length;
    let fullText = texts[i];
    let updatedText = isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
        setDelta(prevDelta => prevDelta / 1.5); // Speed up when deleting
    }

    if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(2000); // Pause at end
    } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setTextIndex(prev => prev + 1);
        setDelta(150);
    } else if (!isDeleting && delta === 2000) {
        setDelta(150);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 order-1 md:order-2">
                <div className="relative">
                    <div className="rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 border border-white/30">
                        <img src="/Assets/profile-pic-cropped.webp" alt="Sujal Sanjay Chhajed" className="w-full h-full object-cover" width="320" height="320" loading="eager" decoding="async" fetchPriority="high" />
                    </div>
                    <div className="glass-card-inner absolute -top-4 -right-4 rounded-xl px-4 py-2 rotate-6">
                        <span className="font-bold text-indigo-300">AI Developer</span>
                    </div>
                    <div className="glass-card-inner absolute -bottom-4 -left-4 rounded-xl px-4 py-2 -rotate-6">
                        <span className="font-bold text-indigo-300">ML Engineer</span>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 order-2 md:order-1">
                <h3 className="font-semibold mb-2 text-indigo-300">Hello, I'm</h3>
                <h1 className="hero-name text-5xl md:text-7xl font-extrabold mb-4">
                    Sujal Sanjay Chhajed
                </h1>
                <h2 id="hero-subtitle" className="text-2xl md:text-3xl font-medium text-indigo-300 mb-4 min-h-[2.5rem] md:min-h-[3rem]">
                    <span id="typewriter-text">{displayText}</span><span className="typewriter-cursor">|</span>
                </h2>
                <p className="text-lg text-gray-200 mb-8 max-w-xl">
                    AI & software enthusiast passionate about crafting intelligent solutions — from NLP-powered systems to interactive web experiences. Skilled in blending deep learning with clean engineering to solve real-world challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <a href="#projects" className="glass-button-primary w-full sm:w-1/2">View Projects</a>
                    <a href="#contact" className="glass-button w-full sm:w-1/2">Contact Me</a>
                </div>
                <div className="mt-4 max-w-md">
                    <a href="https://dragonballsuper-1995.github.io/my-portfolio/Assets/Updated%20Resume.pdf" target="_blank" rel="noopener noreferrer" className="glass-button w-full">View Resume</a>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
