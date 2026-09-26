import { useState, FormEvent } from 'react';
import { supabase } from './lib/supabase';
import { motion } from 'framer-motion';
import { StudySyncLogo } from './components/StudySyncLogo';
import { illusWelcome, prodCheckCircle, sparkle } from './assets';
import ThemeToggle from './ThemeToggle';
import './auth.css';

interface AuthViewProps {
  onGuestLogin?: () => void;
}

export function AuthView({ onGuestLogin }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError('Supabase is not yet connected. Click "Explore as Demo Student" below to enter immediately.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Confirmation sent. Please check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'System failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    setError(null);
    if (!supabase) {
      setError(`Cannot initialize ${provider} login: Supabase is not connected. Use Demo Student below.`);
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as any,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || `Failed to initialize ${provider} login.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-card auth-art">
        <motion.div
          className="auth-art-inner"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
        >
          {/* Official StudySync Logo */}
          <div style={{ marginBottom: '32px' }}>
            <StudySyncLogo variant="stacked" height={60} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--theme-text-primary, #111827)', marginBottom: '24px', lineHeight: 1.3 }}>
            Join StudySync<br/>
            and start your<br/>
            learning journey today!
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            {['Organize your study materials', 'Plan and track your progress', 'Get AI help anytime', 'Connect and learn together'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--theme-text-secondary, #4A5568)', fontWeight: 500 }}>
                <img src={prodCheckCircle} alt="" style={{ width: '20px', height: '20px' }} />
                {item}
              </li>
            ))}
          </ul>

          {/* Welcome Illustration */}
          <div style={{ width: '100%', maxWidth: '360px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '32px' }}>
            <img 
              src={illusWelcome} 
              alt="Welcome to StudySync" 
              style={{ maxHeight: '230px', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
        </motion.div>
      </div>
      
      <div className="auth-card auth-form-side">
        <div className="form-wrapper">
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <StudySyncLogo variant="compact" height={36} />
            <ThemeToggle />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--theme-text-primary, #111827)', marginBottom: '8px' }}>
            {isLogin ? 'Welcome back!' : 'Create your space.'}
          </h2>
          <p style={{ color: 'var(--theme-text-secondary, #4A5568)', fontSize: '0.95rem', marginBottom: '28px' }}>
            {isLogin ? 'Log in to continue your learning journey.' : 'Sign up to start organizing your studies.'}
          </p>
          
          <form onSubmit={handleSubmit}>
            {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="auth-alert error">{error}</motion.div>}
            {message && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="auth-alert success">{message}</motion.div>}
            
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary, #111827)', marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="auth-input"
              placeholder="name@university.edu"
            />
            
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary, #111827)', marginTop: '20px', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="auth-input"
                placeholder="••••••••"
              />
              {isLogin && (
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Please check your email or use the Demo Student mode.'); }} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: 'var(--theme-text-secondary, #4A5568)', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              )}
            </div>

            {isLogin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                <input type="checkbox" id="remember" defaultChecked style={{ accentColor: '#10B981', width: '16px', height: '16px' }} />
                <label htmlFor="remember" style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary, #4A5568)' }}>Remember me</label>
              </div>
            )}
            
            <motion.button 
              type="submit" 
              style={{ width: '100%', marginTop: '24px', padding: '14px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </motion.button>

            {/* Instant Demo Access Button */}
            {onGuestLogin && (
              <button
                type="button"
                className="demo-access-btn"
                onClick={onGuestLogin}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <img src={sparkle} alt="" style={{ width: '18px', height: '18px' }} />
                Explore as Demo Student (Instant Access)
              </button>
            )}
          </form>

          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--theme-text-secondary, #A0AEC0)', marginBottom: '16px' }}>Or continue with</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              
              {/* Google */}
              <motion.button 
                onClick={() => handleSocialLogin('Google')}
                className="auth-social-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                title="Sign in with Google"
              >
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </motion.button>
              
              {/* Apple (Mac) */}
              <motion.button 
                onClick={() => handleSocialLogin('Apple')}
                className="auth-social-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                title="Sign in with Apple"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 13.57c-.02-2.52 2.06-3.73 2.15-3.8-.13-1.89-1.39-3.26-2.92-3.44-1.24-.14-2.45.69-3.08.69-.64 0-1.63-.68-2.67-.66-1.36.02-2.62.77-3.32 1.95-1.42 2.4-.36 5.96 1.02 7.89.67.93 1.45 1.98 2.48 1.94 1-.04 1.38-.63 2.58-.63 1.2 0 1.55.63 2.6.61 1.06-.02 1.74-.96 2.41-1.88.77-1.1 1.08-2.16 1.1-2.22-.03-.01-2.33-.87-2.35-3.45zM15.11 4.54c.55-.65.92-1.55.82-2.45-.79.03-1.74.52-2.32 1.18-.52.57-.96 1.48-.84 2.36.88.07 1.78-.44 2.34-1.09z"/>
                </svg>
              </motion.button>

              {/* GitHub (Git) */}
              <motion.button 
                onClick={() => handleSocialLogin('GitHub')}
                className="auth-social-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                title="Sign in with GitHub"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </motion.button>
              
            </div>
          </div>

          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--theme-text-secondary, #4A5568)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }} 
              style={{ color: '#10B981', fontWeight: 600, textDecoration: 'none' }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
