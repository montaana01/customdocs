import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="theme-switcher">
            <button className={`switch-button ${theme}`} onClick={toggleTheme}>
                <FaSun className="icon" />
                <FaMoon className="icon" />
                <div className="slider"></div>
            </button>
        </div>
    );
};

export default ThemeSwitcher;
