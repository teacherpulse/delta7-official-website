import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('--- STARTUP DIAGNOSTIC: index.tsx executed ---');
const diagnosticFetch = (msg: string, data: any = {}) => {
  console.log(`[Diagnostic] ${msg}`, data);
  fetch('http://127.0.0.1:7243/ingest/3747187a-d8aa-46a4-806e-deb4927df6d2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'index.tsx',
      message: msg,
      data: data,
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'D'
    })
  }).catch(err => console.error('[Diagnostic Fetch Failed]', err));
};

diagnosticFetch('App starting');

const rootElement = document.getElementById('root');
if (!rootElement) {
  diagnosticFetch('CRITICAL ERROR: Root element not found');
  throw new Error("Could not find root element to mount to");
}

diagnosticFetch('Root element found, mounting React');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
