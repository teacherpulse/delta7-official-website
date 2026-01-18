import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Emergency UI and Remote Diagnostic Logging
const logRemoteError = (message: string, data: any = {}) => {
  fetch('http://127.0.0.1:7243/ingest/3747187a-d8aa-46a4-806e-deb4927df6d2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'index.tsx',
      message: message,
      data: data,
      timestamp: Date.now(),
      sessionId: 'live-prod-session',
      hypothesisId: 'LiveCrash'
    })
  }).catch(() => {});
};

const showEmergencyError = (error: string) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="background: #0f172a; color: #f1f5f9; padding: 40px; font-family: sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center;">
        <div style="max-width: 600px; border: 1px solid #ef4444; padding: 30px; border-radius: 20px; background: rgba(239, 68, 68, 0.1);">
          <h1 style="color: #ef4444; margin-bottom: 20px;">System Initialization Failure</h1>
          <p style="margin-bottom: 20px; color: #94a3b8;">The Delta7 Educational Architecture encountered a fatal error during startup.</p>
          <div style="background: #000; padding: 15px; border-radius: 8px; text-align: left; overflow: auto; font-size: 12px; border: 1px solid #334155; font-family: monospace;">${error}</div>
          <p style="margin-top: 20px; font-size: 14px;">Please check the browser console (F12) for a full stack trace.</p>
        </div>
      </div>
    `;
  }
};

window.onerror = (message, source, lineno, colno, error) => {
  const errorMsg = `${message}\nAt: ${source}:${lineno}:${colno}`;
  logRemoteError('Live Runtime Crash', { message, source, lineno, colno, error: error?.stack });
  showEmergencyError(errorMsg);
  return false;
};

console.log('Delta7 Application Initializing...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  const msg = 'CRITICAL: Root element #root not found in the DOM.';
  console.error(msg);
  logRemoteError(msg);
  showEmergencyError(msg);
  throw new Error(msg);
}

try {
  console.log('Root element found. Mounting React App...');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React App mounted successfully.');
} catch (err: any) {
  console.error('Mounting Error:', err);
  logRemoteError('Mounting Error', { error: err.message, stack: err.stack });
  showEmergencyError(err.message || 'Unknown Mounting Error');
}
