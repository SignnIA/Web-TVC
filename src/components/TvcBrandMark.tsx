import React from 'react';

interface TvcCactusIconProps {
  className?: string;
  variant?: 'framed' | 'free';
}

/**
 * Official TVC Games logo component using the user-supplied asset
 * (/assets/aistudio/TVC_color_-_invertida_17a5510a.png).
 */
export const TvcCactusIcon: React.FC<TvcCactusIconProps> = ({
  className = 'w-10 h-10',
}) => {
  return (
    <img
      src="/assets/aistudio/TVC_color_-_invertida_17a5510a.png"
      alt="TVC Games Logo"
      referrerPolicy="no-referrer"
      className={`${className} object-contain select-none`}
    />
  );
};

interface SectionHeaderBannerProps {
  number?: string;
  titleLines: string[];
  subtitle?: string;
  variant?: 'green' | 'white' | 'lime' | 'purple';
}

/**
 * Replicates the signature section header block from TVC Games:
 * Left side: Nasalization title lines
 * Vertical divider line
 * Right side: Subtitle + globe/star/barcode graphic (without portfolio slide numbers)
 */
export const SectionHeaderBanner: React.FC<SectionHeaderBannerProps> = ({
  titleLines,
  subtitle,
  variant = 'green',
}) => {
  const containerStyles = {
    green:
      'bg-[#03B16C] text-white border-[#07C845]/30 shadow-sm',
    white:
      'bg-white dark:bg-[#0D2118] text-[#03B16C] dark:text-[#07C845] border-[#03B16C]/20 dark:border-[#07C845]/25 shadow-sm',
    lime:
      'bg-[#D4FF33] text-[#07120D] border-[#03B16C]/30 shadow-sm',
    purple:
      'bg-[#5D117B] text-white border-[#5D117B]/40 shadow-sm',
  }[variant];

  const dividerStyles = {
    green: 'bg-[#D4FF33]',
    white: 'bg-[#03B16C] dark:bg-[#07C845]',
    lime: 'bg-[#03B16C]',
    purple: 'bg-[#07C8B2]',
  }[variant];

  const rightTextStyles = {
    green: 'text-white',
    white: 'text-[#07120D] dark:text-white',
    lime: 'text-[#07120D]',
    purple: 'text-white',
  }[variant];

  const titleStyles = {
    green: 'text-white',
    white: 'text-[#03B16C] dark:text-[#07C845]',
    lime: 'text-[#03B16C]',
    purple: 'text-white',
  }[variant];

  return (
    <div
      className={`inline-flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8 px-6 py-5 sm:px-8 sm:py-6 rounded-2xl border ${containerStyles}`}
    >
      <div className={`flex flex-col leading-none ${titleStyles}`}>
        {titleLines.map((line, idx) => (
          <span
            key={idx}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider uppercase"
          >
            {line}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-5 sm:gap-6">
        <div
          className={`hidden sm:block w-[2px] h-14 shrink-0 ${dividerStyles}`}
          aria-hidden="true"
        />
        <div className={`flex flex-col justify-center ${rightTextStyles}`}>
          {subtitle && (
            <span className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase opacity-95">
              {subtitle}
            </span>
          )}
          {/* Globe + Star + Barcode graphic from Portfolio PDF */}
          <div className="flex items-center gap-2 mt-2 opacity-85" aria-hidden="true">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </svg>
            <div className="w-16 h-3.5 tvc-barcode" />
          </div>
        </div>
      </div>
    </div>
  );
};
