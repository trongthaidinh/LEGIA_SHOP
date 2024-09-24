import React, { useEffect, useState, useCallback } from 'react';
import { getConfiguration, getConfigurationMobile } from '~/services/configurationService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
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

const cx = classNames.bind(styles);

const Banner = () => {
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSlides = useCallback(async () => {
        try {
            const isMobile = window.innerWidth < 768;
            const configData = isMobile ? await getConfigurationMobile() : await getConfiguration();
            const sliderData = configData.homepage_slider;
            setSlides(sliderData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching slides:', error);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSlides();
        window.addEventListener('resize', fetchSlides);
        return () => {
            window.removeEventListener('resize', fetchSlides);
        };
    }, [fetchSlides]);

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
                            modules={[Autoplay, Navigation, EffectFade]}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
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
                                        {slide.title && (
                                            <div className={cx('contentContainer', slide.position)}>
                                                <div className={cx('textWrapper')}>
                                                    <span className={cx('text')}>{slide.title}</span>
                                                </div>
                                            </div>
                                        )}
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
