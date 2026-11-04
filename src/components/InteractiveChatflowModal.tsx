import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Activity,
  Layers,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Server,
  Globe,
  Terminal,
  FileText,
  User,
  Sparkles,
  ShieldCheck,
  Router,
  Compass,
  CloudRain,
  Box,
  GitBranch,
} from 'lucide-react';
import { Project, ChatflowMessage, ChatflowNode } from '../types';
import { playTechClick, playSuccessChime, playAlertBeep } from '../utils/sound';

interface InteractiveChatflowModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Router: Router,
  Activity: Activity,
  Terminal: Terminal,
  FileText: FileText,
  ShieldAlert: AlertTriangle,
  Cpu: Cpu,
  Database: Database,
  Server: Server,
  Zap: Sparkles,
  Globe: Globe,
  User: User,
  Layers: Layers,
  Sparkles: Sparkles,
  Smartphone: Globe,
  Compass: Compass,
  CloudRain: CloudRain,
  GitBranch: GitBranch,
  Play: Play,
  ShieldCheck: ShieldCheck,
  Box: Box,
};

export const InteractiveChatflowModal: React.FC<InteractiveChatflowModalProps> = ({ project, isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [expandedPayloads, setExpandedPayloads] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'chatflow' | 'architecture'>('chatflow');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !project) return;
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [isOpen, project]);

  // Auto playback timer
  useEffect(() => {
    if (!isOpen || !project || !isPlaying) return;

    const intervalTime = (3000 / playbackSpeed);
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= project.chatflow.messages.length) {
          playSuccessChime();
          setIsPlaying(false);
          return prev;
        }
        playTechClick(800 + next * 40);
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, project, isPlaying, playbackSpeed]);

  useEffect(() => {
    // Scroll to latest message
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  if (!isOpen || !project) return null;

  const { chatflow, architecture } = project;
  const currentMessage: ChatflowMessage = chatflow.messages[currentStepIndex] || chatflow.messages[0];

  const handleNextStep = () => {
    playTechClick(850);
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, chatflow.messages.length - 1));
  };

  const handlePrevStep = () => {
    playTechClick(750);
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    playTechClick(700);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    playTechClick(isPlaying ? 700 : 900);
    if (!isPlaying && currentStepIndex >= chatflow.messages.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const togglePayloadExpand = (msgId: string) => {
    playTechClick(800);
    setExpandedPayloads((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      {/* Modal Shell */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#070b18] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">{chatflow.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  LIVE SIMULATION
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">{chatflow.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center space-x-1">
              <button
                onClick={() => {
                  playTechClick(800);
                  setViewMode('chatflow');
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  viewMode === 'chatflow'
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Chatflow
              </button>
              <button
                onClick={() => {
                  playTechClick(800);
                  setViewMode('architecture');
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  viewMode === 'architecture'
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Architecture Spec
              </button>
            </div>

            <button
              onClick={() => {
                playTechClick(700);
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'chatflow' ? (
          <>
            {/* Interactive Connected Nodes Map */}
            <div className="px-5 py-4 bg-slate-950/70 border-b border-slate-800 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[620px] relative">
                {/* Connecting Bus Line */}
                <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-slate-800 pointer-events-none z-0" />

                {chatflow.nodes.map((node, idx) => {
                  const NodeIcon = ICON_MAP[node.icon] || Cpu;
                  const isSender = currentMessage?.from === node.name;
                  const isReceiver = currentMessage?.to === node.name;
                  const isActive = isSender || isReceiver;

                  return (
                    <div key={node.id} className="relative z-10 flex flex-col items-center group">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                          isSender
                            ? 'bg-cyan-950 border-cyan-400 shadow-glow-cyan scale-110'
                            : isReceiver
                            ? 'bg-emerald-950 border-emerald-400 shadow-glow-emerald scale-110'
                            : 'bg-slate-900 border-slate-800 opacity-60'
                        }`}
                      >
                        <NodeIcon
                          className={`w-6 h-6 ${
                            isSender ? 'text-cyan-400' : isReceiver ? 'text-emerald-400' : 'text-slate-400'
                          }`}
                        />
                      </div>

                      <div className="mt-2 text-center">
                        <div
                          className={`text-xs font-semibold tracking-tight transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}
                        >
                          {node.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase">{node.role}</div>
                      </div>

                      {/* Active Status Flag */}
                      {isSender && (
                        <span className="absolute -top-2 px-1.5 py-0.5 rounded bg-cyan-500 text-black font-mono font-bold text-[9px] shadow-sm animate-bounce">
                          SRC
                        </span>
                      )}
                      {isReceiver && (
                        <span className="absolute -top-2 px-1.5 py-0.5 rounded bg-emerald-500 text-black font-mono font-bold text-[9px] shadow-sm animate-bounce">
                          DST
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Active Protocol Indicator Banner */}
              <div className="mt-3 py-1.5 px-3 rounded-lg bg-[#070b18] border border-cyan-500/20 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">PACKET:</span>
                  <span>{currentMessage?.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-emerald-400 font-bold">{currentMessage?.to}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">
                    PROTOCOL: <strong className="text-slate-200">{currentMessage?.protocol}</strong>
                  </span>
                  <span className="text-cyan-300">
                    LATENCY: <strong>{currentMessage?.latency}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Chatflow Message Stream */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#070b18] to-[#050811]">
              {chatflow.messages.slice(0, currentStepIndex + 1).map((msg, index) => {
                const isCurrent = index === currentStepIndex;
                const isPayloadOpen = expandedPayloads[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/60 ring-1 ring-cyan-500/30'
                        : 'bg-slate-900/40 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center">
                          {msg.step}
                        </span>
                        <div className="flex items-center space-x-1.5 font-mono text-xs">
                          <span className="text-white font-semibold">{msg.from}</span>
                          <ArrowRight className="w-3 h-3 text-cyan-400" />
                          <span className="text-emerald-400 font-semibold">{msg.to}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {msg.protocol}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            msg.badgeType === 'critical'
                              ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                              : msg.badgeType === 'success'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                    </div>

                    {/* Action & Explanation */}
                    <div className="pt-2.5 space-y-2">
                      <div className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
                        <span className="text-cyan-400 font-mono">&gt;</span>
                        <span>{msg.action}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{msg.details}</p>

                      {/* Payload Toggle */}
                      {msg.payload && (
                        <div className="pt-1">
                          <button
                            onClick={() => togglePayloadExpand(msg.id)}
                            className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                          >
                            <span>{isPayloadOpen ? 'Hide Payload JSON' : 'Inspect Payload JSON'}</span>
                            {isPayloadOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isPayloadOpen && (
                            <pre className="mt-2 p-3 rounded-lg bg-black/90 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-36">
                              {typeof msg.payload === 'string'
                                ? msg.payload
                                : JSON.stringify(msg.payload, null, 2)}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Bottom Playback Control Hub */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                <span>
                  STEP <strong className="text-cyan-400">{currentStepIndex + 1}</strong> OF{' '}
                  <strong>{chatflow.messages.length}</strong>
                </span>
                <span className="text-slate-600">|</span>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>TOTAL LATENCY: {currentMessage?.latency}</span>
                </div>
              </div>

              {/* Media Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                  title="Previous Step"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center space-x-2 transition-all shadow-md ${
                    isPlaying
                      ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 shadow-cyan-500/25'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === chatflow.messages.length - 1}
                  className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                  title="Next Step"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Restart Flow"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Speed Selector */}
                <button
                  onClick={() => {
                    playTechClick(850);
                    setPlaybackSpeed((prev) => (prev === 1 ? 2 : 1));
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400 hover:border-cyan-500/40"
                  title="Toggle Playback Speed"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Architecture Spec View Mode */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050811]">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Enterprise Architecture Blueprint</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {architecture.description}
              </p>
            </div>

            {/* Architecture Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {architecture.metrics.map((metric, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                  <div className="text-2xl font-bold font-mono text-cyan-400">{metric.value}</div>
                  {metric.trend && (
                    <div className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{metric.trend}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* End-to-End Execution Flow Stages */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold font-mono text-slate-200 tracking-wider uppercase">
                End-to-End Pipeline Stages
              </h5>
              <div className="space-y-2.5">
                {architecture.flow.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start space-x-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

