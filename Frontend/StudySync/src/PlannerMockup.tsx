import ThemeToggle from './ThemeToggle';
import React, { useState } from 'react';
import { 
  CalendarDays, Search, Bell, ChevronDown, Calendar, Filter, ArrowUpDown, 
  Plus, Check, Play, BookOpen, DivideSquare as MathIcon, Activity, Target, 
  Users, Settings, Coffee, Clock, Music, Lightbulb, Menu, CheckCircle2, ChevronLeft, ChevronRight, MoreVertical, Code
} from 'lucide-react';
import { 
  illusFocus, 
  illusPlanning, 
  subjectMath, 
  navStudyGroups, 
  prodFocus, 
  prodCalendar 
} from './assets';
import './planner-mockup.css';

export default function PlannerMockup({ setView }: any) {
  const [viewMode, setViewMode] = useState('Daily');

  return (
    <div className="planner-wrapper">
      
      {/* Header */}
      <div className="planner-header">
        
        <button 
          className="planner-mobile-menu" 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
        >
          <Menu size={20} color="#4B5563" />
        </button>

        <div className="planner-header-title">
          <div className="planner-title-icon">
            <CalendarDays size={22} color="#111827" />
          </div>
          <div>
            <h1>Study Planner</h1>
            <p>Plan your study time and stay on track.</p>
          </div>
        </div>

        <div className="planner-search">
          <Search size={18} color="#9CA3AF" />
          <input type="text" placeholder="Search tasks, topics, notes..." />
          <span className="planner-cmd-k">⌘ K</span>
        </div>

        <div className="planner-header-actions">
          <ThemeToggle />
          <button className="planner-btn-outline">
            <Calendar size={16} /> Sync Calendar
          </button>
          <button className="planner-bell">
            <Bell size={20} color="#4B5563" />
            <span className="planner-bell-badge">3</span>
          </button>
          <button className="planner-user">
            <div className="planner-avatar">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
            </div>
            <span>Arpan Das</span>
            <ChevronDown size={16} color="#4B5563" />
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="planner-control-bar">
        <div className="planner-view-toggles">
          <button className={`toggle-btn ${viewMode === 'Daily' ? 'active' : ''}`} onClick={() => setViewMode('Daily')}>Daily</button>
          <button className={`toggle-btn ${viewMode === 'Weekly' ? 'active' : ''}`} onClick={() => setViewMode('Weekly')}>Weekly</button>
          <button className={`toggle-btn ${viewMode === 'Monthly' ? 'active' : ''}`} onClick={() => setViewMode('Monthly')}>Monthly</button>
        </div>

        <div className="planner-date-selector">
          <button className="date-nav"><ChevronLeft size={18} /></button>
          <div className="date-current">
            <Calendar size={18} /> <strong>May 14, 2025</strong>
          </div>
          <button className="date-nav"><ChevronRight size={18} /></button>
          <button className="date-today">Today</button>
        </div>

        <div className="planner-action-group">
          <button className="planner-btn-ghost"><Filter size={16} /> Filter</button>
          <button className="planner-btn-ghost"><ArrowUpDown size={16} /> Sort</button>
          <button className="planner-btn-primary"><Plus size={16} /> Add Task</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="planner-main-grid">
        
        {/* LEFT COLUMN */}
        <div className="planner-left-col">
          
          {/* Mini Calendar */}
          <div className="planner-card calendar-card">
            <div className="cal-header">
              <h3>May 2025</h3>
              <div className="cal-nav">
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
              </div>
            </div>
            <div className="cal-grid">
              <div className="cal-day-name">MON</div><div className="cal-day-name">TUE</div><div className="cal-day-name">WED</div>
              <div className="cal-day-name">THU</div><div className="cal-day-name">FRI</div><div className="cal-day-name">SAT</div><div className="cal-day-name">SUN</div>
              
              <div className="cal-day prev">28</div><div className="cal-day prev">29</div><div className="cal-day prev">30</div>
              <div className="cal-day">1</div><div className="cal-day">2</div><div className="cal-day">3</div><div className="cal-day">4</div>
              
              <div className="cal-day">5</div><div className="cal-day">6<div className="dots"><span className="dot g"></span></div></div><div className="cal-day">7<div className="dots"><span className="dot p"></span></div></div>
              <div className="cal-day">8</div><div className="cal-day">9</div><div className="cal-day">10</div><div className="cal-day">11</div>
              
              <div className="cal-day">12</div><div className="cal-day">13<div className="dots"><span className="dot y"></span><span className="dot g"></span></div></div>
              <div className="cal-day active">14<div className="dots"><span className="dot w"></span></div></div>
              <div className="cal-day">15</div><div className="cal-day">16</div><div className="cal-day">17</div><div className="cal-day">18</div>
              
              <div className="cal-day">19</div><div className="cal-day">20</div><div className="cal-day">21</div>
              <div className="cal-day">22</div><div className="cal-day">23</div><div className="cal-day">24</div><div className="cal-day">25</div>
              
              <div className="cal-day">26</div><div className="cal-day">27</div><div className="cal-day">28</div>
              <div className="cal-day">29</div><div className="cal-day">30<div className="dots"><span className="dot y"></span></div></div><div className="cal-day">31</div><div className="cal-day prev">1</div>
            </div>
          </div>

          {/* Today's Summary */}
          <div className="planner-card summary-card">
            <div className="summary-header">
              <h3>Today's Summary</h3>
              <a href="#">View Details</a>
            </div>
            <div className="summary-content">
              <div className="summary-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="251" strokeDashoffset="125" strokeLinecap="round"/>
                </svg>
                <div className="summary-ring-text">
                  <strong>50%</strong>
                  <span>Completed</span>
                </div>
              </div>
              <div className="summary-stats">
                <div className="stat-row">
                  <Calendar size={16} color="#6B7280" />
                  <div>
                    <strong>4</strong><span>Tasks</span>
                  </div>
                </div>
                <div className="stat-row">
                  <Check size={16} color="#10B981" />
                  <div>
                    <strong>2</strong><span>Completed</span>
                  </div>
                </div>
                <div className="stat-row">
                  <Clock size={16} color="#7C3AED" />
                  <div>
                    <strong>2h 30m</strong><span>Planned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Timer */}
          <div className="planner-card focus-card">
            <div className="focus-top">
              <h3>Ready to focus?</h3>
              <div className="focus-moon">🌙</div>
            </div>
            <div className="focus-time">25:00</div>
            <button className="start-focus-btn"><Play size={14} fill="currentColor" /> Start Focus</button>
            <div className="focus-illustration" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={illusFocus} alt="Focus" style={{ maxHeight: '72px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            
            <div className="focus-mode-selector">
              <Clock size={16} />
              <div>
                <strong>Pomodoro</strong>
                <span>25 min focus • 5 min break</span>
              </div>
              <ChevronRight size={16} className="arrow" />
            </div>

            <div className="focus-tools">
              <div className="tool-btn"><Settings size={18} /><span>Customize</span></div>
              <div className="tool-btn"><Coffee size={18} /><span>Short Break</span></div>
              <div className="tool-btn"><Coffee size={18} /><span>Long Break</span></div>
              <div className="tool-btn"><Music size={18} /><span>White Noise</span></div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="planner-right-col">
          
          {/* Timeline Schedule */}
          <div className="planner-card schedule-card">
            <div className="schedule-header">
              <div className="date-title">
                <Calendar size={20} color="#4B5563" />
                <h2>Wednesday, May 14</h2>
              </div>
              <div className="schedule-progress">
                <span>4 of 6 tasks completed</span>
                <div className="s-bar"><div className="fill" style={{width:'66%'}}></div></div>
              </div>
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>
              
              {/* MORNING */}
              <div className="time-section">
                <div className="time-label sun"><span className="t-icon">☀️</span> MORNING</div>
                
                <div className="task-row completed">
                  <div className="task-time">09:00 AM</div>
                  <div className="task-dot check"><Check size={12} color="white" /></div>
                  <div className="task-card">
                    <div className="t-icon-box red"><BookOpen size={20} /></div>
                    <div className="t-info">
                      <h4>Write History Essay <span className="badge red">High Priority</span></h4>
                      <p><span className="dot red"></span> History • 120 min</p>
                    </div>
                    <div className="t-actions">
                      <div className="status-icon green"><Check size={16} /></div>
                      <button className="more-btn"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>

                <div className="task-row completed">
                  <div className="task-time">11:00 AM</div>
                  <div className="task-dot check"><Check size={12} color="white" /></div>
                  <div className="task-card">
                    <div className="t-icon-box yellow" style={{ background: 'transparent', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={subjectMath} width={36} height={36} alt="Math" />
                    </div>
                    <div className="t-info">
                      <h4>Math Problem Set 4 <span className="badge yellow">Medium Priority</span></h4>
                      <p><span className="dot yellow"></span> Mathematics • 45 min</p>
                    </div>
                    <div className="t-actions">
                      <div className="status-icon green"><Check size={16} /></div>
                      <button className="more-btn"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AFTERNOON */}
              <div className="time-section">
                <div className="time-label aft"><span className="t-icon">🌤️</span> AFTERNOON</div>
                
                <div className="task-row">
                  <div className="task-time">01:30 PM</div>
                  <div className="task-dot ring"></div>
                  <div className="task-card">
                    <div className="t-icon-box purple"><Activity size={20} /></div>
                    <div className="t-info">
                      <h4>Read Biology Chapter 3 <span className="badge blue">Low Priority</span></h4>
                      <p><span className="dot blue"></span> Biology • 30 min</p>
                    </div>
                    <div className="t-actions">
                      <button className="play-btn"><Play size={14} fill="currentColor" /></button>
                      <button className="more-btn"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>

                <div className="task-row">
                  <div className="task-time">03:00 PM</div>
                  <div className="task-dot ring"></div>
                  <div className="task-card">
                    <div className="t-icon-box blue" style={{ background: 'transparent', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={subjectMath} width={36} height={36} alt="Calculus" />
                    </div>
                    <div className="t-info">
                      <h4>Review Limits & Continuity <span className="badge blue-light">Calculus</span></h4>
                      <p><span className="dot blue"></span> Calculus • 60 min</p>
                    </div>
                    <div className="t-actions">
                      <button className="play-btn"><Play size={14} fill="currentColor" /></button>
                      <button className="more-btn"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* EVENING */}
              <div className="time-section">
                <div className="time-label eve"><span className="t-icon">🌙</span> EVENING</div>
                
                <div className="task-row">
                  <div className="task-time">05:00 PM</div>
                  <div className="task-dot ring"></div>
                  <div className="task-card">
                    <div className="t-icon-box green" style={{ background: 'transparent', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={prodFocus} width={28} height={28} alt="Focus" />
                    </div>
                    <div className="t-info">
                      <h4>Focus Session <span className="badge purple">Focus</span></h4>
                      <p><span className="dot blue"></span> Data Structures • 25 min</p>
                    </div>
                    <div className="t-actions">
                      <button className="play-btn"><Play size={14} fill="currentColor" /></button>
                      <button className="more-btn"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>

                <div className="task-row">
                  <div className="task-time">06:00 PM</div>
                  <div className="task-dot ring"></div>
                  <div className="task-card">
                    <div className="t-icon-box blue-light" style={{ background: 'transparent', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={navStudyGroups} width={28} height={28} alt="Group" />
                    </div>
                    <div className="t-info">
                      <h4>DSA Group Discussion <span className="badge green">Group</span></h4>
                      <p><span className="dot blue"></span> Study Group • 60 min</p>
                    </div>
                    <div className="t-actions">
                      <button className="play-btn"><Play size={14} fill="currentColor" /></button>
                      <button className="more-btn"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="floating-add-btn"><Plus size={24} color="white" /></button>
            </div>
          </div>

          {/* Upcoming Row */}
          <div className="upcoming-header">
            <h3>Upcoming</h3>
            <a href="#">View All</a>
          </div>
          <div className="upcoming-cards">
            <div className="uc-card">
              <div className="uc-icon green-light"><Calendar size={20} color="#10B981" /></div>
              <div className="uc-info">
                <span>Tomorrow</span>
                <h4>DSA Practice</h4>
                <p><span className="dot green"></span> 10:00 AM • 45 min</p>
              </div>
            </div>
            <div className="uc-card">
              <div className="uc-icon yellow-light"><Calendar size={20} color="#F59E0B" /></div>
              <div className="uc-info">
                <span>Tomorrow</span>
                <h4>DBMS Quiz</h4>
                <p><span className="dot yellow"></span> 06:00 PM • 30 min</p>
              </div>
            </div>
            <div className="uc-card">
              <div className="uc-icon purple-light"><Users size={20} color="#7C3AED" /></div>
              <div className="uc-info">
                <span>Friday, May 16</span>
                <h4>Study Group</h4>
                <p><span className="dot purple"></span> 07:00 PM • 60 min</p>
              </div>
              <div className="uc-nav"><ChevronLeft size={16} /><ChevronRight size={16} /></div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="pro-tip-banner">
            <div className="tip-content">
              <div className="tip-icon"><Lightbulb size={24} color="#10B981" /></div>
              <div>
                <h4>Pro Tip</h4>
                <p>Break your tasks into smaller chunks and take short breaks to stay productive!</p>
              </div>
            </div>
            <div className="tip-illustration">
              <div className="t-books">
                <div className="t-book green"></div>
                <div className="t-book blue"></div>
                <div className="t-book purple"></div>
              </div>
              <div className="t-mug"><Code size={12} color="white" /></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
