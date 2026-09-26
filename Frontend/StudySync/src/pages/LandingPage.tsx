import React from 'react';
import { StudySyncLogo } from '../components/StudySyncLogo';
import { 
  bannerWebsiteHero, 
  illusPlanning, 
  illusQuizzes, 
  illusStudyGroup,
  sparkle 
} from '../assets';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin?: () => void;
}

export default function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="landing-content" style={{ minHeight: '100vh', background: 'var(--canvas, #f7f8fc)', padding: '24px' }}>
      <header className="landing-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', margin: '0 auto 40px', padding: '12px 0' }}>
        <div className="landing-logo">
          <StudySyncLogo variant="compact" height={36} />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {onLogin && (
            <button className="btn secondary-button" onClick={onLogin} style={{ padding: '8px 18px', borderRadius: '8px', cursor: 'pointer' }}>
              Log in
            </button>
          )}
          <button className="btn button" onClick={onGetStarted} style={{ padding: '8px 20px', borderRadius: '8px', background: '#10B981', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            Get Started
          </button>
        </div>
      </header>

      <main className="landing-hero" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <span className="chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#E6F4EA', color: '#137333', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
          <img src={sparkle} alt="" style={{ width: '16px', height: '16px' }} /> StudySync Learning Workspace
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--ink, #172033)', margin: '0 0 16px', letterSpacing: '-0.03em' }}>
          Your all-in-one study companion
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#5F6368', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          Turn chaotic study time into a clear, actionable plan. Organize notes, track deadlines, join group study sessions, and practice with intelligent quizzes.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
          <button 
            style={{ padding: '14px 36px', fontSize: '1.1rem', background: '#10B981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }} 
            onClick={onGetStarted}
          >
            Start Studying (Demo Access)
          </button>
          {onLogin && (
            <button 
              style={{ padding: '14px 28px', fontSize: '1.1rem', background: '#fff', color: '#172033', border: '1px solid #D1D5DB', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}
              onClick={onLogin}
            >
              Sign In with Account
            </button>
          )}
        </div>

        {/* Hero Banner Preview */}
        <div style={{ maxWidth: '880px', margin: '0 auto 64px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
          <img 
            src={bannerWebsiteHero} 
            alt="StudySync Platform Showcase" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1 1 280px', maxWidth: '320px', textAlign: 'left', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: 'var(--surface-muted, #f9fafb)', borderRadius: '12px', padding: '12px' }}>
              <img src={illusPlanning} alt="Smart Planning" style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>Smart Planning</h3>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Automatically balance your week and protect your rest days while meeting project deadlines.</p>
          </div>
          <div className="card" style={{ flex: '1 1 280px', maxWidth: '320px', textAlign: 'left', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: 'var(--surface-muted, #f9fafb)', borderRadius: '12px', padding: '12px' }}>
              <img src={illusQuizzes} alt="Interactive Practice" style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>Interactive Practice</h3>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Quiz yourself with flashcards, domain mock exams, and instant performance breakdowns.</p>
          </div>
          <div className="card" style={{ flex: '1 1 280px', maxWidth: '320px', textAlign: 'left', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: 'var(--surface-muted, #f9fafb)', borderRadius: '12px', padding: '12px' }}>
              <img src={illusStudyGroup} alt="Study Groups & Live" style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>Study Groups & Live</h3>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Connect with classmates, join collaborative audio/video rooms, and share curated notes.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
