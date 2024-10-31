import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from '~/components/Title';
import styles from './Policy.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { getZhPageBySlug } from '~/services/pageService';

const cx = classNames.bind(styles);

const Policy = () => {
    const { slug } = useParams();
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                if (slug) {
                    const data = await getZhPageBySlug(slug);
                    setPageContent(data);
                } else {
                    setError(new Error('未提供页面标识'));
                }
            } catch (error) {
                setError(error);
                console.error('获取页面内容失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }, [slug]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : '网络错误';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    if (!pageContent) {
        return <PushNotification message="暂无内容" />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{pageContent.name} | 乐嘉燕窝</title>
                <meta name="description" content={pageContent.description || '乐嘉燕窝'} />
                <meta name="keywords" content="政策, 乐嘉燕窝" />
                <meta name="author" content="乐嘉燕窝" />
            </Helmet>
            <div className={cx('inner')}>
                <Title subText={pageContent.name} />
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </div>
        </article>
    );
};

export default Policy;
