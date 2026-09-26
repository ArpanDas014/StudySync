import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Bell, ChevronDown, Menu, Plus, 
  Folder, FileText, Image as ImageIcon, Code, 
  Share2, Star, Trash2, MoreVertical, 
  List, Grid, File, UploadCloud, Clock, Edit3 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import {
  fileFolder,
  navNotes,
  fileCode,
  fileGeneric,
  fileStar,
  fileTrash,
  filePdf,
  fileWord,
  fileMarkdown,
  fileImage,
  fileUpload,
  illusNoFiles
} from './assets';

export default function NotesFilesMockup({ setView }: any) {
  const [activeCategory, setActiveCategory] = useState('All Files');
  const [activeFolder, setActiveFolder] = useState('All Files');

  const categories = ['All Files', 'Notes', 'Documents', 'Images', 'Code Snippets', 'Shared with Me', 'Starred', 'Trash'];
  
  const folders = [
    { name: 'All Files', count: 124, icon: fileFolder },
    { name: 'My Notes', count: 24, icon: navNotes },
    { name: 'Class Notes', count: 18, icon: navNotes },
    { name: 'Projects', count: 12, icon: fileCode },
    { name: 'Assignments', count: 10, icon: fileGeneric },
    { name: 'Resources', count: 45, icon: fileFolder },
    { name: 'Exam Prep', count: 8, icon: fileStar },
    { name: 'Trash', count: 7, icon: fileTrash },
  ];

  const quickAccess = [
    { name: 'Algorithms', count: 24, color: '#10B981', bg: '#D1FAE5' },
    { name: 'Data Structures', count: 18, color: '#3B82F6', bg: '#DBEAFE' },
    { name: 'Operating Systems', count: 12, color: '#8B5CF6', bg: '#F3E8FF' },
    { name: 'Web Development', count: 20, color: '#F59E0B', bg: '#FEF3C7' },
  ];

  const recentFiles = [
    { name: 'Dynamic_Programming_Notes.pdf', type: 'PDF', size: '2.4 MB', date: 'Sep 18, 2026', icon: filePdf, color: '#EF4444', bg: '#FEE2E2', location: 'Algorithms' },
    { name: 'OS_Processes_Revision.docx', type: 'DOCX', size: '1.2 MB', date: 'Sep 17, 2026', icon: fileWord, color: '#3B82F6', bg: '#DBEAFE', location: 'Operating Systems' },
    { name: 'React_Important_Concepts.md', type: 'MD', size: '15 KB', date: 'Sep 16, 2026', icon: fileMarkdown, color: '#F59E0B', bg: '#FEF3C7', location: 'Web Development' },
    { name: 'Database_ER_Diagram.png', type: 'PNG', size: '340 KB', date: 'Sep 15, 2026', icon: fileImage, color: '#10B981', bg: '#D1FAE5', location: 'Projects' },
    { name: 'Binary_Search.cpp', type: 'CPP', size: '3 KB', date: 'Sep 14, 2026', icon: fileCode, color: '#8B5CF6', bg: '#F3E8FF', location: 'Data Structures' },
  ];

  return (
    <div className="dashboard-mockup-wrapper">
      
      {/* Header Area */}
      <div className="mockup-top-search-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <button 
             className="mockup-menu-btn" 
             style={{ display: 'none' /* Handled by global sidebar normally, but kept for structure */ }}
           >
             <Menu size={20} color="var(--theme-text-secondary)" />
           </button>
           <div className="mockup-search-container" style={{ width: '400px', maxWidth: '100%' }}>
            <Search size={18} color="#9CA3AF" />
            <input type="text" placeholder="Search computer science topics, notes, or resources..." style={{ flex: 1 }} />
            {/* NO CMD+K BADGE AS REQUESTED */}
          </div>
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

      <div className="mockup-main-content" style={{ paddingTop: '32px', maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>Notes & Files</h1>
            <p style={{ color: 'var(--theme-text-secondary)', margin: 0 }}>Organize, store, and access your study materials in one place.</p>
          </div>
        </div>

        {/* Categories & Upload */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div className="mockup-subject-row" style={{ margin: 0, padding: 0, border: 'none', paddingBottom: '4px' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`mockup-pill ${activeCategory === cat ? 'active-subject' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{ padding: '6px 12px' }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button className="mockup-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={fileUpload} width={18} height={18} alt="" />
            Upload File
          </button>
        </div>

        {/* Three Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: '24px', alignItems: 'start' }} className="notes-grid-layout">
          
          {/* LEFT: Folders */}
          <div className="mockup-card" style={{ padding: '16px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Folders</h3>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer' }}>
                <Plus size={18} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {folders.map(folder => (
                <button
                  key={folder.name}
                  onClick={() => setActiveFolder(folder.name)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: activeFolder === folder.name ? 'var(--ambient-blur-1)' : 'transparent',
                    color: activeFolder === folder.name ? '#10B981' : 'var(--theme-text-secondary)',
                    transition: 'all 0.2s ease',
                    fontWeight: activeFolder === folder.name ? '600' : '500'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={folder.icon} width={18} height={18} alt="" />
                    <span>{folder.name}</span>
                  </div>
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>{folder.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CENTER: Quick Access + Recent Files */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            
            {/* Quick Access */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>Quick Access</h2>
                <button style={{ background: 'transparent', border: 'none', color: '#10B981', fontWeight: 600, cursor: 'pointer' }}>
                  View all &rarr;
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {quickAccess.map(folder => (
                  <div key={folder.name} className="mockup-card" style={{ padding: '16px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div className="mockup-class-icon" style={{ width: '40px', height: '40px', background: folder.bg, color: folder.color, marginBottom: 0 }}>
                        <Folder size={20} fill="currentColor" opacity={0.2} />
                      </div>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer' }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <h4 style={{ margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{folder.name}</h4>
                    <span className="mockup-text-secondary">{folder.count} files</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Files */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>Recent Files</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <select style={{ background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border)', borderRadius: '6px', padding: '6px 12px', color: 'var(--theme-text-primary)' }}>
                    <option>Last modified</option>
                    <option>Name</option>
                    <option>Size</option>
                  </select>
                  <div style={{ display: 'flex', background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border)', borderRadius: '6px', padding: '2px' }}>
                    <button style={{ background: 'var(--theme-surface)', border: 'none', padding: '4px 8px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', color: 'var(--theme-text-primary)' }}><List size={16} /></button>
                    <button style={{ background: 'transparent', border: 'none', padding: '4px 8px', borderRadius: '4px', color: 'var(--theme-text-secondary)' }}><Grid size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="mockup-card" style={{ padding: 0, overflowX: 'auto' }}>
                {recentFiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--theme-text-secondary)' }}>
                  <img src={illusNoFiles} alt="No files" style={{ maxWidth: '320px', width: '100%', maxHeight: '200px', objectFit: 'contain', margin: '0 auto 16px', display: 'block', borderRadius: '16px' }} />
                  <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: '8px' }}>No files yet</h3>
                  <p style={{ marginBottom: '24px' }}>Upload your first study material to get started.</p>
                  <button className="mockup-btn-primary">Upload File</button>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--theme-border)', color: 'var(--theme-text-secondary)' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Name</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Location</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Type</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Size</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Modified</th>
                      <th style={{ padding: '16px 24px', width: '40px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentFiles.map((file, i) => (
                      <tr key={i} style={{ borderBottom: i === recentFiles.length - 1 ? 'none' : '1px solid var(--theme-border)' }}>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: file.bg, color: file.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <img src={file.icon} width={20} height={20} alt={file.type} />
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--theme-text-primary)' }}>{file.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', color: 'var(--theme-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{file.location}</td>
                        <td style={{ padding: '16px 24px', color: 'var(--theme-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{file.type}</td>
                        <td style={{ padding: '16px 24px', color: 'var(--theme-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{file.size}</td>
                        <td style={{ padding: '16px 24px', color: 'var(--theme-text-secondary)', fontSize: 'var(--font-size-xs)' }}>{file.date}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <button style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer' }}>
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              </div>
            </div>

          </div>

          {/* RIGHT: Storage, Activity, Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Storage */}
            <div className="mockup-card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Storage</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>68% used</span>
                <span className="mockup-text-secondary">3.4 GB of 5 GB</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--theme-input-bg)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#10B981', borderRadius: '999px' }}></div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mockup-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Recent Activity</h3>
                <button style={{ background: 'transparent', border: 'none', color: '#10B981', fontWeight: 600, cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
                  View all &rarr;
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: '#10B981', marginTop: '2px' }}><UploadCloud size={16} /></div>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)', display: 'block', marginBottom: '2px' }}>You uploaded a file</span>
                    <span style={{ fontWeight: 600, display: 'block' }}>Dynamic_Programming.pdf</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>2 hours ago</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: '#3B82F6', marginTop: '2px' }}><Edit3 size={16} /></div>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)', display: 'block', marginBottom: '2px' }}>You edited a note</span>
                    <span style={{ fontWeight: 600, display: 'block' }}>OS_Processes_Notes</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>5 hours ago</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: '#8B5CF6', marginTop: '2px' }}><Folder size={16} /></div>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)', display: 'block', marginBottom: '2px' }}>You created a folder</span>
                    <span style={{ fontWeight: 600, display: 'block' }}>Machine Learning</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-text-secondary)' }}>1 day ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mockup-card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button className="mockup-class-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid var(--theme-border)', background: 'var(--theme-surface)' }}>
                  <FileText size={20} color="#3B82F6" />
                  <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>New Note</span>
                </button>
                <button className="mockup-class-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid var(--theme-border)', background: 'var(--theme-surface)' }}>
                  <Folder size={20} color="#F59E0B" />
                  <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>New Folder</span>
                </button>
                <button className="mockup-class-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid var(--theme-border)', background: 'var(--theme-surface)' }}>
                  <UploadCloud size={20} color="#10B981" />
                  <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>Upload File</span>
                </button>
                <button className="mockup-class-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid var(--theme-border)', background: 'var(--theme-surface)' }}>
                  <Share2 size={20} color="#8B5CF6" />
                  <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>Share</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .notes-grid-layout {
            grid-template-columns: 240px 1fr !important;
          }
          .notes-grid-layout > div:last-child {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .notes-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .notes-grid-layout > div:first-child {
            display: none !important;
          }
          .notes-grid-layout > div:last-child {
            display: flex !important;
          }
        }
      `}} />
    </div>
  );
}
