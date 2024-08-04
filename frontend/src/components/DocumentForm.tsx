// src/components/DocumentForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DocumentForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/documents/${id}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setContent(data.content);
                })
                .catch(error => console.error('Error fetching document:', error));
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:8000/api/documents/${id}` : 'http://localhost:8000/api/documents';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
            .then(response => response.json())
            .then(() => {
                navigate('/');
            })
            .catch(error => console.error('Error saving document:', error));
    };

    return (
        <div>
            <h1>{id ? 'Edit Document' : 'New Document'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default DocumentForm;
