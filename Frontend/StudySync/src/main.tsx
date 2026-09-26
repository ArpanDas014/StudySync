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
  console.error('StudySync window error:', e.error || e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('StudySync unhandled rejection:', e.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
