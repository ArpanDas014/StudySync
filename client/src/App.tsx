import { FormEvent, useMemo, useState } from 'react';

type View = 'welcome' | 'dashboard' | 'library' | 'planner' | 'assistant' | 'groups' | 'settings';
type IconName = 'grid' | 'book' | 'calendar' | 'sparkle' | 'people' | 'settings' | 'bell' | 'arrow' | 'check' | 'plus' | 'search' | 'more' | 'clock' | 'target' | 'close';

const icons: Record<IconName, string> = {
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  book: 'M5 4.7A2.7 2.7 0 0 1 7.7 2H20v17H7.7A2.7 2.7 0 0 0 5 21.7zm0 0V20m0-7h15',
  calendar: 'M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2zm0 5h16M8 2v4m8-4v4',
  sparkle: 'm12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z',
  people: 'M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20m12-11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm4 4a3.5 3.5 0 0 1 4 3.5V20M8.5 10a4 4 0 1 1 0-8',
  settings: 'M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4zm0-13.2v2m0 15.8v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m14.2 0-1.4-1.4M6.3 6.3 4.9 4.9',
  bell: 'M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  check: 'm5 12 4.2 4L19 6',
  plus: 'M12 5v14M5 12h14',
  search: 'm20 20-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  clock: 'M12 6v6l4 2',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  close: 'm6 6 12 12M18 6 6 18',
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name]} /></svg>;
}

const navigation: { label: string; view: View; icon: IconName }[] = [
  { label: 'Dashboard', view: 'dashboard', icon: 'grid' },
  { label: 'My library', view: 'library', icon: 'book' },
  { label: 'Study planner', view: 'planner', icon: 'calendar' },
  { label: 'AI assistant', view: 'assistant', icon: 'sparkle' },
  { label: 'Study groups', view: 'groups', icon: 'people' },
];

const initialTasks = [
  { id: 1, title: 'Review limits & continuity', subject: 'Mathematics', time: '4:00 – 4:45 PM', tone: 'blue', done: false },
  { id: 2, title: 'Read chapter 5 notes', subject: 'Biology', time: '6:00 – 6:40 PM', tone: 'sand', done: false },
  { id: 3, title: 'Practice 10 questions', subject: 'Physics', time: '7:15 – 8:00 PM', tone: 'coral', done: true },
];

export default function App() {
  const [view, setView] = useState<View>('welcome');
  const [tasks, setTasks] = useState(initialTasks);
  const [notice, setNotice] = useState('');
  const completed = tasks.filter((task) => task.done).length;

  const openWorkspace = () => setView('dashboard');
  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2800);
  };

  return (
    <main>
      {view === 'welcome' ? <Welcome onStart={openWorkspace} onPlan={() => setView('planner')} /> : (
        <Workspace
          view={view}
          setView={setView}
          tasks={tasks}
          completed={completed}
          onToggleTask={(id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task))}
          onNotice={showNotice}
        />
      )}
      {notice && <div role="status" className="toast"><Icon name="check" size={17} />{notice}</div>}
    </main>
  );
}

function Brand() {
  return <button className="brand" aria-label="StudySync home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="brand-mark"><span /></span><span>Study<span>Sync</span></span></button>;
}

function Welcome({ onStart, onPlan }: { onStart: () => void; onPlan: () => void }) {
  return <div className="welcome-shell">
    <header className="marketing-nav"><Brand /><nav aria-label="Marketing"><a href="#how">How it works</a><a href="#why">Why StudySync</a></nav><button className="button button-small" onClick={onStart}>Get started <Icon name="arrow" size={16} /></button></header>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />One clear study system</p><h1>Make your study time <em>count.</em></h1><p className="hero-lead">Bring your notes, deadlines, and available time into one calm workspace that helps you move forward.</p><div className="hero-actions"><button className="button" onClick={onStart}>Build my study space <Icon name="arrow" size={18} /></button><button className="text-button" onClick={onPlan}>See a study plan <span>↓</span></button></div><div className="hero-proof"><div className="avatar-stack"><i>R</i><i>M</i><i>A</i></div><span>Made for students who want a plan that fits real life.</span></div></div>
      <div className="hero-art" aria-label="Illustration of a student planning a study session"><div className="paper paper-back" /><div className="paper paper-front"><div className="paper-top"><span>Today</span><b>4 tasks</b></div><div className="paper-line wide" /><div className="paper-line" /><div className="paper-line short" /><div className="paper-check"><Icon name="check" size={14} />Review calculus</div></div><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="planner-chip"><Icon name="sparkle" size={17} />Your plan is ready</div><div className="student-shape"><div className="student-head" /><div className="student-body" /><div className="student-laptop" /></div></div>
    </section>
    <section className="feature-row" id="how"><Feature icon="book" title="Keep every resource in reach" text="Organize notes by subject and find what you need quickly." /><Feature icon="calendar" title="Plan around your real life" text="Build achievable study blocks around your deadlines and free time." /><Feature icon="sparkle" title="Get unstuck with support" text="Use guided AI explanations when a topic needs another look." /></section>
    <section className="landing-note" id="why"><p className="eyebrow">Study without the scramble</p><h2>Your next step should always be obvious.</h2><button className="text-button" onClick={onStart}>Open the workspace <Icon name="arrow" size={17} /></button></section>
  </div>;
}

