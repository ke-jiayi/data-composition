import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialize theme before render to prevent flash
const storedTheme = localStorage.getItem('theme') || 'dark';
if (storedTheme === 'light') {
  document.documentElement.classList.add('light');
  document.documentElement.classList.remove('dark');
} else {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
