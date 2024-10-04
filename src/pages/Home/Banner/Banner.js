import React from 'react';
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

const cx = classNames.bind(styles);

const Banner = () => {
    // Commented out API fetch and sample data
    // const [slides, setSlides] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchSlides = async () => {
    //         try {
    //             // Simulating data fetch
    //             const sliderData = [
    //                 'https://example.com/image1.jpg',
    //                 'https://example.com/image2.jpg',
    //                 'https://example.com/image3.jpg',
    //             ];
    //             setSlides(sliderData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching slides:', error);
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchSlides();
    // }, []);

    // Replace slides and isLoading with sample data
    const slides = [
        'https://res.cloudinary.com/drioug4df/image/upload/v1728039221/%E1%BA%A3nh_slide-01_l6sjou.jpg',
        'https://res.cloudinary.com/drioug4df/image/upload/v1728039229/%E1%BA%A3nh_slide-02_o6zwt6.jpg',
        'https://res.cloudinary.com/drioug4df/image/upload/v1728039224/%E1%BA%A3nh_slide-03_wzg58x.jpg',
        'https://res.cloudinary.com/drioug4df/image/upload/v1728039235/%E1%BA%A3nh_slide-04_yiiq4r.jpg',
    ];
    const isLoading = false; // Set isLoading to false as we have sample data

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
