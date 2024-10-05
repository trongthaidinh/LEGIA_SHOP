import React, { useState, useEffect } from 'react';
import styles from './News.module.scss';
import classNames from 'classnames/bind';
// import { getNews } from 'services/newsService';
// import { getCategoriesBySlug } from 'services/categoryService';
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
        // Comment phần gọi API
        /*
        const loadData = async () => {
            try {
                const [newsData, categoryData] = await Promise.all([getNews(), getCategoriesBySlug('tin-tuc')]);
                setNews(newsData);
                setCategories(categoryData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        */

        // Dữ liệu mẫu
        const sampleNewsData = [
            {
                id: 1,
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                summary:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                images: ['https://lagianest.com/wp-content/uploads/2023/08/to-yen-kho-de-tu-lanh-duoc-bao-lau.jpg'],
                link: '/tin-tuc/tin-tuc-1',
                created_at: '2024-09-30',
                views: 123,
                isFeatured: true,
                child_nav_id: 1,
            },
            {
                id: 2,
                title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                summary:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                images: [
                    'https://lagianest.com/wp-content/uploads/2023/08/nguoi-cao-huyet-ap-co-an-yen-duoc-khong.jpg',
                ],
                link: '/tin-tuc/tin-tuc-2',
                created_at: '2024-10-01',
                views: 234,
                isFeatured: false,
                child_nav_id: 2,
            },
            {
                id: 3,
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                summary:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                images: [
                    'https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg',
                ],
                link: '/tin-tuc/tin-tuc-3',
                created_at: '2024-09-28',
                views: 345,
                isFeatured: true,
                child_nav_id: 1,
            },
            {
                id: 4,
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                summary:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                images: [
                    'https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg',
                ],
                link: '/tin-tuc/tin-tuc-3',
                created_at: '2024-09-28',
                views: 345,
                isFeatured: true,
                child_nav_id: 1,
            },
        ];

        const sampleCategoriesData = [
            { id: 1, slug: 'tin-tuc' },
            { id: 2, slug: 'su-kien' },
        ];

        setNews(sampleNewsData);
        setCategories(sampleCategoriesData);
        setLoading(false);
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
                    <Title text="Tin tức" subText="Bài viết mới nhất" showSeeAll={true} slug={`${routes.news}`} />
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
                            <Link key={index} to={`${routes.news}/${news.id}`}>
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
