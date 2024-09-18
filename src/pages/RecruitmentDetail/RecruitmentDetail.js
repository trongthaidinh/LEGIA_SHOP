import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './RecruitmentDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getRecruitmentById } from '~/services/recruitmentService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const RecruitmentDetail = () => {
    const { id } = useParams();
    const [recruitmentDetail, setRecruitmentDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecruitmentDetail = async () => {
            try {
                const data = await getRecruitmentById(id);
                setRecruitmentDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching recruitment detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecruitmentDetail();
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
                <title>{recruitmentDetail.title} | HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn</title>
                <meta name="description" content={recruitmentDetail.summary} />
                <meta name="keywords" content="tin tức, HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn, chi tiết tin tuyển dụng" />
            </Helmet>
            <div className={cx('header')}>
                <Title text={`${recruitmentDetail.title}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: recruitmentDetail.content }} />
            <DateTime
                timestamp={recruitmentDetail.createdAt}
                views={recruitmentDetail.views}
                showDate={true}
                showTime={true}
                showViews={true}
            />
        </article>
    );
};

export default RecruitmentDetail;
