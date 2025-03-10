import axios from 'axios';
const API_URL = 'http://localhost:3001/auth';
export const login = async (username, password, rememberMe) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token } = response.data;
        if (rememberMe) {
            localStorage.setItem('token', token); // Persistent storage
        }
        else {
            sessionStorage.setItem('token', token); // Session storage
        }
        return token;
    }
    catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
export const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};
export const getToken = () => {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
};
