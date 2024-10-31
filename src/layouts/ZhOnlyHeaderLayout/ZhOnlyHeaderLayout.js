import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Header from '../components/ZhHeader';
import Footer from '../components/ZhFooter';
import styles from './ZhOnlyHeaderLayout.module.scss';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ZhOnlyHeaderLayout({ children }) {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
            {isVisible && (
                <div className={cx('scroll-to-top')} onClick={scrollToTop}>
                    <FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />
                </div>
            )}
        </div>
    );
}

export default ZhOnlyHeaderLayout;
