import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getRecruitmentByCategory } from '~/services/recruitmentService';
import styles from './Recruitment.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesByType } from '~/services/categoryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';
import { getNewsPagination } from 'services/newsService';

const cx = classNames.bind(styles);

const Recruitment = () => {
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newsCategories, setNewsCategories] = useState([]);
    const [groupedRecruitment, setGroupedRecruitment] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndRecruitment = async () => {
            try {
                const categoriesData = await getCategoriesByType(4);
                const newsCategoriesData = await getCategoriesByType(2);
                const newsData = await getNewsPagination(1, 15);
                setCategories(categoriesData);
                setNewsCategories(newsCategoriesData);
                setNews(newsData.news);

                const groupedRecruitmentMap = {};

                await Promise.all(
                    categoriesData.map(async (category) => {
                        const recruitmentData = await getRecruitmentByCategory(category._id);
                        groupedRecruitmentMap[category._id] = recruitmentData.map((item) => ({
                            ...item,
                            image: item.images,
                        }));
                    }),
                );
                setGroupedRecruitment(groupedRecruitmentMap);
            } catch (error) {
                setError(error);
                console.error('Error fetching recruitment:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndRecruitment();
    }, []);

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const getNewsCategorySlug = (categoryId) => {
        const category = newsCategories.find((category) => categoryId === category._id);
        return category ? category.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    const filteredRecruitmentItems = news
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
                <title>Tuyển dụng | HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn</title>
                <meta name="description" content="Cập nhật những thông tin tuyển dụng mới nhất của Takatech." />
                <meta name="keywords" content="tuyển dụng, công nghệ thông tin, Takatech" />
            </Helmet>
            <div className={cx('recruitment-section')}>
                <div className={cx('recruitment-column')}>
                    <h2 className={cx('recruitment-title')}>Tuyển dụng</h2>
                    {categories.map((category) => {
                        const slides = groupedRecruitment[category._id]?.slice(0, 6) || [];
                        const shouldLoop = slides.length > 3;

                        if (slides.length === 0) {
                            return null;
                        }

                        return (
                            <div key={category._id} className={cx('recruitment-category')}>
                                <Title
                                    text={category.name || 'Loading...'}
                                    showSeeAll={true}
                                    slug={`${routes.recruitment}/${category.slug}`}
                                    categoryId={category._id}
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
                                    {groupedRecruitment[category._id]?.slice(0, 6).map((item, index) => (
                                        <SwiperSlide key={index} className={cx('slide')}>
                                            <Link to={`${routes.recruitment}/${category.slug}/${item._id}`}>
                                                <Card
                                                    title={item.title}
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
                        {filteredRecruitmentItems.map((item, index) => (
                            <Link key={index} to={`${routes.news}/${getNewsCategorySlug(item.categoryId)}/${item._id}`}>
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

export default Recruitment;
