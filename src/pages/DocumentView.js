import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDocumentById } from '../api/documentApi';

const DocumentView = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);

    useEffect(() => {
        if (id) {
            fetchDocumentById(id).then(data => setDocument(data));
        }
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

export default DocumentView;