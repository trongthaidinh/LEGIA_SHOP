import httpRequest from '~/utils/httpRequest';

export const getRecruitmentPagination = async (page = 1, limit = 4) => {
    try {
        const response = await httpRequest.get(`/recruitment?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching recruitment', error);
        throw error;
    }
};

export const getRecruitment = async () => {
    try {
        const response = await httpRequest.get(`/recruitment`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching recruitment', error);
        throw error;
    }
};

export const getRecruitmentAll = async () => {
    try {
        const response = await httpRequest.get('/recruitment');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching recruitment', error);
        throw error;
    }
};

export const getRecruitmentById = async (id) => {
    try {
        const response = await httpRequest.get(`/recruitment/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching recruitment detail with id ${id}`, error);
        throw error;
    }
};

export const getRecruitmentByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/recruitment?categoryId=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching recruitment for id=${categoryId}:`, error);
        throw error;
    }
};

export const createRecruitment = async (recruitmentData) => {
    try {
        const response = await httpRequest.post('/recruitment', recruitmentData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding recruitment', error);
        throw error;
    }
};

export const updateRecruitment = async (id, recruitmentData) => {
    try {
        const response = await httpRequest.patch(`/recruitment/${id}`, recruitmentData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating recruitment with id ${id}`, error);
        throw error;
    }
};

export const deleteRecruitment = async (id) => {
    try {
        await httpRequest.delete(`/recruitment/${id}`);
    } catch (error) {
        console.error(`Error deleting recruitment with id ${id}`, error);
        throw error;
    }
};
