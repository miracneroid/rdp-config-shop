
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable more robust error handling for the entire app
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Handle unhandled Promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise rejection:', event.reason);
});

createRoot(document.getElementById("root")!).render(<App />);
