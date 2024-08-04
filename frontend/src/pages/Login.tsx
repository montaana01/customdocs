// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {useTranslation} from "react-i18next";

const Login: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setMessage('Login successful! Redirecting...');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000); // Redirect after 2 seconds
                } else {
                    setMessage('Login failed');
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                setMessage('Login failed due to an error');
            });
    };

    return (
        <div className={`container ${theme}`}>
            <h1>{t('login')}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
