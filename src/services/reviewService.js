import httpRequest from '~/utils/httpRequest';

// Fetch all reviews
export const getReviews = async () => {
    try {
        const response = await httpRequest.get('/review');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching reviews', error);
        throw error;
    }
};

export const getZhReviews = async () => {
    try {
        const response = await httpRequest.get('/zh-review');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching reviews', error);
        throw error;
    }
};

// Fetch a single review by id
export const getReviewById = async (id) => {
    try {
        const response = await httpRequest.get(`/review/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching review', error);
        throw error;
    }
};

export const getZhReviewById = async (id) => {
    try {
        const response = await httpRequest.get(`/zh-review/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching review', error);
        throw error;
    }
};

// Create a new review
export const createReview = async (data) => {
    try {
        const response = await httpRequest.post('/review', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating review', error);
        throw error;
    }
};

export const createZhReview = async (data) => {
    try {
        const response = await httpRequest.post('/zh-review', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating review', error);
        throw error;
    }
};

// Update an existing review
export const updateReview = async (id, data) => {
    try {
        const response = await httpRequest.post(`/review/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating review', error);
        throw error;
    }
};

export const updateZhReview = async (id, data) => {
    try {
        const response = await httpRequest.post(`/zh-review/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating review', error);
        throw error;
    }
};

// Delete a review
export const deleteReview = async (id) => {
    try {
        const response = await httpRequest.delete(`/review/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting review', error);
        throw error;
    }
};

export const deleteZhReview = async (id) => {
    try {
        const response = await httpRequest.delete(`/zh-review/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting review', error);
        throw error;
    }
};
