import React, { useState } from 'react';
import { ShieldAlert, Play, RotateCcw, CheckCircle2, Clock, Terminal, AlertTriangle, ShieldCheck } from 'lucide-react';
import { playTechClick, playAlertBeep, playSuccessChime } from '../utils/sound';

export const InteractiveIncidentSimulator: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'breach' | 'diagnosing' | 'mitigating' | 'resolved'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState<number>(0);

  const startIncident = () => {
    playAlertBeep();
    setStage('breach');
    setElapsed(0);
    setLogs([
      '[00.00s] SEVONE ALARM: Ingress volumetric traffic on Frankfurt PoP exceeded 95% threshold (28 Gbps spike).',
      '[00.45s] DISHA Assure1 event correlated: 5,000+ SNMP OIDs report high CRC packet drop rate.',
      '[00.80s] Webhook dispatched to Python Netmiko Automation Engine (PID: 4092).',
    ]);

    setTimeout(() => {
      setStage('diagnosing');
      playTechClick(850);
      setLogs((prev) => [
        ...prev,
        '[01.40s] Python SSH daemon establishes Netmiko session with Juniper MX960 Core Router.',
        '[02.10s] Diagnosed source AS prefix: Volumetric UDP flood identified on AS64512.',
      ]);
    }, 1200);

    setTimeout(() => {
      setStage('mitigating');
      playTechClick(900);
      setLogs((prev) => [
        ...prev,
        '[02.80s] Netmiko applies dynamic BGP Flowspec rate-limit filter (RFC 5575).',
        '[03.30s] Traffic drops back to nominal 4.2 Gbps (99.8% malicious packets discarded).',
      ]);
    }, 2400);

    setTimeout(() => {
      setStage('resolved');
      playSuccessChime();
      setLogs((prev) => [
        ...prev,
        '[03.80s] ServiceNow Incident INC-0928114 state updated to RESOLVED.',
        '[03.95s] Automated Root Cause Analysis (RCA) artifact attached. MTTR: 3.8s (SLA MET).',
      ]);
    }, 3600);
  };

  const resetIncident = () => {
    playTechClick(700);
    setStage('idle');
    setLogs([]);
    setElapsed(0);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-cyan-500/30 p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>SevOne NOC/SOC Telecom Incident Simulator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                Tata Communications Architecture
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Experience the automated Python Netmiko self-healing runbook mitigating volumetric anomalies in under 4 seconds.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {stage === 'idle' ? (
            <button
              onClick={startIncident}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-mono text-xs font-bold hover:from-rose-400 shadow-md shadow-rose-950/40 transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Simulate Volumetric Spike</span>
            </button>
          ) : (
            <button
              onClick={resetIncident}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          className={`p-3 rounded-xl border transition-all ${
            stage === 'breach'
              ? 'bg-rose-950/70 border-rose-500 shadow-glow-rose scale-105'
              : stage !== 'idle'
              ? 'bg-slate-900/40 border-slate-800 opacity-60'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">STAGE 1: DETECTION</div>
          <div className="text-xs font-bold text-rose-400 mt-1">SevOne SNMP Alert</div>
        </div>

        <div
          className={`p-3 rounded-xl border transition-all ${
            stage === 'diagnosing'
              ? 'bg-amber-950/70 border-amber-500 shadow-glow-amber scale-105'
              : stage === 'mitigating' || stage === 'resolved'
              ? 'bg-slate-900/40 border-slate-800 opacity-60'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">STAGE 2: DISPATCH</div>
          <div className="text-xs font-bold text-amber-400 mt-1">Python Netmiko SSH</div>
        </div>

        <div
          className={`p-3 rounded-xl border transition-all ${
            stage === 'mitigating'
              ? 'bg-cyan-950/70 border-cyan-500 shadow-glow-cyan scale-105'
              : stage === 'resolved'
              ? 'bg-slate-900/40 border-slate-800 opacity-60'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">STAGE 3: MITIGATION</div>
          <div className="text-xs font-bold text-cyan-400 mt-1">BGP Flowspec Filter</div>
        </div>

        <div
          className={`p-3 rounded-xl border transition-all ${
            stage === 'resolved'
              ? 'bg-emerald-950/70 border-emerald-500 shadow-glow-emerald scale-105'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">STAGE 4: RESOLVED</div>
          <div className="text-xs font-bold text-emerald-400 mt-1">ServiceNow Closed (3.8s)</div>
        </div>
      </div>

      {/* Terminal Live Execution Log */}
      <div className="bg-black/90 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-1.5 min-h-[140px]">
        <div className="text-slate-500 flex items-center justify-between pb-1 border-b border-slate-800 text-[11px]">
          <span>TELECOM RUNBOOK CONSOLE [HOST: pop-de-fra01]</span>
          <span className="text-cyan-400">AUTONOMOUS RUNBOOK ACTIVE</span>
        </div>

        {logs.length === 0 ? (
          <div className="text-slate-500 italic py-6 text-center">
            Click "Simulate Volumetric Spike" to trigger real-time autonomous telemetry correlation and Netmiko remediation.
          </div>
        ) : (
          logs.map((log, idx) => (
            <div
              key={idx}
              className={`leading-relaxed animate-fadeIn ${
                log.includes('CRITICAL') || log.includes('ALARM')
                  ? 'text-rose-400 font-semibold'
                  : log.includes('RESOLVED') || log.includes('MET')
                  ? 'text-emerald-400 font-semibold'
                  : log.includes('Netmiko') || log.includes('BGP')
                  ? 'text-cyan-300'
                  : 'text-slate-300'
              }`}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

