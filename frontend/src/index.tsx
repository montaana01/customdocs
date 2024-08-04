// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import './styles.css';
import App from './App';
import './i18n'; // Импорт конфигурации i18next


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

    <React.StrictMode>
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
