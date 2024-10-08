import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faChevronRight, faMapMarkerAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebook, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import companyLogo from '~/assets/images/legia-logo.png';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footerLeft', 'footerColumnWide')}>
                    <Link to="/">
                        <img src={companyLogo} alt="Company Logo" className={cx('logo')} />
                    </Link>
                    {/* <h5>Yến Sào LeGia'Nest </h5> */}
                    <div className={cx('contactInfo')}>
                        <div className={cx('onlineStatus')}>
                            <div className={cx('onlineStatusToday')}>
                                <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                                Truy cập hôm nay: <span className={cx('online-number')}> 452</span>
                            </div>
                            <div className={cx('onlineStatusTotal')}>
                                <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                                Tổng số lượt truy cập: <span className={cx('online-access')}>123423</span>
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
                            <Link to={`#`}>Chính sách quy định chung</Link>
                        </li>
                        <li>
                            <Link to={`#`}>Chính sách bảo mật</Link>
                        </li>
                        <li>
                            <Link to={`#`}>Chính sách bảo hành</Link>
                        </li>
                        <li>
                            <Link to={`#`}>Chính sách đổi trả hàng</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Hỗ trợ khách hàng</h4>
                    <ul>
                        <li>
                            <Link to={'#'}>Chính sách đặt hàng - thanh toán</Link>
                        </li>
                        <li>
                            <Link to={'#'}>Chính sách vận chuyển - kiểm hàng</Link>
                        </li>
                        <li>
                            <Link to={'#'}>Câu hỏi thường gặp</Link>
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
