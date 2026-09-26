import React, { useEffect, useState } from 'react';
import { 
  logoCompactHeader, 
  logoPrimary, 
  logoDark, 
  logoIcon, 
  logoStacked 
} from '../assets';

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

  const getSource = () => {
    switch (variant) {
      case 'icon':
        return logoIcon;
      case 'stacked':
        // If theme is dark, use logoDark to ensure high-contrast readable white typography
        return effectiveIsDark ? logoDark : logoStacked;
      case 'full':
        return effectiveIsDark ? logoDark : logoPrimary;
      case 'compact':
      default:
        return effectiveIsDark ? logoDark : logoCompactHeader;
    }
  };

  const defaultHeight = variant === 'icon' ? 32 : (variant === 'compact' ? 32 : (variant === 'stacked' ? 56 : 36));

  return (
    <img
      src={getSource()}
      alt={alt}
      height={height ?? defaultHeight}
      width={width}
      className={`studysync-logo ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain',
        maxWidth: '100%',
        width: width ?? 'auto',
        height: height ?? defaultHeight,
        flexShrink: 0,
        ...style
      }}
      draggable={false}
    />
  );
}

export { StudySyncLogo };
