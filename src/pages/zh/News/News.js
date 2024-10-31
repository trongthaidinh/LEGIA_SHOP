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
import { getZhNewsPagination } from 'services/newsService';
import { getZhCategoriesBySlug } from 'services/categoryService';

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
                    getZhNewsPagination(page, limit),
                    getZhCategoriesBySlug('文章'),
                ]);
                if (newsData.zhNews.length > 0) {
                    setNewsItems(newsData.zhNews);
                    setTotalPages(newsData.pagination.total_pages);
                    setCategories(categoryData);
                } else {
                    setTotalPages(1);
                }
            } catch (error) {
                setError(error);
                console.error('获取新闻失败:', error);
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
        const errorMessage = error.message || '出现错误';
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
                <title>新闻 | 乐嘉燕窝</title>
                <meta
                    name="description"
                    content="乐嘉燕窝专业销售新鲜燕窝、燕窝制品、即食燕窝，100%纯天然，承诺品质保证 – 绝不掺假，确保保持100%天然燕窝的原味。"
                />
                <meta name="keywords" content="燕窝, 新鲜燕窝, 燕窝制品, 即食燕窝, 礼品套装, 乐嘉燕窝" />
                <meta name="author" content="乐嘉燕窝" />
            </Helmet>
            <div className={cx('news-section')}>
                <div className={cx('news-column')}>
                    <Title subText={'新闻'} />
                    <div className={cx('news-grid')}>
                        {newsItems.map((item, index) => (
                            <Link
                                key={index}
                                to={`${routes.newsZH}/${getCategorySlug(item.zh_child_nav_id)}/${item.id}`}
                            >
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
