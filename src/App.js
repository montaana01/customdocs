// src/App.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const [searchResults, setSearchResults] = useState([]);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div>
            <header>
                <h1>Custom DOCS</h1>
                <SearchBar setSearchResults={setSearchResults} />
                <nav>
                    {user ? (
                        <>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Log In</Link>
                            <Link to="/register">Sign Up</Link>
                        </>
                    )}
                </nav>
            </header>
            <main>
                {children}
                <div>
                    {Array.isArray(searchResults) && searchResults.map(doc => (
                        <div key={doc.id}>
                            <h3>{doc.title}</h3>
                            <p>{doc.content}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;