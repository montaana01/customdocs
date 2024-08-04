import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Добавьте другие поля, которые хотите отображать */}
        </div>
    );
};

export default Profile;
