import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import CardService from 'components/CardService';
import SuggestCard from '~/components/SuggestCard';
import { getServiceByCategory } from '~/services/serviceService';
import styles from './Service.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesBySlug } from 'services/categoryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const Service = () => {
    const [serviceItems, setServiceItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groupedService, setGroupedService] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndService = async () => {
            try {
                const categoriesData = await getCategoriesBySlug("dich-vu");
                setCategories(categoriesData);

                const groupedServiceMap = {};

                await Promise.all(
                    categoriesData.map(async (category) => {
                        const serviceData = await getServiceByCategory(category.id);
                        groupedServiceMap[category.id] = serviceData.map((item) => ({
                            ...item,
                            image: item.images,
                        }));
                    }),
                );

                setGroupedService(groupedServiceMap);
                setServiceItems(Object.values(groupedServiceMap).flat());
            } catch (error) {
                setError(error);
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndService();
    }, []);

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const getCategorySlug = (categoryId) => {
        const category = categories.find((category) => categoryId === category.id);
        return category ? category.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    const filteredServiceItems = serviceItems
        .filter((item) => {
            if (selectedSuggestion === 0) {
                return item.isFeatured;
            }
            if (selectedSuggestion === 1) {
                return item.views > 10;
            }
            return true;
        })
        .slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Dịch Vụ | HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn</title>
                <meta
                    name="description"
                    content="Công ty TNHH Công nghệ TakaTech cung cấp sản phẩm, dịch vụ xây dựng, phát triển phần mềm, ứng dụng di động - mobile app, website."
                />
                <meta name="keywords" content="dịch vụ thiết kế website, lập trình website, mobile-app, Takatech" />
            </Helmet>
            <div className={cx('service-section')}>
                <div className={cx('service-column')}>
                    <h2 className={cx('service-title')}>Dịch Vụ</h2>
                    {categories.map((category) => {
                        const slides = groupedService[category.id] || []; // Make sure to get the right services
                        const shouldLoop = slides.length > 3;

                        if (slides.length === 0) {
                            return null; // Skip empty categories
                        }

                        return (
                            <div key={category.id} className={cx('service-category')}>
                                <Title
                                    text={category.title || 'Loading...'}
                                    showSeeAll={true}
                                    slug={`${routes.services}/${category.slug}`}
                                    categoryId={category.id}
                                />
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    breakpoints={{
                                        1280: { slidesPerView: 3 },
                                        1024: { slidesPerView: 3 },
                                        768: { slidesPerView: 2 },
                                        0: { slidesPerView: 1 },
                                    }}
                                    loop={shouldLoop}
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {slides.map((item, index) => (
                                        <SwiperSlide key={index} className={cx('slide')}>
                                            <Link to={`${routes.services}/${category.slug}/${item.id}`}>
                                                <CardService
                                                    title={item.name}
                                                    summary={item.summary}
                                                    image={item.images}
                                                    createdAt={item.createdAt}
                                                    views={item.views}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredServiceItems.map((item, index) => (
                            <Link key={index} to={`${routes.services}/${getCategorySlug(item.categoryId)}/${item.id}`}>
                                <SuggestCard
                                    title={item.title}
                                    summary={item.summary}
                                    image={item.images}
                                    createdAt={item.createdAt}
                                    views={item.views}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Service;
