import React from 'react';
import { Share2, Linkedin, Github, Twitter, Instagram, GraduationCap, Briefcase, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Who Am I Card */}
          <div className="lg:col-span-2">
            <div className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Who am I?</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I'm Sujal Sanjay Chhajed, a Computer Science & Engineering student with a focus on AI, NLP, and full-stack web development. I’ve worked on diverse projects — from building AI-powered content generation tools to developing responsive, user-friendly websites.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My approach combines technical expertise with creative problem-solving. I thrive on building intelligent systems that bridge the gap between complex technology and practical user applications.
              </p>
            </div>
          </div>

          {/* Let's Connect Card */}
          <div className="lg:col-span-1">
            <div className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col justify-between text-center hover:bg-white/10 transition-colors duration-300">
              <div>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Let's Connect</h3>
                <p className="text-gray-400 text-sm mb-6">Follow me on social media</p>
              </div>
              <div>
                <div className="flex justify-center gap-5 mb-6">
                  <a href="https://www.linkedin.com/in/sujalchhajed925/" target="_blank" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://github.com/Dragonballsuper-1995/" target="_blank" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://x.com/sujal_chhajed" target="_blank" className="text-gray-400 hover:text-sky-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/sujalchhajed925/" target="_blank" className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <a href="#contact" className="block w-full py-3 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20">
                    Send a Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Education, Experience & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-6 h-6 text-indigo-300" />
              <h4 className="font-bold text-lg text-indigo-300">Education</h4>
            </div>
            <p className="text-gray-200 font-medium">Computer Science & Engineering</p>
            <p className="text-gray-400 text-sm mt-1">Currently pursuing my degree</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300 hover:bg-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="w-6 h-6 text-indigo-300" />
              <h4 className="font-bold text-lg text-indigo-300">Experience</h4>
            </div>
            <p className="text-gray-200 font-medium">AI Projects & Research</p>
            <p className="text-gray-400 text-sm mt-1">Specialized in NLP and Log Analysis</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-300" />
            Areas of Expertise
          </h4>
          <div className="flex flex-wrap gap-3">
            {['Machine Learning', 'Natural Language Processing', 'Web Development', 'AI Integration', 'Problem Solving', 'Full Stack'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
