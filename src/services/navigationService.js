import httpRequest from '~/utils/httpRequest';

// Navigation Links
export const getNavigationLinks = async () => {
    try {
        const response = await httpRequest.get('/parent-navs/all-with-child');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

// Navigation Links
export const getMainNavigation = async () => {
    try {
        const response = await httpRequest.get('/parent-navs');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

// Navigation Links
export const getSubNavigation = async () => {
    try {
        const response = await httpRequest.get('/child-navs');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

// Navigation Links
export const getChildNavigation = async () => {
    try {
        const response = await httpRequest.get('/child-navs-two');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

export const getNavigationById = async (id) => {
    try {
        const response = await httpRequest.get(`/child-navs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation link:', error);
        throw error;
    }
};

export const getMainNavigationById = async (id) => {
    try {
        const response = await httpRequest.get(`/parent-navs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation link:', error);
        throw error;
    }
};

export const getSubNavigationById = async (id) => {
    try {
        const response = await httpRequest.get(`/child-navs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation link:', error);
        throw error;
    }
};

export const getChildNavigationById = async (id) => {
    try {
        const response = await httpRequest.get(`/child-navs-two/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation link:', error);
        throw error;
    }
};

export const createMainNavigationLink = async (data) => {
    try {
        const response = await httpRequest.post('/parent-navs', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating navigation link:', error);
        throw error;
    }
};

export const createSubNavigationLink = async (data) => {
    try {
        const response = await httpRequest.post('/child-navs', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating navigation link:', error);
        throw error;
    }
};

export const createChildNavigationLink = async (data) => {
    try {
        const response = await httpRequest.post('/child-navs-two', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating navigation link:', error);
        throw error;
    }
};

export const updateMainNavigationLink = async (id, data) => {
    try {
        const response = await httpRequest.patch(`/parent-navs/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating navigation link:', error);
        throw error;
    }
};

export const updateSubNavigationLink = async (id, data) => {
    try {
        const response = await httpRequest.patch(`/child-navs/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating navigation link:', error);
        throw error;
    }
};

export const updateChildNavigationLink = async (id, data) => {
    try {
        const response = await httpRequest.patch(`/child-navs-two/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating navigation link:', error);
        throw error;
    }
};

export const deleteMainNavigationLink = async (type, id) => {
    const data = { type, id };
    console.log(data);
    try {
        await httpRequest.delete(`/parent-navs/${id}`, { data });
    } catch (error) {
        console.error('Error deleting navigation link:', error);
        throw error;
    }
};

export const deleteSubNavigationLink = async (type, id) => {
    const data = { type, id };
    console.log(data);
    try {
        await httpRequest.delete(`/child-navs/${id}`, { data });
    } catch (error) {
        console.error('Error deleting navigation link:', error);
        throw error;
    }
};

export const deleteChildNavigationLink = async (type, id) => {
    const data = { type, id };
    console.log(data);
    try {
        await httpRequest.delete(`/child-navs-two/${id}`, { data });
    } catch (error) {
        console.error('Error deleting navigation link:', error);
        throw error;
    }
};
