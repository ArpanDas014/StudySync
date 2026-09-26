import React, { useState, useEffect } from 'react';
import { Radio, Video, Users, Clock, Calendar, Play, BookmarkPlus, ArrowRight, Plus, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { illusLiveRoom, illusNoStudySessions } from './assets';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LiveSessionsMockup({ setView, setActiveSessionId }: any) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Create Session Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    topic: '',
    scheduled_at: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    };
    fetchUser();
    fetchSessions();

    const channel = supabase
      .channel('public:live_sessions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_sessions' }, payload => {
        fetchSessions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSessions = async () => {
    try {
      // NOTE: host profile join might fail if not properly configured, just query basic for now
      const { data, error } = await supabase
        .from('live_sessions')
        .select(`*`)
        .in('status', ['scheduled', 'live'])
        .order('scheduled_at', { ascending: true });

      if (error) throw error;
      setSessions(data || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert('You must be logged in to create a session');
    
    try {
      const { data, error } = await supabase.from('live_sessions').insert([
        {
          host_id: currentUser.id,
          title: createData.title,
          description: createData.description,
          topic: createData.topic,
          scheduled_at: new Date(createData.scheduled_at).toISOString(),
          status: 'scheduled'
        }
      ]).select();

      if (error) throw error;
      
      setShowCreateModal(false);
      setCreateData({ title: '', description: '', topic: '', scheduled_at: '' });
      fetchSessions();
    } catch (err: any) {
      alert("Failed to create session: " + err.message);
    }
  };

  const handleJoinSession = async (session: any) => {
    if (!currentUser) {
      alert("Please log in to join a session.");
      return;
    }
    setActiveSessionId(session.id);
    setView('live-room');
  };

  const liveSessions = sessions.filter(s => s.status === 'live');
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');

  return (
    <div className="dashboard-mockup-wrapper">
      <div className="mockup-main-content" style={{ paddingTop: '32px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Live Sessions</h1>
            <p style={{ color: 'var(--theme-text-secondary)' }}>Join real-time study sessions, workshops, and peer programming.</p>
          </div>
          {currentUser && (
            <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} /> Create Session
            </button>
          )}
        </div>

        {/* LIVE NOW Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Radio size={20} color="#EF4444" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>LIVE NOW</h2>
          </div>
          
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--theme-text-secondary)' }}>Loading sessions...</div>
          ) : liveSessions.length > 0 ? (
            liveSessions.map(session => (
              <div key={session.id} className="mockup-hero-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.01) 100%)', borderColor: 'rgba(239, 68, 68, 0.15)', boxShadow: '0 10px 40px rgba(239, 68, 68, 0.03)', padding: '32px 48px', marginBottom: '16px' }}>
                <div style={{ zIndex: 2 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEE2E2', color: '#DC2626', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '16px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626' }}></div>
                    LIVE
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px', color: 'var(--theme-text-primary)' }}>{session.title}</h3>
                  <p style={{ color: 'var(--theme-text-secondary)', fontSize: '1rem', marginBottom: '24px', maxWidth: '500px' }}>
                    {session.description || 'Join this live session.'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="mockup-avatar" style={{ width: '28px', height: '28px', fontSize: '0.7rem', background: '#3B82F6' }}>H</div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--theme-text-primary)', fontWeight: 500 }}>Host</span>
                    </div>
                  </div>
                  
                  <button 
                    className="mockup-btn-primary" 
                    style={{ background: 'linear-gradient(180deg, #EF4444 0%, #DC2626 100%)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
                    onClick={() => handleJoinSession(session)}
                  >
                    Join Live Session
                  </button>
                </div>
                <div style={{ width: '300px', height: '200px', background: 'var(--theme-surface)', borderRadius: '16px', border: '1px solid var(--theme-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                  <img src={illusLiveRoom} alt="Live Session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))
          ) : (
            <div className="soft-card" style={{ textAlign: 'center', padding: '36px', color: 'var(--theme-text-secondary)' }}>
              <img src={illusNoStudySessions} alt="No active sessions" style={{ maxWidth: '280px', width: '100%', maxHeight: '180px', objectFit: 'contain', margin: '0 auto 16px', display: 'block', borderRadius: '12px' }} />
              <p style={{ margin: 0, fontWeight: 500 }}>No sessions are live right now. Schedule or host one below!</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Upcoming Sessions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Upcoming Sessions</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {!loading && upcomingSessions.length === 0 && (
                <div className="soft-card" style={{ padding: '24px', textAlign: 'center', color: 'var(--theme-text-secondary)' }}>No upcoming sessions.</div>
              )}
              {upcomingSessions.map((session, i) => (
                <div key={session.id} className="mockup-class-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{session.topic}</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '4px 0 8px 0' }}>{session.title}</h4>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {new Date(session.scheduled_at).toLocaleString()}</span>
                    </div>
                  </div>
                  {currentUser?.id === session.host_id && (
                    <button 
                      onClick={async () => {
                        try {
                          const { error } = await supabase.from('live_sessions').update({ status: 'live', started_at: new Date().toISOString() }).eq('id', session.id);
                          if (error) throw error;
                          fetchSessions();
                        } catch (err: any) {
                          alert("Failed to start session: " + err.message);
                        }
                      }}
                      className="mockup-btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.85rem', background: '#10B981', color: 'white', border: 'none' }}
                    >
                      Start Session
                    </button>
                  )}
                  {currentUser?.id !== session.host_id && (
                    <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Details</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="soft-card" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Schedule Live Session</h2>
                <button onClick={() => setShowCreateModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--theme-text-secondary)' }}><X size={24} /></button>
              </div>
              <form onSubmit={handleCreateSession} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--theme-text-secondary)' }}>Title</label>
                  <input required type="text" className="mockup-input" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} value={createData.title} onChange={e => setCreateData({...createData, title: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--theme-text-secondary)' }}>Topic / Subject</label>
                  <input required type="text" className="mockup-input" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} value={createData.topic} onChange={e => setCreateData({...createData, topic: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--theme-text-secondary)' }}>Description</label>
                  <textarea rows={3} className="mockup-input" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} value={createData.description} onChange={e => setCreateData({...createData, description: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--theme-text-secondary)' }}>Date & Time</label>
                  <input required type="datetime-local" className="mockup-input" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} value={createData.scheduled_at} onChange={e => setCreateData({...createData, scheduled_at: e.target.value})} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn-outline" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Schedule</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
