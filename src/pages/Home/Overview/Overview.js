import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Overview.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import overviewGif from '~/assets/images/overview';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <motion.div
                className={cx('inner')}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: false }}
                style={{ perspective: '1000px' }}
            >
                <motion.div
                    className={cx('content')}
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className={cx('title')}>CÔNG TY TNHH CÔNG NGHỆ TAKATECH</h2>
                    <p className={cx('text')}>
                        Công ty TNHH Công Nghệ Takatech là đơn vị phát triển phần mềm, ứng dụng di động và digital
                        marketing. Với đội ngũ lập trình viên chuyên nghiệp và chuyên gia marketing giàu kinh nghiệm,
                        Takatech cung cấp các giải pháp công nghệ toàn diện, từ phát triển ứng dụng phần mềm, Website,
                        App android, App IOS đến các chiến lược marketing số hiệu quả.
                    </p>
                    <p className={cx('text')}>
                        Công ty cam kết mang đến sản phẩm và dịch vụ chất lượng cao, giúp khách hàng tối ưu hóa hiệu
                        suất kinh doanh và tối ưu hóa trải nghiệm người dùng.
                    </p>
                    <Link to={`${routes.about}/tong-quan`}>
                        <Button className={cx('button')} primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                            Tìm hiểu thêm
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    className={cx('sticker-container')}
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img className={cx('sticker')} src={overviewGif.gif} alt="Animated Sticker" />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Overview;
