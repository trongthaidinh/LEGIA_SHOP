import httpRequest from '~/utils/httpRequest';

const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

// Fetch all comments for a product by productId
export const getCommentsByProductId = async (productId) => {
    const sessionKey = `comments_${productId}`;

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get(`/comments/${productId}`);
        const commentData = response.data.data;

        saveToSessionStorage(sessionKey, commentData);

        return commentData;
    } catch (error) {
        console.error('Error fetching comments', error);
        throw error;
    }
};

// Create a new comment for a product
export const createComment = async (data) => {
    try {
        const response = await httpRequest.post('/comments', data);

        const commentData = response.data.data;

        // Clear cached comments for the product after creation
        sessionStorage.removeItem(`comments_${commentData.product_id}`);

        const updatedComments = await getCommentsByProductId(commentData.product_id);
        saveToSessionStorage(`comments_${commentData.product_id}`, updatedComments);

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

        // Clear cached comments and specific comment after update
        sessionStorage.removeItem(`comments_${productId}`);
        sessionStorage.removeItem(`comment_${commentId}`);

        const updatedComments = await getCommentsByProductId(productId);
        saveToSessionStorage(`comments_${productId}`, updatedComments);

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

        // Clear cached comments and specific comment after deletion
        sessionStorage.removeItem(`comments_${productId}`);
        sessionStorage.removeItem(`comment_${commentId}`);

        const updatedComments = await getCommentsByProductId(productId);
        saveToSessionStorage(`comments_${productId}`, updatedComments);

        return response.data.data;
    } catch (error) {
        console.error('Error deleting comment', error);
        throw error;
    }
};
