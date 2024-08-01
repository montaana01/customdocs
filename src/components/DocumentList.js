// src/components/DocumentList.js
import React from 'react';

const DocumentList = ({ documents }) => {
    if (!Array.isArray(documents)) {
        return <div>No documents found.</div>;
    }

    return (
        <div>
            {documents.map((doc) => (
                <div key={doc.id}>
                    <h3>{doc.title}</h3>
                    <p>{doc.content}</p>
                </div>
            ))}
        </div>
    );
};

export default DocumentList;