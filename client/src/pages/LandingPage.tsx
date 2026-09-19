import React from 'react';

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="landing-content">
      <header className="landing-header">
        <div className="landing-logo">📘 StudySync</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-secondary">Log in</button>
          <button className="btn btn-primary" onClick={onGetStarted}>Get Started</button>
        </div>
      </header>

      <main className="landing-hero">
        <span className="chip chip-blue" style={{ marginBottom: '24px' }}>New: AI Assistant v2.0</span>
        <h1>Your all-in-one study companion</h1>
        <p>Turn chaotic study time into a clear, actionable plan. Organize notes, track deadlines, and get AI-powered help when you're stuck.</p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px' }}>
          <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }} onClick={onGetStarted}>Start Studying Free</button>
          <button className="btn btn-secondary" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>See How It Works</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="card" style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📅</div>
            <h3>Smart Planning</h3>
            <p className="text-gray">Automatically generate study schedules based on your syllabus and deadlines.</p>
          </div>
          <div className="card" style={{ flex: '1 1 300px', textAlign: 'left', backgroundColor: 'var(--color-sand)', border: 'none' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🤖</div>
            <h3>AI Explanation</h3>
            <p className="text-gray">Stuck on a concept? The AI assistant breaks it down simply.</p>
          </div>
          <div className="card" style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📚</div>
            <h3>Resource Library</h3>
            <p className="text-gray">Keep all your PDFs, notes, and links organized in one searchable space.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
