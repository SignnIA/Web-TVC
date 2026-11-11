import React, { useEffect, useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import {
  ContactFormValues,
  TVC_CONTACT_EMAIL,
  buildInquiryMailtoUrl,
  validateContactForm,
} from '../utils/portfolioLogic';

interface SubmittedBrief extends ContactFormValues {
  id: string;
  submittedAt: string;
  mailtoUrl: string;
}

interface ContactSectionProps {
  preselectedProjectTitle?: string | null;
  onClearPreselected?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedProjectTitle,
  onClearPreselected,
}) => {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectType: 'Videojuego Educativo (Edutainment)',
    budgetRange: 'Institucional / A cotizar',
    message: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [submittedBriefs, setSubmittedBriefs] = useState<SubmittedBrief[]>([]);
  const [lastSubmitted, setLastSubmitted] = useState<SubmittedBrief | null>(null);

  useEffect(() => {
    if (preselectedProjectTitle) {
      setFormValues((prev) => ({
        ...prev,
        message: `Hola equipo de TVC Games, nos interesa conversar sobre un desarrollo inspirado en "${preselectedProjectTitle}" para nuestra organización.`,
      }));
    }
  }, [preselectedProjectTitle]);

  const handleChange = (
    field: keyof ContactFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formValues);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const mailtoUrl = buildInquiryMailtoUrl(formValues);

    const newBrief: SubmittedBrief = {
      ...formValues,
      id: `TVC-${100 + submittedBriefs.length + 1}`,
      submittedAt: new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      mailtoUrl,
    };

    setSubmittedBriefs((prev) => [newBrief, ...prev]);
    setLastSubmitted(newBrief);
    setErrors({});

    // Trigger mail client to send inquiry directly to info@tvcgames.com
    const mailLink = document.createElement('a');
    mailLink.href = mailtoUrl;
    mailLink.style.display = 'none';
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);

    setFormValues({
      name: '',
      organization: '',
      email: '',
      phone: '',
      projectType: 'Videojuego Educativo (Edutainment)',
      budgetRange: 'Institucional / A cotizar',
      message: '',
    });
    if (onClearPreselected) onClearPreselected();
  };

  return (
    <section
      id="contacto"
      className="py-20 sm:py-24 bg-[#03B16C] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info (Exclusively info@tvcgames.com) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 rounded bg-[#5D117B] text-white font-mono text-xs font-bold uppercase tracking-wider mb-4">
                Contacto Comercial & Alianzas
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase leading-tight">
                CONSTRUYAMOS TU PRÓXIMA EXPERIENCIA
              </h2>
              <p className="mt-4 text-base text-white/90 leading-relaxed">
                Trabajamos en diálogo con instituciones públicas, escuelas, empresas, bandas y estudios que buscan transformar una intención en una experiencia jugable con impacto real.
              </p>
            </div>

            {/* Official Email Channel Only */}
            <div className="space-y-4 pt-4 border-t border-white/20">
              <a
                href={`mailto:${TVC_CONTACT_EMAIL}`}
                className="flex items-center gap-4 p-5 rounded-xl bg-black/15 hover:bg-black/25 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-white text-[#03B16C] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-white/75">
                    Correo Electrónico Oficial
                  </span>
                  <span className="font-sans text-lg sm:text-xl font-bold">
                    {TVC_CONTACT_EMAIL}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm text-white/85 pt-2">
                <MapPin className="w-4 h-4 text-[#D4FF33] shrink-0" />
                <span>
                  San Miguel de Tucumán, Tucumán, Argentina · Proyección Internacional
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B1B13] text-[#0D1F17] dark:text-white shadow-xl border border-white/20">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0D1F17] dark:text-white">
                    SOLICITAR PROPUESTA O REUNIÓN
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    Tu consulta será enviada directamente a <strong>{TVC_CONTACT_EMAIL}</strong>.
                  </p>
                </div>
                {preselectedProjectTitle && (
                  <span className="text-xs font-mono text-[#03B16C] dark:text-[#07C845]">
                    Ref: {preselectedProjectTitle}
                  </span>
                )}
              </div>

              {lastSubmitted && (
                <div
                  role="status"
                  className="mb-6 p-4 rounded-xl bg-[#F0F7F4] dark:bg-[#132E21] border border-[#03B16C] dark:border-[#07C845] text-sm"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#03B16C] dark:text-[#07C845] shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-bold text-[#0D1F17] dark:text-white">
                        ¡Consulta preparada y enviada a {TVC_CONTACT_EMAIL} ({lastSubmitted.id})!
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-200">
                        Gracias <strong>{lastSubmitted.name}</strong> ({lastSubmitted.organization}). Tu solicitud sobre <strong>{lastSubmitted.projectType}</strong> fue dirigida a <strong>{TVC_CONTACT_EMAIL}</strong>.
                      </p>
                      <a
                        href={lastSubmitted.mailtoUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#03B16C] dark:text-[#07C845] underline"
                      >
                        Abrir nuevamente en tu cliente de correo ({TVC_CONTACT_EMAIL})
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Nombre y Apellido *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formValues.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Ej. Rosario Paz"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Institución / Marca / Estudio *
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={formValues.organization}
                      onChange={(e) =>
                        handleChange('organization', e.target.value)
                      }
                      placeholder="Ej. Secretaría de Cultura / Empresa"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                    />
                    {errors.organization && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.organization}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formValues.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="contacto@organizacion.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Teléfono / WhatsApp (Opcional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formValues.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+54 381 ..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Línea de Desarrollo *
                    </label>
                    <select
                      id="contact-project-type"
                      value={formValues.projectType}
                      onChange={(e) =>
                        handleChange('projectType', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                    >
                      <option value="Videojuego Educativo (Edutainment)">
                        Videojuego Educativo (Edutainment)
                      </option>
                      <option value="Videojuego Publicitario (Advergame)">
                        Videojuego Publicitario (Advergame)
                      </option>
                      <option value="Proyecto Cultural Interactivo">
                        Proyecto Cultural Interactivo
                      </option>
                      <option value="Instalación Física / Hardware Custom / VR-AR">
                        Instalación Física / Hardware Custom / VR-AR
                      </option>
                      <option value="Servicios de Desarrollo para Estudios (Co-Dev)">
                        Servicios de Desarrollo para Estudios (Co-Dev)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Escala / Plataforma Objetivo
                    </label>
                    <select
                      id="contact-budget"
                      value={formValues.budgetRange}
                      onChange={(e) =>
                        handleChange('budgetRange', e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                    >
                      <option value="Institucional / A cotizar">
                        Institucional / A cotizar
                      </option>
                      <option value="Mobile (Android & iOS)">
                        Mobile (Android & iOS)
                      </option>
                      <option value="Evento en Vivo / Periférico Físico">
                        Evento en Vivo / Periférico Físico
                      </option>
                      <option value="PC / Steam / Smart TV">
                        PC / Steam / Smart TV
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
                  >
                    Objetivo y Contexto del Proyecto *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formValues.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Contanos qué experiencia querés generar, a qué público está dirigida y fechas estimadas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F6F9F7] dark:bg-[#07120D] border border-neutral-300 dark:border-white/15 text-sm text-[#0D1F17] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03B16C]"
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    * Campos obligatorios. Respuesta directa del equipo de TVC.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#03B16C] hover:bg-[#07C845] text-white hover:text-[#07120D] font-display text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Propuesta</span>
                  </button>
                </div>
              </form>

              {/* Submitted Briefs Log in Current Session */}
              {submittedBriefs.length > 0 && (
                <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-white/10">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    Solicitudes enviadas en esta sesión ({submittedBriefs.length})
                  </p>
                  <div className="space-y-2">
                    {submittedBriefs.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-wrap items-center justify-between gap-2 text-xs p-2.5 rounded-lg bg-[#F6F9F7] dark:bg-[#07120D]"
                      >
                        <span className="font-mono font-semibold text-[#03B16C] dark:text-[#07C845]">
                          {item.id} · {item.organization}
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-300">
                          {item.projectType} · {item.submittedAt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
