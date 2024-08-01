import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '../components/Form';
import Preview from '../components/Preview';
import Buttons from '../components/Buttons';
import { fetchDocumentById, saveDocument } from '../api/documentApi';

const DocumentEditor = () => {
    const { id } = useParams();
    const [document, setDocument] = useState({
        title: '',
        fields: [],
        content: ''
    });

    useEffect(() => {
        if (id) {
            fetchDocumentById(id).then(data => setDocument(data));
        }
    }, [id]);

    const handleFormChange = (updatedFields) => {
        setDocument(prev => ({
            ...prev,
            fields: updatedFields
        }));
    };

    const handleSave = async () => {
        const updatedDocument = await saveDocument(document);
        setDocument(updatedDocument);
        alert('Document saved successfully!');
    };

    return (
        <div>
            <Form fields={document.fields} onChange={handleFormChange} />
            <Preview content={document.content} />
            <Buttons onSave={handleSave} />
        </div>
    );
};

export default DocumentEditor;