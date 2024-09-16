import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Services.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getCategoriesByType } from '~/services/categoryService';
import { Link } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

const Services = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(3);
                setCategories(fetchedCategories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dịch vụ" showSeeAll={true} slug={routes.services} />

                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    breakpoints={{
                        1280: { slidesPerView: 4 },
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
                    className={cx('swiper-container')}
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={category._id} className={cx('slide')}>
                            <Link to={`${routes.services}/${category.slug}`}>
                                <motion.div
                                    className={cx('service-item')}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.25 }}
                                    viewport={{ once: true }}
                                >
                                    <div
                                        className={cx('image-container')}
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    ></div>
                                    <h3 className={cx('service-title')}>{category.name}</h3>
                                </motion.div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Services;
