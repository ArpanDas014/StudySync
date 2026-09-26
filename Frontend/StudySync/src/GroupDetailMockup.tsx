import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, ChevronDown, Users, FileText, Target, Video, ArrowLeft, Send, Paperclip, Clock, Calendar } from 'lucide-react';
import { navStudyGroups, navLiveRooms } from './assets';
import ThemeToggle from './ThemeToggle';

export default function GroupDetailMockup({ setView }: any) {
  
  return (
    <div className="dashboard-mockup-wrapper">
      
      {/* Header Area */}
      <div className="mockup-top-search-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--theme-text-secondary)' }}
            onClick={() => setView('groups')}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="mockup-class-icon" style={{ background: '#D1FAE5', color: '#10B981', width: '32px', height: '32px', marginBottom: 0, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={navStudyGroups} width={18} height={18} alt="" />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>DSA Warriors</h2>
        </div>
        <div className="mockup-header-actions">
          <ThemeToggle />
          <button className="mockup-bell-btn">
            <Bell size={20} color="var(--theme-text-secondary)" />
          </button>
          <button className="mockup-avatar-btn">
            <div className="mockup-avatar">AD</div>
            <ChevronDown size={16} color="var(--theme-text-secondary)" />
          </button>
        </div>
      </div>

      <div className="mockup-main-content group-detail-grid" style={{ paddingTop: '24px', maxWidth: '1400px' }}>
        
        {/* Left Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="mockup-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>About Group</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--theme-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              Dedicated to cracking Data Structures and Algorithms for technical interviews. We host daily mock interviews.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--theme-text-secondary)' }}>
              <Users size={16} /> 124 Members
            </div>
            
            <button 
              className="mockup-btn-primary" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px' }}
              onClick={() => setView('live-room')}
            >
              <img src={navLiveRooms} width={18} height={18} alt="" style={{ filter: 'brightness(10)' }} /> Join Live Study
            </button>
          </div>

          <div className="mockup-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Upcoming Session</h3>
              <a href="#" style={{ fontSize: '0.85rem', color: '#10B981', textDecoration: 'none' }}>See all</a>
            </div>
            <div style={{ background: 'var(--theme-input-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--theme-border-strong)' }}>
              <h4 style={{ fontWeight: 600, margin: '0 0 8px 0', fontSize: '0.95rem' }}>Dynamic Programming Deep Dive</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--theme-text-secondary)', marginBottom: '4px' }}>
                <Calendar size={14} /> Tomorrow, 6:00 PM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>
                <Users size={14} /> 24 attending
              </div>
            </div>
          </div>

          <div className="mockup-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Shared Files</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Graph_Algorithms_Cheatsheet.pdf', 'Tree_Traversals.md', 'Blind75_Tracker.xlsx'].map((file, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                  <div style={{ background: 'var(--theme-input-bg)', padding: '8px', borderRadius: '8px' }}>
                    <FileText size={16} color="var(--theme-text-secondary)" />
                  </div>
                  <span style={{ color: 'var(--theme-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Main Chat Area */}
        <div className="mockup-card group-detail-chat">
          
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--theme-border)', background: 'var(--theme-surface)' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Group Chat</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>8 members online</span>
          </div>
          
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ alignSelf: 'center', background: 'var(--theme-input-bg)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>
              Today
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="mockup-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem', background: '#3B82F6' }}>JS</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>John Smith</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>10:42 AM</span>
                </div>
                <p style={{ margin: 0, color: 'var(--theme-text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Hey everyone! Is anyone down to practice some graph problems today before the session tomorrow?
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="mockup-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem', background: '#EC4899' }}>ML</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Maria Lopez</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>10:45 AM</span>
                </div>
                <p style={{ margin: 0, color: 'var(--theme-text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  I'm available around 2 PM! We can go over Dijkstra's. I found a really good resource on it.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--theme-input-bg)', padding: '12px', borderRadius: '8px', marginTop: '8px', border: '1px solid var(--theme-border)' }}>
                  <FileText size={20} color="#3B82F6" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Dijkstra_Explained.pdf</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexDirection: 'row-reverse' }}>
              <div className="mockup-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem' }}>AD</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px', flexDirection: 'row-reverse' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>You</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>10:50 AM</span>
                </div>
                <div style={{ background: '#10B981', color: 'white', padding: '12px 16px', borderRadius: '16px 4px 16px 16px', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Sounds perfect. I'll open up a live study room at 2 PM and post the link here!
                </div>
              </div>
            </div>

          </div>
          
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--theme-border)', background: 'var(--theme-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border-strong)', borderRadius: '999px', padding: '8px 16px', gap: '12px' }}>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--theme-text-secondary)' }}>
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Message DSA Warriors..." 
                style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: '0.95rem', color: 'var(--theme-text-primary)' }}
              />
              <button style={{ background: '#10B981', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', width: '32px', height: '32px', borderRadius: '50%' }}>
                <Send size={16} />
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
