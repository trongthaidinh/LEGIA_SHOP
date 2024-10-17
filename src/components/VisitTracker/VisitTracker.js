import { useEffect } from 'react';
import { trackVisit } from '~/services/visitService';
function VisitTracker() {
    useEffect(() => {
        const trackPageVisit = async () => {
            try {
                await trackVisit();
            } catch (error) {
                console.error('Failed to track visit:', error);
            }
        };

        trackPageVisit();
    }, []);

    return null;
}

export default VisitTracker;
