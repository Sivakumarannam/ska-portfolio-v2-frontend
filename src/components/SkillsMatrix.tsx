import React from 'react';
import { Terminal, Server, Activity, Cloud, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const ICON_COMP: Record<string, React.FC<{ className?: string }>> = {
  Terminal: Terminal,
  Server: Server,
  Activity: Activity,
  Cloud: Cloud,
  Cpu: Cpu,
  Database: Database,
};

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <span>PRODUCTION TOOLCHAIN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Technical Skills Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Battle-tested technologies deployed across telecom production networks, cloud infrastructure, and private AI pipelines.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const IconComponent = ICON_COMP[cat.icon] || Cpu;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#070b18]/90 border border-slate-800 hover:border-cyan-500/30 p-5 space-y-4 transition-all duration-300 shadow-lg hover:shadow-cyan-950/20"
              >
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                  <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{cat.title}</h3>
                </div>

                <div className="space-y-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl bg-black/40 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        {skill.highlight ? (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                        )}
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono text-[11px]">
                        <span className="text-cyan-400">{skill.exp}</span>
                        <span className="text-slate-500">({skill.level})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

