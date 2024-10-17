import routes from 'config/routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SessionHandler() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== routes.checkout) {
            sessionStorage.removeItem('selectedProduct');
        }
    }, [location.pathname]);

    return null;
}

export default SessionHandler;
