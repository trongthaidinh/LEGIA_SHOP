import httpRequest from '~/utils/httpRequest';

export const getConfiguration = async () => {
    try {
        const response = await httpRequest.get('/configuration');
        return response.data.data[0];
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const getConfigurationMobile = async () => {
    try {
        const response = await httpRequest.get('/configuration');
        return response.data.data[0];
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const updateConfiguration = async (data, id) => {
    try {
        const response = await httpRequest.post(`/configuration/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating configuration', error);
        throw error;
    }
};
