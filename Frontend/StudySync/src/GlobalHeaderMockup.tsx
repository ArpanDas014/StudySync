import React, { useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, Maximize } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function GlobalHeaderMockup({ toggleSidebar, toggleFullscreen }: any) {
  return (
    <div className="global-header-mockup" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid var(--theme-border)',
      background: 'var(--theme-surface)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)'
    }}>
      {/* LEFT: Logo + Hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="mockup-logo-area" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 8H15L10 16L15 24H25L30 16L25 8Z" fill="#10B981" fillOpacity="0.2"/>
            <path d="M12 20C12 20 18 10 24 10C30 10 32 16 32 16L28 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
            <path d="M28 20C28 20 22 30 16 30C10 30 8 24 8 24L12 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--theme-text-primary)' }}>Study<span style={{ color: '#10B981' }}>Sync</span></span>
        </div>
        <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--theme-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Menu size={22} />
        </button>
      </div>

      {/* CENTER: Search */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
        <div className="mockup-search-container" style={{ width: '100%', maxWidth: '600px', margin: 0 }}>
          <Search size={18} color="var(--theme-text-secondary)" />
          <input type="text" placeholder="Search computer science topics, notes, or resources..." style={{ flex: 1 }} />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="mockup-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer', padding: '8px' }} title="Focus Mode">
          <Maximize size={20} />
        </button>
        <ThemeToggle />
        <button className="mockup-bell-btn">
          <Bell size={20} color="var(--theme-text-secondary)" />
        </button>
        <button className="mockup-avatar-btn">
          <div className="mockup-avatar">AD</div>
          <ChevronDown size={16} color="var(--theme-text-secondary)" />
        </button>
      </div>
    </div>
  );
}
