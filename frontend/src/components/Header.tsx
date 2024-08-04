// src/components/Header.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme'; // Импорт хука
import './Header.css';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme(); // Использование хука
    const [language, setLanguage] = useState<'en' | 'ru'>('en');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const changeLanguage = (lang: 'en' | 'ru') => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
    };

    const handleMenuToggle = () => {
        setMenuOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className={`header ${theme}`}>
            <div className="header-content">
                <div onClick={() => navigate('/')} className="logo">{t('logo')}</div>
                <input
                    type="text"
                    className="search-input"
                    placeholder={t('searchPlaceholder')}
                />
                <div className="header-right">
                    <div className="language-switcher">
                        <button
                            className={`lang-button ${theme} ${language === 'en' ? 'active' : ''}`}
                            onClick={() => changeLanguage('en')}
                        >
                            {t('languageSwitcher.english')}
                        </button>
                        <button
                            className={`lang-button ${theme} ${language === 'ru' ? 'active' : ''}`}
                            onClick={() => changeLanguage('ru')}
                        >
                            {t('languageSwitcher.russian')}
                        </button>
                    </div>
                    <div className="theme-switcher">
                        <button className="theme-button" onClick={toggleTheme}>
                            {theme === 'light' ? '🌞' : '🌜'}
                        </button>
                    </div>
                    <div className="user-icon" onClick={handleMenuToggle}>
                        👤
                    </div>
                    {menuOpen && (
                        <div className="user-menu">
                            {!isAuthenticated ? (
                                <>
                                    <button className={`${theme}`} onClick={() => navigate('/login')}>{t('login')}</button>
                                    <button className={`${theme}`} onClick={() => navigate('/register')}>{t('register')}</button>
                                </>
                            ) : (
                                <>
                                    <button className={`${theme}`} onClick={() => navigate('/profile')}>{t('profile')}</button>
                                    <button className={`${theme}`} onClick={handleLogout}>{t('logout')}</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
