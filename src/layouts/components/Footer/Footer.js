import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faChevronRight, faMapMarkerAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebook, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import companyLogo from '~/assets/images/legia-logo.png';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import routes from '~/config/routes';
import { getVisitStats } from 'services/visitService';

const cx = classNames.bind(styles);

const Footer = () => {
    const [visitToday, setVisitToday] = useState(0);
    const [totalVisits, setTotalVisits] = useState(0);

    useEffect(() => {
        const fetchVisitStats = async () => {
            try {
                const { today_visits, total_visits } = await getVisitStats();
                setVisitToday(today_visits);
                setTotalVisits(total_visits);
            } catch (error) {
                console.error('Failed to fetch visit stats:', error);
            }
        };

        fetchVisitStats();
    }, []);

    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footerLeft', 'footerColumnWide')}>
                    <Link to="/" className={cx('logoLink')}>
                        <img src={companyLogo} alt="Company Logo" className={cx('logo')} />
                    </Link>
                    {/* <h5>Yến Sào LeGia'Nest </h5> */}
                    <div className={cx('contactInfo')}>
                        <div className={cx('onlineStatus')}>
                            <div className={cx('onlineStatusToday')}>
                                <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                                Truy cập hôm nay: <span className={cx('online-number')}>{visitToday}</span>
                            </div>
                            <div className={cx('onlineStatusTotal')}>
                                <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                                Tổng số lượt truy cập: <span className={cx('online-access')}>{totalVisits}</span>
                            </div>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>60 - 62 Nguyễn Hữu Thọ, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đăk Lăk</span>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>077 233 2255</span>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>lxchinh@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Chính sách</h4>
                    <ul>
                        <li>
                            <Link to={`/chinh-sach-quy-dinh-chung`}>Chính sách quy định chung</Link>
                        </li>
                        <li>
                            <Link to={`/chinh-sach-bao-mat`}>Chính sách bảo mật</Link>
                        </li>
                        <li>
                            <Link to={`/chinh-sach-bao-hanh`}>Chính sách bảo hành</Link>
                        </li>
                        <li>
                            <Link to={`/chinh-sach-doi-tra-hang`}>Chính sách đổi trả hàng</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Hỗ trợ khách hàng</h4>
                    <ul>
                        <li>
                            <Link to={'/chinh-sach-dat-hang-thanh-toan'}>Chính sách đặt hàng - thanh toán</Link>
                        </li>
                        <li>
                            <Link to={'/chinh-sach-van-chuyen-kiem-hang'}>Chính sách vận chuyển - kiểm hàng</Link>
                        </li>
                        <li>
                            <Link to={'/cau-hoi-thuong-gap'}>Câu hỏi thường gặp</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('socialIcons', 'footerColumn')}>
                    <h4>Kết nối với chúng tôi</h4>
                    <Link to="https://www.facebook.com/profile.php?id=100064173304425">
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to="#">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to="#">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                </div>
            </div>
            <div className={cx('bottomBar')}>
                <p>
                    Copyright 2024 &copy;{' '}
                    <a href="#" className={cx('company-name')}>
                        Yến Sào LeGia'Nest
                    </a>
                    . All Rights Reserved. Thiết kế bởi{' '}
                    <a href="https://www.takatech.com.vn/" className={cx('company-design-name')}>
                        TakaTech
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
