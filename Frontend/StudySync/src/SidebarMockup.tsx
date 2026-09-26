import React from 'react';
import { Menu, X } from 'lucide-react';
import StudySyncLogo from './components/StudySyncLogo';
import {
  navDashboard,
  navStudyGroups,
  navLiveRooms,
  navNotes,
  navProfile,
  navPlanner,
  navTasks,
  navQuizzes,
  navFiles,
  prodCalendar,
  prodStreak,
  prodCheck,
  accLogout
} from './assets';
import './sidebar-mockup.css';

export default function SidebarMockup({ view, setView, isSidebarOpen, setIsSidebarOpen, sidebarState, onLogout }: any) {
  const navigate = (newView: string) => {
    setView(newView);
    if (window.innerWidth <= 900 && setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <aside className={`mockup-sidebar ${isSidebarOpen ? 'open' : ''}`} data-state={sidebarState || 'expanded'}>
        
        {/* Header - shown on mobile drawer */}
        <div className="mockup-sidebar-header">
          <div className="mockup-logo-area">
            <StudySyncLogo variant="compact" height={28} />
          </div>
          <button 
            className="mockup-menu-btn" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} color="var(--theme-text-secondary, #4B5563)" />
          </button>
        </div>

        <div className="mockup-sidebar-scroll">
          
          {/* MAIN SECTION */}
          <div className="mockup-nav-section">
            <h3 className="mockup-nav-heading">MAIN</h3>
            <div className="mockup-nav-links">
              <button className={`mockup-nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('dashboard')}>
                <img src={navDashboard} width={18} height={18} alt="" /> <span className="nav-label" title="Dashboard">Dashboard</span></button>
              <button className={`mockup-nav-link ${view === 'groups' ? 'active' : ''}`} onClick={() => navigate('groups')}>
                <img src={navStudyGroups} width={18} height={18} alt="" /> <span className="nav-label" title="Study Groups">Study Groups</span></button>
              <button className={`mockup-nav-link ${view === 'live-sessions' || view === 'live-room' ? 'active' : ''}`} onClick={() => navigate('live-sessions')}>
                <img src={navLiveRooms} width={18} height={18} alt="" /> <span className="nav-label" title="Live Sessions">Live Sessions</span></button>
              <button className={`mockup-nav-link ${view === 'notes' || view === 'files' ? 'active' : ''}`} onClick={() => navigate('notes')}>
                <img src={navNotes} width={18} height={18} alt="" /> <span className="nav-label" title="Notes & Files">Notes & Files</span></button>
              <button className={`mockup-nav-link ${view === 'profile' ? 'active' : ''}`} onClick={() => navigate('profile')}>
                <img src={navProfile} width={18} height={18} alt="" /> <span className="nav-label" title="My Profile">My Profile</span></button>
              <button className={`mockup-nav-link ${view === 'calendar' ? 'active' : ''}`} onClick={() => navigate('calendar')}>
                <img src={prodCalendar} width={18} height={18} alt="" /> <span className="nav-label" title="Calendar">Calendar</span></button>
              <button className={`mockup-nav-link ${view === 'tasks' ? 'active' : ''}`} onClick={() => navigate('tasks')}>
                <img src={navTasks} width={18} height={18} alt="" /> <span className="nav-label" title="Tasks">Tasks</span></button>
            </div>
          </div>

          {/* LEARNING SECTION */}
          <div className="mockup-nav-section">
            <h3 className="mockup-nav-heading">LEARNING</h3>
            <div className="mockup-nav-links">
              <button className={`mockup-nav-link ${view === 'courses' ? 'active' : ''}`} onClick={() => navigate('courses')}>
                <img src={navQuizzes} width={18} height={18} alt="" /> <span className="nav-label" title="Courses">Courses</span></button>
              <button className={`mockup-nav-link ${view === 'quiz' ? 'active' : ''}`} onClick={() => navigate('quiz')}>
                <img src={navQuizzes} width={18} height={18} alt="" /> <span className="nav-label" title="Quiz & Practice">Quiz & Practice</span></button>
              <button className={`mockup-nav-link ${view === 'resources' ? 'active' : ''}`} onClick={() => navigate('resources')}>
                <img src={navFiles} width={18} height={18} alt="" /> <span className="nav-label" title="Resources">Resources</span></button>
              <button className={`mockup-nav-link ${view === 'planner' ? 'active' : ''}`} onClick={() => navigate('planner')}>
                <img src={navPlanner} width={18} height={18} alt="" /> <span className="nav-label" title="Study Planner">Study Planner</span></button>
            </div>
          </div>

          {/* WIDGETS */}
          <div className="mockup-widgets">
            
            {/* STREAK WIDGET */}
            <div className="mockup-widget-card">
              <h4 className="widget-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Study Streak <img src={prodStreak} width={18} height={18} alt="Streak" />
              </h4>
              <div className="widget-streak-count">
                <strong>12</strong> <span>Days in a row</span>
              </div>
              <div className="widget-streak-days">
                {['M','T','W','T','F','S','S'].map((day, i) => (
                  <div key={i} className="widget-day">
                    <span>{day}</span>
                    {i < 6 ? (
                      <div className="day-check-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={prodCheck} width={10} height={10} alt="Checked" style={{ filter: 'brightness(10)' }} />
                      </div>
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
              style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '10px' }}
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  try { localStorage.removeItem('studysync_guest_session'); } catch {}
                  import('./lib/supabase').then(m => m.supabase?.auth.signOut().catch(() => {}));
                  setView('welcome');
                }
              }}
            >
              <img src={accLogout} width={18} height={18} alt="Logout" />
              Log out
            </button>
          </div>
          
        </div>
      </aside>
    </>
  );
}
