import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Tag, Layers, ExternalLink, ShieldCheck } from 'lucide-react';
import { Project, ProjectImage } from '../types';
import { playTechClick } from '../utils/sound';

interface ProjectImageLightboxProps {
  project: Project | null;
  activeImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (index: number) => void;
}

export const ProjectImageLightbox: React.FC<ProjectImageLightboxProps> = ({
  project,
  activeImageIndex,
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, activeImageIndex]);

  useEffect(() => {
    // Reset zoom level on image switch
    setZoomLevel(1);
  }, [activeImageIndex, project]);

  if (!isOpen || !project) return null;

  const currentImage: ProjectImage = project.images[activeImageIndex] || project.images[0];

  const handleNext = () => {
    playTechClick(800);
    const nextIdx = (activeImageIndex + 1) % project.images.length;
    onSelectImage(nextIdx);
  };

  const handlePrev = () => {
    playTechClick(800);
    const prevIdx = (activeImageIndex - 1 + project.images.length) % project.images.length;
    onSelectImage(prevIdx);
  };

  const toggleZoom = () => {
    playTechClick(900);
    setZoomLevel((prev) => (prev === 1 ? 1.6 : 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      {/* Container Box */}
      <div className="relative w-full max-w-6xl max-h-[95vh] bg-[#070b18] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/20">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
                <span>{project.title}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  Image {activeImageIndex + 1} of {project.images.length}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleZoom}
              title={zoomLevel === 1 ? 'Zoom In' : 'Zoom Out'}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
            >
              {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
            </button>
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
        </div>

        {/* Middle Image Stage */}
        <div className="relative flex-1 min-h-[320px] max-h-[60vh] bg-black/80 flex items-center justify-center overflow-auto p-4 select-none">
          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 p-2.5 rounded-full bg-black/70 border border-slate-700 text-white hover:text-cyan-400 hover:border-cyan-400 transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 p-2.5 rounded-full bg-black/70 border border-slate-700 text-white hover:text-cyan-400 hover:border-cyan-400 transition-all shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Actual Live Image */}
          <div
            className="transition-transform duration-300 cursor-zoom-in"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={toggleZoom}
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="max-h-[56vh] w-auto max-w-full object-contain rounded-lg border border-slate-800 shadow-xl"
            />
          </div>
        </div>

        {/* Bottom Technical Details Breakdown */}
        <div className="p-5 bg-gradient-to-t from-[#050811] to-slate-900/90 border-t border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{currentImage.caption}</span>
            </h4>
            {currentImage.tags && (
              <div className="flex flex-wrap gap-1.5">
                {currentImage.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                  >
                    <Tag className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <strong className="text-cyan-400 font-semibold font-mono mr-1">TECHNICAL SPECIFICATION:</strong>
            {currentImage.technicalDetails}
          </p>

          {/* Thumbnail Strip */}
          {project.images.length > 1 && (
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-[11px] font-mono text-slate-400">SELECT VIEW:</span>
              <div className="flex items-center space-x-2">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playTechClick(800);
                      onSelectImage(idx);
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeImageIndex
                        ? 'border-cyan-400 shadow-glow-cyan scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.caption} className="w-14 h-9 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

