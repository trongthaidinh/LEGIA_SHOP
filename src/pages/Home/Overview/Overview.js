import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Overview.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import overviewGif from '~/assets/images/overview';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('inner')}
                style={{ perspective: '1000px' }}
            >
                <div
                    className={cx('content')}
                >
                    <h2 className={cx('title')}>HỢP TÁC XÃ NÔNG NGHIỆP - DU LỊCH</h2>
                    <h3 className={cx('sub-title')}>PHÚ NÔNG BUÔN ĐÔN</h3>
                    <p className={cx('text')}>
                        Ngày 27/05/2019 Hợp tác xã Nông nghiệp và Du lịch Phú Nông – Buôn Đôn chính thức được thành lập và ra đời nhằm mục đích khai thác thế mạnh của thiên nhiên, điều kiện tự nhiên, văn hóa, xã hội để phát triển du lịch và nông nghiệp – sinh thái cộng đồng. Ngoài ra Hợp tác xã Nông nghiệp và Du lịch Phú Nông còn mang trong mình trọng trách thúc đẩy nền kinh tế địa phương, tạo công ăn việc làm, góp phần bảo vệ môi trường và một số vấn đề quan trọng trên địa bàn tỉnh Đắk Lăk và huyện Buôn Đôn.
                    </p>
                    <p className={cx('text')}><strong>PHÁT TRIỂN LÀM GIÀU BỀN VỮNG</strong></p>
                    <p className={cx('text')}>Sau quá trình nghiên cứu và chuẩn bị chúng tôi đã nhận ra rằng những khu vực trên địa bàn như thôn Tân Phú là nơi có tiềm năng phát triển nguồn tài nguyên thiên nhiên có sẵn phù hợp trong việc khai thác và canh tác nông nghiệp. Hiện nay có hơn 200 hộ dân từ khắp mọi miền đất nước tập trung về đây sinh sống, chủ yếu người dân sống bằng nghề truyền thống là sản xuất nông nghiệp.</p>
                    <Link to={`${routes.about}/tong-quan`}>
                        <Button className={cx('button')} primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                            Tìm hiểu thêm
                        </Button>
                    </Link>
                </div>

                <div
                    className={cx('sticker-container')}
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img className={cx('sticker')} src={overviewGif.image} alt="Animated Sticker" />
                </div>
            </div>
        </div>
    );
}

export default Overview;
