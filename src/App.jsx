import React, { useState } from 'react';
import Header from './components/Header';
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

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader onLoaded={handleLoaded} />}
      {!loading && (
        <>
            <div className="background-glow"></div>
            <MeteorShower />
            <Fireflies />

            <Header />
            <main className="relative z-10">
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Contact />
                <Footer />
            </main>
            <Dock />
        </>
      )}
    </>
  );
}

export default App;
