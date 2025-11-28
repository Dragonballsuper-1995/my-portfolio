import React from 'react';

export const BackgroundGlow = () => {
  return (
    <div className="fixed top-1/2 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(129,140,248,.5)_0%,rgba(167,139,250,.3)_100%)] blur-[150px] -translate-x-1/2 -translate-y-1/2 -z-10 animate-breathing pointer-events-none"></div>
  );
};
