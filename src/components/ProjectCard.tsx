import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Activity,
  Layers,
  ArrowRight,
  Maximize2,
  Cpu,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Project } from '../types';
import { playTechClick } from '../utils/sound';

interface ProjectCardProps {
  project: Project;
  onOpenChatflow: (project: Project) => void;
  onOpenImageLightbox: (project: Project, imageIndex: number) => void;
  onLaunchDemo?: (demoKind: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenChatflow,
  onOpenImageLightbox,
  onLaunchDemo,
}) => {
  const [activeImgHover, setActiveImgHover] = useState<number | null>(null);

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-slate-800/80 hover:border-cyan-500/40 p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between group">
      {/* Top Category & Company Meta */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
            {project.category}
          </span>
          {project.company && (
            <span className="text-xs font-mono text-slate-400">
              {project.company}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-cyan-300/80 font-mono">
            {project.tagline}
          </p>
        </div>

        {/* Dual Live Project Images Showcase */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>VERIFIED LIVE TELEMETRY / UI VIEWS:</span>
            </span>
            <span className="text-[11px] text-cyan-400">Click to Zoom</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.images.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  playTechClick(850);
                  onOpenImageLightbox(project, idx);
                }}
                onMouseEnter={() => setActiveImgHover(idx)}
                onMouseLeave={() => setActiveImgHover(null)}
                className="relative rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-400/70 bg-black/70 cursor-pointer group/img transition-all duration-300 shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                </div>

                {/* Hover Overlay with Technical Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 sm:opacity-70 group-hover/img:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white line-clamp-1">
                      {img.caption}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-300 uppercase">
                    VIEW #{idx + 1} • TECHNICAL SPEC
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Summary & Highlights */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {project.summary}
        </p>

        {/* Key Highlights Bulletpoints */}
        <div className="space-y-1.5 pt-1">
          {project.highlights.slice(0, 3).map((highlight, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Enterprise Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
          {project.architecture.metrics.map((metric, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 truncate">{metric.label}</div>
              <div className="text-sm font-bold font-mono text-cyan-400">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Hub */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Launch Interactive Protocol Chatflow Button */}
        <button
          onClick={() => {
            playTechClick(900);
            onOpenChatflow(project);
          }}
          className="flex-1 min-w-[200px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs font-semibold hover:bg-cyan-500/30 transition-all shadow-md shadow-cyan-950/40"
        >
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Launch Protocol Chatflow</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Additional Action Links */}
        <div className="flex items-center space-x-2">
          {project.demoKind && onLaunchDemo && (
            <button
              onClick={() => {
                playTechClick(850);
                onLaunchDemo(project.demoKind!);
              }}
              className="px-3 py-2 rounded-xl bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 font-mono text-xs flex items-center space-x-1.5 transition-all"
              title="Launch Interactive Lab Simulator"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Lab</span>
            </button>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTechClick(800)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

