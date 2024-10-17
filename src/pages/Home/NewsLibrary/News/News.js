import React, { useState, useEffect } from 'react';
import styles from './News.module.scss';
import classNames from 'classnames/bind';
import { getNews } from 'services/newsService';
import { getCategoriesBySlug } from 'services/categoryService';
import CardContent from '~/components/CardContent';
import ButtonGroup from '~/components/ButtonGroup';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function News() {
    const [newsArr, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [newsData, categoryData] = await Promise.all([getNews(), getCategoriesBySlug('bai-viet')]);
                setNews(newsData.news);
                setCategories(categoryData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    const filteredNews = (() => {
        switch (activeIndex) {
            case 0:
                return [...newsArr].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);
            case 1:
                return newsArr.filter((news) => news.isFeatured).slice(0, 4);
            case 2:
                return [...newsArr].sort(() => Math.random() - 0.5).slice(0, 4);
            default:
                return newsArr;
        }
    })();

    // const handleButtonClick = (index) => {
    //     setActiveIndex(index);
    // };

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat.id == categoryId);
        return category ? category.slug : '';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title-container')}>
                    <Title subText="Bài viết mới nhất" showSeeAll={true} slug={`${routes.news}`} />
                </div>
                {/* <ButtonGroup
                    buttons={['Mới nhất', 'Nổi bật', 'Ngẫu nhiên']}
                    onButtonClick={handleButtonClick}
                    activeIndex={activeIndex}
                /> */}
                <div className={cx('news-list')}>
                    {filteredNews.map((news, index) => {
                        const isNew = dayjs().diff(dayjs(news.created_at), 'day') <= 3;

                        return (
                            <Link key={index} to={`${routes.news}/${getCategorySlug(news.child_nav_id)}/${news.id}`}>
                                <CardContent
                                    title={news.title}
                                    summary={news.summary}
                                    image={news.images[0]}
                                    link={news.link}
                                    createdAt={news.created_at}
                                    views={news.views}
                                    isNew={isNew}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default News;
