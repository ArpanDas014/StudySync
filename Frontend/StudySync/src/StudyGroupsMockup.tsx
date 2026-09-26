import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, ChevronDown, Users, Target, Clock, MessageSquare, Plus, Filter, UserPlus } from 'lucide-react';
import { getSubjectIcon, navStudyGroups, illusStudyGroup } from './assets';
import ThemeToggle from './ThemeToggle';

export default function StudyGroupsMockup({ setView }: any) {
  const [activeTab, setActiveTab] = useState('your-groups');

  const yourGroups = [
    { id: 1, name: 'DSA Warriors', subject: 'Computer Science', members: 124, studying: 8, recent: 'Graph traversal debate', iconColor: '#10B981', bgColor: '#D1FAE5' },
    { id: 2, name: 'React Masters', subject: 'Web Development', members: 86, studying: 3, recent: 'Hooks resource shared', iconColor: '#3B82F6', bgColor: '#DBEAFE' },
    { id: 3, name: 'Calculus III Prep', subject: 'Mathematics', members: 42, studying: 12, recent: 'Exam review started', iconColor: '#8B5CF6', bgColor: '#F3E8FF' },
  ];

  const discoverGroups = [
    { id: 4, name: 'System Design Interview', desc: 'Preparing for FAANG system design rounds.', subject: 'Computer Science', level: 'Advanced', members: 312, studying: 24, iconColor: '#F59E0B', bgColor: '#FEF3C7' },
    { id: 5, name: 'Machine Learning Basics', desc: 'Beginner friendly ML discussions and projects.', subject: 'Artificial Intelligence', level: 'Beginner', members: 890, studying: 45, iconColor: '#EC4899', bgColor: '#FCE7F3' },
    { id: 6, name: 'OS Concepts', desc: 'Deep dive into operating systems and C.', subject: 'Computer Science', level: 'Intermediate', members: 156, studying: 5, iconColor: '#6366F1', bgColor: '#E0E7FF' },
    { id: 7, name: 'Cybersecurity 101', desc: 'Learn ethical hacking and network security.', subject: 'Security', level: 'Beginner', members: 420, studying: 18, iconColor: '#14B8A6', bgColor: '#CCFBF1' },
  ];

  return (
    <div className="dashboard-mockup-wrapper">
      
      {/* Header Area */}
      <div className="mockup-top-search-area">
        <div className="mockup-search-container">
          <Search size={18} color="#9CA3AF" />
          <input type="text" placeholder="Search groups, subjects, or communities..." />
          <span className="mockup-cmd-k">⌘ K</span>
        </div>
        <div className="mockup-header-actions">
          <ThemeToggle />
          <button className="mockup-bell-btn">
            <Bell size={20} color="var(--theme-text-secondary)" />
            <span className="mockup-bell-badge">2</span>
          </button>
          <button className="mockup-avatar-btn">
            <div className="mockup-avatar">AD</div>
            <ChevronDown size={16} color="var(--theme-text-secondary)" />
          </button>
        </div>
      </div>

      <div className="mockup-main-content" style={{ paddingTop: '32px' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: '6px' }}>Group Study</h1>
            <p style={{ color: 'var(--theme-text-secondary)', margin: 0 }}>Find people to study with, join study communities, and organize collaborative study.</p>
          </div>
          <button className="mockup-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} />
            Create Group
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div className="mockup-search-container" style={{ flex: '1 1 200px', maxWidth: '320px', width: '100%' }}>
            <Filter size={16} color="#9CA3AF" />
            <select style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--theme-text-primary)' }}>
              <option value="">All Subjects</option>
              <option value="cs">Computer Science</option>
              <option value="math">Mathematics</option>
            </select>
          </div>
          <div className="mockup-search-container" style={{ flex: '1 1 160px', maxWidth: '240px', width: '100%' }}>
            <Target size={16} color="#9CA3AF" />
            <select style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--theme-text-primary)' }}>
              <option value="">Any Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="mockup-pill-row" style={{ margin: 0, padding: 0, border: 'none', marginBottom: '24px' }}>
          <button 
            className={`mockup-pill ${activeTab === 'your-groups' ? 'active-subject' : ''}`}
            onClick={() => setActiveTab('your-groups')}
          >
            Your Groups
          </button>
          <button 
            className={`mockup-pill ${activeTab === 'discover' ? 'active-subject' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover Groups
          </button>
        </div>

        {/* Grid Content */}
        {activeTab === 'your-groups' && (
          <div className="mockup-grid-3">
            {yourGroups.map(group => (
              <div key={group.id} className="mockup-class-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="mockup-class-icon" style={{ background: 'transparent', marginBottom: 0 }}>
                    <img src={getSubjectIcon(group.subject)} width={36} height={36} alt={group.subject} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0' }}>{group.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>{group.subject}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} /> {group.members} members
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></div>
                    {group.studying} studying
                  </div>
                </div>
                
                <div style={{ background: 'var(--theme-input-bg)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={14} color="var(--theme-text-secondary)" />
                  <span style={{ color: 'var(--theme-text-secondary)' }}>{group.recent}</span>
                </div>
                
                <div style={{ marginTop: 'auto' }}>
                  <button 
                    className="mockup-btn-primary" 
                    style={{ width: '100%', background: 'var(--theme-surface)', color: 'var(--theme-text-primary)', border: '1px solid var(--theme-border-strong)', boxShadow: 'none' }}
                    onClick={() => setView('group-detail')}
                  >
                    Open Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="mockup-grid-3">
            {discoverGroups.map(group => (
              <div key={group.id} className="mockup-class-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div className="mockup-class-icon" style={{ background: 'transparent', marginBottom: 0 }}>
                    <img src={getSubjectIcon(group.subject)} width={36} height={36} alt={group.subject} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0' }}>{group.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>{group.subject}</span>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: 'var(--theme-text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                  {group.desc}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>
                  <div style={{ background: 'var(--theme-input-bg)', padding: '4px 8px', borderRadius: '4px' }}>
                    {group.level}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} /> {group.members}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></div>
                    {group.studying} active
                  </div>
                </div>
                
                <div style={{ marginTop: 'auto' }}>
                  <button className="mockup-btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <UserPlus size={16} /> Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
