import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ExperienceDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getExperienceById } from '~/services/experienceService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const ExperienceDetail = () => {
    const { id } = useParams();
    const [experienceDetail, setExperienceDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperienceDetail = async () => {
            try {
                const data = await getExperienceById(id);
                setExperienceDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching experience detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperienceDetail();
    }, [id]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{`${experienceDetail.title} | Yến Sào LeGia Nest `}</title>
                <meta name="description" content={experienceDetail.summary} />
                <meta name="keywords" content={`dịch vụ du lịch, ${experienceDetail.title}, phunongbuondon`} />
                <meta name="author" content="Yến Sào LeGia Nest " />
            </Helmet>
            <div className={cx('header')}>
                <Title text={`${experienceDetail.name}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: experienceDetail.content }} />
            <DateTime timestamp={experienceDetail.created_at} showDate={true} showTime={true} showViews={false} />
        </article>
    );
};

export default ExperienceDetail;
