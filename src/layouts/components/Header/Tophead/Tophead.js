import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Tophead.module.scss';
import { Link } from 'react-router-dom';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const Tophead = () => {
    const hotlines = [{ number: '0961 862 450', name: '' }];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('hotline-container')}>
                    <div className={cx('hotline')}>
                        <span className={cx('hotline-label')}>
                            <FontAwesomeIcon icon={faPhone} className={cx('phone-icon')} />
                            Hotline:
                        </span>
                        <div className={cx('hotline-numbers')}>
                            {hotlines.map((hotline, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <span className={cx('separator')}> - </span>}
                                    <a className={cx('hotline-number')} href={`tel:${hotline.number}`}>
                                        {hotline.number} {hotline.name && `(${hotline.name})`}
                                    </a>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('social-icons')}>
                    <Link to="https://www.facebook.com/takatechsoft">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                    <Link to="https://x.com/takatech_bmt">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <Link to="https://www.instagram.com/dinhtuan.le/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to="https://linkedin.com">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Tophead;
