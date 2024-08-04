import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// Определение типа ресурсов
const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
};

// Настройка инициализации i18next
const i18nOptions: InitOptions = {
    resources,
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en', // резервный язык
    interpolation: {
        escapeValue: false, // Не требуется для React
    },
    react: {
        useSuspense: false, // Отключение Suspense для асинхронных переводов
    },
};

i18n
    .use(initReactI18next)
    .init(i18nOptions);

export default i18n;
