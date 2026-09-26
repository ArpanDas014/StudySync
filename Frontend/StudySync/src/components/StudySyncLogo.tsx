import React, { useId, useEffect, useState } from 'react';

export interface StudySyncLogoProps {
  variant?: 'compact' | 'full' | 'stacked' | 'icon';
  theme?: 'light' | 'dark' | 'auto';
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export default function StudySyncLogo({
  variant = 'compact',
  theme = 'auto',
  height,
  width,
  className = '',
  style = {},
  alt = 'StudySync'
}: StudySyncLogoProps) {
  const uniqueId = useId().replace(/:/g, '');
  
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          setIsDark(currentTheme === 'dark');
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const effectiveIsDark = theme === 'dark' ? true : (theme === 'light' ? false : isDark);

  // High contrast color mappings:
  // Light mode: Deep slate / dark ink #0F172A (high contrast against white/light backgrounds)
  // Dark mode: Pure crisp white #FFFFFF (high contrast against dark/navy backgrounds)
  const studyColor = theme === 'dark' 
    ? '#FFFFFF' 
    : (theme === 'light' 
        ? '#0F172A' 
        : (effectiveIsDark ? '#FFFFFF' : 'var(--theme-text-primary, #0F172A)'));

  const syncColor = '#10B981'; // Brand emerald green

  const taglineColor = theme === 'dark'
    ? '#94A3B8'
    : (theme === 'light'
        ? '#64748B'
        : (effectiveIsDark ? '#94A3B8' : 'var(--theme-text-secondary, #64748B)'));

  const defaultHeight = variant === 'icon' ? 32 : (variant === 'compact' ? 32 : (variant === 'stacked' ? 56 : 36));
  const renderedHeight = height ?? defaultHeight;

  // Defs with unique IDs to prevent gradient collisions across multiple logo instances
  const flowAId = `ss-flow-a-${uniqueId}`;
  const flowBId = `ss-flow-b-${uniqueId}`;

  const renderDefs = () => (
    <defs>
      <linearGradient id={flowAId} x1="20" y1="6" x2="78" y2="108" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B3D2E" />
        <stop offset="0.55" stopColor="#126F4F" />
        <stop offset="1" stopColor="#A7F15B" />
      </linearGradient>
      <linearGradient id={flowBId} x1="84" y1="22" x2="24" y2="112" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B3D2E" />
        <stop offset="0.62" stopColor="#126F4F" />
        <stop offset="1" stopColor="#A7F15B" />
      </linearGradient>
    </defs>
  );

  const renderMark = () => (
    <g id="studysync-mark">
      <path 
        d="M72 21C60 18 44 20 33 28c-13 9-17 22-7 31 7 7 20 11 28 17 6 4 7 9 1 14-8 7-23 5-31-3-4-4-7-9-8-14-5 15 3 29 17 34 17 7 39 2 48-11 10-15 2-29-15-38-9-5-22-10-25-17-3-8 5-14 13-16 8-2 16 0 22 5-1-4-3-7-5-9Z" 
        fill={`url(#${flowAId})`} 
      />
      <path 
        d="M38 27c12-7 25-6 34 1-6-6-14-9-23-8-10 1-19 6-24 14-6 10-3 20 8 28 8 6 21 11 27 17 5 5 4 10-2 14-9 6-22 3-30-5 4 10 13 17 24 18 15 2 29-6 33-18 5-15-8-26-23-33-10-5-21-10-23-17-2-4-1-8 3-11Z" 
        fill={`url(#${flowBId})`} 
      />
      <path 
        d="M73 8l3.7 10.3L87 22l-10.3 3.7L73 36l-3.7-10.3L59 22l10.3-3.7L73 8Z" 
        fill="#A7F15B" 
      />
      <circle cx="88.5" cy="12" r="2.3" fill="#A7F15B" />
    </g>
  );

  const baseSvgStyle: React.CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    overflow: 'visible',
    height: renderedHeight,
    width: width ?? 'auto',
    maxWidth: '100%',
    flexShrink: 0,
    userSelect: 'none',
    ...style
  };

  // 1. Standalone Icon Mark
  if (variant === 'icon') {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 112 116" 
        fill="none"
        className={`studysync-logo studysync-logo-icon ${className}`}
        style={baseSvgStyle}
        aria-label={alt}
      >
        <title>{alt}</title>
        {renderDefs()}
        {renderMark()}
      </svg>
    );
  }

  // 2. Stacked Logo (Mark + Typography + Tagline)
  if (variant === 'stacked') {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 300 218" 
        fill="none"
        className={`studysync-logo studysync-logo-stacked ${className}`}
        style={baseSvgStyle}
        aria-label={alt}
      >
        <title>{alt}</title>
        {renderDefs()}
        <g transform="translate(94 6)">
          {renderMark()}
        </g>
        <g transform="translate(55 151)">
          <text 
            x="0" 
            y="40" 
            fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="42" 
            fontWeight="800" 
            letterSpacing="-1"
          >
            <tspan fill={studyColor}>Study</tspan>
            <tspan fill={syncColor}>Sync</tspan>
          </text>
        </g>
        <text 
          x="51" 
          y="190" 
          fill={taglineColor} 
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="15" 
          fontWeight="500"
          letterSpacing="0.08em"
        >
          Plan <tspan fill={syncColor}>•</tspan> Focus <tspan fill={syncColor}>•</tspan> Learn <tspan fill={syncColor}>•</tspan> Grow
        </text>
      </svg>
    );
  }

  // 3. Compact & Full Horizontal Logo (Mark + "StudySync")
  // Uses tight 360x116 viewBox to eliminate blank trailing whitespace
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 360 116" 
      fill="none"
      className={`studysync-logo studysync-logo-horizontal ${className}`}
      style={baseSvgStyle}
      aria-label={alt}
    >
      <title>{alt}</title>
      {renderDefs()}
      <g transform="translate(6 2)">
        {renderMark()}
      </g>
      <g transform="translate(128 38)">
        <text 
          x="0" 
          y="40" 
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="44" 
          fontWeight="800" 
          letterSpacing="-1"
        >
          <tspan fill={studyColor}>Study</tspan>
          <tspan fill={syncColor}>Sync</tspan>
        </text>
      </g>
    </svg>
  );
}

export { StudySyncLogo };
