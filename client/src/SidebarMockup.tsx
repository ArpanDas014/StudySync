import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Users, Video, FileText, User, Calendar, CheckSquare, 
  Layers, ClipboardCheck, Folder, CalendarCheck, Menu 
} from 'lucide-react';
import './sidebar-mockup.css';

export default function SidebarMockup({ view, setView, isSidebarOpen, setIsSidebarOpen, sidebarState }: any) {
  return (
    <>
      <div className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <aside className={`mockup-sidebar ${isSidebarOpen ? 'open' : ''}`} data-state={sidebarState || 'expanded'}>
        
        {/* Header */}
        <div className="mockup-sidebar-header">
          <div className="mockup-logo-area">
            {/* Minimal SVG representation of the 'S' logo */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 8H15L10 16L15 24H25L30 16L25 8Z" fill="#10B981" fillOpacity="0.2"/>
              <path d="M12 20C12 20 18 10 24 10C30 10 32 16 32 16L28 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              <path d="M28 20C28 20 22 30 16 30C10 30 8 24 8 24L12 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div className="mockup-logo-text">
              <span className="logo-title">Study<span className="logo-sync">Sync</span></span>
              <span className="logo-subtitle">Computer Science</span>
            </div>
          </div>
          <button className="mockup-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={20} color="#4B5563" />
          </button>
        </div>

        <div className="mockup-sidebar-scroll">
          
          {/* MAIN SECTION */}
          <div className="mockup-nav-section">
            <h3 className="mockup-nav-heading">MAIN</h3>
            <div className="mockup-nav-links">
              <button className={`mockup-nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <Home size={18} /> <span className="nav-label" title="Dashboard">Dashboard</span></button>
              <button className={`mockup-nav-link ${view === 'groups' ? 'active' : ''}`} onClick={() => { setView('groups'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <Users size={18} /> <span className="nav-label" title="Study Groups">Study Groups</span></button>
              <button className={`mockup-nav-link ${view === 'live-sessions' || view === 'live-room' ? 'active' : ''}`} onClick={() => { setView('live-sessions'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <Video size={18} /> <span className="nav-label" title="Live Sessions">Live Sessions</span></button>
              <button className={`mockup-nav-link ${view === 'notes' || view === 'files' ? 'active' : ''}`} onClick={() => { setView('notes'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <FileText size={18} /> <span className="nav-label" title="Notes & Files">Notes & Files</span></button>
              <button className={`mockup-nav-link ${view === 'profile' ? 'active' : ''}`} onClick={() => { setView('profile'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <User size={18} /> <span className="nav-label" title="My Profile">My Profile</span></button>
              <button className={`mockup-nav-link ${view === 'calendar' ? 'active' : ''}`} onClick={() => { setView('calendar'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <Calendar size={18} /> <span className="nav-label" title="Calendar">Calendar</span></button>
              <button className={`mockup-nav-link ${view === 'tasks' ? 'active' : ''}`} onClick={() => { setView('tasks'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <CheckSquare size={18} /> <span className="nav-label" title="Tasks">Tasks</span></button>
            </div>
          </div>

          {/* LEARNING SECTION */}
          <div className="mockup-nav-section">
            <h3 className="mockup-nav-heading">LEARNING</h3>
            <div className="mockup-nav-links">
              <button className={`mockup-nav-link ${view === 'courses' ? 'active' : ''}`} onClick={() => { setView('courses'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <Layers size={18} /> <span className="nav-label" title="Courses">Courses</span></button>
              <button className={`mockup-nav-link ${view === 'quiz' ? 'active' : ''}`} onClick={() => { setView('quiz'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <ClipboardCheck size={18} /> <span className="nav-label" title="Quiz & Practice">Quiz & Practice</span></button>
              <button className={`mockup-nav-link ${view === 'resources' ? 'active' : ''}`} onClick={() => { setView('resources'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <Folder size={18} /> <span className="nav-label" title="Resources">Resources</span></button>
              <button className={`mockup-nav-link ${view === 'planner' ? 'active' : ''}`} onClick={() => { setView('planner'); if (window.innerWidth <= 900 && setIsSidebarOpen) setIsSidebarOpen(false); }}>
                <CalendarCheck size={18} /> <span className="nav-label" title="Study Planner">Study Planner</span></button>
            </div>
          </div>

          {/* WIDGETS */}
          <div className="mockup-widgets">
            
            {/* STREAK WIDGET */}
            <div className="mockup-widget-card">
              <h4 className="widget-title">Study Streak <span className="fire-emoji">🔥</span></h4>
              <div className="widget-streak-count">
                <strong>12</strong> <span>Days in a row</span>
              </div>
              <div className="widget-streak-days">
                {['M','T','W','T','F','S','S'].map((day, i) => (
                  <div key={i} className="widget-day">
                    <span>{day}</span>
                    {i < 6 ? (
                      <div className="day-check-circle"><CheckSquare size={10} color="white" fill="transparent" strokeWidth={4} /></div>
                    ) : (
                      <div className="day-empty-circle"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* QUOTE WIDGET */}
            <div className="mockup-widget-card quote-widget">
              <div className="quote-marks">“</div>
              <p className="quote-text">Discipline today, success tomorrow.</p>
              <p className="quote-author">– A.P.J. Abdul Kalam</p>
            </div>

          </div>

          <div style={{ padding: '16px 20px', borderTop: '1px solid #F3F4F6', marginTop: '12px' }}>
            <button 
              className="mockup-nav-link" 
              style={{ color: '#EF4444' }}
              onClick={() => {
                import('./lib/supabase').then(m => m.supabase?.auth.signOut());
                setView('welcome');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> 
              Log out
            </button>
          </div>
          
        </div>
      </aside>
    </>
  );
}
