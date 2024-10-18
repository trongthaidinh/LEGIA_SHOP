import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Overview.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import overviewGif from '~/assets/images/overview';
import legiaLogo from '~/assets/images/title.png';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} style={{ perspective: '1000px' }}>
                <div className={cx('content')}>
                    <div className={cx('logo-wrapper')}>
                        <img className={cx('logo')} src={legiaLogo} alt="logo legia nest" />
                    </div>
                    <h2 className={cx('title')}>YẾN SÀO LEGIA'NEST</h2>
                    <p className={cx('text')}>
                        Chuyên phân phối <strong>tổ yến tươi, yến sào, yến chưng</strong> nguyên chất 100%, cam kết CHẤT
                        LƯỢNG – KHÔNG PHA TRỘN. Với mong muốn mang đến nguồn sản phẩm NÂNG CAO SỨC KHỎE cho người dùng,
                        <strong> Legia'Nest</strong> luôn đặt chất lượng sản phẩm lên hàng đầu, đặc biệt{' '}
                        <strong>Yến sào Legia'Nest</strong> đảm bảo giữ nguyên vị thuần túy 100% từ tổ Yến tự nhiên.
                    </p>
                    <Link to={`gioi-thieu/ve-chung-toi`}>
                        <Button
                            className={cx('button')}
                            rounded
                            primary
                            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        >
                            Xem Thêm
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
