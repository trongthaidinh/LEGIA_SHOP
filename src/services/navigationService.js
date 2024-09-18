import httpRequest from '~/utils/httpRequest';

// Helper functions for sessionStorage
const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

// Navigation Links
export const getNavigationLinks = async () => {
    const sessionKey = 'navigationLinks';

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get('/parent-navs/all-with-child');
        const navigationLinks = response.data.data;

        // Save to sessionStorage
        saveToSessionStorage(sessionKey, navigationLinks);

        return navigationLinks;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

export const getNavigationById = async (id) => {
    const sessionKey = `navigation_${id}`;

    const cachedData = getFromSessionStorage(sessionKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await httpRequest.get(`/navigation/${id}`);
        const navigationLink = response.data.data;

        // Save to sessionStorage
        saveToSessionStorage(sessionKey, navigationLink);

        return navigationLink;
    } catch (error) {
        console.error('Error fetching navigation link:', error);
        throw error;
    }
};

export const createNavigationLink = async (data) => {
    try {
        const response = await httpRequest.post('/navigation', data);

        // Refresh sessionStorage for navigation links
        const updatedNavigationLinks = await getNavigationLinks();
        saveToSessionStorage('navigationLinks', updatedNavigationLinks);

        return response.data.data;
    } catch (error) {
        console.error('Error creating navigation link:', error);
        throw error;
    }
};

export const updateNavigationLink = async (id, data) => {
    try {
        const response = await httpRequest.patch(`/navigation/${id}`, data);

        // Refresh sessionStorage for specific navigation link and all links
        sessionStorage.removeItem(`navigation_${id}`);
        const updatedNavigationLinks = await getNavigationLinks();
        saveToSessionStorage('navigationLinks', updatedNavigationLinks);

        return response.data.data;
    } catch (error) {
        console.error('Error updating navigation link:', error);
        throw error;
    }
};

export const deleteNavigationLink = async (type, id) => {
    const data = { type, id };
    console.log(data);
    try {
        await httpRequest.delete('/navigation', { data });

        // Remove the deleted navigation link from sessionStorage and refresh links
        sessionStorage.removeItem(`navigation_${id}`);
        const updatedNavigationLinks = await getNavigationLinks();
        saveToSessionStorage('navigationLinks', updatedNavigationLinks);

    } catch (error) {
        console.error('Error deleting navigation link:', error);
        throw error;
    }
};
