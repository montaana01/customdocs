import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import SearchBar from '../components/SearchBar';
import DocumentList from '../components/DocumentList';
import { fetchDocuments } from '../api/documentApi';

const Home = () => {
    const { user } = useContext(UserContext);
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDocuments(searchQuery).then(data => setDocuments(data));
    }, [searchQuery]);

    return (
        <div>
            <SearchBar onSearch={setSearchQuery} />
            <DocumentList documents={documents} />
            {user ? <button onClick={() => window.location.href='/document-editor'}>Create New Document</button> : null}
        </div>
    );
};

export default Home;