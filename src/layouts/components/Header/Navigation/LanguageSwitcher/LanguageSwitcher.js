import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LanguageSwitcher.module.scss';
import vietnamFlag from '~/assets/images/vietnam-flag.png';
import chinaFlag from '~/assets/images/china-flag.png';

const cx = classNames.bind(styles);

const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    const switchToZH = () => {
        if (currentPath.includes('/zh')) {
            return;
        }
        if (currentPath === '/') {
            navigate('/zh');
            return;
        }
        navigate(`/zh`);
    };

    const switchToVI = () => {
        if (currentPath.includes('/zh')) {
            navigate('/', { replace: true });
            return;
        }
        navigate(currentPath);
    };

    const isZH = currentPath.includes('/zh');

    return (
        <div className={cx('language-switcher')}>
            <button className={cx('lang-btn', { active: !isZH })} onClick={switchToVI}>
                <img className={cx('lang-btn-img')} src={vietnamFlag} alt="Tiếng Việt" />
                <span>VN</span>
            </button>
            <button className={cx('lang-btn', { active: isZH })} onClick={switchToZH}>
                <img className={cx('lang-btn-img')} src={chinaFlag} alt="中文" />
                <span>中文</span>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
