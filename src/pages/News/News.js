import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import styles from './News.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

const sampleNewsData = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: ['https://lagianest.com/wp-content/uploads/2023/08/to-yen-kho-de-tu-lanh-duoc-bao-lau.jpg'],
        slug: 'tin-tuc-1',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/nguoi-cao-huyet-ap-co-an-yen-duoc-khong.jpg'],
        slug: 'tin-tuc-2',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg'],
        slug: 'tin-tuc-3',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg'],
        slug: 'tin-tuc-3',
        created_at: '2024-09-28',
        views: 345,
        isFeatured: true,
        child_nav_id: 1,
    },
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: ['https://lagianest.com/wp-content/uploads/2023/08/to-yen-kho-de-tu-lanh-duoc-bao-lau.jpg'],
        slug: 'tin-tuc-1',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/nguoi-cao-huyet-ap-co-an-yen-duoc-khong.jpg'],
        slug: 'tin-tuc-2',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg'],
        slug: 'tin-tuc-3',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg'],
        slug: 'tin-tuc-3',
        created_at: '2024-09-28',
        views: 345,
        isFeatured: true,
        child_nav_id: 1,
    },
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: ['https://lagianest.com/wp-content/uploads/2023/08/to-yen-kho-de-tu-lanh-duoc-bao-lau.jpg'],
        slug: 'tin-tuc-1',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/nguoi-cao-huyet-ap-co-an-yen-duoc-khong.jpg'],
        slug: 'tin-tuc-2',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg'],
        slug: 'tin-tuc-3',
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
        images: ['https://lagianest.com/wp-content/uploads/2023/08/yen-chung-xong-de-ngoai-duoc-bao-lau-avt.jpg'],
        slug: 'tin-tuc-3',
        created_at: '2024-09-28',
        views: 345,
        isFeatured: true,
        child_nav_id: 1,
    },
];

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setNewsItems(sampleNewsData);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNewsItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(newsItems.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Tin Tức | Yến Sào LeGia Nest </title>
            </Helmet>
            <div className={cx('news-section')}>
                <div className={cx('news-column')}>
                    <Title subText={'Tin Tức'} />
                    <div className={cx('news-grid')}>
                        {currentNewsItems.map((item, index) => (
                            <Link to={`${routes.news}/${item.id}`} key={index}>
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
