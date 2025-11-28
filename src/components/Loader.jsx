import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0f172a] z-[100] flex items-center justify-center">
      <div className="loader-card w-[320px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Animated gradient border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer"></div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/30">
              SC
            </div>
            <div>
              <div className="text-white font-bold text-lg">Sujal Chhajed</div>
              <div className="text-indigo-300 text-sm animate-pulse">Preparing portfolio...</div>
            </div>
          </div>

          <div className="w-full">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-indigo-500 w-full animate-progress origin-left"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Loading assets</span>
              <span>100%</span>
            </div>
          </div>

          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
