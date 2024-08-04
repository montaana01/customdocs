// src/hooks/useTheme.ts
import { useEffect, useState } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(
        () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );

    useEffect(() => {
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
        return () => {
            document.body.classList.remove(theme);
        };
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};

export default useTheme;
