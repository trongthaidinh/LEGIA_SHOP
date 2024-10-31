import httpRequest from '~/utils/httpRequest';

export const getPageContent = async () => {
    try {
        const response = await httpRequest.get(`/pages`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching page content:', error);
        throw error;
    }
};

export const getZhPageContent = async () => {
    try {
        const response = await httpRequest.get(`/zh-pages`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching page content:', error);
        throw error;
    }
};

export const addPageContent = async (data) => {
    try {
        const response = await httpRequest.post(`/pages`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error adding page content:', error);
        throw error;
    }
};

export const addZhPageContent = async (data) => {
    try {
        const response = await httpRequest.post(`/zh-pages`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error adding page content:', error);
        throw error;
    }
};

export const updatePageContent = async (slug, data) => {
    try {
        const response = await httpRequest.patch(`/pages/${slug}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating page content by slug:', error);
        throw error;
    }
};

export const updateZhPageContent = async (slug, data) => {
    try {
        const response = await httpRequest.patch(`/zh-pages/${slug}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating page content by slug:', error);
        throw error;
    }
};

export const getPageBySlug = async (slug) => {
    try {
        const response = await httpRequest.get(`/pages/slug/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error('Error updating page content:', error);
        throw error;
    }
};

export const getZhPageBySlug = async (slug) => {
    try {
        const encodedSlug = encodeURIComponent(slug);
        const response = await httpRequest.get(`zh-pages/slug/${encodedSlug}`);
        return response.data.data;
    } catch (error) {
        console.error('Error updating page content:', error);
        throw error;
    }
};

export const deletePageContent = async (slug) => {
    try {
        const response = await httpRequest.delete(`/pages/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting page content:', error);
        throw error;
    }
};

export const deleteZhPageContent = async (slug) => {
    try {
        const response = await httpRequest.delete(`/zh-pages/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting page content:', error);
        throw error;
    }
};
