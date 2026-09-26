import React from 'react';
import { StudySyncLogo } from '../components/StudySyncLogo';
import { 
  bannerWebsiteHero, 
  illusPlanning, 
  illusQuizzes, 
  illusStudyGroup,
  sparkle 
} from '../assets';
import '../landing.css';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin?: () => void;
}

export default function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="landing-content">
      <header className="landing-header">
        <div className="landing-logo">
          <StudySyncLogo variant="compact" height={36} />
        </div>
        <div className="landing-nav-actions">
          {onLogin && (
            <button className="landing-btn-login" onClick={onLogin}>
              Log in
            </button>
          )}
          <button className="landing-btn-start" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </header>

      <main className="landing-hero">
        <span className="landing-chip">
          <img src={sparkle} alt="" style={{ width: '16px', height: '16px' }} /> StudySync Learning Workspace
        </span>
        <h1 className="landing-title">
          Your all-in-one study companion
        </h1>
        <p className="landing-subtext">
          Turn chaotic study time into a clear, actionable plan. Organize notes, track deadlines, join group study sessions, and practice with intelligent quizzes.
        </p>
        
        <div className="landing-cta-group">
          <button 
            className="landing-primary-cta" 
            onClick={onGetStarted}
          >
            Start Studying (Demo Access)
          </button>
          {onLogin && (
            <button 
              className="landing-secondary-cta" 
              onClick={onLogin}
            >
              Sign In with Account
            </button>
          )}
        </div>

        {/* Hero Banner Preview */}
        <div className="landing-hero-banner-wrap">
          <img 
            src={bannerWebsiteHero} 
            alt="StudySync Platform Showcase" 
            className="landing-hero-banner-img"
          />
        </div>

        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-img-box">
              <img src={illusPlanning} alt="Smart Planning" />
            </div>
            <h3>Smart Planning</h3>
            <p>Automatically balance your week and protect your rest days while meeting project deadlines.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-img-box">
              <img src={illusQuizzes} alt="Interactive Practice" />
            </div>
            <h3>Interactive Practice</h3>
            <p>Quiz yourself with flashcards, domain mock exams, and instant performance breakdowns.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-img-box">
              <img src={illusStudyGroup} alt="Study Groups & Live" />
            </div>
            <h3>Study Groups & Live</h3>
            <p>Connect with classmates, join collaborative audio/video rooms, and share curated notes.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
