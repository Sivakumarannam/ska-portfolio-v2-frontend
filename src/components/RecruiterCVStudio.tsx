import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Sparkles, ArrowRight, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { RESUMES, PERSONAL_INFO } from '../data/portfolioData';
import { ResumeProfile } from '../types';
import { playTechClick, playSuccessChime } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface RecruiterCVStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterCVStudio: React.FC<RecruiterCVStudioProps> = ({ isOpen, onClose }) => {
  const [selectedResumeId, setSelectedResumeId] = useState<string>('python');

  if (!isOpen) return null;

  const activeResume: ResumeProfile =
    RESUMES.find((r) => r.id === selectedResumeId) || RESUMES[0];

  const handleDownload = (resume: ResumeProfile) => {
    playSuccessChime();
    fireConfetti();
    const link = document.createElement('a');
    link.href = resume.downloadUrl;
    link.download = resume.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#070b18] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-cyan-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <span>Verified Recruiter CV Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  ATS OPTIMIZED
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Select your hiring domain to inspect targeted competencies and download verified PDFs.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTechClick(700);
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Track Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RESUMES.map((res) => {
              const isSelected = res.id === selectedResumeId;
              return (
                <button
                  key={res.id}
                  onClick={() => {
                    playTechClick(850);
                    setSelectedResumeId(res.id);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                      {res.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {res.fitScore} MATCH
                    </span>
                  </div>

                  <div className="mt-3 text-sm font-bold text-white">{res.shortTitle}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{res.filename}</div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active CV Deep Dive */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/20 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>{activeResume.title}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </h4>
                <p className="text-xs font-mono text-cyan-300">
                  Target Role: Associate Software Engineer • MasterCom / Tata Communications
                </p>
              </div>

              <button
                onClick={() => handleDownload(activeResume)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/25 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified PDF</span>
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">EXECUTIVE SUMMARY:</span>
              <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {activeResume.summary}
              </p>
            </div>

            {/* Key Skills Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                VERIFIED TECHNICAL COMPETENCIES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeResume.keySkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-black/50 border border-slate-800/80 flex items-center space-x-2 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-mono">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Quick Verification Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <span>Experience: 2+ Years Production</span>
              <span>Location: Bangalore / AP</span>
              <span>Contact: {PERSONAL_INFO.phone}</span>
              <span className="text-cyan-400">{PERSONAL_INFO.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

