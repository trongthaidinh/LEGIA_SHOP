import React from 'react';
import styles from './Reviews.module.scss';
import classNames from 'classnames/bind';
import Review from 'components/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/autoplay'; // Import Swiper Autoplay CSS
import Title from 'components/Title';

const cx = classNames.bind(styles);

// Dữ liệu đánh giá mẫu
const reviewsData = [
    {
        id: 1,
        name: 'Hồng Anh Lai',
        image: 'https://lagianest.com/wp-content/uploads/2022/11/IMG_7688-2048x1536.jpg',
        content:
            "Mình biết yến sào có giá trị dinh dưỡng tốt cho sức khỏe như thế nào rồi, nhưng lại không có thời gian chưng hấp nên không ăn được thường xuyên. Từ ngày biết LEGIA'NEST thì mình order đều đặn về ăn rất tiện. Sợi yến thật nên ăn vào mình cảm nhận được sức khỏe thật sự tốt lên.",
    },
    {
        id: 2,
        name: 'Hồng Anh Lai',
        image: 'https://lagianest.com/wp-content/uploads/2022/11/IMG_7676-scaled.jpg',
        content:
            "Mình biết yến sào có giá trị dinh dưỡng tốt cho sức khỏe như thế nào rồi, nhưng lại không có thời gian chưng hấp nên không ăn được thường xuyên. Từ ngày biết LEGIA'NEST thì mình order đều đặn về ăn rất tiện. Sợi yến thật nên ăn vào mình cảm nhận được sức khỏe thật sự tốt lên.",
    },
    {
        id: 3,
        name: 'Hồng Anh Lai',
        image: 'https://lagianest.com/wp-content/uploads/2022/11/IMG_7688-2048x1536.jpg',
        content:
            "Mình biết yến sào có giá trị dinh dưỡng tốt cho sức khỏe như thế nào rồi, nhưng lại không có thời gian chưng hấp nên không ăn được thường xuyên. Từ ngày biết LEGIA'NEST thì mình order đều đặn về ăn rất tiện. Sợi yến thật nên ăn vào mình cảm nhận được sức khỏe thật sự tốt lên.",
    },
    {
        id: 4,
        name: 'Hồng Anh Lai',
        image: 'https://lagianest.com/wp-content/uploads/2022/11/IMG_7676-scaled.jpg',
        content:
            "Mình biết yến sào có giá trị dinh dưỡng tốt cho sức khỏe như thế nào rồi, nhưng lại không có thời gian chưng hấp nên không ăn được thường xuyên. Từ ngày biết LEGIA'NEST thì mình order đều đặn về ăn rất tiện. Sợi yến thật nên ăn vào mình cảm nhận được sức khỏe thật sự tốt lên.",
    },
];

const Reviews = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Cảm nhận" subText="Đánh giá của khách hàng" />
                <Swiper
                    spaceBetween={10} // Khoảng cách giữa các slide
                    slidesPerView={1} // Hiển thị 1 slide mỗi lần
                    loop={true} // Lặp vô hạn
                    modules={[Autoplay]} // Kích hoạt Autoplay module
                    autoplay={{
                        delay: 3000, // Delay giữa các slide
                        disableOnInteraction: false, // Tiếp tục autoplay khi người dùng tương tác
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2 }, // Hiển thị 2 slide trên tablet
                        1024: { slidesPerView: 3 }, // Hiển thị 3 slide trên desktop
                    }}
                    className={cx('swiper')}
                >
                    {reviewsData.map((review) => (
                        <SwiperSlide key={review.id}>
                            <Review image={review.image} name={review.name} content={review.content} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;
