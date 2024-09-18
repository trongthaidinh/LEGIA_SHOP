import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from '~/components/Title';
import styles from './Introduction.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { getPageBySlug } from '~/services/pageService';

const cx = classNames.bind(styles);

const Introduction = () => {
    const { slug } = useParams();
    console.log(slug);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                if (slug) {
                    const data = await getPageBySlug(slug);
                    setPageContent(data);
                } else {
                    setError(new Error('No slug provided'));
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching page content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }, [slug]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    if (!pageContent) {
        return <PushNotification message="No content available" />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{pageContent.name} | HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn</title>
                <meta
                    name="description"
                    content={
                        pageContent.description ||
                        'Công ty TNHH Công nghệ TakaTech cung cấp sản phẩm, dịch vụ xây dựng, phát triển phần mềm, ứng dụng di động - mobile app, website..'
                    }
                />
                <meta name="keywords" content="giới thiệu, takatech, thông tin công ty" />
                <meta name="author" content="CÔNG TY TNHH CÔNG NGHỆ HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn" />
            </Helmet>
            <div className={cx('inner')}>
                <Title text={pageContent.name} />
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </div>
        </article>
    );
};

export default Introduction;
