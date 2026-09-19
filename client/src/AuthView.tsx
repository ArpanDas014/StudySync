import { useState, FormEvent } from 'react';
import { supabase } from './lib/supabase';
import { motion } from 'framer-motion';

export function AuthView() {
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

    try {
      if (isLogin) {
        const { error } = await supabase!.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase!.auth.signUp({ email, password });
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
    try {
      const { error } = await supabase!.auth.signInWithOAuth({
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
          {/* Dual Color Logo with Glow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--ink)" style={{ filter: 'drop-shadow(0 0 12px rgba(74, 93, 58, 0.4))' }}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M12 2v20"></path>
            </svg>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textShadow: '0 0 24px rgba(74, 93, 58, 0.4), 0 0 12px rgba(210, 180, 140, 0.6)' }}>
              <span style={{ color: 'var(--ink)' }}>Study</span>
              <span style={{ color: 'var(--accent)' }}>Sync</span>
            </h1>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '24px', lineHeight: 1.3 }}>
            Join StudySync<br/>
            and start your<br/>
            learning journey today!
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            {['Organize your study materials', 'Plan and track your progress', 'Get AI help anytime', 'Connect and learn together'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#4A5568', fontWeight: 500 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Custom Animated Studying Woman Illustration (Line Art) */}
          <div style={{ width: '100%', height: '260px', position: 'relative', marginTop: '40px' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="xMidYMax meet">
              
              {/* Floor Shadow */}
              <ellipse cx="200" cy="240" rx="160" ry="12" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="10 6" />
              
              {/* Desk */}
              <line x1="80" y1="210" x2="320" y2="210" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
              <line x1="110" y1="210" x2="100" y2="240" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
              <line x1="290" y1="210" x2="300" y2="240" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
              
              {/* Laptop */}
              <path d="M 130 210 L 190 210 L 180 150 L 140 150 Z" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
              <line x1="120" y1="210" x2="200" y2="210" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
              
              <motion.rect x="145" y="160" width="30" height="25" fill="none" stroke="var(--accent)" strokeWidth="2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} />

              {/* Plant */}
              <path d="M 260 210 L 290 210 L 285 160 L 265 160 Z" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 275 160 Q 240 100 270 70 Q 295 120 275 160" fill="none" stroke="var(--ink)" strokeWidth="2" />
              <path d="M 275 160 Q 310 110 320 80 Q 295 130 275 160" fill="none" stroke="var(--ink)" strokeWidth="2" />
              <path d="M 275 160 L 275 100" fill="none" stroke="var(--ink)" strokeWidth="2" />

              {/* Coffee */}
              <path d="M 230 210 L 250 210 L 250 170 L 230 170 Z" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 250 180 Q 265 180 265 190 Q 265 200 250 200" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
              <motion.path d="M 235 155 Q 240 140 235 125" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
              <motion.path d="M 245 150 Q 250 135 245 120" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} />

              {/* Studying Woman (Line Art Doodle) */}
              <motion.g animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                
                {/* Body */}
                <path d="M 240 230 Q 220 120 180 120 Q 150 120 150 160 Q 155 170 170 165" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 180 120 Q 160 140 160 160" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                
                {/* Head */}
                <circle cx="205" cy="100" r="22" fill="none" stroke="var(--ink)" strokeWidth="3" />
                <path d="M 190 85 Q 210 70 220 85" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
                
                {/* Hair Bun */}
                <circle cx="230" cy="85" r="10" fill="none" stroke="var(--ink)" strokeWidth="3" />
                
                {/* Glasses */}
                <circle cx="195" cy="100" r="6" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="180" cy="100" r="6" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <line x1="186" y1="100" x2="189" y2="100" stroke="var(--accent)" strokeWidth="2" />
                
                {/* Arm Typing */}
                <motion.path 
                  d="M 180 140 Q 160 170 175 200" 
                  fill="none" 
                  stroke="var(--ink)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  animate={{ d: ["M 180 140 Q 160 170 175 200", "M 180 140 Q 150 170 180 195", "M 180 140 Q 160 170 175 200"] }} 
                  transition={{ repeat: Infinity, duration: 0.6 }} 
                />
              </motion.g>
              
              {/* Ideas / Sparkles */}
              <motion.g animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
                <path d="M 270 50 L 270 60 M 265 55 L 275 55" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                <path d="M 140 70 L 140 80 M 135 75 L 145 75" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="120" cy="110" r="4" fill="none" stroke="var(--accent)" strokeWidth="2" />
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </div>
      
      <div className="auth-card auth-form-side">
        <div className="form-wrapper" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--ink)"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M12 2v20"></path></svg>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
              <span style={{ color: 'var(--ink)' }}>Study</span>
              <span style={{ color: 'var(--accent)' }}>Sync</span>
            </h1>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
            {isLogin ? 'Welcome back!' : 'Create your space.'}
          </h2>
          <p style={{ color: '#4A5568', fontSize: '0.95rem', marginBottom: '32px' }}>
            {isLogin ? 'Log in to continue your learning journey.' : 'Sign up to start organizing your studies.'}
          </p>
          
          <form onSubmit={handleSubmit}>
            {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="auth-alert error">{error}</motion.div>}
            {message && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="auth-alert success">{message}</motion.div>}
            
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="soft-input auth-input"
            />
            
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginTop: '20px', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="soft-input auth-input"
              />
              {isLogin && (
                <a href="#" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#4A5568', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              )}
            </div>

            {isLogin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                <input type="checkbox" id="remember" style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }} />
                <label htmlFor="remember" style={{ fontSize: '0.85rem', color: '#4A5568' }}>Remember me</label>
              </div>
            )}
            
            <motion.button 
              type="submit" 
              style={{ width: '100%', marginTop: '24px', padding: '14px', background: '#F5A623', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </motion.button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#A0AEC0', marginBottom: '16px' }}>Or continue with</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              
              {/* Google */}
              <motion.button 
                onClick={() => handleSocialLogin('Google')}
                style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                whileHover={{ scale: 1.05, background: '#F7F8F5' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </motion.button>
              
              {/* Apple (Mac) */}
              <motion.button 
                onClick={() => handleSocialLogin('Apple')}
                style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                whileHover={{ scale: 1.05, background: '#F7F8F5' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                  <path d="M17.05 13.57c-.02-2.52 2.06-3.73 2.15-3.8-.13-1.89-1.39-3.26-2.92-3.44-1.24-.14-2.45.69-3.08.69-.64 0-1.63-.68-2.67-.66-1.36.02-2.62.77-3.32 1.95-1.42 2.4-.36 5.96 1.02 7.89.67.93 1.45 1.98 2.48 1.94 1-.04 1.38-.63 2.58-.63 1.2 0 1.55.63 2.6.61 1.06-.02 1.74-.96 2.41-1.88.77-1.1 1.08-2.16 1.1-2.22-.03-.01-2.33-.87-2.35-3.45zM15.11 4.54c.55-.65.92-1.55.82-2.45-.79.03-1.74.52-2.32 1.18-.52.57-.96 1.48-.84 2.36.88.07 1.78-.44 2.34-1.09z"/>
                </svg>
              </motion.button>

              {/* GitHub (Git) */}
              <motion.button 
                onClick={() => handleSocialLogin('GitHub')}
                style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                whileHover={{ scale: 1.05, background: '#F7F8F5' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </motion.button>
              
            </div>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: '#4A5568' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }} 
              style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
