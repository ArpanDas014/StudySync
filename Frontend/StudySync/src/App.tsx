import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthView } from './AuthView';
import LandingPage from './pages/LandingPage';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardMockup from './DashboardMockup';
import SidebarMockup from './SidebarMockup';
import QuizMockup from './QuizMockup';
import NotesFilesMockup from './NotesFilesMockup';
import TasksMockup from './TasksMockup';
import EmptyViewMockup from './EmptyViewMockup';
import StudyGroupsMockup from './StudyGroupsMockup';
import GroupDetailMockup from './GroupDetailMockup';
import LiveSessionsMockup from './LiveSessionsMockup';
import LiveRoomMockup from './LiveRoomMockup';
import PlannerMockup from './PlannerMockup';
import GlobalHeader from './GlobalHeader';
import ProfileMockup from './ProfileMockup';

type View = 'welcome' | 'auth' | 'dashboard' | 'analytics' | 'visuals' | 'library' | 'notes' | 'planner' | 'ai' | 'quiz' | 'doubt' | 'groups' | 'group-detail' | 'live-sessions' | 'live-room' | 'profile' | 'events' | 'notifications' | 'files' | 'online-class' | 'search' | 'mentors' | 'settings' | 'advanced' | 'tasks' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('studysync_guest_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  // Layout states
  const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'hidden'>('expanded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer state
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (currentSession) setSession(currentSession);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession) {
        setSession(currentSession);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGuestLogin = () => {
    const demoSession = {
      user: {
        id: 'demo-student-id',
        email: 'student@studysync.demo',
        user_metadata: { name: 'Demo Student' },
      },
    };
    try {
      localStorage.setItem('studysync_guest_session', JSON.stringify(demoSession));
    } catch {}
    setSession(demoSession);
    setView('dashboard');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('studysync_guest_session');
    } catch {}
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setSession(null);
    setView('welcome');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.log(e));
      setSidebarState('hidden');
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setSidebarState('expanded');
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setSidebarState(prev => prev === 'hidden' ? 'expanded' : 'hidden');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Landing page view
  if (view === 'welcome') {
    return (
      <LandingPage
        onGetStarted={handleGuestLogin}
        onLogin={() => setView('auth')}
      />
    );
  }

  // Auth gate
  if (!session) {
    return <AuthView onGuestLogin={handleGuestLogin} />;
  }

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      
      {/* Global Header */}
      <GlobalHeader sidebarState={sidebarState} setSidebarState={setSidebarState} toggleFullscreen={toggleFullscreen} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* Main Layout Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar Drawer/Panel */}
        <SidebarMockup 
          view={view} 
          setView={setView} 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          sidebarState={sidebarState}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', background: 'var(--theme-bg)' }}>
          <AnimatePresence mode="wait">
            
            {/* Supabase Auth View */}
            {view === 'auth' && (
              <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <AuthView onGuestLogin={handleGuestLogin} />
              </motion.div>
            )}

            {/* Core Mockup Views */}
            {view === 'dashboard' && <DashboardMockup setView={setView} />}
            {view === 'planner' && <PlannerMockup setView={setView} />}
            {view === 'quiz' && <QuizMockup setView={setView} />}
            {view === 'groups' && <StudyGroupsMockup setView={setView} />}
            {view === 'group-detail' && <GroupDetailMockup setView={setView} />}
            {view === 'live-sessions' && <LiveSessionsMockup setView={setView} setActiveSessionId={setActiveSessionId} />}
            {view === 'live-room' && <LiveRoomMockup setView={setView} activeSessionId={activeSessionId} />}
            {view === 'notes' && <NotesFilesMockup setView={setView} />}
            {view === 'tasks' && <TasksMockup setView={setView} />}
            {view === 'profile' && <ProfileMockup />}
            
            {/* Empty States for Unimplemented Sections */}
            {['analytics', 'visuals', 'library', 'ai', 'doubt', 'events', 'notifications', 'files', 'online-class', 'search', 'mentors', 'settings', 'advanced', 'admin'].includes(view) && (
              <EmptyViewMockup viewTitle={view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')} />
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}