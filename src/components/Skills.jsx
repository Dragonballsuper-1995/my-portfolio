import React from 'react';

const SkillBar = ({ name, percentage }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-200">{name}</span>
        <span className="font-medium text-indigo-300">{percentage}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-indigo-400/70 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Arsenal</span>
          </h2>
          <p className="text-gray-300 max-w-2xl text-center">
            My technical expertise spans across AI development, machine learning, and web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SkillBar name="Machine Learning" percentage={90} />
            <SkillBar name="Natural Language Processing" percentage={85} />
            <SkillBar name="Python Programming" percentage={95} />
          </div>
          <div>
            <SkillBar name="Web Development" percentage={80} />
            <SkillBar name="AI Model Deployment" percentage={75} />
            <SkillBar name="Data Analysis" percentage={85} />
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-indigo-300">Technologies I Work In</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Python', 'TensorFlow/PyTorch', 'JavaScript', 'HTML/CSS', 'SQL', 'Git'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-medium hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
