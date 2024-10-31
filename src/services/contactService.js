import httpRequest from '~/utils/httpRequest';

export const getMessages = async (limit = '') => {
    try {
        const response = await httpRequest.get(`/contact?limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const getZhMessages = async (limit = '') => {
    try {
        const response = await httpRequest.get(`/zh-contact?limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const createMessage = async (data) => {
    const name = data.fullName;
    const email = data.email;
    const phone = data.phoneNumber;
    const content = data.message;
    try {
        const response = await httpRequest.post('/contact', { name, email, phone, content });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const createZhMessage = async (data) => {
    const name = data.fullName;
    const email = data.email;
    const phone = data.phoneNumber;
    const content = data.message;
    try {
        const response = await httpRequest.post('/zh-contact', { name, email, phone, content });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const deleteMessage = async (id) => {
    try {
        const response = await httpRequest.delete(`/contact/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const deleteZhMessage = async (id) => {
    try {
        const response = await httpRequest.delete(`/zh-contact/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};
