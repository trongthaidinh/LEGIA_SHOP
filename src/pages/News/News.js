import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import styles from './News.module.scss';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { getNewsPagination } from 'services/newsService';
import { getCategoriesBySlug } from 'services/categoryService';

const cx = classNames.bind(styles);

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchNews = async (page, limit) => {
            try {
                setLoading(true);
                const [newsData, categoryData] = await Promise.all([
                    getNewsPagination(page, limit),
                    getCategoriesBySlug('bai-viet'),
                ]);
                if (newsData.news.length > 0) {
                    setNewsItems(newsData.news);
                    setTotalPages(newsData.pagination.total_pages);
                    setCategories(categoryData);
                } else {
                    setTotalPages(1);
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (error) {
        const errorMessage = error.message || 'Something went wrong';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat.id == categoryId);
        return category ? category.slug : '';
    };

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Tin Tức | Yến Sào LeGia Nest </title>
                <meta
                    name="description"
                    content="Yến Sào LeGia Nest chuyên phân phối tổ yến tươi, yến sào, yến chưng nguyên chất 100%, cam kết CHẤT LƯỢNG – KHÔNG PHA TRỘN để đảm bảo giữ nguyên vị thuần túy 100% từ tổ Yến tự nhiên."
                />
                <meta name="keywords" content="yến, yến tươi, yến sào, yến chưng, set quà tặng, LegiaNest" />
                <meta name="author" content="Yến Sào LeGia'Nest" />
            </Helmet>
            <div className={cx('news-section')}>
                <div className={cx('news-column')}>
                    <Title subText={'Tin Tức'} />
                    <div className={cx('news-grid')}>
                        {newsItems.map((item, index) => (
                            <Link key={index} to={`${routes.news}/${getCategorySlug(item.child_nav_id)}/${item.id}`}>
                                <Card
                                    title={item.title}
                                    summary={item.summary}
                                    image={item.images}
                                    createdAt={item.created_at}
                                    views={item.views}
                                    isNew={dayjs().diff(dayjs(item.created_at), 'day') <= 3}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                {totalPages > 1 && (
                    <div className={cx('pagination')}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={cx({ active: currentPage === i + 1 })}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default News;
