import httpRequest from '~/utils/httpRequest';

// Fetch all comments for a product by productId
export const getCommentsByProductId = async (productId) => {
    try {
        const response = await httpRequest.get(`/comments/${productId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching comments', error);
        throw error;
    }
};

export const getZhCommentsByProductId = async (productId) => {
    try {
        const response = await httpRequest.get(`/zh-comments/${productId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching comments', error);
        throw error;
    }
};

// Create a new comment for a product
export const createComment = async (data) => {
    try {
        const response = await httpRequest.post('/comments', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating comment', error);
        throw error;
    }
};

export const createZhComment = async (data) => {
    try {
        const response = await httpRequest.post('/zh-comments', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating comment', error);
        throw error;
    }
};

// Update an existing comment
export const updateComment = async (data, commentId, productId) => {
    try {
        const response = await httpRequest.post(`/comments/${commentId}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating comment', error);
        throw error;
    }
};

export const updateZhComment = async (data, commentId, productId) => {
    try {
        const response = await httpRequest.post(`/zh-comments/${commentId}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating comment', error);
        throw error;
    }
};

// Delete a comment
export const deleteComment = async (commentId, productId) => {
    try {
        const response = await httpRequest.delete(`/comments/${commentId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting comment', error);
        throw error;
    }
};

export const deleteZhComment = async (commentId, productId) => {
    try {
        const response = await httpRequest.delete(`/zh-comments/${commentId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting comment', error);
        throw error;
    }
};
