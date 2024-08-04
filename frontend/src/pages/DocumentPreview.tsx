// src/pages/DocumentPreview.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const DocumentPreview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [document, setDocument] = useState<any>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/documents/${id}`)
            .then(response => response.json())
            .then(data => setDocument(data))
            .catch(error => console.error('Error fetching document:', error));
    }, [id]);

    if (!document) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{document.title}</h1>
            <div>{document.content}</div>
        </div>
    );
};

export default DocumentPreview;
