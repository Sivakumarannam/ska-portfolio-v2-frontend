import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Shield, Sparkles, FolderGit2, Cpu, Mail, Menu, X, FileDown } from 'lucide-react';
import { toggleMute, getMuteState, playTechClick } from '../utils/sound';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResumeStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenResumeStudio }) => {
  const [muted, setMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMuteToggle = () => {
    const next = toggleMute();
    setMuted(next);
  };

  const navLinks = [
    { name: 'Projects & Chatflows', href: '#projects', icon: FolderGit2 },
    { name: 'Architecture Labs', href: '#demos', icon: Cpu },
    { name: 'Skills Matrix', href: '#skills', icon: Sparkles },
    { name: 'Experience', href: '#experience', icon: Shield },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#"
            onClick={() => playTechClick(1000)}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-glow-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#070b18] rounded-xl flex items-center justify-center">
                <span className="font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm">
                  SK
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-sans font-bold text-white text-base tracking-tight group-hover:text-cyan-400 transition-colors">
                  Siva Kumar Annam
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  Mr.A.S.K
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Tata Communications (MasterCom)</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => playTechClick(750)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400/80" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Terminal Button */}
            <button
              onClick={() => {
                playTechClick(900);
                onOpenTerminal();
              }}
              title="Open Interactive Terminal (Press ~)"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal</span>
              <kbd className="text-[10px] bg-cyan-900/50 px-1 rounded text-cyan-300 border border-cyan-500/20">~</kbd>
            </button>

            {/* Resume Studio Button */}
            <button
              onClick={() => {
                playTechClick(850);
                onOpenResumeStudio();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resumes</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleMuteToggle}
              title={muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900/60 border border-slate-800 rounded-lg transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => {
                playTechClick(800);
                onOpenTerminal();
              }}
              className="p-2 text-cyan-400 bg-slate-900 border border-cyan-500/30 rounded-lg"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070b18]/95 border-b border-cyan-500/20 px-4 pt-3 pb-5 space-y-2 backdrop-blur-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playTechClick(700);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={() => {
                playTechClick(850);
                setMobileMenuOpen(false);
                onOpenResumeStudio();
              }}
              className="flex-1 mr-2 flex items-center justify-center space-x-2 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resumes</span>
            </button>
            <button
              onClick={handleMuteToggle}
              className="p-2 text-slate-400 bg-slate-900 border border-slate-800 rounded-lg"
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

