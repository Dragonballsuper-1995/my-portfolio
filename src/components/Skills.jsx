import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-12">
                <h2 className="section-title">My <span className="gradient-text">Arsenal</span></h2>
                <p className="text-gray-200 max-w-2xl text-center">My technical expertise spans across AI development, machine learning, and web technologies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Machine Learning</span>
                            <span className="font-medium text-indigo-300">90%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-indigo-400/70 w-[90%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Natural Language Processing</span>
                            <span className="font-medium text-indigo-300">85%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-indigo-400/70 w-[85%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Python Programming</span>
                            <span className="font-medium text-indigo-300">95%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-indigo-400/70 w-[95%] rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Web Development</span>
                            <span className="font-medium text-indigo-300">80%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-indigo-400/70 w-[80%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">AI Model Deployment</span>
                            <span className="font-medium text-indigo-300">75%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-indigo-400/70 w-[75%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Data Analysis</span>
                            <span className="font-medium text-indigo-300">85%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-indigo-400/70 w-[85%] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-indigo-300">Technologies I Work In</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <span className="skill-badge">Python</span>
                    <span className="skill-badge">TensorFlow/PyTorch</span>
                    <span className="skill-badge">JavaScript</span>
                    <span className="skill-badge">HTML/CSS</span>
                    <span className="skill-badge">SQL</span>
                    <span className="skill-badge">Git</span>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Skills;
