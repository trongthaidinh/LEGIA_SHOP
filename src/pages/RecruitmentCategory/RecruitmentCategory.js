import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getRecruitmentByCategory } from '~/services/recruitmentService';
import Title from '~/components/Title';
import styles from './RecruitmentCategory.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

function RecruitmentCategory() {
    const location = useLocation();
    const [recruitment, setRecruitment] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const recruitmentPerPage = 12;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(4);
                const category = categories.find((cat) => cat.slug === slug);
                if (category) {
                    setCategoryId(category._id);
                    setCategoryName(category.name);
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
        async function fetchRecruitmentCategory() {
            setIsLoading(true);
            if (categoryId) {
                try {
                    const data = await getRecruitmentByCategory(categoryId);
                    setRecruitment(data);
                } catch (error) {
                    console.error('Error fetching recruitment:', error);
                }
            }
            setIsLoading(false);
        }

        fetchRecruitmentCategory();
    }, [categoryId]);

    const indexOfLastRecruitment = currentPage * recruitmentPerPage;
    const indexOfFirstRecruitment = indexOfLastRecruitment - recruitmentPerPage;
    const currentRecruitmentCategory = recruitment.slice(indexOfFirstRecruitment, indexOfLastRecruitment);

    const totalPages = Math.ceil(recruitment.length / recruitmentPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderRecruitmentCategory = () => {
        return currentRecruitmentCategory.map((recruitmentItem, index) => (
            <Link to={`${routes.recruitment}/${slug}/${recruitmentItem._id}`} key={recruitmentItem._id}>
                <Card
                    key={index}
                    title={recruitmentItem.title}
                    image={recruitmentItem.images}
                    summary={recruitmentItem.summary}
                    createdAt={new Date(recruitmentItem.createdAt).getTime()}
                    views={recruitmentItem.views}
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
                <title>{categoryName} | TAKATECH</title>
                <meta
                    name="description"
                    content={`Xem các tin tuyển dụng liên quan đến ${categoryName} trên TAKATECH.`}
                />
                <meta name="keywords" content={`${categoryName}, tuyển dụng, TAKATECH`} />
            </Helmet>
            <Title text={categoryName} />
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <>
                    <div className={cx('recruitmentGrid')}>{renderRecruitmentCategory()}</div>
                    {renderPagination()}
                </>
            )}
        </div>
    );
}

export default RecruitmentCategory;
