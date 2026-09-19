import React from 'react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'library', label: 'My Library', icon: '📚' },
    { id: 'planner', label: 'Study Planner', icon: '📅' },
    { id: 'ai', label: 'AI Assistant', icon: '🤖' },
    { id: 'doubt', label: 'Doubt Board', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="icon">📘</span> StudySync
      </div>
      
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>

      <div className="sidebar-bottom">
        <div className="card" style={{ padding: '16px', backgroundColor: 'var(--color-sand)', border: 'none' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Pro Plan</h4>
          <p style={{ fontSize: '12px', color: 'var(--color-charcoal)', marginBottom: '12px' }}>Upgrade to unlock more AI features.</p>
          <button className="btn btn-primary" style={{ width: '100%', padding: '6px' }}>Upgrade</button>
        </div>
      </div>
    </aside>
  );
}
