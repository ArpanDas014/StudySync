import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from "./ThemeToggle";
import { 
  Search, Bell, ChevronRight, ChevronDown, CheckCircle2, 
  Play, Users, FileText, Upload, Target, Monitor, Share, Clock, Menu
} from 'lucide-react';
import './mockup.css';

export default function DashboardMockup({ setView }: any) {
  const [selectedDomain, setSelectedDomain] = useState('Computer Science');
  const [selectedSubject, setSelectedSubject] = useState('Algorithms');

  const domains = [
    { name: 'Arts', icon: '🎨' },
    { name: 'Science', icon: '🔬' },
    { name: 'Commerce', icon: '🏢' },
    { name: 'Computer Science', icon: '💻' },
    { name: 'Engineering', icon: '⚙️' },
    { name: 'Medicine', icon: '🩺' }
  ];

  const subjects = [
    'Algorithms', 'Data Structures', 'Web Development', 'AI',
    'Machine Learning', 'Operating Systems', 'Databases', 'Cybersecurity'
  ];

  return (
    <div className="dashboard-mockup-wrapper">
      
      {/* Search Header Area */}
      <div className="mockup-top-search-area">
        <div className="mockup-search-container">
          <button 
            className="mockup-menu-btn" 
            onClick={() => {
              const evt = new CustomEvent('toggle-sidebar');
              window.dispatchEvent(evt);
            }}
          >
            <Menu size={20} color="#4B5563" />
          </button>
          <Search size={18} color="#9CA3AF" />
          <input type="text" placeholder="Search computer science subjects, topics, courses..." />
          <span className="mockup-cmd-k">⌘ K</span>
        </div>
        <div className="mockup-header-actions">
          <ThemeToggle />
          <button className="mockup-bell-btn">
            <Bell size={20} color="#4B5563" />
            <span className="mockup-bell-badge">3</span>
          </button>
          <button className="mockup-avatar-btn">
            <div className="mockup-avatar">AD</div>
            <ChevronDown size={16} color="#4B5563" />
          </button>
        </div>
      </div>

      {/* Domain Pills */}
      <div className="mockup-pill-row">
        {domains.map(d => (
          <button 
            key={d.name}
            className={`mockup-pill ${selectedDomain === d.name ? 'active-domain' : ''}`}
            onClick={() => setSelectedDomain(d.name)}
          >
            <span className="mockup-pill-icon">{d.icon}</span>
            {d.name}
          </button>
        ))}
      </div>

      {/* Subject Pills */}
      <div className="mockup-pill-row mockup-subject-row">
        <div className="mockup-search-subject">
          <Search size={16} color="#9CA3AF" />
          <input type="text" placeholder="Search subjects..." />
        </div>
        
        {subjects.map(s => (
          <button
            key={s}
            className={`mockup-pill ${selectedSubject === s ? 'active-subject' : 'inactive-subject'}`}
            onClick={() => setSelectedSubject(s)}
          >
            {s}
          </button>
        ))}
        <button className="mockup-pill inactive-subject" style={{ padding: '0 12px' }}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="mockup-main-content">
        
        {/* HERO CARD */}
        <div className="mockup-hero-card">
          <div className="mockup-hero-content">
            <div className="mockup-hero-eyebrow">CONTINUE LEARNING</div>
            <h1>Advanced Algorithms</h1>
            
            <div className="mockup-hero-progress-row">
              <div className="mockup-progress-track">
                <div className="mockup-progress-fill" style={{ width: '65%' }}></div>
              </div>
              <span className="mockup-progress-text"><strong>65%</strong> | 2h 15m remaining</span>
            </div>
            
            <button className="mockup-hero-btn">
              <Play size={16} fill="currentColor" />
              Resume Study
            </button>
          </div>
          
          <div className="mockup-hero-illustration">
            {/* Minimal CSS representation of the laptop illustration */}
            <div className="css-laptop-container">
              <div className="css-laptop-screen">
                <div className="css-laptop-inner">
                  <div className="css-laptop-code-line"></div>
                  <div className="css-laptop-code-line w-half"></div>
                  <div className="css-laptop-code-line w-third"></div>
                </div>
              </div>
              <div className="css-laptop-base"></div>
              
              {/* Floating Element */}
              <div className="css-floating-card">
                <div className="css-flow-node"></div>
                <div className="css-flow-line"></div>
                <div className="css-flow-node"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-COLUMN STATS GRID */}
        <div className="mockup-grid-3">
          
          {/* My Subjects (Spans 2 cols in original, we will make it responsive) */}
          <div className="mockup-card col-span-2">
            <div className="mockup-card-header">
              <h3>My Subjects</h3>
              <a href="#">View all</a>
            </div>
            <div className="mockup-subjects-flex">
              
              <div className="mockup-subj-item">
                <div className="mockup-subj-icon" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                  <Monitor size={24} />
                </div>
                <h4>Data<br/>Structures</h4>
                <div className="mockup-subj-stat">72%</div>
                <div className="mockup-subj-track"><div className="mockup-subj-fill" style={{ width: '72%', background: '#10B981' }}></div></div>
                <div className="mockup-subj-meta">18 / 25 topics</div>
                <a href="#">Continue &gt;</a>
              </div>

              <div className="mockup-subj-item">
                <div className="mockup-subj-icon" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                  <span style={{ fontWeight: 800 }}>&lt;/&gt;</span>
                </div>
                <h4><br/>Algorithms</h4>
                <div className="mockup-subj-stat">64%</div>
                <div className="mockup-subj-track"><div className="mockup-subj-fill" style={{ width: '64%', background: '#8B5CF6' }}></div></div>
                <div className="mockup-subj-meta">16 / 25 topics</div>
                <a href="#" style={{ color: '#8B5CF6' }}>Continue &gt;</a>
              </div>

              <div className="mockup-subj-item">
                <div className="mockup-subj-icon" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                  <div style={{ width: '20px', height: '20px', background: 'currentColor', borderRadius: '4px' }}></div>
                </div>
                <h4><br/>Databases</h4>
                <div className="mockup-subj-stat">48%</div>
                <div className="mockup-subj-track"><div className="mockup-subj-fill" style={{ width: '48%', background: '#3B82F6' }}></div></div>
                <div className="mockup-subj-meta">12 / 25 topics</div>
                <a href="#" style={{ color: '#3B82F6' }}>Continue &gt;</a>
              </div>
              
              <div className="mockup-subj-item">
                <div className="mockup-subj-icon" style={{ background: '#FFEDD5', color: '#C2410C' }}>
                  <Monitor size={24} />
                </div>
                <h4>Operating<br/>Systems</h4>
                <div className="mockup-subj-stat">35%</div>
                <div className="mockup-subj-track"><div className="mockup-subj-fill" style={{ width: '35%', background: '#F97316' }}></div></div>
                <div className="mockup-subj-meta">9 / 25 topics</div>
                <a href="#" style={{ color: '#F97316' }}>Continue &gt;</a>
              </div>
              
              <div className="mockup-subj-item">
                <div className="mockup-subj-icon" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                  <Monitor size={24} />
                </div>
                <h4>Computer<br/>Networks</h4>
                <div className="mockup-subj-stat">28%</div>
                <div className="mockup-subj-track"><div className="mockup-subj-fill" style={{ width: '28%', background: '#0EA5E9' }}></div></div>
                <div className="mockup-subj-meta">7 / 25 topics</div>
                <a href="#" style={{ color: '#0EA5E9' }}>Continue &gt;</a>
              </div>

            </div>
          </div>

          {/* Today's Plan */}
          <div className="mockup-card">
            <div className="mockup-card-header">
              <h3>Today's Plan</h3>
              <span className="mockup-text-green">2 of 4 completed</span>
            </div>
            
            <div className="mockup-todo-list">
              <label className="mockup-todo-item checked">
                <CheckCircle2 size={18} color="#10B981" />
                <span>Finish Advanced Algorithms notes</span>
              </label>
              <label className="mockup-todo-item checked">
                <CheckCircle2 size={18} color="#10B981" />
                <span>Solve 15 practice questions</span>
              </label>
              <label className="mockup-todo-item">
                <div className="mockup-todo-circle"></div>
                <span>Attend DSA group session</span>
              </label>
              <label className="mockup-todo-item">
                <div className="mockup-todo-circle"></div>
                <span>Review Dynamic Programming</span>
              </label>
            </div>
            
            <div className="mockup-todo-progress">
              <div className="mockup-todo-track">
                <div className="mockup-todo-fill" style={{ width: '50%' }}></div>
              </div>
              <button className="mockup-btn-light">View Full Plan</button>
            </div>
          </div>

          {/* Study Streak */}
          <div className="mockup-card mockup-streak-card">
            <h3>Study Streak</h3>
            
            <div className="mockup-streak-center">
              <div className="mockup-fire-icon">🔥</div>
              <div className="mockup-streak-number">
                <strong>12</strong>
                <span>days</span>
              </div>
            </div>
            
            <p className="mockup-streak-text">Keep it up! 🔥</p>
            
            <div className="mockup-streak-days">
              {['M','T','W','T','F','S','S'].map((day, i) => (
                <div key={i} className="mockup-streak-day">
                  <span>{day}</span>
                  {i < 5 ? (
                    <CheckCircle2 size={16} color="#10B981" fill="#D1FAE5" />
                  ) : (
                    <div className="mockup-streak-circle-empty"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* BOTTOM ROW (Upcoming Sessions, Groups, Quick Actions, Recent Activity) */}
        <div className="mockup-grid-4">
          
          <div className="mockup-card">
            <div className="mockup-card-header">
              <h3>Upcoming Sessions</h3>
              <a href="#">View all</a>
            </div>
            <div className="mockup-list-stack">
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                  <Users size={20} />
                </div>
                <div className="mockup-list-content">
                  <h4>DSA Group Session</h4>
                  <p>Today, 7:00 PM</p>
                </div>
                <button className="mockup-join-btn">Join</button>
              </div>
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#FFEDD5', color: '#C2410C' }}>
                  <Target size={20} />
                </div>
                <div className="mockup-list-content">
                  <h4>DBMS Revision Quiz</h4>
                  <p>Tomorrow, 6:00 PM</p>
                </div>
                <button className="mockup-join-btn">Join</button>
              </div>
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                  <Monitor size={20} />
                </div>
                <div className="mockup-list-content">
                  <h4>OS Study Room</h4>
                  <p>Fri, 6:30 PM</p>
                </div>
                <button className="mockup-join-btn">Join</button>
              </div>
            </div>
          </div>

          <div className="mockup-card">
            <div className="mockup-card-header">
              <h3>Your Study Groups</h3>
              <a href="#">View all</a>
            </div>
            <div className="mockup-list-stack">
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#DCFCE7', color: '#15803D' }}>
                  <Users size={20} />
                </div>
                <div className="mockup-list-content">
                  <h4>DSA Warriors</h4>
                  <p>8 members • 3 online</p>
                </div>
                <div className="mockup-avatars">
                  <div className="mockup-avatar-mini" style={{ background: '#3B82F6', zIndex: 3 }}>A</div>
                  <div className="mockup-avatar-mini" style={{ background: '#F59E0B', zIndex: 2 }}>M</div>
                  <div className="mockup-avatar-mini" style={{ background: '#10B981', zIndex: 1 }}>+3</div>
                </div>
              </div>
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                  <Users size={20} />
                </div>
                <div className="mockup-list-content">
                  <h4>CodeCrafters</h4>
                  <p>6 members • 2 online</p>
                </div>
                <div className="mockup-avatars">
                  <div className="mockup-avatar-mini" style={{ background: '#EF4444', zIndex: 3 }}>S</div>
                  <div className="mockup-avatar-mini" style={{ background: '#8B5CF6', zIndex: 2 }}>J</div>
                  <div className="mockup-avatar-mini" style={{ background: '#6B7280', zIndex: 1 }}>+1</div>
                </div>
              </div>
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#FFEDD5', color: '#C2410C' }}>
                  <Users size={20} />
                </div>
                <div className="mockup-list-content">
                  <h4>Algo Ninjas</h4>
                  <p>10 members • 5 online</p>
                </div>
                <div className="mockup-avatars">
                  <div className="mockup-avatar-mini" style={{ background: '#10B981', zIndex: 3 }}>R</div>
                  <div className="mockup-avatar-mini" style={{ background: '#3B82F6', zIndex: 2 }}>K</div>
                  <div className="mockup-avatar-mini" style={{ background: '#F59E0B', zIndex: 1 }}>+5</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mockup-card">
            <div className="mockup-card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="mockup-quick-grid">
              <div className="mockup-quick-btn" style={{ color: '#10B981' }}>
                <div className="mockup-quick-icon" style={{ background: '#D1FAE5' }}><FileText size={20} /></div>
                <span>Create Note</span>
              </div>
              <div className="mockup-quick-btn" style={{ color: '#3B82F6' }}>
                <div className="mockup-quick-icon" style={{ background: '#DBEAFE' }}><Upload size={20} /></div>
                <span>Upload Resource</span>
              </div>
              <div className="mockup-quick-btn" style={{ color: '#8B5CF6' }}>
                <div className="mockup-quick-icon" style={{ background: '#F3E8FF' }}><Target size={20} /></div>
                <span>Practice Problems</span>
              </div>
              <div className="mockup-quick-btn" style={{ color: '#F97316' }}>
                <div className="mockup-quick-icon" style={{ background: '#FFEDD5' }}><Monitor size={20} /></div>
                <span>Join Study Room</span>
              </div>
            </div>
          </div>

          <div className="mockup-card">
            <div className="mockup-card-header">
              <h3>Recent Activity</h3>
              <a href="#">View all</a>
            </div>
            <div className="mockup-list-stack">
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                  <FileText size={18} />
                </div>
                <div className="mockup-list-content">
                  <h4>Sarah shared a note</h4>
                  <p>Dynamic Programming Notes</p>
                </div>
                <div className="mockup-time">2h ago</div>
              </div>
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#D1FAE5', color: '#10B981' }}>
                  <CheckCircle2 size={18} />
                </div>
                <div className="mockup-list-content">
                  <h4>You completed 10 questions</h4>
                  <p>Arrays Practice Set</p>
                </div>
                <div className="mockup-time">3h ago</div>
              </div>
              <div className="mockup-list-item">
                <div className="mockup-list-icon" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                  <Share size={18} />
                </div>
                <div className="mockup-list-content">
                  <h4>Mike uploaded a resource</h4>
                  <p>Graph Algorithms.pdf</p>
                </div>
                <div className="mockup-time">5h ago</div>
              </div>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <button className="mockup-btn-outline">
                <Clock size={16} /> Start Focus Session
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