function Feature({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return <article className="feature"><span className="feature-icon"><Icon name={icon} size={21} /></span><h2>{title}</h2><p>{text}</p></article>;
}

function Workspace({ view, setView, tasks, completed, onToggleTask, onNotice }: { view: View; setView: (view: View) => void; tasks: typeof initialTasks; completed: number; onToggleTask: (id: number) => void; onNotice: (message: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const title = navigation.find((item) => item.view === view)?.label ?? (view === 'settings' ? 'Settings' : 'Study groups');
  return <div className="app-shell"><aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}><div className="sidebar-head"><Brand /><button className="mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button></div><div className="student-pill"><div className="profile-avatar">AR</div><div><strong>Aria Rao</strong><span>Focused learner</span></div><span className="streak">7 <small>day streak</small></span></div><nav className="sidebar-nav" aria-label="Study workspace">{navigation.map((item) => <button className={view === item.view ? 'nav-item active' : 'nav-item'} onClick={() => { setView(item.view); setMenuOpen(false); }} key={item.view}><Icon name={item.icon} size={19} />{item.label}</button>)}</nav><div className="sidebar-bottom"><button className={view === 'settings' ? 'nav-item active' : 'nav-item'} onClick={() => setView('settings')}><Icon name="settings" size={19} />Settings</button><p><span className="online-dot" />All changes saved</p></div></aside><div className="mobile-scrim" onClick={() => setMenuOpen(false)} />
    <section className="app-content"><header className="app-header"><button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button><div><p className="crumb">My study space</p><h1>{title}</h1></div><div className="header-actions"><label className="search"><Icon name="search" size={18} /><input aria-label="Search your study space" placeholder="Search resources" /></label><button className="icon-button" aria-label="Notifications"><Icon name="bell" /><span /></button><div className="profile-avatar header-avatar">AR</div></div></header>
      {view === 'dashboard' && <Dashboard tasks={tasks} completed={completed} onToggleTask={onToggleTask} setView={setView} onNotice={onNotice} />}
      {view === 'library' && <Library onNotice={onNotice} />}
      {view === 'planner' && <Planner onNotice={onNotice} />}
      {view === 'assistant' && <Assistant />}
      {view === 'groups' && <EmptyView icon="people" title="Your study circle is waiting" copy="Groups will give you a quiet place to share resources, ask doubts, and prepare together." action="Create a group" onAction={() => onNotice('Group creation will be available with your account.')} />}
      {view === 'settings' && <Settings onNotice={onNotice} />}
    </section><nav className="bottom-nav" aria-label="Mobile study navigation">{navigation.slice(0, 4).map((item) => <button key={item.view} onClick={() => setView(item.view)} className={view === item.view ? 'active' : ''}><Icon name={item.icon} size={20} /><span>{item.label.split(' ')[0]}</span></button>)}</nav>
  </div>;
}

function Dashboard({ tasks, completed, onToggleTask, setView, onNotice }: { tasks: typeof initialTasks; completed: number; onToggleTask: (id: number) => void; setView: (view: View) => void; onNotice: (message: string) => void }) {
  const progress = Math.round((completed / tasks.length) * 100);
  return <div className="page dashboard-page"><section className="welcome-line"><div><p className="eyebrow">Tuesday, August 12</p><h2>Good afternoon, Aria.</h2><p>Here is a calm look at what matters today.</p></div><button className="button" onClick={() => setView('planner')}><Icon name="plus" size={18} />Plan my week</button></section><section className="metric-grid"><Metric value="03" label="Tasks for today" icon="target" tone="blue" /><Metric value="07" label="Day study streak" icon="sparkle" tone="coral" /><Metric value="12" label="Resources saved" icon="book" tone="sand" /></section><section className="dashboard-grid"><article className="today-card"><div className="card-title"><div><p className="eyebrow">Today’s plan</p><h2>Small steps, clear progress.</h2></div><button className="text-button" onClick={() => setView('planner')}>Full schedule <Icon name="arrow" size={16} /></button></div><div className="task-list">{tasks.map((task) => <button className={`task ${task.done ? 'complete' : ''}`} key={task.id} onClick={() => onToggleTask(task.id)}><span className={`task-check ${task.done ? 'checked' : ''}`}>{task.done && <Icon name="check" size={14} />}</span><span className={`task-tone ${task.tone}`} /><span className="task-copy"><strong>{task.title}</strong><small>{task.subject} · {task.time}</small></span><span className="task-action">{task.done ? 'Done' : 'Start'}</span></button>)}</div><div className="progress-area"><div><span>Today’s progress</span><b>{progress}%</b></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div></div></article><aside className="deadline-card"><div className="deadline-top"><span className="deadline-icon"><Icon name="calendar" size={21} /></span><button className="icon-button subtle" aria-label="More deadline options"><Icon name="more" /></button></div><p className="eyebrow">Next deadline</p><h2>Physics midterm</h2><p>Mechanics · Unit 3</p><div className="deadline-number"><b>09</b><span>days<br />left</span></div><button className="secondary-button" onClick={() => setView('planner')}>View revision plan <Icon name="arrow" size={16} /></button></aside></section><section className="lower-grid"><article className="resource-card"><div className="card-title"><div><p className="eyebrow">Continue learning</p><h2>Open a saved resource</h2></div><button className="text-button" onClick={() => setView('library')}>My library <Icon name="arrow" size={16} /></button></div><div className="resource-preview"><div className="document-thumb"><span>PDF</span><i /><i /><i /></div><div><span className="subject-chip">Mathematics</span><h3>Calculus — quick revision notes</h3><p>Saved yesterday · 18 pages</p><button className="text-button" onClick={() => onNotice('Opening Calculus — quick revision notes.')}>Continue reading <Icon name="arrow" size={16} /></button></div></div></article><article className="ai-card"><span className="ai-spark"><Icon name="sparkle" size={22} /></span><p className="eyebrow">StudySync AI</p><h2>Need a clearer explanation?</h2><p>Ask a question, simplify a concept, or turn a note into revision points.</p><button className="secondary-button light" onClick={() => setView('assistant')}>Ask the assistant <Icon name="arrow" size={16} /></button></article></section></div>;
}

function Metric({ value, label, icon, tone }: { value: string; label: string; icon: IconName; tone: string }) { return <article className={`metric metric-${tone}`}><span><Icon name={icon} size={20} /></span><div><b>{value}</b><p>{label}</p></div></article>; }

function Library({ onNotice }: { onNotice: (message: string) => void }) { const [filter, setFilter] = useState('All resources'); const resources = useMemo(() => [{ title: 'Calculus — quick revision notes', subject: 'Mathematics', detail: 'PDF · 18 pages', color: 'blue' }, { title: 'Cell structure diagrams', subject: 'Biology', detail: 'Image collection · 7 items', color: 'coral' }, { title: 'Kinematics practice set', subject: 'Physics', detail: 'PDF · 24 questions', color: 'sand' }], []); return <div className="page"><section className="page-intro"><div><p className="eyebrow">Organize and return with ease</p><h2>My library</h2><p>Your resources stay connected to your subjects and study plan.</p></div><button className="button" onClick={() => onNotice('Upload flow will connect to Supabase Storage next.')}><Icon name="plus" size={18} />Upload resource</button></section><div className="library-toolbar"><label className="search library-search"><Icon name="search" size={18} /><input placeholder="Find a note, subject, or topic" /></label><div className="filter-row">{['All resources', 'Mathematics', 'Biology', 'Physics'].map((item) => <button onClick={() => setFilter(item)} className={filter === item ? 'filter active' : 'filter'} key={item}>{item}</button>)}</div></div><section className="resource-grid">{resources.filter((resource) => filter === 'All resources' || resource.subject === filter).map((resource) => <article className="library-card" key={resource.title}><div className={`library-file ${resource.color}`}><Icon name="book" size={25} /><span>STUDY NOTE</span></div><div className="library-copy"><span className="subject-chip">{resource.subject}</span><h3>{resource.title}</h3><p>{resource.detail}</p><button className="text-button" onClick={() => onNotice(`Opening ${resource.title}.`)}>Open resource <Icon name="arrow" size={16} /></button></div></article>)}</section></div>; }

function Planner({ onNotice }: { onNotice: (message: string) => void }) { const [generated, setGenerated] = useState(false); const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; return <div className="page"><section className="page-intro planner-heading"><div><p className="eyebrow">Your time, protected</p><h2>Study planner</h2><p>A balanced week built around your priority subjects and real availability.</p></div><button className="button" onClick={() => { setGenerated(true); onNotice('Your plan was refreshed around your available time.'); }}><Icon name="sparkle" size={18} />{generated ? 'Refresh plan' : 'Generate my plan'}</button></section><section className="planner-summary"><span className="summary-icon"><Icon name="clock" size={20} /></span><p><strong>8h 30m</strong> planned this week</p><span className="summary-divider" /><p><strong>1</strong> rest day protected</p><span className="summary-divider" /><p><strong>2</strong> upcoming deadlines</p></section><section className="week-card"><div className="week-header"><div><h3>This week</h3><p>August 11–15</p></div><button className="secondary-button" onClick={() => onNotice('Availability settings are ready to edit in the next setup step.')}>Adjust availability</button></div><div className="week-grid">{days.map((day, index) => <div className="day-column" key={day}><p>{day}<b>{11 + index}</b></p>{index === 1 && <div className="calendar-block math"><strong>Calculus review</strong><span>4:00 PM · 45 min</span></div>}{index === 2 && <div className="calendar-block biology"><strong>Cell division</strong><span>5:30 PM · 40 min</span></div>}{index === 3 && <div className="calendar-block physics"><strong>Practice problems</strong><span>4:30 PM · 45 min</span></div>}{index === 4 && <div className="calendar-block revision"><strong>Weekly review</strong><span>4:00 PM · 30 min</span></div>}</div>)}</div></section><section className="planner-callout"><span><Icon name="sparkle" size={23} /></span><div><h3>Plans should flex when life does.</h3><p>When you miss a task, StudySync will help protect high-priority work and rebalance the rest.</p></div><button className="text-button" onClick={() => onNotice('Recovery planning will be included in the scheduler API.')}>How it works <Icon name="arrow" size={16} /></button></section></div>; }

function Assistant() { const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi Aria. What are you trying to understand today?' }]); const [input, setInput] = useState(''); const submit = (event: FormEvent) => { event.preventDefault(); const question = input.trim(); if (!question) return; setMessages((current) => [...current, { role: 'user', text: question }, { role: 'assistant', text: 'I’ll help you work through that. In the connected version, I’ll use your selected subject and resources to give a clear, grounded explanation.' }]); setInput(''); }; return <div className="page assistant-page"><section className="assistant-intro"><span className="ai-spark"><Icon name="sparkle" size={24} /></span><div><p className="eyebrow">StudySync AI</p><h2>Understand the next concept.</h2><p>Ask a question or connect a resource when you need context.</p></div></section><div className="suggestion-row">{['Explain a topic simply', 'Help me plan revision', 'Quiz me from a note'].map((suggestion) => <button key={suggestion} onClick={() => setInput(suggestion)}>{suggestion}</button>)}</div><section className="chat-card" aria-live="polite"><div className="messages">{messages.map((message, index) => <div className={`message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === 'assistant' ? 'SS' : 'AR'}</span><p>{message.text}</p></div>)}</div><form onSubmit={submit}><label><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a concept, note, or plan…" /><button aria-label="Send question" className="button button-icon"><Icon name="arrow" size={18} /></button></label></form></section></div>; }

function EmptyView({ icon, title, copy, action, onAction }: { icon: IconName; title: string; copy: string; action: string; onAction: () => void }) { return <div className="page empty-view"><span className="empty-icon"><Icon name={icon} size={28} /></span><p className="eyebrow">Coming into focus</p><h2>{title}</h2><p>{copy}</p><button className="button" onClick={onAction}>{action} <Icon name="arrow" size={17} /></button></div>; }

function Settings({ onNotice }: { onNotice: (message: string) => void }) { return <div className="page settings-page"><section className="page-intro"><div><p className="eyebrow">Your study space</p><h2>Settings</h2><p>Choose what helps StudySync fit your routine.</p></div></section><div className="settings-card"><div><h3>Quiet hours</h3><p>Pause non-essential study reminders overnight.</p></div><button className="toggle active" aria-label="Quiet hours on" onClick={() => onNotice('Quiet-hours preference saved locally.')}><i /></button></div><div className="settings-card"><div><h3>AI and notes</h3><p>Always show source pages when an explanation uses a resource.</p></div><button className="toggle active" aria-label="Source-page references on" onClick={() => onNotice('Source-page preference saved locally.')}><i /></button></div></div>; }
