import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import Notification from '../components/Notification';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setNotification('Вы успешно зарегистрировались!');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {notification && <Notification message={notification} />}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;