import httpRequest from '~/utils/httpRequest';

export const getServicePagination = async (page = 1, limit = 4) => {
    try {
        const response = await httpRequest.get(`/services?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getServices = async () => {
    try {
        const response = await httpRequest.get(`/services`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getServiceAll = async () => {
    try {
        const response = await httpRequest.get('/services');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getServiceById = async (id) => {
    try {
        const response = await httpRequest.get(`/services/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching service detail with id ${id}`, error);
        throw error;
    }
};

export const getServiceByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/services?categoryId=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching service for id=${categoryId}:`, error);
        throw error;
    }
};

export const createService = async (serviceData) => {
    try {
        const response = await httpRequest.post('/services', serviceData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding service', error);
        throw error;
    }
};

export const updateService = async (id, serviceData) => {
    try {
        const response = await httpRequest.patch(`/services/${id}`, serviceData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating service with id ${id}`, error);
        throw error;
    }
};

export const deleteService = async (id) => {
    try {
        await httpRequest.delete(`/services/${id}`);
    } catch (error) {
        console.error(`Error deleting service with id ${id}`, error);
        throw error;
    }
};
