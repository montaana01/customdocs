// src/components/DocumentList.tsx
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {useTranslation} from "react-i18next";

const DocumentList: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        fetch('http://localhost:8000/api/documents')
            .then(response => response.json())
            .then(data => setDocuments(data))
            .catch(error => console.error('Error fetching documents:', error));
    }, []);

    return (
        <div className={`container ${theme}`}>
            <h1>{t('docs')}</h1>
            <ul>
                {documents.map((document: any) => (
                    <li key={document.id}>
                        <Link to={`/documents/${document.id}`}>{document.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;
