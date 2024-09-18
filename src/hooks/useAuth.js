import { useState, useEffect, useContext, createContext } from 'react';
import { login, logout, refreshAccessToken } from '../services/auth/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUserEmail = localStorage.getItem('userEmail');

        if (storedAccessToken && storedRefreshToken) {
            setUser({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                email: storedUserEmail,
            });
        } 

        setLoading(false);
    }, []);

    const signin = async (credentials) => {
        try {
            const response = await login(credentials);
            if (response.statusCode === 200) {
                const { data } = response;
                setUser({ accessToken: data.accessToken });

                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('accessTokenExpiresAt', data.accessTokenExpiresAt);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('refreshTokenExpiresAt', data.refreshTokenExpiresAt);
                localStorage.setItem('userEmail', credentials.email);

                navigate('/admin/dashboard');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    };

    const signout = () => {
        logout();
        setUser(null);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiresAt');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiresAt');
        localStorage.removeItem('userEmail');

        navigate('/login');
    };

    return {
        user,
        loading,
        signin,
        signout,
    };
};

export default AuthProvider;
