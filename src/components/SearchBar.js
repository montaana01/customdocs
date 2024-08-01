import React, { useState } from 'react';
import { fetchDocuments } from '../api/documentApi';

const SearchBar = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const results = await fetchDocuments(query);
            setSearchResults(results);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;