import httpRequest from '~/utils/httpRequest';

export const getVisitStats = async () => {
    try {
        const response = await httpRequest.get(`/visit-stats`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching visit stats', error);
        throw error;
    }
};

export const trackVisit = async () => {
    try {
        const response = await httpRequest.post(`/track-visit`);
        return response.data.data;
    } catch (error) {
        console.error('Error tracking visit', error);
        throw error;
    }
};
