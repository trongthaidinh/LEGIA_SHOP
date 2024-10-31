import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faCircle,
    faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
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
                    <Link to={routes.homeZH} className={cx('logoLink')}>
                        <img src={companyLogo} alt="公司标志" className={cx('logo')} />
                    </Link>
                    <div className={cx('contactInfo')}>
                        <div className={cx('onlineStatus')}>
                            <div className={cx('onlineStatusToday')}>
                                <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                                今日访问量: <span className={cx('online-number')}>{visitToday}</span>
                            </div>
                            <div className={cx('onlineStatusTotal')}>
                                <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                                总访问量: <span className={cx('online-access')}>{totalVisits}</span>
                            </div>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>60 - 62 Nguyen Huu Tho, Tan An Ward, Buon Ma Thuot City, Dak Lak Province</span>
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
                    <h4>政策</h4>
                    <ul>
                        <li>
                            <Link to={`/zh/一般条款和条件`}>一般条款和条件</Link>
                        </li>
                        <li>
                            <Link to={`/zh/隐私政策`}>隐私政策</Link>
                        </li>
                        <li>
                            <Link to={`/zh/保修政策`}>保修政策</Link>
                        </li>
                        <li>
                            <Link to={`/zh/退换货政策`}>退换货政策</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>客户支持</h4>
                    <ul>
                        <li>
                            <Link to={`/zh/订购和支付政策`}>订购和支付政策</Link>
                        </li>
                        <li>
                            <Link to={`/zh/运输和检查政策`}>运输和检查政策</Link>
                        </li>
                        <li>
                            <Link to={`/zh/常见问题`}>常见问题</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('socialIcons', 'footerColumn')}>
                    <h4>关注我们</h4>
                    <Link to="https://www.facebook.com/profile.php?id=100064173304425">
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to="#">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to="#">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <Link to={routes.adminZH}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </Link>
                </div>
            </div>
            <div className={cx('bottomBar')}>
                <p>
                    版权所有 2024 &copy;{' '}
                    <Link href="#" className={cx('company-name')}>
                        乐嘉燕窝
                    </Link>
                    。保留所有权利。设计者：{' '}
                    <Link href="https://www.takatech.com.vn/" className={cx('company-design-name')}>
                        TakaTech
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
