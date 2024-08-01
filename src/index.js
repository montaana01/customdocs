// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DocumentView from './pages/DocumentView';
import DocumentEditor from './pages/DocumentEditor';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <UserProvider>
        <BrowserRouter>
            <App>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/document/:id" element={<DocumentView />} />
                    <Route path="/document-editor/:id?" element={
                        <ProtectedRoute>
                            <DocumentEditor />
                        </ProtectedRoute>
                    } />
                </Routes>
            </App>
        </BrowserRouter>
    </UserProvider>
);