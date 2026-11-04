import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { InteractiveChatflowModal } from './components/InteractiveChatflowModal';
import { ProjectImageLightbox } from './components/ProjectImageLightbox';
import { InteractiveIncidentSimulator } from './components/InteractiveIncidentSimulator';
import { LiveRAGSimulator } from './components/LiveRAGSimulator';
import { LiveWeatherSimulator } from './components/LiveWeatherSimulator';
import { RecruiterCVStudio } from './components/RecruiterCVStudio';
import { SkillsMatrix } from './components/SkillsMatrix';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import { playTechClick } from './utils/sound';
import { FolderGit2, Cpu, Sparkles, Filter, Layers } from 'lucide-react';

export const App: React.FC = () => {
  // Modal states
  const [selectedChatflowProject, setSelectedChatflowProject] = useState<Project | null>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);
  const [isResumeStudioOpen, setIsResumeStudioOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Filter state for projects
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Active Lab Demo tab
  const [activeLabTab, setActiveLabTab] = useState<'incident' | 'rag' | 'weather'>('incident');

  // Global keydown listener for Terminal toggle (~)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['All', 'Enterprise Telecom', 'Generative AI', 'Cloud & DevOps', 'Full-Stack'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleOpenChatflow = (project: Project) => {
    setSelectedChatflowProject(project);
  };

  const handleOpenImageLightbox = (project: Project, imageIndex: number) => {
    setLightboxProject(project);
    setLightboxImageIndex(imageIndex);
  };

  const handleLaunchDemo = (demoKind: string) => {
    if (demoKind === 'incident' || demoKind === 'rag' || demoKind === 'weather') {
      setActiveLabTab(demoKind as 'incident' | 'rag' | 'weather');
      const elem = document.getElementById('demos');
      elem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToProject = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setSelectedChatflowProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResumeStudio={() => setIsResumeStudioOpen(true)}
      />

      {/* Main Hero */}
      <Hero
        onOpenResumeStudio={() => setIsResumeStudioOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onJumpToProject={handleJumpToProject}
      />

      {/* Flagship Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>ENTERPRISE & OPEN-SOURCE ARCHITECTURES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Engineering Systems & Protocol Chatflows
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
                Every project includes at least 2 verified live UI/telemetry views with deep technical details, plus an interactive step-by-step Protocol Chatflow demonstrating real-time packet exchange.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playTechClick(800);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenChatflow={handleOpenChatflow}
                onOpenImageLightbox={handleOpenImageLightbox}
                onLaunchDemo={handleLaunchDemo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Architecture Labs */}
      <section id="demos" className="py-20 relative bg-gradient-to-b from-transparent via-slate-950/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>LIVE INTERACTIVE TESTBEDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Architecture Labs
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Test live engineering components directly in your browser. Trigger automated telemetry runbooks, dense vector similarity queries, and meteorological microservice caching.
            </p>

            {/* Lab Switcher Tabs */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => {
                    playTechClick(850);
                    setActiveLabTab('incident');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeLabTab === 'incident'
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ SevOne NOC/SOC Incident Simulator
                </button>
                <button
                  onClick={() => {
                    playTechClick(850);
                    setActiveLabTab('rag');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeLabTab === 'rag'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🧠 Interactive RAG Studio (FAISS)
                </button>
                <button
                  onClick={() => {
                    playTechClick(850);
                    setActiveLabTab('weather');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeLabTab === 'weather'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌤️ Real-Time Weather Microservice
                </button>
              </div>
            </div>
          </div>

          {/* Active Lab Component */}
          <div className="transition-all duration-300">
            {activeLabTab === 'incident' && <InteractiveIncidentSimulator />}
            {activeLabTab === 'rag' && <LiveRAGSimulator />}
            {activeLabTab === 'weather' && <LiveWeatherSimulator />}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <SkillsMatrix />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <InteractiveChatflowModal
        project={selectedChatflowProject}
        isOpen={Boolean(selectedChatflowProject)}
        onClose={() => setSelectedChatflowProject(null)}
      />

      <ProjectImageLightbox
        project={lightboxProject}
        activeImageIndex={lightboxImageIndex}
        isOpen={Boolean(lightboxProject)}
        onClose={() => setLightboxProject(null)}
        onSelectImage={(idx) => setLightboxImageIndex(idx)}
      />

      <RecruiterCVStudio
        isOpen={isResumeStudioOpen}
        onClose={() => setIsResumeStudioOpen(false)}
      />

      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResumeStudio={() => {
          setIsTerminalOpen(false);
          setIsResumeStudioOpen(true);
        }}
      />
    </div>
  );
};

