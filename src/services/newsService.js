import httpRequest from '~/utils/httpRequest';

// Get paginated news
export const getNewsPagination = async (page = 1, limit = 4) => {
    try {
        const response = await httpRequest.get(`/news?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching news', error);
        throw error;
    }
};

// Get all news
export const getNews = async () => {
    try {
        const response = await httpRequest.get('/news');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching news', error);
        throw error;
    }
};

export const getNewsAll = async () => {
    try {
        const response = await httpRequest.get('/news');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching news', error);
        throw error;
    }
};

// Get featured news
export const getFeaturedNews = async () => {
    try {
        const response = await httpRequest.get('/news/featured');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching featured news', error);
        throw error;
    }
};

// Get top views
export const getTopViews = async () => {
    try {
        const response = await httpRequest.get('/news/views');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching top views', error);
        throw error;
    }
};

// Get news by ID
export const getNewsById = async (id) => {
    try {
        const response = await httpRequest.get(`/news/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching news detail with id ${id}`, error);
        throw error;
    }
};

// Get news by category
export const getNewsByCategory = async (child_nav_id, startDate = '', endDate = '', page = 1, limit = 10) => {
    try {
        const response = await httpRequest.get('/news', {
            params: {
                child_nav_id,
                startDate,
                endDate,
                page,
                limit,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching news for id=${child_nav_id}:`, error);
        throw error;
    }
};

// Create news
export const createNews = async (newsData) => {
    try {
        const response = await httpRequest.post('/news', newsData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding news', error);
        throw error;
    }
};

// Update news
export const updateNews = async (id, newsData) => {
    try {
        const response = await httpRequest.post(`/news/${id}`, newsData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating news with id ${id}`, error);
        throw error;
    }
};

// Delete news
export const deleteNews = async (id) => {
    try {
        await httpRequest.delete(`/news/${id}`);
    } catch (error) {
        console.error(`Error deleting news with id ${id}`, error);
        throw error;
    }
};
