/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Cpu,
  Code2,
  GraduationCap,
  Megaphone,
  Moon,
  Sun,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';
import {
  PROJECT_CATEGORIES,
  ProjectCategory,
  TVC_DIFFERENTIATORS,
  TVC_METRICS,
  TVC_PROJECTS,
  TVC_SERVICES,
  TvcProject,
} from './data/tvcData';
import { filterProjects, getCategoryCounts } from './utils/portfolioLogic';
import { SectionHeaderBanner, TvcCactusIcon } from './components/TvcBrandMark';
import { ProjectModal } from './components/ProjectModal';
import { ContactSection } from './components/ContactSection';
import { TVC_CONTACT_EMAIL } from './utils/portfolioLogic';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] =
    useState<TvcProject | null>(null);
  const [preselectedInquiryTitle, setPreselectedInquiryTitle] = useState<
    string | null
  >(null);
  const [heroShowcaseIdx, setHeroShowcaseIdx] = useState<number>(0);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const categoryCounts = useMemo(() => getCategoryCounts(TVC_PROJECTS), []);

  const filteredProjects = useMemo(
    () => filterProjects(TVC_PROJECTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const heroFeaturedProjects = useMemo(
    () => [TVC_PROJECTS[0], TVC_PROJECTS[2], TVC_PROJECTS[1]],
    []
  );
  const currentHeroProject =
    heroFeaturedProjects[heroShowcaseIdx] || heroFeaturedProjects[0];

  const handleSelectProjectForInquiry = (project: TvcProject) => {
    setActiveProjectModal(null);
    setPreselectedInquiryTitle(project.title);
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderServiceIcon = (
    iconName: 'graduation' | 'megaphone' | 'compass' | 'cpu' | 'code'
  ) => {
    switch (iconName) {
      case 'graduation':
        return <GraduationCap className="w-6 h-6" />;
      case 'megaphone':
        return <Megaphone className="w-6 h-6" />;
      case 'compass':
        return <Compass className="w-6 h-6" />;
      case 'cpu':
        return <Cpu className="w-6 h-6" />;
      case 'code':
        return <Code2 className="w-6 h-6" />;
    }
  };

  const renderProjectPlatforms = (project: TvcProject) => {
    return project.platforms.map((platform, idx) => {
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
              aria-label={`Ver ${project.title} en ${platform}`}
              className="font-bold text-[#03B16C] dark:text-[#07C845] underline underline-offset-4 hover:text-[#07C845] dark:hover:text-[#D4FF33] transition-colors"
            >
              {platform}
            </a>
          ) : (
            <span>{platform}</span>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9F7] text-[#0D1F17] dark:bg-[#07120D] dark:text-[#F0F7F4] transition-colors duration-200">
      {/* Sticky Top Header — Strictly follows 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#07120D]/95 backdrop-blur-md border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 md:gap-8">
          {/* Zone 1: Single Brand Wordmark Link */}
          <a
            href="#inicio"
            className="inline-flex items-center gap-2.5 sm:gap-3 font-display text-base sm:text-xl font-bold tracking-wider text-[#03B16C] dark:text-[#07C845] whitespace-nowrap shrink-0"
          >
            <TvcCactusIcon className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
            <span>TVC GAMES</span>
          </a>

          {/* Zone 2: 4 Single-Line Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            <a
              href="#proyectos"
              className="hover:text-[#03B16C] dark:hover:text-[#07C845] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Proyectos
            </a>
            <a
              href="#servicios"
              className="hover:text-[#03B16C] dark:hover:text-[#07C845] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Servicios
            </a>
            <a
              href="#estudio"
              className="hover:text-[#03B16C] dark:hover:text-[#07C845] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Estudio
            </a>
            <a
              href="#contacto"
              className="hover:text-[#03B16C] dark:hover:text-[#07C845] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contacto
            </a>
          </nav>

          {/* Zone 3: Theme Toggle + Primary CTA Button (+ Mobile Menu Drawer Trigger on <md) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={
                darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
              }
              className="inline-flex items-center gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white dark:bg-[#10261B] border border-neutral-300 dark:border-[#07C845]/30 text-xs font-semibold text-[#0D1F17] dark:text-[#F0F7F4] hover:border-[#03B16C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#D4FF33]" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#5D117B]" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>

            <a
              href="#contacto"
              className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#03B16C] hover:bg-[#07C845] text-white hover:text-[#07120D] font-display text-[11px] sm:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0"
            >
              Iniciar Proyecto
            </a>

            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={
                mobileNavOpen ? 'Cerrar menú móvil' : 'Abrir menú móvil'
              }
              aria-expanded={mobileNavOpen}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-neutral-300 dark:border-white/15 text-[#0D1F17] dark:text-white shrink-0"
            >
              {mobileNavOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0B1B13] px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-semibold">
              <a
                href="#proyectos"
                onClick={() => setMobileNavOpen(false)}
                className="py-2 text-[#0D1F17] dark:text-white hover:text-[#03B16C]"
              >
                Proyectos & Catálogo
              </a>
              <a
                href="#servicios"
                onClick={() => setMobileNavOpen(false)}
                className="py-2 text-[#0D1F17] dark:text-white hover:text-[#03B16C]"
              >
                Servicios & Capacidades
              </a>
              <a
                href="#estudio"
                onClick={() => setMobileNavOpen(false)}
                className="py-2 text-[#0D1F17] dark:text-white hover:text-[#03B16C]"
              >
                Sobre el Estudio & Filosofía
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileNavOpen(false)}
                className="py-2 text-[#0D1F17] dark:text-white hover:text-[#03B16C]"
              >
                Contacto Comercial
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="inicio"
          className="pt-8 pb-16 sm:pt-12 sm:pb-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 2-Column Hero Split (items-stretch for equal visual height) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: High-Impact Typography & Value Proposition */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5D117B] dark:text-[#07C8B2] font-bold">
                    <span>Desarrollo de Videojuegos & Experiencias Interactivas</span>
                  </div>

                  <h1
                    className="font-display font-bold tracking-tight text-[#0D1F17] dark:text-white leading-[1.08]"
                    style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)' }}
                  >
                    EXPERIENCIAS QUE NO SOLO SE JUEGAN: ENSEÑAN, COMUNICAN Y GENERAN IMPACTO.
                  </h1>

                  <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
                    En <strong>TVC Games</strong> desarrollamos videojuegos educativos, advergames publicitarios, proyectos culturales e instalaciones con hardware a medida como parte de un proceso de creación compartido.
                  </p>
                </div>

                <div className="pt-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#proyectos"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#03B16C] hover:bg-[#07C845] text-white hover:text-[#07120D] font-display text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 shadow-sm"
                    >
                      <span>Explorar Catálogo 2026</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#servicios"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-300 dark:border-white/20 hover:border-[#03B16C] dark:hover:border-[#07C845] text-sm font-semibold text-[#0D1F17] dark:text-white transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Ver Servicios & Capacidades</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Showcase Spotlight Card */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="h-full rounded-2xl overflow-hidden border border-[#03B16C]/25 dark:border-[#07C845]/30 bg-white dark:bg-[#0D1F17] shadow-lg flex flex-col justify-between">
                  {/* Spotlight Top Bar */}
                  <div className="px-5 py-3.5 bg-[#03B16C] text-white flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider shrink-0">
                      Destacado · {currentHeroProject.year}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {heroFeaturedProjects.map((proj, idx) => (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => setHeroShowcaseIdx(idx)}
                          aria-label={`Destacar proyecto ${proj.title}`}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer whitespace-nowrap ${
                            heroShowcaseIdx === idx
                              ? 'bg-[#D4FF33] text-[#07120D]'
                              : 'bg-black/20 text-white/80 hover:bg-black/35'
                          }`}
                        >
                          {proj.id === 'en-el-nombre-de-la-ley'
                            ? 'En el Nombre de la Ley'
                            : proj.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Container */}
                  <div
                    onClick={() => setActiveProjectModal(currentHeroProject)}
                    className="relative flex-1 min-h-[250px] w-full bg-[#07120D] overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={currentHeroProject.coverImage}
                      alt={currentHeroProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
                      <span className="text-xs font-mono text-[#D4FF33]">
                        {currentHeroProject.genreLabel} · {currentHeroProject.client}
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                        {currentHeroProject.title}
                      </h2>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 flex flex-col justify-between gap-4 shrink-0">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {currentHeroProject.summary}
                    </p>
                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-neutral-200 dark:border-white/10">
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        {renderProjectPlatforms(currentHeroProject)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveProjectModal(currentHeroProject)}
                        aria-label={`Ver ficha completa de ${currentHeroProject.title}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#03B16C]/10 dark:bg-[#07C845]/15 text-[#03B16C] dark:text-[#07C845] hover:bg-[#03B16C] hover:text-white dark:hover:bg-[#07C845] dark:hover:text-[#07120D] text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Ver Ficha</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Metrics Row Below Hero Split */}
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TVC_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0D1F17] border border-neutral-200 dark:border-white/10 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 min-h-[2.75rem]">
                    <span className="font-mono text-3xl sm:text-4xl font-bold leading-none text-[#03B16C] dark:text-[#07C845] tabular-nums whitespace-nowrap shrink-0">
                      {metric.value}
                    </span>
                    <span className="font-display text-xs uppercase tracking-wider font-bold leading-tight text-[#5D117B] dark:text-[#D4FF33]">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: SHOWCASE / CATÁLOGO DE PROYECTOS */}
        <section
          id="proyectos"
          className="py-20 sm:py-24 border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-[#091610]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-10">
              <SectionHeaderBanner
                titleLines={['NUESTROS', 'TRABAJOS']}
                subtitle="Catálogo Oficial 2025–2026"
                variant="green"
              />
            </div>

            {/* Interactive Category Filter Control Bar */}
            <div
              role="group"
              aria-label="Filtrar proyectos por categoría"
              className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#F0F7F4] dark:bg-[#10261B] border border-[#03B16C]/15 dark:border-[#07C845]/20 mb-10"
            >
              {PROJECT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id];
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#03B16C] text-white shadow-xs'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-[#03B16C] dark:hover:text-[#07C845]'
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 rounded-2xl border border-neutral-200 dark:border-white/10 text-center space-y-4">
                <p className="font-display text-lg font-bold text-[#0D1F17] dark:text-white">
                  No se encontraron proyectos con ese criterio
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Probá limpiando el filtro de búsqueda o seleccionando todas las categorías.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#03B16C] text-white text-xs font-semibold cursor-pointer"
                >
                  Mostrar todos los proyectos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                {filteredProjects.map((project) => {
                  const colSpanClass =
                    selectedCategory === 'all' && !searchQuery
                      ? project.featuredSpan
                        ? 'lg:col-span-7'
                        : 'lg:col-span-5'
                      : 'lg:col-span-6';

                  return (
                    <article
                      key={project.id}
                      className={`${colSpanClass} group rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-[#F6F9F7] dark:bg-[#0D1F17] hover:border-[#03B16C] dark:hover:border-[#07C845] transition-all flex flex-col justify-between`}
                    >
                      <div>
                        {/* Card Visual Media */}
                        <div
                          onClick={() => setActiveProjectModal(project)}
                          className="relative aspect-16/10 w-full bg-[#07120D] overflow-hidden cursor-pointer"
                        >
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Top-left Year Badge */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-[#D4FF33] text-[#07120D] font-mono text-xs font-bold tracking-wider">
                              {project.year}
                            </span>
                          </div>

                          {/* Bottom-left genre kicker */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                            <div>
                              <p className="text-xs font-mono text-[#D4FF33] uppercase tracking-wider">
                                {project.genreLabel}
                              </p>
                              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                                {project.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Card Text Content (Lead directly with clean unboxed metadata) */}
                        <div className="p-6 space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <span className="font-semibold text-[#03B16C] dark:text-[#07C845]">
                              {project.client}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.teamSizeOrHardware}</span>
                          </div>

                          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {project.summary}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Platforms & Modal Trigger */}
                      <div className="px-6 pb-6 pt-3 border-t border-neutral-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                          {renderProjectPlatforms(project)}
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveProjectModal(project)}
                          aria-label={`Ver ficha completa de ${project.title}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#03B16C]/10 dark:bg-[#07C845]/15 text-[#03B16C] dark:text-[#07C845] hover:bg-[#03B16C] hover:text-white dark:hover:bg-[#07C845] dark:hover:text-[#07120D] text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>Ver Ficha</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 02: SERVICIOS Y CAPACIDADES */}
        <section
          id="servicios"
          className="py-20 sm:py-24 border-t border-neutral-200 dark:border-white/10 bg-[#F6F9F7] dark:bg-[#07120D]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="space-y-4">
                <SectionHeaderBanner
                  titleLines={['QUÉ', 'HACEMOS']}
                  subtitle="Servicios & Capacidades"
                  variant="white"
                />
                <p className="text-base text-neutral-700 dark:text-neutral-300 max-w-2xl">
                  Desarrollamos experiencias interactivas adaptadas a distintos objetivos. Trabajamos con instituciones, marcas y equipos que buscan explorar el potencial del videojuego como herramienta de comunicación, aprendizaje o expresión.
                </p>
              </div>
            </div>

            {/* Asymmetric Bento Grid for the 5 Core Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {TVC_SERVICES.map((service, index) => {
                const spanClass =
                  index < 2 ? 'lg:col-span-6' : 'lg:col-span-4';
                return (
                  <div
                    key={service.id}
                    className={`${spanClass} p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1F17] border border-neutral-200 dark:border-white/10 flex flex-col justify-between gap-6`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#03B16C]/10 dark:bg-[#07C845]/15 text-[#03B16C] dark:text-[#07C845] flex items-center justify-center shrink-0">
                          {renderServiceIcon(service.iconName)}
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#0D1F17] dark:text-white tracking-wide">
                        {service.title}
                      </h3>

                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 pt-2">
                        {service.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
                      <span className="text-neutral-500 dark:text-neutral-400 truncate">
                        Caso: {service.relatedProjectCode}
                      </span>
                      <a
                        href="#contacto"
                        onClick={() =>
                          setPreselectedInquiryTitle(service.title)
                        }
                        className="font-display font-bold uppercase tracking-wider text-[#03B16C] dark:text-[#07C845] hover:underline whitespace-nowrap shrink-0"
                      >
                        Consultar →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 01, 04 & 05: SOBRE EL ESTUDIO, CÓMO TRABAJAMOS Y QUÉ NOS DIFERENCIA */}
        <section
          id="estudio"
          className="py-20 sm:py-24 border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-[#091610]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Block: QUIÉNES SOMOS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <SectionHeaderBanner
                  titleLines={['QUIENES', 'SOMOS']}
                  subtitle="Filosofía Cooperativa"
                  variant="green"
                />

                <div className="space-y-4 text-base text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  <p>
                    En <strong>TVC Games</strong> desarrollamos videojuegos y experiencias interactivas como parte de un proceso de creación compartido.
                  </p>
                  <p>
                    Trabajamos en <strong>proyectos educativos, culturales y de entretenimiento</strong>, con una mirada atenta al impacto que puede tener el juego en distintos contextos.
                  </p>
                  <p>
                    Construimos cada proyecto en diálogo: intercambiando ideas, ajustando y encontrando la mejor forma de transformar una intención en una experiencia jugable.
                  </p>
                  <p className="font-semibold text-[#03B16C] dark:text-[#07C845] text-lg">
                    Creamos experiencias que no solo se juegan, sino que también enseñan, comunican y generan impacto.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border-2 border-[#03B16C] shadow-lg bg-[#07120D]">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/tvc/team_stage.jpg`}
                    alt="Integrantes de Tucumán Videojuego Cooperativa presentando en escenario"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 object-cover object-top"
                  />
                  <div className="p-4 bg-[#03B16C] text-white text-xs font-mono">
                    Presentación oficial y articulación con la comunidad de desarrollo en Tucumán.
                  </div>
                </div>
              </div>
            </div>

            {/* Block: CÓMO TRABAJAMOS */}
            <div className="p-6 sm:p-10 rounded-2xl bg-[#03B16C] text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <SectionHeaderBanner
                  titleLines={['CÓMO', 'TRABAJAMOS']}
                  subtitle="Metodología en Diálogo"
                  variant="lime"
                />

                <div className="space-y-4 text-base text-white/95 leading-relaxed">
                  <p>
                    <strong>Adaptamos</strong> los proyectos a las necesidades de cada producción: su <strong>finalidad, público objetivo, estética y experiencia completa</strong>.
                  </p>
                  <p>
                    Trabajamos de manera <strong>colaborativa</strong>, manteniendo un <strong>diálogo constante</strong> con quienes forman parte del proyecto.
                  </p>
                  <p>
                    Nos interesa que cada decisión de diseño responda a una <strong>experiencia concreta</strong> que queremos generar.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border-2 border-[#D4FF33]/50 shadow-lg bg-[#07120D]">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/tvc/como_trabajamos_playtest.jpg`}
                    alt="Familia jugando una experiencia interactiva de TVC en pantalla gigante"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Block: QUÉ NOS DIFERENCIA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-8">
                <SectionHeaderBanner
                  titleLines={['QUÉ NOS', 'DIFERENCIA']}
                  subtitle="Valor Diferencial TVC"
                  variant="green"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {TVC_DIFFERENTIATORS.map((diff) => (
                    <div
                      key={diff.title}
                      className="p-5 rounded-2xl bg-[#F6F9F7] dark:bg-[#0D1F17] border border-neutral-200 dark:border-white/10 space-y-2"
                    >
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#0D1F17] dark:text-white">
                        {diff.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {diff.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/15 bg-[#F6F9F7] dark:bg-[#0D1F17] p-4">
                  <img
                    src="/assets/tvc/ley_poster_ilustrado.jpg"
                    alt="Póster ilustrado de En el Nombre de la Ley — Honorable Legislatura de Tucumán"
                    referrerPolicy="no-referrer"
                    className="w-full rounded-xl object-cover"
                  />
                  <p className="mt-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 text-center">
                    Arte original · En el Nombre de la Ley (2025)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULARIO DE CONTACTO COMERCIAL */}
        <ContactSection
          preselectedProjectTitle={preselectedInquiryTitle}
          onClearPreselected={() => setPreselectedInquiryTitle(null)}
        />
      </main>

      {/* QUIET INSTITUTIONAL FOOTER */}
      <footer className="bg-[#07120D] text-white/80 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <TvcCactusIcon className="w-10 h-10 shrink-0" />
            <div>
              <p className="font-display text-base font-bold text-white tracking-wider">
                TVC GAMES
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#proyectos" className="hover:text-[#07C845] transition-colors">
              Proyectos
            </a>
            <a href="#servicios" className="hover:text-[#07C845] transition-colors">
              Servicios
            </a>
            <a href="#estudio" className="hover:text-[#07C845] transition-colors">
              Quiénes Somos
            </a>
            <a href="#contacto" className="hover:text-[#07C845] transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © 2025–2026 TVC Games. Todos los derechos reservados.
          </p>
          <a
            href={`mailto:${TVC_CONTACT_EMAIL}`}
            className="text-white/80 hover:text-[#07C845] transition-colors font-mono"
          >
            {TVC_CONTACT_EMAIL}
          </a>
        </div>
      </footer>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onSelectForInquiry={handleSelectProjectForInquiry}
      />
    </div>
  );
}
