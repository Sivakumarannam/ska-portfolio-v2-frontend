import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, Shield, ArrowUp } from 'lucide-react';
import { playTechClick } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playTechClick(750);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#03060d] py-10 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            {PERSONAL_INFO.name} ({PERSONAL_INFO.displayName}) • Production Telecom Systems
          </span>
        </div>

        <div className="text-center sm:text-right space-y-1">
          <div>Client: Tata Communications Ltd | MasterCom Technology Services</div>
          <div className="text-slate-500 text-[11px]">
            Engineered with React 18, TypeScript, Tailwind CSS, FAISS & Web Audio API
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
          title="Return to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

