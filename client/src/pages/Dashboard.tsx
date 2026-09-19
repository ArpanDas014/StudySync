import React from 'react';

export default function Dashboard() {
  return (
    <div className="main-content">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1>Welcome back, Alex! 👋</h1>
          <p className="text-gray">You have 2 upcoming deadlines and 3 tasks for today.</p>
        </div>
        <button className="btn btn-primary">+ New Study Session</button>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Study Streak</h3>
            <span className="chip chip-coral">🔥 4 Days</span>
          </div>
          <p className="text-gray mb-4">You're on a roll! Complete today's tasks to extend your streak.</p>
          <div style={{ height: '8px', backgroundColor: 'var(--color-gray-200)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', backgroundColor: 'var(--color-coral)' }}></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Goal</h3>
            <span className="chip chip-blue">12h / 15h</span>
          </div>
          <p className="text-gray mb-4">Almost there. Keep up the good work for your target.</p>
          <div style={{ height: '8px', backgroundColor: 'var(--color-gray-200)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '100%', backgroundColor: 'var(--color-blue)' }}></div>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'var(--color-sand)', border: 'none' }}>
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li className="flex items-center gap-2">
              <span>📄</span> <span className="text-gray" style={{ fontSize: '0.9rem' }}>Uploaded Physics Notes</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🤖</span> <span className="text-gray" style={{ fontSize: '0.9rem' }}>Asked AI about Thermodynamics</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅</span> <span className="text-gray" style={{ fontSize: '0.9rem' }}>Completed Math Assignment 2</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Today's Plan</h3>
            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>View Calendar</button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center" style={{ padding: '16px', border: '1px solid var(--color-gray-200)', borderRadius: '8px' }}>
              <div className="flex items-center gap-4">
                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Review Biology Ch 4-5</h4>
                  <p className="text-gray" style={{ fontSize: '0.85rem', margin: 0 }}>10:00 AM - 11:30 AM</p>
                </div>
              </div>
              <span className="chip chip-sand">High Priority</span>
            </div>

            <div className="flex justify-between items-center" style={{ padding: '16px', border: '1px solid var(--color-gray-200)', borderRadius: '8px' }}>
              <div className="flex items-center gap-4">
                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Math Problem Set</h4>
                  <p className="text-gray" style={{ fontSize: '0.85rem', margin: 0 }}>2:00 PM - 3:30 PM</p>
                </div>
              </div>
              <span className="chip chip-blue">Due Tomorrow</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title mb-6">Upcoming Deadlines</h3>
          <div className="flex flex-col gap-4">
            <div style={{ borderLeft: '3px solid var(--color-coral)', paddingLeft: '12px' }}>
              <h4 style={{ margin: 0 }}>History Essay Draft</h4>
              <p className="text-gray" style={{ fontSize: '0.85rem', margin: 0 }}>Tomorrow, 11:59 PM</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--color-blue)', paddingLeft: '12px' }}>
              <h4 style={{ margin: 0 }}>Physics Lab Report</h4>
              <p className="text-gray" style={{ fontSize: '0.85rem', margin: 0 }}>Friday, 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
