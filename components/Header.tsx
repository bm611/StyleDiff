
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <i className="fa-solid fa-wand-magic-sparkles text-white text-xl"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Style<span className="text-indigo-400">Diff</span></h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Virtual Try-On • Identity Preserved</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-indigo-400 border-b-2 border-indigo-400 pb-1">Editor</a>
        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Showcase</a>
        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
      </nav>

      <button className="text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
        Documentation
      </button>
    </header>
  );
};

export default Header;
