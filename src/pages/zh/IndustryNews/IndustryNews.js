import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getZhNewsByCategory } from '~/services/newsService';
import Title from '~/components/Title';
import styles from './IndustryNews.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';
import { getZhCategoriesBySlug } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { Empty } from 'antd';
import 'moment/locale/zh-cn';
import LoadingScreen from 'components/LoadingScreen';

const cx = classNames.bind(styles);

function NewsCategory() {
    const location = useLocation();
    const [news, setNews] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDates, setFilterDates] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const newsPerPage = 6;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [loading, setLoading] = useState(false);

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        const encodedSlug = parts[parts.length - 1];
        return encodedSlug ? decodeURIComponent(encodedSlug) : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                setLoading(true);
                const categories = await getZhCategoriesBySlug('文章');
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
        async function fetchNewsCategory() {
            if (categoryId) {
                try {
                    setLoading(true);
                    const startDate = filterDates && filterDates[0] ? dayjs(filterDates[0]).format('YYYY-MM-DD') : '';
                    const endDate = filterDates && filterDates[1] ? dayjs(filterDates[1]).format('YYYY-MM-DD') : '';

                    const data = await getZhNewsByCategory(categoryId, startDate, endDate, currentPage, newsPerPage);

                    setNews(
                        data.zhNews.map((newsItem) => ({
                            ...newsItem,
                            isNew: dayjs().diff(dayjs(newsItem.createdAt), 'day') <= 3,
                        })),
                    );
                    setTotalPages(data.totalPages);
                } catch (error) {
                    console.error('Error fetching news:', error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchNewsCategory();
    }, [categoryId, filterDates, currentPage]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // const handleRangeChange = (dates) => {
    //     setFilterDates(dates);
    //     setCurrentPage(1);
    // };

    const renderNewsCategory = () => {
        if (news.length === 0) {
            return (
                <>
                    <div />
                    <Empty description="暂无相关新闻" />
                    <div />
                </>
            );
        }

        return news.map((newsItem) => (
            <Link to={`${routes.newsZH}/${slug}/${newsItem.id}`} key={newsItem.id}>
                <Card
                    title={newsItem.title}
                    image={newsItem.images[0]}
                    summary={newsItem.summary}
                    createdAt={newsItem.created_at}
                    views={newsItem.views}
                    isNew={newsItem.isNew}
                />
            </Link>
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div
                    className={cx('pageButton', { disabled: currentPage === 1 })}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
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
                <div
                    className={cx('pageButton', { disabled: currentPage === totalPages })}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <div className={cx('container')}>
            <Helmet>
                <title>{categoryName} | 乐嘉燕窝</title>
                <meta name="description" content={`查看乐嘉燕窝${categoryName}相关新闻。`} />
                <meta name="keywords" content={`${categoryName}, 燕窝, 新鲜燕窝, 即食燕窝, 礼品套装, 乐嘉燕窝`} />
                <meta name="author" content="乐嘉燕窝" />
            </Helmet>

            <Title subText={categoryName} />

            <div className={cx('newsGrid')}>{renderNewsCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default NewsCategory;
