import axios from 'axios';

const API_URL = 'http://localhost/customdocs/api';
//const API_URL = 'http://customdocs.yakovlevdev.com/api';

export const fetchDocuments = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/documents.php`, { params: { search: query } });
        return response.data;
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
};

export const saveDocument = async (document) => {
    try {
        const response = await axios.post(`${API_URL}/documents.php`, document);
        return response.data;
    } catch (error) {
        console.error('Error saving document:', error);
        throw error;
    }
};

export const fetchDocumentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/document.php`, { params: { id } });
        return response.data;
    } catch (error) {
        console.error('Error fetching document by ID:', error);
        throw error;
    }
};