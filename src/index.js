import React from 'react';
import ReactDOM from 'react-dom/client'; // Wichtig: React 18 nutzt 'react-dom/client'
import './index.css';
import './vocabulary_card.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);