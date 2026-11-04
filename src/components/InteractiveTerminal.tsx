import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { playTechClick } from '../utils/sound';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeStudio: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResumeStudio,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'welcome',
      output:
        'Siva Kumar Annam (Mr.A.S.K) Interactive CLI v2.4.0\nType "help" to view all available commands. Press ESC to close.',
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        // Toggle terminal
        // handled in parent
      }
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    playTechClick(850);

    let output = '';

    switch (trimmed) {
      case 'help':
        output = `AVAILABLE COMMANDS:
  whoami      - Display Siva Kumar Annam background & role
  experience  - MasterCom / Tata Communications highlights
  projects    - List all flagship projects with metrics
  sevone      - Deep dive on SevOne NMS & Netmiko runbooks
  rag         - LangChain + Ollama private AI specs
  skills      - Full breakdown of technical competencies
  resume      - Launch verified CV download studio
  contact     - View phone, email, LinkedIn & GitHub links
  clear       - Clear terminal buffer
  exit        - Close terminal`;
        break;

      case 'whoami':
        output = `${PERSONAL_INFO.name} (${PERSONAL_INFO.displayName})
Role: ${PERSONAL_INFO.title}
Company: ${PERSONAL_INFO.company}
Experience: ${PERSONAL_INFO.experience}
Status: ${PERSONAL_INFO.status}`;
        break;

      case 'experience':
        output = `PRODUCTION EXPERIENCE:
MasterCom Technology Services (Client: Tata Communications Ltd)
• Automated NOC/SOC operations cutting manual effort by ~35%
• Correlated 5,000+ SNMP & NetFlow streams (detection: 45m ➔ 20m)
• Migrated MySQL to PostgreSQL with zero downtime (query speed +2.5s)
• L2/L3 support on SevOne NMS, DISHA Assure1, and ServiceNow`;
        break;

      case 'projects':
        output = PROJECTS.map(
          (p, idx) => `[${idx + 1}] ${p.title} (${p.category})\n    Tagline: ${p.tagline}`
        ).join('\n\n');
        break;

      case 'sevone':
        output = `SEVONE NOC/SOC & ASSURE1 AUTOMATION:
• Correlates 5,000+ SNMP OIDs and NetFlow telemetry streams
• Event-driven Python Netmiko runbooks mitigate volumetric anomalies in < 4s
• Applies automated BGP Flowspec rate limits
• Auto-resolves ServiceNow incident tickets under strict 99.9% SLAs`;
        break;

      case 'rag':
        output = `RAG DOCUMENT INTELLIGENCE STUDIO:
• Sentence-Transformers dense 384-dimensional vector embeddings
• FAISS IndexFlatIP cosine similarity search in < 4ms
• Local Ollama Qwen2.5 synthesis with Server-Sent Events (SSE)
• 100% grounded citations with zero third-party cloud API costs`;
        break;

      case 'skills':
        output = `LANGUAGES: Python (Production), Perl, Bash Shell, SQL, TypeScript
BACKEND: Django, Django REST Framework, RESTful APIs, Caching
OBSERVABILITY: SevOne NMS, DISHA Assure1, SNMP v3, NetFlow, ServiceNow
CLOUD/DEVOPS: Docker, Kubernetes, GitHub Actions, AWS, Terraform
AI/LLM: RAG, LangChain, FAISS, Ollama, Semantic Embeddings`;
        break;

      case 'resume':
        output = 'Launching Verified Recruiter CV Studio...';
        onOpenResumeStudio();
        break;

      case 'contact':
        output = `PHONE:    ${PERSONAL_INFO.phone}
EMAIL:    ${PERSONAL_INFO.email}
LOCATION: ${PERSONAL_INFO.location}
GITHUB:   ${PERSONAL_INFO.github}
LINKEDIN: ${PERSONAL_INFO.linkedin}`;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = `command not found: "${cmd}". Type "help" for a list of commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl h-[650px] bg-[#050811] border border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col font-mono text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-400 pl-2 text-[11px]">
              siva@mastercom-telecom:~ (zsh)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <span className="text-[10px] text-cyan-400">ESC to close</span>
            <button
              onClick={onClose}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Buffer */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#050811] text-slate-300">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center space-x-2 text-cyan-400">
                <span className="text-slate-500">guest@sivakumar-annam:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-2 font-mono text-[11px]">
                {item.output}
              </pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-cyan-400 font-bold">guest@sivakumar-annam:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand(input);
            }}
            placeholder="Type 'help', 'projects', 'sevone', 'resume'..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs caret-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

