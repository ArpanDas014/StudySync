import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, ChevronDown, Menu, Plus, 
  CheckSquare, Calendar, MoreVertical, X,
  Clock, AlertCircle, CheckCircle2, ChevronRight
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function TasksMockup({ setView }: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Dynamic Programming assignment', subject: 'Algorithms', dueDate: 'Today · 8:00 PM', group: 'TODAY', priority: 'High', completed: false },
    { id: 2, title: 'Read Chapter 4: Processes & Threads', subject: 'Operating Systems', dueDate: 'Today · 10:00 PM', group: 'TODAY', priority: 'Medium', completed: false },
    { id: 3, title: 'Practice SQL joins and subqueries', subject: 'Databases', dueDate: 'Tomorrow', group: 'TOMORROW', priority: 'Medium', completed: false },
    { id: 4, title: 'Write script for automated testing', subject: 'Web Development', dueDate: 'Tomorrow', group: 'TOMORROW', priority: 'Low', completed: false },
    { id: 5, title: 'Review for Midterm Exam', subject: 'Computer Networks', dueDate: 'Sep 21', group: 'THIS WEEK', priority: 'High', completed: false },
    { id: 6, title: 'Setup AWS EC2 instance', subject: 'Projects', dueDate: 'Sep 24', group: 'LATER', priority: 'Medium', completed: false },
    { id: 7, title: 'Finish OS process notes', subject: 'Operating Systems', dueDate: 'Yesterday', group: 'COMPLETED', priority: 'Low', completed: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const isNowCompleted = !t.completed;
        return { 
          ...t, 
          completed: isNowCompleted,
          group: isNowCompleted ? 'COMPLETED' : (t.dueDate.includes('Today') ? 'TODAY' : 'TOMORROW') 
        };
      }
      return t;
    }));
  };

  const filters = ['All', 'Today', 'Upcoming', 'Completed', 'Overdue'];

  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Completed') return t.completed;
    if (activeFilter === 'Today') return t.group === 'TODAY' && !t.completed;
    if (activeFilter === 'Upcoming') return (t.group === 'TOMORROW' || t.group === 'THIS WEEK' || t.group === 'LATER') && !t.completed;
    if (activeFilter === 'Overdue') return t.dueDate.includes('Yesterday') && !t.completed;
    return true;
  });

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'High': return { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'Medium': return { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'Low': return { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' };
      default: return { color: 'var(--theme-text-secondary)', bg: 'var(--theme-input-bg)' };
    }
  };

  // Group tasks for rendering
  const groupedTasks = filteredTasks.reduce((acc: any, task) => {
    const g = task.completed ? 'COMPLETED' : task.group;
    if (!acc[g]) acc[g] = [];
    acc[g].push(task);
    return acc;
  }, {});

  const groupOrder = ['TODAY', 'TOMORROW', 'THIS WEEK', 'LATER', 'COMPLETED'];

  return (
    <div className="dashboard-mockup-wrapper" style={{ minHeight: '100vh', paddingBottom: '64px' }}>
      
      {/* Header Area */}
      <div className="mockup-top-search-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <button className="mockup-menu-btn" style={{ display: 'none' }}>
             <Menu size={20} color="var(--theme-text-secondary)" />
           </button>
           <div className="mockup-search-container" style={{ width: '400px', maxWidth: '100%' }}>
            <Search size={18} color="#9CA3AF" />
            <input type="text" placeholder="Search computer science topics, notes, or resources..." style={{ flex: 1 }} />
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

      <div className="mockup-main-content" style={{ paddingTop: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>Tasks</h1>
            <p style={{ color: 'var(--theme-text-secondary)', margin: 0 }}>Stay organized, keep track of your work, and never miss an important deadline.</p>
          </div>
          <button className="mockup-btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* Compact Summary blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: "Today's Tasks", count: tasks.filter(t => t.group === 'TODAY' && !t.completed).length, icon: Calendar, color: '#3B82F6' },
            { label: "Due Soon", count: tasks.filter(t => t.group === 'TOMORROW' && !t.completed).length, icon: Clock, color: '#F59E0B' },
            { label: "Completed", count: tasks.filter(t => t.completed).length, icon: CheckCircle2, color: '#10B981' },
            { label: "Overdue", count: tasks.filter(t => t.dueDate.includes('Yesterday') && !t.completed).length, icon: AlertCircle, color: '#EF4444' },
          ].map((stat, i) => (
            <div key={i} className="mockup-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={20} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, lineHeight: 1 }}>{stat.count}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div className="mockup-subject-row" style={{ margin: 0, padding: 0, border: 'none' }}>
            {filters.map(filter => (
              <button 
                key={filter}
                className={`mockup-pill ${activeFilter === filter ? 'active-subject' : ''}`}
                onClick={() => setActiveFilter(filter)}
                style={{ padding: '6px 16px' }}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="mockup-search-container" style={{ width: '240px', background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border-strong)', boxShadow: 'none' }}>
            <Search size={16} color="var(--theme-text-secondary)" />
            <input type="text" placeholder="Search tasks..." style={{ background: 'transparent' }} />
          </div>
        </div>

        {/* Task List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--theme-text-secondary)' }}>
              <CheckSquare size={48} opacity={0.2} style={{ margin: '0 auto 16px', display: 'block' }} />
              <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: '8px' }}>You're all caught up.</h3>
              <p style={{ marginBottom: '24px' }}>No tasks need your attention right now.</p>
              <button className="mockup-btn-primary" onClick={() => setIsModalOpen(true)}>+ New Task</button>
            </div>
          ) : (
            groupOrder.map(group => {
              const groupTasks = groupedTasks[group];
              if (!groupTasks || groupTasks.length === 0) return null;
              
              return (
                <div key={group}>
                  <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--theme-text-secondary)', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    {group}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {groupTasks.map((task: any) => {
                      const pStyle = getPriorityStyle(task.priority);
                      return (
                        <div key={task.id} className="mockup-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', opacity: task.completed ? 0.6 : 1, transition: 'all 0.2s ease' }}>
                          <button 
                            onClick={() => toggleTask(task.id)}
                            style={{ 
                              width: '24px', height: '24px', borderRadius: '6px', 
                              border: `2px solid ${task.completed ? '#10B981' : 'var(--theme-border-strong)'}`, 
                              background: task.completed ? '#10B981' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s ease'
                            }}
                          >
                            {task.completed && <CheckCircle2 size={16} color="white" />}
                          </button>
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                              <h4 style={{ margin: 0, fontSize: 'var(--font-size-md)', textDecoration: task.completed ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {task.title}
                              </h4>
                              <span style={{ fontSize: 'var(--font-size-xs)', padding: '2px 8px', borderRadius: '4px', background: pStyle.bg, color: pStyle.color, fontWeight: 600 }}>
                                {task.priority}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'var(--font-size-sm)', color: 'var(--theme-text-secondary)' }}>
                              <span style={{ fontWeight: 500 }}>{task.subject}</span>
                              <span>•</span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: task.dueDate.includes('Yesterday') && !task.completed ? '#EF4444' : 'inherit' }}>
                                <Calendar size={12} /> {task.dueDate}
                              </span>
                            </div>
                          </div>
                          
                          <button style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer', padding: '8px' }}>
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* NEW TASK MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="mockup-card"
              style={{ position: 'relative', width: '100%', maxWidth: '500px', padding: '32px', zIndex: 1001, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>New Task</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--theme-text-secondary)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>Task Title</label>
                  <input type="text" placeholder="What needs to be done?" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>Subject (Computer Science)</label>
                  <select style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }}>
                    <option>Algorithms</option>
                    <option>Data Structures</option>
                    <option>Operating Systems</option>
                    <option>Web Development</option>
                    <option>Databases</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>Due Date</label>
                    <input type="date" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>Priority</label>
                    <select style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }}>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>Optional Notes</label>
                  <textarea placeholder="Add any details..." rows={3} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--theme-border-strong)', background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', resize: 'none' }}></textarea>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text-primary)', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button className="mockup-btn-primary" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px' }}>
                  Create Task
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
