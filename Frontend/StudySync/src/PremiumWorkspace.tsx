import React from 'react';
import { motion } from 'framer-motion';
import './premium.css';

export default function PremiumWorkspace({ userProfile, setView }: any) {
  
  return (
    <div className="premium-workspace">
      {/* Left Sidebar */}
      <aside className="prem-sidebar">
        <div className="prem-logo">
          <div className="prem-logo-icon">S</div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            StudySync
          </span>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
            { id: 'learning', label: 'My Learning', icon: '💬' },
            { id: 'roadmap', label: 'Roadmap', icon: '🛣️' },
            { id: 'subjects', label: 'Subjects', icon: '📚' },
            { id: 'practice', label: 'Practice', icon: '🎯' },
            { id: 'projects', label: 'Projects', icon: '⚙️' },
            { id: 'notes', label: 'Notes', icon: '📓' },
            { id: 'resources', label: 'Resources', icon: '👤' },
            { id: 'groups', label: 'Study Groups', icon: '👥' },
            { id: 'calendar', label: 'Calendar', icon: '📅' },
            { id: 'achievements', label: 'Achievements', icon: '⭐' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(nav => (
            <div 
              key={nav.id} 
              className={`prem-nav-item ${nav.id === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView(nav.id)}
            >
              <div className="prem-nav-icon">{nav.icon}</div>
              <span>{nav.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--prem-bg)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="User" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{userProfile?.full_name || 'Arpan Das'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>BCA Student</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>XP 1,250</span>
              <div style={{ flex: 1, height: '4px', background: '#E2E8F0', borderRadius: '2px' }}>
                <div style={{ width: '60%', height: '100%', background: 'var(--prem-primary)', borderRadius: '2px' }}></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--prem-text-secondary)' }}>Level 8</span>
            </div>
          </div>
        </div>

        <div className="prem-upgrade-card" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '8px' }}>
            <span>👑</span> Upgrade to Pro
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--prem-text-secondary)' }}>Unlock unlimited access to premium features.</div>
          <button className="prem-upgrade-btn">Upgrade Now →</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="prem-main">
        {/* Header */}
        <header className="prem-header">
          <div className="prem-search">
            <span style={{ opacity: 0.5 }}>🔍</span>
            <input type="text" placeholder="Search for topics, courses, notes, code..." />
            <div style={{ padding: '2px 6px', background: 'var(--prem-bg)', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--prem-text-secondary)' }}>⌘ K</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <span>🔥</span> 12 Day Streak
            </div>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.2rem' }}>🔔</span>
              <div style={{ position: 'absolute', top: 0, right: -4, width: '8px', height: '8px', background: 'var(--prem-primary)', borderRadius: '50%', border: '2px solid white' }}></div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="prem-grid-container">
          
          <div className="prem-row">
            <div style={{ flex: 1 }}>
              <h1 className="prem-hero-title">Good afternoon, {userProfile?.full_name?.split(' ')[0] || 'Arpan'}! 👋</h1>
              <p className="prem-hero-subtitle">Stay consistent today, mastery tomorrow.</p>

              <div className="prem-row">
                <div className="prem-card prem-continue-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <span style={{ fontWeight: 600 }}>Continue Learning</span>
                    <span style={{ color: 'var(--prem-text-secondary)', cursor: 'pointer' }}>•••</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#0F172A', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '2rem' }}>⚛️</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>Data Structures</h4>
                      <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--prem-text-secondary)' }}>Arrays and Linked Lists</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'var(--prem-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: '72%', height: '100%', background: 'var(--prem-primary)', borderRadius: '3px' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>72%</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--prem-text-secondary)' }}>Lesson 18 of 26 · 32 min left</span>
                    <button style={{ background: 'var(--prem-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '100px', fontWeight: 600, cursor: 'pointer' }}>Resume Lesson →</button>
                  </div>
                </div>

                <div className="prem-card" style={{ width: '320px', padding: 0, overflow: 'hidden', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '6rem', transform: 'translateY(10px)' }}>💻🌱</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="prem-card prem-streak-card">
                <div style={{ alignSelf: 'flex-start', fontWeight: 600, marginBottom: '16px' }}>Code Streak</div>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', width: '100%' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '8px solid var(--prem-primary-light)', borderTopColor: 'var(--prem-primary)', borderRightColor: 'var(--prem-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>🔥</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>12</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--prem-text-secondary)' }}>Days</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '60px' }}>
                    {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} style={{ width: '8px', height: `${h}%`, background: i === 6 ? 'var(--prem-primary)' : 'var(--prem-primary-light)', borderRadius: '4px' }}></div>
                    ))}
                  </div>
                </div>
                <div style={{ alignSelf: 'flex-end', fontSize: '0.8rem', color: 'var(--prem-text-secondary)', marginTop: '8px' }}>Keep it up! 🔥</div>
              </div>

              <div className="prem-card prem-focus-card">
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Focus Timer</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>25:00</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--prem-text-secondary)' }}>Start your focus session</div>
                </div>
                <div style={{ width: '48px', height: '48px', background: 'var(--prem-primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer' }}>▶</div>
              </div>

              <div className="prem-card prem-upcoming-card" style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--prem-text-secondary)', marginBottom: '8px' }}>Upcoming Quiz</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--prem-primary)' }}>📅</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>DBMS Quiz</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--prem-text-secondary)' }}>Tomorrow, 10:00 AM</div>
                    </div>
                  </div>
                  <span style={{ color: 'var(--prem-text-secondary)' }}>›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="prem-features-row">
            {[
              { icon: '</>', color: '#10B981', title: 'Code Playground', sub: 'Write, Run, Test' },
              { icon: '📓', color: '#8B5CF6', title: 'Notes', sub: 'Your Study Notes' },
              { icon: '🗂️', color: '#F59E0B', title: 'Flashcards', sub: 'Review & Remember' },
              { icon: '👥', color: '#EF4444', title: 'Study Groups', sub: 'Learn Together' },
              { icon: '📝', color: '#3B82F6', title: 'Quizzes', sub: 'Test Yourself' },
              { icon: '🤖', color: '#10B981', title: 'AI Tutor', sub: 'Ask Anything' },
            ].map((feature, i) => (
              <div key={i} className="prem-feature-pill">
                <div className="prem-feature-icon" style={{ background: `${feature.color}15`, color: feature.color }}>
                  {feature.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>{feature.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>{feature.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid rows */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="prem-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                  <h3 className="prem-section-title">Learning Roadmap</h3>
                  <p className="prem-section-subtitle">Master computer science step by step</p>
                </div>
                <a href="#" style={{ color: 'var(--prem-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>View Full Roadmap →</a>
              </div>
              
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '16px' }}>
                <div style={{ position: 'absolute', top: '16px', left: '30px', right: '30px', height: '2px', background: 'var(--prem-bg)', zIndex: 1 }}></div>
                <div style={{ position: 'absolute', top: '16px', left: '30px', width: '33%', height: '2px', background: 'var(--prem-primary)', zIndex: 2 }}></div>

                {[
                  { title: 'Programming\nBasics', status: 'done' },
                  { title: 'Data\nStructures', status: 'done' },
                  { title: 'Algorithms', status: 'active' },
                  { title: 'Operating\nSystems', status: 'locked' },
                  { title: 'DBMS', status: 'locked' },
                  { title: 'Computer\nNetworks', status: 'locked' },
                  { title: 'System\nDesign.', status: 'locked' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step.status === 'done' ? 'var(--prem-primary)' : step.status === 'active' ? 'var(--prem-primary)' : 'var(--prem-card)', border: `2px solid ${step.status === 'locked' ? 'var(--prem-border)' : 'var(--prem-primary)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.status === 'done' ? 'white' : step.status === 'active' ? 'white' : 'var(--prem-text-secondary)', fontSize: '0.8rem', marginBottom: '8px' }}>
                      {step.status === 'done' ? '✓' : step.status === 'active' ? '</>' : '🔒'}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: step.status === 'active' ? 700 : 500, color: step.status === 'active' ? 'var(--prem-primary)' : 'var(--prem-text-secondary)', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: '1.2' }}>{step.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="prem-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 className="prem-section-title">Subjects</h3>
                  <p className="prem-section-subtitle">Explore and learn your core subjects</p>
                </div>
                <a href="#" style={{ color: 'var(--prem-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>View All Subjects →</a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { title: 'Data Structures', icon: '🌳', color: '#10B981', p: 66, t: '24/36' },
                  { title: 'Algorithms', icon: '⚡', color: '#8B5CF6', p: 72, t: '26/36' },
                  { title: 'DBMS', icon: '🗄️', color: '#F59E0B', p: 41, t: '15/36' },
                  { title: 'Operating Systems', icon: '⚙️', color: '#EF4444', p: 28, t: '10/36' },
                  { title: 'Computer Networks', icon: '🌐', color: '#3B82F6', p: 33, t: '12/36' },
                  { title: 'Python', icon: '🐍', color: '#F59E0B', p: 75, t: '27/36' },
                ].map((sub, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: `${sub.color}15`, color: sub.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{sub.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '2px' }}>{sub.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: sub.color }}>{sub.p}%</span>
                      </div>
                      <div style={{ height: '4px', background: 'var(--prem-bg)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${sub.p}%`, height: '100%', background: sub.color }}></div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--prem-text-secondary)', marginTop: '4px' }}>{sub.t} Lessons</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="prem-bottom-grid">
            <div className="prem-card">
              <h3 className="prem-section-title">Practice Arena</h3>
              <p className="prem-section-subtitle">Sharpen your coding and problem solving skills</p>
              
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>👑</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Daily Problem</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Solve today's coding problem</div>
                </div>
                <span style={{ color: 'var(--prem-text-secondary)' }}>→</span>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>🌐</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Coding Contests</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Compete and improve</div>
                </div>
                <span style={{ color: 'var(--prem-text-secondary)' }}>→</span>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>🎤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mock Interviews</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Practice real interview questions</div>
                </div>
                <span style={{ color: 'var(--prem-text-secondary)' }}>→</span>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>📝</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quizzes</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Test your knowledge</div>
                </div>
                <span style={{ color: 'var(--prem-text-secondary)' }}>→</span>
              </div>
            </div>

            <div className="prem-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="prem-section-title" style={{ margin: 0 }}>Recent Activity</h3>
                <a href="#" style={{ color: 'var(--prem-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>View All</a>
              </div>
              <p className="prem-section-subtitle">Your learning journey</p>
              
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>🧩</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Solved Binary Search</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Today · 10:24 AM</div>
                </div>
                <span style={{ color: 'var(--prem-primary)', fontWeight: 700, fontSize: '0.85rem' }}>+40 XP</span>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>📖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Completed OS Lesson 12</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Yesterday · 08:15 PM</div>
                </div>
                <span style={{ color: 'var(--prem-primary)', fontWeight: 700, fontSize: '0.85rem' }}>+30 XP</span>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#F59E0B15', color: '#F59E0B' }}>📝</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Added Notes on Hash Tables</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Yesterday · 05:40 PM</div>
                </div>
                <span style={{ color: 'var(--prem-primary)', fontWeight: 700, fontSize: '0.85rem' }}>+10 XP</span>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#3B82F615', color: '#3B82F6' }}>👥</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Watched "Graph Traversal"</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>May 22 · 09:10 PM</div>
                </div>
                <span style={{ color: 'var(--prem-primary)', fontWeight: 700, fontSize: '0.85rem' }}>+20 XP</span>
              </div>
            </div>

            <div className="prem-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="prem-section-title" style={{ margin: 0 }}>Study Groups</h3>
                <a href="#" style={{ color: 'var(--prem-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>View All</a>
              </div>
              <p className="prem-section-subtitle">Collaborate and grow together</p>

              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>{'</>'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>DSA Warriors</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>4 members online</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#EF444415', color: '#EF4444' }}>⚙️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Code Breakers</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>6 members online</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#8B5CF615', color: '#8B5CF6' }}>🌐</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>System Design Hub</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>3 members online</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E2E8F0' }}></div>
              </div>

              <button style={{ background: 'var(--prem-bg)', color: 'var(--prem-primary)', border: 'none', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 600, marginTop: '16px', cursor: 'pointer' }}>Join New Group 👥</button>
            </div>

            <div className="prem-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="prem-section-title" style={{ margin: 0 }}>Upcoming Schedule</h3>
                <a href="#" style={{ color: 'var(--prem-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>View Calendar</a>
              </div>

              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#8B5CF615', color: '#8B5CF6' }}>📅</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>DBMS Quiz</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>Tomorrow, 10:00 AM</div>
                </div>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#EF444415', color: '#EF4444' }}>📅</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>OS Assignment Due</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>May 26, 11:59 PM</div>
                </div>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#3B82F615', color: '#3B82F6' }}>👥</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Group Study Session</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>May 28, 07:00 PM</div>
                </div>
              </div>
              <div className="prem-list-item">
                <div className="prem-list-icon" style={{ background: '#10B98115', color: '#10B981' }}>🤖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>AI Tutor Session</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--prem-text-secondary)' }}>May 30, 06:00 PM</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
