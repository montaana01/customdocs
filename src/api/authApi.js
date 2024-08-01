import axios from 'axios';

//const API_URL = 'https://customdocs.yakovlevdev.com/api';
const API_URL = 'http://localhost/customdocs/api';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login.php`, { email, password });
    return response.data;
};

export const registerUser = async (data) => {
    const response = await fetch('http://localhost/customdocs/api/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};
export const checkUser = async () => {
    const response = await axios.get(`${API_URL}/check-auth.php`);
    return response.data;
};