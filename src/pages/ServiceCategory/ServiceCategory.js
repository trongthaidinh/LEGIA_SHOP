import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getServiceByCategory } from '~/services/serviceService';
import Title from '~/components/Title';
import styles from './ServiceCategory.module.scss';
import { Link } from 'react-router-dom';
import CardService from 'components/CardService';
import { getCategoriesBySlug } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import LoadingScreen from '~/components/LoadingScreen';
import { Empty } from 'antd';

const cx = classNames.bind(styles);

function ServiceCategory() {
    const location = useLocation();
    const [service, setService] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const servicePerPage = 12;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesBySlug('dich-vu');
                const category = categories.find((cat) => cat.slug === slug);
                if (category) {
                    setCategoryId(category.id);
                    setCategoryName(category.title);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (slug) {
            fetchCategory();
        }
    }, [slug]);

    useEffect(() => {
        async function fetchServiceCategory() {
            if (categoryId) {
                setLoading(true);
                try {
                    const data = await getServiceByCategory(categoryId);
                    setService(data);
                } catch (error) {
                    console.error('Error fetching service:', error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchServiceCategory();
    }, [categoryId]);

    const indexOfLastService = currentPage * servicePerPage;
    const indexOfFirstService = indexOfLastService - servicePerPage;
    const currentServiceCategory = service.slice(indexOfFirstService, indexOfLastService);

    const totalPages = Math.ceil(service.length / servicePerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderServiceCategory = () => {
        if (currentServiceCategory.length === 0) {
            return (
                <>
                    <div />
                    <Empty className={cx('empty-element')} description="Đang cập nhật..." />
                    <div />
                </>
            );
        }
        return currentServiceCategory.map((serviceItem, index) => (
            <Link to={`${routes.services}/${slug}/${serviceItem.id}`} key={serviceItem.id}>
                <CardService
                    key={index}
                    title={serviceItem.name}
                    image={serviceItem.images}
                    summary={serviceItem.summary}
                    createdAt={new Date(serviceItem.createdAt).getTime()}
                />
            </Link>
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index}
                        className={cx('pageButton', { active: currentPage === index + 1 })}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Helmet>
                <title>{categoryName} | Yến Sào LeGia Nest </title>
                <meta
                    name="description"
                    content={`Xem các dịch vụ du lịch liên quan đến ${categoryName} trên Yến Sào LeGia Nest .`}
                />
                <meta name="keywords" content={`${categoryName}, dịch vụ, phunongbuondon`} />
                <meta name="author" content="Yến Sào LeGia Nest " />
            </Helmet>
            {loading ? (
                <LoadingScreen isLoading={loading} />
            ) : (
                <>
                    <Title text={categoryName} />
                    <div className={cx('serviceGrid')}>{renderServiceCategory()}</div>
                    {renderPagination()}
                </>
            )}
        </div>
    );
}

export default ServiceCategory;
