import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  Building2,
  Gamepad2,
  Users,
  Calendar,
} from 'lucide-react';
import { TvcProject } from '../data/tvcData';

interface ProjectModalProps {
  project: TvcProject | null;
  onClose: () => void;
  onSelectForInquiry: (project: TvcProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectForInquiry,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveSlide(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveSlide((prev) => (prev + 1) % project.screenshots.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveSlide(
          (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentScreenshot = project.screenshots[activeSlide] || project.screenshots[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0B1B13] border border-[#03B16C]/30 dark:border-[#07C845]/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#03B16C] text-white shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <span className="px-2.5 py-1 rounded bg-[#D4FF33] text-[#07120D] font-mono text-xs font-bold tracking-wider shrink-0">
              {project.year}
            </span>
            <h2
              id="modal-project-title"
              className="font-display text-lg sm:text-2xl font-bold tracking-wide truncate"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle de proyecto"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black/20 hover:bg-black/35 text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Main Column: Interactive Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-[#07120D] border border-neutral-200 dark:border-white/10">
              {!imgErrorMap[currentScreenshot.src] ? (
                <img
                  src={currentScreenshot.src}
                  alt={`${project.title} — ${currentScreenshot.caption}`}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImgErrorMap((prev) => ({ ...prev, [currentScreenshot.src]: true }))
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#03B16C] to-[#5D117B] text-white text-center">
                  <Gamepad2 className="w-12 h-12 mb-2 opacity-80" />
                  <p className="font-display text-lg font-bold">{project.title}</p>
                </div>
              )}

              {project.screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide(
                        (prev) =>
                          (prev - 1 + project.screenshots.length) %
                          project.screenshots.length
                      )
                    }
                    aria-label="Captura anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev + 1) % project.screenshots.length)
                    }
                    aria-label="Siguiente captura"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 py-3">
                <p className="text-xs sm:text-sm text-white/95 font-medium">
                  {currentScreenshot.caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {project.screenshots.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5">
                {project.screenshots.map((shot, idx) => (
                  <button
                    key={shot.src}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Ver captura ${idx + 1} de ${project.title}`}
                    className={`relative aspect-16/10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === activeSlide
                        ? 'border-[#07C845] ring-2 ring-[#07C845]/30'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Metadata Row (Unboxed clean typography per Zero-Pill rule) */}
            <div className="p-4 rounded-xl bg-[#F0F7F4] dark:bg-[#10261B] border border-[#03B16C]/15 dark:border-[#07C845]/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    Comitente / Propiedad
                  </span>
                  <span className="font-semibold text-[#0D1F17] dark:text-white">
                    {project.client}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Gamepad2 className="w-4 h-4 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    Plataformas & Distribución
                  </span>
                  <span className="font-semibold text-[#0D1F17] dark:text-white">
                    {project.platforms.map((platform, idx) => {
                      const storeUrl =
                        platform === 'App Store' || platform === 'iOS'
                          ? project.storeLinks?.appStoreUrl
                          : platform === 'Google Play' || platform === 'Android'
                            ? project.storeLinks?.googlePlayUrl
                            : platform.includes('Steam')
                              ? project.storeLinks?.steamUrl
                              : platform === 'Arcade Custom'
                                ? project.storeLinks?.arcadeCustomUrl
                                : undefined;
                      return (
                        <React.Fragment key={platform}>
                          {idx > 0 && <span aria-hidden="true"> · </span>}
                          {storeUrl ? (
                            <a
                              href={storeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#03B16C] dark:text-[#07C845] underline underline-offset-4 hover:opacity-80"
                            >
                              {platform}
                            </a>
                          ) : (
                            <span>{platform}</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    Escala / Hardware
                  </span>
                  <span className="font-semibold text-[#0D1F17] dark:text-white">
                    {project.teamSizeOrHardware}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    Género & Año
                  </span>
                  <span className="font-semibold text-[#0D1F17] dark:text-white">
                    {project.genreLabel} ({project.year})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#03B16C] dark:text-[#07C845] mb-1">
                  Ficha Oficial · Portfolio TVC 2026
                </p>
                <p className="text-base text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#0D1F17] dark:text-white mb-2">
                  Objetivo del Proyecto
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.objective}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#0D1F17] dark:text-white mb-2">
                  Proceso de Desarrollo
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.development}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#0D1F17] dark:text-white mb-2.5">
                  Hitos & Características Clave
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Footer inside Modal */}
            <div className="pt-5 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelectForInquiry(project)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#03B16C] hover:bg-[#07C845] text-white hover:text-[#07120D] font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Cotizar un proyecto similar</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/15 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap"
              >
                Volver al catálogo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
