import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.scss';
import classNames from 'classnames/bind';
import Review from 'components/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { getZhReviews } from 'services/reviewService';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import Title from 'components/TitleSub';

const cx = classNames.bind(styles);

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const reviewsData = await getZhReviews();
                setReviews(reviewsData);
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    if (error) {
        return <PushNotification message={error.message} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title subText="客户评价" />
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className={cx('swiper')}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <Review image={review.image} name={review.name} content={review.review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;
