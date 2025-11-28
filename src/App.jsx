import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dock from './components/Dock';
import Loader from './components/Loader';
import MeteorShower from './components/MeteorShower';
import Fireflies from './components/Fireflies';
import { BackgroundGlow } from './components/BackgroundGlow';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="relative min-h-screen">
          <BackgroundGlow />
          <MeteorShower />
          <Fireflies />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </main>
          <Dock />
        </div>
      )}
    </>
  );
}

export default App;
