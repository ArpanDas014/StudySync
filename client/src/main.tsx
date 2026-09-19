import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './study-sync.css';
import './planner.css';
import './quiz.css';
import './groups.css';
import './profile.css';

window.addEventListener('error', (e) => {
      document.body.innerHTML = '<div style="color: red; padding: 20px; z-index: 9999; position: absolute; background: white;"><h1>Error</h1><pre>' + e.error?.stack + '</pre></div>';
    });
    window.addEventListener('unhandledrejection', (e) => {
      document.body.innerHTML = '<div style="color: red; padding: 20px; z-index: 9999; position: absolute; background: white;"><h1>Unhandled Promise</h1><pre>' + e.reason?.stack + '</pre></div>';
    });
    createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
