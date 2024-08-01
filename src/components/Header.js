import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
        window.location.href = '/';
    };

    return (
        <header>
            <Link to="/">Logo</Link>
            {user ? (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </header>
    );
};

export default Header;