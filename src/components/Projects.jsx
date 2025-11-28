import React from 'react';
import './Projects.css'; // We'll move the card specific styles here or use inline tailwind

const ProjectCard = ({ title, description, tags, image, demoLink, githubLink }) => {
  return (
    <div className="project-card relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 group h-[400px] hover:-translate-y-2 transition-transform duration-300">
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="h-full w-full absolute top-0 left-0 transition-all duration-500 group-hover:h-2/5">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full transition-all duration-500 group-hover:justify-end">
         <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded bg-white/10 text-indigo-200 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <a href={demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
                Live Demo
              </a>
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center rounded bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-colors">
                GitHub
              </a>
            </div>
         </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "YouTube Title Generator",
      description: "AI-powered tool to generate SEO-friendly YouTube titles and descriptions using T5 and BART models.",
      tags: ["T5 Model", "BART", "RAKE Algorithm", "Gradio UI"],
      image: "/assets/yt-title-desc-generator.webp",
      demoLink: "https://huggingface.co/spaces/SujalChhajed925/yt-title-desc-generator",
      githubLink: "https://github.com/Dragonballsuper-1995/yt-title-desc-generator"
    },
    {
      title: "AnomLogBERT",
      description: "Deep learning framework for automated anomaly detection in system log files using transformer-based models.",
      tags: ["all-MiniLM-L12-v2", "Transformers", "Log Analysis", "Anomaly Detection"],
      image: "/assets/anomlogbert.webp",
      demoLink: "https://huggingface.co/spaces/ayush-shukla135/AnomLogBert",
      githubLink: "https://github.com/Ayushs135/AnomLogBert"
    },
    {
      title: "Urban Escapade",
      description: "Interactive website showcasing India's diverse states with cultural, regional, and geographical information.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: "/assets/urban-escapade.webp",
      demoLink: "https://siddharth-y26.github.io/Urban-Escapade/",
      githubLink: "https://github.com/Siddharth-Y26/Urban-Escapade"
    },
    {
      title: "FPL Analytics Hub",
      description: "Automated analytics hub using Python, ML, and GitHub Actions to predict daily FPL player points.",
      tags: ["Python", "Machine Learning", "GitHub Actions", "Pandas", "JavaScript", "Tailwind CSS", "Chart.js"],
      image: "/assets/fpl-analytics-hub.webp",
      demoLink: "https://dragonballsuper-1995.github.io/Fantasy_Premier_League_Analytics_Hub/",
      githubLink: "https://github.com/Dragonballsuper-1995/Fantasy_Premier_League_Analytics_Hub"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl text-center">
            Explore my latest projects where I've applied AI and software engineering to solve complex problems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
