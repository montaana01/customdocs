import React from 'react';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
    const [language, setLanguage] = React.useState<'en' | 'ru'>('en');

    const handleLanguageChange = (lang: 'en' | 'ru') => {
        setLanguage(lang);
        // Логика для изменения языка (например, с помощью i18next)
    };

    return (
        <div className="language-switcher">
            <button
                className={`lang-button ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
            >
                EN
            </button>
            <button
                className={`lang-button ${language === 'ru' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ru')}
            >
                RU
            </button>
        </div>
    );
};

export default LanguageSwitcher;
