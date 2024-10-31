import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NewsDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getZhNewsById } from '~/services/newsService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const NewsDetail = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNewsDetail = async (id) => {
        try {
            setLoading(true);
            const data = await getZhNewsById(id);
            setNewsDetail(data);
            setError(null);
        } catch (error) {
            setError(error);
            console.error('获取新闻详情失败:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchNewsDetail(id);
        } else {
            setError(new Error('无效的新闻ID'));
        }
    }, [id]);

    if (error) {
        const errorMessage = error.message || '出现错误';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{newsDetail.title} | 乐嘉燕窝</title>
                <meta name="description" content={newsDetail.summary} />
                <meta name="keywords" content="新闻, 乐嘉燕窝, 新闻详情" />
                <meta name="author" content="乐嘉燕窝" />
            </Helmet>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <Title subText={newsDetail.title} className={cx('title')} />
                </div>
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
                <DateTime
                    timestamp={newsDetail.created_at}
                    views={newsDetail.views}
                    showDate={true}
                    showTime={true}
                    showViews={true}
                />
            </div>
        </article>
    );
};

export default NewsDetail;
