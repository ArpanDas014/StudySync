import React from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import StudySyncLogo from './components/StudySyncLogo';
import { commBell, accFullscreen } from './assets';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '280px' }}>
        <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--theme-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Menu size={22} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <StudySyncLogo variant="compact" height={28} />
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
        <button onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Focus Mode">
          <img src={accFullscreen} width={20} height={20} alt="Fullscreen" />
        </button>
        <ThemeToggle />
        <button style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={commBell} width={20} height={20} alt="Notifications" />
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

