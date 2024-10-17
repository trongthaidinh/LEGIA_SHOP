import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LoadingScreen from '~/components/LoadingScreen';
import { getConfiguration } from 'services/configurationService';

const cx = classNames.bind(styles);

const Banner = () => {
    // Commented out API fetch and sample data
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(slides);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const sliderData = await getConfiguration();
                console.log(sliderData);
                setSlides(sliderData.homepage_slider);
            } catch (error) {
                console.error('Error fetching slides:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSlides();
    }, []);

    // // Replace slides and isLoading with sample data
    // const slides = [
    //     'https://res.cloudinary.com/drioug4df/image/upload/v1728104353/4_slide_LE_GIA_nest-01_tfoeel.png',
    //     'https://res.cloudinary.com/drioug4df/image/upload/v1728104353/4_slide_LE_GIA_nest-02_rmn16p.png',
    //     'https://res.cloudinary.com/drioug4df/image/upload/v1728104359/4_slide_LE_GIA_nest-03_ka6fbr.png',
    // ];
    // const isLoading = false; // Set isLoading to false as we have sample data

    return (
        <>
            {isLoading && <LoadingScreen isLoading={isLoading} />}
            {!isLoading && slides.length > 0 && (
                <div className={cx('banner')}>
                    <div className={cx('inner')}>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            modules={[Autoplay, Navigation]}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            speed={1500}
                            navigation={{
                                nextEl: `.${cx('swiper-button-next')}`,
                                prevEl: `.${cx('swiper-button-prev')}`,
                            }}
                            observer={true}
                            observeParents={true}
                            className={cx('swiper')}
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index} className={cx('slide')}>
                                    <div className={cx('image-card')}>
                                        <img src={slide} alt={`slider-${index + 1}`} className={cx('image')} />
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className={cx('swiper-button-prev')}>
                                <FontAwesomeIcon icon={faChevronLeft} className={cx('swiper-icon')} />
                            </div>
                            <div className={cx('swiper-button-next')}>
                                <FontAwesomeIcon icon={faChevronRight} className={cx('swiper-icon')} />
                            </div>
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    );
};

export default Banner;
