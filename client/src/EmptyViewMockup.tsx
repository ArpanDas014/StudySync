import React from 'react';
import { Layers } from 'lucide-react';

export default function EmptyViewMockup({ viewTitle }: { viewTitle: string }) {
  return (
    <div className="dashboard-mockup-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--theme-text-secondary)', maxWidth: '400px' }}>
        <Layers size={48} opacity={0.2} style={{ margin: '0 auto 16px', display: 'block' }} />
        <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: '8px', fontSize: 'var(--font-size-2xl)' }}>{viewTitle}</h3>
        <p style={{ marginBottom: '24px', fontSize: 'var(--font-size-md)' }}>This section has no active content yet. Check back soon for updates.</p>
      </div>
    </div>
  );
}
