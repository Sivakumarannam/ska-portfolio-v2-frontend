import React, { useState } from 'react';
import { Sparkles, Send, Layers, Database, FileText, CheckCircle2, Cpu } from 'lucide-react';
import { playTechClick, playSuccessChime } from '../utils/sound';

interface RAGChunk {
  id: string;
  score: number;
  source: string;
  page: number;
  text: string;
}

const SAMPLE_QUERIES = [
  'What were Siva Kumar’s key achievements at Tata Communications?',
  'How did the MySQL to PostgreSQL migration achieve zero downtime?',
  'Explain the RAG chatbot architecture and FAISS vector index.',
];

const KNOWLEDGE_BASE: Record<string, { chunks: RAGChunk[]; answer: string }> = {
  achievements: {
    chunks: [
      {
        id: 'chunk-101',
        score: 0.942,
        source: 'Siva_Kumar_Annam_Python_Developer.pdf',
        page: 1,
        text: 'Automated NOC/SOC device discovery, backups, and security telemetry collection via Python, Perl & Shell scripts for Tata Communications Ltd, reducing manual operational effort by ~35%.',
      },
      {
        id: 'chunk-102',
        score: 0.918,
        source: 'Siva_Kumar_Annam_Network_Automation.pdf',
        page: 1,
        text: 'Correlated 5,000+ SNMP metrics and NetFlow flows on SevOne & Assure1 dashboards, reducing incident detection time from 45 to 20 minutes under strict ServiceNow SLAs.',
      },
      {
        id: 'chunk-103',
        score: 0.887,
        source: 'Siva_Kumar_Annam_DevOps_Cloud.pdf',
        page: 2,
        text: 'Optimized PostgreSQL queries saving 2.5s per query and designed Python RESTful APIs with caching, cutting database strain by 30%.',
      },
    ],
    answer:
      'At Tata Communications (via MasterCom), Siva automated NOC/SOC operations to cut manual effort by 35%, correlated 5,000+ SNMP & NetFlow streams slashing MTTR from 45m to 20m, executed zero-downtime MySQL to PostgreSQL migration saving 2.5s per query, and built sub-4s Netmiko incident mitigation runbooks.',
  },
  migration: {
    chunks: [
      {
        id: 'chunk-201',
        score: 0.961,
        source: 'telecom_db_spec.md',
        page: 4,
        text: 'Non-blocking keyset cursor extraction (50k rows/batch) prevented table locks on live telecom reporting systems during chunked ETL ingestion.',
      },
      {
        id: 'chunk-202',
        score: 0.923,
        source: 'telecom_db_spec.md',
        page: 7,
        text: 'PostgreSQL binary COPY protocol loaded data into staging tables with disabled indexes. Multi-table joins were rewritten using Common Table Expressions (CTEs), dropping latency from 3.2s to 0.4s.',
      },
      {
        id: 'chunk-203',
        score: 0.902,
        source: 'telecom_db_spec.md',
        page: 9,
        text: 'Cryptographic MD5 row checksum verification confirmed 0.00% data loss across 10M+ rows before final DNS and API gateway cutover.',
      },
    ],
    answer:
      'The migration achieved zero downtime by using chunked non-blocking keyset cursor extraction from MySQL replicas, binary PostgreSQL COPY loading, rewriting nested joins with CTEs and B-Tree indexes, and running cryptographic MD5 row checksum verification confirming 0.00% data loss.',
  },
  rag: {
    chunks: [
      {
        id: 'chunk-301',
        score: 0.954,
        source: 'rag_architecture.md',
        page: 2,
        text: 'Documents are parsed into 500-token overlapping chunks and transformed into 384-dimensional dense vectors using Sentence-Transformers (all-MiniLM-L6-v2).',
      },
      {
        id: 'chunk-302',
        score: 0.935,
        source: 'rag_architecture.md',
        page: 5,
        text: 'In-memory FAISS IndexFlatIP executes cosine similarity search in under 4ms. The prompt is augmented with citations and synthesized locally via Ollama Qwen2.5.',
      },
      {
        id: 'chunk-303',
        score: 0.899,
        source: 'rag_architecture.md',
        page: 8,
        text: 'Tokens stream in real-time over HTTP/2 Server-Sent Events (SSE) with zero third-party cloud API costs and 100% data privacy.',
      },
    ],
    answer:
      'The RAG system splits technical documents into 500-token semantic chunks, embeds them into 384-dimensional vectors with all-MiniLM-L6-v2, queries an in-memory FAISS vector index in < 4ms, and streams answers from local Ollama Qwen2.5 with exact grounded citations and zero cloud API cost.',
  },
};

export const LiveRAGSimulator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState<{ chunks: RAGChunk[]; answer: string } | null>(
    KNOWLEDGE_BASE.achievements
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (textToSearch?: string) => {
    const q = textToSearch || query;
    if (!q.trim()) return;

    playTechClick(850);
    setIsSearching(true);

    setTimeout(() => {
      let matched = KNOWLEDGE_BASE.achievements;
      const lower = q.toLowerCase();
      if (lower.includes('migrat') || lower.includes('postgres') || lower.includes('mysql') || lower.includes('database')) {
        matched = KNOWLEDGE_BASE.migration;
      } else if (lower.includes('rag') || lower.includes('ollama') || lower.includes('faiss') || lower.includes('ai') || lower.includes('llm')) {
        matched = KNOWLEDGE_BASE.rag;
      }

      setActiveResult(matched);
      setIsSearching(false);
      playSuccessChime();
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-cyan-500/30 p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Interactive RAG Intelligence Studio</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                FAISS + LangChain + Ollama
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Query Siva’s verified engineering background. Inspect dense 384-d vector embeddings, FAISS cosine retrieval, and grounded citations.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Queries */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-slate-400">TRY PRELOADED QUERIES:</span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sample);
                handleSearch(sample);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all text-left"
            >
              &gt; {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask a question about Siva's Python, Telecom, or Cloud experience..."
          className="flex-1 bg-black/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
        />
        <button
          onClick={() => handleSearch()}
          disabled={isSearching}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold hover:from-cyan-400 flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSearching ? 'Embedding...' : 'Vector Query'}</span>
        </button>
      </div>

      {/* Results View: Retrieved Chunks + LLM Answer */}
      {activeResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          {/* Top-3 Retrieved FAISS Vector Chunks */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>TOP-3 FAISS VECTOR CHUNKS:</span>
              </span>
              <span className="text-[11px] text-emerald-400">Cosine Similarity: 0.88 - 0.96</span>
            </div>

            <div className="space-y-2">
              {activeResult.chunks.map((chunk) => (
                <div
                  key={chunk.id}
                  className="p-3 rounded-xl bg-black/60 border border-cyan-500/20 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                    <span className="text-cyan-300 font-semibold">{chunk.source} (p.{chunk.page})</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      score: {chunk.score.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">{chunk.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesized Response */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>OLLAMA LOCAL SYNTHESIS:</span>
              </span>
              <span className="text-[11px] text-cyan-400">Latency: 3.4ms | Tokens: SSE</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {activeResult.answer}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Grounding: 100% Verifiable Source Match</span>
                </span>
                <span className="text-slate-500">Zero Cloud Cost</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

