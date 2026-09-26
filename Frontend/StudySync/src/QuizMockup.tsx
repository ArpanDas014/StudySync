import ThemeToggle from './ThemeToggle';
import React, { useState } from 'react';
import { 
  Search, Bell, ChevronDown, Zap, BookOpen, Clock, Target, 
  Menu, Play, Book, BrainCircuit, Activity, Shield, Code, Server, Network,
  Crown, Flame, Calendar, Diamond, Beaker
} from 'lucide-react';
import {
  subjectAlgorithms,
  subjectDataStructures,
  subjectDbms,
  subjectOs,
  subjectWebDev,
  subjectAi,
  subjectNetworks,
  subjectCybersecurity,
  prodStreak,
  illusQuizzes
} from './assets';
import './quiz-mockup.css';

export default function QuizMockup({ setView }: any) {
  const [selectedSubject, setSelectedSubject] = useState('Algorithms');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');

  const subjects = [
    { name: 'Algorithms', icon: subjectAlgorithms },
    { name: 'Data Structures', icon: subjectDataStructures },
    { name: 'DBMS', icon: subjectDbms },
    { name: 'Operating Systems', icon: subjectOs },
    { name: 'Web Development', icon: subjectWebDev },
    { name: 'AI / ML', icon: subjectAi },
    { name: 'Networks', icon: subjectNetworks },
    { name: 'Cybersecurity', icon: subjectCybersecurity }
  ];

  const topics = [
    'All Topics', 'Sorting', 'Graphs', 'Dynamic Programming', 'Recursion', 
    'Complexity', 'Greedy', 'Backtracking'
  ];

  return (
    <div className="quiz-mockup-wrapper">
      
      {/* Header */}
      <div className="quiz-header">
        
        {/* Toggle sidebar button (for mobile or closed drawer) */}
        <button 
          className="quiz-mobile-menu" 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
        >
          <Menu size={20} color="#4B5563" />
        </button>

        <div className="quiz-header-title">
          <div className="quiz-title-icon">
            <Target size={24} color="#7C3AED" />
          </div>
          <div>
            <h1>Quiz & Practice</h1>
            <p>Practice. Analyze. Improve.</p>
          </div>
        </div>

        <div className="quiz-search">
          <Search size={18} color="#9CA3AF" />
          <input type="text" placeholder="Search topics, quizzes, questions..." />
          <span className="quiz-cmd-k">⌘ K</span>
        </div>

        <div className="quiz-header-actions">
          <ThemeToggle />
          <div className="quiz-streak" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <img src={prodStreak} width={18} height={18} alt="" /> <span>12 Day Streak</span>
          </div>
          <button className="quiz-bell">
            <Bell size={20} color="#4B5563" />
            <span className="quiz-bell-badge">3</span>
          </button>
          <button className="quiz-user">
            <div className="quiz-avatar">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
            </div>
            <span>Arpan Das</span>
            <ChevronDown size={16} color="#4B5563" />
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="quiz-pills-container">
        <div className="quiz-pill-row">
          {subjects.map(s => (
            <button 
              key={s.name}
              className={`quiz-pill ${selectedSubject === s.name ? 'active' : ''}`}
              onClick={() => setSelectedSubject(s.name)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <img src={s.icon} width={18} height={18} alt="" /> {s.name}
            </button>
          ))}
        </div>
        <div className="quiz-pill-row topics-row">
          {topics.map(t => (
            <button
              key={t}
              className={`quiz-topic-pill ${selectedTopic === t ? 'active' : ''}`}
              onClick={() => setSelectedTopic(t)}
            >
              {t}
            </button>
          ))}
          <button className="quiz-topic-pill">+ More ▾</button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="quiz-main-grid">
        
        {/* LEFT COLUMN */}
        <div className="quiz-left-col">
          
          {/* HERO BANNER */}
          <div className="quiz-hero">
            <div className="quiz-hero-content">
              <h2>Level up with practice 🚀</h2>
              <p>Solve quizzes, track your performance and focus on the topics that make you stronger.</p>
              <div className="quiz-hero-actions">
                <button className="quiz-btn-primary">
                  <Zap size={16} fill="currentColor" /> Start Quick Quiz
                </button>
                <button className="quiz-btn-secondary">
                  <BookOpen size={16} /> Practice by Topic
                </button>
              </div>
            </div>
            <div className="quiz-hero-illustration" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={illusQuizzes} 
                alt="Quiz Practice" 
                style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'contain' }} 
              />
            </div>
          </div>

          {/* CHOOSE YOUR PRACTICE */}
          <h3 className="quiz-section-title">Choose your practice</h3>
          <div className="quiz-practice-modes">
            <div className="quiz-mode-card">
              <div className="mode-icon green"><Zap size={24} /></div>
              <h4>QUICK QUIZ</h4>
              <p>10 Questions<br/>~ 10 min</p>
              <button className="mode-btn green-text">Start</button>
            </div>
            <div className="quiz-mode-card">
              <div className="mode-icon purple"><BookOpen size={24} /></div>
              <h4>TOPIC PRACTICE</h4>
              <p>Choose a specific<br/>topic to practice</p>
              <button className="mode-btn purple-text">Practice</button>
            </div>
            <div className="quiz-mode-card">
              <div className="mode-icon blue"><Clock size={24} /></div>
              <h4>MOCK TEST</h4>
              <p>60 Questions<br/>60 min</p>
              <button className="mode-btn blue-text">Start Test</button>
            </div>
            <div className="quiz-mode-card">
              <div className="mode-icon orange"><Target size={24} /></div>
              <h4>DAILY CHALLENGE</h4>
              <p>One challenging<br/>question daily</p>
              <button className="mode-btn orange-text">Attempt</button>
            </div>
          </div>

          {/* CONTINUE & GOAL ROW */}
          <div className="quiz-split-row">
            <div className="quiz-card continue-card">
              <div className="card-header">
                <h3>Continue Practice</h3>
                <a href="#">View All</a>
              </div>
              <div className="continue-item">
                <div className="continue-icon purple"><Target size={20} /></div>
                <div className="continue-info">
                  <h4>Graph Traversal</h4>
                  <p>Algorithms</p>
                </div>
                <div className="continue-progress">
                  <div className="progress-bar"><div className="fill" style={{width:'53%', background:'#10B981'}}></div></div>
                  <span>8 / 15 questions</span>
                </div>
                <span className="pct">53%</span>
                <button className="continue-btn">Continue</button>
              </div>
              <div className="continue-item">
                <div className="continue-icon blue"><Network size={20} /></div>
                <div className="continue-info">
                  <h4>Binary Trees</h4>
                  <p>Data Structures</p>
                </div>
                <div className="continue-progress">
                  <div className="progress-bar"><div className="fill" style={{width:'60%', background:'#3B82F6'}}></div></div>
                  <span>12 / 20 questions</span>
                </div>
                <span className="pct">60%</span>
                <button className="continue-btn">Continue</button>
              </div>
            </div>

            <div className="quiz-card goal-card">
              <div className="card-header">
                <h3>Today's Goal</h3>
                <a href="#">Edit Goal</a>
              </div>
              <div className="goal-content">
                <div className="goal-ring">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="251" strokeDashoffset="100" strokeLinecap="round"/>
                  </svg>
                  <div className="ring-text">60%</div>
                </div>
                <div className="goal-stats">
                  <strong>6 / 10</strong>
                  <p>questions completed</p>
                  <span className="remaining">4 questions<br/>remaining</span>
                  
                  <div className="goal-days">
                    {['M','T','W','T','F','S','S'].map((d,i) => (
                      <div key={i} className="g-day">
                        <div className={`g-dot ${i < 3 ? 'done' : i===3 ? 'active' : ''}`}></div>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT & REVIEW ROW */}
          <div className="quiz-split-row">
            <div className="quiz-card recent-card">
              <div className="card-header">
                <h3>Recent Practice</h3>
                <a href="#">View All</a>
              </div>
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Questions</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div className="table-quiz"><Target size={14} className="purple-text"/> Algorithms Basics</div></td>
                    <td>Algorithms</td>
                    <td className="green-text">82%</td>
                    <td>20</td>
                    <td>14 min</td>
                    <td>Today</td>
                  </tr>
                  <tr>
                    <td><div className="table-quiz"><Network size={14} className="blue-text"/> Binary Trees</div></td>
                    <td>Data Structures</td>
                    <td className="orange-text">74%</td>
                    <td>15</td>
                    <td>11 min</td>
                    <td>Yesterday</td>
                  </tr>
                  <tr>
                    <td><div className="table-quiz"><Server size={14} className="blue-text"/> DBMS Fundamentals</div></td>
                    <td>DBMS</td>
                    <td className="green-text">91%</td>
                    <td>20</td>
                    <td>16 min</td>
                    <td>2 days ago</td>
                  </tr>
                  <tr>
                    <td><div className="table-quiz"><Book size={14} className="green-text"/> Operating Systems Quiz</div></td>
                    <td>Operating Systems</td>
                    <td className="red-text">66%</td>
                    <td>15</td>
                    <td>13 min</td>
                    <td>3 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="quiz-card review-card">
              <div className="card-header">
                <h3>Topics to Review</h3>
                <a href="#">View All</a>
              </div>
              <div className="review-list">
                <div className="review-item">
                  <span className="r-name">Graph Algorithms</span>
                  <div className="r-bar"><div className="fill red-bg" style={{width:'42%'}}></div></div>
                  <span className="r-pct">42%</span>
                </div>
                <div className="review-item">
                  <span className="r-name">Dynamic Programming</span>
                  <div className="r-bar"><div className="fill orange-bg" style={{width:'56%'}}></div></div>
                  <span className="r-pct">56%</span>
                </div>
                <div className="review-item">
                  <span className="r-name">Recursion</span>
                  <div className="r-bar"><div className="fill green-bg" style={{width:'68%'}}></div></div>
                  <span className="r-pct">68%</span>
                </div>
                <div className="review-item">
                  <span className="r-name">Greedy Algorithms</span>
                  <div className="r-bar"><div className="fill orange-bg" style={{width:'50%'}}></div></div>
                  <span className="r-pct">50%</span>
                </div>
              </div>
              <button className="practice-weak-btn">Practice Weak Topics</button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="quiz-right-col">
          
          {/* TODAY'S CHALLENGE */}
          <div className="quiz-card challenge-card">
            <div className="challenge-header">
              <Calendar size={20} color="#7C3AED" />
              <div>
                <h3>Today's Challenge</h3>
                <p>One question a day keeps weakness away!</p>
              </div>
            </div>
            <div className="challenge-body">
              <p>Find the shortest path in a weighted graph.</p>
              <div className="xp-badge">+ 50 XP</div>
            </div>
            <button className="challenge-btn">Attempt Now →</button>
          </div>

          {/* PERFORMANCE OVERVIEW */}
          <div className="quiz-card performance-card">
            <div className="card-header">
              <h3>Performance Overview</h3>
              <select className="perf-select"><option>This Week</option></select>
            </div>
            
            <div className="perf-chart-area">
              {/* Minimal CSS representation of the chart */}
              <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                <polyline points="0,90 50,60 100,75 150,30 200,80 250,50 300,70" fill="none" stroke="#10B981" strokeWidth="3" />
                <circle cx="0" cy="90" r="4" fill="#10B981" />
                <circle cx="50" cy="60" r="4" fill="#10B981" />
                <circle cx="100" cy="75" r="4" fill="#10B981" />
                <circle cx="150" cy="30" r="4" fill="#10B981" />
                <circle cx="200" cy="80" r="4" fill="#10B981" />
                <circle cx="250" cy="50" r="4" fill="#10B981" />
                <circle cx="300" cy="70" r="4" fill="#10B981" />
                {/* 78% Peak Badge */}
                <rect x="135" y="5" width="30" height="16" rx="8" fill="#10B981" />
                <text x="150" y="16" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">78%</text>
              </svg>
              
              <div className="chart-y-axis">
                <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
              </div>
              <div className="chart-x-axis">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            <div className="perf-stats-row">
              <div className="perf-stat">
                <span>Avg. Score</span>
                <strong>78%</strong>
              </div>
              <div className="perf-stat">
                <span>Quizzes</span>
                <strong>12</strong>
              </div>
              <div className="perf-stat">
                <span>Accuracy</span>
                <strong>82%</strong>
              </div>
            </div>
          </div>

          {/* BADGES & ACHIEVEMENTS */}
          <div className="quiz-card badges-card">
            <div className="card-header">
              <h3>Badges & Achievements</h3>
              <a href="#">View All</a>
            </div>
            <div className="badges-grid">
              <div className="badge-item">
                <div className="badge-icon purple-bg"><Crown size={24} color="white" /></div>
                <h4>Quiz Master</h4>
                <p>Score 90% in a quiz</p>
              </div>
              <div className="badge-item">
                <div className="badge-icon orange-bg"><Flame size={24} color="white" /></div>
                <h4>Streak Pro</h4>
                <p>7 day streak</p>
              </div>
              <div className="badge-item">
                <div className="badge-icon green-bg"><Calendar size={24} color="white" /></div>
                <h4>Consistent</h4>
                <p>10 quizzes this week</p>
              </div>
              <div className="badge-item">
                <div className="badge-icon blue-bg"><Diamond size={24} color="white" /></div>
                <h4>Sharp Mind</h4>
                <p>Score 100% in a quiz</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
