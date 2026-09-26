import React, { useState } from 'react';
import { User, MapPin, GraduationCap, Code, Server, BookOpen, Activity, Clock, CheckSquare, Layers, Edit3, X, Globe, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileMockup() {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: 'New Student',
    username: 'student',
    email: 'student@university.edu',
    bio: 'Tell other students a little about yourself...',
    college: '',
    degree: '',
    semester: '',
    location: '',
    languages: [] as string[],
    technologies: [] as string[],
    interests: [] as string[],
    learningGoal: '',
    github: '',
    portfolio: '',
    linkedin: ''
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  return (
    <div className="dashboard-mockup-wrapper" style={{ padding: '24px 16px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      
      {/* PROFILE HEADER */}
      <div className="soft-card profile-header-card">
        <div className="profile-header-user">
          <div className="profile-header-avatar">
            {profileData.fullName.split(' ').map(n => n[0]).join('').substring(0,2)}
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '4px' }}>{profileData.fullName}</h1>
            <p style={{ color: 'var(--theme-text-secondary)', marginBottom: '12px', fontSize: 'var(--font-size-md)' }}>@{profileData.username}</p>
            <p style={{ maxWidth: '600px', lineHeight: 1.5, fontSize: 'var(--font-size-md)' }}>{profileData.bio}</p>
          </div>
        </div>
        <button className="btn-outline" onClick={() => setIsEditing(true)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <div className="profile-grid">
        
        {/* LEFT COLUMN: About & Skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="soft-card">
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="var(--theme-text-secondary)" /> About
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} color="var(--theme-text-secondary)" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-primary)' }}>{profileData.location || 'Location not set'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <GraduationCap size={18} color="var(--theme-text-secondary)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-primary)' }}>{profileData.college || 'Institution not set'}</span>
                  {profileData.degree && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>{profileData.degree} {profileData.semester ? `• ${profileData.semester}` : ''}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '18px', display: 'flex', justifyContent: 'center' }}>@</div>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-primary)' }}>{profileData.email}</span>
              </div>
            </div>

            {/* Links */}
            {(profileData.github || profileData.linkedin || profileData.portfolio) && (
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--theme-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Links</h3>
                {profileData.github && (
                  <a href={`https://${profileData.github}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--theme-text-primary)', fontSize: 'var(--font-size-sm)' }}>
                    <Globe size={16} color="var(--theme-text-secondary)" /> {profileData.github}
                  </a>
                )}
                {profileData.linkedin && (
                  <a href={`https://${profileData.linkedin}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--theme-text-primary)', fontSize: 'var(--font-size-sm)' }}>
                    <Globe size={16} color="var(--theme-text-secondary)" /> {profileData.linkedin}
                  </a>
                )}
                {profileData.portfolio && (
                  <a href={`https://${profileData.portfolio}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--theme-text-primary)', fontSize: 'var(--font-size-sm)' }}>
                    <Globe size={16} color="var(--theme-text-secondary)" /> {profileData.portfolio}
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="soft-card">
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code size={20} color="var(--theme-text-secondary)" /> Computer Science
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Languages</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profileData.languages.length === 0 ? <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)' }}>No languages added.</span> : profileData.languages.map((lang: string) => (
                  <span key={lang} style={{ background: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', padding: '4px 12px', borderRadius: '999px', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>{lang}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Technologies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profileData.technologies.length === 0 ? <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)' }}>No technologies added.</span> : profileData.technologies.map((tech: string) => (
                  <span key={tech} style={{ background: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', padding: '4px 12px', borderRadius: '999px', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>{tech}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Areas of Interest</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profileData.interests.length === 0 ? <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)' }}>No interests added.</span> : profileData.interests.map((interest: string) => (
                  <span key={interest} style={{ background: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', padding: '4px 12px', borderRadius: '999px', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>{interest}</span>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: Goals, Stats, Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="soft-card" style={{ borderLeft: '4px solid #10B981' }}>
            <h2 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Current Learning Goal
            </h2>
            <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--theme-text-primary)', lineHeight: 1.5 }}>
              {profileData.learningGoal || 'No goal set yet.'}
            </p>
          </div>

          <div className="soft-card">
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--theme-text-secondary)" /> Statistics
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ background: 'var(--theme-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--theme-border)' }}>
                <Clock size={20} color="#10B981" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--theme-text-primary)' }}>--</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>Study Time</div>
              </div>
              <div style={{ background: 'var(--theme-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--theme-border)' }}>
                <CheckSquare size={20} color="#3B82F6" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--theme-text-primary)' }}>--</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>Tasks Completed</div>
              </div>
              <div style={{ background: 'var(--theme-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--theme-border)' }}>
                <Layers size={20} color="#8B5CF6" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--theme-text-primary)' }}>--</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>Courses Completed</div>
              </div>
              <div style={{ background: 'var(--theme-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--theme-border)' }}>
                <BookOpen size={20} color="#F59E0B" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--theme-text-primary)' }}>--</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>Notes Created</div>
              </div>
            </div>
          </div>

          <div className="soft-card">
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="var(--theme-text-secondary)" /> Recent Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: '12px' }}>
              <Activity size={32} color="var(--theme-border-strong)" />
              <p style={{ color: 'var(--theme-text-secondary)', fontSize: 'var(--font-size-sm)' }}>No recent activity to show yet.</p>
            </div>
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="soft-card" 
              style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>Edit Profile</h2>
                <button onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Full Name</label>
                    <input type="text" className="mockup-input" value={editData.fullName} onChange={e => setEditData({...editData, fullName: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Username</label>
                    <input type="text" className="mockup-input" value={editData.username} onChange={e => setEditData({...editData, username: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Bio</label>
                  <textarea rows={3} className="mockup-input" value={editData.bio} onChange={e => setEditData({...editData, bio: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', resize: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>College / Institution</label>
                    <input type="text" className="mockup-input" value={editData.college} onChange={e => setEditData({...editData, college: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Degree / Program</label>
                    <input type="text" className="mockup-input" value={editData.degree} onChange={e => setEditData({...editData, degree: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Location</label>
                    <input type="text" className="mockup-input" value={editData.location} onChange={e => setEditData({...editData, location: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Semester/Year</label>
                    <input type="text" className="mockup-input" value={editData.semester} onChange={e => setEditData({...editData, semester: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Learning Goal</label>
                  <input type="text" className="mockup-input" value={editData.learningGoal} onChange={e => setEditData({...editData, learningGoal: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Programming Languages (comma separated)</label>
                  <input type="text" className="mockup-input" value={editData.languages.join(', ')} onChange={e => setEditData({...editData, languages: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Technologies (comma separated)</label>
                  <input type="text" className="mockup-input" value={editData.technologies.join(', ')} onChange={e => setEditData({...editData, technologies: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Areas of Interest (comma separated)</label>
                  <input type="text" className="mockup-input" value={editData.interests.join(', ')} onChange={e => setEditData({...editData, interests: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>GitHub Username</label>
                    <input type="text" className="mockup-input" value={editData.github} onChange={e => setEditData({...editData, github: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>LinkedIn Username</label>
                    <input type="text" className="mockup-input" value={editData.linkedin} onChange={e => setEditData({...editData, linkedin: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--theme-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Portfolio URL</label>
                  <input type="text" className="mockup-input" value={editData.portfolio} onChange={e => setEditData({...editData, portfolio: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button className="btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleSave}>Save Changes</button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
