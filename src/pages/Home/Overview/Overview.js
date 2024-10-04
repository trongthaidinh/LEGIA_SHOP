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
            <div className={cx('inner')} style={{ perspective: '1000px' }}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>YẾN SÀO LEGIA'NEST</h2>
                    <h3 className={cx('sub-title')}>CHẤT LƯỢNG ĐỈNH CAO - VỊ NGON TINH KHIẾT</h3>
                    <p className={cx('text')}>
                        Yến Sào LeGia'Nest là thương hiệu hàng đầu trong lĩnh vực cung cấp yến sào chất lượng cao tại
                        Việt Nam. Với cam kết mang lại những sản phẩm yến nguyên chất, giàu dinh dưỡng từ thiên nhiên,
                        LeGia'Nest không chỉ là sự lựa chọn tin cậy cho sức khỏe, mà còn là biểu tượng của sự tinh tế và
                        phong cách sống đẳng cấp.
                    </p>
                    <p className={cx('text')}>
                        <strong>SỨ MỆNH CHĂM SÓC SỨC KHỎE</strong>
                    </p>
                    <p className={cx('text')}>
                        Với mục tiêu nâng cao chất lượng cuộc sống cho người tiêu dùng, LeGia'Nest luôn đề cao việc bảo
                        tồn giá trị thiên nhiên, khai thác bền vững nguồn tài nguyên từ yến sào. Sản phẩm của chúng tôi
                        trải qua quy trình kiểm định nghiêm ngặt, đảm bảo độ tinh khiết và hàm lượng dinh dưỡng cao,
                        giúp bạn duy trì sức khỏe toàn diện.
                    </p>
                    <p className={cx('text')}>
                        Tại LeGia'Nest, chúng tôi hiểu rằng sức khỏe là tài sản quý giá nhất của mỗi người. Chính vì
                        thế, chúng tôi luôn nỗ lực không ngừng để mang lại sản phẩm tốt nhất, giúp bạn và gia đình tận
                        hưởng những giá trị sức khỏe tốt đẹp nhất từ thiên nhiên.
                    </p>
                    <Link to={`${routes.about}/ve-chung-toi`}>
                        <Button
                            className={cx('button')}
                            rounded
                            primary
                            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        >
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
