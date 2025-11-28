import React, { useEffect } from 'react';

const Projects = () => {
    useEffect(() => {
        // Re-implement the mouse move logic for the cards if needed.
        // The original logic was in js/cards.js using Vanilla JS event listeners.
        // We can attach event listeners here.
        const cards = document.querySelectorAll('.project-card');

        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
            });
        };
    }, []);

  return (
    <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-12">
                <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
                <p className="text-gray-200 max-w-2xl text-center">Explore my latest projects where I've applied AI and software engineering to solve complex problems</p>
            </div>

            <div className="projects-grid">
                {/* Card 1: YouTube Title Generator */}
                <div className="project-card">
                    <div className="card-noise"></div>
                    <div className="card-image-wrapper">
                        <img src="/Assets/yt-title-desc-generator.webp" alt="YouTube Title Generator" className="card-image" />
                        <div className="card-gradient-dark"></div>
                        <div className="card-gradient-light"></div>
                    </div>
                    <div className="card-content">
                        <div className="card-text-container">
                            <h3 className="card-title">YouTube Title Generator</h3>
                            <p className="card-desc">AI-powered tool to generate SEO-friendly YouTube titles and descriptions using T5 and BART models.</p>
                            <div className="card-tags">
                                <span className="tag">T5 Model</span>
                                <span className="tag">BART</span>
                                <span className="tag">RAKE Algorithm</span>
                                <span className="tag">Gradio UI</span>
                            </div>
                            <div className="card-links">
                                <a href="https://huggingface.co/spaces/SujalChhajed925/yt-title-desc-generator" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>
                                <a href="https://github.com/Dragonballsuper-1995/yt-title-desc-generator" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: AnomLogBERT */}
                <div className="project-card">
                    <div className="card-noise"></div>
                    <div className="card-image-wrapper">
                        <img src="/Assets/anomlogbert.webp" alt="AnomLogBERT" className="card-image" />
                        <div className="card-gradient-dark"></div>
                        <div className="card-gradient-light"></div>
                    </div>
                    <div className="card-content">
                        <div className="card-text-container">
                            <h3 className="card-title">AnomLogBERT</h3>
                            <p className="card-desc">Deep learning framework for automated anomaly detection in system log files using transformer-based models.</p>
                            <div className="card-tags">
                                <span className="tag">all-MiniLM-L12-v2</span>
                                <span className="tag">Transformers</span>
                                <span className="tag">Log Analysis</span>
                                <span className="tag">Anomaly Detection</span>
                            </div>
                            <div className="card-links">
                                <a href="https://huggingface.co/spaces/ayush-shukla135/AnomLogBert" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>
                                <a href="https://github.com/Ayushs135/AnomLogBert" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Urban Escapade */}
                <div className="project-card">
                    <div className="card-noise"></div>
                    <div className="card-image-wrapper">
                        <img src="/Assets/urban-escapade.webp" alt="Urban Escapade" className="card-image" />
                        <div className="card-gradient-dark"></div>
                        <div className="card-gradient-light"></div>
                    </div>
                    <div className="card-content">
                        <div className="card-text-container">
                            <h3 className="card-title">Urban Escapade</h3>
                            <p className="card-desc">Interactive website showcasing India's diverse states with cultural, regional, and geographical information.</p>
                            <div className="card-tags">
                                <span className="tag">HTML5</span>
                                <span className="tag">CSS3</span>
                                <span className="tag">JavaScript</span>
                                <span className="tag">Responsive Design</span>
                            </div>
                            <div className="card-links">
                                <a href="https://siddharth-y26.github.io/Urban-Escapade/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>
                                <a href="https://github.com/Siddharth-Y26/Urban-Escapade" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 4: FPL Analytics Hub */}
                <div className="project-card">
                    <div className="card-noise"></div>
                    <div className="card-image-wrapper">
                        <img src="/Assets/fpl-analytics-hub.webp" alt="FPL Analytics Hub" className="card-image" />
                        <div className="card-gradient-dark"></div>
                        <div className="card-gradient-light"></div>
                    </div>
                    <div className="card-content">
                        <div className="card-text-container">
                            <h3 className="card-title">FPL Analytics Hub</h3>
                            <p className="card-desc">Automated analytics hub using Python, ML, and GitHub Actions to predict daily FPL player points.</p>
                            <div className="card-tags">
                                <span className="tag">Python</span>
                                <span className="tag">Machine Learning</span>
                                <span className="tag">GitHub Actions</span>
                                <span className="tag">Pandas</span>
                                <span className="tag">JavaScript</span>
                                <span className="tag">Tailwind CSS</span>
                                <span className="tag">Chart.js</span>
                            </div>
                            <div className="card-links">
                                <a href="https://dragonballsuper-1995.github.io/Fantasy_Premier_League_Analytics_Hub/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>
                                <a href="https://github.com/Dragonballsuper-1995/Fantasy_Premier_League_Analytics_Hub" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Projects;
