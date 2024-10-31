import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Tophead.module.scss';
import { Link } from 'react-router-dom';
import { faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const Tophead = () => {
    const hotlines = [{ number: '0961 862 450', name: '' }];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('discount-shipping')}>
                    <span className={cx('discount-label')}>
                        Giảm <strong>25.000đ</strong> phí ship cho đơn hàng trên <strong>500.000đ</strong>
                    </span>
                </div>
                {/* <div className={cx('social-icons')}>
                    <Link to="https://www.facebook.com/profile.php?id=100069322668251">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                    <Link to="https://www.youtube.com/@HtxPhunongbuondon">
                        <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Tophead;
