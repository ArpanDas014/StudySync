import React from 'react';
import { Search, Bell, ChevronDown, Menu, Maximize } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function GlobalHeader({ sidebarState, setSidebarState, toggleFullscreen, isSidebarOpen, setIsSidebarOpen }: any) {
  const toggleSidebar = () => {
    if (window.innerWidth <= 900) {
      if (setIsSidebarOpen) setIsSidebarOpen(!isSidebarOpen);
    } else {
      if (sidebarState === 'expanded') setSidebarState('collapsed');
      else if (sidebarState === 'collapsed') setSidebarState('hidden');
      else setSidebarState('expanded');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      borderBottom: '1px solid var(--theme-border)',
      background: 'var(--theme-surface)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)'
    }}>
      {/* LEFT: Logo + Hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '280px' }}>
        <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--theme-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Menu size={22} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 8H15L10 16L15 24H25L30 16L25 8Z" fill="#10B981" fillOpacity="0.2"/>
            <path d="M12 20C12 20 18 10 24 10C30 10 32 16 32 16L28 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
            <path d="M28 20C28 20 22 30 16 30C10 30 8 24 8 24L12 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--theme-text-primary)' }}>Study<span style={{ color: '#10B981' }}>Sync</span></span>
        </div>
      </div>

      {/* CENTER: Search */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
        <div className="mockup-search-container" style={{ width: '100%', maxWidth: '600px', margin: 0, background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border-strong)', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={18} color="var(--theme-text-secondary)" />
          <input type="text" placeholder="Search computer science topics, notes, or resources..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--theme-text-primary)' }} />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '280px', justifyContent: 'flex-end' }}>
        <button onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer', padding: '8px' }} title="Focus Mode">
          <Maximize size={20} />
        </button>
        <ThemeToggle />
        <button style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></div>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--theme-border-strong)', color: 'var(--theme-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '12px' }}>AD</div>
          <ChevronDown size={16} color="var(--theme-text-secondary)" />
        </button>
      </div>
    </div>
  );
}
