import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import companyLogo from '~/assets/images/takatech-logo.png';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import io from 'socket.io-client';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const Footer = () => {
    const [stats, setStats] = useState({ daily: 0, total: 0 });

    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_HOST}`, {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('stats', (data) => {
            console.log('Received stats:', data);
            setStats(data);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footerLeft', 'footerColumnWide')}>
                    <Link to="/">
                        <img src={companyLogo} alt="Company Logo" className={cx('logo')} />
                    </Link>
                    <h5>CÔNG TY TNHH CÔNG NGHỆ TAKATECH</h5>
                    <p>200 Hà Huy Tập, Phường Tân Lợi, Tp. Buôn Ma Thuột, Tỉnh Đắk Lắk</p>
                    <div className={cx('onlineStatus')}>
                        <span>
                            <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                            Truy cập hôm nay: <span className={cx('online-number')}>{stats.daily}</span>
                        </span>{' '}
                        |{' '}
                        <span>
                            <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                            Tổng số lượt truy cập: <span className={cx('online-access')}>{stats.total}</span>
                        </span>
                    </div>
                    <div className={cx('contactInfo')}>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+84 914 586 999</span>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>taka.techsoft@gmail.com</span>
                        </div>
                    </div>
                    <div className={cx('socialIcons')}>
                        <Link to="https://www.facebook.com/takatechsoft">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                        <Link to="https://twitter.com">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link to="https://instagram.com">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link to="https://linkedin.com">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </Link>
                    </div>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Thông tin doanh nghiệp</h4>
                    <ul>
                        <li>
                            <Link to={`${routes.about}/tong-quan`}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tổng quan về TakaTech
                            </Link>
                        </li>
                        <li>
                            <Link to={`${routes.about}/tam-nhin-su-menh-gia-tri`}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tầm nhìn - Sứ mệnh - Giá trị
                            </Link>
                        </li>
                        <li>
                            <Link to={`${routes.about}/so-do-to-chuc`}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Sơ đồ tổ chức
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Danh mục</h4>
                    <ul>
                        <li>
                            <Link to={routes.products}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.services}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Dịch vụ
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.news}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tin Tức
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.recruitment}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tuyển dụng
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Các thông tin khác</h4>
                    <ul>
                        <li>
                            <Link to={routes.contact}>
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Liên hệ với chúng tôi
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('bottomBar')}>
                <p>
                    Copyright 2022 &copy;{' '}
                    <a href="https://www.takatech.com.vn/" className={cx('company-name')}>
                        TakaTech
                    </a>
                    . All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
