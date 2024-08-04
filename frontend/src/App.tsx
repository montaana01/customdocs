// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DocumentList from './components/DocumentList';
import DocumentForm from './components/DocumentForm';
import DocumentPreview from './pages/DocumentPreview';
import Header from './components/Header';
import Profile from "./pages/Profile";
import { ThemeProvider } from './context/ThemeContext'; // Импортируйте ThemeProvider

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<DocumentList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/documents/new" element={<DocumentForm />} />
                        <Route path="/documents/:id/edit" element={<DocumentForm />} />
                        <Route path="/documents/:id" element={<DocumentPreview />} />
                        <Route path="/profile" element={<Profile />} /> {/* Новый маршрут для профиля */}
                    </Routes>
                </main>
        </ThemeProvider>
    );
};

export default App;

