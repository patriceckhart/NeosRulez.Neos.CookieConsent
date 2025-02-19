import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import reportWebVitals from './reportWebVitals';

const domElement = document.getElementById('cookieConsent') as HTMLElement;
const root = ReactDOM.createRoot(
  domElement
);

root.render(
  <React.StrictMode>
    <App delay={domElement.dataset.delay} positionX={domElement.dataset.positionX} positionY={domElement.dataset.positionY} json={domElement.dataset.json} />
  </React.StrictMode>
);

reportWebVitals();
