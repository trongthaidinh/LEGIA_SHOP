import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { getServices } from '~/services/serviceService';
import { getCategoriesBySlug } from '~/services/categoryService';
import CardService from '~/components/CardService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Services.module.scss';

const cx = classNames.bind(styles);

function Services() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const [servicesData, categoriesData] = await Promise.all([
                    getServices(),
                    getCategoriesBySlug('dich-vu'),
                ]);
                setServices(servicesData);
                setCategories(categoriesData);
                console.log(categoriesData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat.id == categoryId);
        console.log('Type of categoryId:', typeof categoryId);
        console.log('Type of category.id:', typeof category?.id);
        console.log(categoryId, category);
        return category ? category.slug : '';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dịch vụ du lịch" showSeeAll={true} slug={`${routes.services}`} />
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    breakpoints={{
                        1280: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                        768: { slidesPerView: 2 },
                        0: { slidesPerView: 1 },
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={index} className={cx('slide')}>
                            <Link to={`${routes.services}/${getCategorySlug(service.child_nav_id)}/${service.id}`}>
                                <CardService
                                    title={service.name}
                                    summary={service.summary}
                                    image={service.images[0]}
                                    createdAt={service.created_at}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Services;
