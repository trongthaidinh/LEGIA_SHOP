import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import NothingLayout from '~/layouts/NothingLayout';
import LoadingScreen from '~/components/LoadingScreen';
import { AuthProvider, useAuth } from '~/hooks/useAuth';
import Login from '~/pages/Admin/Login';
import LoginZH from '~/pages/zh/Admin/Login';
import ScrollToTop from '~/components/ScrollToTop';
import Error404 from './pages/Error404';
import usePageTracking from './hooks/usePageTracking';
import SessionHandler from 'components/SessionHandler';
import VisitTracker from '~/components/VisitTracker';

function PageTracker() {
    usePageTracking();
    return null;
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <VisitTracker />
                    <PageTracker />
                    <ScrollToTop />
                    <SessionHandler />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout baseRoute={route.baseRoute} categoryType={route.categoryType}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout || NothingLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateRoute>
                                            <Layout baseRoute={route.baseRoute} categoryType={route.categoryType}>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    }
                                />
                            );
                        })}

                        <Route path="/login" element={<Login />} />
                        <Route path="/zh/login" element={<LoginZH />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    const isZhPath = location.pathname.includes('/zh');

    return user ? children : <Navigate to={isZhPath ? '/zh/login' : '/login'} />;
}

export default App;
