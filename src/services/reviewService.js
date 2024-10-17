import httpRequest from '~/utils/httpRequest';

const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

// Fetch all reviews
export const getReviews = async () => {
    const sessionKey = 'reviews';

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get('/review');
        const reviewData = response.data.data;

        saveToSessionStorage(sessionKey, reviewData);

        return reviewData;
    } catch (error) {
        console.error('Error fetching reviews', error);
        throw error;
    }
};

// Fetch a single review by id
export const getReviewById = async (id) => {
    const sessionKey = `review_${id}`;

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get(`/review/${id}`);
        const reviewData = response.data.data;

        saveToSessionStorage(sessionKey, reviewData);

        return reviewData;
    } catch (error) {
        console.error('Error fetching review', error);
        throw error;
    }
};

// Create a new review
export const createReview = async (data) => {
    try {
        const response = await httpRequest.post('/review', data);

        // Clear cached reviews after creation
        sessionStorage.removeItem('reviews');

        const updatedReviews = await getReviews();
        saveToSessionStorage('reviews', updatedReviews);

        return response.data.data;
    } catch (error) {
        console.error('Error creating review', error);
        throw error;
    }
};

// Update an existing review
export const updateReview = async (data, id) => {
    try {
        const response = await httpRequest.post(`/review/${id}`, data);

        // Clear cached reviews and specific review after update
        sessionStorage.removeItem('reviews');
        sessionStorage.removeItem(`review_${id}`);

        const updatedReviews = await getReviews();
        saveToSessionStorage('reviews', updatedReviews);

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

        // Clear cached reviews and specific review after deletion
        sessionStorage.removeItem('reviews');
        sessionStorage.removeItem(`review_${id}`);

        const updatedReviews = await getReviews();
        saveToSessionStorage('reviews', updatedReviews);

        return response.data.data;
    } catch (error) {
        console.error('Error deleting review', error);
        throw error;
    }
};
