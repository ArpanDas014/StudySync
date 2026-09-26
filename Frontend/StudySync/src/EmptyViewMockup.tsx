import React from 'react';
import {
  illusNoNotifications,
  illusNoFiles,
  illusSettings,
  illusNoSearchResults,
  illusLearningKnowledge,
  illusProfileAccount,
  illusCalendarScheduling,
  illusProgressTracking,
  illusNoResults
} from './assets';

export default function EmptyViewMockup({ viewTitle }: { viewTitle: string }) {
  const getIllustration = (title: string): string => {
    const key = title.toLowerCase().trim();
    if (key.includes('notification')) return illusNoNotifications;
    if (key.includes('file') || key.includes('library')) return illusNoFiles;
    if (key.includes('setting') || key.includes('advanced')) return illusSettings;
    if (key.includes('search')) return illusNoSearchResults;
    if (key.includes('ai') || key.includes('doubt') || key.includes('mentor')) return illusLearningKnowledge;
    if (key.includes('profile') || key.includes('admin') || key.includes('account')) return illusProfileAccount;
    if (key.includes('event') || key.includes('online') || key.includes('class')) return illusCalendarScheduling;
    if (key.includes('analytic') || key.includes('visual')) return illusProgressTracking;
    return illusNoResults;
  };

  const illustrationSrc = getIllustration(viewTitle);

  return (
    <div className="dashboard-mockup-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--theme-text-secondary)', maxWidth: '540px' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={illustrationSrc} 
            alt={viewTitle} 
            style={{ 
              maxWidth: '320px', 
              width: '100%', 
              height: 'auto', 
              maxHeight: '220px', 
              objectFit: 'contain',
              borderRadius: '16px',
              filter: 'drop-shadow(0 8px 24px rgba(11, 61, 46, 0.06))'
            }} 
          />
        </div>
        <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: '8px', fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>{viewTitle}</h3>
        <p style={{ marginBottom: '24px', fontSize: 'var(--font-size-md)', lineHeight: 1.5 }}>
          This section has no active content yet. Check back soon for updates or explore other areas of StudySync.
        </p>
      </div>
    </div>
  );
}
