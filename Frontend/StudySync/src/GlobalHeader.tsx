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
    <header className="global-header-bar">
      {/* LEFT: Hamburger + Logo */}
      <div className="global-header-left">
        <button 
          onClick={toggleSidebar} 
          className="global-header-menu-btn"
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="global-header-logo-wrap">
          <StudySyncLogo variant="compact" height={28} />
        </div>
      </div>

      {/* CENTER: Search (desktop only) */}
      <div className="global-header-search-wrap">
        <div className="mockup-search-container" style={{ width: '100%', maxWidth: '520px', margin: 0, background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border-strong)', padding: '8px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={16} color="var(--theme-text-secondary)" />
          <input 
            type="text" 
            placeholder="Search topics, notes, or resources..." 
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--theme-text-primary)', fontSize: '0.88rem' }} 
          />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="global-header-right">
        <button 
          onClick={toggleFullscreen} 
          className="global-header-fullscreen-btn" 
          title="Focus Mode"
          aria-label="Toggle focus mode"
        >
          <img src={accFullscreen} width={18} height={18} alt="Fullscreen" />
        </button>
        <ThemeToggle />
        <button 
          className="global-header-icon-btn" 
          title="Notifications"
          aria-label="Notifications"
        >
          <img src={commBell} width={18} height={18} alt="Notifications" />
          <span className="global-header-badge" />
        </button>
        <button className="global-header-user-btn" aria-label="User profile">
          <div className="global-header-avatar">AD</div>
          <ChevronDown size={14} className="global-header-chevron" color="var(--theme-text-secondary)" />
        </button>
      </div>
    </header>
  );
}

