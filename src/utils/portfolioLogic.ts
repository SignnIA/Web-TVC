import { ProjectCategory, TvcProject } from '../data/tvcData';

export interface ContactFormValues {
  name: string;
  organization: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  message: string;
}

export interface ContactFormValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}

export function filterProjects(
  projects: TvcProject[],
  category: ProjectCategory,
  searchQuery: string = ''
): TvcProject[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const projectCategories = project.categories ?? [project.category];
    const matchesCategory =
      category === 'all' || projectCategories.includes(category);
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      project.code,
      project.title,
      project.year,
      project.genreLabel,
      project.client,
      project.summary,
      project.objective,
      ...project.platforms,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getCategoryCounts(
  projects: TvcProject[]
): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    all: projects.length,
    educativo: 0,
    instalaciones: 0,
    'ip-original': 0,
    advergame: 0,
  };

  for (const project of projects) {
    const projectCategories = project.categories ?? [project.category];
    for (const cat of projectCategories) {
      counts[cat] = (counts[cat] || 0) + 1;
    }
  }

  return counts;
}

export function validateContactForm(
  values: ContactFormValues
): ContactFormValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Ingresá tu nombre completo (mínimo 2 caracteres).';
  }

  if (!values.organization || values.organization.trim().length < 2) {
    errors.organization = 'Indicá la institución, marca o estudio.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) {
    errors.email = 'Ingresá un correo electrónico válido (ej. contacto@institucion.gob.ar).';
  }

  if (!values.projectType || values.projectType.trim().length === 0) {
    errors.projectType = 'Seleccioná el tipo de experiencia o servicio requerido.';
  }

  if (!values.message || values.message.trim().length < 15) {
    errors.message = 'Contanos brevemente el objetivo del proyecto (mínimo 15 caracteres).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export const TVC_CONTACT_EMAIL = 'info@tvcgames.com';

export function buildInquiryMailtoUrl(values: ContactFormValues): string {
  const subject = `[TVC Games] Consulta: ${values.projectType} — ${values.organization.trim()}`;
  const bodyLines = [
    `Nombre: ${values.name.trim()}`,
    `Organización / Marca / Estudio: ${values.organization.trim()}`,
    `Email de contacto: ${values.email.trim()}`,
    values.phone.trim() ? `Teléfono: ${values.phone.trim()}` : null,
    `Línea de desarrollo: ${values.projectType}`,
    `Escala / Plataforma: ${values.budgetRange}`,
    '',
    'Mensaje / Objetivo del proyecto:',
    values.message.trim(),
  ].filter((line): line is string => line !== null);

  return `mailto:${TVC_CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

