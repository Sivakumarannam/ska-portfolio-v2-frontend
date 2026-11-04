import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, ShieldCheck, Cpu, Database, Activity, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playTechClick } from '../utils/sound';

interface HeroProps {
  onOpenResumeStudio: () => void;
  onOpenTerminal: () => void;
  onJumpToProject: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeStudio, onOpenTerminal, onJumpToProject }) => {
  const titles = [
    'Python Developer & Automation Engineer',
    'Telecom NOC/SOC Telemetry Specialist',
    'Database Migration & Performance Architect',
    'Generative AI & RAG Pipeline Builder',
  ];

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Cyber Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[90px]" />

        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Story */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Enterprise Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-cyan-300">
                Production Verified • MasterCom @ Tata Communications Ltd
              </span>
            </div>

            {/* Main Greeting & Dynamic Role */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Architecting Telecom-Grade{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                  Python Automation
                </span>{' '}
                & AI Workflows.
              </h1>

              {/* Dynamic Switching Role Banner */}
              <div className="h-10 flex items-center">
                <span className="text-sm font-mono text-cyan-400 mr-2">&gt;</span>
                <span className="text-lg sm:text-xl font-mono font-semibold text-slate-300 animate-fadeIn">
                  {titles[titleIndex]}
                </span>
                <span className="w-2.5 h-5 bg-cyan-400 ml-1.5 animate-pulse" />
              </div>
            </div>

            {/* Value Proposition Paragraph */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-normal">
              Associate Software Engineer with 2+ years of hands-on production impact at{' '}
              <strong className="text-white font-semibold">MasterCom Technology Services</strong>. Scaled SevOne NMS &
              DISHA (Assure1) operational pipelines for <strong className="text-white font-semibold">Tata Communications</strong>,
              cut manual NOC/SOC effort by <span className="text-cyan-400 font-semibold font-mono">35%</span>, executed zero-downtime
              PostgreSQL migrations, and built on-premise RAG AI systems with LangChain and FAISS.
            </p>

            {/* Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-3.5 items-center">
              <a
                href="#projects"
                onClick={() => playTechClick(800)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
              >
                <span>Explore Projects & Chatflows</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playTechClick(850);
                  onOpenResumeStudio();
                }}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-medium text-sm hover:bg-slate-800 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Verified CVs (3 Tracks)</span>
              </button>

              <button
                onClick={() => {
                  playTechClick(900);
                  onOpenTerminal();
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs hover:bg-cyan-950/70 transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>$ CLI Terminal</span>
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-xl font-bold font-mono text-cyan-400">35%</div>
                <div className="text-[11px] text-slate-400 font-medium">Manual Effort Slashed</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-xl font-bold font-mono text-emerald-400">5,000+</div>
                <div className="text-[11px] text-slate-400 font-medium">SNMP & NetFlow Streams</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-xl font-bold font-mono text-indigo-400">45m ➔ 20m</div>
                <div className="text-[11px] text-slate-400 font-medium">Incident Detection (MTTR)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-xl font-bold font-mono text-amber-400">&lt; 4s</div>
                <div className="text-[11px] text-slate-400 font-medium">Automated Remediation</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Telemetry HUD Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-cyan-500/30 p-5 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 pl-2">
                    telecom-nms-agent.py [PID: 4092]
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                  HEALTHY
                </span>
              </div>

              {/* Live Status Stream */}
              <div className="py-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>TELEMETRY INGESTION:</span>
                  <span className="text-cyan-300">SNMPv3 / NetFlow IPFIX</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[88%] animate-pulse" />
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>Target Customer:</span>
                    <span className="text-white font-semibold">Tata Communications Ltd</span>
                  </div>
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>Monitored Platforms:</span>
                    <span className="text-cyan-400">SevOne NMS, PMS, Assure1</span>
                  </div>
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>Incident Engine:</span>
                    <span className="text-emerald-400">Python Netmiko + ServiceNow</span>
                  </div>
                </div>

                {/* Live Diagnostic Feed Snippet */}
                <div className="bg-black/60 rounded-lg p-3 border border-cyan-500/20 text-[11px] leading-relaxed text-slate-300 space-y-1">
                  <p className="text-cyan-400 font-semibold">[04:12:08 UTC] POLLING 5,000+ CORE SNMP OIDs...</p>
                  <p className="text-slate-400">&gt; Interface CRC errors: 0.00%</p>
                  <p className="text-emerald-400">&gt; BGP Flowspec mitigation runbook armed.</p>
                  <p className="text-amber-400">&gt; PostgreSQL query optimization: 2.5s saved.</p>
                </div>
              </div>

              {/* Quick Launch Demos in the Card */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    playTechClick(850);
                    onJumpToProject('sevone-automation');
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <span>[Launch SevOne Protocol Flow]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-500 font-mono">LATENCY: 1.8ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

