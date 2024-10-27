import httpRequest from '~/utils/httpRequest';

// Images
export const getImagesPagination = async (page = 1, limit = 9) => {
    try {
        const response = await httpRequest.get(`/image?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching images', error);
        throw error;
    }
};

export const getPublicImages = async () => {
    try {
        const response = await httpRequest.get('/images/public');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching images', error);
        throw error;
    }
};

export const getAllImages = async () => {
    try {
        const response = await httpRequest.get('/images');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching images', error);
        throw error;
    }
};

export const createImage = async (imageData) => {
    try {
        const response = await httpRequest.post('/images', imageData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding image', error);
        throw error;
    }
};

export const updateImage = async (imageId, updatedData) => {
    try {
        const response = await httpRequest.put(`/images/${imageId}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating image', error);
        throw error;
    }
};

export const deleteImage = async (imageId) => {
    try {
        await httpRequest.delete(`/images/${imageId}`);
    } catch (error) {
        console.error('Error deleting image', error);
        throw error;
    }
};

// Videos
export const getVideos = async () => {
    try {
        const response = await httpRequest.get('/videos');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos', error);
        throw error;
    }
};

export const getVideosPagination = async (page = 1, limit = 9) => {
    try {
        const response = await httpRequest.get(`/videos?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos', error);
        throw error;
    }
};

export const createVideo = async (videoData) => {
    try {
        const response = await httpRequest.post('/videos', videoData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding video', error);
        throw error;
    }
};

export const updateVideo = async (videoId, updatedData) => {
    try {
        const response = await httpRequest.put(`/videos/${videoId}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating video', error);
        throw error;
    }
};

export const deleteVideo = async (videoId) => {
    try {
        await httpRequest.delete(`/videos/${videoId}`);
    } catch (error) {
        console.error('Error deleting video', error);
        throw error;
    }
};
